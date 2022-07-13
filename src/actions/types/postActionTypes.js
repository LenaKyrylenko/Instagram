
export const actionOnePostType = (onePost) => ({ type: 'POST', onePost })
export const actionClearOnePostType = () => ({ type: 'CLEAR_ONE_POST' })
export const actionChangeLikeType = (newResult) => ({
    type:"CHANGE_LIKE", newResult
    
  })
  export const actionAddCommentType = (newResult) => ({
    type:"ADD_COMMENT", newResult
  })