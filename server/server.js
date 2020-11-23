const path = require("path");
const mysql = require('mysql');
var express = require('express');
var nodemailer = require('nodemailer');
var crypto = require('crypto');

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
const port = 3002

var poolCluster = mysql.createPool({
  host: '107.180.109.38',
  user: 'kirky',
  password: 'Kirk2208',
  database: 'ScavDB',
  connectionLimit: 100,
  queueLimit: 150
});

const connectionDetails = {
  host: '107.180.109.38',
  user: 'kirky',
  password: 'Kirk2208',
  database: 'ScavDB',
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

app.get('/getChallenges', (req, res)=>{
  queryDB('SELECT Title, Rewards, Price, ImageLink FROM `Challenges` ORDER BY ID ASC', (err, rows) => {
    if(err) throw err;
  res.send(rows)
  });
})

app.all('/login', (req, res)=>{
  queryDB('SELECT User, Pass FROM `Admin`', (err, rows) => {
    if(err) throw err;
    if(req.body.user == rows[0]["User"] && req.body.pass == rows[0]["Pass"]){
        res.send(JSON.parse('{"result":1}'))
      }else{
        res.send(JSON.parse('{"result":0}'))
      }    
  });
})

app.get('/getEmails', (req, res)=>{
  queryDB('SELECT Email FROM `Users` ORDER BY Email ASC', (err, rows) => {
    if(err) throw err;
  res.send(rows)
  });
})

app.all('/editChallenge', (req, res)=>{
  queryDB('UPDATE `Challenges` SET Title= "'+req.body.name+'", Rewards="'+req.body.rewards+'", ImageLink="'+req.body.image+'", Price='+req.body.price+' WHERE ID ='+(req.body.ch), (err, rows) => {
    if(err) throw err;
  res.send(rows)
  });
})

app.get('/login', (req, res)=>{
  queryDB('SELECT Title FROM `Challenges` ORDER BY ID ASC', (err, rows) => {
    if(err) throw err;
  res.send(rows)
  });
})

app.get('/getQuestions1', (req, res)=>{
  queryDB('SELECT Question, TextAnswer, `Order` FROM `Challenge1` ORDER BY `Order` ASC', (err, rows) => {
    if(err) throw err;
    res.send(rows)
  });
})
app.get('/getQuestions2', (req, res)=>{
  queryDB('SELECT Question, TextAnswer, `Order` FROM `Challenge2` ORDER BY `Order` ASC', (err, rows) => {
    if(err) throw err;
  res.send(rows)
  });
})
app.get('/getQuestions3', (req, res)=>{
  queryDB('SELECT Question, TextAnswer, `Order` FROM `Challenge3` ORDER BY `Order` ASC', (err, rows) => {
    if(err) throw err;
  res.send(rows)
  });
})
app.get('/getQuestions4', (req, res)=>{
  queryDB('SELECT Question, TextAnswer, `Order` FROM `Challenge4` ORDER BY `Order` ASC', (err, rows) => {
    if(err) throw err;
    
  res.send(rows)
  });
})

app.get('/getAnswers1', (req, res)=>{
  queryDB('SELECT UserID, Score, Answers FROM `Leaderboard1` ORDER BY Score ASC', (err, rows) => {
    if(err) throw err;
    for(i=0; i<rows.length; i++){
      rows[i]["Answers"] = JSON.parse(rows[i]["Answers"]);
    }
    console.log(rows[0]["Answers"][0])
  res.send(rows)
  });
})
app.get('/getAnswers2', (req, res)=>{
  queryDB('SELECT UserID, Score, Answers FROM `Leaderboard2` ORDER BY Score ASC', (err, rows) => {
    if(err) throw err;
    for(i=0; i<rows.length; i++){
      rows[i]["Answers"] = JSON.parse(rows[i]["Answers"]);
    }
  res.send(rows)
  });
})
app.get('/getAnswers3', (req, res)=>{
  queryDB('SELECT UserID, Score, Answers FROM `Leaderboard3` ORDER BY Score ASC', (err, rows) => {
    if(err) throw err;
    for(i=0; i<rows.length; i++){
      rows[i]["Answers"] = JSON.parse(rows[i]["Answers"]);
    }
    res.send(rows)
  });
  
})
app.get('/getAnswers4', (req, res)=>{
  queryDB('SELECT UserID, Score, Answers FROM `Leaderboard4` ORDER BY Score ASC', (err, rows) => {
    if(err) throw err;
  for(i=0; i<rows.length; i++){
    rows[i]["Answers"] = JSON.parse(rows[i]["Answers"]);
  }
  res.send(rows)
  });
})

app.get('/getPlayers', (req, res)=>{
  queryDB('SELECT ID, FirstName, LastName, Email FROM `Users`', (err, rows) => {
    if(err) throw err;
    for(i=0; i<rows.length; i++){
      rows[i]["FirstName"] = (new Buffer(rows[i]["FirstName"], 'base64')).toString('ascii');
      rows[i]["LastName"] = (new Buffer(rows[i]["LastName"], 'base64')).toString('ascii');
      rows[i]["Email"] = (new Buffer(rows[i]["Email"], 'base64')).toString('ascii');
    }
    console.log(rows)
    res.send(rows)
  });
})

app.all('/editQuestion', (req, res) => {
  id = req.body.id
  query = 'UPDATE `Challenge'+(req.body.ch+1)+'` SET Question="'+req.body.ques+'", TextAnswer='+req.body.tans+' WHERE `Order`='+id
  console.log(req)
  queryDB(query, (err, rows) => {
    if(err) throw err;
  res.send(rows)
  });
})

app.all('/deleteQuestion', (req, res) => {
  id = req.body.id
  query = 'DELETE FROM `Challenge'+(req.body.ch+1)+'` WHERE `Order`='+id
  console.log(req)
  queryDB(query, (err, rows) => {
    if(err) throw err;
  res.send(rows)
  });
})

app.all('/addQuestion', (req, res) => {
  nextId = req.body.nQues
  query = 'INSERT INTO `Challenge'+(req.body.ch+1)+'` (Question, TextAnswer, `Order`) VALUES ("", 0, '+nextId+')'
  console.log(query)
  queryDB(query, (err, rows) => {
    if(err) throw err;
  res.send(rows)
  });
})

app.all('/message', (req, res)=>{
  sendEmail(req.body.floop, req.body.from);
  console.log("leo is giga-jigalo")
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