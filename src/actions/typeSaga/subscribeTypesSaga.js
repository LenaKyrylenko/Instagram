
export const actionChangeSubscribeSaga = (followId,checkFollowId) =>
({
    type:"CHANGE_SUBSCRIBE", followId,checkFollowId
})
export const actionChangeFollowingType = (newResult) => ({
    type:"UPDATE_FOLLOWING", newResult
  })
  
  export const actionChangeFollowersType = (newResult) => ({
    type:"UPDATE_FOLLOWERS", newResult
  })