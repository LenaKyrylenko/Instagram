
export const exploreReducer = (
    state = {},
    { skip, type, newPosts = [],explorePostsCount, postId, explorePosts, postsFeedCount,newPostsExploreCount, newResult },
  ) => {
    const types = {
      'ADD-EXPLORE-POSTS': () => {
        return {
          ...state,
          explorePosts: state?.explorePosts ? [...state.explorePosts, ...newPosts] : [...newPosts],
          explorePostsCount: explorePostsCount ? explorePostsCount : newPostsExploreCount
        }
      },
      'EXPLORE-COUNT': () => {
        return {
          ...state,
          explorePostsCount: explorePostsCount ? explorePostsCount : newPostsExploreCount,
        }
      },
      'EXPLORE-POSTS': () => {
        return {
          ...state,
          explorePosts: explorePosts ,
        }
      },
      'CLEAR_EXPLORE_POSTS': () => ({
        ...state,
        explorePosts: [],
        explorePostsCount: 0,
    }),
    }
    if (type in types) {
      return types[type]()
    }
    return state
}
// export const actionAllClearExplore = () => async (dispatch) => {
//   Promise.all([
//     await dispatch(actionClearPromiseForName('explorePosts')),
//     await dispatch(actionClearPromiseForName('explorePostsCount')),
//       await dispatch(actionClearExplorePosts())
//   ])

// }
export const actionClearExplorePosts = () =>
  ({ type: 'CLEAR_EXPLORE_POSTS' })

export const actionExploreType = (newPosts,newPostsExploreCount) => 
  ({ type: 'ADD-EXPLORE-POSTS', newPosts, newPostsExploreCount })
  
  export const actionExploreTypeCount = (explorePostsCount) => 
  ({ type: 'EXPLORE-COUNT', explorePostsCount })
