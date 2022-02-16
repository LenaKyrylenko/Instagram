export const actionAuthLogin = (token) => ({ type: 'AUTH_LOGIN', token })
export const actionAuthLogout = () => ({ type: 'AUTH_LOGOUT' })

export const getGQL = (url) => (query, variables) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(localStorage.authToken
        ? { Authorization: 'Bearer ' + localStorage.authToken }
        : {}),
    },
    body: JSON.stringify({ query, variables }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.data) {
        return Object.values(data.data)[0]
      } else {
        throw new Error(JSON.stringify(data.errors))
      }
    })

export const backendURL = 'http://hipstagram.asmer.fs.a-level.com.ua'

export const gql = getGQL(backendURL + '/graphql')

export const actionPending = (name) => ({ type: 'PROMISE', name, status: 'PENDING' })
export const actionFulfilled = (name, payload) => ({
  type: 'PROMISE',
  name,
  status: 'FULFILLED',
  payload,
})
export const actionRejected = (name, error) => ({
  type: 'PROMISE',
  name,
  status: 'REJECTED',
  error,
})
  export const actionPromise = (name, promise) => async (dispatch) => {
  dispatch(actionPending(name))
  try {
    let payload = await promise
    dispatch(actionFulfilled(name, payload))
    return payload
  } catch (error) {
    dispatch(actionRejected(name, error))
  }
}

  export const actionFullLogin = (login, password) => async (dispatch) => {
  let token = await dispatch(
    actionPromise(
      'auth',
      gql(
        ` query login($login:String!, $password:String!){
            login(login:$login, password:$password)} `,
        { login, password },
      ),
    ),
  )
  if (token) {
    dispatch(actionAuthLogin(token))
  }
}
export const actionRegister = (login, password) =>
  actionPromise(
    'register',
    gql(
      `mutation register($login: String!, $password: String!) {
                UserUpsert(user: {login: $login, password: $password, nick: $login}) {
                  _id login
                }
              }`,
      { login: login, password: password },
    ),
  )

  export const actionFullRegister = (login, password) => async (dispatch) => {
  let tokenCheck = await dispatch(actionRegister(login, password))

  if (tokenCheck?.login === login) {
    dispatch(actionFullLogin(login, password))
  }
}

// export const actionAllAboutMe = (_id) =>
//   actionPromise(
//     'aboutMe',
//     gql(
//       `query AboutMe($userId:String){
//         UserFindOne(query:$userId)
//         {
//           _id createdAt login nick  avatar{_id url} 
//           likesCount followers{_id login nick} following{_id login nick}
//         }
//     }`,
//       { userId: JSON.stringify([{ _id }]) },
//     ),
//   )

  // const actionAboutMe = (id) => 
  // actionPromise('aboutMe',gql(`query AboutMe($userId:String){
  //     UserFindOne(query:$userId)
  //     {
  //       login nick  avatar{_id url} createdAt
  //     }
  //   }`,{userId: JSON.stringify([{_id:id}])}))