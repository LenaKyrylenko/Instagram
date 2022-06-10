import thunk from 'redux-thunk';
import {
  actionAuthLogin, gql, actionPromise,
  actionAllPosts, actionAboutMe, actionAllPostsUser, actionAboutUser,
  actionPostsFeed, actionPostsFeedCount, actionOnePost, actionAddComment,
  actionAddLike,actionDeleteLike,actionPostsCount,actionAuthLogout
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

  export const actionAvatarUpdate= (aboutUser) =>
  ({ type: 'CHANGE-AVATAR-USER', aboutUser })

  export const actionFullProfilePageUser = (_id) =>
  async dispatch => {
    const aboutUser = await dispatch(actionAboutUser(_id))
    console.log('ABOUTUSER ', aboutUser)
    const allPosts = await dispatch(actionAllPostsUser(_id))
    await dispatch(actionPostsCount(_id))
    console.log('ALLPOSTS ', allPosts )
    if (aboutUser && allPosts) {
      await dispatch(actionProfilePageDataTypeUser(aboutUser, allPosts))
    }
  }
  export const actionClearDataUserType= () =>
  ({ type: 'CLEAR-DATA' })

  export const actionClearUserData = () =>
  async dispatch => {
    const logOut = await dispatch(actionAuthLogout())
    console.log('logOut ', logOut)
  
   
    if (logOut) {
      const clearData = await dispatch(actionClearDataUserType())
       console.log('clearData ', clearData )
      // await dispatch(actionClearDataUserType())
    }
  }

  export const actionFullProfilePage = (_id) =>
  async dispatch => {
    const aboutMe = await dispatch(actionAboutMe(_id))
    console.log('aboutMe ', aboutMe)
    // const allPostsMe = await dispatch(actionAllPosts(_id))
    if (aboutMe) {
      await dispatch(actionProfilePageDataType(aboutMe))
    }
  }

  export const actionRemoveDataUser= () =>
  ({ type: 'REMOVE-DATA' })
export const profileUserReducer = (state = {}, { type, aboutUser, allPosts,newPosts }) => {
  const types = {
    'PROFILE-PAGE-USER': () => {
      return {
        ...state, aboutUser, allPosts
      }
    },
    'CLEAR-DATA': () => {
      return {
        ...state = {},
        aboutUser: {},
        allPosts: []
      }
    },
    'CHANGE-AVATAR-USER': () => {
      return {
        ...state, aboutUser
      }
    }
  
    ,
  }

    if (type in types) {
        return types[type]()
    }
    return state
  }
    export const actionFeedType= (newPosts) =>
  ({ type: 'ADD-POSTS', newPosts })

export const actionAddCommentPostInTape = (postId, newResult) =>
  ({ type: 'ADD-COMMENT-POSTS', postId, newResult })
  

export const actionAddFullCommentFeed = (postId, newResult) => async (
    dispatch,
    getState,
  ) => {
    await dispatch(actionAddComment(postId, newResult))
    const {
      promise: {
        addComment: { status },
      },
    } = getState()
    if (status === 'FULFILLED') {
      const onePost = await dispatch(actionOnePost(postId))
      if (onePost)
      await dispatch((actionAddCommentPostInTape(postId,newResult)))
    }
    // await dispatch(actionOnePost(postId));
}
const actionAddLikePostInTape = (postId,) =>
  ({ type: 'ADD-LIKE-POSTS', postId })
  

export const actionAddFullLikeFeed = (postId) => async (
  dispatch,
  getState,
) => {
  await dispatch(actionAddLike(postId))
  const {
    promise: {
      addLike: { status },
    },
  } = getState()
  if (status === 'FULFILLED') {
    const onePost = await dispatch(actionOnePost(postId))
    if (onePost)
      await dispatch((actionAddLikePostInTape(postId)))
  }
  }
  const actionDeleteLikePostInTape = (likeId,postId) =>
  ({ type: 'DELETE-LIKE-POSTS',likeId,postId })
  export const actionDeleteFullLikeFeed = (likeId,postId) => async (
    dispatch,
    getState,
  ) => {
    await dispatch(actionDeleteLike(likeId,postId))
    const {
      promise: {
        deleteLike: { status },
      },
    } = getState()
    if (status === 'FULFILLED') {
      const onePost = await dispatch(actionOnePost(postId))
      if (onePost)
        await dispatch((actionDeleteLikePostInTape(likeId,postId)))
    }
}
    
  export const actionFullFeed = () =>
    async (dispatch, getState) => {
    const postsFeed = await dispatch(actionPostsFeed(getState))
     const skip = postsFeed.length
    console.log('postsFeed ', postsFeed)
    const postsFeedCount = await dispatch(actionPostsFeedCount(getState))
    console.log('postsFeedCount ', postsFeedCount)
      if (skip < postsFeedCount)
      {
        // console.log('SKIIIP ', skip)
        const newPosts = await dispatch(actionPostsFeed(getState, skip))
        if (newPosts) {
          await dispatch(actionFeedType(newPosts));
          // const postsFeedCount = await dispatch(actionPostsFeedCount(getState))
          // console.log('postsFeedCount ', postsFeedCount)
        }

        }
     
    }
    export const actionOnePostType= (onePost) =>
    ({ type: 'ONE-POST', onePost })
  
  export const actionClearFeedPosts = () => ({ type: 'DELETE-POSTS' });

  export const actionFullClearFeedPosts = () => (dispatch) => {
    return dispatch(actionClearFeedPosts())
  }
  export const actionFullOnePost = (_id) =>
    async (dispatch) => {
      console.log('ID POST ', _id)
      const onePost = await dispatch(actionOnePost(_id))
      console.log(' one post ', onePost)
      
    //  const skip = postsFeed.length
    // console.log('postsFeed ', postsFeed)
    // const postsFeedCount = await dispatch(actionPostsFeedCount(getState))
    // console.log('postsFeedCount ', postsFeedCount)
      // if (skip < postsFeedCount)
      // {
      //   console.log('SKIIIP ', skip)
      //   const newPosts = await dispatch(actionPostsFeed(getState, skip))
      if (onePost) {
        console.log('УСПЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕХ')
         await dispatch(actionOnePostType(onePost));
          console.log('onePost ', onePost)
        }
      }
export const feedReducer = (state = {}, {skip, type, newPosts=[], postId, postsFeed,postsFeedCount,newResult }) => {
  const types = {
    'ADD-POSTS': () => {
      return {
        ...state,
        postsFeed: postsFeed ? [...postsFeed, ...newPosts] : [...newPosts]
      }
    },
    'DELETE-POSTS': () => {
      return {
        ...state,
        postsFeed: []
      }
    },
    
    'ADD-LIKE-POSTS': () => ({
      ...state,
      postsFeed: postsFeed?.map(p => p._id === postId ? p = { ...p, likes: [...newResult] } : p)
    }),
    'DELETE-LIKE-POSTS': () => ({
      ...state,
      postsFeed: postsFeed?.map(p => p._id === postId ? p = { ...p, likes: [...newResult] } : p)
    }),

  'ADD-COMMENT-POSTS': () => ({
      ...state,
      postsFeed: postsFeed?.map(p => p._id === postId ? p = { ...p, comments: [...newResult] } : p)
    }),
  
    }
    if (type in types) {
        return types[type]()
    }
    return state
  }
  export const postReducer = (state = {}, {skip, type, newPosts=[],onePost, postsFeed,postsFeedCount }) => {
    const types = {
      'ONE-POST': () => {
        return {
          ...state,onePost
        }
      },
      'CLEAR-POST-ONE': () => {
        return {
          ...state,
          onePost: {}
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
    },
    'REMOVE-DATA': () => {
      return {
        ...state = {},
        aboutMe: {}
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
  export const actionClearPostsOne = () => ({ type: 'CLEAR-POST-ONE' })

 export const store = createStore(
    combineReducers({
      promise: promiseReducer,
      auth: authReducer,
      profileData: profileReducer,
      profilePage: profileUserReducer,
      feed:feedReducer,
      post:postReducer
      
    }),
    applyMiddleware(thunk),
)

