
var field = new Field();

function startLocate() {
 	if (navigator.geolocation) {
 	
	    navigator.geolocation.getCurrentPosition(function(option) {
	    	field.setValue(option.coords.latitude, option.coords.longitude);
	    	$("#locate-btn").remove();
	    	$("#ur-lat").html(option.coords.latitude);
	    	$("#ur-lng").html(option.coords.longitude);
	    	var locate_height = $("body").height() - $(".navbar").height();
	    	$("#locate-btn").css("height", locate_height);
	    });

	} else {

		alert("Geolocation is not supported by this browser.");

	}
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
