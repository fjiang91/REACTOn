import React from 'react'
import brace, {RenderLoop} from 'brace'
import AceEditor from 'react-ace'
import 'brace/ext/language_tools'
import 'brace/mode/javascript'
import 'brace/theme/solarized_dark'
import db from '../../server/firebase/init'
import {connect} from 'react-redux'

class CodeEditor extends React.Component {
  constructor(props) {
    super(props)
    this.room = db.collection('room')
    this.state = {
      code: '//Please Choose A Problem'
    }
  }

  componentDidMount = async () => {
    await this.room.doc(this.props.room).onSnapshot(doc => {
      const data = doc.data() ? doc.data().code : '//Please Choose A Problem'
      this.setState({
        code: data
      })
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
          value={this.state.code}
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
    room: state.room
  }
}

export default connect(mapState)(CodeEditor)
