export const actionClearExplorePostsType = () => ({
  type: 'CLEAR_EXPLORE_POSTS',
})

export const actionExploreType = (newPosts, newPostsExploreCount) => ({
  type: 'ADD-EXPLORE-POSTS',
  newPosts,
  newPostsExploreCount,
})

export const actionExploreTypeCount = (explorePostsCount) => ({
  type: 'EXPLORE-COUNT',
  explorePostsCount,
})
