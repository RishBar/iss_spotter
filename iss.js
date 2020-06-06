const request = require('request');
const fetchMyIP = function(cb) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      cb(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      cb(Error(msg), null);
      return;
    }
  
    const data = JSON.parse(body)['ip'];
    cb(null, data);
  });
};

const fetchCoordsByIP = function(ip, cb) {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      cb(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      cb(msg, null);
      return;
    }
    let data = {"latitude": JSON.parse(body)['data']['latitude'], "longitude": JSON.parse(body)['data']['longitude']};
    cb(null, data);
  });
};

const fetchISSFlyOverTimes = function(coords, cb) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords['latitude']}&lon=${coords['longitude']}`, (error, response, body) => {
    if (error) {
      cb(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times. Response: ${body}`;
      cb(msg, null);
      return;
    }
    let data = JSON.parse(body)['response'];
    cb(null, data);
  });
};

const nextISSTimesForMyLocation = function(cb) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
  
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        console.log("it didnt work!:", error);
        return;
      }
      fetchISSFlyOverTimes(coords, (error, body) => {
        if (error) {
          console.log('it didnt work:', error);
          return;
        }
        cb(null, body);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };

