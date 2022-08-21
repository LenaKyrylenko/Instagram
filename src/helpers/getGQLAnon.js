import backendURL from './backendUrl'

export const getGQLAnon = (url) => (query, variables) =>
fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ query, variables }),
})
  .then((res) => res.json())
  .then((data) => {
    if (data.data) {
      return Object.values(data.data)[0]
    } else {
      throw new Error(JSON.stringify(data.errors))
    }
  })

export const gqlAnon = getGQLAnon(backendURL+'/graphql')