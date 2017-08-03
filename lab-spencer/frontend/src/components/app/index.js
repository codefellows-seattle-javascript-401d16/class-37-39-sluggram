import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import LandingPage from '../landing-page';
import AuthContainer from '../auth-container';
import SettingsContainer from '../settings-container';
import {readCookie, destroyCookie} from '../../lib/util.js';
import {
  tokenSet,
  signOutRequest,
} from '../../action/user-actions.js';

class App extends React.Component {
  componentDidMount() {
    let token = readCookie('X-Sluggram-Token');
    if(token)
      this.props.tokenSet(token);
    else {
      this.props.signOut();
      destroyCookie('X-Sluggram-Token');
    }
  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <main>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/auth/:authTarget' component={AuthContainer} />
            <Route exact path='/profile-settings' component={SettingsContainer} />
          </main>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch, getState) => ({
  tokenSet: token => dispatch(tokenSet(token)),
  signOut: () => dispatch(signOutRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
