export const actionFullOnePostSaga = (_id) => ({
    type:"ONE_POST", _id
  })
export const actionAddFullCommentSaga = (postId, text) => ({
    type:"ONE_POST_COMMENT", postId, text
    
  })
  