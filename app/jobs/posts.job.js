const Post = require("../model/post.model.js");
const fetch = require('node-fetch');
const config = require("../../config/app.config.js");
let jobConf = config.job; //buscando configurações do sistema

exports.execute = () => {
	let settings = {
		method: jobConf.method,
	}
	// usa node-fetch para buscar os hot-posts
	var posts = fetch(jobConf.url, settings)
    .then(res => res.json()) // converte para json
    .then((json) => {
    	//trata cada post 
		json.data.children.map( (post) => {
			post= post.data;
			//instancia model Post
			newPost = new Post({
				id: post.id,
				title: post.title,
				author: post.author,
				created_timestamp: new Date(parseInt(post.created)*1000).toISOString().slice(0, 19).replace('T', ' '),
				up_votes: post.ups,
				comments: post.num_comments
			});
    		//insere no banco 
			Post.create(newPost,(err, data) => {
				if (err){
					console.log(err)		
				}else{
					
				}
			});

		});
    
	});
}