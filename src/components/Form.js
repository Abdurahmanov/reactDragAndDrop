import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Popup from './Popup';
import Table from './FormTable';

@inject('popupStore')
@inject('tableStore')
@inject('formStore')
@observer
class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
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
                        onChange={this.props.formStore.onFileDrop.bind(this)}
                        onDragOver={this.props.formStore.dragOver}
                        onDragLeave={this.props.formStore.dragLeave}/>
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
