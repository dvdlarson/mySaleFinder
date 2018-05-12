// Import the ORM to create functions that will interact with the database.

var orm = require("../config/config.js");

var sale = {
    selectAll: function (cb) {
        orm.selectAll("sales", function (res) {
         cb(res);
        });
    },
    //takes a string called valueList which will be a string we build from the form values 
    //can be used for either new user or new sale
    insertSale: function (valueList, cb) {
        orm.insertSale(valueList, function (res) {
          cb(res)
        });
    },
    insertUser: function (valueList, cb) {
        orm.insertUser(valueList, function (res) {
          cb(res)
        });
    },
    //takes two arrays, one of columns to update, another of matching values that we will build from the form
    updateSale: function(updateColArray,updateValArray,id, cb){
        orm.updateSale("sales", updateColArray, updateValArray, id, function(res){
          cb(res)
        });
    }
};

module.exports = sale;