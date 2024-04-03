const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

// Create connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'galactic_store',
}); 

app.get('/', (req, res) => {
    return res.json("Hello World");
});

app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if (err) throw err;
        return res.json(result);
    });
});

app.listen(8801, () => {
    console.log('Server is running on port 3001');
});

const endConnection = () => {
    db.end(
        console.log('Connection ended')
    );
} 



app.get('/endConnection', (req, res) => {
    endConnection();
    res.send('Connection ended');
});