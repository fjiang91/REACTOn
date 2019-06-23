import React from 'react'

class ProblemList extends React.Component {
  constructor() {
    super()
    this.state = {
      problems: ['twoSum', 'targetSum']
    }
  }
  render() {
    return (
      <div>
        <h6>Problem Sets:</h6>
        <ul>
          {this.state.problems.map((problem, index) => (
            <li key={index}>
              <button
                name={problem}
                type="submit"
                onClick={this.props.handleChangeProblem}
              >
                {problem}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default ProblemList
