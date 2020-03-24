import React, { useEffect, useState, useRef } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import './richtext.css';

const AddProduct = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const editor = useRef(null);
  const focusEditor = () => {
    editor.current.focus();
  };

  useEffect(() => {
    focusEditor();
  }, []);

  const onChange = d => {
    setEditorState(d);
  };

  const onUnderlineClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };

  const onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const onItalicClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  const onSubmit = () => {
    console.log('editorState: ', editorState);
  };

  return (
    <div className="addProduct">
      <div className="rich-text-container">
        <h2>rich text</h2>
        <div className="rich-text-options">
          <button onClick={p => onUnderlineClick(p)}>U</button>
          <button onClick={p => onBoldClick(p)}>
            <b>B</b>
          </button>
          <button onClick={p => onItalicClick(p)}>
            <em>I</em>
          </button>
        </div>
        <div className="editor" onClick={focusEditor}>
          <Editor
            ref={editor}
            editorState={editorState}
            onChange={editorState => setEditorState(editorState)}
          />
        </div>
        <button onClick={onSubmit}>שלח</button>
      </div>
    </div>
  );
};

export default AddProduct;
