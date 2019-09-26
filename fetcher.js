const request = require('request');
const fs = require('fs');

const commandLineArgArray = process.argv;
const commandLineURL = commandLineArgArray[2];
const commandLineLocalFilePath = commandLineArgArray[3];

request(commandLineURL, (error, response, body) => {
  if (error) {
    console.log('error:', error);
  } else {
    fs.writeFile(commandLineLocalFilePath, body, (err) => {
      if (err) throw err;
      const stats = fs.statSync(commandLineLocalFilePath);
      const fileSizeInBytes = stats.size;
      console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${commandLineLocalFilePath}`);
    })
  };
});

//console.log(commandLineURL, commandLineLocalFilePath);
// console.log(commandLineURL);

