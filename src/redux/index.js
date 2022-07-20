import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { promiseReducer } from './reducers/promiseReducer'
import { authReducer } from './reducers/authReducer'
import { myProfileReducer } from './reducers/myProfileReducer'
import { userProfileReducer } from './reducers/userProfileReducer'
import { feedReducer } from './reducers/feedReducer'
import { postReducer } from './reducers/postReducer'
import { exploreReducer } from './reducers/exploreReducer'
import {
  promiseWatcher,
  fullProfilePageWatcher,
  loginWatcher,
  fullPageAboutUserWatcher,
  feedWatcher,
  exploreWatcher,
onePostWatcher,
  addCommentFeedWatcher,
  addCommentOnePostWatcher,
  changeLikePostWatcher,
  editPostWatcher,
  changeSubscribeWatcher,
  userUpdateWatcher,
  setAvatarWatcher,
  clearAllDataWatcher,
  registerWatcher,
  postsWatcher,
  addSubCommentWatcher,
  getSubCommentWatcher,
  changeLikePostFeedWatcher
} from './saga'
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
    myData: myProfileReducer,
    userData: userProfileReducer,
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
    registerWatcher(),
    fullPageAboutUserWatcher(),
    feedWatcher(),
    exploreWatcher(),
    onePostWatcher(),
    addCommentOnePostWatcher(),
    changeLikePostWatcher(),
    editPostWatcher(),
    changeSubscribeWatcher(),
    userUpdateWatcher(),
    setAvatarWatcher(),
    clearAllDataWatcher(),
    postsWatcher(),
    addCommentFeedWatcher(),
    addSubCommentWatcher(),
    getSubCommentWatcher(),
    changeLikePostFeedWatcher()
    // addCommentFeedWatcher()
  ])
}
sagaMiddleware.run(rootSaga)
