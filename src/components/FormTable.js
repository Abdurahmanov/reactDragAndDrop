import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('tableStore')
@observer
class Table extends Component {

  fileList = props => {
    let list = props.map( (item,index) => {
      return <tr key={index}>
        <td>{item.name}</td>
        <td>{item.length}</td>
        <td>{item.size.toFixed(1)} кБ</td>
        <td><a href={item.json} className="btn" download="result.json">Скачать</a></td>
      </tr>

    })
    return list
  }

  render() {
    return (
      <div className="form__table">
        <table>
          <thead>
          <tr>
            <th>Имя файла</th>
            <th>Кол-во объектов в json</th>
            <th>Размер файла json</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
            {this.fileList(this.props.tableStore.fileArr)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;