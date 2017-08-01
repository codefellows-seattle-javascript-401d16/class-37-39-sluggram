import React from 'react';
import {Provider} from 'react-redux';
import LandingContainer from '../landing-container';
import appStoreCreate from '../../lib/app-store-create';
import {BrowserRouter, Route, Link} from 'react-router-dom';

let store =  appStoreCreate();

class App extends React.Component {
  render(){
    return (
      <div>
        <Provider store={store}>
          <BrowserRouter>
            <div>
              <header>
                <h1> Welcome to The App</h1>
                <nav>
                  <ul>
                    <li><Link to='/signup'>Sign Up</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                  </ul>
                </nav>
              </header>
              <Route path='/:auth' component={LandingContainer} />
            </div>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
