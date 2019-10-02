var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "jimmy1121",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    display();
    //connection.end();
});

function display() {
    connection.query(
        "SELECT * FROM products",
        ['Books'],
        function (err, res) {
            if (err) throw err;
            //set the index column to the id column
            var transformed = res.reduce((acc, {item_id, ...x}) => { acc[item_id] = x; return acc}, {})
            console.table(transformed);
            questions();
        }
    );
}

function questions() {
    inquirer.prompt([
        {
            type: "input",
            name: "itemID",
            message: "Please enter the index of the product you would like to purchase:",
        },
        {
            type: "input",
            name: "number",
            message: "How many would you like to buy?"
        }
    ]).then(function (res) {
        var amount = parseInt(res.number);
        var id = parseInt(res.itemID);
        connection.query (
            "SELECT stock_quantity FROM products WHERE item_id = ?",
            [id],
            function (err, result){
                if (err) throw err;
                if(result[0].stock_quantity - amount < 0) {
                    console.log("Insufficient quantity!");
                    connection.end();
                }
                else
                {
                    var num = result[0].stock_quantity - amount;
                    connection.query(
                        "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
                        [num, id],
                        function(error, outcome){
                            if (error) throw error;
                            connection.query(
                                "SELECT price FROM products WHERE item_id = ?",
                                [id],
                                function(e,r)
                                {
                                    if(e) throw e;
                                    console.log("Your total will be $" + r[0].price*amount);
                                    console.log("Thank you for shopping at Bamazon.");
                                    connection.end();
                                }
                            )
                        }
                    )
                }
            });

    });
}
