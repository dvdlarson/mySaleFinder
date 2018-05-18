
module.exports = function (sequelize, DataTypes) {

	var User = sequelize.define("User", {
		
		username: {
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
			allowNull: true,
		},
		// full_address: {
		// 	type: DataTypes.TEXT,
		// 	allowNull: false
		// },
		// latitude: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: true,
		// 	defaultValue: null,
		// },
		// longitude: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: true,
		// 	defaultValue: null,
		// },
		// buddy_contact: {
		// 	type: DataTypes.BOOLEAN,
		// 	allowNull: false,
		// 	defaultValue: 1
		// },
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	});

	User.associate = function(models) {
		// Associating Author with Posts
		// When an Author is deleted, also delete any associated Posts
		User.hasMany(models.Sale, {
		  onDelete: "cascade"
		});
		User.hasMany(models.Favorite, {
			onDelete: "cascade"
		  });
	  };


	// MyList.associate = function (models) {
	// 	// Associating Author with Posts
	// 	// When an Author is deleted, also delete any associated Posts
	// 	MyList.hasMany(models.sales, {
	// 			as: "sales_foreignKey",
	// 			foreignKey: {
	// 				allowNull: false
	// 			}
	// 		}),
	// 		MyList.belongsTo(models.users, {
	// 			as: "user",
	// 			foreignKey: {
	// 				allowNull: false
	// 			}
	// 		})

	// };
	// User.associate = function(models) {
	//     // Associating User with Sales
	//     // When a User is deleted, also delete any associated Sales
	//     User.hasMany(models.Sale, {
	//       onDelete: "cascade"
	//     });
	//   };

	return User;

	//return an object that defines data relationships
};
