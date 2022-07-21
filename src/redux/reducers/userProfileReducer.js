export const userProfileReducer = (
  state = {},
  { type, aboutUser, allPosts, newPosts, newResult, newPostsCount, countPosts },
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
        allPosts: state?.allPosts
          ? [...state.allPosts, ...newPosts]
          : [...newPosts],
        countPosts: countPosts ? countPosts : newPostsCount,
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
        allPosts: [],
      }
    },
    'COUNT_ALL_POSTS': () => {
      return {
        ...state,
        countPosts: countPosts ? countPosts : state.countPosts,
      }
    },
    'UPDATE_FOLLOWERS': () => {
      return {
        ...state,
        aboutUser: {
          ...state.aboutUser,
          followers: [...newResult],
        },
      }
    },
  }

  if (type in types) {
    return types[type]()
  }
  return state
}
