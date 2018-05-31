import React, { Component } from 'react';
import popupStore from '../store/popupStore';

class Popup extends Component {
  render() {
    return (
      <div className="popup">
        <div className="popup__inner">
          <div className="popup__modal">
            <div
                className="popup__close"
                onClick={()=>{popupStore.showPopup()}}>+</div>
            {popupStore.msg}
          </div>
          <div
            className="popup__shadow"
            onClick={()=>{popupStore.showPopup()}}></div>
        </div>
      </div>
    );
  }
}

export default Popup;