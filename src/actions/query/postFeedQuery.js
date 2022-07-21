import { gql } from '../../helpers/getGQL'
import { actionPromise } from '../types/promiseTypes'

export const actionPostsFeed = (myFollowing, skip) =>
  actionPromise(
    'postsFeed',
    gql(
      `query PostsFeed($ownerId:String){
        PostFind(query:$ownerId){
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
        ownerId: JSON.stringify([
          {
            ___owner: {
              $in: myFollowing,
            },
          },
          {
            sort: [{ _id: -1 }],
            skip: [skip || 0],
            limit: [10],
          },
        ]),
      },
    ),
  )

export const actionPostsFeedCount = (myFollowing) =>
  actionPromise(
    'postsFeedCount',
    gql(
      ` query CountAllPostsFeed($_id:String!){
                  PostCount(query:$_id)
  
                  }`,

      {
        _id: JSON.stringify([
          {
            ___owner: {
              $in: myFollowing,
            },
          },
        ]),
      },
    ),
  )
