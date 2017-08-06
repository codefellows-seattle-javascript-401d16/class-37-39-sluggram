import React from 'react'
import {connect} from 'react-redux'
import {signupRequest, loginRequest} from '../../action/auth-actions.js'
import * as util from '../../lib/util.js'
import AuthForm from '../auth-form'


class LandingContainer extends React.Component {
  render(){
    {console.log(this.props.match)}
    let {params} = this.props.match
    let handleComplete
    let title
    if (params.auth === 'login') {
      handleComplete = this.props.login
      title = 'YOU HAVE TO LOGIN'
    } else {
      handleComplete = this.props.signup
      title = 'YOU HAVE TO SIGN UP'
    }
    console.log('history',this.props.history,'handleComplete',handleComplete);

    return(
      <div>
      {title}
        <AuthForm
          auth={params.auth}
          onComplete={handleComplete}
          />

      </div>
    )
  }
}

let mapStateToProps = () => ({})

let mapDispatchToProps = (dispatch) => {
  return {
    signup: (user) => dispatch(signupRequest(user)),
    login: (user) => dispatch(loginRequest(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer)
