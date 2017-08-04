import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import createStore from '../../lib/create-store.js';
import LandingContainer from '../landing-container';
import SplashContainer from '../splash-container';
import ProfileContainer from '../profile-container';

const store = createStore();

const App = props => {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <div className="app">
            <header>
              <h1>Header</h1>
              <nav>
                <ul>
                  <li>
                    <Link to='/'>Home</Link>
                  </li>
                  <li>
                    <Link to='/welcome/signup'>Sign Up</Link>
                  </li>
                  <li>
                    <Link to='/welcome/login'>Log In</Link>
                  </li>
                  <li>
                    <Link to='/profile'>Profile</Link>
                  </li>
                </ul>
              </nav>
            </header>
            <Route exact path='/' component={SplashContainer} />
            <Route path='/welcome/:auth' component={LandingContainer} />
            <Route exact path='/profile' component={ProfileContainer} />
          </div>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
