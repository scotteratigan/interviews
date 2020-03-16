import React, { useEffect, useState } from 'react';
import Loader from 'react-loader';
import './App.css';
import InterviewSelections from './InterviewSelections';
import Interviews from './Interviews';
import jsonFetch from './api/jsonFetch';

function App() {
  const [loading, setLoading] = useState(false);
  const [interviews, setInterviews] = useState([]);
  const [transportData, setTransportData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  // for each selection...
  const [location, setLocation] = useState('');
  const [transport, setTransport] = useState('');

  const fetchAllData = async () => {
    const initialDataFetches = [
      jsonFetch('/api/transportation').then((res) => setTransportData(res)),
      jsonFetch('/api/locations').then((res) => setLocationData(res)),
    ];
    await initialDataFetches;
    setLoading(false);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const addInterview = async (newInterview) => {
    setLoading(true);
    const res = await jsonFetch('/api/interview', {
      method: 'POST',
      body: newInterview,
    });
    setInterviews([...res]);
    setLocation('');
    setTransport('');
    setLoading(false);
  };
  return (
    <div className="App">
      <h1>Interviews Planner</h1>
      <Loader loaded={!loading}>
        <InterviewSelections
          locations={locationData}
          availableTransport={transportData}
          addInterview={addInterview}
          location={location}
          setLocation={setLocation}
          transport={transport}
          setTransport={setTransport}
        />
        <Interviews interviews={interviews} />
      </Loader>
    </div>
  );
}

export default App;
