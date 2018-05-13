var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

// Set Handlebars.
var exphbs = require("express-handlebars");
var db = require("./models");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));
app.set("port", (process.env.PORT || 8080));

app.use("/public", express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// parse application/json
app.use(bodyParser.json());

// Import routes and give the server access to them.
var routes = require("./controllers/mysales.js");
app.use(routes);

// Start our server so that it can begin listening to client requests.
// app.listen(app.get("port"), function() {
//     console.log("Server started on port " + app.get("port"));
// });
db.sequelize.sync({
    force: true
}).then(function () {
    app.listen(app.get("port"), function () {
        console.log("App listening on PORT " + app.get("port"));
    });
});
