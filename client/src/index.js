import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import './index.css'
import 'normalize.css'
import App from './App'
import { AppProvider } from './context'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <Provider store={store}>
    <AppProvider>
      <Router>
        <App />
      </Router>
    </AppProvider>
  </Provider>,
  document.getElementById('root')
)
