import React, { useState } from 'react'
import { toSentenceCase, toTitleCase } from '../utils/util';


function TextForm(props) {

  const [text, setBackendText] = useState("");
  const [regex, setRegex] = useState("");
  const [replace, setReplace] = useState("");
  const [undo, setUndo] = useState("");

  const setText = (txt) => {
    setUndo(text);
    setBackendText(txt);
  }

  const handleUpCase = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to UpperCase")
  }
  const handleLowCase = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to LowerCase")
  }
  const handleSenCace = () => {
    let newText = toSentenceCase(text);
    setText(newText);
    props.showAlert("Converted to Sentence Case")
  }
  const handleTitleCase = () => {
    let newText = toTitleCase(text);
    setText(newText);
    props.showAlert("Converted to Title Case")
  }
  const handleClear = () => {
    setText("");
    props.showAlert("Cleared Text", "warning")
  }
  const handleUndo = () => {
    if (undo) {
      setText(undo);
      props.showAlert("Undo successful", "success")
      setUndo("")
    } else {
      props.showAlert("Noting to Undo", "danger", "error")
    }
  }
  // Credits: A
  const handleCopy = () => {
    if (window.isSecureContext) {
      props.showAlert("Copied to clipboard", "success")
      navigator.clipboard.writeText(text);
    } else {
      props.showAlert("Copy is only supported in secure context", "danger", "error")
    }
  }
  const handleSave = () => {
    const link = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = "Download.txt";
    link.click();
    URL.revokeObjectURL(link.href);

    props.showAlert("Downloading should start shortly", "success")
  }
  // Credits: Coding Wala
  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "))

    props.showAlert("Removed Extra Spaces")
  }

  const handlePrint = () => {
    window.print();
    props.showAlert("Print Dailog should pop-up shortly", "success")
  }
  const handleReplace = ()=>{
    try {
      const flags = regex.replace(/.*\/([gimy]*)$/, '$1');
      const pattern = regex.replace(new RegExp('^/(.*?)/'+flags+'$'), '$1');
      const reg = new RegExp(pattern, flags)
      const result = text.replace(reg, replace)
      setText(result);
      props.showAlert("Replaced", "success")
    } catch (e) {
      props.showAlert("Please Enter a Valid Regex", "danger","error")
    }
  }

  const handleOnChange = (event) => {
    setText(event.target.value)
  }
  const handleOnChange2 = (event) => {
    setRegex(event.target.value)
  }
  const handleOnChange3 = (event) => {
    setReplace(event.target.value)
  }


  return (
    <>
      <div className='container' >
        <h1 className='my-1'>Enter text below</h1>
        <div className="mb-3">
          <textarea className="form-control" id="textBox" onChange={handleOnChange} rows="8" value={text}></textarea>
        </div>
        <div>
          <div className="btn-group">
            <button type="button"  disabled={text.length === 0} className="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              Cases
            </button>
            <ul className="dropdown-menu">
              <li><button type="button" className="dropdown-item" title='Convert to UpperCase' onClick={handleUpCase}>Upper Case</button></li>
              <li><button type="button" className="dropdown-item" title='Convert to LowerCase' onClick={handleLowCase}>Lower Case</button></li>
              <li><button type="button" className="dropdown-item" title='Convert to Sentence Case' onClick={handleSenCace}>Sentence Case</button></li>
              <li><button type="button" className="dropdown-item" title='Convert to Title Case' onClick={handleTitleCase}>Title Case</button></li>
            </ul>
          </div>
          <button type="button" className="btn btn-outline-primary m-1" disabled={text.length === 0} title='Remove Extra Space' onClick={handleExtraSpaces}>Remove Whitespace</button>
          <button type="button" className="btn btn-outline-primary m-1" disabled={text.length === 0} title='Copy Text to Clipboard' onClick={handleCopy}>Copy Text</button>
          <button type="button" className="btn btn-outline-primary m-1" disabled={text.length === 0} title='Save as .txt File' onClick={handleSave}>Save</button>
          <button type="button" className="btn btn-outline-primary m-1" disabled={text.length === 0} title='Print the Preview' onClick={handlePrint}>Print</button>
          <button type="button" className="btn btn-outline-primary m-1" disabled={text.length === 0 && undo.length === 0} title='Undo your Last Action' onClick={handleUndo}>Undo</button>
          <button type="button" className="btn btn-outline-danger m-1" disabled={text.length === 0} title='Clear the Text field' onClick={handleClear}>Clear Text</button>
        </div>
        <div className="input-group m-1">
          <span className="input-group-text" id="regex-label">RegEx</span>
          <input type="text" className="form-control" placeholder="/(reg)ex/" aria-label="regex" title='Enter RegEx Here' aria-describedby="regex-label" value={regex} onChange={handleOnChange2}/>
        </div>
        <div className="input-group m-1">
          <span className="input-group-text" id="replace-label">Replace</span>
          <input type="text" className="form-control" placeholder="Replacement Text" aria-label="replace" title='Enter Replacement Text Here' aria-describedby="replace-label" value={replace} onChange={handleOnChange3}/>
          <button className="btn btn-secondary" type="button" onClick={handleReplace} disabled={regex.length === 0} >Replace</button>
        </div>
      </div>
      <div className="container my-2">
        <h2>Text Summary</h2>
        <p>{text ? text.split(".").filter((ele) => { return ele.length !== 0 }).length : 0} Sentences</p>
        <p>{text ? text.split(/s+/).filter((ele) => { return ele.length !== 0 }).length : 0} Words</p>
        <p>{text.length} Characters</p>
        <p>{Math.round(0.008 * (text.split(/s+/).filter((ele) => { return ele.length !== 0 }).length)) ? Math.round(0.008 * (text.split(/s+/).filter((ele) => { return ele.length !== 0 }).length)) : "Less then 1"} Minute(s) read</p>
        <h3>Preview</h3>
        <pre id="print-area"><p>{text ? text : "Nothing to Preview"}</p></pre>
      </div>
    </>
  )
}

export default TextForm
