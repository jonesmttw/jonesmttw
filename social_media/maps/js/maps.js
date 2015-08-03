var map, io;
function initialize() {
	var mapOptions = {
		center: new google.maps.LatLng(42, -99),
		zoom: 5,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    //setTimeout(function(){
    //    var markers = [];
    //    for(var p in points){
    //        var point = points[p];
    //        var marker = new google.maps.Marker({ position: new google.maps.LatLng(point.lat, point.lng)});
    //        markers.push(marker);
    //    }
    //    var markerCluser = new MarkerClusterer(map, markers);
    //}, 1);

    io = io.connect();

    io.emit('ready');

    io.on('tweets', function(data){
        console.log(JSON.parse(data));
    });
}

google.maps.event.addDomListener(window, 'load', initialize);