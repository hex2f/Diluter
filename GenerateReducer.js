export default function (type, defaultState, actionOverrides) {
  const handle = (state = defaultState, action) => {
    if (action.type === type) {
      return { ...state, ...action }
    }

    return state
  }

  return handle
}
