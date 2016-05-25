// Blinks a led half-a-second

var firebase = require("firebase");
var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  
  var server = firebase.initializeApp({
  	apiKey: "AIzaSyCOrMe3c_HP98AlClD8wYlrzGviKhQATMY",
    authDomain: "iot-blinking-led.firebaseapp.com",
    databaseURL: "https://iot-blinking-led.firebaseio.com",
    storageBucket: "iot-blinking-led.appspot.com",
  });
  
  var button = new five.Button(5);
  var led = new five.Led(3);
  
  // Happens when the button is pressed
  button.on("down", function() {
  	led.off();
  	server.set("off");
  	console.log("off");
  });
  
  // Happens when the button is released
  button.on("up", function() {
  	led.on();
  	server.set("on");
  	console.log("on");
  });
});