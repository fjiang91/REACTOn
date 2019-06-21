import React from 'react'
import {CodeEditor, Mic} from './'
import twoSumWorker from './twoSumWorker'
import targetSumWorker from './targetSumWorker'
import WebWorker from './WebWorker'

class MainApp extends React.Component {
  constructor() {
    super()
    this.state = {
      code: '//Please Choose A Problem',
      worker: '',
      result: ''
    }
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

  onChange = newValue => {
    this.setState({code: newValue})
  }

  render() {
    return (
      <div className="row">
        <div className="col s2">
          List of Problems
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
          </ul>
        </div>
        <div className="col s7">
          <CodeEditor
            handleOnChange={this.onChange}
            handleOnRun={this.handleOnRun}
            code={this.state.code}
          />
          <div className="row">
            {/* <div className="col s11">Recording: <Mic /></div> */}
            <div className="col s1">
              <button
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
                onClick={this.handleOnRun}
              >
                Run
              </button>
            </div>
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
        <div className="col s3">Message Area</div>
      </div>
    )
  }
}

export default MainApp
