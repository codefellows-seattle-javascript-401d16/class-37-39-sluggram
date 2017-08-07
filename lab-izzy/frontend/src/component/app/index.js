import React from 'react';
import {connect} from 'react-redux';
import * as util from '../../lib/util.js';
import LandingContainer from '../landing-container';
import {tokenSet} from '../../action/auth-actions.js';
import SettingsContainer from '../settings-container';
import DashboardContainer from '../dashboard-container';

import appStoreCreate from '../../lib/app-store-create.js';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import {profileFetchRequest} from '../../action/profile-actions.js';

class App extends React.Component {
  render(){
    return(
      <div className='app'>
        <BrowserRouter>
          <div>
            <header>
              <h1> izstagram </h1>
            </header>

            <Route exact path='/settings' component={SettingsContainer} />
            <Route exact path='/dashboard' component={DashboardContainer} />
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
  profileFetch: () => dispatch(profileFetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
