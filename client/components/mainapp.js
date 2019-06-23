import React from 'react'
import {CodeEditor, Mic} from './'
import twoSumWorker from './twoSumWorker'
import targetSumWorker from './targetSumWorker'
import WebWorker from './WebWorker'
import ChatRoom from './ChatRoom'
import ProblemList from './problemList'
import {connect} from 'react-redux'
import {setRoomThunk} from '../store/room'
import db from '../../server/firebase/init'

class MainApp extends React.Component {
  constructor() {
    super()
    this.room = db.collection('room')
    this.state = {
      worker: twoSumWorker
    }
  }

  componentDidMount = () => {
    this.props.setRoom(this.props.match.params.roomId)
  }

  handleOnRun = () => {
    this.worker = new WebWorker(this.state.worker)
    this.worker.addEventListener('message', async e => {
      await this.room.doc(this.props.room).set({
        result: e.data + ''
      })
    })
    this.worker.postMessage({code: this.props.code})
    //Terminate worker after 10s
    setTimeout(() => this.worker.terminate(), 10000)
  }

  handleChangeProblem = async e => {
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

    await this.room.doc(this.props.room).set({
      code: newCode
    })

    this.setState({
      worker: newWorker
    })
  }

  render() {
    return (
      <div className="row">
        <div className="col s2">
          <ProblemList handleChangeProblem={this.handleChangeProblem} />
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
              value={this.props.result}
              id="disabled"
              type="text"
              className="validate"
            />
          </div>
        </div>
        <div className="col s4">{this.props.room.length && <ChatRoom />}</div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    room: state.room,
    code: state.code,
    result: state.result
  }
}

const mapDispatch = dispatch => {
  return {
    setRoom: roomId => dispatch(setRoomThunk(roomId))
  }
}

export default connect(mapState, mapDispatch)(MainApp)
