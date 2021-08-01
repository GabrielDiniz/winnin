const mysql = require("mysql");
const dbConfig = require("../../config/app.config.js");

// Create a connection to the database
const con = mysql.createConnection({
	host: dbConfig.HOST,
	user: dbConfig.USER,
	password: dbConfig.PASSWORD,
	database: dbConfig.DB
});

// open the MySQL connection
con.connect(error => {
	if (error) {
		throw error;
	}
	console.log("Successfully connected to the database.");
});

module.exports = con;