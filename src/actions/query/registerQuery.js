import { gql } from '../../helpers/getGQL';
import { actionPromise } from "../types/promiseTypes";

const actionRegister = (login, password) =>
  actionPromise(
    'register',
    gql(
      `mutation register($login: String!, $password: String!) {
        createUser (login: $login, password: $password) {
                  _id login
                }
              }`,
      { login, password },
    ),
    )
  export default actionRegister