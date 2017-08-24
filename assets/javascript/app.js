$(document).ready(function(){

	var topics = ["Kendrick Lamar", "Frank Ocean", "Kanye West", "Tyler the Creator"];

	function renderBtns() {

		$("#btnContainer").empty();

	    for (var i = 0; i < topics.length; i++) {
	        
	        var topicsBtn = $("<button>");
	        topicsBtn.addClass("btn btn-link pull-right gifTopic");
	        topicsBtn.attr("data-topic", topics[i]);
	        topicsBtn.text(topics[i]);
	        $("#btnContainer").append(topicsBtn);
	    }
	}

	$("#addTopicBtn").on("click", function(event) {

	   	event.preventDefault();

	   	var userTopic = $("#userInput").val().trim();
	   	topics.push(userTopic);
	   	$("#userInput").val("");

    	renderBtns();
    });

	$(document).on("click", ".gifTopic", function() {

		$("#gifs-appear-here").html("");

		var gif = $(this).attr("data-topic");

		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
        	url: queryURL,
        	method: "GET"
        })
        .done(function(response) {

        	console.log(response);
        	var results = response.data;

        	for (var i = 0; i < results.length; i++) {
        		if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
        			var gifDiv = $("<div class='item'>");
        			var rating = results[i].rating;
        			var p = $("<p>").text("Rating: " + rating);
        			var gifImage = $("<img>");
        			gifImage.attr("src", results[i].images.fixed_height_still.url);
        			gifImage.attr("data-state", "still");
        			gifImage.attr("data-still", results[i].images.fixed_height_still.url);
        			gifImage.attr("data-animate", results[i].images.fixed_height.url);
        			gifImage.addClass("gif");
        			gifDiv.append(gifImage);
        			gifDiv.append(p);

        			$("#gifs-appear-here").prepend(gifDiv);
        		}
        	}

        })

	});

	$(document).on("click", ".gif", function() {

		var state = $(this).attr("data-state");

		if (state === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}

	});

	$("#clearBtn").on("click", function() {
		$("#gifs-appear-here").html("");
	});

	renderBtns();
});