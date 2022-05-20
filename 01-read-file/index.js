const fs = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, '1.txt');
const readStream = fs.createReadStream(pathToFile, 'utf-8');

readStream.on('data', (chunk) => {
  console.log(chunk);
});