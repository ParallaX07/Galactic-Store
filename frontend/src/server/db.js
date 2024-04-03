var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'https://sql6.freemysqlhosting.net',
  user     : 'sql6696024',
  password : 'xrY7mYfnM1'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});