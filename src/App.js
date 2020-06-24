import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { DataForm } from './Components/Data/DataForm';
import { Result } from './Components/Result';
import { Menu } from './Components/Menu';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Menu />
        <div className="wrapper">
          <h2>Входные данные</h2>
          <DataForm />
          {/* <Result /> */}
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
