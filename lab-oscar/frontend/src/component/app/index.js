import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom';

import './_app-header.scss';
import Dashboard from '../dashboard';
import * as util from '../../lib/util.js';
import LandingContainer from '../landing-container';
import SettingsContainer from '../settings-container';
import {tokenSet, tokenDelete} from '../../action/auth-actions.js';
import {profileCreate} from '../../action/profile-actions.js';
import appStoreCreate from '../../lib/app-store-create';

let store =  appStoreCreate();

class App extends React.Component {
  constructor(props){
    super(props);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut(e){
    e.preventDefault();
    let deletedCookie = util.deleteCookie('X-Sluggram-Token');
    this.props.tokenDelete();
  }
  componentWillMount(){
    let token = util.readCookie('X-Sluggram-Token');
    if(token){
      this.props.tokenSet(token);
    }
    try{
      let profile = JSON.parse(localStorage.profile);
      if(profile){
        this.props.profileCreate(profile);
      }
    }catch(e){
      console.log('ERROR: ', e);
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
                <li className={this.props.auth ? 'navigation-link link-hide' :'navigation-link'}><Link to='/welcome/signup' alt='Sign Up'>Sign Up</Link></li>
                <li className={this.props.auth ? 'navigation-link link-hide' :'navigation-link'}><Link to='/welcome/login' alt='Log In'>Login</Link></li>
                <li className={!this.props.auth ? 'navigation-link link-hide' : 'navigation-link'}><Link to='/settings'> Settings </Link></li>
                <li className={!this.props.auth ?'navigation-link link-hide' : 'navigation-link'}><a href='#' onClick={this.handleLogOut}>Log Out</a></li>
              </ul>
            </header>
            <Route exact path='/welcome/:auth' component={LandingContainer} />
            <Route exact path='/settings' component={SettingsContainer} />
            <Route exact path='/dashboard' component={Dashboard} />
            {this.props.auth ? <Redirect to='/dashboard' /> : null}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

let mapDispatchToProps = (dispatch) => ({
  tokenSet: (token) => dispatch(tokenSet(token)),
  tokenDelete: () => dispatch(tokenDelete()),
  profileCreate: (profile) => dispatch(profileCreate(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
