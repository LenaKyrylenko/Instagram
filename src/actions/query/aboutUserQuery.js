import { gql } from '../../helpers/getGQL'
import { actionPromise } from '../types/promiseTypes'

export const actionAboutUser = (_id) =>
  actionPromise(
    'aboutUser',
    gql(
      `query AboutMe($userId:String){
    UserFindOne(query:$userId)
    {
      _id createdAt login nick avatar{_id url} 
      followers{_id login nick avatar{_id url}} 
      following{_id login nick avatar{_id url}}
    }
  }`,
      {
        userId: JSON.stringify([{ _id }]),
      },
    ),
  )

export const actionAllPostsUser = (userId, skip) =>
  actionPromise(
    'allPosts',
    gql(
      `query allPosts($userId:String!){
PostFind(query:$userId){
       owner{_id} _id title text images{_id url originalFileName}
}
}`,
      {
        userId: JSON.stringify([
          { ___owner: userId },

          {
            sort: [{ _id: -1 }],
            skip: [skip || 0],
            limit: [12],
          },
        ]),
      },
    ),
  )

export const actionPostsCount = (_id) =>
  actionPromise(
    'countPosts',
    gql(
      ` query CountAllPostsUser($_id:String!){
                PostCount(query:$_id)

                }`,

      {
        _id: JSON.stringify([{ ___owner: { $in: [_id] } }]),
      },
    ),
  )
