import React from 'react'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import appStoreCreate from '../../lib/app-store-create.js'
import LandingContainer from '../landing-container/index.js'
import SettingsContainer from '../settings-container'
import DashboardContainer from '../dashboard-container'
import * as util from '../../lib/util.js'
import {tokenSet} from '../../action/auth-actions.js'

class App extends React.Component {
  componentDidMount(){
    let token = util.readCookie('X-Sluggram-Token')
    if(token){
      this.props.tokenSet(token)
    }
  }


  render() {
    return(
      <div className='app'>
          <BrowserRouter>
            <div>
              <header>
                <h1> Slug Chat </h1>
                <nav>
                <ul>
                  <li><Link to='/welcome/signup'> Signup </Link></li>
                  
                  <li><Link to='/welcome/login'> Login </Link></li>
                  <li><Link to='/dashboard'> Dashboard </Link></li>
                  <li><Link to='/settings'> Settings </Link></li>
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
  profile: state.profile
})

let mapDispatchToProps = (dispatch) => ({
  tokenSet: (token) => dispatch(tokenSet(token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
