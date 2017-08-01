import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import createAppStore from '../../lib/app-store-create.js';
import LandingPage from '../landing-page';
import AuthContainer from '../auth-container';

const store = createAppStore();

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <Provider store={store}>
          <BrowserRouter>
            <main>
              <Route exact path='/' component={LandingPage} />
              <Route path='/auth/:authTarget' component={AuthContainer} />
            </main>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
