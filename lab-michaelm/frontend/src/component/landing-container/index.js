import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import AuthForm from '../auth-form';
import * as util from '../../lib/util.js';
import {signupRequest, loginRequest} from '../../action/auth-actions.js';

class LandingContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleLogin(user) {
    return this.props.login(user)
      .then(() => {
        this.props.history.push('/dashboard');
      })
      .catch(util.logError);
  }

  handleSignup(user) {
    return this.props.signup(user)
      .then(() => {
        this.props.history.push('/dashboard');
      })
      .catch(util.logError);
  }


  render(){
    let {params} = this.props.match;

    let handleComplete = params.auth === 'login'
      ? this.handleLogin
      : this.handleSignup;

    return (
      <div>
        {util.renderIf(this.props.auth && this.props.profile,
          <Redirect to='/dashboard' />
        )}

        {util.renderIf(this.props.auth && !this.props.profile,
          <Redirect to='/settings' />
        )}

        <AuthForm
          auth={params.auth}
          onComplete={handleComplete}
        />

      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

let mapDispatchToProps = (dispatch) => {
  return {
    signup: (user) => dispatch(signupRequest(user)),
    login: (user) => dispatch(loginRequest(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingContainer);
