import React from 'react';
import {connect} from 'react-redux';
import * as util from '../../lib/util.js';
import LandingContainer from '../landing-container';
import {tokenSet} from '../../action/auth-actions.js';
import SettingsContainer from '../settings-container';

import appStoreCreate from '../../lib/app-store-create.js';
import {BrowserRouter, Route, Link} from 'react-router-dom';

class App extends React.Component {
  componentDidMount(){
    let token = util.readCookie('X-Sluggram-Token');
    if(token)
      this.props.tokenSet(token);
  }
  render(){
    return(
      <div className='app'>
        <BrowserRouter>
          <div>
            <header>
              <h1> whats up slugzzzz </h1>
              <nav>
                <ul>
                  <li><Link to='/settings'> Settings </Link></li>
                  <li><Link to='/welcome/login'> Login </Link></li>
                  <li><Link to='/welcome/signup'> Sign Up! </Link></li>
                </ul>
              </nav>
            </header>

            <Route exact path='/settings' component={SettingsContainer} />
            <Route exact path='/welcome/:auth' component={LandingContainer} />
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
  tokenSet: (token) => dispatch(tokenSet(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
