import React from 'react';
import './App.css';
import SelectInterview from './SelectInterview';
import data from './data.json';

function App() {
  const { locationData } = data;
  return (
    <div className="App">
      <h1>Interviews Planner</h1>
      <SelectInterview locations={locationData} />
    </div>
  );
}

export default App;
