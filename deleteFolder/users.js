module.exports = function (sequelize, DataTypes) {
	var User = sequelize.define("users", {
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
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
			allowNull: false,
		},
		hash: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	});

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
