const path = require("path");
const mysql = require('mysql');
var express = require('express');
var nodemailer = require('nodemailer');

const sendEmail = (message, from)=>{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kirkstapff88@gmail.com',
      pass: 'K!RK@@)*'
    }
  });
  
  var mailOptions = {
    from: from,
    to: 'chrissyinbda@gmail.com',
    subject: 'Bosom Buddies Contact',
    text: message + " -- Message From "+ from
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

var app = express();
const port = 3003

var poolCluster = mysql.createPool({
  host: '213.171.200.102',
  user: 'kirk.stapff',
  password: 'Tittymilk12',
  database: 'BosomBuddiesAuctions',
  connectionLimit: 100,
  queueLimit: 150
});

const connectionDetails = {
  host: '213.171.200.102',
  user: 'kirk.stapff',
  password: 'Tittymilk12',
  database: 'BosomBuddiesAuctions'
}

const connection = mysql.createConnection(connectionDetails);

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

app.all('/message', (req, res)=>{
  sendEmail(req.body.floop, req.body.from);
  console.log(req.body.floop)
  res.send("")
})

app.all('/bid', (req, res) => {
  query = 'SELECT Max(Bid) FROM Bids WHERE Item="'+req.body.item+'"'
  //freshConn = mysql.createConnection(connectionDetails)
  queryDB(query, (err, rows) => {
    if(err){
       console.log("ring ting tong");
    }
    console.log(rows[0]['Max(Bid)']+" < "+req.body.bid)
    if(rows[0]['Max(Bid)'] < req.body.bid){
      query2 = 'INSERT INTO `BosomBuddiesAuctions`.`Bids` (`Item`, `Name`, `House`, `Bid`) VALUES ("'+req.body.item+'", "'+req.body.name+'", "'+req.body.house+'", "'+req.body.bid+'")';
      queryDB(query2, (err, rows) => {
      if(err){
          console.log("ring ting tong");
      }
      console.log(query2)
      res.send(rows)
      })
    }    
  })
})

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/../build/index.html'));
});

// start the server listening for requests
app.listen(process.env.PORT || port, 
	() => console.log("Server is running..."));