const buildState = (state, action) => {
  let data = { ...action }
  delete data.type
  const reduction = data.reducer ? data.reducer(state, data) : data
  if (Array.isArray(reduction)) {
    return reduction
  } else {
    return { ...state, ...reduction }
  }
}

export default function (type, defaultState, hook) {
  const handle = (state = defaultState, action) => {
    if (action.type === type) {
      const newState = buildState(state, action)
      return hook ? hook(newState, action) : newState
    }

    return state
  }

  return handle
}
