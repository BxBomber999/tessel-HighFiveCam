// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
Write some text to a file on a USB mass storage
device, then read it back.
*********************************************/

// Import the fs library
var fs = require('fs');
var path = require('path');
var mountPoint = '/mnt/sda1'; // The first flash drive you plug in will be mounted here, the second will be at '/mnt/sdb1'
var filepath = path.join(mountPoint, 'myFile.txt');

var textToWrite = 'Hello Tessel!';

// Write the text to a file on the flash drive
// fs.writeFile(filepath, textToWrite, function () {
//   console.log('Wrote', textToWrite, 'to', filepath, 'on USB mass storage device.');
// });

// Read the text we wrote from the file
fs.readFile(filepath, function (err, data) {
  console.log('Read', data.toString(), 'from USB mass storage device.');
});

module.exports = {
  fs, path, mountPoint, filepath
}
