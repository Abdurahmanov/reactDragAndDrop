import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react'
import popupStore from './store/popupStore'
import tableStore from './store/tableStore'
import './style/global.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';

const stores = {
    popupStore,
    tableStore
}

ReactDOM.render(<Provider {...stores}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
