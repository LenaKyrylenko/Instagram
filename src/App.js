import './App.scss'
import { Provider, connect } from 'react-redux'
import { Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import React, { useMemo, useState, useEffect } from 'react'
import { store } from './reducers'
import { sortableContainer, sortableElement } from 'react-sortable-hoc'
import { arrayMove, arrayMoveImmutable, arrayMoveMutable } from 'array-move'
import { useDropzone } from 'react-dropzone'
import 'antd/dist/antd.css'
import {
  actionPromise,
  actionPending,
  actionFulfilled,
  actionFullLogin,
  actionRegister,
  actionFullRegister,
  gql,
  actionAboutMe,
  actionAvatar,
  actionUploadFile,
  actionUploadFiles,
  actionSetAvatar,
  actionPostUpsert,
  backendURL,
  actionAllPosts,
  actionOnePost,
} from './actions'
import { Upload, Button, DatePicker, Space } from 'antd'
import moment from 'moment'
import { UploadOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'
import { Avatar, Image, Divider, Radio } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import user from './materials/user.png'
import photoNotFound from './materials/photoNotFound.png'
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import { Carousel } from 'antd'
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons'
console.log(store.getState())
store.subscribe(() => console.log(store.getState()))
const PageMain = () => <div className="PageMain">ГЛАВНАЯ</div>

const Card = ({ post, onPost }) => (
  <>
    <Link to={`/post/${post?._id}`} onClick={() => onPost(post?._id)}>
      {post?.images && post?.images[0] && post.images[0]?.url ? (
        <img
          className="Card"
          src={backendURL + '/' + post.images[0].url}
          style={{ maxWidth: '200px', maxHeight: '200px' }}
        />
      ) : (
        <img
          className="Card"
          src={photoNotFound}
          style={{ maxWidth: '200px', maxHeight: '200px' }}
        />
      )}
      {/* {console.log(post?._id)} */}
    </Link>
  </>
)
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <div
      className="carousel-control-next"
      style={{
        fontSize: '50px',
        color: '#a8a8a8',
        position: 'absolute',
        left: '100%',
        top: '50%',
        margin: 'auto',
      }}
      onClick={onClick}
    >
      <RightCircleFilled />
    </div>
  )
}

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <div
      className="carousel-control-prev"
      style={{
        color: '#a8a8a8',
        fontSize: '50px',
        position: 'absolute',
        margin: 'auto',
        right: '100%',
        top: '50%'
      }}
      onClick={onClick}
    >
      <LeftCircleFilled />
    </div>
  )
}

const MyCarousel = ({ images = [] }) => {
  console.log('IMAGES', images)
  return (
    <>
      <div>
        <Carousel
          style={{
            display: 'block',
            minWidth: '500px',
            minHeight: '500px',
            background: 'blue',
          }}
          effect="fade"
          arrows
          nextArrow={<SampleNextArrow />}
          prevArrow={<SamplePrevArrow />}
        >
          {images &&
            images.map((i, index) =>
              i?.url ? (
                <div key={index}>
                  <img
                    className="PostImage"
                    src={backendURL + '/' + i?.url}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      maxWidth: '400px',
                      maxHeight: '400px',
                    }}
                  />
                </div>
              ) : (
                <div>
                  <img
                    className="PostImage"
                    src={photoNotFound}
                    style={{ maxWidth: '400px', maxHeight: '400px' }}
                  />
                </div>
              ),
            )}
        </Carousel>
      </div>
    </>
  )
}
const PagePost = ({ onePost, aboutMe: { avatar, login } = {}, onPost }) => {
  return (
    <>
      <MyCarousel images={onePost?.images} />

      {avatar ? (
        <Avatar
          style={{ width: '50px', height: '50px' }}
          src={backendURL + '/' + avatar?.url}
        />
      ) : (
        <Avatar style={{ width: '50px', height: '50px' }} src={user} />
      )}
      <h2> {onePost?.title || ''} </h2>
      <h2> {onePost?.text || ''} </h2>
    </>
  )
}

const CPost = connect((state) => ({
  onePost: state.promise.onePost?.payload,
  aboutMe: state.promise?.aboutMe?.payload,
}))(PagePost)
const PageAboutMe = ({
  aboutMe: { _id, login, nick, createdAt, avatar, followers, following } = {},
  allPosts,
  onPosts,
  onPost,
}) => {
  useEffect(() => {
    onPosts()
  }, [])
  // console.log('CREATED AT',new Intl.DateTimeFormat().format(createdAt));
  return (
    <section className="AboutMe">
      <Avatar
        style={{ width: '150px', height: '150px', position: 'absolute' }}
        src={backendURL + '/' + avatar?.url || user}
      />
      <div className="Info">
        <h1> {login}</h1>
        <h3>
          {' '}
          Created Account: {new Intl.DateTimeFormat('en-GB').format(createdAt)}
        </h3>
        <div style={{ display: 'flex' }}>
          {/* {allPosts?.length} style={{display: 'flex',justifyContent: 'space-between'}}*/}
          <h3> {allPosts?.length} posts </h3>

          <h3 style={{ marginLeft: '20px' }}>
            {' '}
            {followers?.length} followers{' '}
          </h3>

          <h3 style={{ marginLeft: '20px' }}>
            {' '}
            {following?.length} following{' '}
          </h3>
        </div>
        <h3> nick: {nick == null ? login : nick}</h3>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            padding: '20px',
            margin: '20px',
          }}
        >
          {(allPosts || [])?.map((item) => (
            <Card post={item} onPost={onPost} />
          ))}
        </div>
        {/* <h3> Created Account: {
<div>
<img
      src={backendURL + '/' + allPosts?.url}
      style={{ maxWidth: '200px', maxHeight: '200px' }}/>
</div>
date} </h3> */}
      </div>
    </section>
  )
}
const CPageAboutMe = connect(
  (state) => ({
    aboutMe: state.promise?.aboutMe?.payload,
    allPosts: state.promise?.allPosts?.payload,
  }),
  { onPosts: actionAllPosts, onPost: actionOnePost },
)(PageAboutMe)
const PageCreatePost = () => (
  <div style={{ maxWidth: '700px', maxHeight: '700px', background: '#FFFACD' }}>
    <h2>Edit Post</h2>
    <CBasic />
  </div>
)
const Main = () => (
  <main>
    <Switch>
      <Route path="/" exact component={PageMain} />
      <Route path="/profile/:_id" component={CPageAboutMe} />
      <Route path="/edit/post" component={PageCreatePost} />
      <Route path="/post/:_id" component={CPost} />
      {/* <CBasic /> */}
    </Switch>
  </main>
)
const Header = () => (
  <section className="Header">
    <AddPost />
    <Recommendations />
    <Likes />
    <CUser />
  </section>
)
const Likes = () => <button className="Likes"> Likes </button>
const Recommendations = () => (
  <button className="Recomendations"> Recommendations </button>
)
const AddPost = ({ children }) => {
  const [state, setState] = useState(false)

  return (
    <>
      <Link to={`/edit/post`}>
        <button onClick={() => setState(!state)}> + </button>
        {!state && children}
      </Link>
    </>
  )
}

const CBasic = connect(null, { onLoad: actionSetAvatar })(Basic)
// const CAddPost =connect(null,{actionPostUpsert})
const User = ({ aboutMe: { _id, login, avatar } = {} }) => (
  <Link className="User" to={`/profile/${_id}`}>
    <Avatar src={backendURL + '/' + avatar?.url || user} />
  </Link>
)

const CUser = connect((state) => ({ aboutMe: state.promise.aboutMe?.payload }))(
  User,
)

function Basic({ onLoad }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))
  useEffect(() => {
    acceptedFiles[0] && onLoad(acceptedFiles[0])
  }, [acceptedFiles])
  return (
    <section className="container">
      <div {...getRootProps({ className: 'Dropzone' })}>
        <input {...getInputProps()} />
        <Button icon={<UploadOutlined />}>
          Drag 'n' drop some files here, or click to select files
        </Button>
      </div>
      <aside>
        <h4 style={{ color: 'black' }}>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  )
}
const defaultPost = {
  _id: '620cfd26ad55d22f3e2fb336',
  title: 'Bmw',
  text: 'Bmw',
  images: [
    {
      _id: '620b8374ad55d22f3e2fb316',
      url: 'images/e125a428191726307968880977dac103',
    },
    {
      _id: '620b8399ad55d22f3e2fb317',
      url: 'images/4ae46578989c497582995ba8caeb5de5',
    },
    {
      _id: '620b83b0ad55d22f3e2fb318',
      url: 'images/ae839539f61249b15feda98cad7eb858',
    },
  ],
}

store.getState().auth?.token && store.dispatch(actionAboutMe())

const SortableItem = sortableElement(({ url }) => (
  <li>
    <img
      src={backendURL + '/' + url}
      style={{ maxWidth: '200px', maxHeight: '200px' }}
    />
  </li>
))

const SortableContainer = sortableContainer(({ children }) => {
  return (
    <>
      <ul>{children}</ul>

      {/* <input value={title}/> */}
    </>
  )
})
const Input = ({ state, onChangeText }) => (
  <input
    className="Input"
    value={state}
    placeholder={state || ''}
    onChange={onChangeText}
  />
)
const PostEditor = ({ post = defaultPost, onSave, onFileDrop, fileStatus }) => {
  //по файлу в дропзоне:
  //дергать onFileDrop
  //fileStatus - информация о заливке файла из redux
  //через useEffect дождаться когда файл зальется
  console.log('STATUS ', fileStatus?.status)
  console.log('ON FILE DROP ', onFileDrop)

  const [state, setState] = useState(post)
  useEffect(() => {
    fileStatus?.status == 'FULFILLED' &&
      setState({
        ...state,
        images: [
          ...state.images,
          {
            _id: fileStatus?.payload?._id,
            url: fileStatus?.payload?.url,
          },
        ],
      })
  }, [fileStatus])

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setState({
      ...state,
      images: arrayMoveImmutable(state.images, oldIndex, newIndex),
    })
  }
  const onChangeTitle = (event) =>
    setState({
      ...state,
      title: event.target.value,
    })

  const onChangeText = (event) =>
    setState({
      ...state,
      text: event.target.value,
    })
  const onRemoveImage = (_id) =>
    setState({
      ...state,
      images: state.images.filter((item) => item._id !== _id),
    })
  return (
    <section className="Post">
      <Basic onLoad={onFileDrop} />
      <SortableContainer onSortEnd={onSortEnd}>
        {(state.images || []).map(({ _id, url }, index) => (
          <>
            <SortableItem key={`item-${_id}`} index={index} url={url} />
            <button onClick={() => onRemoveImage(_id)}> x </button>
          </>
        ))}
      </SortableContainer>
      <h1 className="Title"> Title </h1>
      <Input state={state.title || ''} onChangeText={onChangeTitle} />
      <h1 className="Title"> Text </h1>

      <Input state={state.text || ''} onChangeText={onChangeText} />
      <button
        disabled={state?.images?.length == 0}
        onClick={() => onSave(state)}
      >
        Save
      </button>
    </section>
  )
}
const CPostEditor = connect(
  (state) => ({ fileStatus: state.promise?.uploadFiles }),
  {
    onSave: actionPostUpsert,
    onFileDrop: actionUploadFiles,
  },
)(PostEditor)
// fileStatus=connect((state)=>(state.promise?.uploadFile))(CUploadFile)

const history = createHistory()
function App() {
  return (
    <Router history={history}>
      <Provider store={store}>
        <div className="App">
          <Header />
          <Divider />
          <Main />
          {/* <PostEditor /> */}
          {/* <CPost /> */}
          {/* <Gallery/> */}
        </div>
      </Provider>
    </Router>
  )
}

export default App
