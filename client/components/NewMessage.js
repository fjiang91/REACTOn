import React from 'react'
import db from '../../server/firebase/init'
import {connect} from 'react-redux'

class NewMessage extends React.Component {
  constructor() {
    super()
    this.room = db.collection('room')
    this.state = {
      newMessage: ''
    }
  }

  handleChangeInput = e => {
    this.setState({
      newMessage: e.target.value
    })
  }

  addMessage = async e => {
    e.preventDefault()
    const newMsg = {
      name: this.props.username,
      message: this.state.newMessage,
      timestamp: Date.now()
    }

    await this.room
      .doc(this.props.room)
      .collection('messages')
      .add(newMsg)
    this.setState({
      newMessage: ''
    })
  }

  render() {
    return (
      <div className="new-message">
        <form onSubmit={this.addMessage}>
          <label htmlFor="newMessage">New Message (Enter)</label>
          <input
            type="text"
            name="newMessage"
            onChange={this.handleChangeInput}
            value={this.state.newMessage}
          />
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    username: state.username,
    room: state.room
  }
}

export default connect(mapState)(NewMessage)
