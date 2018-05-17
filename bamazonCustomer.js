var inquirer = require("inquirer")
var mysql = require("mysql");
var stock;
// i was thinking about adding a npm table but no time
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "bamazon_db"
});

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
  });
}

function updateProduct(productId, amount) {
    connection.query(
      "UPDATE products SET stock_quantity = stock_quantity - " +amount+ " WHERE item_id = " + productId + ""
      ,
      function(err, res) {
        if (err) throw err;
        // display the price for the item as well
        displayPrice(productId, amount);
      }
    );
}

function checkStock(productId) {
  connection.query(
    "SELECT stock_quantity FROM products WHERE item_id = " + productId,
    function(err,res) {
      if (err) throw err;
      stock = res[0].stock_quantity;
    }
  )
}

function displayPrice(productId, amount) {
  connection.query(
    "SELECT price FROM products WHERE item_id = " + productId,
    function(err,res) {
      if (err) throw err;
      console.log("Your total today is: $" + parseInt(res[0].price)*amount);
      connection.end();
    }
  )
}

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readProducts(); // need to fix this so its ~prettier
  setTimeout(function() { // so inquirer displays after the items
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
    .then(function(r) {
      // sql calls/checks here. there will eventually be a whole CRUD process
      console.log("checking item stock...");
      connection.query(
        "SELECT stock_quantity FROM products WHERE item_id = " + r.product_id
      ,
        function(err,res) { // asynchronous calls go F urself
          if (err) throw err;
          stock = res[0].stock_quantity;
          console.log(stock);
          if (parseInt(r.amount) > parseInt(stock)) {
            console.log("I'm sorry, we don't have enough of that item! Try again.");
            connection.end();
            return;
          } else {
            updateProduct(r.product_id, r.amount);
          };
        }
      )
      
      
    });
  }, 100);
});