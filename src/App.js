import './App.scss'
import { Provider, connect } from 'react-redux'
import { Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import React, { useMemo, useState, useEffect } from 'react'
import { store } from './reducers'
import { sortableContainer, sortableElement } from 'react-sortable-hoc'
import { arrayMove, arrayMoveImmutable, arrayMoveMutable } from 'array-move'
import { useDropzone } from 'react-dropzone'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import {
  actionPromise,
  actionPending,
  actionFulfilled,
  actionFullLogin,
  actionRegister,
  actionFullRegister,
  gql,
  backendURL,
} from './actions'
import { Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'
import { Avatar, Image, Divider, Radio } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import user from './materials/user.png'
console.log(store.getState())
store.subscribe(() => console.log(store.getState()))
const PageMain = () => <div className="PageMain">ГЛАВНАЯ</div>
const uploadFile = (file) => {
  const myForm = new FormData()
  myForm.append('photo', file)
  return fetch(backendURL + '/upload', {
    method: 'POST',
    headers: localStorage.authToken
      ? { Authorization: 'Bearer ' + localStorage.authToken }
      : {},
    body: myForm,
  }).then((result) => result.json())
}
const actionUploadFile = (file) => actionPromise('uploadFile', uploadFile(file))

const actionAvatar = (imageId) => async (dispatch, getState) => {
  await dispatch(
    actionPromise(
      'setAvatar',
      gql(
        `mutation setAvatar($imageId:ID, $userId:String){
    UserUpsert(user:{_id: $userId, avatar: {_id: $imageId}}){
    _id, avatar{
        _id
    }
    }
    }`,
        { imageId, userId: getState().auth?.payload?.sub?.id },
      ),
    ),
  )
}
const actionAboutMe = () => async (dispatch, getState) => {
  await dispatch(
    actionPromise(
      'aboutMe',
      gql(
        `query AboutMe($userId:String){
  UserFindOne(query:$userId)
  {
    _id createdAt login nick  avatar{_id url} 
    likesCount followers{_id login nick} following{_id login nick}
  }
}`,
        {
          userId: JSON.stringify([{ _id: getState().auth?.payload?.sub?.id }]),
        },
      ),
    ),
  )
}
const actionPostUpsert = (post) =>
  actionPromise(
    'postUpsert',
    gql(
      `
mutation PostUpsert($post:PostInput){
  PostUpsert(post:$post){
    _id title text 
  }
}`,
      {
        post: {
          ...post,
          images: post.images.map(({ _id }) => ({ _id })),
          // title: post.title,
          // text:post.text,
          // title:post.title
        },
      },
    ),
  )
const actionSetAvatar = (file) => async (dispatch) => {
  let result = await dispatch(actionUploadFile(file))
  if (result) {
    await dispatch(actionAvatar(result._id))
    await dispatch(actionAboutMe())
  }
}
const Page2 = () => <div className="PageMain">юзер</div>
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
      <Route path="/profile/:_id" component={Page2} />
      <Route path="/edit/post" component={PageCreatePost} />
      <CBasic />
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
const User = ({ aboutMe: { _id, login, avatar } = {}, getData }) => (
  <Link className="User" to={`/profile/${_id}`} onClick={() => getData()}>
    <Avatar src={backendURL + '/' + avatar?.url || user} />
  </Link>
)

const CUser = connect(
  (state) => ({ aboutMe: state.promise.aboutMe?.payload }),
  { getData: actionAboutMe },
)(User)

function Basic({ onLoad }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  )) // console.log('FILES',acceptedFiles[0])
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
  _id: '620b83e3ad55d22f3e2fb319',
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
  const [state, setState] = useState(post)
  // const [newTitle, setTitle] = useState(post.title || '')
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setState({
      ...state,
      images: arrayMoveImmutable(state.images, oldIndex, newIndex),
    })
  }
 const onChangeTitle=(event)=> 
    setState({
      ...state,
      title: event.target.value})

  const onChangeText=(event)=> 
      setState({
        ...state,
        text: event.target.value})
  return (
    <section className="Post">
      <SortableContainer onSortEnd={onSortEnd}>
        {(state.images || []).map(({ _id, url }, index) => (
          <SortableItem key={`item-${_id}`} index={index} url={url} />
        ))}
      </SortableContainer>
       <h1 className="Title"> Title </h1>
      <Input state={state.title} onChangeText={onChangeTitle}/>
      <h1 className="Title"> Text </h1>

      <Input state={state.text} onChangeText={onChangeText}/>
     
      <button onClick={() => onSave(state)}> Save </button>
    </section>
  )
}

const CPost = connect(null, { onSave: actionPostUpsert })(PostEditor)
// fileStatus=actionUploadFile(entity)
//по файлу в дропзоне:
//дергать onFileDrop
//fileStatus - информация о заливке файла из redux
//через useEffect дождаться когда файл зальется
//и сделать setState({...state, array: [...state.array, {объект файла с бэка с _id и url}]})
//по react-sortable-hoc
//делаете как в пример arrayMove для state.array
//по кнопке сохранения делаем onSave(state)
//где-то рядом остальные поля из state типа title name text
//но это вы уже знаете

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
          <CPost />
          {/* <MyImages Images={Images}/> */}
        </div>
      </Provider>
    </Router>
  )
}

export default App
