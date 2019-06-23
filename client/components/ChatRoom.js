import React from 'react'
import NewMessage from './NewMessage'
import db from '../../server/firebase/init'
import {connect} from 'react-redux'

class ChatRoom extends React.Component {
  constructor() {
    super()
    this.room = db.collection('room')
    this.state = {
      msgs: []
    }
  }

  componentDidMount = async () => {
    await this.room
      .doc(this.props.room)
      .collection('messages')
      .onSnapshot(qSnapShot => {
        let msg = []
        qSnapShot.forEach(doc => {
          msg.push(doc.data())
        })
        this.setState({
          msgs: msg.sort((a, b) => a.timestamp - b.timestamp)
        })
      })
  }

  render() {
    const {username, room} = this.props
    const {msgs} = this.state
    return (
      <div className="card-content">
        <div className="chat">
          <h2 className="center teal-text roomHeader">
            Welcome {username}, Room: {room}
          </h2>
          <div className="card">
            <div className="card-content">
              <ul className="messages">
                {msgs.map((msg, index) => (
                  <li key={index}>
                    <span className="teal-text">{msg.name}: </span>
                    <span className="grey-text text-darken-3">
                      {msg.message}
                    </span>
                    <span className="grey-text time">{msg.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-action">
              <NewMessage name={name} />
            </div>
          </div>
        </div>
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

export default connect(mapState)(ChatRoom)
