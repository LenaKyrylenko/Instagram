
export const userProfileReducer = (
    state = {},
    { type, aboutUser, allPosts, newPosts,newResult, newPostsCount, countPosts },
  ) => {
    const types = {
      'PROFILE-PAGE-USER': () => {
        return {
          ...state,
          aboutUser,
        }
      },

      'USER-POSTS': () => {
        return {
          ...state,
          allPosts,
        }
      },
      'ADD-USER-POSTS': () => {
        return {
          ...state,
          allPosts: state?.allPosts ? [...state.allPosts, ...newPosts] : [...newPosts],
          countPosts: countPosts ? countPosts : newPostsCount
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
      'CLEAR_ALL_POSTS': () => {
        
        return {
          ...state,
          allPosts:[]
        }
      },
      'COUNT_ALL_POSTS': () => {
        
        return {
          ...state,
          countPosts: countPosts ? countPosts : state.countPosts

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
export const actionClearAllPostsType= () =>
  ({ type: 'CLEAR_ALL_POSTS' })

export const actionClearDataUserType = () =>
  ({ type: 'CLEAR-DATA' })
  
  export const actionChangeFollowersType = (newResult) => ({
    type:"UPDATE_FOLLOWERS", newResult
  })
  export const actionPostsType = (newPosts, newPostsCount) => 
  ({ type: 'ADD-USER-POSTS', newPosts, newPostsCount })
  
  export const actionPostsPortionTypeSaga = (_id) => 
  ({ type: 'USER_POSTS_PORTION', _id})