import './App.scss'
import { Provider, connect } from 'react-redux'
import { Router, Route, Redirect, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import React from 'react'
import { store } from './reducers'
import { CPageAboutUser } from './components/User'
import { CPost } from './components/Post'
import 'antd/dist/antd.css'
import { actionFullProfilePage } from './actionReducers'
import { CExplorePosts } from './components/Expore'
import { CPostForFeed, Feed } from './components/PostFeed'
import { CPostEditor } from './components/NewPost'
import { Header } from './components/Header'
import {InputForm, CRegisterForm,CLoginForm} from './components/LoginRegisterLogout'

console.log(store.getState())
store.subscribe(() => console.log(store.getState()))
console.log('ABOUT ME', store.getState().auth?.payload?.sub?.id)
const Main = () => (
  <main>
    <Switch>
      <Route path="/profile/:_id" component={CPageAboutUser} />
      <Route path="/explore" component={CExplorePosts} />
      <Route path="/edit/post/:_id" component={CPostEditor} />
      <Route path="/post/:_id" component={CPost} />
      <Route path="/feed" component={CPostForFeed} />
      <Route path="/login" exact component={CLoginForm} />
      <Route path="/register" component={CRegisterForm} />
      <Route path="/input" component={InputForm} />
      <Redirect from="/*" to="/feed" />
    </Switch>
  </main>
)

const ProtectedRoute = ({
  roles = [],
  fallback = '/login',
  component,
  auth,
  ...routeProps
}) => {
  const WrapperComponent = (renderProps) => {
    const C = component
    if (!auth) auth = ['anon']
    let intersection = auth.filter((x) => roles.includes(x))
    if (intersection.length == 0) return <Redirect to={fallback} />

    return <C {...renderProps} />
  }
  return <Route {...routeProps} component={WrapperComponent} />
}
const CProtectedRoute = connect((state) => ({
  auth: state.auth?.payload?.sub.acl,
}))(ProtectedRoute)

export const history = createHistory()

const ShowHeader = ({ token }) => (token ? <Header /> : null)
const CShowHeader = connect((state) => ({
  token: state.auth?.token,
}))(ShowHeader)

function App() {
  if (store.getState().auth?.token) {
    console.log('токен', store.getState().auth?.payload?.sub?.id)
    store.dispatch(
      actionFullProfilePage(store.getState().auth?.payload?.sub?.id),
    )
  } else {
    history.push('/input')
  }

  return (
    <Router history={history}>
      <Provider store={store}>
        <div className="App">
          <CShowHeader />
          <Main />
          <CProtectedRoute
            roles={['anon']}
            fallback="/*"
            path="/input"
            component={InputForm}
          />
        </div>
      </Provider>
    </Router>
  )
}
export default App
