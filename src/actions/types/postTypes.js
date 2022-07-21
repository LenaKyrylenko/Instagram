export const actionOnePostType = (onePost) => ({ type: 'POST', onePost })
export const actionClearOnePostType = () => ({ type: 'CLEAR_ONE_POST' })
export const actionPostsType = (newPosts, newPostsCount) => ({
  type: 'ADD-USER-POSTS',
  newPosts,
  newPostsCount,
})
export const actionUserAllPostsType = (allPosts) => ({
  type: 'USER-POSTS',
  allPosts,
})
export const actionClearAllPostsType = () => ({ type: 'CLEAR_ALL_POSTS' })
export const actionCountPostsType = (countPosts) => ({
  type: 'COUNT_ALL_POSTS',
  countPosts,
})
