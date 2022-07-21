import { gql } from "../../helpers/getGQL";
import { actionPromise } from "../types/promiseTypes";

  export const actionChangeSubscribe = (oldFollowing) =>
  actionPromise(
    'changeSubscribe',
    gql(
      `mutation changeSubscribe($user:UserInput) {
        UserUpsert(user: $user) {
          _id
        }
      }
      `,
      {
        user: 
         oldFollowing 
        ,
      },
    ),
    )
export const actionGetFollowing = (_id) =>
  actionPromise(
    'getFollowing',
    gql(
      `query GetFollowing($userId:String){
      UserFindOne(query:$userId)
      {
        following{_id login nick avatar{_id url}}
      }
    }`,
      {
        userId: JSON.stringify([{ _id }]),
      },
    ),
  )


  export const actionGetFollowers = (userId) =>
  actionPromise(
    'getFollowers',
    gql(
      `query GetFollowers($userId:String){
      UserFindOne(query:$userId)
      {
       _id
        followers{_id login nick avatar{_id url}}
      }
    }`,
      {
        userId: JSON.stringify([{ _id:userId }]),
      },
    ),
  )
