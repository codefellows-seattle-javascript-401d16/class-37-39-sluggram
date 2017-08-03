import React from 'react';
import {connect} from 'react-redux';
import AuthForm from '../auth/auth-form';
import * as authAction from '../../action/auth-action.js';

class Landing extends React.Component{
  render(){
    return(
      <div className='landing'>
        <main>
          Hey from Landing
          <AuthForm
            buttonText='Sign-up'
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
