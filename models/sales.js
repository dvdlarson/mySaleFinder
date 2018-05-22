// Import the ORM to create functions that will interact with the database.

// var orm = require("../config/config.js");
module.exports = function (sequelize, DataTypes) {
    var Sale = sequelize.define("Sale", {
        

        title: {
            type: DataTypes.STRING,
            allowNull: true,

        },
        sale_type: {
            type: DataTypes.STRING,
            allowNull: true,

        },
        featured: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            allowNull: true
        },
        super_featured: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            allowNull: true
        },
        start_date: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        end_date: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        start_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        end_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        on_street_parking: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        inside_outside: {
            type: DataTypes.STRING,
            allowNull: true
        },
        weather_cancel: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        zip_cd: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        full_address: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: null,
        },
        longitude: {
            type: DataTypes.FLOAT,
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
            allowNull: true,
            defaultValue: 0,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 1,
        }


    })
    
    Sale.associate = function(models) {
        // We're saying that a Sale should belong to a User
        // A Sale can't be created without a User due to the foreign key constraint
        Sale.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };

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
