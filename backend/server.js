/**
 * Express server for Galactic Store backend.
 * @module server
 */

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Create connection to database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "galactic_store",
});

/**
 * Route for retrieving all users from the database.
 * @name GET /users
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response with the list of users.
 */
app.get("/users", (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, result) => {
        if (err) throw err;
        return res.json(result);
    });
});

app.post("/users", (req, res) => {
    const { fname, lname, email, pass } = req.body;
    /**
     * SQL query for inserting user data into the database.
     * @type {string}
     */
    const sql = "INSERT INTO users (fname, lname, email, pass) VALUES (?, ?, ?, ?)";
    db.query(sql, [fname, lname, email, pass], (err, result) => {
        if (err) throw err;
        return res.json(result);
    });
});


/**
 * Starts the server and establishes the database connection.
 * @name listen
 * @function
 * @param {number} port - The port number to listen on.
 * @param {Function} callback - The callback function to execute when the server starts.
 */
app.listen(8801, () => {
    console.log("Server is running on port 8801\nConnection established");
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

