import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter, Route, Link} from 'react-router-dom'

import * as util from '../../lib/util.js'
import {tokenSet} from '../../action/auth-actions'
import appStoreCreate from '../../lib/app-store-create.js'
import DashboardContainer from '../dashboard-container'
import LandingContainer from '../landing-container'

// let store = appStoreCreate()
// where did Provider go?

class App extends React.Component {
  componentDidMount() {
    let token = util.readCookie('X-Token')
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
              <h1> App Store Create </h1>
              <nav>
                <ul>
                  <li><Link to='/welcome/signup'> signup </Link></li>
                  <li> <Link to='/welcome/login'> login </Link></li>
                  <li><Link to='/dashboard'> dashboard </Link></li>
                </ul>
              </nav>
            </header>
            <Route exact path='/welcome/:auth' component={LandingContainer} />
            Route exact path='/dashboard' component={DashboardContainer}
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
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
