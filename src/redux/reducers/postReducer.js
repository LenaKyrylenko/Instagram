import { addAnswers } from "../../actions/types/commentTypes"
export const postReducer = (
    state = {},
    { type, onePost,newResult, commentId},
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
        onePost: ({ ...state?.onePost, likes: [...newResult] })
        
      }
    },
    'ADD_COMMENT': () => {
      return {
        ...state,
        onePost: ({ ...state?.onePost, comments: [...newResult] })
        
      }
    },
    'ANSWERS-COMMENT': () => ({
      ...state,
      onePost: ({
        ...state?.onePost,
        comments:  addAnswers(state.onePost.comments,
          commentId, newResult)
      }),
    })
  
  }
    if (type in types) {
      return types[type]()
    }
    return state
}
  