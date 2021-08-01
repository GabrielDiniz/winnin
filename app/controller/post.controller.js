const Post = require("../model/post.model.js");

// Create and Save a new post
exports.create = (req, res) => {
	 // Validate request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
	}

	// Create a post
	const post = new Post({
		title: req.body.title,
		author: req.body.author,
		created_timestamp: req.body.created_timestamp,
		up_votes: req.body.up_votes,
		comments: req.body.comments
	});

	// Save post in the database
	Post.create(post, (err, data) => {
		if (err){
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the post."
			});
		}else{ 
			res.send(data);
		}
	});
};

// Retrieve all posts from the database.
exports.findByTimestamp = (req, res) => {
	let order;
	if (isNaN( parseInt(req.params.timestampStart)) || isNaN(parseInt(req.params.timestampEnd))){
		res.status(500).send({message:"Parametros inválidos"});
	}else{
		if (req.params.order === undefined) {
			order = "id";
		}else if (req.params.order==="ups" || req.params.order === "comments") {
			order = req.params.order;
			if (order ==="ups") {
				order = "up_votes";
			}
		}else{
			res.status(500).send({message:"Ordem invalida"});	
			return;
		}
		Post.getAllByTimestamp(req.params.timestampStart, req.params.timestampEnd, order, (err, data) => {
			if (err){
				console.log(err);
				res.status(500).send({
					message:
						err.message || "Erro inesperado ao buscar posts"
				});
			}else{ 
				res.send(data);
			}
		});
	}
};


exports.findAuthors = (req, res) => {
	let order;
	if (!req.params.order) {
		res.status(500).send({message:"Parametros inválidos"});
	}else{
		if (req.params.order==="ups" || req.params.order === "comments") {
			order = req.params.order;
			if (order ==="ups") {
				order = "up_votes";
			}
		}else{
			res.status(500).send({message:"Ordem invalida"});	
			return;
		}
		Post.getAuthors(order,(err, data) => {
			if (err){
				console.log(err);
				res.status(500).send({
					message:
						err.message || "Erro inesperado ao buscar autores."
				});
			}else{ 
				res.send(data);
			}
		});
	}
};

