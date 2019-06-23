import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_ROOM = 'SET_ROOM'

/**
 * INITIAL STATE
 */
const defaultRoom = ''

/**
 * ACTION CREATORS
 */
export const setRoom = roomId => ({type: SET_ROOM, roomId})

export const setRoomThunk = roomId => async dispatch => {
  try {
    dispatch(setRoom(roomId))
  } catch (error) {
    console.error('TCL: error', error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultRoom, action) {
  switch (action.type) {
    case SET_ROOM:
      return action.roomId
    default:
      return state
  }
}
