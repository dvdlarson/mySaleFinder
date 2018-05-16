module.exports = function (sequelize, DataTypes) {
	var MyList = sequelize.define("myList", {
		notes: {
			type: DataTypes.TEXT,
			allowNull: true,

		}
	});
	MyList.associate = function (models) {
		// Associating Author with Posts
		// When an Author is deleted, also delete any associated Posts
		MyList.hasMany(models.Sales, {
			foreignKey: {
				allowNull: false
			}
		});

	};
	MyList.associate = function (models) {
		MyList.hasMany(models.users, {
			foreignKey: {
				allowNull: false
			}
		});
	}

	return MyList;
};
