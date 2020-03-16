/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader';
import Box from '@material-ui/core/Box';
import './App.css';
import InterviewSelections from './InterviewSelections';
import Interviews from './Interviews';
import OfferSummary from './OfferSummary';
import jsonFetch from './api/jsonFetch';

const MAX_INTERVIEWS = 4;

function App() {
  const [loading, setLoading] = useState(false);
  const [interviews, setInterviews] = useState([]);
  const [transportData, setTransportData] = useState([]);
  const [locationData, setLocationData] = useState([]);
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
    setInterviews([...res.data]);
    fetchCurrentData();
  };

  const performInterview = async (interviewLocation) => {
    setLoading(true);
    const res = await jsonFetch('/api/perform_interview', {
      method: 'POST',
      body: { location: interviewLocation },
    });
    setInterviews([...res.data]);
    setLoading(false);
  };

  return (
    <Box className="App" m={1} maxWidth={680}>
      <Box component="section" m={2}>
        <h1>Interviews Planner</h1>
        {interviews.length < MAX_INTERVIEWS && (
          <Box m={3}>
            <p>
              Great work lining up 6 interviews. However, you only have the time
              to attend 4 interviews. Please plan your interviews below. After
              you interview at all 4 locations, you will receive the results.
            </p>
          </Box>
        )}
      </Box>
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
      </Loader>
      <Interviews interviews={interviews} performInterview={performInterview} />
      <OfferSummary interviews={interviews} />
      <Box>
        <p>
          View{' '}
          <a href="https://github.com/scotteratigan/interviews">Source Code</a>
        </p>
      </Box>
    </Box>
  );
}

export default App;
