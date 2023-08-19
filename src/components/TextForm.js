import React, { useState } from 'react'
import { toSentenceCase, toTitleCase } from '../utils/util';


function TextForm(props) {
  

  document.title = "TextUtils - Home";
  const [text, setBackendText] = useState("");
  const [undo, setUndo] = useState("");

  const setText = (txt)=> {
    setUndo(text);
    setBackendText(txt);
  }

  const handleUpCase = ()=>{
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to UpperCase")
  }
  const handleLowCase = ()=>{
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to LowerCase")
  }
  const handleSenCace = ()=>{
    let newText = toSentenceCase(text);
    setText(newText);
    props.showAlert("Converted to Sentence Case")
  }
  const handleTitleCase = ()=>{
    let newText = toTitleCase(text);
    setText(newText);
    props.showAlert("Converted to Title Case")
  }
  const handleClear = ()=>{
    setText("");
    props.showAlert("Cleared Text", "warning")
  }
  const handleUndo = ()=>{
    if(undo) {
      setText(undo);
      props.showAlert("Undo successful","success")
      setUndo("")
    } else {
      props.showAlert("Noting to Undo","danger", "error")
    }
  }
  // Credits: A
  const handleCopy = () => {
    if(window.isSecureContext){
      props.showAlert("Copied to clipboard","success")
      navigator.clipboard.writeText(text);
    } else {
      props.showAlert("Copy is only supported in secure context","danger","error")
    }
  }
  const handleSave = () => {
    const link = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = "Download.txt";
    link.click();
    URL.revokeObjectURL(link.href);

    props.showAlert("Downloading should start shortly","success")
  }
  // Credits: Coding Wala
  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "))

    props.showAlert("Removed Extra Spaces")
  }

  const handleOnChange = (event)=>{
    setText(event.target.value)
  }
  

  return (
    <>
    <div className='container' >
      <h1>Enter text below</h1>
        <div className="mb-3">
          <textarea className="form-control" id="textBox" onChange={handleOnChange} rows="8" value={text}></textarea>
        </div>
        <button type="button" className="btn btn-outline-primary mx-1 my-1" onClick={handleUpCase}>Upper Case</button>
        <button type="button" className="btn btn-outline-primary mx-1 my-1" onClick={handleLowCase}>Lower Case</button>
        <button type="button" className="btn btn-outline-primary mx-1 my-1" onClick={handleSenCace}>Sentence Case</button>
        <button type="button" className="btn btn-outline-primary mx-1 my-1" onClick={handleTitleCase}>Title Case</button>
        <button type="button" className="btn btn-outline-primary mx-1 my-1" onClick={handleUndo}>Undo</button>
        <button type="button" className="btn btn-outline-primary mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
        <button type="button" className="btn btn-outline-primary mx-1 my-1" onClick={handleCopy}>Copy Text</button>
        <button type="button" className="btn btn-outline-primary mx-1 my-1" onClick={handleSave}>Save</button>
        <button type="button" className="btn btn-outline-danger mx-1 my-1" onClick={handleClear}>Clear Text</button>
    </div>
    <div className="container my-2">
      <h2>Text Summary</h2>
      <p>{text ? text.split(".").filter((ele)=>{return ele.length!==0}).length : 0} Sentences</p>
      <p>{text ? text.split(/[ ]+/).filter((ele)=>{return ele.length!==0}).length : 0} Words</p>
      <p>{text.length} Characters</p>
      <p>{Math.round(0.008 * (text.split(/[ ]+/).filter((ele)=>{return ele.length!==0}).length))?Math.round(0.008 * (text.split(/[ ]+/).filter((ele)=>{return ele.length!==0}).length)):"Less then 1"} Minute(s) read</p>
      <h3>Preview</h3>
      <pre><p>{text?text:"Enter something in the textbox above to preview it here"}</p></pre>
    </div>
    </>
  )
}

export default TextForm
