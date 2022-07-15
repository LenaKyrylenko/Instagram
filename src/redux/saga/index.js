
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
  actionClearPromise,
  actionGetCommentsOnePost,
  actionFindLikes,
  actionPostUpsert,
  actionClearPromiseForName,
  actionChangeSubscribe,
  actionGetFollowing,
  actionGetFollowers,
  // actionOnePost
} from '../../actions'
  
import { history } from '../../helpers'
import {
  actionClearDataUserType,
  actionChangeFollowersType,
  actionUserAllPostsType

} from '../reducers/userData/userProfileReducer'
import { actionProfilePageDataType,actionChangeFollowingType } from '../reducers/myData/myProfileReducer'
import { actionFullAllGetPosts } from '../../actions'
import {
  actionAddLikePostInTape,
  actionDeleteLikePostInTape,
  actionAddCommentPostInTape,
  actionClearFeedPosts,
  actionFeedType
} from '../reducers/feed/feedReducer'
import { actionProfilePageDataTypeUser,actionCountPostsType } from '../reducers/userData/userProfileReducer'
import { actionRemoveDataAboutMe } from '../reducers/myData/myProfileReducer'
import {actionExploreType,actionClearExplorePosts} from '../reducers/explore/exploreReducer'
import { all, put,take, fork, takeEvery, takeLatest, takeLeading, select,call, join } from 'redux-saga/effects'; //
import {actionPending,actionFulfilled,actionRejected,actionExplorePosts,actionExplorePostsCount} from '../../actions'
import { actionOnePostType, actionChangeLikeType } from '../../actions/types/postActionTypes'
import {actionAddCommentType} from '../../actions/types/postActionTypes'
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
function* addCommentFeedWorker({ postId, newResult }) {
  yield call(promiseWorker,actionAddComment(postId, newResult))
  const { comments } = yield call(promiseWorker, actionGetCommentsOnePost(postId))
  console.log('commentsss', comments)
  if (comments)
    yield put(actionAddCommentPostInTape(postId, newResult))
  }

export function* addCommentFeedWatcher() {
  yield takeLeading("ADD_COMMENT_FEED", addCommentFeedWorker)
  
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
  // console.log('post id', postId)
  // console.log('comment', text)
  const add= yield call(promiseWorker, actionAddComment(postId, text))
  // console.log('add', add)
  const {
    promise: {
      addComment: { status },
    },
  } = yield select()
  if (status === 'FULFILLED') {
    yield call(promiseWorker, actionOnePost(postId))
    const { comments } = yield call(promiseWorker, actionGetCommentsOnePost(postId))
  //  console.log('add comments', comments)
    if (comments)
      yield put (actionAddCommentType(comments))
  }
}
export function* addCommentOnePostWatcher(){
  yield takeLeading("ONE_POST_COMMENT",addCommentOnePostWorker)
  }
  // await dispatch(actionOnePost(postId));
// }}



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
  // const checkFollowId = following?.find(
  //   (follower) => follower?._id === followId,
  // )?._id
  console.log('my following', following)

  console.log('check follow id', checkFollowId)
  console.log('my id', _id)
 
  const oldFollowing = checkFollowId ?
    {
      
      _id,
      following: [...following.filter((item) => item._id !== followId).map(({ _id }) => ({ _id }))]
    } 
  : {
      
    _id,
    following:[...following.map(({ _id }) => ({ _id })), {_id: followId}]

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
  {
   
    yield put(actionChangeFollowersType(updateUserFollowers?.followers))
    
    }
}


export function* changeSubscribeWatcher() {
  yield takeEvery("CHANGE_SUBSCRIBE", changeSubscribeWorker)
}

export const actionChangeSubscribeSaga= (followId,checkFollowId) =>
({
    type:"CHANGE_SUBSCRIBE", followId,checkFollowId
})


// export const actionDeleteFullLikeFeed = (likeId, postId) => async (
//     dispatch,
//     getState,
//   ) => {
//     await dispatch(actionDeleteLike(likeId, postId))
//     const {
//       promise: {
//         deleteLike: { status },
//       },
//     } = getState()
//     if (status === 'FULFILLED') {
//       const onePost = await dispatch(actionOnePost(postId))
//       if (onePost) await dispatch(actionDeleteLikePostInTape(likeId, postId))
//     }
//   }

  //comment
export const actionAddFullCommentFeed = (postId, newResult) => ({
  type:"ADD_COMMENT_FEED", postId, newResult
})

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

