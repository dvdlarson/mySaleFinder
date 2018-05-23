require('dotenv').config()

module.exports = {
	development: {
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: "salefinder",
		host: process.env.DB_HOST,
		dialect: "mysql"
	},
	test: {
		username: "root",
		password: null,
		database: "database_test",
		host: "127.0.0.1",
		dialect: "mysql"
	},
	// this information will be taken from jawsdb config info on heroku
	production: {
		use_env_variable: "mysql://i0fdrq6rbs98xj9v:jw24r4m3xqgj1sqa@y5s2h87f6ur56vae.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/mzhtsel4smtkd3m0",
		dialect: "mysql"
	}
}
