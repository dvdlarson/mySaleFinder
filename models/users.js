
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("users", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true, 
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false, 
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
        buddy_contact: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1 
        },
        hash: {
            type: DataTypes.STRING,
            allowNull: false, 
        }
    });

    User.associate = function(models) {
        // Associating User with Sales
        // When a User is deleted, also delete any associated Sales
        User.hasMany(models.Sale, {
          onDelete: "cascade"
        });
      };

    return User;
    
        //return an object that defines data relationships
    };
