import React from 'react'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import {Provider} from 'react-redux'
import appStoreCreate from '../../lib/app-store-create.js'
import LandingContainer from '../landing-container/index.js'


class App extends React.Component {


  render() {
    let store = appStoreCreate()
    return(
      <div className='app'>
        <Provider store={store}>
          <BrowserRouter>
            <div>
              <header>
                <h1> SUHHHH DUDE </h1>
                <nav>
                <ul>
                  <li><Link to='/welcome/signup'> signup </Link></li>
                  <li><Link to='/welcome/login'> login </Link></li>
                </ul>
                </nav>
              </header>

              <Route path='/welcome/:auth' component={LandingContainer} />
            </div>
          </BrowserRouter>
        </Provider>
      </div>
    )
  }
}

export default App
