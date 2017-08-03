import React from 'react';
import {connect} from 'react-redux';
import {log, logError, renderIf, readCookie} from '../../lib/util.js';

import {
  userSignUpRequest,
  userSignInRequest,
  tokenSet,
} from '../../action/user-actions.js';

import AuthForm from '../auth-form';

class AuthContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleUserSignIn = this.handleUserSignIn.bind(this);
    this.handleUserSignUp = this.handleUserSignUp.bind(this);
  }

  componentDidMount() {

  }

  handleUserSignIn(user) {
    return this.props.userSignIn(user)
      .then(() => {
        this.props.history.push('/');
      })
      .catch(err => {
        logError(err);
      });
  }

  handleUserSignUp(user) {
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
        {renderIf(target === 'signin',
          <h2>Sign In</h2>
        )}
        {renderIf(target === 'signup',
          <h2>Sign Up</h2>
        )}
        <AuthForm
          onComplete={target === 'signup'
            ? this.handleUserSignUp
            : this.handleUserSignIn
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

const mapDispatchToProps = (dispatch, getState) => ({
  userSignUp: user => dispatch(userSignUpRequest(user)),
  userSignIn: user => dispatch(userSignInRequest(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
