import { put, takeEvery, takeLeading, select, call } from 'redux-saga/effects' 
import { promiseWorker } from '../promise'
import {
  actionAddComment,
  actionGetCommentsOnePost,
  actionAddSubComment,
  actionFindSubComment,
} from '../../../actions/query/commentQuery'
import { actionOnePost } from '../../../actions/query/postQuery'
import {
  actionAddCommentPostFeedType,
  actionAddCommentType,
  actionAddSubCommentType,
  actionAddSubCommentFeedType
} from '../../../actions/types/commentTypes'

function* addCommentOnePostWorker({ postId, text }) {
  yield call(promiseWorker, actionAddComment(postId, text))
  const {
    promise: {
      addComment: { status },
    },
  } = yield select()
  if (status === 'FULFILLED') {
    yield call(promiseWorker, actionOnePost(postId))
    const { comments } = yield call(
      promiseWorker,
      actionGetCommentsOnePost(postId),
    )
    if (comments) yield put(actionAddCommentType(comments))
  }
}
export function* addCommentOnePostWatcher() {
  yield takeLeading('ONE_POST_COMMENT', addCommentOnePostWorker)
}

function* addCommentFeedWorker({ postId, text }) {
  yield call(promiseWorker, actionAddComment(postId, text))
  const {
    promise: {
      addComment: { status },
    },
  } = yield select()
  if (status === 'FULFILLED') {
    yield call(promiseWorker, actionOnePost(postId))
    const { comments } = yield call(
      promiseWorker,
      actionGetCommentsOnePost(postId),
    )
    if (comments) yield put(actionAddCommentPostFeedType(postId, comments))
  }
}
export function* addCommentFeedWatcher() {
  yield takeLeading('FEED_POST_COMMENT', addCommentFeedWorker)
}


function* addSubCommentWorker({ commentId, newResult }) {
  yield call(promiseWorker, actionAddSubComment(commentId, newResult))
  const {
    promise: {
      addSubComment: { status },
    },
  } = yield select()
  if (status === 'FULFILLED') {
    yield call(getSubCommentWorker, { commentId })
  }
}

export function* addSubCommentWatcher() {
  yield takeEvery('POST_SUB_COMMENT', addSubCommentWorker)
}

function* addSubCommentFeedWorker({ commentId, newResult }) {
  yield call(promiseWorker, actionAddSubComment(commentId, newResult))
  const {
    promise: {
      addSubComment: { status },
    },
  } = yield select()
  if (status === 'FULFILLED') {
    yield call(getSubCommentFeedWorker, { commentId })
  }
}

export function* addSubCommentFeedWatcher() {
  yield takeEvery('FEED_POST_SUB_COMMENT', addSubCommentFeedWorker)
}


function* getSubCommentWorker({ commentId }) {
  const { answers } = yield call(promiseWorker,
    actionFindSubComment(commentId))
  if (answers) {
    yield put(actionAddSubCommentType(commentId, answers))
  }
}

export function* getSubCommentWatcher() {
  yield takeEvery('GET_SUB_COMMENT', getSubCommentWorker)
}

function* getSubCommentFeedWorker({ commentId }) {
  const { answers } = yield call(promiseWorker,
    actionFindSubComment(commentId))
  if (answers) {
    yield put(actionAddSubCommentFeedType(commentId, answers))
  }
}

export function* getSubCommentFeedWatcher() {
  yield takeEvery('GET_SUB_FEED_COMMENT', getSubCommentFeedWorker)
}