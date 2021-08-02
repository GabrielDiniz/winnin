module.exports = app => {
  const hot_posts = require("./controller/post.controller.js");

  //rota simples
  app.get("/", (req, res) => {
    res.json("Hello World!!!");
  });

  // rota para retornar todos os posts em um intervalo de data
  //recebe as datas no formato ISO (2021-01-01) 
  //recebe o parametro opcional de ordenação (ups,comments)
  app.get("/hot-posts/start-date/:startDate/end-date/:endDate/:order?", hot_posts.findByDate);

  // retorna os autores ordenados por numeros de comentarios ou upvotes
  // ordenacao por ups ou comments
  app.get("/authors/order/:order", hot_posts.findAuthors);

  
};