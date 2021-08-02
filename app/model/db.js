const mysql = require("mysql");
const config = require("../../config/app.config.js");

const dbConfig = config.db;
// conecta com o mysql
const con = mysql.createConnection({
	host: dbConfig.HOST,
	user: dbConfig.USER,
	password: dbConfig.PASSWORD,
	database: dbConfig.DB
});

// abre a conexao
con.connect(error => {
	if (error) {
		throw error;
	}
	console.log("Successfully connected to the database.");
});

module.exports = con;