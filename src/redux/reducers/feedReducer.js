
export const feedReducer = (
    state = {},
    { skip, type, newPosts = [], postId, postsFeed, postsFeedCount,newPostsFeedCount, newResult },
  ) => {
    const types = {
      'ADD-POSTS': () => {
        return {
          ...state,
          postsFeed: state?.postsFeed ? [...state.postsFeed, ...newPosts] : [...newPosts],
          postsFeedCount: postsFeedCount ? postsFeedCount : newPostsFeedCount
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
  
      'LIKE_POST_FEED': () => ({
        ...state,
        postsFeed: postsFeed?.map((p) =>
          p._id === postId ? (p = { ...p, likes: [...newResult] }) : p,
        ),
      }),
      'ADD_COMMENT_POSTS': () => ({
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

