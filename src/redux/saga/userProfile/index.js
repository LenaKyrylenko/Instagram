import { put, takeLeading, call } from 'redux-saga/effects'
import { actionProfilePageDataUserType } from '../../../actions/types/userTypes'
import { promiseWorker } from '../promise'
import {
  actionUserAllPostsType,
  actionCountPostsType,
} from '../../../actions/types/postTypes'
import {
  actionAboutUser,
  actionAllPostsUser,
  actionPostsCount,
} from '../../../actions/query/aboutUserQuery'
export function* fullPageAboutUserWorker({ _id }) {
  const aboutUser = yield call(promiseWorker, actionAboutUser(_id))
  const allPosts = yield call(promiseWorker, actionAllPostsUser(_id))
  const countPosts = yield call(promiseWorker, actionPostsCount(_id))

  if (aboutUser) yield put(actionProfilePageDataUserType(aboutUser))

  if (allPosts) {
    yield put(actionUserAllPostsType(allPosts))
  }
  if (countPosts) yield put(actionCountPostsType(countPosts))
}
export function* fullPageAboutUserWatcher() {
  yield takeLeading('USER_PAGE', fullPageAboutUserWorker)
}
