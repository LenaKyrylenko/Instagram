
export const actionAddCommentFeedTypeSaga = (postId, text) => ({
    type:"FEED_POST_COMMENT", postId, text
    
  })
  
  export const actionAddFullCommentFeed = (postId, newResult) => ({
    type:"ADD_COMMENT_FEED", postId, newResult
  })