import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Popup from './Popup';
import Table from './FormTable';

@inject('popupStore')
@inject('tableStore')
@observer
class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fileArr:[],
            length:1
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

    recursiveCount = json => {
        let len = this.state.length
        let i;

        for (let k in json) {
            i = json[k];
            if (typeof i === 'object') {
                len = len+1
                this.setState({
                    length:len
                });
                this.recursiveCount(i);
            }
        }
    }

    onFileDrop = e => {
        this.dragLeave()
        let fileList = this.state.fileArr
        let f = e.target.files[0]
        let inputFile = document.getElementById('file')
        let reader = new FileReader();

        reader.readAsText(f);
        inputFile.value = ''

        if(f.type !== 'application/json'){
            this.props.popupStore.setMsg(`Вы загрузили ${f.type}, так не пойдет! Загрузите файл json`)
            this.props.popupStore.showPopup()
        } else if(f.size === 0){
            this.props.popupStore.setMsg('Вы загрузили пустой json')
            this.props.popupStore.showPopup()
        } else{
            reader.onloadend = e =>{
                try {
                    let json = JSON.parse(e.target.result)
                    let newJson = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json, "", 4));

                    this.recursiveCount(json)

                    let length = this.state.length

                    fileList.push({
                        json: newJson,
                        length:length,
                        name:f.name,
                        size:f.size/1000
                    })

                    this.props.tableStore.setArr(fileList)
                } catch (error){
                    if(error.message.indexOf("token '") !== -1){
                        this.props.popupStore.setMsg('Ошибка! Пристутствуют недопустимые одинарные кавычки')
                    } else if(error.message.indexOf("token ,") !== -1){
                        this.props.popupStore.setMsg('Ошибка! Отсутсвуют ключ/значение')
                    } else if(error.message.indexOf("token ") !== -1){
                        this.props.popupStore.setMsg('Ошибка! Отсутсвуют двойные кавычки')
                    } else{
                        this.props.popupStore.setMsg(error)
                    }

                    this.props.popupStore.showPopup()
                }
            }
        }

        this.setState({
            length:1
        });
    }

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
                    <label htmlFor="file" className="form__label">Перетащите сюда файл json</label>
                </form>
                {
                    this.props.tableStore.fileArr.length !== 0
                        ? <Table arr={this.state.fileArr}/>
                        : null
                }

                {
                    this.props.popupStore.show
                        ? <Popup/>
                        : null
                }

            </div>
        );
    }
}

export default Form;
