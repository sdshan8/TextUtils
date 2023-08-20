import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


function Navbar(props) {

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">{props.title}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/about">About</Link>
            </li>
          </ul>
          <div className="form-check form-switch mx-2">
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Dark mode</label>
            <input className="form-check-input" title='Toggle Dark Mode' onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  mode: PropTypes.bool.isRequired
}

Navbar.defaultProps = {
  title: "Example Title",
  mode: false
}
