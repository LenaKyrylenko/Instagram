import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { promiseReducer } from './reducers/promise/promiseReducer'
import { authReducer } from './reducers/auth/authReducer'
import { myProfileReducer } from './reducers/myData/myProfileReducer'
import { userProfileReducer } from './reducers/userData/userProfileReducer'
import { feedReducer } from './reducers/feed/feedReducer'
import { postReducer } from './reducers/post/postReducer'
import { exploreReducer } from './reducers/explore/exploreReducer'
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
  changeSubscribeWatcher
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
    fullPageAboutUserWatcher(),
    feedWatcher(),
    exploreWatcher(),
    onePostWatcher(),
    addCommentOnePostWatcher(),
    changeLikePostWatcher(),
    editPostWatcher(),
    changeSubscribeWatcher()
    // addCommentFeedWatcher()
  ])
}
sagaMiddleware.run(rootSaga)
