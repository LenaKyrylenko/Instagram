import { actionClearPromiseForName } from '../../../actions'
// import { actionClearDataUserType } from '../profileUserPage/profileUserReducer'
// import { actionProfilePageDataTypeUser } from '../profileUserPage/profileUserReducer'

export const feedReducer = (
    state = {},
    { skip, type, newPosts = [], postId, postsFeed, postsFeedCount,newPostsFeedCount, newResult },
  ) => {
    const types = {
      'ADD-POSTS': () => {
        return {
          ...state,
          postsFeed: state?.postsFeed ? [...state.postsFeed, ...newPosts] : [...newPosts],
          // postsFeed: [...postsFeed || [], ...newPosts],
          postsFeedCount: postsFeedCount ? postsFeedCount : newPostsFeedCount
         // postsFeed: postsFeed ? [...postsFeed, ...newPosts] : [...newPosts],
        }
      },
      'COUNT': () => {
        return {
          ...state,
          postsFeedCount: postsFeedCount,
        }
      },
      'POSTS': () => {
        return {
          ...state,
          postsFeed: postsFeed ,
        }
      },
      'CLEAR_POSTS': () => ({

        postsFeed: [],
        postsFeedCount: 0,
    }),
  
      'ADD-LIKE-POSTS': () => ({
        ...state,
        postsFeed: postsFeed?.map((p) =>
          p._id === postId ? (p = { ...p, likes: [...newResult] }) : p,
        ),
      }),
      'DELETE-LIKE-POSTS': () => ({
        ...state,
        postsFeed: postsFeed?.map((p) =>
          p._id === postId ? (p = { ...p, likes: [...newResult] }) : p,
        ),
      }),
  
      'ADD-COMMENT-POSTS': () => ({
        ...state,
        postsFeed: postsFeed?.map((p) =>
          p._id === postId ? (p = { ...p, comments: [...newResult] }) : p,
        ),
      }),
    }
    if (type in types) {
      return types[type]()
    }
    return state
}

// export const actionFullClearFeedPosts = () => (dispatch) => {
//   return dispatch(actionClearFeedPosts())
// }

export const actionClearFeedPosts = () =>
  ({ type: 'CLEAR_POSTS' })

//type
export const actionAddLikePostInTape = (postId) =>
 ({ type: 'ADD-LIKE-POSTS', postId })

 export const actionDeleteLikePostInTape = (likeId, postId) => ({
    type: 'DELETE-LIKE-POSTS',
    likeId,
    postId,
  })
  export const actionAddCommentPostInTape = (postId, newResult) => ({
    type: 'ADD-COMMENT-POSTS',
    postId,
    newResult,
  })

export const actionFeedType = (newPosts, newPostsFeedCount) => 
({ type: 'ADD-POSTS', newPosts,newPostsFeedCount })
export const actionFeedTypeCount = (postsFeedCount) => 
({ type: 'COUNT', postsFeedCount })


