import * as store from '../../redux'

export function loginDispatcher(dispatch) {
  return {
    getUser: () => {
      console.log('getting user')
      dispatch(store.getUser())
    }
  }
}
