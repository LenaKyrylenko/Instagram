export const actionAddCommentPostFeedType = (postId, newResult) => ({
  type: 'ADD_COMMENT_POSTS',
  postId,
  newResult,
})
export const actionAddCommentType = (newResult) => ({
  type: 'ADD_COMMENT',
  newResult,
})
export const actionAddSubCommentType = (commentId, newResult) => ({
  type: 'ANSWERS-COMMENT',
  commentId,
  newResult,
})

export const addAnswers = (comments, commentId, newResult) =>
  comments.map((comment) => {
    if (comment._id === commentId) {
      return { ...comment, answers: newResult }
    } else if (comment?.answers?.length) {
      return {
        ...comment,
        answers: addAnswers(comment.answers, commentId, newResult),
      }
    } else {
      return { ...comment }
    }
  })
