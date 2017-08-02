import './style/main.scss';
import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-router-dom';
import App from './components/app';
import createAppStore from './lib/app-store-create';

const store = createAppStore();

let AppContainer = () =>
  <Provider store={store}>
    <App />
  </Provider>;


ReactDom.render(<AppContainer />, document.getElementById('root'));
