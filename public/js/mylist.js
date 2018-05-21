// geocoder.geocode(fullAddress)
//     .then(function (res) {
//         latitude = res.latitude;
//         longitude = res.longitude;
//     })
//     .catch(function (err) {
//         console.log(err);
//     });



// app.get("/api/mylist", function(req, res) {
//     // Here we add an "include" property to our options in our findOne query
//     // We set the value to an array of the models we want to include in a left outer join
//     // In this case, just db.Post
//     sale.Favorite.findOne({
//       where: {
//         id: req.session.user.id
//       },
//       include: [db.Sale]
//     }).then(function (results) {

//         var hbsObject = {
//             sale: dbSale,
//             style: "mylist",
//         };
//         var waypoints=[];
//         for(var i = 0;i<results.length;i++){
//            waypoints.push(results[i].full_address);
//         }
//         getRoute(waypoints);



//         // send to the buy file to display the sales
//         res.render("buy", hbsObject);
//     });
//   });
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

$(document).ready(function () {
    $("#getroute").click(function (event) {
        event.preventDefault();
        $.ajax({
            method: "GET",
            URL: "/api/favorites"
        }).then(function (fav) {
            var addressArr = ["Phoenix, AZ", "Tucson, AZ"];
            var userStart = $("#yourAddress").val().trim();

            // for (var i = 0; i < fav.length; i++) {
            //     addressArr.push(fav[i].dataValues.Sale.dataValues.full_address);
            // }

            initialize(addressArr, userStart);

            google.maps.event.addDomListener(window, 'click', initialize);

        });
    });
});

function initialize(waypoints, userStart) {
    directionsDisplay = new google.maps.DirectionsRenderer();

    //need to get lat/lng of user's starting address and center the map there

    var map_center = new google.maps.LatLng(33.374806, -111.856696);
    var mapOptions = {
        zoom: 10,
        center: map_center
    }
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);
    calcRoute(waypoints, userStart);
}

// need to use the user's starting/ending address from a form

function calcRoute(waypoints, userStart) {
    var start = userStart;
    var end = userStart;
    var waypts = [];
    var wayptsIn = waypoints;
    for (var i = 0; i < wayptsIn.length; i++) {
        waypts.push({
            location: wayptsIn[i],
            stopover: true
        });
    }

    var request = {
        origin: start,
        destination: end,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var summaryPanel = document.getElementById('directions_panel');
            summaryPanel.innerHTML = '';
            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {
                var routeSegment = i + 1;
                summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
                summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
            }
        }
    });
}

// google.maps.event.addDomListener(window, 'click', initialize);