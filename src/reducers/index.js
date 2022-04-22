import thunk from 'redux-thunk';
import { actionAuthLogin, gql, actionPromise, actionAllPosts, actionAboutMe } from '../actions'
import { createStore, combineReducers, applyMiddleware } from 'redux';

function promiseReducer(state = {}, { type, name, status, payload, error }) {
    if (type === 'PROMISE') {
      return {
        ...state,
        [name]: { status, payload, error },
      }
    }
    return state
  }
  
const jwtDecode = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch (e) {
      return null
    }
}

export const actionProfilePageDataType= (aboutMe, allPosts) =>
  ({ type: 'PROFILE-PAGE', aboutMe, allPosts })


export const actionFullProfilePage = (_id) =>
  async dispatch => {
    const aboutMe = await dispatch(actionAboutMe(_id))
    const allPosts = await dispatch(actionAllPosts(_id))
    if (aboutMe && allPosts) {
      await dispatch(actionProfilePageDataType(aboutMe, allPosts))
    }
  }

export const profileReducer = (state = {}, { type, aboutMe,allPosts, newResult }) => {
  const types = {
      'PROFILE-PAGE': () => {
          return {
              ...state, aboutMe, allPosts
          }
      }

  }
  if (type in types) {
      return types[type]()
  }
  return state
}

  function authReducer(state, { type, token }) {
    if (state === undefined && localStorage.authToken) {
      token = localStorage.authToken
      type = 'AUTH_LOGIN'
    }
    if (type === 'AUTH_LOGIN') {
      if (jwtDecode(token)) {
        localStorage.authToken = token
        return { token, payload: jwtDecode(token) }
      }
    }
    if (type === 'AUTH_LOGOUT') {
      localStorage.authToken = ''
      return {}
    }
    return state || {}
  }
 export const store = createStore(
    combineReducers({
      promise: promiseReducer,
      auth: authReducer,
      profileData:profileReducer
    }),
    applyMiddleware(thunk),
)

