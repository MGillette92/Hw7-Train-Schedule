



// Initialize Firebase
var config = {
    apiKey: "AIzaSyCtJxM2_RK9plY6UkSW7VVCoNN8bLONEwA",
    authDomain: "trainschedulehw-5fb3e.firebaseapp.com",
    databaseURL: "https://trainschedulehw-5fb3e.firebaseio.com",
    projectId: "trainschedulehw-5fb3e",
    storageBucket: "trainschedulehw-5fb3e.appspot.com",
    messagingSenderId: "362377652917"
};
firebase.initializeApp(config);

var database = firebase.database();

// Button On click to add trains
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#name-input").val().trim();
    var trainDest = $("#dest-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
    var trainFreq = $("#freq-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDest,
        start: trainStart,
        frequency: trainFreq
    };

    database.ref().push(newTrain);

    $("#name-input").val("");
    $("#dest-input").val("");
    $("#start-input").val("");
    $("#freq-input").val("");
});

// Event for adding trains to the database and adds a new row to the train table
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().frequency;


    //calculates the minutes until and the arrival time of the next train
    var diffTime = moment().diff(moment.unix(trainStart), "minutes");
    var timeRemainder = moment().diff(moment.unix(diffTime), "minutes") % trainFreq;
    var trainMinAway = trainFreq - timeRemainder;
    var trainNextArrival = moment().add(trainMinAway, "m").format("hh:mm A");


    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
        trainFreq + "</td><td>" + trainNextArrival + "</td><td>" + trainMinAway + "</td></tr>");
});

