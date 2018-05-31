import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('popupStore')
@observer
class Popup extends Component {
  render() {
    return (
      <div className="popup">
        <div className="popup__inner">
          <div className="popup__modal">
            <div
                className="popup__close"
                onClick={()=>{this.props.popupStore.showPopup()}}>+</div>
            {this.props.popupStore.msg}
          </div>
          <div
            className="popup__shadow"
            onClick={()=>{this.props.popupStore.showPopup()}}></div>
        </div>
      </div>
    );
  }
}

export default Popup;