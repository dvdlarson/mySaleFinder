
#USER STORIES
https://docs.google.com/spreadsheets/d/1JWYGGHxaBHlxJotVOB_giLk3RSWzH2TrQ26j4zs28B8/edit#gid=0

#APP DOC

https://docs.google.com/document/d/107XfEDuPK0Qf6JWOhjHMRKC_T-qnrSsVsCi-Xv4yzgg/edit?ts=5af5137c



Map of files - indicates what each file requires and what each file exports as
server.js
	requires models folder, controllers/mysales.js
	requires express, body-parser, express-handlebars, path	

controllers/mysales.js
	requires models/models.js
	requires express
	exports as router

config/config.js
	require dotenv
	exports
config/connection.js
	require mysql
	export as connection
config/orm.js
	require connection.js
	exports as orm

models/index.js
	requires fs, path, sequelize
	requires config/config.js
	exports as db
models/sales.js
	exports as a sequelize function




### 'Garage Sale Finder' App Proposal ###


App where folks can post and search for garage sales, estate sales, auctions, etc.



[Requirement]:
* Be backed by a MySQL Database an ORM (not necessarily Sequelize);

    #This app would need to utilize several tables - 
        * Active_Sales
            Address, Start/End Date, Start/End Time, ItemsForSale (varchar 500), number_confirmed, etc.
        * My_List
        * User Details
        * User Security-see below

    # I'm 100% good with sequelize.

[Requirement]:
* Have both GET and POST routes for retrieving and adding new data;
    # POST 
        - to post a new sale to the database
        - sellers can update or delete their postings
    # GET
        - see all sales
        - search for sales in a specific city
    # API
        - data dump of all active sales

[Requirement]:
* Utilize at least one new library, package, or technology that we haven’t discussed;

    # true secure credentials login
        * Users must create an account to post
        * Optional account for searchers
        * Salt & Hash the password - save in separate user security table

    # HTML drag and drop API
    https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

        * Users should be able to: 
                            select multiple sales, 
                            optimize their route automatically and sort the sale cards according to the results, 
                            **drag and drop** sale cards to reorder the route.

[Requirement]:
* Use a Node and Express Web Server;
* Be deployed using Heroku (with Data);
* Have a polished frontend / UI;
* Have folder structure that meets MVC Paradigm;
* Meet good quality coding standards (indentation, scoping, naming).
    # Obviously


## Application Flow:

* Seller


Seller visits site - choose 'I want to find a sale' or 'I have a sale to post'
#Sale to post route - 
        - choose New User or Returning User

        New User:
            create account -> create user form = name, email, password hint, address (optional), userID, password
                                save [userID, name, email, password hint, address] to user_details
                                save [userID, encrypted pw] to user_security
            redirect to login
                |   
                V
                V
        Returning User:
        login -> login modal form             
                    hash/salt the form value, select user_security where = user_name and make sure the two values match
        
        Choose - view my sales / Post a new sale

    Post a new Sale: 

        Redirect to post a new sale form.
            Title 
            Address
            Type of sale - garage sale, estate sale, etc.
            Start Date/End Date
            Start Time/End Time 
            Is there ample street parking?
            Inside or Outside?
            Will you cancel for rain?
            Items for sale description
            (Upload picture)
            (Categories)
            (Featured)

    View My Sales:

            presented with a list of 'My Sales' with the option to edit or delete
            Bootstrap card type model/custom jQuery
                Should show Title in the title bar
                Date/Time Info
                Address
                Totals - # Confirmed as going, #Interested
                Buttons - Delete, Update
                    Delete - Delete the record ID
                    Update - Update Form
                        Same as add a post form but populate the record info


* Buyer

User visits site  - choose 'I want to find a sale' or 'I have a sale to post'

    Find a sale:
            User is presented with option to view all sales or search by city.
                View all -> select all, sort by start date 

                Search by city -> search form = city, state
                                  SELECT where = form.city AND form.STAT
                                    if no results are found with city + state, 
                                        new query where = state
                Search by item -> search form = item text input
                                SELECT where sales.items_for_sale LIKE form.text_input

            Query results are displayed on screen
                Bootstrap card type model/custom jQuery
                Should show Title in the title bar
                Date/Time Info
                Address
                Buttons - I'm Going or I'm Interested
                    - should update Going_Total or Interested_Total as appropriate
                    - button should change to a checkmark or something else 
                    - get rid of the other button
                (checkbox - add to my list)
                    on checked, check if user is logged in
                        NO - modal alert 'you must log in tocd_list 
                     on unchecked, 
                        DELETE from my_list where = user_id AND sale_id       

                (Should show thumbnail picture if available)

## SUPER FUNCTIONALITY ##
   Level 1 - Users can email the list of sales to themselves (PHP, possible new tech)
   Level 100 - Users can input their starting address and my_list is returned in OPTIMIZED ORDER with DRIVING DIRECTIONS to the next sale
    
                
## Example schema stub and SQL query for My List
CREATE TABLE user (
`user_id` INT NOT NULL PRIMARY KEY,
`name` VARCHAR(50)
);

CREATE TABLE sales (
`sale_id` VARCHAR(20) NOT NULL PRIMARY KEY,
`location` VARCHAR(20),
`other_info` INT
);

CREATE TABLE my_list (
`user_id` INT NOT NULL,
`sale_id` VARCHAR(20) NOT NULL,
PRIMARY KEY(`person_id`, `sale_id`)
);

# GET my_list
SELECT u.user_id,s.*

FROM users AS u

INNER JOIN my_list AS ml
ON u.user_id=ml.user_id

INNER JOIN sales AS s
ON ml.sale_id=s.sale_id

WHERE u.user_id=login_user_id


## stuff about the optimized driving directions:
http://jsfiddle.net/r0pwby94/1/

you may pass optimizeWaypoints: true within the DirectionsRequest to allow the
Directions service to optimize the provided route by rearranging the waypoints
in a more efficient order. (This optimization is an application of the 
Travelling Salesman Problem.) All waypoints must be stopovers for 
theDirections service to optimize their route.

# js 
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();

    //need to get lat/lng of user's starting address and center the map there

    var map_center = new google.maps.LatLng(userLat, userLng);
    var mapOptions = {
        zoom: 6,
        center: map_center
    }
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);
    calcRoute();
}

// need to use the user's starting/ending address from a form

function calcRoute() {
    var start = userStart;
    var end = userEnd;
    var waypts = [];
    var wayptsIn = ["Apache Junction, AZ", "Chandler, AZ", "Phoenix, AZ", "Casa Grande, AZ", "Tempe, AZ", "Scottsdale, AZ", "Laveen, AZ"];
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

google.maps.event.addDomListener(window, 'load', initialize);

## CSS
html, body, #map-canvas {
    height: 100%;
    width: 100%;
    margin: 0px;
    padding: 0px
}
table, tbody, td {
    width: 100%;
    height:100%
}
tr {
    width: 100%,
        height:50%;
}

<table>
    <tr>
        <td>
            <div id="map-canvas" style="height: 500px; border: 2px solid #3872ac;"></div>
        </td>
    </tr>
    <tr>
        <td>
            <div id="directions_panel"></div>
        </td>
    </tr>
</table>