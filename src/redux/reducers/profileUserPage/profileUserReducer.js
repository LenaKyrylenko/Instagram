
export const profileUserReducer = (
    state = {},
    { type, aboutUser, allPosts, newPosts },
  ) => {
    const types = {
      'PROFILE-PAGE-USER': () => {
        return {
          ...state,
          aboutUser,
          allPosts,
        }
      },
      'CLEAR-DATA': () => {
        return {
          ...(state = {}),
          aboutUser: {},
          allPosts: [],
        }
      },
      'CHANGE-AVATAR-USER': () => {
        return {
          ...state,
          aboutUser,
        }
      },
    }
  
    if (type in types) {
      return types[type]()
    }
    return state
  }
  
  export const actionAvatarUpdate = (aboutUser) => ({
    type: 'CHANGE-AVATAR-USER',
    aboutUser,
})
export const actionProfilePageDataTypeUser = (aboutUser, allPosts) => ({
  type: 'PROFILE-PAGE-USER',
  aboutUser,
  allPosts,
})

export const actionProfilePageData = (id) => 
({ type: 'DATA_PROFILE', id })


export const actionClearDataUserType = () =>
  ({ type: 'CLEAR-DATA' })
  



