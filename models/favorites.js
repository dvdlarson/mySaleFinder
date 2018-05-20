module.exports = function (sequelize, DataTypes) {
	var Favorite = sequelize.define("Favorite", {

		// sale_id: {
    //         type: DataTypes.INTEGER,
		// },
		notes: {
			type: DataTypes.TEXT,
			allowNull: true,
		}
	});
	
	// MyList.associate = function (models) {
	// 	MyList.belongsTo(models.users, {
	// 		as: "user",
	// 		foreignKey: {
	// 			allowNull: false
	// 		}
	// 	});
	// }
	Favorite.associate = function(models) {
        // We're saying that a Favorite should belong to a User
        // A Favorite can't be created without a User due to the foreign key constraint
        Favorite.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
				});
				//  Favorite.belongsTo(models.Sale, {
				// 	 foreignKey: {
				// 		 allowNull: false
				// 	 }
				//  });
			};
			
	return Favorite;
};
