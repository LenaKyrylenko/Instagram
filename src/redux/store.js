import { createStore, combineReducers, applyMiddleware } from 'redux'
import { promiseReducer } from './reducers/promiseReducer'
import { authReducer } from './reducers/authReducer'
import { myProfileReducer } from './reducers/myProfileReducer'
import { userProfileReducer } from './reducers/userProfileReducer'
import { feedReducer } from './reducers/feedReducer'
import { postReducer } from './reducers/postReducer'
import { exploreReducer } from './reducers/exploreReducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'
import { searchReducer } from './reducers/searchReducer'
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
    search: searchReducer
  }),
  applyMiddleware(sagaMiddleware),
)
sagaMiddleware.run(rootSaga)
