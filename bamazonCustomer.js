var inquirer = require("inquirer")
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "bamazon_db"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    readProducts(); // need to fix this so its ~prettier
    inquirer.prompt([
    {
      type: "input",
      message: "Choose product id for purchase:",
      name: "product_id"
    },
    {
      type: "input",
      message: "How many of this product would you like to buy?",
      name: "amount"
    }
  ])
  .then(function(inquirerResponse) {
    // sql calls/checks here. there will eventually be a whole CRUD process
    console.log("checking item stock...");
  });
    //readProducts()
  });
  
  
  
  
  
  function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      connection.end();
    });
  }

