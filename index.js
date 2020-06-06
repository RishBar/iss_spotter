const fetchMyIP = require('./iss').fetchMyIP;
const fetchCoordsByIP = require('./iss').fetchCoordsByIP;
const fetchISSFlyOverTimes = require('./iss').fetchISSFlyOverTimes;
const nextISSTimesForMyLocation = require('./iss').nextISSTimesForMyLocation;
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });



// fetchCoordsByIP('162.156.172.219', (error, body) => {
//   if (error) {
//     console.log("it didnt work!:", error);
//     return;
//   }
//   console.log('it worked!:', body);
// });

// fetchISSFlyOverTimes({ latitude: '49.22750', longitude: '-122.93010' }, (error, body) => {
//   if (error) {
//     console.log('it didnt work:', error);
//     return;
//   }
//   console.log(body);
// });

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, body) => {
  if (error) {
    console.log('it didnt work:', error);
    return;
  }
  printPassTimes(body);
});

