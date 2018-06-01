import { observable, action } from 'mobx';

import popupStore from './popupStore'
import tableStore from './tableStore'

class formStore {
  @observable fileArr;
  @observable length;

  constructor() {
    this.fileArr = []
    this.length = 1
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
    let len = this.length
    let i;

    for (let k in json) {
      i = json[k];
      if (typeof i === 'object') {
        len = len+1
        this.length = len
        this.recursiveCount(i);
      }
    }
  }

  @action onFileDrop = e => {
    this.dragLeave()
    let fileList = this.fileArr
    let f = e.target.files[0]
    let inputFile = document.getElementById('file')
    let reader = new FileReader();

    reader.readAsText(f);
    inputFile.value = ''

    if(f.type !== 'application/json'){
      popupStore.setMsg(`Вы загрузили ${f.type}, так не пойдет! Загрузите файл json`)
      popupStore.showPopup()
    } else if(f.size === 0){
      popupStore.setMsg('Вы загрузили пустой json')
      popupStore.showPopup()
    } else{
      reader.onloadend = e =>{
        try {
          let json = JSON.parse(e.target.result)
          let newJson = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json, "", 4));

          this.recursiveCount(json)

          let length = this.length

          fileList.push({
            json: newJson,
            length:length,
            name:f.name,
            size:f.size/1000
          })

          tableStore.setArr(fileList)
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
    }

    this.length = 1
  }
}

export default new formStore();