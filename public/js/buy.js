var map;
var key=process.env.API_KEY;
function getPos() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      //  initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        console.log(JSON.stringify(position));
        //map.setCenter(position);
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        console.log(lat,lng);
        map = new google.maps.Map(document.getElementById('map'), {
          center: {
            lat: lat,
            lng: lng
          },
          zoom: 9
        });
        var infowindow = new google.maps.InfoWindow({
          content: "<h1>You are here</h1>"
        });
        var marker = new google.maps.Marker({
          position: {
            lat: lat,
            lng: lng
          },
          map: map,
          title: "Your location"
        });
        marker.addListener("click", function() {
          infowindow.open(map, marker);
        })
    });
  }    
}

// function initMap(lat,lng) {
//   console.log("init: "+lat,lng);
//   //display map
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {
//       lat: lat,
//       lng: lng
//     },
//     zoom: 9
//   });
// }

// $(document).ready(function () {
//   //Create new map and go to users position
//  // initMap();
//   getPos();
// });

