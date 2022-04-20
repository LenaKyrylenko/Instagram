import './App.scss'
import { Provider, connect } from 'react-redux'
import { Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import React, { useMemo, useState, useEffect } from 'react'
import { store } from './reducers'
import { Basic } from './components/DropZone'
import { CPageAboutUser, PageAboutUser } from './components/User'
import { PageCreatePost, AddPost } from './components/NewPost'
import { CPost, MyCarousel } from './components/Post'

import { sortableContainer, sortableElement } from 'react-sortable-hoc'
import { arrayMove, arrayMoveImmutable, arrayMoveMutable } from 'array-move'
import 'antd/dist/antd.css'

import {
  actionAboutMe,
  actionAllPostsFeed,
  actionAllPosts,
  actionSetAvatar,
  actionPostsFeed,
  actionAllFollowing,
  actionAllFollowers,
  actionPostsMyFollowing2,
  actionSearchUser,
} from './actions'
import { Upload, Button, DatePicker, Space } from 'antd'
import moment from 'moment'
import { UploadOutlined, SearchOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'
import { Avatar, Image, Divider, Radio } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import user from './materials/user.png'
import photoNotFound from './materials/photoNotFound.png'
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import { Carousel, Popover } from 'antd'
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons'
import { Input, Select } from 'antd'
import { PagePost } from './components/Post'
import { CPostForFeed,Feed } from './components/PostFeed'

console.log(store.getState())
store.subscribe(() => console.log(store.getState()))
console.log('ABOUT ME', store.getState().auth?.payload?.sub?.id)
// console.log('ABOUT FOLLOWING',store.getState().promise.aboutUser?.payload?.following);
//store.dispatch(actionPostsFeed())

const PageMain = () => <div className="PageMain">ГЛАВНАЯ</div>


// const PageFeed = ({ aboutMe,allFollowing, onPostsFeed, onAllFollowing}) => {
//   console.log('ABOUT FOLLOWING',
//   store.getState().promise.aboutMe?.payload?.following);
//   useEffect(() => {
//     onPostsFeed()
//   }, [])
//   return <>
//  <div style={{background: '#FFFACD' }}>
//     <h2>Feed</h2>

//   </div>
//    </>
// }
// const CPageFeed =connect((state)=>(
//   {
//     aboutMe: state.promise.aboutMe?.payload ,
//   //  allPosts: state.promise?.allPosts?.payload,
//    postsFeed: state.promise?.postsFeed?.payload,
//   }), {onPostsFeed:actionPostsFeed})(PageFeed)
const Main = () => (
  <main>
    <Switch>
      <Route path="/" exact component={PageMain} />
      <Route path="/profile/:_id" component={CPageAboutUser} />
      <Route path="/edit/post" component={PageCreatePost} />
      <Route path="/post/:_id" component={CPost} />
      <Route path="/feed" component={CPostForFeed} />
      <Route path="/editProfile" component={CUserEdit} />
      <Route path="/followers" component={CUserFollowers} />

      {/* <CBasic /> */}
    </Switch>
  </main>
)
const UserFollowers = ({ followers }) => {
  console.log('followers ', followers)
  return (
    <div>
      {/* {console.log('start')} */}
      {(followers || [])?.map(({ _id, login, avatar }) => (
        <Link to={`/profile/${_id}`}>
          {console.log('doing something')}
          <Avatar
            style={{
              width: '60px',
              height: '60px',
              marginRight: '30px',
              position: 'absolute',
            }}
            src={'/' + avatar?.url || user}
          />
          {console.log('followers', login)}

          <h1 style={{ marginLeft: '30px' }}> {login}</h1>
        </Link>
      ))}
    </div>
  )
}

{
  /* { console.log('end') } */
}

// <div>
//   <ResultUserFind userFind={followers} />
//   {console.log('followers', followers)}
// </div>
const CUserFollowers = connect((state) => ({
  followers: state.promise.aboutMe?.payload?.followers,
}))(UserFollowers)

const ResultUserFind = ({ userFind }) => (
  <div>
    {userFind?.map(({ _id, login, avatar }) => (
      <Link to={`/profile/${_id}`}>
        <Avatar
          style={{
            width: '20px',
            height: '20px',
            marginRight: '30px',
            position: 'absolute',
          }}
          src={'/' + avatar?.url || user}
        />

        <h3 style={{ marginLeft: '30px' }}> {login}</h3>
      </Link>
    ))}
  </div>
)
const SearchUser = ({ onSearch, searchUser }) => {
  // const [value, setValue]=useState('')
  const onSearchUser = (value) => onSearch(value)
  const { Search } = Input
  return (
    <>
      <Popover
        placement="bottom"
        content={<ResultUserFind userFind={searchUser} />}
        trigger="click"
      >
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearchUser}
        />
      </Popover>
    </>
  )
}
const CSearch = connect(
  (state) => ({ searchUser: state.promise?.searchUser?.payload }),
  { onSearch: actionSearchUser },
)(SearchUser)
const CUserEdit = connect((state) => ({}), {})(PageAboutUser)

const Header = () => {
  const CFeed = connect((state) => ({
    aboutMe: state.promise?.aboutMe?.payload,
  }))(Feed)
  return (
    <section className="Header">
      <CSearch />
      {/* <Button icon={<SearchOutlined />}>Search</Button> */}
      <CFeed />
      <AddPost />
      <Recommendations />
      <Likes />
      <CUser />
    </section>
  )
}

const Likes = () => (
  <Button size="large" className="Likes">
    {' '}
    Likes{' '}
  </Button>
)

const Recommendations = () => (
  <Button size="large" className="Recomendations">
    {' '}
    Recommendations{' '}
  </Button>
)

const CBasic = connect(null, { onLoad: actionSetAvatar })(Basic)
// const CAddPost =connect(null,{actionPostUpsert})
const User = ({ aboutMe: { _id, login, avatar } = {} }) => (
  <Link className="User" to={`/profile/${_id}`}>
    <Avatar src={'/' + avatar?.url || user} />
  </Link>
)
// backendURL
const CUser = connect((state) => ({ aboutMe: state.promise.aboutMe?.payload }))(
  User,
)

//  store.getState().auth?.payload?.sub?.id

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
    console.log('токенчик ', store.getState().auth?.payload?.sub?.id)

    store.dispatch(actionAboutMe(store.getState().auth?.payload?.sub?.id))
    store.dispatch(actionAllPosts(store.getState().auth?.payload?.sub?.id))
  }
  else {
    console.log('ошибочка')
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

          {/* <CPostEditor /> */}
          {/* <CPost /> */}
          {/* <Gallery/> */}
        </div>
      </Provider>
    </Router>
  )
}

export default App
