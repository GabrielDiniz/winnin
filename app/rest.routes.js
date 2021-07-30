module.exports = app => {
  const hot_posts = require("../controllers/post.controller.js");

  
  // Retrieve all Customers
  app.get("/customers", customers.findAll);

  // Retrieve a single Customer with customerId
  app.get("/customers/:customerId", customers.findOne);

  
};