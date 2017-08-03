import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import AuthForm from '../auth/auth-form';
import * as authAction from '../../action/auth-action.js';

class Landing extends React.Component{
  constructor(props){
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleLogin(user){
    return this.props.login(user)
      .then(() => {
        this.props.history.push('/dashboard');
      })
      .catch(console.error);
  }

  handleSignup(user){
    return this.props.signup(user)
      .then(() => {
        this.props.history.push('/dashboard');
      })
      .catch(console.error);
  }

  render(){
    //use match to get the url params. set it as params
    console.log('match: ', this.props.match);
    let {params} = this.props.match;
    //make a ternary that sets handlecomplete to either the login or signup handlers
    //based on the auth params in url
    let handleComplete = params.auth === 'login' ? this.handleLogin : this.handleSignup;

    return(
      <div className='landing'>
        <main>
          Hey from Landing
          <AuthForm
            auth={params.auth}
            onComplete={this.props.signup}
          />
        </main>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({});
let mapDispatchToProps = (dispatch) => ({
  signup: (user) => dispatch(authAction.signupRequest(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
