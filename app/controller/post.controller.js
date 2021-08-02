const Post = require("../model/post.model.js");

// Cria e salva um novo post
// TODO criar endpoint para uma requisicao do tipo POST 
exports.create = (req, res) => {
	 // valida request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
	}

	// Create a post
	const post = new Post({
		id: req.body.id,
		title: req.body.title,
		author: req.body.author,
		created_timestamp: req.body.created_timestamp,
		up_votes: req.body.up_votes,
		comments: req.body.comments
	});

	// salva no banco
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

// busca todos os posts em um intervalo de data
// recebe startDate e endDate
// opcionalmente recebe a ordem a ser retornada
exports.findByDate = (req, res) => {
	let order;
	let start = req.params.startDate;
	let end = req.params.endDate;
	let valid = false;
	//validação de datas
	if (new Date(start).toString() !== "Invalid Date" && new Date(end).toString() !== "Invalid Date") {
		if (new Date(start).toISOString().includes(start) && new Date(end).toISOString().includes(end)) {
			valid = true;
		}
	}
	if (!valid){
		res.status(500).send({message:"Parametros de data inválidos"});
	}else{
		//caso nao seja pedido uma ordem especifica, ordena por por data de criacao
		if (req.params.order === undefined) {
			order = "created_timestamp";
		}else if (req.params.order==="ups" || req.params.order === "comments") {
			//decide se sera ordenado por upvotes ou comentarios
			order = req.params.order;
			if (order ==="ups") {
				order = "up_votes"; //setando nome correto do campo da tabela
			}
		}else{
			res.status(500).send({message:"Ordem invalida"});	
			return;
		}
		//busca os dados no banco
		Post.getAllByDate(start, end, order, (err, data) => {
			if (err){
				console.log(err);
				res.status(500).send({
					message:
						err.message || "Erro inesperado ao buscar posts"
				});
			}else{ 
				//devolve ao controlador
				res.send(data);
			}
		});
	}
};

//busca todos os autores junto com a quantidade de ups e comentarios de cada um
// agrega ups e comentarios 
//recebe a ordem a ser retornada
exports.findAuthors = (req, res) => {
	let order;
	//valida o parametro de ordenação
	if (!req.params.order) {
		res.status(500).send({message:"Parametros inválidos"});
	}else{
		if (req.params.order==="ups" || req.params.order === "comments") {
			order = req.params.order;
			if (order ==="ups") {
				order = "up_votes"; //seta o nome correto do campo da tabela
			}
		}else{
			res.status(500).send({message:"Ordem invalida"});	
			return;
		}
		// busca os autores no banco
		Post.getAuthors(order,(err, data) => {
			if (err){
				console.log(err);
				res.status(500).send({
					message:
						err.message || "Erro inesperado ao buscar autores."
				});
			}else{ 
				//devolve os dados ao controlador
				res.send(data);
			}
		});
	}
};

