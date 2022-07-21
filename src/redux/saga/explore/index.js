
 import { all, put,take, fork, takeEvery, takeLatest, takeLeading, select,call, join } from 'redux-saga/effects'; //
 import { promiseWorker } from '../promise';
import {actionExplorePostsCount,actionExplorePosts } from '../../../actions/query/exploreQuery'
import { actionExploreType } from '../../../actions/types/exploreTypes'
function* exploreWorker() {
    const {
      explore: { explorePosts, explorePostsCount },
    } = yield select()
    console.log('explorePosts', explorePosts)
  
    if (explorePosts?.length !== (explorePostsCount ? explorePostsCount : 1)) {
      console.log('explorePosts', explorePosts)
  
      const newPosts = yield call(promiseWorker,
        actionExplorePosts(explorePosts?.length))
  
      console.log('newPosts', newPosts)
  
      const newPostsExploreCount = yield call(promiseWorker, (actionExplorePostsCount()))
      if (newPosts && newPostsExploreCount)
        yield put(actionExploreType(newPosts, newPostsExploreCount))
    }
  }
  export function* exploreWatcher() {
    yield takeLeading("EXPLORE_POSTS", exploreWorker)
  }