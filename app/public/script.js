// In this code below we create the Front-end JavaScript which "POSTS" our form data to our express server.
// In essence, when the user hits submit, jQuery grabs all of the fields then sends a post request to our api
// Our api recognizes the route (/api/tables)... and then runs the associated code (found in api-routes.js).
// In this case the associated code "saves" the data to the table-data.js file or waitinglist-data.js file

$(".submit").on("click", function(event) {
    event.preventDefault();

    // Here we grab the form elements
    var newFriend = {
        friendName: $("#name").val().trim(),
        friendPhoto: $("#photo").val().trim(),
        question1: $("#q1").val().trim(),
        question2: $("#q2").val().trim(),
        question3: $("#q3").val().trim(),
        question4: $("#q4").val().trim(),
        question5: $("#q5").val().trim(),
        question6: $("#q6").val().trim(),
        question7: $("#q7").val().trim(),
        question8: $("#q8").val().trim(),
        question9: $("#q9").val().trim(),
        question10: $("#q10").val().trim(),

};

console.log(newFriend);

// This line is the magic. It"s very similar to the standard ajax function we used.
// Essentially we give it a URL, we give it the object we want to send, then we have a "callback".
// The callback is the response of the server. In our case, we set up code in api-routes that "returns" true or false
// depending on if a tables is available or not.

$.post("/api/friends", newFriend,
    function(data) {

    // If a table is available... tell user they are booked.
    if (data) {
        alert("Yay! You are officially booked!");
    }

    // If a table is available... tell user they on the waiting list.
    else {
        alert("Sorry you are on the wait list");
    }

    // Clear the form when submitting
    $("#name").val("");
    $("#photo").val("");
    $("#q1").val("");
    $("#q2").val("");
    $("#q3").val("");
    $("#q4").val("");
    $("#q5").val("");
    $("#q6").val("");
    $("#q7").val("");
    $("#q8").val("");
    $("#q9").val("");
    $("#q10").val("");

    });

});