
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
    actionClearPromiseForName
  } from '../../actions'
import { history } from '../../helpers'
  import{actionClearDataUserType} from '../reducers/profileUserPage/profileUserReducer'
import { actionProfilePageDataType } from '../reducers/profileData/profileReducer'
import { actionFullAllGetPosts } from '../../actions'
import { actionAddLikePostInTape } from '../reducers/feed/feedReducer'
import{actionDeleteLikePostInTape} from '../reducers/feed/feedReducer'
import{actionAddCommentPostInTape} from '../reducers/feed/feedReducer'
import { actionProfilePageDataTypeUser } from '../reducers/profileUserPage/profileUserReducer'
//profile page about me
export const actionFullProfilePage = (_id) => async (dispatch) => {
    const aboutMe = await dispatch(actionAboutMe(_id))
    if (aboutMe) {
    await dispatch(actionProfilePageDataType(aboutMe))
  }
 
  }

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
    }
  }


//full profile user
export const actionFullProfilePageUser = (_id) => async (dispatch) => {
    const aboutUser = await dispatch(actionAboutUser(_id))
    const allPosts = await dispatch(actionAllPostsUser(_id))
    await dispatch(actionPostsCount(_id))
    if (aboutUser && allPosts) {
      await dispatch(actionProfilePageDataTypeUser(aboutUser, allPosts))
  }

  }