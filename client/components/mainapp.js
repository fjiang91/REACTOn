import React from 'react'
import {CodeEditor, Mic} from './'
import twoSumWorker from './twoSumWorker'
import targetSumWorker from './targetSumWorker'
import WebWorker from './WebWorker'
import ChatRoom from './ChatRoom'
import {connect} from 'react-redux'
import {setRoomThunk} from '../store/room'

class MainApp extends React.Component {
  constructor() {
    super()
    this.state = {
      worker: '',
      result: ''
    }
  }

  componentDidMount = () => {
    this.props.setRoom(this.props.match.params.roomId)
  }

  handleOnRun = () => {
    this.worker = new WebWorker(this.state.worker)
    this.worker.addEventListener('message', e => {
      this.setState({
        result: e.data + ''
      })
    })
    this.worker.postMessage({code: this.state.code})
  }

  handleChangeProblem = e => {
    let newCode = ''
    let newWorker = ''
    switch (e.target.name) {
      case 'twoSum':
        newCode =
          '//Write a function to sum two numbers\nfunction twoSum (a,b){\n \n}'
        newWorker = twoSumWorker
        break
      case 'targetSum':
        newCode =
          '//Write a function to check if two numbers add up to a target sum\nfunction findTarget (arr, target){\n \n}'
        newWorker = targetSumWorker
        break
      default:
        break
    }
    this.setState({
      code: newCode,
      worker: newWorker
    })
  }

  render() {
    return (
      <div className="row">
        <div className="col s1">
          {/* List of Problems
          <ul>
            <li onClick={this.handleChangeProblem}>
              <button name="twoSum" type="submit">
                Two Sum
              </button>
            </li>
            <li onClick={this.handleChangeProblem}>
              <button name="targetSum" type="submit">
                Target Sum
              </button>
            </li>
          </ul> */}
        </div>
        <div className="editor col s6">
          <div className="row">{this.props.room.length && <CodeEditor />}</div>
          <div className="row">
            {/* <div className="col s11">Recording: <Mic /></div> */}
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
              onClick={this.handleOnRun}
            >
              Run
            </button>
          </div>
          <div />
          <div className="row">
            <label htmlFor="disabled">Result: </label>
            <input
              disabled
              value={this.state.result}
              id="disabled"
              type="text"
              className="validate"
            />
          </div>
        </div>
        <div className="col s5">{this.props.room.length && <ChatRoom />}</div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    room: state.room
  }
}

const mapDispatch = dispatch => {
  return {
    setRoom: roomId => dispatch(setRoomThunk(roomId))
  }
}

export default connect(mapState, mapDispatch)(MainApp)
