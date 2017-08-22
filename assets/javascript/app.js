$(document).ready(function(){

	var topics = ["dogs", "cats", "birds", "mice"];

	function renderBtns() {

		$("#btnContainer").empty();

	    for (var i = 0; i < topics.length; i++) {
	        
	        var topicsBtn = $("<button>");
	        
	        topicsBtn.addClass("btn btn-link pull-right gifTopic");
	        
	        topicsBtn.attr("data-topic", topics[i]);

	        topicsBtn.text(topics[i]);
	        
	        $("#btnContainer").append(topicsBtn);
	    }

	    $("#addTopicBtn").on("click", function(event) {

	    	event.preventDefault();

	    	var userTopic = $("#userInput").val().trim();
	    	topics.push(userTopic);

	    	renderBtns();
	    });
	}

	$(".gifTopic").on("click", function() {

		var gif = $(this).attr("data-topic");

		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
        	url: queryURL,
        	method: "GET"
        })
        .done(function(response) {

        	var results = response.data;

        	for (var i = 0; i < results.length; i++) {
        		if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
        			var gifDiv = $("<div class='item'>");
        			var rating = results[i].rating;
        			var p = $("<p>").text("Rating: " + rating);
        			var gifImage = $("<img>");
        			gifImage.attr("src", results[i].images.fixed_height.url);
        			gifDiv.append(p);
        			gifDiv.append(gifImage);

        			$("#gifs-appear-here").prepend(gifDiv);
        		}
        	}

        })

	});

	renderBtns();
});