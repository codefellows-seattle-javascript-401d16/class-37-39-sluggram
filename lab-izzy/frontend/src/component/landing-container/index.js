import React from 'react';
import {connect} from 'react-redux';
import AuthForm from '../auth-form';
import * as util from '../../lib/util.js';
import {Redirect, Link} from 'react-router-dom';
import {profileFetchRequest} from '../../action/prfile-actions.js';
import {signupRequest, loginRequest} from '../../action/auth-actions.js';

class LandingContainer extends React.Component {
  constructor(props){
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  componentWillReceiveProps(props){
    if(props.auth && props.profile)
      props.history.replace('./dashboard');
    if(props.auth && !props.profile)
      props.history.replace('/settings');
  }

  handleLogin(user){
    let {profileFetch, history} = this.props;
    return this.props.login(user)
      .then(() => profileFetch())
      .then(() => history.push('./dashboard'))
      .catch(util.logError);
  }

  handleSignup(user){
    return this.props.signup(user)
      .then(() => {
        this.props.history.push('/settings');
      })
      .catch(util.logError);
  }

  render() {
    let {params} = this.props.match;

    let handleComplete = params.auth === 'login'
      ? this.handleLogin
      : this.handleSignup;

    return (

      <div className='landing-container'>
        <AuthForm
          auth={params.auth}
          onComplete={handleComplete}
        />
        <div className='auth-nav'>
          {util.renderIf(params.auth === 'login',
            <Link to='/welcome/signup'> signup </Link>)}

          {util.renderIf(params.auth === 'signup',
            <Link to='/welcome/login'> login </Link>)}
        </div>
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
    login: (user) => dispatch(loginRequest(user)),
    signup: (user) => dispatch(signupRequest(user)),
    profileFetch: () => dispatch(profileFetchRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);
