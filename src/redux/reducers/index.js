
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { promiseReducer } from './promise/promiseReducer'
import { authReducer } from './auth/authReducer'
import { profileReducer } from './profileData/profileReducer'
import { profileUserReducer } from './profileUserPage/profileUserReducer'
import { feedReducer } from './feed/feedReducer'
import { postReducer } from './post/postReducer'
import { exploreReducer } from './explore/exploreReducer'


export const store = createStore(
  combineReducers({
    promise: promiseReducer,
    auth: authReducer,
    profileData: profileReducer,
    profilePage: profileUserReducer,
    feed: feedReducer,
    post: postReducer,
    explore: exploreReducer
  }),
  applyMiddleware(thunk),
)
