import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import throttle from 'lodash/throttle';

import './index.css';
import App from './App';
import { allReducers } from "./reducers/index";
import {saveState, loadState} from './utils/localStorage';

const persistedState = loadState();

export const store=createStore(allReducers, persistedState);

store.subscribe(throttle(() => {
   saveState({
      table: store.getState().table});
}, 1000));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
