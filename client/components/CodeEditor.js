import React from 'react'
import brace, {RenderLoop} from 'brace'
import AceEditor from 'react-ace'
import 'brace/ext/language_tools'
import 'brace/mode/javascript'
import 'brace/theme/solarized_dark'

const CodeEditor = props => {
  return (
    <div>
      <AceEditor
        mode="javascript"
        theme="solarized_dark"
        onChange={props.handleOnChange}
        value={props.code}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{$blockScrolling: true}}
        enableLiveAutocompletion={true}
        enableBasicAutocompletion={true}
        defaultValue={props.code}
        height="400px"
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        wrapEnabled={true}
        cursorStart={2}
      />
    </div>
  )
}

export default CodeEditor
