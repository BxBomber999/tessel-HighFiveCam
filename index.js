'use strict';

// Tessel 2
// Camera
// Servo
// Servo Motor
// Acceleromoeter
// Ambient


// Import the interface to Tessel hardware
const tessel = require('tessel');
const cameraMod = require('./camera/camera.js');
const ambientMod = require('./ambient/ambient.js');
const storageMod = require('./storage/storage.js')

// Camera Items

var av = cameraMod.av
var os = cameraMod.os
var http = cameraMod.http
var port = cameraMod.port
var camera = cameraMod.camera

// Ambient Items

var ambientlib = ambientMod.ambientlib
var ambient = ambientMod.ambient

// Storage

const fs = storageMod.fs
const path = storageMod.path
const mountPoint = storageMod.mountPoint
//const filepath = storageMod.filepath




// Clap Setup
//var ambient = require('ambient-attx4').use(tessel.port['A']);

// Sound level (0-1) needed to trigger. You may need to adjust this.
var triggerVal = 0.1;

// When the module is connected
ambient.on('ready', function () {
  // Set the sound trigger

  ambient.setSoundTrigger(triggerVal);

  // When the sound trigger is reached
  ambient.on('sound-trigger', function (trigger) {
    // // Take a picture
    const capture = camera.capture();
    capture.on('data', function (data) {
      let fileName = Date.now().toString();
      console.log(fileName)
      fs.writeFileSync(path.join(mountPoint, 'HIGHFIVES-' + fileName), data);
      console.log('new photo saved');
    });

    ambient.clearSoundTrigger();
    ambient.setSoundTrigger(triggerVal)
  });
});

