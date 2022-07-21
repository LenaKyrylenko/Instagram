export const actionProfilePageDataType = (aboutMe) => ({
    type: 'PROFILE-PAGE',
    aboutMe,
  })

export const actionClearAboutMeType = () => 
({ type: 'REMOVE-DATA' })

export const actionChangeFollowingType = (newResult) => ({
  type:"UPDATE_FOLLOWING", newResult
})

export const actionUpdateAvatarType= (newResult) => ({
type:"UPDATE_AVATAR", newResult
})