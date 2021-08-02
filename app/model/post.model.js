const sql = require("./db.js");

// construtor
const Post = function(post) {
	this.id = post.id;
	this.title = post.title;
	this.author = post.author;
	this.created_timestamp = post.created_timestamp;
	this.up_votes = post.up_votes;
	this.comments = post.comments;
};
//insere o post no banco, caso o id ja exista, apenas atualiza os dados do post
Post.create = (newPost, result) => {
	sql.query("REPLACE INTO hot_posts SET ?", newPost, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		console.log("created Post: ", { id: res.insertId, ...newPost });
		result(null, { id: res.insertId, ...newPost });
	});
};
// busca todos os posts em um intervalo de data,
// recebe a ordem a ser retornados os dados
Post.getAllByDate = (startDate,endDate,order,result) => {
	let query = `SELECT * FROM
				hot_posts
			WHERE
				created_timestamp BETWEEN ? AND ?
			ORDER BY ${order} DESC
		`;
	//executa a query	
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

		//nao encontrado
		result({ kind: "not_found" ,message:"nenhum registro encontrado"}, null);
	});
};

//busca os autores agregando o numero de posts e de comentarios
//retorna os dados na ordem especificada
Post.getAuthors = (order, result) => {
	let query = `SELECT author,sum(up_votes) up_votes,sum(comments) comments FROM 
				hot_posts 
			GROUP BY author 
			ORDER BY ${order} DESC
		`;
	

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

		// nenhum dado encontrado
		result({ kind: "not_found" ,message:"nenhum registro encontrado"}, null);
	});
};


module.exports = Post;
