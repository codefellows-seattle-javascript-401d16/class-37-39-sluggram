import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import * as util from '../../lib/util.js';
import { tokenSet } from '../../action/auth-actions.js';
import LandingContainer from '../landing-container';
import SettingsContainer from '../settings-container';
import appStoreCreate from '../../lib/app-store-create.js';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';


class App extends React.Component {

  componentDidMount() {
    const token = util.readCookie('Gram-Token');
    if (token) {
      this.props.tokenSet(token)
    }
  }

  render() {
    return (
      <div className="app" style={{ width: '30%', margin: '0 auto' }}>
        <BrowserRouter>
          <div>
            <header>
              <MuiThemeProvider>
                <Paper style={{ margin: '18px 22px 18px 0' }}>
                  <Menu style={{textAlign: 'center', fontWeight: 'bold'}}>
                    <MenuItem primaryText="Gram Gram Gram" style={{ margin: '0 auto' }} />
                  </Menu>
                </Paper>
              </MuiThemeProvider>

              <nav>
                <MuiThemeProvider>
                  <Paper style={{ margin: '18px 22px 18px 0' }}>
                    <Menu>
                      <Link
                        to="/welcome/signup"
                        style={{ textDecoration: 'none' }}
                      >
                        <MenuItem
                          primaryText="Signup"
                          onTouchTap={this.dialogToggle}
                        />
                      </Link>
                      <Link
                        to="/welcome/login"
                        style={{ textDecoration: 'none' }}
                      >
                        <MenuItem
                          primaryText="Login"
                        />
                      </Link>
                      <Link
                        to="/settings"
                        style={{ textDecoration: 'none' }}
                      >
                        <MenuItem
                          primaryText="Settings"
                        />
                      </Link>
                    </Menu>
                  </Paper>
                </MuiThemeProvider>
              </nav>
            </header>

            <Route exact path="/welcome/:auth" component={LandingContainer} />
            <Route exact path="/settings" component={SettingsContainer} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  tokenSet: token => dispatch(tokenSet(token)),
  dialogToggle: () => dispatch(this.dialogToggle()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
