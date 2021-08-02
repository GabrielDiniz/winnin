module.exports = {
	app:{
		port:8000
	},
	db:{ //configurações do banco
		HOST: "localhost",
		USER: "root",
		PASSWORD: "ak47",
		DB: "winnin_reddit",
	},
	job:{//configurações para busca dos posts
		url:"https://api.reddit.com/r/artificial/hot",
		method:"GET",
		cronHora:"*", 
		cronMinuto:"*",
	}
};