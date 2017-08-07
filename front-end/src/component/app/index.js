import React from 'react'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import appStoreCreate from '../../lib/app-store-create.js'
import LandingContainer from '../landing-container/index.js'
import SettingsContainer from '../settings-container'
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
                <h1> SUHHHH DUDE </h1>
                <nav>
                <ul>
                  <li><Link to='/welcome/signup'> signup </Link></li>
                  <li><Link to='/welcome/login'> login </Link></li>
                  <li><Link to='/settings'> Settings </Link></li>
                </ul>
                </nav>
              </header>

              <Route exact path='/welcome/:auth' component={LandingContainer} />
              <Route exact path='/settings' component={SettingsContainer} />
            </div>
          </BrowserRouter>
      </div>
    )
  }
}

// let mapStateToProps = (state) => ({
//   profile: state.profile
// })
//
// let mapDispatchToProps = (dispatch) => ({
//   tokenSet: (token) => dispatch(tokenSet(token)),
// })
export default App
// export default connect(mapStateToProps, mapDispatchToProps)(App)
