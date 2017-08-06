//home page
import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter, Route, Link} from 'react-router-dom'

import * as util from '../../lib/util.js'
import {tokenSet} from '../../action/auth-actions'
import {userProfileFetchRequest} from '../../action/profile-actions.js'
import appStoreCreate from '../../lib/app-store-create.js'
import SettingsContainer from '../settings-container'
import LandingContainer from '../landing-container'


class App extends React.Component {
  componentDidMount() {

  }

  render() {
    return(
      <div className='app'>
        <BrowserRouter>
          <div>
            <header>
              <h1> App Store Create </h1>
              <nav>
                <ul>
                  <li><Link to='/welcome/signup'> signup </Link></li>
                  <li> <Link to='/welcome/login'> login </Link></li>
                  <li><Link to='/settings'> settings </Link></li>
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

let mapStateToProps = (state) => ({
  profile: state.profile,
})

let mapDispatchToProps = (dispatch) => ({
  tokenSet: (token) => dispatch(tokenSet(token)),
  userProfileFetch: () => dispatch(userProfileFetchRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
