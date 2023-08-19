import { useState } from 'react';
import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState(false);
  const [alert, setAlert] = useState(null);

  const showAlert = (message, level, type) => {
    setAlert({
      msg: message,
      level: level,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  const toggleMode = () => {
    setMode(!mode);
    if (!mode) {
      showAlert("Dark Mode has been enabled", "success")
    } else {
      showAlert("Dark Mode has been disabled", "success")
    }
  }
  document.body.dataset.bsTheme = mode ? "dark" : "light"

  return (
    <>
      <Router basename="/TextUtils">
        <Navbar title="TextUtils" toggleMode={toggleMode} />
        <Alert alert={alert} />
        <div className="container my-3">
          <Routes>
            <Route exact path="/about" element={
              <About />
            } />
            <Route exact path="/" element={
              <TextForm showAlert={showAlert} />
            } />
          </Routes>
        </div>
    </Router>
    </>
  );
}

export default App;
