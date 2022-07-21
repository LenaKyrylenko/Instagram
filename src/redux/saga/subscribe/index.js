
import {actionChangeSubscribe,actionGetFollowers,actionGetFollowing} from '../../../actions/query/subscribeQuery'
import { promiseWorker } from "../promise";
import { put, takeEvery,call,select } from 'redux-saga/effects'; 
import {actionChangeFollowingType, actionChangeFollowersType} from '../../../actions/types/subscribeTypes'
function* changeSubscribeWorker({ followId, checkFollowId }) {
    const { myData: { aboutMe: { _id, following } } } = yield select()
    console.log('my following', following)
    console.log('check follow id', checkFollowId)
    console.log('my id', _id)
   
    const oldFollowing = checkFollowId ?
      {
        _id,
        following: [...(following||[]).filter((item) =>
          item._id !== followId).map(({ _id }) => ({ _id }))]
      } 
    : {
        
      _id,
        following: [...(following||[]).map(({ _id }) =>
          ({ _id })), { _id: followId }]
      }

    yield call(promiseWorker, actionChangeSubscribe(oldFollowing))

    const updateUserFollowers = yield call(promiseWorker, actionGetFollowers(followId))

    const updateMyFollowing = yield call(promiseWorker, actionGetFollowing(_id))

    if (updateMyFollowing)
     yield put(actionChangeFollowingType(updateMyFollowing?.following))
   if (updateUserFollowers)
      yield put(actionChangeFollowersType(updateUserFollowers?.followers))
  }
  export function* changeSubscribeWatcher() {
    yield takeEvery("CHANGE_SUBSCRIBE", changeSubscribeWorker)
  }
  
