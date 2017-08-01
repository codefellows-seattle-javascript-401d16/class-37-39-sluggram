import React from 'react';
import { connect } from 'react-redux';
import AuthForm from '../auth-form';
import * as util from '../../lib/util.js';
import { signupRequest, loginRequest } from '../../action/auth-actions.js';

class LandingContainer extends React.Component {
  render() {
    const { params } = this.props.match
    const handleComplete = params.auth === 'login'
      ? this.props.login
      : this.props.signup

    return (
      <div>
        <AuthForm
          auth={params.auth}
          onComplete={handleComplete}
        />
      </div>
    );
  }
}

const mapStateToProps = () => ({});
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
