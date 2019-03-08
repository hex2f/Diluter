# Diluter
An automatic Redux reducer, taking the pain out of Redux.
___
## Install
```
npm i --save Diluter
```

## Usage
### Create a Store
```js
import Diluter from 'Diluter'

const defaultState = {
  USER: { name: '', id: 0 },
  FRIENDS: []
}

const store = Diluter(defaultStore)
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'))
```

### Connect a Component
```js
import { Connector } from 'Diluter'

class App extends Component {
  render() {
    return (
      <div>
        Hello {this.props.USER.name}!
        You have {this.props.FRIENDS.length} friends.
      </div>
    )
  }
}

// Connector takes 3 arguments:
// 1. The React Component
// 2. The keys of the store to pass as props
// 3. Actions to be mapped with dispatch as props
export default Connector(App, ['USER', 'FRIENDS'], [])
```

### Dispatching an Action
```js
const setUserName = name => dispatch => {
  dispatch({
    type: 'USER', // The key to target in the store
    name // Automatically apply the name to the "USER" object
  })
}

class SetName extends Component {
  render() {
    return (
      <div>
        Please choose a new name.
        <input
          placeholder={'John Doe'}
          value={this.props.USER.name}
          onChange={e => this.props.setUserName(e.target.value)}
        />
      </div>
    )
  }
}

// "setUserName" needs to recieve a dispatch function to
// dispatch changes to the store. This is automatically
// mapped to all functions passed in the 3rd argument,
// after which they're passed to the component via props.
export default Connector(SetName, ['USER'], [setUserName])
```

### Action with Custom Reducer
```js
// In this case, friend is an object containing
// arbitrary data about the user. Not 
const addFriend = friend => dispatch => {
  dispatch({
    type: 'FRIENDS',
    reducer: (state) => {
      // This function will determine the new state
      // of the "FRIENDS" object in the store instead
      // of the usual automatic reducer built into Diluter.

      // Append the friend object to the store (FREINDS object)
      return [...state, friend]
    }
  })
}
```

### Hook into the Reducer
```js
// The hook allows you to modify reductions after the
// normal reducer but before it gets applied to the store.
const hook = (newState, action) => {
  // Set a value with the key "lastAction" containing
  // the action in the store before applying it.
  return { ...newState, lastAction: action }
}
const store = Diluter(defaultState, hook)
```