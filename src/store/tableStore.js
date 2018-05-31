import { observable, action } from 'mobx';

class tableStore {
  @observable fileArr;

  constructor() {
    this.fileArr = []
  }

  @action setArr(arr){
    this.fileArr = arr
  }

}

export default new tableStore();