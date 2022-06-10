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
import {CExplorePosts} from './components/Expore'
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import { CPostForFeed, Feed } from './components/PostFeed'
import {CPostEditor } from './components/NewPost'
import { CLoginForm,CRegisterForm,InputForm } from './components/LoginRegisterLogout'
import { Header } from './components/Header'
import {actionRemoveDataUser,actionClearDataUserType,actionClearUserData}  from './reducers'
console.log(store.getState())
store.subscribe(() => console.log(store.getState()))
console.log('ABOUT ME', store.getState().auth?.payload?.sub?.id)
const OldMain = () =>

  <Switch>
  <Header />
<Route path="/" exact component={PageMain}  />
<Route path="/profile/:_id" component={CPageAboutUser}  />
<Route path="/explore" component={CExplorePosts}   />
<Route path="/edit/post/:_id" component={CPostEditor}   />
<Route path="/post/:_id" component={CPost}   />
<Route path="/feed" component={CPostForFeed}   />
<CProtectedRoute
     roles={['user']}
     fallback="/feed"
     path="/*"
     component={CPostForFeed}
   />

</Switch>
  
const PageMain = () => <div className="PageMain">ГЛАВНАЯ</div>
const Main = ({ _id }) => {
  console.log('_id token in app: ', _id)
  
  // console.log('TOKEN ', _id)
  console.log('localStorage.getItem: ', localStorage.getItem("authToken"))
  return (
    (!localStorage.getItem("authToken")&&!_id)
      ?  
      // {
      //   actionClearDataUserType() 
   <Switch>
      <Route path='/login'
            component={CLoginForm} exact  />
          {/* <Route path='/input'
            component={InputForm} /> */}
            <Route path='/register'
            component={CRegisterForm}   />
            <CProtectedRoute
            roles={['anon']}
            fallback="/input"
            path="/*"
            component={InputForm}
          />
          {/* <Redirect from='/*' to='/input' /> */}
       </Switch >  
          // }  
      :
      <Switch>
         <Header />
    <Route path="/" exact component={PageMain}  />
    <Route path="/profile/:_id" component={CPageAboutUser}  />
    <Route path="/explore" component={CExplorePosts}   />
    <Route path="/edit/post/:_id" component={CPostEditor}   />
    <Route path="/post/:_id" component={CPost}   />
    <Route path="/feed" component={CPostForFeed}   />
    <CProtectedRoute
            roles={['user']}
            fallback="/feed"
            path="/*"
            component={CPostForFeed}
          />

</Switch>
    )
}



const CMain =  connect((state) => ({
  _id: state.auth?.payload?.sub?.id
}))(Main)

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
  auth: state.auth?.payload?.sub?.acl,
}))(ProtectedRoute)

export const history = createHistory()

function App() {

  if (store.getState().auth?.token) {
    history.push('/feed')
    console.log('токен', store.getState().auth?.payload?.sub?.id)
    store.dispatch(actionFullProfilePage(store.getState().auth?.payload?.sub?.id))
    store.dispatch(actionFullProfilePageUser(store.getState().auth?.payload?.sub?.id))
    localStorage.authToken = store.getState().auth?.token;
  }else {
    history.push('/input')
    store.dispatch(actionRemoveDataUser())
    store.dispatch(actionClearUserData())
    store.dispatch(actionClearDataUserType())
  }

  store.getState().auth.payload?.sub?.id ? <Redirect to="/"/> : <Redirect to="/input"/>
  return (
    <Router history={history}>
      <Provider store={store}>
        <div className="App">
          <Divider />
          <OldMain />
{/*          
          <CProtectedRoute
            roles={['anon']}
            fallback="/input"
            path="/*"
            component={InputForm}
          />
          <CProtectedRoute
            roles={['user']}
            fallback="/feed"
            path="/*"
            component={CPostForFeed}
          /> */}
        </div>
      </Provider>
    </Router>
  )
}
export default App
