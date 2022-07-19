
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
  actionRegister,
  actionGetAvatar,
  actionAddSubComment,
  actionAllClearPromise,
  actionAvatar,
  actionLogin,
  actionAuthLogin,
  actionClearPromise,
  actionGetCommentsOnePost,
  actionFindLikes,
  actionPostUpsert,
  actionClearPromiseForName,
  actionChangeSubscribe,
  actionGetFollowing,
  actionGetFollowers,
  actionUserUpsert,
  actionAllClearPromiseType,
  actionFindSubComment
  // actionOnePost
} from '../../actions'
import { message } from 'antd'

import { actionClearAboutMeType } from '../reducers/myProfileReducer'
import { history } from '../../helpers'
import {
  actionClearDataUserType,
  actionChangeFollowersType,
  actionUserAllPostsType,
  actionPostsType

} from '../reducers/userProfileReducer'
import { actionProfilePageDataType,actionChangeFollowingType } from '../reducers/myProfileReducer'
import { actionFullAllGetPosts } from '../../actions'
import {
  actionAddLikePostInTape,
  actionDeleteLikePostInTape,
  actionAddCommentPostInTape,
  actionClearFeedPosts,
  actionFeedType,
  actionClearFeedPostsType,
  actionAddCommentPostFeedTape
} from '../reducers/feedReducer'
import { actionProfilePageDataTypeUser,actionCountPostsType } from '../reducers/userProfileReducer'
import { actionRemoveDataAboutMe,actionUpdateAvatarType } from '../reducers/myProfileReducer'
import {actionExploreType,actionClearExplorePosts} from '../reducers/exploreReducer'
import { all, put,take, fork, takeEvery, takeLatest, takeLeading, select,call, join } from 'redux-saga/effects'; //
import {actionPending,actionFulfilled,actionRejected,actionExplorePosts,actionExplorePostsCount} from '../../actions'
import { actionOnePostType, actionChangeLikeType } from '../../actions/types/postActionTypes'
import {actionAddCommentType,actionAddSubCommentType} from '../../actions/types/postActionTypes'
import { actionAddSubCommentTypeSaga } from '../../actions/typeSaga/postActionSaga'
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
  console.log('token login ', token)
  if (token) {
      yield put(actionAuthLogin(token));
  }
}
export function* loginWatcher() {
yield takeEvery("FULL_LOGIN", loginWorker)

}
export const actionLoginTypeSaga = (login, password) =>  //упрощенный action для саги
({type: 'FULL_LOGIN', login, password})

//register 

function* registerWorker({ login, password }) {
  let token = yield call(promiseWorker,actionRegister(login, password)) //dispatch(actionLogin(login, password));
  console.log('token reg ', token)
  if (token) {
  console.log('token reg в ифе ', token)
    yield put(actionLoginTypeSaga(login, password ))
    history.push('/feed')
  }
}
export function* registerWatcher() {
yield takeEvery("REGISTER", registerWorker)

}
export const actionRegisterTypeSaga = (login, password) =>  //упрощенный action для саги
({type: 'REGISTER', login, password})


//profile page about me
export const actionFullProfilePage = () =>
({
    type:"FULLPROFILE_PAGE",
})

function* fullProfilePageWorker() {
  const { auth } = yield select()
  // console.log('auth', auth)
  if (auth?.payload?.sub?.id) {
    const aboutMe = yield call(promiseWorker, actionAboutMe(auth?.payload?.sub.id))
  // console.log('aboutMe in worker', aboutMe)
   
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
  // console.log('_id ',  _id)
  const aboutUser = yield call(promiseWorker, actionAboutUser(_id))
  // console.log('about user',  aboutUser)
  const allPosts = yield call(promiseWorker, actionAllPostsUser(_id))
  const countPosts = yield call(promiseWorker, actionPostsCount(_id))

  if (aboutUser)
  yield put(actionProfilePageDataTypeUser(aboutUser))
  
  if(allPosts) {
    yield put(actionUserAllPostsType(allPosts))
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
    myData: { aboutMe},
    
  }  = yield select()
  let myFollowing = aboutMe?.following && aboutMe?.following?.map(({ _id }) => _id)
  const myId = (yield select()).auth?.payload?.sub?.id

  if (!aboutMe) {
    yield call(fullProfilePageWorker, actionFullProfilePage())
  }
  myFollowing = (yield select()).myData.aboutMe?.following &&
    (yield select()).myData.aboutMe?.following?.map(({ _id }) => _id)
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

function* postsWorker({_id}) {
  const {
    userData: {aboutUser, allPosts,countPosts },
    // myData: { aboutMe },
    // promise:{countAllPostsUser:{payload}}
    
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

//explore 
function* exploreWorker(){
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

// export const actionAddFullCommentFeed = (postId, newResult) => async (
//   dispatch,
//   getState,
// ) => {
//   await dispatch(actionAddComment(postId, newResult))
//   const {
//     promise: {
//       addComment: { status },
//     },
//   } = getState()
//   if (status === 'FULFILLED') {
//     const onePost = await dispatch(actionOnePost(postId))
//     if (onePost) await dispatch(actionAddCommentPostInTape(postId, newResult))
//   }
//   // await dispatch(actionOnePost(postId));
// }

//one post
function* onePostWorker({ _id }) {
  
  const onePost = yield call(promiseWorker,actionOnePost(_id))
  if (onePost)
  yield put(actionOnePostType(onePost))
}
export function* onePostWatcher(){
yield takeLeading("ONE_POST",onePostWorker)
}

//comment

function* addCommentOnePostWorker({ postId, text }) {
  yield call(promiseWorker, actionAddComment(postId, text))
  const {
    promise: {
      addComment: { status },
    },
  } = yield select()
  if (status === 'FULFILLED') {
    yield call(promiseWorker, actionOnePost(postId))
    const { comments } = yield call(promiseWorker, actionGetCommentsOnePost(postId))
    if (comments)
      yield put (actionAddCommentType(comments))
  }
}
export function* addCommentOnePostWatcher(){
  yield takeLeading("ONE_POST_COMMENT",addCommentOnePostWorker)
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
    const { comments } = yield call(promiseWorker,
      actionGetCommentsOnePost(postId))
    if (comments)
      yield put (actionAddCommentPostFeedTape(postId,comments))
  }
}
export function* addCommentFeedWatcher(){
  yield takeLeading("FEED_POST_COMMENT",addCommentFeedWorker)
  }

// export const actionAddFullLike = (postId) => async (dispatch, getState) => {
//     await dispatch(actionAddLike(postId))
//     const {
//       promise: {
//         addLike: { status },
//       },
//     } = getState()
//     if (status === 'FULFILLED') {
//       const onePost = await dispatch(actionOnePost(postId))
//       if (onePost) await dispatch(actionAddLikePostInTape(postId))
//     }
// }

//change like in post
export const actionChangeLike = (likeId, postId) =>
({
    type:"CHANGE_LIKE_POST", likeId,postId
})
  
function* changeLikePostWorker({ likeId, postId }) {
  console.log('likeId', likeId)
  console.log('postId', postId)

  const changeOneLike = () =>
    likeId ? actionDeleteLike(likeId, postId) : actionAddLike(postId)

  yield call(promiseWorker, changeOneLike())
  const { likes } = yield call(promiseWorker, actionFindLikes(postId))
  console.log('likes in worker', likes)
  
  if (likes) {
  
    yield call(promiseWorker, actionOnePost(postId))
    yield put(actionChangeLikeType(likes))
  }
}



export function* changeLikePostWatcher() {
  yield takeLeading("CHANGE_LIKE_POST", changeLikePostWorker)
}

// create and edit post

function* editPostWorker({state }) {
  
  console.log('in worker default post', state)
  console.log('in worker post id', state?._id)
  const postUpsert = yield call(promiseWorker, actionPostUpsert(state,state?._id))
  console.log('post Upsert', postUpsert)
//   postUpsert
//   const upsertPost = yield call(promiseWorker, actionPostUpsert(post))
// console.log('upsert POST', upsertPost)
 
  if (postUpsert) {
    yield put(actionClearPromiseForName('postUpsert'))
    yield put(actionClearPromiseForName('uploadFiles'))
  }
  
}
export function* editPostWatcher() {
  yield takeEvery("CREATE_EDIT_POST", editPostWorker)
}
export const actionCreateEditPost= (state) =>
({
    type:"CREATE_EDIT_POST", state
})

//change subscribe 
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
  console.log('old following', oldFollowing)
  console.log('еще раз май фолловинг ', following)
  
  const change = yield call(promiseWorker, actionChangeSubscribe(oldFollowing))
console.log('change', change)

  const updateUserFollowers = yield call(promiseWorker, actionGetFollowers(followId))
  console.log('update user followers', updateUserFollowers)

  const updateMyFollowing = yield call(promiseWorker, actionGetFollowing(_id))
  console.log('update my following', updateMyFollowing)

  if (updateMyFollowing)
   yield put(actionChangeFollowingType(updateMyFollowing?.following))
 if (updateUserFollowers)
    yield put(actionChangeFollowersType(updateUserFollowers?.followers))
}


export function* changeSubscribeWatcher() {
  yield takeEvery("CHANGE_SUBSCRIBE", changeSubscribeWorker)
}

export const actionChangeSubscribeSaga= (followId,checkFollowId) =>
({
    type:"CHANGE_SUBSCRIBE", followId,checkFollowId
})

  //comment
export const actionAddFullCommentFeed = (postId, newResult) => ({
  type:"ADD_COMMENT_FEED", postId, newResult
})

export const actionUserUpdateTypeSaga = (user) => ({
  type:"USER_UPDATE", user
})
function* userUpdateWorker({ user }) {
  const {myData:{aboutMe:{_id}}}= yield select()
  const userUpsert = yield call(promiseWorker, actionUserUpsert(user, _id))
  if (userUpsert) {
    yield call(fullPageAboutUserWorker, { _id })
   yield call(fullProfilePageWorker)
  }
}

export function* userUpdateWatcher() {
  yield takeEvery("USER_UPDATE", userUpdateWorker)
}

export const actionSetAvatarTypeSaga = (file) => ({
  type:"SET_AVATAR", file
})

function* setAvatarWorker({ file }) {
  const {myData:{aboutMe:{_id}}}= yield select()
  const setAvatar = yield call(promiseWorker, actionAvatar(file, _id))
  console.log('setAvatar', setAvatar)
  const {avatar} =yield call(promiseWorker,actionGetAvatar(_id))
  if (setAvatar) {
    yield call(fullPageAboutUserWorker, { _id })
    yield put(actionUpdateAvatarType(avatar))
    // yield call(promiseWorker,actionClearPromiseForName("setAvatar"))
    // yield call(promiseWorker,actionClearPromiseForName("uploadFile"))

  }
}

export function* setAvatarWatcher() {
  yield takeEvery("SET_AVATAR", setAvatarWorker)
}

//clear user data after log out
export const actionClearDataLogoutTypeSaga = () => ({
  type:"CLEAR_ALL_DATA"
})
function* clearAllDataWorker() {
  const logOut = yield put (actionAuthLogout())
  if (logOut) {
    history.push('/input')
      yield put(actionClearDataUserType())
      yield put(actionClearFeedPostsType())
      yield put(actionClearAboutMeType())
      yield put(actionAllClearPromiseType())
    
  }
}
export function* clearAllDataWatcher() {
  yield takeEvery("CLEAR_ALL_DATA", clearAllDataWorker)
}
//subComment
function* addSubCommentWorker({ commentId, newResult }) {
  yield call(promiseWorker, actionAddSubComment(commentId, newResult))
  console.log('newResult ', newResult)
  const {
    promise: {
      addSubComment: { status },
    },
  } = yield select()
  if (status === 'FULFILLED') {
    yield call(getSubCommentWorker, {commentId})
    }
  }

export function* addSubCommentWatcher() {
  yield takeEvery("POST_SUB_COMMENT", addSubCommentWorker)
}
function* getSubCommentWorker({ commentId }) {
  const { answers } = yield call(promiseWorker,
    actionFindSubComment(commentId))
  if (answers) {
      yield put(actionAddSubCommentType(commentId, answers))
  }
}

export function* getSubCommentWatcher() {
  yield takeEvery("GET_SUB_COMMENT", getSubCommentWorker)
}