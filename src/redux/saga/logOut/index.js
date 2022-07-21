import { put, takeEvery, all } from 'redux-saga/effects'
import { actionClearDataUserType } from '../../../actions/types/userTypes'
import { actionClearFeedPostsType } from '../../../actions/types/feedTypes'
import { actionAllClearPromiseType } from '../../../actions/types/promiseTypes'
import { actionClearAboutMeType } from '../../../actions/types/myDataTypes'
import { actionAuthLogout } from '../../../actions/types/loginTypes'
import history from '../../../helpers/history'
function* clearAllDataWorker() {
  const logOut = yield put(actionAuthLogout())
  if (logOut) {
    history.push('/input')
    yield all([
      put(actionClearDataUserType()),
      put(actionClearFeedPostsType()),
      put(actionClearAboutMeType()),
      put(actionAllClearPromiseType()),
    ])
  }
}
export function* clearAllDataWatcher() {
  yield takeEvery('CLEAR_ALL_DATA', clearAllDataWorker)
}
