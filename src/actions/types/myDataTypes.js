export const actionProfilePageDataType = (aboutMe) => ({
  type: 'PROFILE-PAGE',
  aboutMe,
})

export const actionClearAboutMeType = () => ({ type: 'REMOVE-DATA' })

export const actionUpdateAvatarType = (newResult) => ({
  type: 'UPDATE_AVATAR',
  newResult,
})
