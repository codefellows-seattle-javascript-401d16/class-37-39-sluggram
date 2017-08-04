import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import App from './component/app';
import appStoreCreate from './lib/app-store-create.js';
import './styles/_main.scss';

let store = appStoreCreate();
let AppContainer = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

ReactDom.render(<AppContainer />, document.getElementById('root'));
