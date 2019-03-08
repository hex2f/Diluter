import { connect } from 'react-redux'

export const FilterObjectKeys = (obj, predicate) =>
  Object.keys(obj)
    .filter(key => predicate(key))
    .reduce((res, key) => (res[key] = obj[key], res), {}) // eslint-disable-line

export default function (Component, States = [], Actions = []) {
  const mapStateToProps = state => {
    const states = FilterObjectKeys(state, (key) => States.indexOf(key) > -1) || {}
    return states
  }
  const mapDispatchToProps = dispatch => {
    let actionMap = {}
    Actions.forEach(action => {
      actionMap[action.name] = (...args) => dispatch(action(...args))
    })
    return actionMap
  }

  const connected = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Component)

  return connected
}
