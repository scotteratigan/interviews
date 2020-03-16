// To mock API responses, all calls will be made here instead.
// Could be kept as a fetch middleware to return straight JSON also.

import data from '../data.json';
// max_distance is in miles
// speed is in miles per hour

let { transportData } = data;
let { locationData } = data;

const interviews = [];

function scheduleInterview({ location, distance, transport }) {
  // mutates transportData, locationData, and interviews
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
  interviews.push({ location, distance, transport });
  return interviews;
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
        code: 404,
      };
  }
}

function postRouter(route, body = {}) {
  switch (route) {
    case '/api/interview':
      // todo: implement server-side validation of interview validity
      // can't schedule multiple per location
      // can't schedule more than 4 interviews
      // can't exceed distance by mode of transit
      // can't use transit too many times
      return scheduleInterview(body);
    default:
      return {
        error: 'Post route not found',
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
      if (options.method === 'POST') {
        const returnData = postRouter(route, options.body);
        return resolve(returnData);
      }
      return reject(new Error('Unknown route requested or server error.'));
    }, randomNetworkDelay());
  });
}
