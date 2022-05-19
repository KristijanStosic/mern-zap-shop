import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import './index.css'
import 'normalize.css'
import App from './App'
import { AppProvider } from './context'

ReactDOM.render(
  <Provider store={store}>
    <AppProvider>
      <App />
    </AppProvider>
  </Provider>,
  document.getElementById('root')
)
