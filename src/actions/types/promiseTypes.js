export const actionPending = (name) => ({
  type: 'PROMISE',
  name,
  status: 'PENDING',
})
export const actionFulfilled = (name, payload) => ({
  type: 'PROMISE',
  name,
  status: 'FULFILLED',
  payload,
})
export const actionRejected = (name, error) => ({
  type: 'PROMISE',
  name,
  status: 'REJECTED',
  error,
})
export const actionPromise = (name, promise) => ({
  type: 'PROMISE_START',
  name,
  promise,
})

export const actionClearPromiseForName = (name) => ({
  type: 'PROMISE_CLEAR',
  name,
})
export const actionAllClearPromiseType = () => ({
  type: 'PROMISE_All_CLEAR',
})
