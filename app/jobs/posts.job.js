const Post = require("../model/post.model.js");
const fetch = require('node-fetch');
const config = require("../../config/app.config.js");
let jobConf = config.job;

exports.execute = () => {
	let settings = {
		method: jobConf.method,
	}
	var posts = fetch(jobConf.url, settings)
    .then(res => res.json())
    .then((json) => {
		json.data.children.forEach(post => {
			post= post.data;
			newPost = new Post({
				title: post.title,
				author: post.author,
				created_timestamp: new Date(parseInt(post.created)*1000).toISOString().slice(0, 19).replace('T', ' '),
				up_votes: post.ups,
				comments: post.num_comments
			});

			Post.create(newPost,(err, data) => {
				if (err){
					//
				}
			});

		});
	})
}