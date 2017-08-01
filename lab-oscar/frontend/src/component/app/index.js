import React from 'react';
import LandingContainer from '../landing-container';
import {BrowserRouter, Route, Link} from 'react-router-dom';

class App extends React.Component {
  render(){
    return (
      <div>
        <BrowserRouter>
          <div>
            <header>
              <h1> Welcome to The App</h1>
              <nav>
                <ul>
                  <li><Link to='/signup'>Sign Up</Link></li>
                  <li><Link to='/login'>Login</Link></li>
                </ul>
              </nav>
            </header>
            <Route path='/:auth' component={LandingContainer} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
