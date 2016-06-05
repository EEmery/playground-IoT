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
  var button = new five.Button(6);    // There is a button at pin 5
  var led = new five.Led(3);          // There is a LED at pin 13
  var buttonState;                    // Informs the button state in the firebase database


  // Reads the firebase server
  database.on("value", function(snapshot) {
    
    // Reads the "button" status
    if (snapshot.val().button == "on") {
      led.on();                       // Turns the LED on when button is pressed
      buttonState = "on";             // Stores the button state
      console.log("button: on");      // Writes on the console
    }
    else {
      led.off();                      // Turns the LED off when button is not pressed
      buttonState = "off";            // Store the button state
      console.log("button: off");     // Writes on the console
    }
  });

  
  // Happens when the button is pressed
  button.on("hit", function() {
    if (buttonState == "on") {
      database.update({"button": "off"});     // Updates the database
    }
    else {
      database.update({"button": "on"});      // Updates the database
    }

  });
  
});