import { put, takeLeading, select, call } from 'redux-saga/effects' //
import { promiseWorker } from '../promise'
import {
  actionExplorePostsCount,
  actionExplorePosts,
} from '../../../actions/query/exploreQuery'
import { actionExploreType } from '../../../actions/types/exploreTypes'
function* exploreWorker() {
  const {
    explore: { explorePosts, explorePostsCount },
  } = yield select()

  if (explorePosts?.length !== (explorePostsCount ? explorePostsCount : 1)) {
    const newPosts = yield call(
      promiseWorker,
      actionExplorePosts(explorePosts?.length),
    )
    
    const newPostsExploreCount = yield call(
      promiseWorker,
      actionExplorePostsCount(),
    )
    if (newPosts && newPostsExploreCount)
      yield put(actionExploreType(newPosts, newPostsExploreCount))
  }
}
export function* exploreWatcher() {
  yield takeLeading('EXPLORE_POSTS', exploreWorker)
}
