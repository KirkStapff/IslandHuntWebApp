const path = require("path");
const mysql = require('mysql');
var express = require('express');
const bodyParser = require('body-parser');



var app = express();
const port = 3003

var poolCluster = mysql.createPool({
  host: '213.171.200.102',
  user: 'kirk.stapff',
  password: 'Tittymilk12',
  database: 'BosomBuddiesAuctions',
  connectionLimit: 15,
  queueLimit: 30
});

const connection = mysql.createConnection({
  host: '213.171.200.102',
  user: 'kirk.stapff',
  password: 'Tittymilk12',
  database: 'BosomBuddiesAuctions'
});

var queryDB = function(query, cb) {
  poolCluster.getConnection(function(err, connection) {
      if(err) {
          cb(err, null);
      }
      else {
          connection.query(query, function (err, rows) {
              connection.release();
              cb(err, rows);
          });
      }
  });
};

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/test', (req, res)=>{
  queryDB('SELECT ungrouped.* FROM Bids ungrouped INNER JOIN (SELECT Item, MAX(Bid) AS MaxBid FROM Bids GROUP BY Item) grouped ON ungrouped.Item = grouped.Item AND ungrouped.Bid = grouped.MaxBid ORDER BY Item ASC', (err, rows) => {
    if(err) throw err;

    res.send(rows)
  });
})

app.all('/bid', (req, res) => {
  query = 'INSERT INTO `BosomBuddiesAuctions`.`Bids` (`Item`, `Name`, `House`, `Bid`) VALUES ("'+req.body.item+'", "'+req.body.name+'", "'+req.body.house+'", "'+req.body.bid+'")';

  queryDB(query, (err, rows) => {
    if(err){
       console.log("ring ting tong");
    }    
  })
  console.log(query)
})

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/../build/index.html'));
});

// start the server listening for requests
app.listen(process.env.PORT || port, 
	() => console.log("Server is running..."));