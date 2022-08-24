
export const searchReducer = (state = {}, { type, searchUser}) => {
    const types = {
        'SEARCH': () => {
            return {
                ...state,
                searchUser,
            }
        },
        'CLEAR_SEARCH': () => {
            return {
                searchUser: {},
            }
        },
    }
    if (type in types) {
      return types[type]()
    }
    return state
  }
