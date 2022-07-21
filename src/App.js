import './App.scss'
import { Provider, connect } from 'react-redux'
import { Router, Route, Redirect, Switch } from 'react-router-dom'
import React from 'react'
import { store } from './redux/store'
import 'antd/dist/antd.css'
import { actionFullProfilePageTypeSaga } from './actions/typeSaga/myDataTypesSaga'

import { CShowHeader } from './pages/header'
import { CRouting } from './components/Routing'
import history from './helpers/history'
store.subscribe(() => console.log(store.getState()))

function App() {
  if (store.getState().auth?.token) 
    store.dispatch(actionFullProfilePageTypeSaga())
    
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
