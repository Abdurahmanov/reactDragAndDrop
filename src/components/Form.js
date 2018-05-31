import React, { Component } from 'react';
import Popup from './Popup';
import Table from './FormTable';

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
                this.state.fileArr.length !== 0
                  ? <Table arr={this.state.fileArr}/>
                  : null
              }

              {
                this.state.showPopup
                  ? <Popup msg={this.state.errorMsg}/>
                  : null
              }

            </div>
        );
    }


    constructor(props) {
        super(props);

        this.state = {
            errorMsg:'',
            fileArr:[],
            showPopup:false,
        };
    }
    componentDidMount(){

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
        let fileList = this.state.fileArr
        let f = e.target.files[0]
        let reader = new FileReader();

        this.dragLeave()

        if(f.type !== 'application/json'){
            this.setState({
                errorMsg:`Вы загрузили ${f.type}, так не пойдет! Загрузите файл json`,
                showPopup:true
            });
        } else if(f.size === 0){
            this.setState({
                errorMsg:'Вы загрузили пустой json',
                showPopup:true
            });
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
                        this.setState({
                            fileArr:fileList
                        });
                    } else{
                        fileList.push({
                            length:arr.length,
                            name:f.name,
                            size:f.size/1000
                        })
                        this.setState({
                            fileArr:fileList
                        });
                    }
                } catch (error){
                    if(error.message.indexOf("token '") !== -1){
                        this.setState({
                            errorMsg:'Ошибка! Пристутствуют недопустимые одинарные кавычки',
                            showPopup:true
                        });
                    } else if(error.message.indexOf("token ,") !== -1){
                        this.setState({
                            errorMsg:'Ошибка! Отсутсвуют ключ/значение',
                            showPopup:true
                        });
                    } else if(error.message.indexOf("token ") !== -1){
                        this.setState({
                            errorMsg:'Ошибка! Отсутсвуют "" кавычки',
                            showPopup:true
                        });
                    } else{
                        this.setState({
                            errorMsg:error,
                            showPopup:true
                        });
                    }
                }
            }
            reader.readAsText(f);
        }
    }
}

export default Form;
