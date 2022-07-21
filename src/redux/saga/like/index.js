import { put, call, takeLeading } from 'redux-saga/effects'
import {
  actionAddLike,
  actionDeleteLike,
  actionFindLikes,
} from '../../../actions/query/likeQuery'
import {
  actionChangeLikeType,
  actionAddLikePostFeedType,
} from '../../../actions/types/likeTypes'
import { promiseWorker } from '../promise'

function* changeLikeWorker({ likeId, postId }) {
  const changeOneLike = () =>
    likeId ? actionDeleteLike(likeId, postId) : actionAddLike(postId)

  yield call(promiseWorker, changeOneLike())
  return yield call(promiseWorker, actionFindLikes(postId))
}

function* changeLikePostWorker({ likeId, postId }) {
  const { likes } = yield call(changeLikeWorker, { likeId, postId })
  if (likes) {
    yield put(actionChangeLikeType(likes))
  }
}

function* changeLikePostFeedWorker({ likeId, postId }) {
  const { likes } = yield call(changeLikeWorker, { likeId, postId })
  if (likes) {
    yield put(actionAddLikePostFeedType(likes))
  }
}

export function* changeLikePostWatcher() {
  yield takeLeading('CHANGE_LIKE_POST', changeLikePostWorker)
}

export function* changeLikePostFeedWatcher() {
  yield takeLeading('CHANGE_LIKE_POST_FEED', changeLikePostFeedWorker)
}
