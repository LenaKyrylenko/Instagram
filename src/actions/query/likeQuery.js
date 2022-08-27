import { gql } from "../../helpers/getGQL";
import { actionPromise } from "../types/promiseTypes";

export const actionAddLike = (postId) =>
  actionPromise(
    'addLike',
    gql(
      `mutation AddLike($like:LikeInput){
        LikeUpsert(like:$like)
        {
          _id
        }
      }`,
      {
        like: {
          post: {
            _id: postId,
          },
        },
      },
    ),
  )

export const actionDeleteLike = (likeId, postId) =>
  actionPromise(
    'deleteLike',
    gql(
      `mutation DeleteLike($like:LikeInput){
        LikeDelete(like: $like)
        {
          _id
        }
      }`,
      {
        like: {
          _id: likeId,
          post: {
            _id: postId,
          },
        },
      },
    ),
  )

export const actionFindLikes = (_id) =>
  actionPromise(
    'onePostLikes',
    gql(
      `query OnePostLikes($post:String){
         PostFindOne(query:$post){
        likes{
          _id
          owner{				
             _id login avatar {url}
            }
      }
        }
      }`,
      {
        post: JSON.stringify([{ _id }]),
      },
    ),
  )

