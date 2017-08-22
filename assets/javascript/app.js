$(document).ready(function(){

	var topics = ["dogs", "cats", "birds", "mice"];

	function renderBtns() {

		$("#btnContainer").empty();

	    for (var i = 0; i < topics.length; i++) {
	        
	        var topicsBtn = $("<button>");
	        
	        topicsBtn.addClass("btn btn-link pull-right");
	        
	        topicsBtn.attr("data-topic", topics[i]);

	        topicsBtn.text(topics[i]);
	        
	        $("#btnContainer").append(topicsBtn);
	    }

	    $("#id").on("click", function(event) {

	    	event.preventDefault();

	    	var userTopic = $("#textBox").val().trim();
	    	topics.push(userTopic);

	    	renderBtns();
	    });
	}

	renderBtns();
});