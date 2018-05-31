import React, { Component } from 'react';
import tableStore from '../store/tableStore';

class Table extends Component {

  render() {
    let i = 1
    let fileList = tableStore.fileArr.map( (name) => {
      return <tr key={i++}>
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