var field = new Field();
var setLogging = 0;
var count = 1;

function startLocate() {
 	if (navigator.geolocation) {
 		
	    navigator.geolocation.getCurrentPosition(function(option) {
	    	field.setValue(option.coords.latitude, option.coords.longitude);
	    	$("#locate-btn").remove();
	    	$("#ur-lat").html(option.coords.latitude);
	    	$("#ur-lng").html(option.coords.longitude);
	    	$("#ur-speed").html(option.coords.speed || "Nothing");
	    	$("#ur-acc").html(option.coords.accuracy || "Nothing");
	    	$("#ur-alt").html(option.coords.altitude || "Nothing");
	    	var locate_height = $("body").height() - $(".navbar").height();
	    	$("#locate-btn").css("height", locate_height);
	    	$(".navbar-collapse").show();
	    });
		
	} else {
		alert("Geolocation is not supported by this browser.");
	}
}

function logLocate() {
	setLogging = setInterval(function() {
		
		navigator.geolocation.getCurrentPosition(function(option) {
	    	$("#ur-lat").html(option.coords.latitude);
	    	$("#ur-lng").html(option.coords.longitude);
	    	$("#ur-speed").html(option.coords.speed || "Nothing");
	    	$("#ur-acc").html(option.coords.accuracy || "Nothing");
	    	$("#ur-alt").html(option.coords.altitude || "Nothing");
	    	$("#logs").prepend("<div class='item-log'> <b>#" + count + "</b>: Latitude: <i>" + option.coords.latitude + "</i>, Longitude: <i>" + option.coords.longitude + "</i>, Speed: <i>" + option.coords.speed + "</i>, Accuracy: <i>" + option.coords.accuracy + "</i>, Altitude: <i>" + option.coords.altitude + "</i></div>")
	    	count++
	    });
	}, 1000);
}

function cancelLocate() {
	clearInterval(setLogging);
}

function resetLocate() {
	clearInterval(setLogging);
	count = 0;
	$("#logs").empty();
}

function createMap (setplace) {

	var map = L.map('map').setView(setplace, 13);

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	L.marker(setplace).addTo(map)
	.bindPopup("<b>You are here</b>").openPopup();
}

function Field(){
    var latitude 
    var longitude 
   
    this.getValue = function(){
        return [latitude, longitude];
    };
   
    this.setValue = function(lat_val, long_val){
        latitude = lat_val;
        longitude = long_val;
        createMap (this.getValue())
    };
}



$("#info-switch").click(function() {
	if(!$("#info-area").is(":visible")) {
		$("#info-area").show();
		$(this).addClass("active");
	}else {
		$("#info-area").hide();
		$(this).removeClass("active");
	}
})

$("#info-log").click(function() {
	if(!$("#log-area").is(":visible")) {
		$("#log-area").show();
		$(this).addClass("active");
	}else {
		$("#log-area").hide();
		$(this).removeClass("active");
	}
})

$("#start-log").click(function() {
	$("#start-log").hide();
	$("#stop-log").show();
	logLocate();
})

$("#stop-log").click(function() {
	$("#start-log").show();
	$("#stop-log").hide();
	cancelLocate();
})

$("#reset-log").click(function() {
	$("#stop-log").hide();
	$("#start-log").show();
	resetLocate();
})