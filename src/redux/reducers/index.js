import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { promiseReducer } from './promise/promiseReducer'
import { authReducer } from './auth/authReducer'
import { profileReducer } from './profileData/profileReducer'
import { profileUserReducer } from './profileUserPage/profileUserReducer'
import { feedReducer } from './feed/feedReducer'
import { postReducer } from './post/postReducer'
import { exploreReducer } from './explore/exploreReducer'
import {
  promiseWatcher,
  fullProfilePageWatcher,
  loginWatcher,
  fullPageAboutUserWatcher,
  feedWatcher,
  clearFeedWatcher,
} from '../saga'
import createSagaMiddleware from 'redux-saga' //функция по созданию middleware
import {
  all,
  put,
  takeEvery,
  takeLatest,
  takeLeading,
  select,
} from 'redux-saga/effects' //
const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  combineReducers({
    promise: promiseReducer,
    auth: authReducer,
    profileData: profileReducer,
    profilePage: profileUserReducer,
    feed: feedReducer,
    post: postReducer,
    explore: exploreReducer,
  }),
  applyMiddleware(sagaMiddleware),
)
function* rootSaga() {
  yield all([
    promiseWatcher(), 
    fullProfilePageWatcher(),
    loginWatcher(),
    fullPageAboutUserWatcher(),
    clearFeedWatcher(),
    feedWatcher(),
  ])
}
sagaMiddleware.run(rootSaga)
