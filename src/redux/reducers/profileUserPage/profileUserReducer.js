
export const profileUserReducer = (
    state = {},
    { type, aboutUser, allPosts, newPosts, countPosts },
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
      'COUNT_ALL_POSTS': () => {
        
        return {
          ...state,
          countPosts
        }
      }
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
export const actionCountPostsType = (countPosts) =>
  ({ type: "COUNT_ALL_POSTS", countPosts })
  
export const actionProfilePageData = (id) => 
({ type: 'DATA_PROFILE', id })


export const actionClearDataUserType = () =>
  ({ type: 'CLEAR-DATA' })
  



