# mySaleFinder
Project 2 - U of A bootcamp

Responsibilities:
Briana - 
Chad - views folder
Chay - credintials folder
David

Map of files - indicates what each file requires and what each file exports as
server.js
	requires models folder, controllers/mysales.js
	requires express, body-parser, express-handlebars, path	

controllers/mysales.js
	requires models/models.js
	requires express
	exports as router

config/config.js
	require dotenv
	exports
config/connection.js
	require mysql
	export as connection
config/orm.js
	require connection.js
	exports as orm

models/index.js
	requires fs, path, sequelize
	requires config/config.js
	exports as db
models/sales.js
	exports as a sequelize function
