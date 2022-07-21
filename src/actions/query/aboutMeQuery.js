import { gql } from "../../helpers/getGQL";
import { actionPromise } from "../types/promiseTypes";
import { gqlAnon } from "../../helpers/getGQLAnon";

export const actionAboutMe = (_id) =>
  actionPromise(
    'aboutMe',
    gql(
      `query AboutMe($userId:String){
            UserFindOne(query:$userId)
            {
              _id createdAt login nick avatar{_id url} 
              followers{_id login nick avatar{_id url}} 
              following{_id login nick avatar{_id url}}
              likesCount
            }
          }`,
      {
        userId: JSON.stringify([{ _id }]),
      },
    ),
  )
  export const actionUserUpsert = (user, _id) =>
  actionPromise(
    'userUpsert',
    gql(
      `mutation UserUpsert($user:UserInput){
                  UserUpsert(user:$user){
                      _id login nick avatar{_id}
                  }
              }`,
      {
        user: {
          _id,
          login: user?.login,
          nick : user?.nick
        },
      },
    ),
  )
  export const actionAvatar = (imageId, _id) =>
  actionPromise(
    'setAvatar',
    gql(
      `mutation setAvatar($imageId:ID, $userId:String){
    UserUpsert(user:{_id: $userId, avatar: {_id: $imageId}}){
    _id, avatar{
        _id
    }
    }
    }`,
      { imageId, userId: _id },
    ),
  )
  export const actionGetAvatar= (_id) =>
  actionPromise(
    'getAvatar',
    gql(
      `query getAvatar($userId:String){
            UserFindOne(query:$userId)
            {
             avatar{_id url}
            }
          }`,
      {
        userId: JSON.stringify([{ _id }]),
      },
    ),
  )
  

  export const actionChangePassword = (login, password, newPassword) =>
  actionPromise(
    'newPassword',
    gqlAnon(
      `mutation changePassword($login: String!, $password: String!, $newPassword: String!) {
        changePassword (login: $login, password: $password, newPassword: $newPassword) {
                  _id login
                }
              }`,
      { login, password, newPassword },
    ),
  )