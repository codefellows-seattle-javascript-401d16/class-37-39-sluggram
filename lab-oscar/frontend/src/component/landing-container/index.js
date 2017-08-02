import React from 'react';
import './_landing-container.scss';
import AuthForm from '../auth-form';
import {connect} from 'react-redux';
import * as util from '../../lib/util.js';
import {signupRequest, loginRequest} from '../../action/auth-actions.js';


class LandingContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      authorized: null,
    };
  }

  componentWillReceiveProps(props){
    let {auth} = props.auth;
    if(auth)
      this.setState({authorized:'oscar'});
    console.log('&&&', props);
  }

  render(){
    let {params} = this.props.match;
    let handleComplete = params.auth === 'login'
      ? this.props.login
      : this.props.signup;
    return(
      <div className='user-action-container'>
        {util.renderIf(this.state.authorized,
          <h2>Welcome</h2>
        )}
        {util.renderIf(!this.state.authorized,
          <div className='user-form'>
            <AuthForm
              auth={params.auth}
              onComplete={handleComplete}
            />
          </div>
        )}
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  auth: state,
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
