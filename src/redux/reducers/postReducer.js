import {actionOnePost} from '../../actions'
export const postReducer = (
    state = {},
    { skip, type, newPosts = [], onePost,newResult, postsFeed, postsFeedCount },
  ) => {
    const types = {
      'POST': () => {
        return {
          ...state,
          onePost,
        }
      },
      'CLEAR_ONE_POST': () => {
        return {
          ...state,
          onePost: {},
        }
      },
      'CHANGE_LIKE': () => {
        return {
          ...state,
        onePost: ({...state?.onePost, likes: [...newResult] })
        
      }
      },
      'ADD_COMMENT': () => {
        return {
          ...state,
        onePost: ({...state?.onePost, comments: [...newResult] })
        
      }
      }
  }
  
    if (type in types) {
      return types[type]()
    }
    return state
  }