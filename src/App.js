import './App.scss'
import { Provider, connect } from 'react-redux'
import { Router, Route, Redirect, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import React from 'react'
import { store } from './redux/reducers'
import { CPageAboutUser } from './components/User'
import { CPost } from './components/Post'
import 'antd/dist/antd.css'
import { actionFullProfilePage } from './redux/thunk'
import { actionFullAllGetPosts } from './actions'
import { CExplorePosts } from './components/Explore'
import { CPostForFeed, Feed } from './components/PostFeed'
import { CPostEditor } from './components/NewPost'
import { Header } from './components/Header'
import { InputForm, CRegisterForm, CLoginForm } from './components/LoginRegisterLogout'

console.log(store.getState())
store.subscribe(() => console.log(store.getState()))
console.log('ABOUT ME', store.getState().auth?.payload?.sub?.id)
const Routing = ({ token }) => {

  return <>
    {token ?
      <Switch>
        <Route path="/profile/:_id" component={CPageAboutUser} />
        <Route path="/explore" component={CExplorePosts} />
        <Route path="/edit/post/:_id" component={CPostEditor} />
        <Route path="/post/:_id" component={CPost} />
        <Route path="/feed" component={CPostForFeed} />
        <Redirect from="/*" to="/feed" />
      </Switch>
      :
      <Switch>
        <Route path="/login" exact component={CLoginForm} />
        <Route path="/register" component={CRegisterForm} />
        <Route path="/input" component={InputForm} />
        <Redirect from="/*" to="/input" />
        <CProtectedRoute
          roles={['anon']}
          fallback="/*"
          path="/input"
          component={InputForm}
        />
      </Switch>
    }
  </>
}
const CRouting = connect((state) => ({
  token: state.auth?.token,
}))(Routing)

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
      actionFullProfilePage(store.getState().auth?.payload?.sub?.id)
    )
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
