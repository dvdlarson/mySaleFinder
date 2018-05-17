var orm = require("../config/orm.js");

var users = {
    selectAll: function (cb) {
        orm.selectAll("users", function (res) {
            cb(res);
        });
    },
    selectOne: function (valOfCol, cb) {
        var queryString = "SELECT * FROM ?? WHERE ?? = ?";
        connection.query(queryString, ["users", "username", valOfCol], function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: function (value, cb) {
        //this is for a database with one column of user input
        var queryString = "INSERT INTO ?? (??) VALUES (?);"
        connection.query(queryString, ["users", ["username", "email", "phone", "first_name", "last_name", "city", "state", "zip_cd", "hash"], value], function (err, data) {
            cb(data);
        });
    },
    updateOne: function (changeColumn, newValue, idColumn, id, cb) {
        //this is for a database in which only one column will be changed
        var queryString = "UPDATE ?? SET ?? = ? WHERE ?? = ?;";
        connection.query(queryString, ["users", changeColumn, newValue, idColumn, id], function (err, data) {
            cb(data);
        });
    }
}