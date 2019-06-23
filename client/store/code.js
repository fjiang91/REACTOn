import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_CODE = 'SET_CODE'

/**
 * INITIAL STATE
 */
const defaultCode = '//Please Choose A Problem'

/**
 * ACTION CREATORS
 */
export const setCode = code => ({type: SET_CODE, code})

export const setCodeThunk = code => async dispatch => {
  try {
    dispatch(setCode(code))
  } catch (error) {
    console.error('TCL: error', error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultCode, action) {
  switch (action.type) {
    case SET_CODE:
      return action.code
    default:
      return state
  }
}
