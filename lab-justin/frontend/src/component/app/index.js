import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import * as util from '../../lib/util.js';
import LandingContainer from '../landing-container';
import {tokenSet} from '../../action/auth-actions.js';
import SettingsContainer from '../settings-container';
import DashboardContainer from '../dashboard-container';
import appStoreCreate from '../../lib/app-store-create.js';

let store =  appStoreCreate();

class App extends React.Component {
  componentDidMount() {
    let token = util.readCookie('X-Sluggram-Token');
    if(token) {
      this.props.tokenSet(token);
    }
  }
  render(){
    return (
      <div className='app'>
        <BrowserRouter>
          <div>
            <header>
              <h1> Sign up or log in please.</h1>
              <nav>
                <ul>
                  <li><Link to='/welcome/signup'> Signup </Link> </li>
                  <li><Link to='/welcome/login'> Login </Link> </li>
                  <li><Link to='/settings'> Settings </Link> </li> 
                </ul>
              </nav>
            </header>
            <Route exact path='/welcome/:auth' component={LandingContainer} />
            <Route exact path='/settings' component={SettingsContainer} /> 
            <Route exact path='/dashboard' component={DashboardContainer} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  profile: state.profile,
});

let mapDispatchToProps = dispatch => ({
  tokenSet: token => dispatch(tokenSet(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);