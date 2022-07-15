
export const userProfileReducer = (
    state = {},
    { type, aboutUser, allPosts, newPosts,newResult, countPosts },
  ) => {
    const types = {
      'PROFILE-PAGE-USER': () => {
        return {
          ...state,
          aboutUser,
          // allPosts,
        }
      },
      'USER-POSTS': () => {
        return {
          ...state,
          allPosts,
          // allPosts,
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
      },
      'UPDATE_FOLLOWERS': () => {
        return {
          ...state,
          aboutUser: ({
            ...state.aboutUser,
            followers: [...newResult]
          })
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
export const actionProfilePageDataTypeUser = (aboutUser) => ({
  type: 'PROFILE-PAGE-USER',
  aboutUser})
export const actionCountPostsType = (countPosts) =>
  ({ type: "COUNT_ALL_POSTS", countPosts })
  
export const actionProfilePageData = (id) => 
({ type: 'DATA_PROFILE', id })

export const actionUserAllPostsType = (allPosts) => 
({ type: 'USER-POSTS', allPosts })


export const actionClearDataUserType = () =>
  ({ type: 'CLEAR-DATA' })
  
  export const actionChangeFollowersType = (newResult) => ({
    type:"UPDATE_FOLLOWERS", newResult
  })



