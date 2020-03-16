import React from 'react';
import './App.css';
import InterviewSelections from './InterviewSelections';
import data from './data.json';

function App() {
  const { locationData, transportData } = data;
  return (
    <div className="App">
      <h1>Interviews Planner</h1>
      <InterviewSelections locations={locationData} availableTransport={transportData} />
    </div>
  );
}

export default App;
