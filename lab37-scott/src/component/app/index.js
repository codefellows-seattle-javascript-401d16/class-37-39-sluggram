import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Landing from '../landing';
import Settings from '../setting';
import Dashboard from '../dashboard';
import * as authAction from '../../action/auth-action.js';
import * as util from '../../lib/util.js';

class App extends React.Component{
  constructor(props){
    super(props);
  }
  //create compoentwillmount that handles the cookie on load from the util file / article code
  //check if there's a token in the cookies on page load. Set the token from the cookies
  //to the state as the auth value.

  componentDidMount(){
    let token = util.readCookie('X-Sluggram-Token');
    console.log('cdm token: ', token);
    if(token) this.props.tokenSet(token);
    console.log('app auth:', this.props.auth);
  }

  render(){
    return(
      <BrowserRouter>
        <div className='app'>
          <header>
              Hello App
            <nav>
              <ul>
                {util.renderIf(this.props.auth,
                  <div className='logged-in'>
                    <li><a href='/welcome' onClick={() => this.props.tokenDestroy()}> Log Out </a></li>
                    <li><Link to='/settings'> Settings </Link></li>
                  </div>
                )}
                <li><Link to='/welcome/signup'> Signup </Link></li>
                <li><Link to='/welcome/login'> Login </Link></li>
              </ul>
            </nav>
          </header>
          <Route exact path='/welcome/:auth' component={Landing} />
          <Route exact path='/settings' component={Settings} />
          <Route exact path='/dashboard' component={Dashboard} />
        </div>
      </BrowserRouter>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

let mapDispatchToProps = (dispatch) => ({
  tokenSet: (token) => dispatch(authAction.tokenSet(token)),
  tokenDestroy: (token) => dispatch(authAction.tokenDestroyOnLogout(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
