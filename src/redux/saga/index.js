
import {
    actionAboutMe,
    actionAllPostsUser,
    actionAboutUser,
    actionPostsFeed,
    actionPostsFeedCount,
    actionOnePost,
    actionAddComment,
    actionAddLike,
    actionDeleteLike,
    actionPostsCount,
    actionAuthLogout,
  actionAllClearPromise,
  actionLogin,
  actionAuthLogin,
  
  } from '../../actions'
import { history } from '../../helpers'
  import{actionClearDataUserType} from '../reducers/profileUserPage/profileUserReducer'
import { actionProfilePageDataType } from '../reducers/profileData/profileReducer'
import { actionFullAllGetPosts } from '../../actions'
import {
  actionAddLikePostInTape,
  actionDeleteLikePostInTape,
  actionAddCommentPostInTape,
  actionClearFeedPosts,
  actionFeedType
} from '../reducers/feed/feedReducer'
import { actionProfilePageDataTypeUser } from '../reducers/profileUserPage/profileUserReducer'
import { actionRemoveDataAboutMe } from '../reducers/profileData/profileReducer'
import { all, put, takeEvery, takeLatest, takeLeading, select,call } from 'redux-saga/effects'; //
import {actionPending,actionFulfilled,actionRejected} from '../../actions'


  //promise
 export function* promiseWorker(action){ //это типа actionPromise который thunk
    const {name, promise} = action
    yield put(actionPending(name)) //это как dispatch
    try {
        let data = yield promise //а это как await
        yield put(actionFulfilled(name, data))
        return data //а этот результать можно забрать через yield call(promiseWorker, actionPromise(......) /*какой-то объект action*/)
    }
    catch (error) {
        yield put(actionRejected(name, error))
    }
  }
  
  export function* promiseWatcher(){
    yield takeEvery('PROMISE_START', promiseWorker)
}

//login
function* loginWorker({login, password}){ //обработчик экшона FULL_LOGIN
  let token = yield call(promiseWorker,actionLogin(login, password)) //dispatch(actionLogin(login, password));
  if (token) {
      yield put(actionAuthLogin(token));
  }
}
export function* loginWatcher() {
yield takeEvery("'FULL_LOGIN'", loginWorker)

}
//profile page about me
export const actionFullProfilePage = () =>
({
    type:"FULLPROFILE_PAGE",
})

function* fullProfilePageWorker() {
  const { auth } = yield select()
  if (auth?.payload?.sub?.id) {
    const aboutMe = yield call(promiseWorker, actionAboutMe(auth?.payload?.sub.id))
    if (aboutMe) {
      yield put(actionProfilePageDataType(aboutMe))
      console.log('about me _id',aboutMe?._id)
      yield put(actionFullProfilePageUser(aboutMe?._id))
    }
  }
}


export function* fullProfilePageWatcher() {
  yield takeEvery("FULLPROFILE_PAGE", fullProfilePageWorker)
}

//aboutUser
//full profile user

export const actionFullProfilePageUser = (_id) =>
  ({ type: "USER_PAGE", _id })
  
function* fullPageAboutUserWorker({ _id }) {
  console.log('_id ',  _id)

  const aboutUser = yield call(promiseWorker, actionAboutUser(_id))
  console.log('about user',  aboutUser)
  const allPosts = yield call(promiseWorker, actionAllPostsUser(_id))
  if (aboutUser && allPosts) {
    yield put(actionProfilePageDataTypeUser(aboutUser, allPosts))

  }
}

export function* fullPageAboutUserWatcher() {
  yield takeLeading("USER_PAGE", fullPageAboutUserWorker)
}

function* feedWorker() {
  const {
    feed: { postsFeed, postsFeedCount },
    profileData: { aboutMe },
    
  } = yield select()
  let myFollowing =
    aboutMe?.following && aboutMe?.following?.map(({ _id }) => _id)
  const myId = yield select().auth.payload?.sub?.id
  if (!myFollowing)
  yield put(actionFullProfilePage(myId))
  // await dispatch(actionFullProfilePage(myId))
myFollowing = yield select().profileData.aboutMe?.following?.map(({ _id }) => _id)
  console.log('myFollowing ', myFollowing)
  if (postsFeed.length !== (postsFeedCount ? postsFeedCount : 1)) {
    const newPosts = yield call(promiseWorker, 
      actionPostsFeed([...(myFollowing || []), myId], postsFeed.length),
    )
    console.log('newPosts', newPosts)
    const newPostsFeedCount = yield call(promiseWorker, (
      actionPostsFeedCount([...(myFollowing || []), myId])))
    
    if (newPosts && newPostsFeedCount) {
      console.log('newPosts', newPosts)
      yield put(actionFeedType(newPosts, newPostsFeedCount))
    }
  }
  // const aboutMe = yield call(promiseWorker, actionAboutMe(_id))
  // if (aboutMe)
  // yield put(actionProfilePageDataType(aboutMe))
}


export function* feedWatcher() {
  yield takeEvery("FEED_POSTS", feedWorker)
}

//feed

export const actionAddFullLikeFeed = (postId) => async (dispatch, getState) => {
    await dispatch(actionAddLike(postId))
    const {
      promise: {
        addLike: { status },
      },
    } = getState()
    if (status === 'FULFILLED') {
      const onePost = await dispatch(actionOnePost(postId))
      if (onePost) await dispatch(actionAddLikePostInTape(postId))
    }
}
  
export const actionDeleteFullLikeFeed = (likeId, postId) => async (
    dispatch,
    getState,
  ) => {
    await dispatch(actionDeleteLike(likeId, postId))
    const {
      promise: {
        deleteLike: { status },
      },
    } = getState()
    if (status === 'FULFILLED') {
      const onePost = await dispatch(actionOnePost(postId))
      if (onePost) await dispatch(actionDeleteLikePostInTape(likeId, postId))
    }
  }

  //comment
export const actionAddFullCommentFeed = (postId, newResult) => async (
    dispatch,
    getState,
  ) => {
    await dispatch(actionAddComment(postId, newResult))
    const {
      promise: {
        addComment: { status },
      },
    } = getState()
    if (status === 'FULFILLED') {
      const onePost = await dispatch(actionOnePost(postId))
      if (onePost) await dispatch(actionAddCommentPostInTape(postId, newResult))
    }
    // await dispatch(actionOnePost(postId));
}

//clear user data after log out
export const actionClearUserData = () => async (dispatch) => {
    const logOut = await dispatch(actionAuthLogout())
    if (logOut) {
      history.push('/input')
      await dispatch(actionClearDataUserType())
      await dispatch(actionClearFeedPosts())
      await dispatch(actionRemoveDataAboutMe())
      await dispatch(actionAllClearPromise())
      
    }
  }

