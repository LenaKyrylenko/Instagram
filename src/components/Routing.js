import { InputForm, CRegisterForm, CLoginForm } from './LoginRegisterLogout'
import { Router, Route, Redirect, Switch } from 'react-router-dom'
import { CExplorePosts } from '../pages/explorePosts'
import { CPostForFeed, Feed } from '../pages/feedPosts'
import { CPostEditor } from '../pages/createAndEditPost'
import { CPageAboutUser } from '../pages/profilePage'
import { CPost } from './Post'
import { Provider, connect } from 'react-redux'

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
 export const CRouting = connect((state) => ({
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
  