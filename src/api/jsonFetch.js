// To mock API responses, all calls will be made here instead.
// Could be kept as a fetch middleware to return straight JSON also.

import data from '../data.json';
// max_distance is in miles
// speed is in miles per hour

function getRouter(route) {
  switch (route) {
    case '/api/transportation':
      return data.transportData;
    case '/api/locations':
      return data.locationData;
    default:
      return {
        error: 'Route not found',
        code: 404,
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
      return reject(new Error('Unknown route requested or server error.'));
      // resolve(data);
    }, randomNetworkDelay());
  });
}

// function postRouter(route, body = {}) {}
