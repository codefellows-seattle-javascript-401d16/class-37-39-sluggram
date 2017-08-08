import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import appStoreCreate from '../../lib/app-store-create.js';
import LandingContainer from '../landing-container';
import DashboardContainer from '../dashboard-container';

let store =  appStoreCreate();

class App extends React.Component {
  render(){
    console.log('app props:', this.props);
    return (
      <div className='app'>
        <Provider store={store}>
          <BrowserRouter>
            <div>
              <header>
                <h1> Sign up or login please.</h1>
                <nav>
                  <ul>
                    <li><Link to='/'> Home </Link> </li>
                    <li><Link to='/welcome/signup'> Signup </Link> </li>
                    <li><Link to='/welcome/login'> Login </Link> </li>
                  </ul>
                </nav>
              </header>

              <Route path='/welcome/:auth' component={LandingContainer} />
              <Route path='/dashboard' component={DashboardContainer} />
            </div>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;