import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import Dashboard from '../dashboard';

class App extends React.Component{

  render(){
    return(
      <Provider>
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
