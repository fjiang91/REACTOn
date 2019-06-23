import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_RESULT = 'SET_RESULT'

/**
 * INITIAL STATE
 */
const defaultResult = 'Please Run To See Result'

/**
 * ACTION CREATORS
 */
export const setResult = result => ({type: SET_RESULT, result})

export const setResultThunk = result => async dispatch => {
  try {
    dispatch(setResult(result))
  } catch (error) {
    console.error('TCL: error', error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultResult, action) {
  switch (action.type) {
    case SET_RESULT:
      return action.result
    default:
      return state
  }
}
