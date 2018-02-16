import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import './index.css';
import App from './App';
import { allReducers } from "./reducers/index";
import registerServiceWorker from './registerServiceWorker';

export const store=createStore(allReducers);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
