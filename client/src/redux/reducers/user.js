import axios from 'axios'

const LOAD = 'auth/LOAD'

const initialState = {
  loaded: false
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      }
  }
}

export function loadUser() {
  return { type: LOAD }
}

export function getUser() {
  return dispatch => axios.get()
}
