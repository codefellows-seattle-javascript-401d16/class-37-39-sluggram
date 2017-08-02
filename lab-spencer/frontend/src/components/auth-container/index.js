import React from 'react';
import {connect} from 'react-redux';
import {log, logError, renderIf} from '../../lib/util.js';

import {userSignUpRequest, userSignInRequest} from '../../action/user-actions.js';
import AuthForm from '../auth-form';

class AuthContainer extends React.Component {
  constructor(props) {
    super(props);
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
            ? this.props.userSignUp
            : this.props.userSignIn
          }
          type={target}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispathToProps = (dispatch, getState) => ({
  userSignUp: credentials => dispatch(userSignUpRequest(credentials)),
  userSignIn: credentials => dispatch(userSignInRequest(credentials)),
});

export default connect(mapStateToProps, mapDispathToProps)(AuthContainer);
