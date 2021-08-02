const config = require("../config/app.config.js");
const mysql = require("mysql");

const con = mysql.createConnection({
	host: config.db.HOST,
	user: config.db.USER,
	password: config.db.PASSWORD
});

// abre a conexao
con.connect(error => {
	if (error) {
		throw error;
	}
	console.log("Successfully connected to the database.");
});
//cria o banco conforme configuração
con.query("CREATE DATABASE IF NOT EXISTS "+ config.db.DB,(err, res) => {
	if (err) {
		console.log(err);
		return;
	}
	con.query(`CREATE TABLE IF NOT EXISTS ${config.db.DB}.hot_posts (
				 id varchar(64) NOT NULL,
				 title text NOT NULL,
				 author varchar(255) NOT NULL,
				 created_timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
				 up_votes int(11) NOT NULL,
				 comments int(11) NOT NULL,
				 PRIMARY KEY (id),
				 KEY created_timestamp (created_timestamp)
				) ENGINE=InnoDB DEFAULT CHARSET=latin1
		`,(err, res) => {
		if (err) {
			console.log(err);
		}else{
			con.end();
		}
	});
});

