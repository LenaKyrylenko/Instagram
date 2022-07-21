
export const myProfileReducer = (state = {}, { type, aboutMe, newResult }) => {
    const types = {
      'PROFILE-PAGE': () => {
        return {
          ...state,
          aboutMe,
        }
      },
      'REMOVE-DATA': () => {
        return {
          aboutMe: {},
        }
      },
      'UPDATE_FOLLOWING': () => {
        return {
          ...state,
          aboutMe: ({ ...state.aboutMe, following: [...newResult] })

        }
      },
      'UPDATE_AVATAR': () => {
        return {
          ...state,
          aboutMe: ({
            ...state.aboutMe,
            avatar: { ...newResult }
          })

        }
      },
    }
    if (type in types) {
      return types[type]()
    }
    return state
  }
