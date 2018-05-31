import React, { Component } from 'react';
import Popup from './Popup';

class Form extends Component {
    render() {
        let i = 1
        let fileList = this.state.fileArr.map( (name) => {
            return <div key={i++}>
                <div>Имя файла - {name.name}</div>
                <div>Кол-во объектов в json - {name.length}</div>
                <div>Размер файла json - {name.size.toFixed(1)} кБ</div>
            </div>;
        });
        return (
            <div className="form__block">
                <form className="form" id="form">
                    <input className="form__input" type="file" name="file" id="file" onChange={this.onFileDrop.bind(this)} onDragOver={this.dragOver} onDragLeave={this.dragLeave}/>
                    <label htmlFor="file" className="form__label">Загрузить json</label>

                </form>
                <div className="form__List">
                   {fileList}
                </div>
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
            kek:''
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
        console.log(e.target.files[0])
        let fileList = this.state.fileArr
        this.dragLeave()

        let f = e.target.files[0]
        console.log(f.type)
        let reader = new FileReader();
        if(f.type !== 'application/json'){
            this.setState({
                errorMsg:`Вы загрузили ${f.type}, так не пойдет! Загрузите файл json`,
                showPopup:true
            });
            console.log(`Вы загрузили ${f.type}, так не пойдет! Загрузите файл json`)
        } else if(f.size === 0){
            this.setState({
                errorMsg:'Вы загрузили пустой json',
                showPopup:true
            });
            console.log(`Вы загрузили пустой json`)
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
                    console.log(error)
                    if(error.message.indexOf("token '") !== -1){
                        this.setState({
                            errorMsg:'Ошибка! Пристутствуют недопустимые одинарные кавычки',
                            showPopup:true
                        });
                        console.log('Ошибка! Пристутствуют недопустимые одинарные кавычки')
                    } else if(error.message.indexOf("token ,") !== -1){
                        this.setState({
                            errorMsg:'Ошибка! Отсутсвуют ключ/значение',
                            showPopup:true
                        });
                        console.log('Ошибка! Отсутсвуют ключ/значение')
                    } else if(error.message.indexOf("token ") !== -1){
                        this.setState({
                            errorMsg:'Ошибка! Отсутсвуют "" кавычки',
                            showPopup:true
                        });
                        console.log('Ошибка! Отсутсвуют "" кавычки')
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
