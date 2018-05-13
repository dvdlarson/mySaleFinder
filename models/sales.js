// Import the ORM to create functions that will interact with the database.

// var orm = require("../config/config.js");
module.exports = function (sequelize, DataTypes) {
    var Sales = sequelize.define("sales", {
        sale_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            validate: {
                isInt: true
            }

        },
        title: {
            type: DataTypes.string,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        sale_type: {
            type: DataTypes.string,
            allowNull: false,
            validate: {
                len: [1]
            }

        },
        featured: {
            type: DataTypes.boolean,
            defaultValue: 1,
            allowNull: false
        },
        super_featured: {
            type: DataTypes.boolean,
            defaultValue: 1,
            allowNull: false
        },
        start_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        start_time: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                isAfter: DataTypes.NOW
            }
        },
        end_time: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                isAfter: DataTypes.NOW
            }
        },
        on_street_parking: {
            type: DataTypes.boolean,

            allowNull: false,
        },
        inside_outside: {
            type: DataTypes.string,
            allowNull: true
        },
        weather_cancel: {
            type: DataTypes.boolean,
            defaultValue: 0,
            allowNull: false
        },
        address: {
            type: DataTypes.string,
            allowNull: false
        },
        city: {
            type: DataTypes.string,
            allowNull: false
        },
        state: {
            type: DataTypes.string,
            allowNull: false,
            validate: {
                is: ["/^[a-z]{2}$"]
            }

        },
        zip_cd: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [5]
            }
        },
        full_address: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        latitude: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            validate: {
                min: -90,
                max: 90
            }
        },
        longitude: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            validate: {
                min: -180,
                max: 180
            }
        },


        validate: {
            bothCoordsOrNone() {
                if ((this.latitude === null) !== (this.longitude === null)) {
                    throw new Error('Require either both latitude and longitude or neither')
                }
            }
        },
        items_desc: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: [1]
            }

        },
        photo_url: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            }
        },
        going_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                isInt: true
            }
        },
        interested_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                isInt: true
            }
        },
        active: {
            type: DataTypes.boolean,
            allowNull: false
        }




    })


    //return an object that defines data relationships
};

module.exports = sale;

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
