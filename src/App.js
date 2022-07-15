import './App.scss'
import { Provider, connect } from 'react-redux'
import { Router, Route, Redirect, Switch } from 'react-router-dom'
import React from 'react'
import { store } from './redux'
import 'antd/dist/antd.css'
import { actionFullProfilePage } from './redux/saga'
import { actionFullAllGetPosts } from './actions'

import { CShowHeader } from './pages/header'
import { CRouting } from './components/Routing'
import {history} from './helpers'
console.log(store.getState())
store.subscribe(() => console.log(store.getState()))
console.log('ABOUT ME', store.getState().auth?.payload?.sub?.id)




function App() {
  if (store.getState().auth?.token) {
    console.log('токен', store.getState().auth?.payload?.sub?.id)
    store.dispatch(actionFullProfilePage())
    }
  return (
    <Router history={history}>
      <Provider store={store}>
        <div className="App">
          <CRouting />
          <CShowHeader />
        </div>
      </Provider>
    </Router>
  )
}
export default App
