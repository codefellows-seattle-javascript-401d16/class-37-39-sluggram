import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter, Route, Link} from 'react-router-dom'

import Nav from '../nav-container'
import * as util from '../../lib/util.js'
import LandingContainer from '../landing-container'
import SettingsContainer from '../settings-container'
import DashboardContainer from '../dashboard-container'
import appStoreCreate from '../../lib/app-store-create.js'
import {profileCreate, profileFetch} from '../../action/profile-actions'
import {tokenSet, logout} from '../../action/auth-actions'


class App extends React.Component{
  constructor(props){
    super(props)

    this.handleLogout = this.handleLogout.bind(this)
  }

  componentWillMount(){
    console.log('__APP-COMPONENT-WILL-MOUNT__', this.props)
    let token = util.readCookie('X-Sluggram-Token')
    if(token){
      this.props.tokenSet(token)
    }
    try{
      let profile = JSON.parse(localStorage.profile)
      if(profile){
        this.props.profileCreate(profile)

      // if(!this.props.profile)
      //   this.props.profile = profileFetch(profile)
      }
    }catch(error){
      console.log('ERROR getting profile from localStorage: ', error)
    }
  }

  componentDidMount(){
    let token = util.readCookie('X-Sluggram-Token')
    if(token){
      this.props.tokenSet(token)
    }
  }

  handleLogout(e) {
    // e.preventDefault()
    // localStorage.clear()
    this.props.logout()
    // this.props.history.push('/welcome')
    this.setState = {
      auth: null,
      profile: null,
    }
  }

  render(){
    return(
      <div className='app'>
          <BrowserRouter>
            <div>
              <Route path='*' component={Nav} />
              <header>
                <h1> Are you still readin this? </h1>
                <nav>
                  <ul>
                    {util.renderIf(this.props.auth,
                      <div>
                        <li><Link to='/settings'> settings </Link></li>
                        <li><a href='/welcome' onClick={() => this.handleLogout()}>
                        logout </a></li>
                      </div>
                    )}
                    {util.renderIf(!this.props.auth,
                      <div>
                        <li><Link to='/welcome/signup'> signup </Link></li>
                        <li><Link to='/welcome/login'> login </Link></li>
                      </div>
                    )}
                  </ul>
                </nav>
              </header>

              <Route exact path='/welcome/:auth' component={LandingContainer} />
              <Route exact path='/settings' component={SettingsContainer} />
              <Route exact path='/dashboard' component={DashboardContainer} />
            </div>
          </BrowserRouter>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
})
let mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  tokenSet: (token) => dispatch(tokenSet(token)),
  profileCreate: (profile) => dispatch(profileCreate(profile)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
