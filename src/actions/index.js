import { actionFullProfilePageUser, actionFullProfilePage,actionFeedType,actionClearFeedPosts } from '../reducers'

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

export const gql = getGQL('/graphql')

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
            }
          }`,
      {
        userId: JSON.stringify([{ _id }]),
      },
    ),
  )

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
  return fetch('/upload', {
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

export const actionAvatar = (imageId) => async (dispatch, getState) => {
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

// export const actionChangeLogin = (imageId) => async (dispatch, getState) => {
//   await dispatch(
//     actionPromise(
//       'changeLogin',
//       gql(
//         `mutation setAvatar($imageId:ID, $userId:String){
//     UserUpsert(user:{_id: $userId, avatar: {_id: $imageId}}){
//     _id, avatar{
//         _id
//     }
//     }
//     }`,
//         { imageId, userId: getState().auth?.payload?.sub?.id },
//       ),
//     ),
//   )
// }

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

export const actionAllPosts = (userId) =>
  actionPromise(
    'allPostsMe',
    gql(
      `query allPosts($userId:String!){
  PostFind(query:$userId){
           owner{_id} _id title text images{_id url}
    }
}`,
      {
        userId: JSON.stringify([
          { ___owner: userId },

          {
            sort: [{ _id: -1 }],
            skip: [0],
            limit: [36],
          },
        ]),
      },
    ),
  )

export const actionPostsCount = (_id) =>
  actionPromise(
    'countAllPostsUser',
    gql(
      ` query CountAllPostsUser($_id:String!){
                PostCount(query:$_id)

                }`,

      { _id: JSON.stringify([{ ___owner: { $in: [_id] } }]) },
    ),
  )

export const actionAllPostsFeed = () =>
  actionPromise(
    'postsFeed',
    gql(
      ` query allPosts($_id:String){
                PostFind(query:$_id){
                  owner{_id login avatar{_id url}} _id title text images{_id url}
                }
            }`,
      {
        _id: JSON.stringify([
          {},
          {
            sort: [{ _id: -1 }],
            skip: [0],
            limit: [10],
          },
        ]),
      },
    ),
  )

export const actionOnePost = (_id) => async (dispatch) => {
  await dispatch(
    actionPromise(
      'onePost',
      gql(
        `query OneFind($post:String){
         PostFindOne(query:$post){
        _id title text images{_id url}
        createdAt
        comments{
          _id, createdAt, text  owner{_id login avatar{_id url}}
          answers{
            _id, createdAt, text owner{_id login  avatar{_id url}}
           
          }
        owner{_id login avatar{_id url}}}
        likes{
          _id
          owner{				
             _id login avatar {_id url}
            }
      }
        }
      }`,
        {
          post: JSON.stringify([{ _id }]),
        },
      ),
    ),
  )
}

export const actionFindLikes = (_id) => async (dispatch) => {
  await dispatch(
    actionPromise(
      'onePost',
      gql(
        `query OneFind($post:String){
         PostFindOne(query:$post){
        likes{
          _id
          owner{				
             _id login avatar {url}
            }
      }
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
export const actionAddComment = (postId, text) => async (dispatch) => {
  await dispatch(
    actionPromise(
      'addComment',
      gql(
        `mutation AddComment($comment:CommentInput){
          CommentUpsert(comment:$comment)
          {
            _id
            text 
            createdAt
          }
        }`,
        {
          comment: {
            post: {
              _id: postId,
            },
            text: text,
          },
        },
      ),
    ),
  )
}
export const actionAddSubComment = (commentId, comment) => async (dispatch) => {
  await dispatch(
    actionPromise(
      'addSubComment',
      gql(
        `mutation AddComment($comment:CommentInput){
          CommentUpsert(comment:$comment)
          {
            _id
            text 
            createdAt
          }
        }`,
        {
          comment: {
            answerTo: {
              _id: commentId,
            },
            text: comment,
          },
        },
      ),
    ),
  )
}

// export const actionAddFullComment = (postId,comment) => async(dispatch) => {
//   let addComment = await dispatch(actionAddComment(postId,comment));
//   if(addComment){
//     await dispatch(actionOnePost(postId));
//   }
// }

export const actionAddFullComment = (postId, comment) => async (
  dispatch,
  getState,
) => {
  await dispatch(actionAddComment(postId, comment))
  const {
    promise: {
      addComment: { status },
    },
  } = getState()
  if (status === 'FULFILLED') {
    await dispatch(actionOnePost(postId))
  }
  // await dispatch(actionOnePost(postId));
}

export const actionAddSubFullComment = (postId, commentId, comment) => async (
  dispatch,
  getState,
) => {
  await dispatch(actionAddSubComment(commentId, comment))
  const {
    promise: {
      addSubComment: { status },
    },
  } = getState()
  if (status === 'FULFILLED') {
    await dispatch(actionOnePost(postId))
  }
  // await dispatch(actionOnePost(postId));
}
// export const actionAddlike = _id =>
//             actionPromise("addLike", gql(`mutation AddLike($like:LikeInput){
//               LikeUpsert(like:$like){
//                 _id
//               }
//             }`,{
//               like:{
//                   "post":{
//                       "_id": _id
//                   }
//               }
//             }))

export const actionAddLike = (postId) => async (dispatch) => {
  await dispatch(
    actionPromise(
      'addLike',
      gql(
        `mutation AddLike($like:LikeInput){
          LikeUpsert(like:$like)
          {
            _id owner{_id login}
          }
        }`,
        {
          like: {
            post: {
              _id: postId,
            },
          },
        },
      ),
    ),
  )
}
export const actionAddFullLike = (postId) => async (dispatch, getState) => {
  await dispatch(actionAddLike(postId))
  const {
    promise: {
      addLike: { status },
    },
  } = getState()
  if (status === 'FULFILLED') {
    await dispatch(actionOnePost(postId))
  }
  //  await dispatch(actionOnePost(postId));
}

export const actionGetFindLiked = (_id) => async (dispatch) => {
  await dispatch(
    actionPromise(
      'findLiked',
      gql(
        ` query LikeFindPost($id:String!) {
                                        LikeFind(query:$id){
                                          owner { _id nick login
                                                avatar{_id url}
                                    }
                }
            } `,
        {
          id: JSON.stringify([{ 'post._id': _id }]),
        },
      ),
    ),
  )
}

// export const actionDeleteFullLike = (likeId) => async(dispatch,getState) => {
//   let unLike = await dispatch(actionDeleteLike(likeId));
//   if(unLike){
//     await dispatch(actionOnePost(unLike?.post?._id));
//   }
// }

export const actionDeleteFullLike = (likeId, postId) => async (
  dispatch,
  getState,
) => {
  await dispatch(actionDeleteLike(likeId, postId))
  const {
    promise: {
      deleteLike: { status },
    },
  } = getState()
  if (status === 'FULFILLED') {
    await dispatch(actionOnePost(postId))
  }
  //  await dispatch(actionOnePost(postId));
}
export const actionDeleteLike = (likeId, postId) => async (dispatch) => {
  await dispatch(
    actionPromise(
      'deleteLike',
      gql(
        `mutation DeleteLike($like:LikeInput){
          LikeDelete(like: $like)
          {
            _id, post{
              _id owner{_id login avatar{_id url}}
            }
          }
        }`,
        {
          like: {
            _id: likeId,
            post: {
              _id: postId,
            },
          },
        },
      ),
    ),
  )
}
// {
//   _id
//   post:{
//   _id: $postId
// }
// query:"[{\"_id\": \"62068eaaad55d22f3e2fb250\"}]")
export const actionSetAvatar = (file) => async (dispatch) => {
  let result = await dispatch(actionUploadFile(file))
  if (result) {
    await dispatch(actionAvatar(result._id))
    // await dispatch(actionAvatar(result._id))

    await dispatch(actionAboutMe())
  }
}
// let following =  getState().promise.aboutUser?.payload?.following
// let result =  await dispatch (actionAboutMe())
export const actionPostsFeed = (myFollowing,skip) => 
    actionPromise(
      'postsFeed',
      gql(
        `query PostsFeed($ownerId:String){
	          PostFind(query:$ownerId){
            owner{_id login avatar{url}}
            images{_id url} title text
            _id likesCount 
            likes{
                owner{				
                    login avatar {_id url}
                  }
            }
      	}
    }`,
        {
          ownerId: JSON.stringify([
            {
              ___owner: {
                $in: myFollowing
              },
            },
            {
              sort: [{ _id: -1 }],
              skip: [skip||0],
              limit: [10],
              //  limit: [10],
            },
          ]),
        },
      ),
    )

    export const actionFullAllGetPosts = () => async (dispatch, getState) => {
      const {
        feed: { postsFeed = [] },
      } = getState();
      const myFollowing =  getState().promise.aboutMe?.payload?.following.map(
        ({ _id }) => _id,
      )
      
      let postsUsers = await dispatch(actionPostsFeed(myFollowing,postsFeed?.length));
      if (postsUsers) {
        dispatch(actionFeedType(postsUsers));
      }
    };
    

export const actionPostsFeedCount = (getState) =>
    actionPromise(
      'postsFeedCount',
      gql(
        ` query CountAllPostsUser($_id:String!){
                PostCount(query:$_id)

                }`,

        {
          _id: JSON.stringify([{
            ___owner: {
              $in: getState().promise.aboutMe?.payload?.following.map(
                ({ _id }) => _id,
              ),
            },
          }])
        },
      ),
    )




export const actionGetAllPosts = (skip) =>
  actionPromise(
    'allGetPosts',
    gql(
      ` query allPosts($id:String!){
                PostFind(query:$id){
                    _id   images{url _id }
                }
            }`,
      {
        id: JSON.stringify([
          {},
          {
            sort: [{ _id: -1 }],
            skip: [skip || 0],
            limit: [36],
          },
        ]),
      },
    ),
  )

export const actionSearchUser = (userName) => async (dispatch) => {
  await dispatch(
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
              $or: [{ login: `/${userName}/` }], //регулярки пишутся в строках
            },
            {
              sort: [{ login: 1 }],
            }, //сортируем по title алфавитно
          ]),
        },
      ),
    ),
  )
}

export const actionUserUpsert = (user) => async (dispatch, getState) => {
  await dispatch(
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
            ...user,
            _id: JSON.stringify([{ _id: getState().auth?.payload?.sub?.id }]),
          },
        },
      ),
    ),
  )
}

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

export const actionAllPostsUser = (userId) =>
  actionPromise(
    'allPosts',
    gql(
      `query allPosts($userId:String!){
PostFind(query:$userId){
       owner{_id} _id title text images{_id url}
}
}`,
      {
        userId: JSON.stringify([
          { ___owner: userId },

          {
            sort: [{ _id: -1 }],
            skip: [0],
            limit: [10],
          },
        ]),
      },
    ),
  )
export const actionSubscribe = (my_Id, followId, oldFollowing) =>
  actionPromise(
    'subscribe',
    gql(
      `mutation subscribe($user:UserInput) {
        UserUpsert(user: $user) {
          _id following{_id login}
          followers{
            _id login
          }
        }
      }
      `,
      {
        user: {
          _id: my_Id,
          following: [...oldFollowing || [], { _id: followId }],
        },
      },
    ),
  )

export const actionUnSubscribe = (my_Id, oldFollowing) =>
  actionPromise(
    'unSubscribe',
    gql(
      `mutation unSubscribe($user:UserInput) {
        UserUpsert(user: $user) {
          _id following{_id login}
          followers{
            _id login
          }
        }
      }
      `,
      {
        user: {
          _id: my_Id,
          following: oldFollowing || []
        },
      },
    ),
  )

export const actionFullSubscribe = (my_Id, followId) => async (dispatch, getState) => {
  const oldFollowing = (
    getState().promise.aboutMe?.payload?.following || []).map(({_id }) => ({ _id }) )
  //console.log('FOLLOWING _ID ', oldFollowing)
  let followingId = await dispatch(
    actionSubscribe(my_Id, followId, oldFollowing),
  )
  if (followingId) {
    Promise.all([
      dispatch(actionFullProfilePageUser(followId)),
      dispatch(actionFullProfilePage(my_Id))
    ]);
    await dispatch(actionClearFeedPosts())

  }
}

export const actionFullUnSubscribe = (my_Id, followId) => async (dispatch,getState) => {
  const oldFollowing= (
    getState().promise.aboutMe?.payload?.following || []
  ).filter((item) => item._id !== followId).map(({_id }) => ({ _id }));
 // console.log('OLDFOLLOWING ', oldFollowing)
  if (oldFollowing) {
    await dispatch(actionUnSubscribe(my_Id, oldFollowing))
    Promise.all([
      await dispatch(actionFullProfilePageUser(followId)),
    await dispatch(actionFullProfilePage(my_Id))
    ])
    await dispatch(actionClearFeedPosts())

  }
}


export const actionUserUpdate = (user = {}) => async (dispatch, getState) => {
  await dispatch(actionUserUpsert(user))
  const {
    promise: {
      userUpsert: { status },
    },
  } = getState()
  if (status === 'FULFILLED') {
    await dispatch(actionAboutMe())
  }
  await dispatch(actionAboutMe())
}

export const actionFindSubComment = (findId) =>
  actionPromise(
    'subComments',
    gql(
      `query commentFindOne ($id:String!){
        CommentFindOne(query:$id){
       _id text answers { 
                _id text
                post {_id }
                answers { _id}
                createdAt
                likes { _id owner 
                {_id avatar{_id url} login nick } }
                owner {
                    _id login nick 
                    avatar { _id url } 
                    } 
                }
        } 
    }`,
      {
        id: JSON.stringify([
          {
            _id: findId,
          },
        ]),
      },
    ),
  )