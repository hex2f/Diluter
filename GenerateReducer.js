export default function (type, defaultState, actionOverrides) {
  const handle = (state = defaultState, action) => {
    if (action.type === type) {
      return action.reducer ? { ...state, ...action.reducer(state, action) } : { ...state, ...action }
    }

    return state
  }

  return handle
}
