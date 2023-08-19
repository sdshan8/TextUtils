import React from 'react'

function Alert(props) {

  const capitalize = (word) => {
    const lower = word.toLowerCase()
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  return (
    <div style={{height:"70px"}}>
      {props.alert && <div className="container-sm py-1">
        <div className={`alert center alert-${props.alert.level ? props.alert.level : "primary"} alert-dismissible fade show`} role="alert">
          <strong>{capitalize(
            props.alert.type ? props.alert.type : (
              props.alert.level ? props.alert.level : "Info"
            )
          )}</strong>: {props.alert.msg}
        </div>
      </div>}
    </div>
  )
}

export default Alert
