import { all, put,take, fork, takeEvery, takeLatest, takeLeading, select,call, join } from 'redux-saga/effects'; //
import { fullProfilePageWorker } from '../../saga/myProfile'
import { promiseWorker } from '../promise';
import {actionFullProfilePageTypeSaga} from '../../../actions/typeSaga/myDataTypesSaga'
import {
    actionPostsFeed,
    actionPostsFeedCount
} from '../../../actions/query/postFeedQuery'
import { actionFeedType } from '../../../actions/types/feedTypes'
function* feedWorker() {
    const {
      feed: { postsFeed, postsFeedCount },
      myData: { aboutMe},
      
    }  = yield select()
    let myFollowing = aboutMe?.following && aboutMe?.following?.map(({ _id }) => _id)
    const myId = (yield select()).auth?.payload?.sub?.id
  
    if (!aboutMe) {
      yield call(fullProfilePageWorker, actionFullProfilePageTypeSaga())
    }
    myFollowing = (yield select()).myData.aboutMe?.following &&
      (yield select()).myData.aboutMe?.following?.map(({ _id }) => _id)
    if (postsFeed?.length !== (postsFeedCount ? postsFeedCount : 1)) {
      const newPosts = yield call(promiseWorker, 
        actionPostsFeed([...(myFollowing || []), myId], postsFeed?.length),
      )
      const newPostsFeedCount = yield call(promiseWorker, (
        actionPostsFeedCount([...(myFollowing || []), myId])))
      if (newPosts && newPostsFeedCount) {
        yield put(actionFeedType(newPosts, newPostsFeedCount))
      }
    }
  }
  
  export function* feedWatcher() {
    yield takeLeading("FEED_POSTS", feedWorker)
  }