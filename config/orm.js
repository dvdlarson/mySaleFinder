var connection = require("./connection.js");

var orm = {
    selectAll: function(table, cb) {
        var queryString = "SELECT * FROM ??;";
        connection.query(queryString, [table], function(err, data){
            if (err) {
                console.log("orm.js, selectAll error: " + err);
            }
            cb(data);
        });
    },
    //requires a string of values to match the columns - genrated from the form, should be passed by the submit function
    insertSale: function(valueList, cb) {

        var queryString = "INSERT INTO `salefinder.sales` (`user_id`, `title`, `sale_type`, `featured`, `super_featured`, `start_date`, `end_date`, `start_time`, `end_time`, `on_street_parking`, `inside_outside`, `weather_cancel`, `address`, `city`, `state`, `zip_cd`, `full_address`, `latitude`, `longitude`, `items_desc`, `going_count`, `interested_count`) VALUES (?);"
        connection.query(queryString, [valueList], function(err, data){
            if (err) {
                console.log("orm.js, insertSale error: " + err);
            }
            cb(data);
        });
    },
        //requires a string of values to match the columns - genrated from the form, should be passed by the submit function
    insertUser: function(valueList, cb) {

        var queryString = "INSERT INTO `salefinder`.`users` (`user_id`, `email`, `phone`, `first_name`, `last_name`, `address`, `city`, `state`, `zip_cd`, `full_address`, `latitude`, `longitude`) VALUES (?);"
        connection.query(queryString, [valueList], function(err, data){
            if (err) {
                console.log("orm.js, insertUser error: " + err);
            }
            cb(data);
        });
    },
    //takes two arrays, one of columns to update, another of matching values that we will build from the form and passed in the req.body
    updateSale: function(table,updateColArray,updateValArray,id,cb) {
        for(var i=0;i<updateColArray.length;i++)
       { 
        var changeColumn=updateColArray[i];
        var newValue=updateValArray[i];
        var queryString = "UPDATE ?? SET ?? = ? WHERE sale_id = ?;";
        connection.query(queryString, [table, changeColumn, newValue, id], function(err, data){
            if (err) {
                console.log(err);
            } 
        });
    }

        cb(data);
    }
};

module.exports = orm;