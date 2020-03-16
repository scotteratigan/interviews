import React, { useEffect, useState } from 'react';
import Loader from 'react-loader';
import './App.css';
import InterviewSelections from './InterviewSelections';
import jsonFetch from './api/jsonFetch';

function App() {
  // const { locationData } = data;
  const [transportData, setTransportData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  useEffect(() => {
    jsonFetch('/api/transportation').then((res) => setTransportData(res));
    jsonFetch('/api/locations').then((res) => setLocationData(res));
  }, []);
  return (
    <div className="App">
      <h1>Interviews Planner</h1>
      <Loader loaded={!!transportData.length && !!locationData.length}>
        <InterviewSelections
          locations={locationData}
          availableTransport={transportData}
        />
      </Loader>
    </div>
  );
}

export default App;
