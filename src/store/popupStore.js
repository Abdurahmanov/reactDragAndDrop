import { observable} from 'mobx';

class popupStore {
  @observable show;

  constructor() {
    this.show = false;
  }

  showPopup() {
    this.show = !this.show;
  }
}

export default new popupStore();