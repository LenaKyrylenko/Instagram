import './App.scss'
import { Provider, connect } from 'react-redux'
import { Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import React, { useMemo, useState, useEffect } from 'react'
import { actionAboutUser, actionFullProfilePageUser, store } from './reducers'
import { Basic } from './components/DropZone'
import { CPageAboutUser, PageAboutUser } from './components/User'
import { PageCreatePost, AddPost } from './components/NewPost'
import { CPost, MyCarousel } from './components/Post'

import 'antd/dist/antd.css'
import {actionSetAvatar} from './actions'
import { actionFullProfilePage } from './reducers'
import { Upload, Button, DatePicker, Space, Avatar, Image, Divider, Radio } from 'antd'
import moment from 'moment'
import { UploadOutlined, SearchOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'
import { UserOutlined } from '@ant-design/icons'
import user from './materials/user1.png'
import photoNotFound from './materials/photoNotFound.png'
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import { CPostForFeed,Feed } from './components/PostFeed'

import { Header } from './components/Header'

console.log(store.getState())
store.subscribe(() => console.log(store.getState()))
console.log('ABOUT ME', store.getState().auth?.payload?.sub?.id)

const PageMain = () => <div className="PageMain">ГЛАВНАЯ</div>
const CUserEdit = connect((state) => ({}), {})(PageAboutUser)
const Main = () => (
  <main>
    <Switch>
      <Route path="/" exact component={PageMain} />
      <Route path="/profile/:_id" component={CPageAboutUser} />
      <Route path="/edit/post" component={PageCreatePost} />
      <Route path="/post/:_id" component={CPost} />
      <Route path="/feed" component={CPostForFeed} />
      <Route path="/editProfile" component={CUserEdit} />
    </Switch>
  </main>
)



const CBasic = connect(null, { onLoad: actionSetAvatar })(Basic)



const ProtectedRoute = ({
  roles = [],
  fallback = '/login',
  component,
  auth,
  ...routeProps
}) => {
  const WrapperComponent = (renderProps) => {
    // console.log('тут шото ', intersection)
    const C = component
    if (!auth) auth = ['anon']

    let intersection = auth.filter((x) => roles.includes(x))
    if (intersection.length == 0) return <Redirect to={fallback} />

    return <C {...renderProps} />
  }
  return <Route {...routeProps} component={WrapperComponent} />
}
const PageRegister = () => {
  return <div>REGISTER</div>
}
const CProtectedRoute = connect((state) => ({
  auth: state.auth?.payload?.sub.acl,
}))(ProtectedRoute)

const history = createHistory()

function App() {
  if (store.getState().auth?.token) {
    console.log('токен', store.getState().auth?.payload?.sub?.id)
    store.dispatch(actionFullProfilePage(store.getState().auth?.payload?.sub?.id))
  }
  else {
    console.log('ошибочка')
  }
  if (document.body.offsetHeight > document.documentElement.clientHeight) 
    console.log("Скролл есть");
else {
    console.log("Скролла нет");
}
  return (
    <Router history={history}>
      <Provider store={store}>
        <div className="App">
          <Header />
          <Divider />
          <Main />
          <CProtectedRoute
            roles={['anon']}
            fallback="/dashboard"
            path="/register"
            component={PageRegister}
          />
        </div>
      </Provider>
    </Router>
  )
}

export default App
