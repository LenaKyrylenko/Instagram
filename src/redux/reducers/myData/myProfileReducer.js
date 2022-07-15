
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
    }
    if (type in types) {
      return types[type]()
    }
    return state
  }
    //type
    export const actionProfilePageDataType = (aboutMe) => ({
      type: 'PROFILE-PAGE',
      aboutMe,
    })
    

  
  export const actionRemoveDataAboutMe = () => 
  ({ type: 'REMOVE-DATA' })
  
  export const actionChangeFollowingType = (newResult) => ({
    type:"UPDATE_FOLLOWING", newResult
    
  })