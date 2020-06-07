const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body)['ip'];
  return request(`https://ipvigilante.com/json/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  let coords = {"latitude": JSON.parse(body)['data']['latitude'], "longitude": JSON.parse(body)['data']['longitude']};
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords['latitude']}&lon=${coords['longitude']}`);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((body) => {
      let data = JSON.parse(body)['response'];
      return data;
    });
};

module.exports = { nextISSTimesForMyLocation };