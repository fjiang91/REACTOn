import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {setUserNameThunk} from '../store/username'
import {setRoomThunk} from '../store/room'
import db from '../../server/firebase/init'
import history from '../history'

class Welcome extends React.Component {
  state = {
    roomAction: ''
  }

  handleChangeName = e => {
    e.preventDefault()
    const {roomAction} = this.state
    let room = ''
    this.props.setUserName(e.target.name.value)
    if (roomAction === 'create') {
      room = db.collection('chatroom').doc()
    } else if (roomAction === 'join') {
      let joinRoomId = e.target.roomId.value
      room = db.collection('chatroom').doc(joinRoomId)
    } else {
      console.log('solo action')
    }
    history.push(`/room/${room.id}`)
  }

  handleChangeRoom = e => {
    this.setState({
      roomAction: e.target.name
    })
  }

  render() {
    return (
      <form className="container welcome col" onSubmit={this.handleChangeName}>
        <div className="row">
          <div className="col s12">
            <div className="input-field col s6">
              <input
                placeholder="Enter Your Name"
                id="name"
                type="text"
                name="name"
                className="validate center"
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="input-field col s6">
              <input
                placeholder="Enter Room ID To Join"
                id="roomId"
                type="text"
                name="roomId"
                className="validate center"
              />
              <label htmlFor="roomId">Room ID</label>
            </div>
          </div>

          <div className="col s12 btns">
            <button
              type="submit"
              name="solo"
              className="waves-effect waves-light btn-large"
              onClick={this.handleChangeRoom}
            >
              <i className="material-icons right">cloud</i>Solo Exercise
            </button>
            <button
              type="submit"
              name="create"
              className="waves-effect waves-light btn-large"
              onClick={this.handleChangeRoom}
            >
              <i className="material-icons right">cloud</i>Create Room
            </button>
            <button
              type="submit"
              name="join"
              className="waves-effect waves-light btn-large"
              onClick={this.handleChangeRoom}
            >
              <i className="material-icons right">cloud</i>Join Room
            </button>
          </div>
        </div>
      </form>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    setUserName: username => dispatch(setUserNameThunk(username)),
    setRoom: roomId => dispatch(setRoomThunk(roomId))
  }
}

export default connect(null, mapDispatch)(Welcome)
