import React, { Component } from 'react';
import { observer } from 'mobx-react';
import popupStore from '../store/popupStore';
import tableStore from '../store/tableStore';
import Popup from './Popup';
import Table from './FormTable';

@observer
class Form extends Component {
    render() {
        return (
            <div className="form__block">
                <form className="form" id="form">
                    <input
                      className="form__input"
                      type="file"
                      name="file"
                      id="file"
                      onChange={this.onFileDrop.bind(this)}
                      onDragOver={this.dragOver}
                      onDragLeave={this.dragLeave}/>
                    <label htmlFor="file" className="form__label">Загрузить json</label>
                </form>
              {
                tableStore.fileArr.length !== 0
                  ? <Table arr={this.state.fileArr}/>
                  : null
              }

              {
                popupStore.show
                  ? <Popup/>
                  : null
              }

            </div>
        );
    }

    constructor(props) {
        super(props);

        this.state = {
            fileArr:[]
        };
    }

    dragOver(){
        let el = document.getElementById('form')
        el.classList.add('form_hover')
    }

    dragLeave(){
        let el = document.getElementById('form')
        if(el.classList.contains('form_hover')){
            el.classList.remove('form_hover')
        }
    }

    onFileDrop(e){
        this.dragLeave()
        let fileList = this.state.fileArr
        let f = e.target.files[0]
        let inputFile = document.getElementById('file')
        let reader = new FileReader();
        reader.readAsText(f);

        if(f.type !== 'application/json'){
            popupStore.setMsg(`Вы загрузили ${f.type}, так не пойдет! Загрузите файл json`)
            popupStore.showPopup()
        } else if(f.size === 0){
            popupStore.setMsg('Вы загрузили пустой json')
            popupStore.showPopup()
        } else{
            reader.onloadend = e =>{
                try {
                    let arr = JSON.parse(e.target.result)
                    if(!Array.isArray(arr)){
                        fileList.push({
                            length:[arr].length,
                            name:f.name,
                            size:f.size/1000
                        })
                        tableStore.setArr(fileList)
                    } else{
                        fileList.push({
                            length:arr.length,
                            name:f.name,
                            size:f.size/1000
                        })
                        tableStore.setArr(fileList)
                    }
                } catch (error){
                    if(error.message.indexOf("token '") !== -1){
                        popupStore.setMsg('Ошибка! Пристутствуют недопустимые одинарные кавычки')
                    } else if(error.message.indexOf("token ,") !== -1){
                        popupStore.setMsg('Ошибка! Отсутсвуют ключ/значение')
                    } else if(error.message.indexOf("token ") !== -1){
                        popupStore.setMsg('Ошибка! Отсутсвуют двойные кавычки')
                    } else{
                        popupStore.setMsg(error)
                    }
                    popupStore.showPopup()
                }
            }
            inputFile.value = ''
        }
    }
}

export default Form;
