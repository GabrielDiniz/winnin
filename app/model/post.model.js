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

Post.getAllByDate = (startDate,endDate,order,result) => {
	let query = `SELECT * FROM
				hot_posts
			WHERE
				created_timestamp BETWEEN ? AND ?
			ORDER BY ${order} DESC
		`;
		
	sql.query(query,[startDate,endDate], (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		
		if (res.length) {
			
			result(null, res);
			return;
		}

		// not found Post with the id
		result({ kind: "not_found" ,message:"nenhum registro encontrado"}, null);
	});
};


Post.getAuthors = (order, result) => {
	let query = `SELECT author,sum(up_votes) up_votes,sum(comments) comments FROM 
				hot_posts 
			GROUP BY author 
			ORDER BY ${order} DESC
		`;
	console.log(query);

	sql.query(query, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		if (res.length) {
			
			result(null, res);
			return;
		}

		// not found Post with the id
		result({ kind: "not_found" ,message:"nenhum registro encontrado"}, null);
	});
};


module.exports = Post;
