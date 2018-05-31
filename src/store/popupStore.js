import { observable, action } from 'mobx';

class popupStore {
  @observable show;
  @observable msg;

  constructor() {
    this.show = false;
    this.msg = ''
  }

  @action setMsg(msg){
    this.msg = msg
  }

  showPopup() {
    this.show = !this.show;
  }

}

export default new popupStore();