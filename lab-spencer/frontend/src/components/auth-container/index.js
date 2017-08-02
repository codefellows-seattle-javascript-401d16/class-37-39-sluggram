import React from 'react';
import {connect} from 'react-redux';
import {log, logError, renderIf} from '../../lib/util.js';

import {userSignUpRequest, userSignInRequest} from '../../action/user-actions.js';
import AuthForm from '../auth-form';

class AuthContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleSignIn(user) {
    return this.props.userSignIn(user)
      .then(() => {
        this.props.history.push('/');
      })
      .catch(err => {
        logError(err);
      });
  }

  handleSignUp(user) {
    return this.props.userSignUp(user)
      .then(() => {
        this.props.history.push('/');
      })
      .catch(err => {
        logError(err);
      });
  }

  render() {
    let target = this.props.match.params.authTarget;
    return (
      <div className='auth-container'>
        {renderIf(this.props.auth,
          this.props.history.push('/')
        )}
        {renderIf(target === 'signin',
          <h2>Sign In</h2>
        )}
        {renderIf(target === 'signup',
          <h2>Sign Up</h2>
        )}
        <AuthForm
          onComplete={target === 'signup'
            ? this.props.handleUserSignUp
            : this.props.handleUserSignIn
          }
          type={target}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

const mapDispathToProps = (dispatch, getState) => ({
  userSignUp: credentials => dispatch(userSignUpRequest(credentials)),
  userSignIn: credentials => dispatch(userSignInRequest(credentials)),
});

export default connect(mapStateToProps, mapDispathToProps)(AuthContainer);
