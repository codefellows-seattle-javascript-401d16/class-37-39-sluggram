import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Landing from '../landing';
import Settings from '../setting';
import Dashboard from '../dashboard';
import {tokenSet} from '../../action/auth-action.js';
import * as util from '../../lib/util.js';

class App extends React.Component{
  constructor(props){
    super(props);
  }
  //create compoentwillmount that handles the cookie on load from the util file / article code
  //check if there's a token in the cookies on page load. Set the token from the cookies
  //to the state as the auth value.

  componentDidMount(){
    console.log('hit CDM');
    let token = util.readCookie('X-Sluggram-Token');
    console.log('cdm token: ', token);
    if(token) this.props.tokenSet(token);
  }

  render(){
    return(
      <BrowserRouter>
        <div className='app'>
          <header>
              Hello App
            <nav>
              <ul>
                <li><Link to='/welcome/signup'> Signup </Link></li>
                <li><Link to='/welcome/login'> Login </Link></li>
                <li><Link to='/settings'> Settings </Link></li>
              </ul>
            </nav>
          </header>
          <Route exact path='/welcome/:auth' component={Landing} />
          <Route exact path='/settings' component={Settings} />
          <Route exact path='/dashboard/me' component={Dashboard} />
        </div>
      </BrowserRouter>
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
