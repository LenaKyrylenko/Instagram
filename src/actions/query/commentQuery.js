import { gql } from "../../helpers/getGQL";
import { actionPromise } from "../types/promiseTypes";

export const actionAddComment = (postId, text) => 
actionPromise(
  "addComment",
  gql(
    `mutation AddComment($comment:CommentInput){
      CommentUpsert(comment:$comment)
      {
        _id
        text 
        createdAt
      }
    }`,
    {
      comment: {
        post: {
          _id: postId,
        },
        text
      },
    },
  ),
    )

export const actionOnePost = (_id) =>
  actionPromise(
    'onePost',
    gql(
      `query OneFind($post:String){
        PostFindOne(query:$post){
          _id createdAt title text 
          images{_id url originalFileName}
          comments {
              _id createdAt text 
              likes { _id owner {_id login nick avatar {url} }}   
              owner {_id login nick
                      avatar {url}
                  }
              answers{
                  _id  
                  }
                 answerTo{_id} 
              }
              likes{
                _id
                owner{				
                   _id login avatar {url}
                  }
            }
          owner {_id login nick
              avatar {url}
              }
          }
      }
      `,
      {
        post: JSON.stringify([{ _id }]),
      },
    ),
    )
  
    

export const actionGetCommentsOnePost = (postId) =>
actionPromise('commentsOnePost',
  gql(`query commentFindPost ($id:String!){
      PostFindOne(query:$id){
          comments {
              _id text createdAt 
              owner{
                  _id nick login
                  avatar{
                      _id url
                      }
                  } 
                  likes{_id}
              }
      }
  }`, { id: JSON.stringify([{ _id: postId }]) }))
  
export const actionFindSubComment = (findId) =>
actionPromise(
  'subComments',
  gql(
    `query commentFindOne ($id:String!){
      CommentFindOne(query:$id){
     _id text answers { 
              _id text
              post {_id }
              answers { _id}
              createdAt
              likes { _id owner 
              {_id avatar{_id url} login nick } }
              owner {
                  _id login nick 
                  avatar { _id url } 
                  } 
              }
      } 
  }`,
    {
      id: JSON.stringify([
        {
          _id: findId,
        },
      ]),
    },
  ),
)
export const actionAddSubComment = (commentId, newResult) =>
    actionPromise(
      'addSubComment',
      gql(
        `mutation AddComment($comment:CommentInput){
          CommentUpsert(comment:$comment)
          {
            _id
            text 
            createdAt
          }
        }`,
        {
          comment: {
            answerTo: {
              _id: commentId,
            },
            text: newResult,
          },
        },
      ),
  )

