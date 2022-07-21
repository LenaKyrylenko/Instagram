import { gql } from "../../helpers/getGQL";
import { actionPromise } from "../types/promiseTypes";
export const actionLogin = (login, password) => {
    return actionPromise(
        "auth",
        gql(
            `query log($login:String!, $password:String!) {
              login(login:$login, password:$password)
             }`,
            { login, password }
        )
    );
};