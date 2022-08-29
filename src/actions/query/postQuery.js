import { gql } from '../../helpers/getGQL'
import { actionPromise } from '../types/promiseTypes'

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
                _id  createdAt text 
                owner {_id login nick
                  avatar {url}
              }
                }
               answerTo{_id
                createdAt text 
                owner {_id login nick
                  avatar {url}
              }
              } 
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
export const actionPostUpsert = (post, postId) =>
  actionPromise(
    'postUpsert',
    gql(
      `
mutation PostUpsert($post:PostInput){
  PostUpsert(post:$post){
    _id title text images{_id url 
      originalFileName
    }
  }
}`,
      {
        post: {
          ...post,
          _id: postId,
          images: post.images.map(({ _id }) => ({ _id })),
         
        },
      },
    ),
  )
