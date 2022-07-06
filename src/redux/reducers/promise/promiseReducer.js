export function promiseReducer(state = {}, { type, name, status, payload, error }) {
 
    if (type === 'PROMISE') {
      return {
        ...state,
        [name]: { status, payload, error },
      }
    }
    if (type === 'PROMISE_CLEAR') {
      return {
        ...state,
        [name]: null,
      }
  }
  if (type === 'PROMISE_All_CLEAR') {
    return {
      state:null
     
    }
  }
    return state
  }
  