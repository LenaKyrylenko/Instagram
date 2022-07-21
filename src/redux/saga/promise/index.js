import { put, takeEvery } from 'redux-saga/effects'
import {
  actionPending,
  actionFulfilled,
  actionRejected,
} from '../../../actions/types/promiseTypes'

export function* promiseWorker(action) {
  const { name, promise } = action
  yield put(actionPending(name))
  try {
    let data = yield promise
    yield put(actionFulfilled(name, data))
    return data
  } catch (error) {
    yield put(actionRejected(name, error))
  }
}
export function* promiseWatcher() {
  yield takeEvery('PROMISE_START', promiseWorker)
}
