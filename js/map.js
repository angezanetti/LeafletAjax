var map;
var markerLayer;
var currentLat = currentLng = currentZoom = null;
var studentLat = null;
var studentLng = null;
var markerOnTheMap = [];

var initMap = function(lat, lng, currentLat, currentLng, currentZoom, url) {
    var mapProvider = 'http://{s}.tile.cloudmade.com/{key}/22677/256/{z}/{x}/{y}.png';
    var key = 'BC9A493B41014CAABB98F0471D759707';
    var maxZoom = 15;
    var minZoom = 5;

    if (currentLat) {
        var viewLocation = {
            latitude: currentLat,
            longitude: currentLng,
            zoom: currentZoom
        };
        var session = true;
    } else {
        var viewLocation = {
            latitude: lat,
            longitude: lng,
            zoom: 10
        };
    }

    map = new L.map('map', {
        maxZoom: maxZoom,
        minZoom: minZoom,
        attributionControl: false,
        scrollWheelZoom: false,
    });

    var osm = L.tileLayer(mapProvider, {
        attribution: 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
        key: key
    });

    map.setView([viewLocation.latitude, viewLocation.longitude], viewLocation.zoom);

    map.addLayer(osm);

    markers = new L.MarkerClusterGroup({
        maxClusterRadius: 120,
        iconCreateFunction: function (cluster) {
            return L.divIcon({ html: cluster.getChildCount(), className: 'mycluster', iconSize: L.point(40, 40) });
        }
    });
    map.addLayer(markers);

};

var addMarkerToMap = function (markerList, iconUrl) {

    var LeafIcon = L.Icon.extend({
        options: {
            iconSize:     [35, 35],
            popupAnchor:  [-3, -30]
        }
    });
    var entrepriseIcon = new LeafIcon({
        iconUrl: iconUrl
    });

	removeMarkers();

	for (var i = 0; i < markerList.length; i++) {
		var latlng = new L.LatLng(markerList[i].latitude, markerList[i].longitude, true);
		var marker = new L.marker(latlng, {icon: entrepriseIcon});
		marker.bindPopup('<a href="/data/id/' + markerList[i].id + '/">' + markerList[i].nc + '</a><br />');
		markerOnTheMap.push(marker);
	}
	markers.addLayers(markerOnTheMap);
};

var removeMarkers = function () {
	markers.removeLayers(markerOnTheMap);
	markerOnTheMap = [];
};







