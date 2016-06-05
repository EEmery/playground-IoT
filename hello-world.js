// Blinks a led half-a-second

// Make frameworks requirements
var firebase = require("firebase");
var five = require("johnny-five");

var board = new five.Board();   // Creates a new board

// Main code
board.on("ready", function() {
  
  // Set up firebase initial configurations
  var server = firebase.initializeApp({
    databaseURL: "https://playground-iot.firebaseio.com",
    serviceAccount: "playground-iot-arduino-service-account-key.json",
  });
  var database = firebase.database().ref("arduino/");   // Creates a firebase database reference in "/arduino/"
  
  // Set up arduino pins
  var button = new five.Button(5);    // There is a button at pin 5
  var led = new five.Led(3);          // There is a LED at pin 13

  
  // Happens when the button is pressed
  button.on("down", function() {
    database.set({"button": "off"});    // Writes on the database
  });
  
  // Happens when the button is released
  button.on("up", function() {
    database.set({"button": "on"});     // Writes on the database
  });


  // Reads the firebase server
  database.on("value", function(snapshot) {
    
    // Reads the "button" status
    if (snapshot.val().button == "on") {
      led.on();   // Turns the LED on when button is pressed
      console.log("button: on");          // Writes on the console
    }
    else {
      led.off();  // Turns the LED off when button is not pressed
      console.log("button: off");         // Writes on the console
    }
  });

});