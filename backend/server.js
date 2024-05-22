/**
 * Express server for Galactic Store backend.
 * @module server
 */

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Create connection to database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    multipleStatements: true,
});

const port = process.env.PORT || 8801;

app.get("/", (req, res) => {
    res.send("Hello from the Galactic Store backend!");
});

//get user type from axiosSecure.get(`/users?email=${email}`)
app.get("/users", (req, res) => {
    /**
     * The email address obtained from the request query.
     * @type {string}
     * value can be * for all attributes of user or specific attribute like UserType
     */
    const email = req.query.email;
    const value = req.query.value;
    db.query(
        `SELECT ${value} FROM user WHERE Email_ID = "${email}"`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

// get product by id
app.get("/product/:id", (req, res) => {
    const id = req.params.id;
    db.query(
        `SELECT * FROM product WHERE Product_ID = "${id}"`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

//get products by attributes exaxmple axiosSecure.get(`/products?attributes=Name,Price,Image_Url,Description`)
app.get("/products", (req, res) => {
    const attributes = req.query.attributes;
    db.query(`SELECT ${attributes} FROM product`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//get products through serach query example: axiosSecure.get(`/products/search?param=${searchParam}`)
app.get("/products/search", (req, res) => {
    const search = req.query.param;
    const likeSearch = "%" + search + "%";
    db.query(
        "SELECT * FROM product WHERE Name LIKE ? OR Planet_source LIKE ? OR Galaxy_source LIKE ?",
        [likeSearch, likeSearch, likeSearch],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

//get products in cart example axiosSecure.get(`/cart?email=${email}`)

app.get("/cart", (req, res) => {
    const email = req.query.email;
    db.query(
        `SELECT p.Product_ID, p.Image_Url, p.Name, p.Price, od.Quantity, od.Quantity * p.Price AS ProductTotal, (SELECT SUM(od2.Quantity * p2.Price) FROM OrderDetails od2 JOIN product p2 ON od2.ProductID = p2.Product_ID WHERE od2.OrderID = od.OrderID) AS CartTotal FROM OrderDetails od JOIN product p ON od.ProductID = p.Product_ID JOIN Cart c ON od.OrderID = c.OrderID WHERE c.Status = 'open' AND c.Email = "${email}"`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

//get order history example axiosSecure.get(`/orderHistory?email=${email}`)
app.get("/orderHistory", (req, res) => {
    const email = req.query.email;
    db.query(
        `SELECT p.Product_ID, p.Image_Url, p.Name, p.Price, od.Quantity, od.Quantity * p.Price AS ProductTotal, od.Status
        FROM OrderDetails od JOIN product p ON od.ProductID = p.Product_ID JOIN Cart c ON od.OrderID = c.OrderID WHERE c.Status = 'closed' AND c.Email = "${email}"`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

//get all orderHistory example axiosSecure.get(`/allOrderHistory`)
app.get("/allOrderHistory", (req, res) => {
    db.query(
        `SELECT p.Product_ID, p.Image_Url, p.Name, p.Price, od.Quantity, od.Quantity * p.Price AS ProductTotal, od.Status, c.Email, CONCAT(u.F_Name, ' ', u.L_Name) AS CustomerName, od.OrderID
        FROM OrderDetails od JOIN product p ON od.ProductID = p.Product_ID JOIN Cart c ON od.OrderID = c.OrderID JOIN user u on u.Email_ID = c.Email 
        WHERE c.Status = 'closed' ORDER BY
            CASE 
                WHEN od.Status = 'Pending' THEN 1 
                WHEN od.Status = 'Shipped' THEN 2 
                WHEN od.Status = 'Delivered' THEN 3 
                ELSE 4 
            END`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

//get 3 of the most sold products example axiosSecure.get(`/bestSellers`)
app.get("/bestSellers", (req, res) => {
    db.query(
        `SELECT p.Product_ID, p.Image_Url, p.Name, p.Price, p.Quantity_inStock, p.Galaxy_source, p.Galaxy_source, p.Planet_source, SUM(od.Quantity) AS TotalSold
        FROM OrderDetails od JOIN product p ON od.ProductID = p.Product_ID JOIN Cart c ON od.OrderID = c.OrderID
        WHERE c.Status = 'closed'
        GROUP BY od.ProductID
        ORDER BY TotalSold DESC
        LIMIT 5`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

// create new user
// Handle POST requests to /users
app.post("/users", (req, res) => {
    const user = req.body;
    const query =
        "INSERT INTO user (Email_ID, User_Type, F_Name, L_Name, Contact_Cell) VALUES (?, ?, ?, ?, ?)";
    const values = [
        user.Email_ID,
        user.User_Type,
        user.F_Name,
        user.L_Name,
        user.Contact_Cell,
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Server error");
        } else {
            res.status(200).send("User added successfully");
        }
    });
});

// add product to db
app.post("/products", (req, res) => {
    const product = req.body;
    const query =
        "INSERT INTO product (Name, Price, Planet_source, Galaxy_source, Quantity_inStock, Image_Url, Description) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [
        product.Name,
        product.Price,
        product.Planet,
        product.Galaxy,
        product.Quantity_Stock,
        product.Image,
        product.Description,
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Server error");
        } else {
            res.status(200).send("Product added successfully");
        }
    });
});

//add to cart example axiosSecure.post(`/cart?email=${email}&productID=${productID}&quantity=${quantity}`)

app.post("/cart", (req, res) => {
    const email = req.query.email;
    const productID = req.query.productID;
    const quantity = req.query.quantity;

    const query = `
      SELECT OrderID
      INTO @order_id
      FROM
      (
        SELECT OrderID
        FROM Cart
        WHERE Email = ? AND Status = 'open'
        LIMIT 1
      ) temp_table;

      SET @order_id = COALESCE(@order_id, UUID());

      INSERT INTO Cart (Email, OrderID)
      SELECT ?, @order_id
      FROM DUAL
      WHERE NOT EXISTS (
        SELECT 1 FROM Cart
        WHERE Email = ? AND OrderID = @order_id
      );

      SELECT COALESCE(Quantity, 0)
      INTO @existing_quantity
      FROM OrderDetails
      WHERE OrderID = @order_id AND ProductID = ?
      LIMIT 1;

      INSERT INTO OrderDetails (OrderID, ProductID, Email, Quantity)
      VALUES (@order_id, ?, ?,
              CASE
                WHEN @existing_quantity > 0 THEN @existing_quantity + ?
                ELSE ?
              END
      )
      ON DUPLICATE KEY UPDATE Quantity = VALUES(Quantity);

      UPDATE product
      SET Quantity_inStock = Quantity_inStock - ?
      WHERE Product_ID = ?;
    `;

    db.beginTransaction((err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            db.query(
                query,
                [
                    email,
                    email,
                    email,
                    productID,
                    productID,
                    email,
                    quantity,
                    quantity,
                    quantity,
                    productID,
                ],
                (err, result) => {
                    if (err) {
                        console.error(err);
                        db.rollback();
                        res.status(500).json({
                            error: "Internal Server Error",
                        });
                    } else {
                        db.commit((err) => {
                            if (err) {
                                console.error(err);
                                db.rollback();
                                res.status(500).json({
                                    error: "Internal Server Error",
                                });
                            } else {
                                res.json({
                                    message:
                                        "Product added to cart successfully",
                                });
                            }
                        });
                    }
                }
            );
        }
    });
});

//update user by email
app.put("/user/:email", (req, res) => {
    const email = req.params.email;
    const user = req.body;
    const query =
        "UPDATE user SET Profile_image = ?, F_name = ?, L_name = ?, Contact_cell = ? WHERE Email_ID = ?";
    const values = [
        user.Profile_image,
        user.F_name,
        user.L_name,
        user.Contact_cell,
        email,
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Server error");
        } else {
            res.status(200).send("User updated successfully");
        }
    });
});

//update product by id
app.put("/products/:id", (req, res) => {
    const id = req.params.id;
    const product = req.body;
    const query =
        "UPDATE product SET Name = ?, Price = ?, Planet_source = ?, Galaxy_source = ?, Quantity_inStock = ?, Image_Url = ?, Description = ? WHERE Product_ID = ?";
    const values = [
        product.Name,
        product.Price,
        product.Planet_source,
        product.Galaxy_source,
        product.Quantity_inStock,
        product.Image_Url,
        product.Description,
        id,
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Server error");
        } else {
            res.status(200).send("Product updated successfully");
        }
    });
});

//update cart status example axiosSecure.put(`/cart?email=${email}`)
app.put("/cart", (req, res) => {
    const email = req.query.email;
    const query = `UPDATE Cart
    SET Status = 'closed'
    WHERE Email = ? AND Status = 'open'`;

    db.query(query, email, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Server error");
        } else {
            res.status(200).send("Cart updated successfully");
        }
    });
});

app.put("/allOrderDetails", (req, res) => {
    const orderID = req.body.orderID;
    const productID = req.body.productID;
    const newStatus = req.body.newStatus;
    console.log(orderID, productID, newStatus);
    const query = `UPDATE OrderDetails
    SET Status = ?
    WHERE OrderID = ? AND ProductID = ?`;

    db.query(query, [newStatus, orderID, productID], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Server error");
        } else {
            res.status(200).send("OrderDetails updated successfully");
        }
    });
});

//delete product by id
app.delete("/products/:id", (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM product WHERE Product_ID = ?";
    db.query(query, id, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Server error");
        } else {
            res.status(200).send("Product deleted successfully");
        }
    });
});

//delete from cart example axiosSecure.delete(`/cart?productID=${productId}&email=${user?.email}`)
app.delete("/cart", (req, res) => {
    const email = req.query.email;
    const productID = req.query.productID;

    const query = `
      SELECT OrderID
      INTO @order_id
      FROM Cart
      WHERE Email = ? AND Status = 'open'
      LIMIT 1;

      UPDATE product
      SET Quantity_inStock = Quantity_inStock + (
        SELECT Quantity
        FROM OrderDetails
        WHERE OrderID = @order_id AND ProductID = ?
      )
      WHERE Product_ID = ?;

      
      DELETE FROM OrderDetails
      WHERE OrderID = @order_id AND ProductID = ?;

      -- Delete cart if no products are left in it
        DELETE FROM Cart
        WHERE OrderID = @order_id AND NOT EXISTS (
            SELECT 1 FROM OrderDetails WHERE OrderID = @order_id
        );

    `;

    db.beginTransaction((err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            db.query(query, [email, productID, productID, productID], (err, result) => {
                if (err) {
                    console.error(err);
                    db.rollback();
                    res.status(500).json({
                        error: "Internal Server Error",
                    });
                } else {
                    db.commit((err) => {
                        if (err) {
                            console.error(err);
                            db.rollback();
                            res.status(500).json({
                                error: "Internal Server Error",
                            });
                        } else {
                            res.json({
                                message: "Product removed from cart successfully",
                            });
                        }
                    });
                }
            });
        }
    });
});

/**
 * Starts the server and establishes the database connection.
 * @name listen
 * @function
 * @param {number} port - The port number to listen on.
 * @param {Function} callback - The callback function to execute when the server starts.
 */
app.listen(port, () => {
    console.log(`Server is running on port ${port}\nConnection established`);
});

/**
 * Ends the database connection.
 * @name endConnection
 * @function
 */
const endConnection = () => {
    db.end(console.log("Connection ended"));
};

//end connection
app.get("/endConnection", (req, res) => {
    endConnection();
    res.send("Connection ended");
});