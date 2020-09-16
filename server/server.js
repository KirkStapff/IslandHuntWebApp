const path = require("path");
const mysql = require('mysql');
var express = require('express');

var app = express();
const port = 3000

const connection = mysql.createConnection({
  host: '213.171.200.102',
  user: 'kirk.stapff',
  password: 'Tittymilk12',
  database: 'BosomBuddiesAuctions'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

app.use(express.static(path.join(__dirname, "..", "build")));

app.get('/test', (req, res)=>{
  connection.query('SELECT Item, MAX(Bid) FROM Bids GROUP BY Item', (err,rows) => {
    if(err) throw err;

    res.send(rows)
  });
})

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/../build/index.html'));
});

// start the server listening for requests
app.listen(process.env.PORT || port, 
	() => console.log("Server is running..."));