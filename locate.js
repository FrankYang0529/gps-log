
var field = new Field();

function createMap (setplace) {
	var map = L.map('map').setView(setplace, 13);

	L.tileLayer('http://{s}.tile.cloudmade.com/f59941c17eda4947ae395e907fe531a3/997/256/{z}/{x}/{y}.png', {
	maxZoom: 18,
	}).addTo(map);

	L.marker(setplace).addTo(map)
	.bindPopup("<b>I found you :))</b>").openPopup();
}


function startLocate() {
 	if (navigator.geolocation) {
 	
	    navigator.geolocation.getCurrentPosition(function(option) {
	    	field.setValue(option.coords.latitude, option.coords.longitude)
	    });

	} else {

		alert("Geolocation is not supported by this browser.");

	}
}

function Field(){
    var latitude 
    var longitude 
   
    this.getValue = function(){
    	console.log(latitude)
    	console.log(longitude)
        return [latitude, longitude];
    };
   
    this.setValue = function(lat_val, long_val){
        latitude = lat_val;
        longitude = long_val;
        createMap (this.getValue())
    };
}
