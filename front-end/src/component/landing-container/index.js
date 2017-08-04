import React from 'react'
import react-dom from 'react-dom'
import {connect} from 'react-redux'
import {signupRequest, loginRequest} from '../action/auth-actions.js'

import AuthForm from '../auth-form'


class LandingContainer extends React.Component {
  render(){
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
    signup: (user) => dispatch(signupRequest(user))
    login: (user) => dispatch(loginRequest(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer)
