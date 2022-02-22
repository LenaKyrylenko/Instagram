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

export const actionPending = (name) => ({
  type: 'PROMISE',
  name,
  status: 'PENDING',
})
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
export const uploadFile = (file) => {
  const myForm = new FormData()
  myForm.append('photo', file)
  return fetch(backendURL + '/upload', {
    method: 'POST',
    headers: localStorage.authToken
      ? { Authorization: 'Bearer ' + localStorage.authToken }
      : {},
    body: myForm,
  }).then((result) => result.json())
}
export const actionUploadFile = (file) =>
  actionPromise('uploadFile', uploadFile(file))

export const actionUploadFiles = (files) =>
  actionPromise(
    'uploadFiles',
    Promise.all(files.map((file) => uploadFile(file))),
  )
const actionAvatar = (imageId) => async (dispatch, getState) => {
  await dispatch(
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
        { imageId, userId: getState().auth?.payload?.sub?.id },
      ),
    ),
  )
}
export const actionAboutMe = () => async (dispatch, getState) => {
  await dispatch(
    actionPromise(
    'aboutMe',
      gql(
        `query AboutMe($userId:String){
  UserFindOne(query:$userId)
  {
    _id createdAt login nick avatar{_id url} 
     followers{_id login nick} following{_id login nick}
  }
}`,
        {
          userId: JSON.stringify([{ _id: getState().auth?.payload?.sub?.id }]),
        },
      ),
    ),
  )
}
// export const actionAboutUser = actionAboutMe
// :'aboutMe'
export const actionPostUpsert = (post) =>
  actionPromise(
    'postUpsert',
    gql(
      `
mutation PostUpsert($post:PostInput){
  PostUpsert(post:$post){
    _id title text images{_id url}
  }
}`,
      {
        post: {
          ...post,
          images: post.images.map(({ _id }) => ({ _id })),
        },
      },
    ),
  )

export const actionAllPosts = () => async (dispatch, getState) => {
  await dispatch(
    actionPromise(
      'allPosts',
      gql(
        `query allPosts($userId:String){
  PostFind(query:$userId){
           owner{_id} _id title text images{_id url}
    }
}`,
        {
          userId: JSON.stringify([
            { ___owner: getState().auth?.payload?.sub?.id },

            { sort: [{ _id: -1 }] },
          ]),
        },
      ),
    ),
  )
}
export const actionOnePost = (_id) => async (dispatch) => {
  await dispatch(
    actionPromise(
      'onePost',
      gql(
        `query OneFind($post:String){
         PostFindOne(query:$post){
        _id title text images{_id url}
    }
}`,
        {
          post: JSON.stringify([{ _id }]),
        },
      ),
    ),
  )
}
export const actionAllFollowers = (_id) => async (dispatch) => {
  await dispatch(
    actionPromise(
      'allFollowers',
      gql(
        `query AllFollowers($userId:String){
  UserFindOne(query:$userId)
    {
          followers{_id login}
    }
}`,
        {
          userId: JSON.stringify([{ _id }]),
        },
      ),
    ),
  )
}

export const actionAllFollowing = (_id) => async (dispatch) => {
  await dispatch(
    actionPromise(
      'allFollowing',
      gql(
        `query AllFollowing($userId:String){
  UserFindOne(query:$userId)
    {
          following{_id login}
    }
}`,
        {
          userId: JSON.stringify([{ _id }]),
        },
      ),
    ),
  )
}

// query:"[{\"_id\": \"62068eaaad55d22f3e2fb250\"}]")
export const actionSetAvatar = (file) => async (dispatch) => {
  let result = await dispatch(actionUploadFile(file))
  if (result) {
    await dispatch(actionAvatar(result._id))
    await dispatch(actionAboutMe())
  }
}
// let following =  getState().promise.aboutUser?.payload?.following  
// let result =  await dispatch (actionAboutMe())
export const actionPostsFeed = () => async (dispatch,getState) => {
  await dispatch(
    actionPromise(
      'postsFeed',
      gql(`query PostsFeed($ownerId:String){
	          PostFind(query:$ownerId){
            owner{_id login avatar{url}}
            images{_id url} title text
            _id likesCount 
            likes{
                owner{				
                    login avatar {url}
                  }
            }
      	}
    }`,
        {
            ownerId: JSON.stringify([
            { ___owner: {$in:  
              getState().promise.aboutMe?.payload?.following.map(({ _id }) => (_id))}},
            {
              sort: [{ _id: -1 }],
              skip: [0],
               limit: [10],
            },
          ]),
        },
      ),
    ),
  )
}

export const actionSearchUser =(userName)=> async (dispatch)=>{

  await dispatch(actionPromise(
    'searchUser', gql(`
    query gf($query: String){
        UserFind(query: $query){
            _id, login avatar{url}
        }
    }`, {query: JSON.stringify([
                {
                    $or: [{login: `/${userName}/`}] //регулярки пишутся в строках
                },
                {
                    sort: [{login: 1}]} //сортируем по title алфавитно
                ])
    })
  ))
}