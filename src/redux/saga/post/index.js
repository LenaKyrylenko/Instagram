import { promiseWorker } from "../promise";
import { put, takeLeading, takeEvery,call, select } from 'redux-saga/effects'; 
import {actionAboutUser, actionAllPostsUser, actionPostsCount} from '../../../actions/query/aboutUserQuery'
import { actionOnePost,actionPostUpsert } from '../../../actions/query/postQuery'
import {actionPostsType,actionOnePostType} from '../../../actions/types/postTypes'
import {actionClearPromiseForName} from '../../../actions/types/promiseTypes'
function* postsWorker({ _id }) {
    const {
      userData: { allPosts,countPosts },
    } = yield select()
    
    if (allPosts?.length !== (countPosts ? countPosts : 1)) {
      const newPosts = yield call(promiseWorker, 
        actionAllPostsUser(_id, allPosts?.length),
      )
      const newPostsCount = yield call(promiseWorker, 
        actionPostsCount(_id))
      if (newPosts && newPostsCount) {
        yield put(actionPostsType(newPosts, newPostsCount))
      }
    }
  }
  
  export function* postsWatcher() {
    yield takeLeading("USER_POSTS_PORTION", postsWorker)
  }
  

function* onePostWorker({ _id }) {
  
    const onePost = yield call(promiseWorker,actionOnePost(_id))
    if (onePost)
    yield put(actionOnePostType(onePost))
  }
  export function* onePostWatcher(){
  yield takeLeading("ONE_POST",onePostWorker)
  }
  
  
function* editPostWorker({state }) {

const postUpsert = yield call(promiseWorker, actionPostUpsert(state,state?._id))

   
    if (postUpsert) {
      yield put(actionClearPromiseForName('postUpsert'))
      yield put(actionClearPromiseForName('uploadFiles'))
    }
    
  }
  export function* editPostWatcher() {
    yield takeEvery("CREATE_EDIT_POST", editPostWorker)
  }