import React from 'react'
import brace, {RenderLoop} from 'brace'
import AceEditor from 'react-ace'
import 'brace/ext/language_tools'
import 'brace/mode/javascript'
import 'brace/theme/solarized_dark'
import db from '../../server/firebase/init'
import {connect} from 'react-redux'
import {setCodeThunk} from '../store/code'
import {setResultThunk} from '../store/result'

class CodeEditor extends React.Component {
  constructor(props) {
    super(props)
    this.room = db.collection('room')
  }

  componentDidMount = async () => {
    await this.room.doc(this.props.room).onSnapshot(doc => {
      const data = doc.data() ? doc.data().code : '//Please Choose A Problem'
      const result = doc.data().result
        ? doc.data().result
        : 'Please Run To See Result'
      this.props.setCode(data)
      this.props.setResult(result)
    })
  }

  onChange = async newValue => {
    await this.room.doc(this.props.room).set({
      code: newValue
    })
  }

  render() {
    return (
      <div>
        <AceEditor
          mode="javascript"
          theme="solarized_dark"
          onChange={this.onChange}
          value={this.props.code}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{$blockScrolling: true}}
          enableLiveAutocompletion={true}
          enableBasicAutocompletion={true}
          defaultValue={this.props.code}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          wrapEnabled={true}
          width="100%"
          height="400px"
        />
      </div>
    )
  }
}

const mapState = state => {
  return {
    room: state.room,
    code: state.code
  }
}

const mapDispatch = dispatch => {
  return {
    setCode: code => dispatch(setCodeThunk(code)),
    setResult: result => dispatch(setResultThunk(result))
  }
}

export default connect(mapState, mapDispatch)(CodeEditor)
