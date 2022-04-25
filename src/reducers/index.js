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

export const actionProfilePageDataTypeUser= (aboutUser, allPosts) =>
  ({ type: 'PROFILE-PAGE-USER', aboutUser, allPosts })

  export const actionProfilePageDataType= (aboutMe) =>
  ({ type: 'PROFILE-PAGE', aboutMe })

  export const actionAboutUser = (_id) =>
  actionPromise(
  'aboutUser',
    gql(
      `query AboutMe($userId:String){
        UserFindOne(query:$userId)
        {
          _id createdAt login nick avatar{_id url} 
          followers{_id login nick avatar{_id url}} 
          following{_id login nick avatar{_id url}}
        }
      }`,
      {
        userId: JSON.stringify([{ _id }]),
      },
    ),
  )

  export const actionAllPostsUser = (userId) =>
  actionPromise(
    'allPosts',
    gql(
      `query allPosts($userId:String!){
PostFind(query:$userId){
         owner{_id} _id title text images{_id url}
  }
}`,
      {
        userId: JSON.stringify([
          { ___owner: userId},

          {
            sort: [{ _id: -1 }],
            skip: [0],
            limit: [36]
          },

        ]),
      },
    ),
  )

export const actionFullProfilePageUser = (_id) =>
  async dispatch => {
    const aboutUser = await dispatch(actionAboutUser(_id))
    const allPosts = await dispatch(actionAllPostsUser(_id))
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

export const profileUserReducer = (state = {}, { type, aboutUser, allPosts,
  newResult }) => {
    const types = {
        'PROFILE-PAGE-USER': () => {
            return {
                ...state, aboutUser, allPosts
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
      profilePage:profileUserReducer
      
    }),
    applyMiddleware(thunk),
)

