import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import * as util from '../../lib/util.js';
import {tokenSet} from '../../action/auth-actions.js';
import {tokenDelete} from '../../action/photo-actions.js';
import appStoreCreate from '../../lib/app-store-create.js';
import LandingContainer from '../landing-container';
import DashboardContainer from '../dashboard-container';
import SettingsContainer from '../settings-container';

class App extends React.Component {
  componentDidMount() {
    let token = util.readCookie('X-Slugram-Token');
    console.log('cookie', token);
    if(token){
      this.props.tokenSet(token);
    }
  }
  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <div>
            <header>
              <h1>Damn Son, thats an h1!!</h1>
              <nav>
                <ul>
                  <li><Link to='/welcome/signup'> Sign Up </Link></li>
                  <li><Link to='/welcome/login'> Log In </Link></li>
                  <li><Link to='settings'> Settings </Link></li>
                </ul>
              </nav>
            </header>

            <Route exact path='/welcome/:auth' component={LandingContainer} />
            <Route exact path='/settings' component={SettingsContainer} />
            <Route path='/dashboard' component={DashboardContainer} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile,
});

let mapDispatchToProps = (dispatch) => ({
  tokenSet : (token) => dispatch(tokenSet(token)),
  tokenDelete: (token) => dispatch(tokenDelete(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
