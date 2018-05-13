var express = require("express");

var router = express.Router();

router.get("/", function(req, res) {
    res.render("index.handlebars");
});

router.get("/login", function(req, res) {
    res.render("login.handlebars");
});

module.exports = router;