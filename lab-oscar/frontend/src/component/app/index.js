import React from 'react';
import './_app-header.scss';
import {Provider} from 'react-redux';
import LandingContainer from '../landing-container';
import appStoreCreate from '../../lib/app-store-create';
import {BrowserRouter, Route, Link} from 'react-router-dom';

let store =  appStoreCreate();

class App extends React.Component {
  render(){
    return (
      <div>
        <Provider store={store}>
          <BrowserRouter>
            <div>
              <header className='header-main'>
                <Link to='/' alt='Home' className='header-logo'>
                  <img src='https://cdn0.iconfinder.com/data/icons/free-social-media-set/24/ok-64.png'
                  />
                </Link>
                <ul className='navigation-main'>
                  <li className='navigation-link'><Link to='/signup' alt='Sign Up'>Sign Up</Link></li>
                  <li className='navigation-link'><Link to='/login' alt='Log In'>Login</Link></li>
                </ul>
              </header>
              <Route exact path='/:auth' component={LandingContainer} />
            </div>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
