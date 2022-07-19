import { PlusOutlined } from '@ant-design/icons'
import { actionOnePost } from '../../actions'

const addAnswers = (comments, id, newResult, field) =>
comments.map(comment => {
    if (comment._id === id) {
        return { ...comment, [field]: newResult }
    } else if (comment?.answers?.length) {
        return {
            ...comment,
            answers: addAnswers(comment.answers, id, newResult, field)
        }
    } else {
        return { ...comment }
    }
})




export const postReducer = (
    state = {},
    { skip, type, newPosts = [], onePost,newResult, commentId, answers,postsFeed, postsFeedCount },
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
          commentId, newResult, 'answers')
      }),
    })
  
  }
    if (type in types) {
      return types[type]()
    }
    return state
}
  