var map;
function getPos() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      //  initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      console.log(position);
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
        $.get("/api/buy", function(data) {
          //loop through sales
          for (var i = 0; i < data.length; i++) {
            //display the markers for every sale
            var marker = new google.maps.Marker({
              position: {
                lat: data[i].latitude,
                lng: data[i].longitude
              },
              map: map,
              title: data[i].title, 
              id: (i + 1)
            });
            //marker info window content
            marker.content = "<h3>" + data[i].title + "</h3>";
            //display info window on marker click and scroll to the relevant sale
            var infoWindow = new google.maps.InfoWindow();
            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.setContent(this.content);
                infoWindow.open(this.getMap(), this);
                //scroll to sale
                $("#cards-wrapper").animate({scrollTop: $("#cards-wrapper").scrollTop() + $("#" + this.id).position().top})
                $(".card").css("border", "none")
            }); 
            //close window if you click anywhere else on the map
            map.addListener("click", function(event) {
              infoWindow.close();
            });
          }
        });
    });
  }    
}

$(document).ready(function () {
  //Create new map and go to users position
  getPos();
});

