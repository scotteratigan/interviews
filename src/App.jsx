import React, { useEffect, useState } from 'react';
import Loader from 'react-loader';
import './App.css';
import InterviewSelections from './InterviewSelections';
import Interviews from './Interviews';
import jsonFetch from './api/jsonFetch';

function App() {
  const [interviews, setInterviews] = useState([]);
  const [transportData, setTransportData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  useEffect(() => {
    jsonFetch('/api/transportation').then((res) => setTransportData(res));
    jsonFetch('/api/locations').then((res) => setLocationData(res));
  }, []);
  const addInterview = (newInterview) => {
    const newInterviews = [...interviews, newInterview];
    setInterviews(newInterviews);
  };
  return (
    <div className="App">
      <h1>Interviews Planner</h1>
      <Loader loaded={!!transportData.length && !!locationData.length}>
        <InterviewSelections
          locations={locationData}
          availableTransport={transportData}
          addInterview={addInterview}
        />
        <Interviews interviews={interviews} />
      </Loader>
    </div>
  );
}

export default App;
