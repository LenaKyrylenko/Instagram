import { gql } from "../../helpers/getGQL";
import { actionPromise } from "../types/promiseTypes";

export const actionExplorePosts = (skip) =>
actionPromise(
  'explorePosts',
  gql(
    ` query PostsFeed($_id:String){
      PostFind(query:$_id){
      owner{_id login avatar{url}}
      images{_id url} title text
      _id likesCount 

        likes{
              _id
              owner{				
                 _id login avatar {_id url}
                }
          }
          comments{
            _id, createdAt, text  owner{_id login avatar{_id url}}
            answers{
              _id, createdAt, text owner{_id login  avatar{_id url}}
             
            }
  }
}
          }`,
    {
      _id: JSON.stringify([
        {},
        {
          sort: [{ _id: -1 }],
          skip: [skip || 0],
          limit: [12],
        },
      ]),
    },
  ),
)
export const actionExplorePostsCount = () =>
actionPromise(
  'explorePostsCount',
  gql(
    ` query CountAllPosts($_id:String!){
              PostCount(query:$_id)

              }`,

    {
      _id: JSON.stringify([{}]),
    },
  ),
)