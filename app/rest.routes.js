module.exports = app => {
  const hot_posts = require("./controller/post.controller.js");

  
  // Retrieve all Customers
  app.get("/hot-posts/start-date/:startDate/end-date/:endDate/:order?", hot_posts.findByDate);

  // Retrieve a single Customer with customerId
  app.get("/authors/order/:order", hot_posts.findAuthors);

  
};