var express = require("express");

var router = express.Router();
// require sale.js
var sale = require("../models/");

module.exports = function(app) 
{//home page route
router.get("/", function(req, res) {
    res.render("index.handlebars");
});

//generic page routing with /page/pagename
router.get("/page/:page", function(req, res) {
    res.render(req.params.page+".handlebars");
});


		// creates a route for the base 
			// route for the sale display all 
router.get("/api/all", function(req, res){
	// gets the data from the userinput and creates a handlebar object will that data
	sale.Sale.findAll({})
	.then(function(dbSale) {
		// send to the home file to display the sales
		res.render("home",dbSale);
	});
		
	});


//create  sale
router.post("/api/sales", function(req, res) {
  sale.insertSale("sales",req.body.valueList, function() {
    res.redirect('/');
  });
});

//create  user
router.post("/api/users", function(req, res) {
    sale.insertUser("user",req.body.valueList, function() {
      res.redirect('/');
    });
  });

//  update 
//requires posting function to supply two arrays populated from form data - one with column values, another with matching data values, the orm update function will iterate through the pairs and submit the update statements
router.put("/api/sales/:id", function(req, res){
	sale.updateOne(req.body.updateColArray,req.body.updateValArray,req.params.id, function(results){
		if (results.changedRows == 0) {
      return res.status(404).end();
  } else {
      res.status(200).end();
}
	});
});

};




//module.exports = router;