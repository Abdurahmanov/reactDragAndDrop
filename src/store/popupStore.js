import { observable} from 'mobx';

class popupStore {
  observable(show);

  constructor() {
    this.show = false;
  }
}

export default new popupStore();