import { promiseWorker } from "../promise";
import { put, takeEvery,call } from 'redux-saga/effects'; 
import { actionAuthLogin } from '../../../actions/types/loginTypes';
import { actionLogin } from "../../../actions/query/loginQuery";
export function* loginWorker({ login, password }) { 
    let token = yield call(promiseWorker,actionLogin(login, password)) 
    if (token) {
        yield put(actionAuthLogin(token));
    }
  }
  export function* loginWatcher() {
  yield takeEvery("FULL_LOGIN", loginWorker)
  }