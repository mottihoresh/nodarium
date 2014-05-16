'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    passport = require('passport'),
    logger = require('mean-logger'),
    config = require('./server/config/config'),
    serialport = require('serialport'),
    SerialPort = serialport.SerialPort,
    serialPort = new SerialPort('/dev/rfcomm0', {
        baudrate: 9600,
        parser: serialport.parsers.readline('\n')
    }, false); // this is the openImmediately flag [default is true]

function writeAndDrain(data, callback) {
    console.log('sending data to arduino: ', data);
    callback = callback || function () {
    };
    serialPort.write(data, function (error, results) {
        serialPort.drain(callback);
    });
}

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Initializing system variables
var config = require('./server/config/config');
var db = mongoose.connect(config.db);

// Bootstrap Models, Dependencies, Routes and the app as an express app
var app = require('./server/config/system/bootstrap')(passport, db),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
io.set('log level', 1);
app.io = io;

// Start the app by listening on <port>, optional hostname
server.listen(config.port, config.hostname);
console.log('Mean app started on port ' + config.port + ' (' + process.env.NODE_ENV + ')');

// Initializing logger
logger.init(app, passport, mongoose);

app.io.sockets.on('connection', function (socket) {
    socket.on('updateNumber', function (data) {
        socket.emit('giveMeNumber', parseInt(data) + 1);
    });
});

app.serialPort = serialPort;
app.writeAndDrain = writeAndDrain;
app.serialPort.open(function (err) {

//    // General Event listener
//    app.serialPort.on('open', function(){
//        app.serialPort.on('data', function(data) {
//            console.log('data received: ' + data);
//        });
//
//    })
//    .on('error', function(err){
//            console.log('ERROR: ', err);
//        });

    console.log(err);


});
app.isArduinoConnected = false;
var arduinoConnection = setInterval(
    function () {
        app.serialPort.open(function (err) {
            if (err) {
                console.log('unable to connect');
            } else {
                app.isArduinoConnected = true;
                clearInterval(arduinoConnection);
            }
        });
    }, 1000);

serialPort.on('error', function () {
    var arduinoConnection = setInterval(
        function () {
            app.serialPort.open(function (err) {
                if (err) {
                    console.log('unable to connect');
                } else {
                    clearInterval(arduinoConnection);
                }
            });
        }, 1000);
});

serialPort.on('data', function(data){
    console.log(data);
//    data = JSON.parse(data);
//    console.log(data);
//    if(data.status && data.status === 'alive') {
//        console.log('live connection....');
//    } else {
//        console.log('no connection');
//    }
});

// Expose app
exports = module.exports = app;

/// test