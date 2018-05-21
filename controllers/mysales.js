var path = require("path");
var sale = require("../models/");
var originalPath;
module.exports = function (app) {
	//no account needed for the following routes//////////////////////////////////////////////////////
	//home page route
	app.get("/", function (req, res) {
		console.log("router.get");
		res.render("index", {
			style: "index"
		});
	});

	//create account
	app.get('/signup', (req, res) => {
		res.render("signup", {
			style: "signup"
		});
	});

	//login page
	app.get("/login", function (req, res) {
		console.log("saved route: " + originalPath);
		res.render("login", {
			style: "login"
		});
	});

	//go to the buyer's main page 
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

	//gets buyer's info and pushes it to /buy page
	app.get("/api/buy", function (req, res) {
		sale.Sale.findAll({})
			.then(function (dbSales) {
				res.send(dbSales);
			});
	});

	//check for users' info to log in
	app.get("/api/users", function (req, res) {
		console.log("/api/users: " + req.session.returnTo);
		sale.User.findAll({}).then(function (data) {
			for (var i = 0; i < data.length; i++) {
				if (req.query.username === data[i].dataValues.username &&
					req.query.password === data[i].dataValues.password) {
					req.session.user = data[i];
					res.redirect(req.session.returnTo || '/');
					delete req.session.returnTo;
				}
			}
		});
	});

	app.get("/origpath", function (req, res) {
		res.json(originalPath);
		console.log("originalPath: " + originalPath);
	})

	//account needed for all routes below/////////////////////////////////////////////////////////////////
	// causes all other pages to go to the login page if not logged in
	// app.get("/*", function (req, res, next) {
	// 	if (typeof req.cookies['connect.sid'] === undefined) {
	// 		req.session.returnTo = req.path;
	// 		console.log("cookies: " + req.cookies['connect.sid']);
	// 		res.render("login", {
	// 			style: "login"
	// 		});
	// 	} else {
	// 		next(); // Call the next middleware
	// 	}
	// });
	app.use(function (req, res, next) {
		if (req.session.user == null) {
			req.session.returnTo = req.path;
			originalPath = req.session.returnTo;

			// if user is not logged-in redirect back to login page //
			res.redirect('/login');
		} else {
			next();
		}
	});

	//go to the sale form
	app.get("/sale", function (req, res) {
		res.sendFile(path.join(__dirname, "../public/html/sale_form.html"));
	});

	//go to the favorites page
	app.get("/favorites", function (req, res) {
		console.log("/favorites");
		sale.Favorite.findAll({
			where: {
				UserId: req.session.user.id,
			},
			include: [sale.Sale]
		}).then(function (fav) {
			var hbsObject = {
				fav: fav
				//style: "newsale"
			};
			res.render("mylist", hbsObject);
		});
	});

	//pushes favorite's info to page
	app.get("/api/favorites", function (req, res) {
		console.log("user.id: " + req.session.user.id);
		sale.Favorite.findAll({
			where: {
				UserId: req.session.user.id,
			},
			include: [sale.Sale]
		}).then(function (fav) {
			console.log(fav);
			res.send(fav);
		});
	});

	//edit a sale page
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
			console.log(hbsObject.sale.title);
			res.sendFile(path.join(__dirname, "../public/html/edit_sale.html"));
		});
	});

	//delete a sale
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

	//routes to the page to manage all your sales
	app.get("/manage", function (req, res) {
		console.log("/manage");
		sale.Sale.findAll({
				where: {
					UserId: req.session.user.id
				}
			})
			.then(function (dbSale) {

				var hbsObject = {
					sale: dbSale
				};
				res.render("manage", hbsObject);
			});

	});

	//routes to the edit sale page
	app.get("/api/edit/:id", function (req, res) {

		sale.Sale.findOne({
				where: {
					id: req.params.id
				}
			})
			.then(function (dbSale) {

				var hbsObject = {
					sale: dbSale
				};
				// send to the home file to display the sales
				console.log(dbSale);
				// res.json(dbSale);
				res.send(hbsObject);
			});

	});

	// //check for users' info to log in
	// app.get("/api/users", function (req, res) {
	// 	sale.User.findAll({}).then(function (data) {
	// 		for (var i = 0; i < data.length; i++) {
	// 			if (req.query.username === data[i].dataValues.username &&
	// 				req.query.password === data[i].dataValues.password) {
	// 				req.session.user = data[i];
	// 				// res.render("manage");
	// 				res.redirect(req.session.returnTo || '/');
	// 				delete req.session.returnTo;
	// 			}
	// 		}
	// 	});
	// });

	//post user information to database
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

	//posts sale information to database
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

	//add a sale to user's favorite list
	app.post("/api/addfav", function (req, res) {
		console.log("saleId: " + req.body.saleId);
		var saleId = req.body.saleId
		sale.Favorite.create({
			SaleId: saleId,
			UserId: req.session.user.id
		}).then(function (result) {
			console.log("added favorite for userid: " + req.session.user.id);
			if (!req.session.user.id) {
				return res.error;
			}
		});
	});

	//update a sale
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

		}, {
			where: {
				id: req.params.id
			}
		}).then(function (userInfo) {
			console.log(userInfo);
			res.json(userInfo);
		});
	});

	//testing new features
	app.get("/test", function (req, res) {
		res.render("test");
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

}


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

// app.get("/manage", function (req, res) {
// 	res.render("manage", {
// 		style: "manage"
// 	});
// });

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

//module.exports = router;