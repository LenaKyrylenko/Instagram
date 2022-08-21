import { addAnswers } from "../../actions/types/commentTypes"
export const feedReducer = (
  state = {},
  {
    type,
    newPosts = [],
    postId,
    postsFeed,
    postsFeedCount,
    newPostsFeedCount,
    newResult,
    commentId
  },
) => {
  const types = {
    'ADD-POSTS': () => {
      return {
        ...state,
        postsFeed: state?.postsFeed
          ? [...state.postsFeed, ...newPosts]
          : [...newPosts],
        postsFeedCount: postsFeedCount ? postsFeedCount : newPostsFeedCount,
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
        postsFeed: postsFeed,
      }
    },
    'CLEAR_POSTS': () => ({
      postsFeed: [],
      postsFeedCount: 0,
    }),

    'LIKE_POST_FEED': () => ({
      ...state,
      postsFeed: postsFeed?.map((p) =>
        p._id === postId ? (p = { ...p, likes: [...newResult] }) : p,
      ),
    }),
    'ADD_COMMENT_POSTS': () => ({
      ...state,

      postsFeed: postsFeed?.map((p) =>
        p._id === postId ? (p = { ...p, comments: 
          [...newResult] }) : p,
      ),
    }),
    'FEED-ANSWERS-COMMENT': () => ({
      ...state,
      postsFeed: ({
        ...state?.postsFeed?.map((p) =>
          p._id === postId && (p = {
            ...p, comments:
              addAnswers(state?.postsFeed?.p?.comments,
                commentId, newResult)
          })
        )
      })
    })
          
    
  }
  if (type in types) {
    return types[type]()
  }
  return state
}
