import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_USERNAME = 'SET_USERNAME'

/**
 * INITIAL STATE
 */
const defaultUser = ''

/**
 * ACTION CREATORS
 */
export const setUserName = username => ({type: SET_USERNAME, username})

export const setUserNameThunk = username => async dispatch => {
  try {
    dispatch(setUserName(username))
  } catch (error) {
    console.error('TCL: error', error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case SET_USERNAME:
      return action.username
    default:
      return state
  }
}
