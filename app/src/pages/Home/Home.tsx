
import { Editor, EditorState } from "draft-js";
import React from "react";
import "./draft.css";
export const runtime = "edge";
export default function IndexPage() {
  const [editorState, setEditorState] = React.useState(() => {
    return EditorState.createEmpty();
  });

  const editor = React.useRef<Editor>(null);
  function focusEditor() {
    if (editor.current) {
      editor.current.focus();
    }
  }
  const onChange = (value: any) => {
    console.log(value);
    // console.log(editor.current.);
    
    setEditorState(value);
  };
  return (
    <div
      style={{ border: "1px solid black", minHeight: "6em", cursor: "text" }}
      onClick={focusEditor}
    >
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={onChange}
        placeholder="Write something!"
      />
    </div>
  );
}
