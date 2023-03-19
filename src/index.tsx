import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router'
import { Provider } from 'react-redux'
import store from './redux/store'
import reportWebVitals from './reportWebVitals'
import 'semantic-ui-less/semantic.less'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <Router />
  </Provider>,
)

reportWebVitals()
