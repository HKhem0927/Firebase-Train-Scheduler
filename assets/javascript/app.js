var config = {
    apiKey: "AIzaSyCvzouLSB_3LAxa2fVZcDYI7FQVUeTxYgo",
    authDomain: "train-scheduler-b4ad4.firebaseapp.com",
    databaseURL: "https://train-scheduler-b4ad4.firebaseio.com",
    storageBucket: "train-scheduler-b4ad4.appspot.com",
    
  };
  firebase.initializeApp(config);

var database = firebase.database();



$("#addTrain").on("click", function(event){
	event.preventDefault();
	// Grabs user input
	var trainName = $("#trainName").val().trim();
	var trainDestination = $("#destinationInput").val().trim();
	var firstTrainTime = moment($("#timeInput").val().trim(), "HH:mm").format("X");
	var trainFrequency = $("#frequencyInput").val().trim();

	
	var newTrain = {
		name:  trainName,
		destination: trainDestination,
		time: firstTrainTime,
		frequency: trainFrequency
	}

	
	database.ref().push(newTrain);

	
	$("#trainName").val("");
	$("#destinationInput").val("");
	$("#timeInput").val("");
	$("#frequencyInput").val("");

	
});



database.ref().on("child_added", function(childSnapshot){

	
	var trainName = childSnapshot.val().name;
	var trainDestination = childSnapshot.val().destination;
	var firstTrainTime = childSnapshot.val().time;
	var trainFrequency= childSnapshot.val().frequency;

	
	var firstTimeConverted = moment.unix(firstTrainTime, 'hh:mm').subtract(1,'years');

	
	var currentTime = moment();

	
	var diffTime = moment().diff(moment(firstTimeConverted), 'minutes');

	
	var remainder = diffTime % trainFrequency;

	var minsAway = trainFrequency - remainder;

	var nextArrival = moment().add(minsAway, 'minutes').format("HH:mm");
	
	
	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minsAway + "</td></tr>");

});