import { PlusOutlined } from '@ant-design/icons'
import { actionOnePost } from '../../actions'

const addAnswers = (comments, commentId, newResult) =>
comments.map(comment => {
  if (comment._id === commentId)
  {
        return { ...comment, 'answers': newResult }
  }
  else if (comment?.answers?.length) {
        return {
            ...comment,
            answers: addAnswers(comment.answers, commentId, newResult)
        }
  }
  else {
        return { ...comment }
  }
  
})

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
  