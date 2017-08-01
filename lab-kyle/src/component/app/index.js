import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import appStoreCreate from '../../lib/app-store-create.js'

let store = appStoreCreate()

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Provider store={store}>
          <BrowserRouter>
            <div>
              <header>
                <h1>UP!</h1>
              </header>

            </div>
          </BrowserRouter>
        </Provider>
      </div>
    )
  }
}

export default App
