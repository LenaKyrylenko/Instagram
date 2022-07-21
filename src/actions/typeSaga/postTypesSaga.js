export const actionFullOnePostSaga = (_id) => ({
    type:"ONE_POST", _id
  })
export const actionAddFullCommentSaga = (postId, text) => ({
    type:"ONE_POST_COMMENT", postId, text
    
  })
export const actionAddSubCommentTypeSaga = ( commentId,
  newResult) => ({
  type:"POST_SUB_COMMENT",  commentId, newResult
    
})
export const actionFindSubCommentTypeSaga = (commentId) => ({
  type:"GET_SUB_COMMENT",commentId
    
})
export const actionCreateEditPostTypeSaga= (state) =>
({
    type:"CREATE_EDIT_POST", state
})
