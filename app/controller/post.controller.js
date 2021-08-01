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
exports.findByDate = (req, res) => {
	let order;
	let start = req.params.startDate;
	let end = req.params.endDate;
	let valid = false;
	if (new Date(start).toString() !== "Invalid Date" && new Date(end).toString() !== "Invalid Date") {
		if (new Date(start).toISOString().includes(start) && new Date(end).toISOString().includes(end)) {
			valid = true;
		}
	}
	if (!valid){
		res.status(500).send({message:"Parametros de data inválidos"});
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
		console.log(order);
		Post.getAllByDate(start, end, order, (err, data) => {
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

