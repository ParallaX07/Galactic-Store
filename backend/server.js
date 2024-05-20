/**
 * Express server for Galactic Store backend.
 * @module server
 */

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require('body-parser');
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
    port: process.env.DB_PORT
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

//get products by attributes exaxmple axiosSecure.get(`/products?attributes=Name,Price,Image_Url,Description`)
app.get("/products", (req, res) => {
    const attributes = req.query.attributes;
    db.query(
        `SELECT ${attributes} FROM product`,
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
app.post('/users', (req, res) => {
    const user = req.body;
    const query = 'INSERT INTO user (Email_ID, User_Type, F_Name, L_Name, Contact_Cell) VALUES (?, ?, ?, ?, ?)';
    const values = [user.Email_ID, user.User_Type, user.F_Name, user.L_Name, user.Contact_Cell];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            res.status(200).send('User added successfully');
        }
    });
});

// add product to db
app.post('/products', (req, res) => {
    const product = req.body;
    const query = 'INSERT INTO product (Name, Price, Planet_source, Galaxy_source, Quantity_inStock, Image_Url, Description) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [product.Name, product.Price, product.Planet, product.Galaxy, product.Quantity_Stock, product.Image, product.Description];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            res.status(200).send('Product added successfully');
        }
    });
})


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

/**
 * Route for ending the database connection.
 * @name GET /endConnection
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {string} - Response with "Connection ended" message.
 */
app.get("/endConnection", (req, res) => {
    endConnection();
    res.send("Connection ended");
});
