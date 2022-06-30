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
} from '../actions'
import { history } from '../App'
//user
export const actionFullProfilePageUser = (_id) => async (dispatch) => {
    const aboutUser = await dispatch(actionAboutUser(_id))
    const allPosts = await dispatch(actionAllPostsUser(_id))
    await dispatch(actionPostsCount(_id))
    if (aboutUser && allPosts) {
      await dispatch(actionProfilePageDataTypeUser(aboutUser, allPosts))
    }
  }
  export const actionClearDataUserType = () => ({ type: 'CLEAR-DATA' })
  
  export const actionClearUserData = () => async (dispatch) => {
    const logOut = await dispatch(actionAuthLogout())
    if (logOut) {
      history.push('/input')
       await dispatch(actionClearDataUserType())
    }
  }
//type
export const actionProfilePageDataTypeUser = (aboutUser, allPosts) => ({
    type: 'PROFILE-PAGE-USER',
    aboutUser,
    allPosts,
  })
  
  export const actionProfilePageData = (id) => 
  ({ type: 'DATA_PROFILE', id })
  
  //aboutMe
  
export const actionFullProfilePage = (_id) => async (dispatch) => {
    const aboutMe = await dispatch(actionAboutMe(_id))
    if (aboutMe) {
      await dispatch(actionProfilePageDataType(aboutMe))
    }
  }
  //type
  export const actionProfilePageDataType = (aboutMe) => ({
    type: 'PROFILE-PAGE',
    aboutMe,
  })
  
  export const actionAvatarUpdate = (aboutUser) => ({
    type: 'CHANGE-AVATAR-USER',
    aboutUser,
  })

export const actionRemoveDataUser = () => 
({ type: 'REMOVE-DATA' })

//feed
//type
export const actionFeedType = (newPosts,newPostsFeedCount) => 
  ({ type: 'ADD-POSTS', newPosts,newPostsFeedCount })
  export const actionFeedTypeCount = (postsFeedCount) => 
  ({ type: 'COUNT', postsFeedCount })

// export const actionFeedTypeStop = (postsFeed) => 
// ({ type: 'POSTS', postsFeed })


export const actionFullFeed = (myFollowing, myId,skip=0) => async (dispatch) => {


  // const postsFeed = await dispatch(actionPostsFeed([...myFollowing, myId], skip))
  const postsFeedCount = await dispatch(actionPostsFeedCount([...myFollowing || [], myId]))

    const newPosts = await dispatch(actionPostsFeed([...myFollowing || [], myId], skip))
    if (newPosts&&postsFeedCount) {
      await dispatch(actionFeedType(...newPosts))
      await dispatch(actionFeedTypeCount(postsFeedCount))
      // await dispatch(actionClearPromiseForName('postsFeed'))
    }
  
}

// export const actionFullFeed = (myFollowing) => async (dispatch) => {

//     const postsFeed = await dispatch(actionPostsFeed(myFollowing))
//     console.log('posts feed ', postsFeed)
//     const skip = postsFeed.length
    
//     const postsFeedCount = await dispatch(actionPostsFeedCount(myFollowing))
//     if (skip < postsFeedCount) {
//       const newPosts = await dispatch(actionPostsFeed(myFollowing, skip))
//       if (newPosts) {
//         await dispatch(actionFeedType(newPosts))
//       }
//     }
//   }


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
//type
export const actionAddCommentPostInTape = (postId, newResult) => ({
    type: 'ADD-COMMENT-POSTS',
    postId,
    newResult,
  })

//like


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
//type
const actionAddLikePostInTape = (postId) =>
 ({ type: 'ADD-LIKE-POSTS', postId })

 const actionDeleteLikePostInTape = (likeId, postId) => ({
    type: 'DELETE-LIKE-POSTS',
    likeId,
    postId,
  })

  //one post
  export const actionFullOnePost = (_id) => async (dispatch) => {
    const onePost = await dispatch(actionOnePost(_id))
    if (onePost) {
      await dispatch(actionOnePostType(onePost))
      // await dispatch(actionClearDataUserType())
    }
  
  }
  export const actionFullClearFeedPosts = () => (dispatch) => {
    return dispatch(actionClearFeedPosts())
  }
  //type
  export const actionOnePostType = (onePost) => ({ type: 'ONE-POST', onePost })
  export const actionClearPostsOne = () => ({ type: 'CLEAR-POST-ONE' })

export const actionClearFeedPosts = () => ({ type: 'CLEAR-POSTS' })
