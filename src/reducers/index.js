
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
function promiseReducer(state = {}, { type, name, status, payload, error }) {
 
  if (type === 'PROMISE') {
    return {
      ...state,
      [name]: { status, payload, error },
    }
  }
  if (type === 'PROMISE_CLEAR') {
    return {
      ...state,
      [name]: null,
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

export const profileUserReducer = (
  state = {},
  { type, aboutUser, allPosts, newPosts },
) => {
  const types = {
    'PROFILE-PAGE-USER': () => {
      return {
        ...state,
        aboutUser,
        allPosts,
      }
    },
    'CLEAR-DATA': () => {
      return {
        ...(state = {}),
        aboutUser: {},
        allPosts: [],
      }
    },
    'CHANGE-AVATAR-USER': () => {
      return {
        ...state,
        aboutUser,
      }
    },
  }

  if (type in types) {
    return types[type]()
  }
  return state
}

export const feedReducer = (
  state = {},
  { skip, type, newPosts = [], postId, postsFeed, postsFeedCount,newPostsFeedCount, newResult },
) => {
  const types = {
    'ADD-POSTS': () => {
      return {
        ...state,
        postsFeed: state?.postsFeed ? [...state.postsFeed, ...newPosts] : [...newPosts],
        // postsFeed: [...postsFeed || [], ...newPosts],
        postsFeedCount: postsFeedCount ? postsFeedCount : newPostsFeedCount
            
       // postsFeed: postsFeed ? [...postsFeed, ...newPosts] : [...newPosts],
      }
    },
    'COUNT': () => {
      return {
        ...state,
        postsFeedCount: postsFeedCount,
      }
    },
    'POSTS': () => {
      return {
        ...state,
        postsFeed: postsFeed ,
      }
    },
    'CLEAR-POSTS': () => ({
      ...state,
      postsFeed: [],
      postsFeedCount: 0,
  }),

    'ADD-LIKE-POSTS': () => ({
      ...state,
      postsFeed: postsFeed?.map((p) =>
        p._id === postId ? (p = { ...p, likes: [...newResult] }) : p,
      ),
    }),
    'DELETE-LIKE-POSTS': () => ({
      ...state,
      postsFeed: postsFeed?.map((p) =>
        p._id === postId ? (p = { ...p, likes: [...newResult] }) : p,
      ),
    }),

    'ADD-COMMENT-POSTS': () => ({
      ...state,
      postsFeed: postsFeed?.map((p) =>
        p._id === postId ? (p = { ...p, comments: [...newResult] }) : p,
      ),
    }),
  }
  if (type in types) {
    return types[type]()
  }
  return state
}
export const postReducer = (
  state = {},
  { skip, type, newPosts = [], onePost, postsFeed, postsFeedCount },
) => {
  const types = {
    'ONE-POST': () => {
      return {
        ...state,
        onePost,
      }
    },
    'CLEAR-POST-ONE': () => {
      return {
        ...state,
        onePost: {},
      }
    },
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
        ...state,
        aboutMe,
      }
    },
    'REMOVE-DATA': () => {
      return {
        ...(state = {}),
        aboutMe: {},
      }
    },
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
    feed: feedReducer,
    post: postReducer,
  }),
  applyMiddleware(thunk),
)
