import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import Dashboard from '../dashboard';
import appStoreCreate from '../../lib/app-store-create.js';

const store = appStoreCreate();

class App extends React.Component{

  render(){
    return(
      <Provider store={store}>
        <BrowserRouter>
          <div className='app'>
            Hello App
            <Route exact path='/' component={Dashboard} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
