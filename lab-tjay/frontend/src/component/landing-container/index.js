import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';

import AuthForm from '../auth-form';
import * as util from '../../lib/util.js';

import { signupRequest, loginRequest } from '../../action/auth-actions.js';

class LandingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  dialogToggle() {
    if (!this.state.open) {
      this.setState({ open: true });
    }
  }

  handleLogin(user) {
    return this.props.login(user)
      .then(() => {
        this.props.history.push('/dashboard')
      })
      .catch(console.error);
  }

  handleSignup(user) {
    return this.props.signup(user)
      .then(() => {
        this.props.history.push('/dashboard')
      })
      .catch(console.error);
  }

  render() {
    const { params } = this.props.match;
    console.log('THE PROPS LANDING', this.props);
    console.log('history', this.props.history);

    const handleComplete = params.auth === 'login'
      ? this.handleLogin
      : this.handleSignup;
    return (

      <div>
        {util.renderIf(this.props.auth && this.props.profile,
          <Redirect to="/dashboard" />,
        )}

        {util.renderIf(this.props.auth && !this.props.profile,
          <Redirect to="/settings" />,
        )}
        <MuiThemeProvider>
          <Dialog
            modal={false}
            open={this.dialogToggle}
            onRequestClose={this.dialogToggle}
          >
            <AuthForm
              auth={params.auth}
              onComplete={handleComplete}
            />
          </Dialog>
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => {
  return {
    signup: user => dispatch(signupRequest(user)),
    login: user => dispatch(loginRequest(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandingContainer);
