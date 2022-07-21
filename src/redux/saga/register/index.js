import { promiseWorker } from "../promise";
import { put, takeEvery, call } from 'redux-saga/effects'; 
import { actionLoginTypeSaga } from '../../../actions/typeSaga/loginTypesSaga'
import actionRegister from "../../../actions/query/registerQuery";
import  history  from '../../../helpers/history'

function* registerWorker({ login, password }) {
    let token = yield call(promiseWorker,actionRegister(login, password)) 
    if (token) {
      yield put(actionLoginTypeSaga(login, password ))
      history.push('/feed')
    }
  }
  export function* registerWatcher() {
  yield takeEvery("REGISTER", registerWorker)
  
  }