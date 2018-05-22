var map;
var markers = [];
//var key = process.env.API_KEY;

function getPos() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      //  initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      console.log(position);
      //map.setCenter(position);
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      console.log(lat, lng);
      map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: lat,
          lng: lng
        },
        zoom: 11
      });
      $.get("/api/buy", function (data) {
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
            $("#cards-wrapper").animate({
              scrollTop: $("#cards-wrapper").scrollTop() + $("#" + this.id).position().top
            });
            //reset border highlights
            $("li").css({
              "border-left": "none"
            });
            $(".card").attr("style", "margin-left: 6px!important");
            //selected sale border highlight
            $("#" + this.id).css({
              "border-left": "6px solid gold"
            });
            $("#" + this.id + " .card").attr("style", "margin-left: 0px!important");
          });
          //close window if you click anywhere else on the map
          map.addListener("click", function (event) {
            infoWindow.close();
            $("li").css({"border-left": "none"});
            $(".card").attr("style", "margin-left: 6px!important");
          });
          markers.push(marker);
        }
      });
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

$(document).ready(function () {
  //Create new map and go to users position
  // initMap();
  for (var i = 0; i < $(".image").length; i++) {
    $(".image").each(function () {
      $(this).css({
        "background-image": "url('../public/img/sale" + Math.floor(Math.random() * 7 + 1) + ".PNG')"
      })
    });
  }


  $(".like").on("click", function (event) {
    event.preventDefault();
    //if user isnt logged in, display an alert
    var saleID = this.id;
    $(this).css({
      "color": "red"
    });
    var favData = {
      saleId: saleID,
      //UserId: req.session.user.id

    };
    console.log(favData);

    $.ajax("/api/addfav", {
      type: "POST",
      data: favData
    }).then(function () {

      console.log("Added new sale: " + favData);
    });
  });
  $(document).on("click", "li", function() {
    google.maps.event.trigger(markers[$(this).attr("id") - 1], "click");
  });
});
