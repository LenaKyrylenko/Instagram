export const actionAddCommentPostFeedType = (postId, newResult) => ({
    type: 'ADD_COMMENT_POSTS',
    postId,
    newResult,
  })
  export const actionAddCommentType = (newResult) => ({
    type:"ADD_COMMENT", newResult
})
export const actionAddSubCommentType = (commentId,newResult) => ({
    type:"ANSWERS-COMMENT",commentId, newResult
  })
  