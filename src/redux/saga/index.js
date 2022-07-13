
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
  actionClearPromise
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
import { actionProfilePageDataTypeUser,actionCountPostsType } from '../reducers/profileUserPage/profileUserReducer'
import { actionRemoveDataAboutMe } from '../reducers/profileData/profileReducer'
import {actionExploreType,actionClearExplorePosts} from '../reducers/explore/exploreReducer'
import { all, put,take, fork, takeEvery, takeLatest, takeLeading, select,call, join } from 'redux-saga/effects'; //
import {actionPending,actionFulfilled,actionRejected,actionExplorePosts,actionExplorePostsCount} from '../../actions'


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
yield takeEvery("FULL_LOGIN", loginWorker)

}
//profile page about me
export const actionFullProfilePage = () =>
({
    type:"FULLPROFILE_PAGE",
})

function* fullProfilePageWorker() {
  const { auth } = yield select()
  console.log('auth', auth)
  if (auth?.payload?.sub?.id) {
    const aboutMe = yield call(promiseWorker, actionAboutMe(auth?.payload?.sub.id))
  console.log('aboutMe in worker', aboutMe)
   
    if (aboutMe) {
      yield put(actionProfilePageDataType(aboutMe))
    
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
  const countPosts = yield call(promiseWorker, actionPostsCount(_id))

  if (aboutUser && allPosts) {
    yield put(actionProfilePageDataTypeUser(aboutUser, allPosts))
  }
  if (countPosts)
  yield put(actionCountPostsType(countPosts))
}

export function* fullPageAboutUserWatcher() {
  yield takeLeading("USER_PAGE", fullPageAboutUserWorker)
}
function* feedWorker() {
  const {
    feed: { postsFeed, postsFeedCount },
    profileData: { aboutMe},
    
  }  = yield select()
  let myFollowing = aboutMe?.following && aboutMe?.following?.map(({ _id }) => _id)
  const myId = (yield select()).auth?.payload?.sub?.id

  if (!aboutMe) {
    yield call(fullProfilePageWorker, actionFullProfilePage())
  }
  myFollowing = (yield select()).profileData.aboutMe?.following &&
    (yield select()).profileData.aboutMe?.following?.map(({ _id }) => _id)
  // console.log('myFollowing after if', myFollowing)
  if (postsFeed?.length !== (postsFeedCount ? postsFeedCount : 1)) {
    const newPosts = yield call(promiseWorker, 
      actionPostsFeed([...(myFollowing || []), myId], postsFeed?.length),
    )
    console.log('newPosts', newPosts)
    const newPostsFeedCount = yield call(promiseWorker, (
      actionPostsFeedCount([...(myFollowing || []), myId])))
    if (newPosts && newPostsFeedCount) {
      console.log('newPosts', newPosts)
      yield put(actionFeedType(newPosts, newPostsFeedCount))
    }
  }
}

export function* feedWatcher() {
  yield takeLeading("FEED_POSTS", feedWorker)
}
//explore 
function* exploreWorker(){
  const {
    explore: { explorePosts, explorePostsCount },
  } = yield select()
  console.log('explorePosts', explorePosts)


  if (explorePosts?.length !== (explorePostsCount ? explorePostsCount : 1)) {
    console.log('explorePosts', explorePosts)

    const newPosts = yield fork(promiseWorker, actionExplorePosts(explorePosts?.length))

    console.log('newPosts', newPosts)

    const newPostsExploreCount = yield fork(promiseWorker, (actionExplorePostsCount()))
    const [posts,exploreCount] = yield join([newPosts,newPostsExploreCount])
    if (posts && exploreCount)
      yield put(actionExploreType(posts, exploreCount))
  }
}
export function* exploreWatcher() {
  yield takeLeading("EXPLORE_POSTS", exploreWorker)
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

