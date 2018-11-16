
    // In this code below we create the Front-end JavaScript which "POSTS" our form data to our express server.
// In essence, when the user hits submit, jQuery grabs all of the fields then sends a post request to our api
// Our api recognizes the route (/api/tables)... and then runs the associated code (found in api-routes.js).
// In this case the associated code "saves" the data to the table-data.js file or waitinglist-data.js file

$(".submit").on("click", function(event) {
    event.preventDefault();
    console.log("clicky2");

    // Here we grab the form elements
    var newFriend = {
        friendName: $("#name").val().trim(),
        friendPhoto: $("#photo").val().trim(),
        scores:[ 
        $("#q1").val().trim(),
        $("#q2").val().trim(),
        $("#q3").val().trim(),
        $("#q4").val().trim(),
        $("#q5").val().trim(),
        $("#q6").val().trim(),
        $("#q7").val().trim(),
        $("#q8").val().trim(),
        $("#q9").val().trim(),
        $("#q10").val().trim()
        ]
};

console.log(newFriend);

// This line is the magic. It"s very similar to the standard ajax function we used.
// Essentially we give it a URL, we give it the object we want to send, then we have a "callback".
// The callback is the response of the server. In our case, we set up code in api-routes that "returns" true or false
// depending on if a tables is available or not.

$.post("/api/friends", newFriend,
    function(data) {

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
    
    // call function to calculate best friend
    totalDifference(newFriend);
    });

});

function totalDifference(newFriend) {
    console.log("hi",newFriend);
    // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
    $.ajax({ url: "/api/friends", method: "GET" })
      .then(function(friendData) {

        let scoresArr = [];
        let sumDiff = 0;
        console.log("returned friend data",friendData);

        // Loop through and calculate coefficient
        for (let i = 0; i < friendData.length-1; i++) {
            for(let j = 0; j<friendData[i].scores.length; j++) {
                sumDiff += Math.abs(newFriend.scores[j] -friendData[i].scores[j]);
            }
            scoresArr.push(sumDiff);
            sumDiff=0;
        }

        console.log("summed scores ",scoresArr);
        const bestFriend = scoresArr.indexOf(Math.min(...scoresArr));
        console.log("bestie ",bestFriend);

      });
}