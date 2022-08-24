export const actionSearchType = (searchUser) => ({
    type: 'SEARCH',
    searchUser,
})
export const actionSearchSaga = (searchUser) => 
({type: 'SEARCH-USERS', searchUser})
export const actionClearSearchType = () => ({ type: 'CLEAR_SEARCH' })