// var express = require("express");

// var router = express.Router();
// require sale.js
var sale = require("../models/");

module.exports = function (app) { //home page route
	app.get("/", function (req, res) {
		console.log("router.get");
		res.render("index", {
			style: "index"
		});
	});

	//generic page routing  
	// router.get("/:page", function(req, res) {
	//     res.render(req.params.page);
	// });


	// creates a route for the base 
	// route for the sale display all 
	app.get("/api/all", function (req, res) {
		// gets the data from the userinput and creates a handlebar object will that data
		sale.sales.findAll({})
			.then(function (dbSale) {
				console.log(dbSale + "hello my name is Fred");
				var hbsObject = {
					sale: dbSale
				};
				// send to the home file to display the sales
				console.log(dbSale);
				// res.json(dbSale);
				res.render("home", hbsObject);
			});
	});

	// routes to the manage page, selects all sales where the user_ID matches param ID, supplied from the 'manage my posts' link or however users get routed but picks up user ID from some session variable

	app.get("/api/manage/:id", function (req, res) {

		sale.sales.findAll({
				where: {
					user_id: req.params.id
				}
			})
			.then(function (dbSale) {

				var hbsObject = {
					sale: dbSale
				};
				console.log(dbSale);
				// res.json(dbSale);
				res.render("manage", hbsObject);
			});

	});
	// routes to the EDIT page, selects one sale where the user_ID matches param ID, supplied in the calling button click function

	app.get("/api/edit/:id", function (req, res) {

		sale.sales.findOne({
				where: {
					sale_id: req.params.id
				}
			})
			.then(function (dbSale) {

				var hbsObject = {
					sale: dbSale
				};
				// send to the home file to display the sales
				console.log(dbSale);
				// res.json(dbSale);
				res.render("edit", hbsObject);
			});

	});

	app.get("/api/:id", function (req, res) {
		// gets the data from the userinput and creates a handlebar object will that data
		var page = req.params.page;
		sale.sales.findOne({
				where: {
					sale_id: req.params.id
				}
			})
			.then(function (dbSale) {
				var hbsObject = {
					sale: dbSale
				};
				// send to the home file to display the sales
				console.log(dbSale);
				// res.json(dbSale);
				res.render("home", hbsObject);
			});

	});

	app.get("/signup", function (req, res) {
		res.render("signup", {
			style: "signup"
		});
	})


	app.get("/check/:username", function (req, res) {
		// checks for a unique username
		user.users.findOne({
			where: {
				username: req.params.username
			}
		}).then(function (data) {
			return data;
		})

	});

	//create  sale
	// router.post("/api/sales", function(req, res) {
	// sale.insertSale("sales",req.body.valueList, function() {
	//   res.redirect('/');
	// });
	// });

	//create  user
	// router.post("/api/users", function(req, res) {
	//   sale.insertUser("user",req.body.valueList, function() {
	//     res.redirect('/');
	//   });
	// });

	//  update 
	//requires posting function to supply two arrays populated from form data - one with column values, another with matching data values, the orm update function will iterate through the pairs and submit the update statements
	// router.put("/api/sales/:id", function(req, res){
	// sale.updateOne(req.body.updateColArray,req.body.updateValArray,req.params.id, function(results){
	// 	if (results.changedRows == 0) {
	//     return res.status(404).end();
	// } else {
	//     res.status(200).end();
	// }
	// 	});
	// });

};




//module.exports = router;
