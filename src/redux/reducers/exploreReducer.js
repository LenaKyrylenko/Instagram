export const exploreReducer = (
  state = {},
  {
    type,
    newPosts = [],
    explorePostsCount,
    explorePosts,
    newPostsExploreCount,
  },
) => {
  const types = {
    'ADD-EXPLORE-POSTS': () => {
      return {
        ...state,
        explorePosts: state?.explorePosts
          ? [...state.explorePosts, ...newPosts]
          : [...newPosts],
        explorePostsCount: explorePostsCount
          ? explorePostsCount
          : newPostsExploreCount,
      }
    },
    'EXPLORE-COUNT': () => {
      return {
        ...state,
        explorePostsCount: explorePostsCount
          ? explorePostsCount
          : newPostsExploreCount,
      }
    },
    'EXPLORE-POSTS': () => {
      return {
        ...state,
        explorePosts: explorePosts,
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
