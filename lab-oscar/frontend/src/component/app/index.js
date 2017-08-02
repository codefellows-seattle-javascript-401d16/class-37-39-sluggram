import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import './_app-header.scss';
import * as util from '../../lib/util.js';
import LandingContainer from '../landing-container';
import {tokenSet} from '../../action/auth-actions.js';
import appStoreCreate from '../../lib/app-store-create';

let store =  appStoreCreate();

class App extends React.Component {
  componentDidMount(){
    let token = util.readCookie('X-Sluggram-Token');
    if(token){
      this.props.tokenSet(token);
    }
  }
  render(){
    return (
      <div>
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
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile,
});

let mapDispatchToProps = (dispatch) => ({
  tokenSet: (token) => dispatch(tokenSet(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
