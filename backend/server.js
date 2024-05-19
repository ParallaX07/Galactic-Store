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
    host: "galacticstore.apollo.appboxes.co",
    user: "root",
    password: "CSE311",
    database: "GalacticStore",
    port: 11766
});

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
