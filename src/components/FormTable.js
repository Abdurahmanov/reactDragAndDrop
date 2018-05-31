import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('tableStore')
@observer
class Table extends Component {
  render() {
    let fileList = this.props.tableStore.fileArr.map( (name,index) => {
      return <tr key={index}>
        <td>{name.name}</td>
        <td>{name.length}</td>
        <td>{name.size.toFixed(1)} кБ</td>
      </tr>;
    });
    return (
      <div className="form__table">
        <table>
          <thead>
          <tr>
            <th>Имя файла</th>
            <th>Кол-во объектов в json</th>
            <th>Размер файла json</th>
          </tr>
          </thead>
          <tbody>
            {fileList}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;