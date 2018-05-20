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
          zoom: 11
        });
        //create the sale markers
        $.get("/api/buy", function(data) {
          console.log(data);
          //loop through sales
          for (var i = 0; i < data.length; i++) {
            // var infowindow = new google.maps.InfoWindow({
            //   //create infowindow for marker
            //   content: "<h4 class='markerTitle'>" + data[i].title + "</h4>"
            //             + "<p>" + data[i].address + "</p>"
            // });
            //display the markers for every sale
            var marker = new google.maps.Marker({
              position: {
                lat: data[i].latitude,
                lng: data[i].longitude
              },
              map: map,
              title: data[i].title, 
              id: data[i].id
            });
            // marker.addListener("click", function() {
            //   infowindow.open(map, marker);
            //   console.log(marker)
            // });            
          }

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

