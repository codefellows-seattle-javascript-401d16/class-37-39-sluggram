import React from 'react';
import {connect} from 'react-redux';
import {log, logError} from '../../lib/util.js';

import {userSignUpRequest, userSignInRequest} from '../../action/user-actions.js';
import AuthForm from '../auth-form';

class AuthContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main className='auth-container'>
        <AuthForm
          onComplete={this.props.match.params.authTarget === 'signup' ? this.handleSignUp : this.handleSignIn}
          type={this.props.authTarget}
        />
      </main>
    );
  }
}

const mapStateToProps = state => {};
const mapDispathToProps = (dispatch, getState) => ({
  userSignUp: credentials => dispatch(userSignUpRequest(credentials)),
  userSignIn: credentials => dispatch(userSignInRequest(credentials)),
});

export default connect(mapStateToProps, mapDispathToProps)(AuthContainer);
