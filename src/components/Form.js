import React, { Component } from 'react';

class Form extends Component {
    render() {
        return (
            <form className="form">
                <input className="form__input" type="file" name="file" id="file" onChange={this.onFileDrop.bind(this)}/>
                <label htmlFor="file" className="form__label">Загрузить json</label>
                <div>{this.state.file.name}</div>
                <div>Размер {this.state.file.size}</div>
                <div>Кол-во объектов {this.state.length}</div>
            </form>

        );
    }
    constructor(props) {
        super(props);

        this.state = {
            file: '',
            length:''
        };
    }
    componentDidMount(){

    }

    onFileDrop(e){
        console.log(e.target.files[0])
        let f = e.target.files[0]
        let reader = new FileReader();
        reader.onloadend = e =>{
            let arr = JSON.parse(e.target.result)
            if(!Array.isArray(arr)){
                this.setState({
                    length:[arr].length
                });
            } else{
                this.setState({
                    length:arr.length
                });
            }
        }
        reader.readAsText(f);
        this.setState({
            file:f
        });


    }
}

export default Form;
