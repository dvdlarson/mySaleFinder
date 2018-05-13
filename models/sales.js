// Import the ORM to create functions that will interact with the database.

// var orm = require("../config/config.js");
module.exports = function (sequelize, DataTypes) {
    var Sale = sequelize.define("sales", {
        sale_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
           
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
           
        },
        sale_type: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        featured: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            allowNull: false
        },
        super_featured: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            allowNull: false
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        start_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        end_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        on_street_parking: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        inside_outside: {
            type: DataTypes.STRING,
            allowNull: true
        },
        weather_cancel: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zip_cd: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        full_address: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        latitude: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
        },
        longitude: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
        },

        
        items_desc: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        photo_url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        going_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1,
        }


    })
return Sale;

    //return an object that defines data relationships
};



// var Author = sequelize.define("Author", {
//     // Giving the Author model a name of type STRING
//     name: DataTypes.STRING
//   });

//   Author.associate = function(models) {
//     // Associating Author with Posts
//     // When an Author is deleted, also delete any associated Posts
//     Author.hasMany(models.Post, {
//       onDelete: "cascade"
//     });
//   };

//   return Author;
// };
