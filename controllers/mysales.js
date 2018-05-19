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

	app.get("/buy", function (req, res) {
		res.render("buy", {
			style: "buy"
		});
	});

	// app.get("/manage", function (req, res) {
	// 	res.render("manage", {
	// 		style: "manage"
	// 	});
	// });

	app.get("/login", function (req, res) {
		res.render("login", {
			style: "login"
		});
	});

	//generic page routing  
	app.get("/sale", function (req, res) {
		res.render("alt-newsale-delete", {
			style: "newsale"
		});
	});

	app.get("/edit/:id", function (req, res) {
		sale.Sale.findOne({
			where: {
				id: req.params.id
			}
		}).then(function (dbSale) {
			var hbsObject = {
				sale: dbSale,
				style: "newsale"
			};

			res.render("editsale", hbsObject);
		});
	});
	// creates a route for the base 
	// route for the sale display all 
	app.get("/api/all", function (req, res) {
		// gets the data from the userinput and creates a handlebar object will that data
		sale.Sale.findAll({})
			.then(function (dbSale) {
				console.log(dbSale + "hello my name is Fred");
				var hbsObject = {
					sale: dbSale
				};
				// send to the home file to display the sales
				console.log(dbSale);
				// res.json(dbSale);
				res.render("buy", hbsObject);
			});
	});

	// routes to the manage page, selects all sales where the user_ID matches param ID, supplied from the 'manage my posts' link or however users get routed but picks up user ID from some session variable

	app.get("/manage", function (req, res) {
		console.log("userId: " + req.session.user.id);
		sale.Sale.findAll({
				where: {
					UserId: req.session.user.id
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

	// app.get("/api/:id", function (req, res) {
	// 	// gets the data from the userinput and creates a handlebar object will that data
	// 	var page = req.params.page;
	// 	sale.sales.findOne({
	// 			where: {
	// 				sale_id: req.params.id
	// 			}
	// 		})
	// 		.then(function (dbSale) {
	// 			var hbsObject = {
	// 				sale: dbSale
	// 			};
	// 			// send to the home file to display the sales
	// 			console.log(dbSale);
	// 			// res.json(dbSale);
	// 			res.render("home", hbsObject);
	// 		});

	// });

	// app.get("/signup", function(req, res) {
	// 	res.render("signup", {style: "signup"});
	// })

	// app.get("/*", function(req, res, next) {

	// 	if(typeof req.cookies['connect.sid'] !== 'undefined') {
	// 		console.log(req.cookies['connect.sid']);
	// 	}

	// 	next(); // Call the next middleware
	//  });

	app.get("/api/users", function (req, res) {
		// checks for a unique username
		//res.send(req.body.username);
		console.log("req.query: " + req.query.username);

		sale.User.findAll({}).then(function (data) {
			for (var i = 0; i < data.length; i++) {
				if (req.query.username === data[i].dataValues.username &&
					req.query.password === data[i].dataValues.password) {
					req.session.user = data[i];
					console.log("session: " + JSON.stringify(req.session.user));
					console.log("user ID: " + req.session.user.id);
					// console.log(data[0].dataValues.password);
					// console.log(req.query.username); //.username, req.query.password);
					res.render("manage");
					//return;
				}
			}
			console.log("Username or Password was not correct");

		});

	});

	//create  sale
	// router.post("/api/sales", function(req, res) {
	// sale.insertSale("sales",req.body.valueList, function() {
	//   res.redirect('/');
	// });
	// });


	app.post("/api/users", function (req, res) {
		console.log(JSON.stringify(req.body) + "server side")
		sale.User.create({
			username: req.body.username,
			email: req.body.email,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			city: req.body.city,
			state: req.body.state,
			zip_cd: req.body.zip_cd,
			password: req.body.password
		}).then(function (userInfo) {
			res.json(userInfo);
		});
	});

	app.post("/api/addsale", function (req, res) {
		console.log(JSON.stringify(req.body) + "server side")
		sale.Sale.create({
			title: req.body.title,
			sale_type: req.body.sale_type,
			start_date: req.body.start_date,
			end_date: req.body.end_date,
			start_time: req.body.start_time,
			end_time: req.body.end_time,
			on_street_parking: 1,
			inside_outside: 1,
			weather_cancel: 1,
			items_desc: req.body.items_desc,
			city: req.body.city,
			state: req.body.state,
			zip_cd: req.body.zip_cd,
			full_address: req.body.full_address,
			active: req.body.active,
			UserId: req.body.UserId

		}).then(function (userInfo) {
			res.json(userInfo);
		})

	});

	//db.Author.create(req.body).then(function(dbAuthor) {
	//res.json(dbAuthor);


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

	//});

}


//module.exports = router;