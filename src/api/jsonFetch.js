// To mock API responses, all calls will be made here instead.
// Could be kept as a fetch middleware to return straight JSON also.

import data from '../data.json';
// max_distance is in miles
// speed is in miles per hour

const MAX_INTERVIEWS = 4;

let { transportData } = data;
let { locationData } = data;

const interviews = [];

function scheduleInterview({ location, transport }) {
  // mutates transportData, locationData, and interviews

  // Ensure location is still available:
  const locationObj = locationData.find((option) => option.city === location);
  if (!locationObj) {
    return {
      error: 'Location not available',
      status: 400,
      data: interviews,
    };
  }

  // Ensure we haven't used up transport option:
  const transportObj = transportData.find(
    (option) => option.name === transport,
  );
  if (!transportObj || transportObj.unit < 1) {
    return {
      error: 'Transport option not available',
      status: 400,
      data: interviews,
    };
  }

  // Ensure we haven't scheduled the max number of interviews yet:
  if (interviews.length >= MAX_INTERVIEWS) {
    return {
      error: 'Max number of interviews exceeded',
      status: 400,
      data: interviews,
    };
  }

  // Ensure location doesn't exceed limit of transport method:
  const { distance } = locationObj;
  const { max_distance: maxDistance } = transportObj;
  if (distance > maxDistance) {
    return {
      error: 'Location not reachable by selected transport option',
      status: 400,
      data: interviews,
    };
  }

  // remove location from array:
  locationData = locationData.filter((option) => option.city !== location);

  // update units for transport:
  transportData = [...transportData]
    .map((transportOption) => {
      if (transportOption.name !== transport) return transportOption;
      return { ...transportOption, unit: transportOption.unit - 1 };
    })
    .filter((option) => option.unit > 0);

  // update interview list:
  const { speed } = transportObj;
  const travelHours = distance / speed;
  interviews.push({ location, distance, transport, travelHours });
  return {
    status: 200,
    data: interviews,
  };
}

function getRouter(route) {
  switch (route) {
    case '/api/transportation':
      return transportData;
    case '/api/locations':
      return locationData;
    default:
      return {
        error: 'Get route not found',
        status: 404,
      };
  }
}

function postRouter(route, body = {}) {
  switch (route) {
    case '/api/schedule_interview':
      return scheduleInterview(body);
    default:
      return {
        error: 'Post route not found',
        status: 404,
      };
  }
}

function randomNetworkDelay(min = 350, max = 550) {
  const delayMS = Math.floor(Math.random() * (max - min)) + min;
  return delayMS;
}

export default function jsonFetch(route, fetchOptions = {}) {
  const options = {
    // set up defaults, then spread in user-passed config
    method: 'GET',
    ...fetchOptions,
  };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (options.method === 'GET') {
        const returnData = getRouter(route);
        return resolve(returnData);
      }
      if (options.method === 'POST') {
        const returnData = postRouter(route, options.body);
        return resolve(returnData);
      }
      return reject(new Error('Unknown route requested or server error.'));
    }, randomNetworkDelay());
  });
}
