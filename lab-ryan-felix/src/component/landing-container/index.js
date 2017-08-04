import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { renderIf } from '../../lib/util.js';
import { requestSignup, requestLogin } from '../../action/auth.js';
import AuthForm from '../auth-form';

const validateMatch = (match) => (
  match === 'login' || match === 'signup'
);

class LandingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.invalidMatch = !validateMatch(props.match.params.auth);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleLogin(user) {
    return(this.props.login(user))
      .then(() => this.props.history.push('/dashboard'))
      .catch(err => console.error(err));
  }

  handleSignup(user) {
    return(this.props.signup(user))
      .then(() => this.props.history.push('/dashboard'))
      .catch(err => console.error(err));
  }

  render () {
    const { params } = this.props.match;
    console.log(params);
    const handleSubmit = params.auth === 'login'
      ? this.handleLogin
      : this.handleSignup;
    return (
      <div className="landing-container">
        { renderIf(this.invalidMatch,
          <Redirect to='/' />
        )}
        { renderIf(this.props.auth && this.props.profile,
          <Redirect to='/dashboard' />
        )}
        { renderIf(this.props.auth && !this.props.profile,
          <Redirect to='/profile' />
        )}
        <h2>Log In / Sign Up</h2>
        <AuthForm
          auth={params.auth}
          onSubmit={handleSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  signup: user => dispatch(requestSignup(user)),
  login: user => dispatch(requestLogin(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);
