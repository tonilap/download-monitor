"use-strict"
const
  fs = require('fs'),
  zmq = require('zmq'),
  directory = process.argv[2];
  publisher = zmq.socket('pub');

fs.watch(directory, function(event, filename) {
  // send message to subscribers
  publisher.send(JSON.stringify({
  	type: 'new',
  	file: filename,
  	timestamp: Date.now()
  }));

  publisher.bind('tcp://*:5910', function(err) {
  	console.log('Listening for subscribers...')
  });
});