import { ConsoleSqlOutlined } from '@ant-design/icons'
import {
  actionFullProfilePageUser,
  actionFullProfilePage,
} from '../redux/saga'
import { actionFeedTypeCount } from '../redux/reducers/feed/feedReducer'
import { actionFeedType } from '../redux/reducers/feed/feedReducer'
import { actionExploreTypeCount } from '../redux/reducers/explore/exploreReducer'
import { actionClearExplorePosts } from '../redux/reducers/explore/exploreReducer'
import { actionExploreType } from '../redux/reducers/explore/exploreReducer'
import { actionClearFeedPosts } from '../redux/reducers/feed/feedReducer'
import {actionProfilePageDataType} from '../redux/reducers/profileData/profileReducer'
import { history } from '../helpers'
import{promiseWorker} from '../redux/saga'
import { all, put, takeEvery, takeLatest, takeLeading, select,call } from 'redux-saga/effects'; //
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

export const getGQLAnon = (url) => (query, variables) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
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

export const gqlAnon = getGQLAnon('/graphql')

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
// export const actionPromise = (name, promise) => async (dispatch) => {
//   dispatch(actionPending(name))
//   try {
//     let payload = await promise
//     dispatch(actionFulfilled(name, payload))
//     return payload
//   } catch (error) {
//     dispatch(actionRejected(name, error))
//   }
// }
const actionPromise = (name, promise) =>
  ({ type: 'PROMISE_START', name, promise })


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

 export const actionFullLogin = (login, password) =>  //упрощенный action для саги
    ({type: 'FULL_LOGIN', login, password})
    
export const actionLogin = (login, password) => { //функция, которая возвращает результат actionPromise
    return actionPromise(
        "auth",
        gql(
            `query log($login:String, $password:String) {
              login(login:$login, password:$password)
             }`,
            { login, password }
        )
    );
};


// export const actionFullLogin = (login, password) => async (dispatch) => {
//   let token = await dispatch(
//     actionPromise(
//       'auth',
//       gql(
//         ` query login($login:String!, $password:String!){
//             login(login:$login, password:$password)} `,
//         { login, password },
//       ),
//     ),
//   )
//   if (token) {
//     await dispatch(actionAuthLogin(token))
//   }
// }

export const actionRegister = (login, password) =>
  actionPromise(
    'register',
    gql(
      `mutation register($login: String!, $password: String!) {
        createUser (login: $login, password: $password) {
                  _id login
                }
              }`,
      { login: login, password: password },
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
export const actionFullRegister = (login, password) => async (dispatch) => {
  let tokenCheck = await dispatch(actionRegister(login, password))
  if (tokenCheck?.login === login) {
    await dispatch(actionFullLogin(login, password))
    history.push('/feed')
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

export const uploadFileType = {
  name: 'photo',
  action: `/upload`,
  headers: localStorage.authToken
    ? { Authorization: 'Bearer ' + localStorage.authToken }
    : {},
}
export const actionUploadFile = (file) =>
  actionPromise('uploadFile', uploadFile(file))

export const actionClearPromise = (name) => (dispatch) => {
  return dispatch(actionClearPromiseForName(name))
}
export const actionClearPromiseForName = (name) => ({
  type: 'PROMISE_CLEAR',
  name,
})
export const actionAllClearPromise = () => ({
  type: 'PROMISE_All_CLEAR',
})

export const actionUploadFiles = (files) =>
  actionPromise(
    'uploadFiles',
    Promise.all(files.map((file) => uploadFile(file))),
  )

export const actionAvatar = (imageId, myId) =>
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
      { imageId, userId: myId },
    ),
  )

export const actionPostUpsert = (post, _id) => async (dispatch) => {
  await dispatch(
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
            _id: _id,
            images: post.images.map(({ _id }) => ({ _id })),
          },
        },
      ),
    ),
  )
}

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
            limit: [300],
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

// export const actionAllPostsFeed = () =>
//   actionPromise(
//     'postsAllFeed',
//     gql(
//       ` query allPosts($_id:String){
//                 PostFind(query:$_id){
//                   owner{_id login avatar{_id url}}
//                    _id title text images{_id url}
//                    likes{
//                     _id
//                     owner{
//                        _id login avatar {_id url}
//                       }
//                 }
//                 comments{
//                   _id, createdAt, text  owner{_id login avatar{_id url}}
//                   answers{
//                     _id, createdAt, text owner{_id login  avatar{_id url}}

//                   }

//                 }
//               }
//             }`,
//       {
//         _id: JSON.stringify([
//           {},
//           {
//             sort: [{ _id: -1 }],
//             skip: [0],
//             limit: [10],
//           },
//         ]),
//       },
//     ),
//   )

export const actionOnePost = (_id) =>
  actionPromise(
    'onePost',
    gql(
      `query OneFind($post:String){
        PostFindOne(query:$post){
       _id title text images{_id url}
       owner{_id login avatar{_id url}}
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
     }

      `,
      {
        post: JSON.stringify([{ _id }]),
      },
    ),
  )

export const actionFindLikes = (_id) => async (dispatch) => {
  await dispatch(
    actionPromise(
      'onePostFindLike',
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

export const actionAddLike = (postId) =>
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
  )

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
export const actionDeleteLike = (likeId, postId) =>
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
  )

export const actionSetAvatar = (file, myId) => async (dispatch) => {
  const avatar = await dispatch(actionAvatar(file, myId))
  if (avatar) {
    await dispatch(actionFullProfilePageUser(myId))
    await dispatch(actionFullProfilePage(myId))
    await dispatch(actionClearPromise('setAvatar'))
    await dispatch(actionClearPromise('uploadFile'))
  }
}

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

export const actionFullAllGetPosts = () => ({
  type:"FEED_POSTS"
})

export const actionFullExplorePosts = () => async (dispatch, getState) => {
  const {
    explore: { explorePosts, explorePostsCount },
    promise,
  } = getState()
  console.log('explorePosts', explorePosts)

  if (explorePosts?.length !== (explorePostsCount ? explorePostsCount : 1)) {
    console.log('explorePosts', explorePosts)

    const newPosts = await dispatch(actionExplorePosts(explorePosts?.length))

    console.log('newPosts', newPosts)

    const newPostsExploreCount = await dispatch(actionExplorePostsCount())
    if (newPostsExploreCount && newPosts)
      await dispatch(actionExploreType(newPosts, newPostsExploreCount))

    // if (promise?.explorePosts?.status == 'PENDING')
    //   await dispatch(actionClearExplorePosts())
  }
}

export const actionPostsFeedCount = (myFollowing) =>
  actionPromise(
    'postsFeedCount',
    gql(
      ` query CountAllPostsUser($_id:String!){
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

export const actionExplorePosts = (skip) =>
  actionPromise(
    'explorePosts',
    gql(
      ` query PostsFeed($_id:String){
        PostFind(query:$_id){
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
        _id: JSON.stringify([
          {},
          {
            sort: [{ _id: -1 }],
            skip: [skip || 0],
            limit: [12],
          },
        ]),
      },
    ),
  )
export const actionExplorePostsCount = () =>
  actionPromise(
    'explorePostsCount',
    gql(
      ` query CountAllPosts($_id:String!){
                PostCount(query:$_id)

                }`,

      {
        _id: JSON.stringify([{}]),
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

export const actionUserUpsert = (user, myId) =>
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
          _id: myId,
          login: user?.login,
          nick : user?.nick
        },
      },
    ),
  )

// export con
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
       owner{_id} _id title text images{_id url}
}
}`,
      {
        userId: JSON.stringify([
          { ___owner: userId },

          {
            sort: [{ _id: -1 }],
            skip: [skip || 0],
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
          following: [...(oldFollowing || []), { _id: followId }],
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
          following: oldFollowing || [],
        },
      },
    ),
  )

export const actionFullSubscribe = (my_Id, followId) => async (
  dispatch,
  getState,
) => {
  const oldFollowing = (
    getState().promise.aboutMe?.payload?.following || []
  ).map(({ _id }) => ({ _id }))
  let followingId = await dispatch(
    actionSubscribe(my_Id, followId, oldFollowing),
  )
  if (followingId) {
    Promise.all([
      await dispatch(actionFullProfilePageUser(followId)),
      await dispatch(actionFullProfilePage(my_Id)),
    ])
    await dispatch(actionClearFeedPosts())
  }
}

export const actionFullUnSubscribe = (my_Id, followId) => async (
  dispatch,
  getState,
) => {
  const oldFollowing = (getState().promise.aboutMe?.payload?.following || [])
    .filter((item) => item._id !== followId)
    .map(({ _id }) => ({ _id }))
  if (oldFollowing) {
    await dispatch(actionUnSubscribe(my_Id, oldFollowing))
    Promise.all([
      await dispatch(actionFullProfilePageUser(followId)),
      await dispatch(actionFullProfilePage(my_Id)),
    ])
    await dispatch(actionClearFeedPosts())
  }
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

export const actionAddFullLikeForFeed = (postId) => async (
  dispatch,
  getState,
) => {
  await dispatch(actionAddLike(postId))
  const {
    promise: {
      addLike: { status },
    },
  } = getState()
  if (status === 'FULFILLED') {
    await dispatch(actionOnePost(postId))
    await dispatch(actionFullAllGetPosts())
  }
  //  await dispatch(actionOnePost(postId));
}
export const actionDeleteFullLikeForFeed = (likeId, postId) => async (
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
    await dispatch(actionFullAllGetPosts())
  }
  //  await dispatch(actionOnePost(postId));
}

export const actionUserUpdate = (user, myId) => async (dispatch, getState) => {
  await dispatch(actionUserUpsert(user, myId))
  const {
    promise: {
      userUpsert: { status },
    },
  } = getState()
  if (status === 'FULFILLED') {
    await dispatch(actionFullProfilePage(myId))
    await dispatch(actionFullProfilePageUser(myId))
  }
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
