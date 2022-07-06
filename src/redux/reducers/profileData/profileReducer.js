
export const profileReducer = (state = {}, { type, aboutMe, newResult }) => {
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
  
  