import React from 'react'
import {connect} from 'react-redux'
import {signupRequest, loginRequest} from '../../action/auth-actions.js'
import * as util from '../../lib/util.js'
import AuthForm from '../auth-form'
import {Redirect} from 'react-router-dom'
import NavBar from '../navbar/index.js'


class LandingContainer extends React.Component {
  constructor(props){
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
  }

  handleLogin(user){
    return this.props.login(user)
    .then(()=>{
      this.props.history.push('/dashboard')
    })
    .catch(console.error)
  }

  handleSignup(user){
    console.log(this.props.signup(user),'this.props.signup');
    return this.props.signup(user)
    .then(()=> {
      this.props.history.push('/dashboard')
    })
    .catch(console.error)
  }
  render(){
    {console.log(this.props,'!!!!')}
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
      <NavBar/>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
})

let mapDispatchToProps = (dispatch) => {
  return {
    signup: (user) => dispatch(signupRequest(user)),
    login: (user) => dispatch(loginRequest(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer)
