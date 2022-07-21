export function authReducer(state, { type, token }) {
  if (state === undefined && localStorage.authToken) {
    token = localStorage.authToken
    type = 'AUTH_LOGIN'
  }
  if (type === 'AUTH_LOGIN') {
    if (jwtDecode(token)) {
      localStorage.authToken = token
      return { token, payload: jwtDecode(token) }
    }
  }
  if (type === 'AUTH_LOGOUT') {
    localStorage.authToken = ''
    return {}
  }
  return state || {}
}

const jwtDecode = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (e) {
    return null
  }
}
