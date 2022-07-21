import { gql } from "../../helpers/getGQL";
import { actionPromise } from "../types/promiseTypes";

export const actionSearchUser = (userName) =>
actionPromise(
  'searchUser',
  gql(
    `
query gf($query: String){
    UserFind(query: $query){
        _id, login avatar{url}
    }
}`,
    {
      query: JSON.stringify([
        {
          $or: [{ login: `/${userName}/` }],
        },
        {
          sort: [{ login: 1 }],
        }, 
      ]),
    },
  ),
)



