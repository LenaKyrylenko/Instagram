export const actionChangeLikeTypeSaga = (likeId, postId) =>
({
    type:"CHANGE_LIKE_POST", likeId,postId
})
export const actionChangeFeedLikeTypeSaga = (likeId, postId) =>
({
    type:"CHANGE_LIKE_POST_FEED", likeId,postId
})
