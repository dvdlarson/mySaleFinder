// var express = require("express");

// var router = express.Router();
// require sale.js
var path = require("path");
var sale = require("../models/");
// var moment = require("moment");

module.exports = function (app) { //home page route
	app.get("/", function (req, res) {
		console.log("router.get");
		res.render("index", {
			style: "index"
		});
	});

	app.get("/*", function(req, res, next) {

		if(typeof req.cookies['connect.sid'] !== 'undefined') {
			console.log("cookies: " + req.cookies['connect.sid']);
		}

		next(); // Call the next middleware
	 });

	app.get("/favorites", function (req, res) {
		console.log("user.id: " + req.session.user.id);
		sale.Favorite.findAll({
			where: {
				UserId: req.session.user.id, 
			},
			//include: [sale.User],
			include: [sale.Sale]
		}).then(function (fav) {
			console.log(fav);
			var hbsObject = {
				fav: fav
				//style: "newsale"
			};
			res.render("mylist", hbsObject);
		});
	});

	app.get("/api/favorites", function (req, res) {
		console.log("user.id: " + req.session.user.id);
		sale.Favorite.findAll({
			where: {
				UserId: req.session.user.id, 
			},
			//include: [sale.User],
			include: [sale.Sale]
		}).then(function (fav) {
			console.log(fav);
			res.send(fav);
		});
	});

	// app.get("/buy", function (req, res) {
	// 	res.render("buy", {
	// 		style: "buy"
	// 	});
	// });

	app.get("/api/buy", function (req, res) {
		sale.Sale.findAll({})
			.then(function (dbSales) {
				res.send(dbSales);
			})
	})
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

	app.get("/test", function (req, res) {
		res.render("test");
	});

	//generic page routing  
	app.get("/sale", function (req, res) {
		// res.render("newsale", {
		// 	style: "newsale"
		// });
		res.sendFile(path.join(__dirname, "../public/html/sale_form.html"));
	});

	app.get("/edit/:id", function (req, res) {
		//var id=req.params.id;
		// if(!verifyOwner(id)){
		// 	location.href="/buy"
		// };
		sale.Sale.findOne({
			where: {
				id: req.params.id
			}
		}).then(function (dbSale) {
			var hbsObject = {
				sale: dbSale,
				style: "newsale"
			};
			console.log(hbsObject.sale.title);
			res.render("edit", hbsObject);
		});
	});
	// function verifyOwner(id) {
	// 	sale.Sale.findOne({
	// 		where: {
	// 			id: id
	// 		}
	// 	}).then(function (dbSale) {
	// 		if (dbSale.userid==req.session.user.id){
	// 			return true;
	// 		}
	// 		alert("You may only edit sales you have posted.");
	// 		return false;
	// 	})
	// }

	//This will make the sale no longer active and no longer visible to users.  It stays in the database though.
	app.put("/api/delete/:id", function (req, res) {
		var id = req.params.id;
		console.log("deleting sale: " + id);
		sale.Sale.update({
			active: 0
		}, {
			where: {
				id: id
			}
		}).then(function (data) {
			res.render("manage");
		})
	});

	// creates a route for the base 
	// route for the sale display all 
	app.get("/buy", function (req, res) {
		// gets the data from the userinput and creates a handlebar object will that data
		sale.Sale.findAll({})
			.then(function (dbSale) {
				var hbsObject = {
					sale: dbSale,
					style: "buy",
				};
				// send to the buy file to display the sales
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
				//console.log(dbSale);
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
			UserId: req.session.user.id

		}).then(function (userInfo) {
			res.json(userInfo);
		});
	});

	app.post("/api/addfav", function (req, res) {
		//console.log(JSON.stringify(req.body) + "server side");
		console.log("saleId: " + req.body.saleId);
		var saleId = req.body.saleId
		sale.Favorite.create({
			//sale_id: req.body.sale_id,
			SaleId: saleId,
			UserId: req.session.user.id

		}).then(function (result) {
			console.log("added favorite for userid: " + req.session.user.id);
			if (!req.session.user.id) {
				return res.error;
			}
		});
	});

	app.put("/api/editsale/:id", function (req, res) {
		console.log("sale ID: " + req.params.id);
		sale.Sale.update({
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
			//	active: req.body.active,
			//	UserId: req.body.UserId
		}, {
			where: {
				id: req.params.id
			}
		}).then(function (userInfo) {
			console.log(userInfo);
			res.json(userInfo);
		});
	});

	//photo upload test

	app.post('/upload', function (req, res) {
		if (!req.files)
			return res.status(400).send('No files were uploaded.');

		// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
		let sampleFile = req.files.sampleFile;
		let filename = req.files.sampleFile.name;
		let path = 'C:\\Users\\Dave\\Desktop\\HOMEWORK\\PROJECT_2\\mySaleFinder\\public\\uploads\\' + filename;

		// Use the mv() method to place the file somewhere on your server
		sampleFile.mv(path, function (err) {
			if (err)
				return res.status(500).send(err);

			res.send('File uploaded!');
		});
	});

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