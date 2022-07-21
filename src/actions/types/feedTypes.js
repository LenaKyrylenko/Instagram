export const actionClearFeedPostsType = () => ({ type: 'CLEAR_POSTS' })

export const actionFeedType = (newPosts, newPostsFeedCount) => ({
  type: 'ADD-POSTS',
  newPosts,
  newPostsFeedCount,
})
export const actionFeedTypeCount = (postsFeedCount) => ({
  type: 'COUNT',
  postsFeedCount,
})
