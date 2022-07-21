export const actionUserUpdateTypeSaga = (user) => ({
  type: 'USER_UPDATE',
  user,
})
export const actionSetAvatarTypeSaga = (file) => ({
  type: 'SET_AVATAR',
  file,
})
export const actionFullProfilePageTypeSaga = () => ({
  type: 'FULLPROFILE_PAGE',
})
