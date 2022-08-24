import { promiseWorker } from '../promise'
import { put, takeLeading, takeEvery, call, select } from 'redux-saga/effects'
import { actionSearchUser } from "../../../actions/query/searchUserQuery"
import { actionSearchType } from "../../../actions/types/searchType"
export function* searchWorker({ searchUser }) {
    const findUser = yield call(
        promiseWorker,
        actionSearchUser(searchUser),
    )
      if (findUser) {
        yield put(actionSearchType(findUser))
      }
    }
  
  export function* searchWatcher() {
      yield takeEvery('SEARCH-USERS',
      searchWorker)
  }