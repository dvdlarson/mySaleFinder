var map;
function getPos() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map.setCenter(initialLocation);
    });
  }    
}

function initMap() {
  //display map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 33,
      lng: 112
    },
    zoom: 11
  });
}

$(document).ready(function () {
  //Create new map and go to users position
  initMap();
  getPos();
});

