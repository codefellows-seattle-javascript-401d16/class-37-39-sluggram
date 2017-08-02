import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Landing from '../landing';
import Settings from '../setting';
import appStoreCreate from '../../lib/app-store-create.js';

const store = appStoreCreate();

class App extends React.Component{

  render(){
    return(
      <Provider store={store}>
        <BrowserRouter>
          <div className='app'>
            <header>
                Hello App
              <nav>
                <ul>
                  <li><Link to='/welcome/signup'> Signup </Link></li>
                  <li><Link to='/welcome/login'> Login </Link></li>
                  <li><Link to='/settings'> Settings </Link></li>
                </ul>
              </nav>
            </header>
            <Route exact path='/welcome/:auth' component={Landing} />
            <Route exact path='/settings' component={Settings} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
