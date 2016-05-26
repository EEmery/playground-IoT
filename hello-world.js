// Blinks a led half-a-second

var firebase = require("firebase");
var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  
  var server = firebase.initializeApp({
  	//apiKey: "AIzaSyCOrMe3c_HP98AlClD8wYlrzGviKhQATMY",
    //authDomain: "iot-blinking-led.firebaseapp.com",
    //storageBucket: "iot-blinking-led.appspot.com",
    databaseURL: "https://iot-blinking-led.firebaseio.com",
    serviceAccount: "playground-iot-67bdb00abbee.json",
  });
  var database = firebase.database().ref("arduino/");
  
  var button = new five.Button(5);
  var led = new five.Led(3);
  
  // Happens when the button is pressed
  button.on("down", function() {
    database.set({"button": "off"});
  	led.off();
  	console.log("off");
  });
  
  // Happens when the button is released
  button.on("up", function() {
    database.set({"button": "on"});
  	led.on();
  	console.log("on");
  });
});