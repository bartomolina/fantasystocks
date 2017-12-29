import * as store from '../../redux'

export function loginDispatcher(dispatch) {
  return {
    getUser: () => {
      dispatch(store.getUser())
    }
  }
}
