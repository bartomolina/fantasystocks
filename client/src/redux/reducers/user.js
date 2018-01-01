import axios from 'axios'

const LOAD = 'user/LOAD'

const initialState = {
  user: {}
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return action.user
    default:
      return state
  }
}

export function loadUser(user) {
  return { type: LOAD, user }
}

export function getUser() {
  return dispatch => {
    axios
      .get('/api/auth/me')
      .then(res => res.data)
      .then(user => dispatch(loadUser(user)))
  }
}
