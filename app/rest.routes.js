module.exports = app => {
  const hot_posts = require("./controller/post.controller.js");

  
  // Retrieve all Customers
  app.get("/hot-posts/start-datetime/:timestampStart/end-datetime/:timestampEnd/:order?", hot_posts.findByTimestamp);

  // Retrieve a single Customer with customerId
  app.get("/authors/order/:order", hot_posts.findAuthors);

  
};