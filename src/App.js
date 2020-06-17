import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { DataForm } from './Components/Data/DataForm';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <DataForm />
      </div>
    </BrowserRouter>

  );
}

export default App;
