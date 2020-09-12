import React, {useState} from 'react';
import AppContext from './AppContext'
import logo from './logo.svg';
import './App.css';

function App() {

  const [name, setUsername] = useState(null)
  const [house, setHousename] = useState(null)

  const userVars = {
    username: name,
    housename: house,
    setUsername,
    setHousename
  }

  return (
    <AppContext.Provider value={userSettings}>  
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    </AppContext.Provider>
  );
}

export default App;
