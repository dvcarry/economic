import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { DataForm } from './Components/Data/DataForm';
import { Result } from './Components/Result';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <DataForm />
        <Result />
      </div>
    </BrowserRouter>

  );
}

export default App;
