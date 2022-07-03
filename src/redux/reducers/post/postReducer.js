import {actionOnePost} from '../../../actions'
export const postReducer = (
    state = {},
    { skip, type, newPosts = [], onePost, postsFeed, postsFeedCount },
  ) => {
    const types = {
      'ONE-POST': () => {
        return {
          ...state,
          onePost,
        }
      },
      'CLEAR-POST-ONE': () => {
        return {
          ...state,
          onePost: {},
        }
      },
    }
    if (type in types) {
      return types[type]()
    }
    return state
  }


  //type
  export const actionOnePostType = (onePost) => ({ type: 'ONE-POST', onePost })
  export const actionClearPostsOne = () => ({ type: 'CLEAR-POST-ONE' })
 
   //one post
   export const actionFullOnePost = (_id) => async (dispatch) => {
    const onePost = await dispatch(actionOnePost(_id))
    if (onePost) {
      await dispatch(actionOnePostType(onePost))
      // await dispatch(actionClearDataUserType())
    }
  
  }