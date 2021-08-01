const sql = require("./db.js");

// constructor
const Post = function(post) {
	this.title = post.title;
	this.author = post.author;
	this.created_timestamp = post.created_timestamp;
	this.up_votes = post.up_votes;
	this.comments = post.comments;
};

Post.create = (newPost, result) => {
	sql.query("INSERT INTO hot_posts SET ?", newPost, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		console.log("created Post: ", { id: res.insertId, ...newPost });
		result(null, { id: res.insertId, ...newPost });
	});
};

Post.getAllByTimestamp = (startTime,endTime,order,result) => {
	sql.query(`SELECT * FROM
				hot_posts
			WHERE
				created_timestamp BETWEEN ${startTime} AND ${endTime}
			ORDER BY ${order}
		`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		
		if (res.length) {
			console.log("found Post: ", res[0]);
			result(null, res[0]);
			return;
		}

		// not found Post with the id
		result({ kind: "not_found" ,message:"nenhum registro encontrado"}, null);
	});
};


Post.getAuthors = (order, result) => {
	sql.query(`SELECT author,sum(up_votes),sum(comments) FROM 
				hot_posts 
			GROUP BY author 
			ORDER BY ${order}
		`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		if (res.length) {
			console.log("found Post: ", res[0]);
			result(null, res[0]);
			return;
		}

		// not found Post with the id
		result({ kind: "not_found" ,message:"nenhum registro encontrado"}, null);
	});
};


module.exports = Post;
