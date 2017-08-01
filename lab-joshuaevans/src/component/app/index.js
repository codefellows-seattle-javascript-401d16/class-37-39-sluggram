import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <main>
            <Route exact path="/" />
            <h1>something</h1>
          </main>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
