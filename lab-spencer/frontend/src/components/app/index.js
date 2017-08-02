import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import createAppStore from '../../lib/app-store-create.js';
import LandingPage from '../landing-page';
import AuthContainer from '../auth-container';
import SettingsContainer from '../settings-container';
import {readCookie} from '../../lib/util.js';
import {tokenSet} from '../../action/user-actions.js';

const store = createAppStore();

class App extends React.Component {
  componentDidMount() {
    let token = readCookie('X-Sluggram-Token');
    if(token)
      this.props.tokenSet(token);
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
  profile: state.profile,
});

const mapDispatchToProps = (dispatch, getState) => ({
  tokenSet: token => dispatch(tokenSet(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
