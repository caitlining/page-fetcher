const request = require('request');
const fs = require('fs');
const readline = require('readline');

const commandLineArgArray = process.argv;
const commandLineURL = commandLineArgArray[2];
const commandLineLocalFilePath = commandLineArgArray[3];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const downloadPage = function(inputURL, destinationFile) {
  
  fs.access(destinationFile, fs.F_OK, (err) => {
    if (!err) {
      rl.question('This file already exists.\nTo overwrite the file, type in Y and hit enter.\nIf you do not wish to overwrite the file, type in any other key and hit enter to quit the program\n', (answer) => {
        if (answer === "Y") {
          request(inputURL, (error, response, body) => {
            if (error) {
              console.log('The URL that you gave me was not legit, so I am quitting now, byeeee!');
              process.exit;
            } else {
              fs.writeFile(destinationFile, body, (err) => {
                if (err) throw err;
                const stats = fs.statSync(destinationFile);
                const fileSizeInBytes = stats.size;
                console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${destinationFile}`);
              });
            }
          });
          rl.close();
        } else {
          rl.close();
          process.exit;
        }
      });
    } else {
      console.log('The given destination file does not exist, so I am quitting');
      process.exit();
    }
  });
};


downloadPage(commandLineURL, commandLineLocalFilePath);