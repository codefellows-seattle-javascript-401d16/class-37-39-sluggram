import './_app.scss'
import MuiStyle from '../../style/_muiStyle.js'
import React from 'react'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import appStoreCreate from '../../lib/app-store-create.js'
import NavBar from '../navbar/index.js'
import LandingContainer from '../landing-container/index.js'
import SettingsContainer from '../settings-container'
import DashboardContainer from '../dashboard-container'
import * as util from '../../lib/util.js'
import {tokenSet} from '../../action/auth-actions.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'
import AuthForm from '../auth-form/index.js'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false,
    }
  }


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
              <Route exact path='/' component={LandingContainer} />
              <Route exact path='/Signup' component={SettingsContainer} />
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

// <div className="init-page">
// <nav>
// <ul>
//   <li><Link to='/welcome/signup'> Signup </Link></li>
//
//   <li><Link to='/welcome/login'> Login </Link></li>
//   <li><Link to='/dashboard'> Dashboard </Link></li>
//   <li><Link to='/settings'> Settings </Link></li>
// </ul>
// </nav>
// </div>

// <Route exact path='/welcome/:auth' component={LandingContainer} />
// <Route exact path='/settings' component={SettingsContainer} />
// <Route exact path='/dashboard' component={DashboardContainer} />


export default connect(mapStateToProps, mapDispatchToProps)(App)
