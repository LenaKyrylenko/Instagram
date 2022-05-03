import thunk from 'redux-thunk';
import {
  actionAuthLogin, gql, actionPromise,
  actionAllPosts, actionAboutMe, actionAllPostsUser, actionAboutUser,
  actionPostsFeed,actionPostsFeedCount,
} from '../actions'
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

export const actionProfilePageDataTypeUser= (aboutUser, allPosts) =>
  ({ type: 'PROFILE-PAGE-USER', aboutUser, allPosts })

export const actionProfilePageData = (id) => ({ type: 'DATA_PROFILE', id })
  
  export const actionProfilePageDataType= (aboutMe) =>
  ({ type: 'PROFILE-PAGE', aboutMe })

export const actionFullProfilePageUser = (_id) =>
  async dispatch => {
    const aboutUser = await dispatch(actionAboutUser(_id))
    console.log('ABOUTUSER ', aboutUser)
    const allPosts = await dispatch(actionAllPostsUser(_id))
    console.log('ALLPOSTS ', allPosts )
    if (aboutUser && allPosts) {
      await dispatch(actionProfilePageDataTypeUser(aboutUser, allPosts))
    }
  }
  export const actionFullProfilePage = (_id) =>
  async dispatch => {
    const aboutMe= await dispatch(actionAboutMe(_id))
    // const allPostsMe = await dispatch(actionAllPosts(_id))
    if (aboutMe) {
      await dispatch(actionProfilePageDataType(aboutMe))
    }
  }
  export const actionRemoveDataUser= () =>
  ({ type: 'REMOVE-DATA' })

export const profileUserReducer = (state = {}, { type, aboutUser, allPosts }) => {
  const types = {
    'PROFILE-PAGE-USER': () => {
      return {
        ...state, aboutUser, allPosts
      }
    },
    'REMOVE-DATA': () => {
      return {
        ...state={},
        aboutUser:{},
        allPosts:[]
      }
  }
  
    }
    if (type in types) {
        return types[type]()
    }
    return state
  }
    export const actionFeedType= (newPosts) =>
  ({ type: 'ADD-POSTS', newPosts })

  export const actionFullFeed = () =>
    async (dispatch, getState) => {
  
    const postsFeed = await dispatch(actionPostsFeed(getState))
     const skip = postsFeed.length
    console.log('postsFeed ', postsFeed)
    const postsFeedCount = await dispatch(actionPostsFeedCount(getState))
    console.log('postsFeedCount ', postsFeedCount)

    // const allPosts = await dispatch(actionAllPostsUser(_id))
    // console.log('ALLPOSTS ', allPosts )

    // if (postsFeed?.length !== (postsFeedCount ? postsFeedCount : 1)) {
    //   const postsFeedNew = await dispatch(actionPostsFeed(_id))
    //   console.log('postsFeedNew ', postsFeedNew)
    //   const postsFeedCountNew = await dispatch(actionPostsFeedCount(_id))
    //   console.log('postsFeedCountNew ', postsFeedCountNew)
   
   
        // if (postsFeed && postsFeedCount)
        // await dispatch(actionFeedType(postsFeed, postsFeedCount))
      
      if (skip < postsFeedCount)
      {
        console.log('SKIIIP ', skip)
        const newPosts = await dispatch(actionPostsFeed(getState, skip))
        if (newPosts) {
          dispatch(actionFeedType(newPosts));
          const postsFeedCount = await dispatch(actionPostsFeedCount(getState))
          console.log('postsFeedCount ', postsFeedCount)
        }

        }
     
    }
  export const actionClearFeedPosts = () => ({ type: 'DELETE-POSTS' });

  export const actionFullClearFeedPosts = () => (dispatch) => {
    return dispatch(actionClearFeedPosts())
  }
  
  
export const feedReducer = (state = {}, {skip, type, newPosts=[], postsFeed,postsFeedCount }) => {
  const types = {
    'ADD-POSTS': () => {
      return {
        ...state,
        postsFeed: state?.postsFeed ? [...state?.postsFeed, ...newPosts] : [...newPosts]
      }
    },
    'DELETE-POSTS': () => {
      return {
        ...state,
        postsFeed: []
      }
  }
  
    }
    if (type in types) {
        return types[type]()
    }
    return state
  }

export const profileReducer = (state = {}, { type, aboutMe, newResult }) => {
  const types = {
      'PROFILE-PAGE': () => {
          return {
              ...state, aboutMe
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
      profileData: profileReducer,
      profilePage: profileUserReducer,
      feed:feedReducer
      
    }),
    applyMiddleware(thunk),
)

