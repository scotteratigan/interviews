import React, { useEffect, useState } from 'react';
import Loader from 'react-loader';
import './App.css';
import InterviewSelections from './InterviewSelections';
import Interviews from './Interviews';
import jsonFetch from './api/jsonFetch';

const MAX_INTERVIEWS = 4;

function App() {
  const [loading, setLoading] = useState(false);
  const [interviews, setInterviews] = useState([]);
  const [transportData, setTransportData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  // for each selection...
  const [location, setLocation] = useState('');
  const [transport, setTransport] = useState('');

  const fetchCurrentData = async () => {
    const initialDataFetches = [
      jsonFetch('/api/transportation').then((res) => setTransportData(res)),
      jsonFetch('/api/locations').then((res) => setLocationData(res)),
    ];
    await initialDataFetches;
    setLoading(false);
  };

  useEffect(() => {
    fetchCurrentData();
  }, []);

  const addInterview = async (newInterview) => {
    setLoading(true);
    setLocation('');
    setTransport('');
    const res = await jsonFetch('/api/schedule_interview', {
      method: 'POST',
      body: newInterview,
    });
    if (res.status === 200) {
      setInterviews([...res.data]);
    } else {
      // Add error msg (toast?)
    }

    // Assuming confired, get upated transport & location data
    fetchCurrentData();
  };
  return (
    <div className="App">
      <h1>Interviews Planner</h1>
      <Loader loaded={!loading}>
        {interviews.length < MAX_INTERVIEWS && (
          <InterviewSelections
            locations={locationData}
            availableTransport={transportData}
            addInterview={addInterview}
            location={location}
            setLocation={setLocation}
            transport={transport}
            setTransport={setTransport}
          />
        )}

        <Interviews interviews={interviews} />
      </Loader>
    </div>
  );
}

export default App;
