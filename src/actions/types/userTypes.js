export const actionAvatarUpdateType = (aboutUser) => ({
  type: 'CHANGE-AVATAR-USER',
  aboutUser,
})
export const actionProfilePageDataUserType = (aboutUser) => ({
  type: 'PROFILE-PAGE-USER',
  aboutUser,
})

export const actionProfilePageData = (id) => ({ type: 'DATA_PROFILE', id })

export const actionClearDataUserType = () => ({ type: 'CLEAR-DATA' })
