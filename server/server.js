const path = require("path");
const mysql = require('mysql');
var express = require('express');
var nodemailer = require('nodemailer');
var crypto = require('crypto');

var app = express();
const port = 3002

var poolCluster = mysql.createPool({
  host: '107.180.109.38',
  user: 'user',
  password: 'pass',
  database: 'ScavDB',
  connectionLimit: 100,
  queueLimit: 150
});

const connectionDetails = {
  host: '107.180.109.38',
  user: 'user',
  password: 'pass',
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

app.all('/getChallenges', (req, res)=>{
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

app.all('/getEmails', (req, res)=>{
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

app.all('/login', (req, res)=>{
  queryDB('SELECT Title FROM `Challenges` ORDER BY ID ASC', (err, rows) => {
    if(err) throw err;
  res.send(rows)
  });
})

app.all('/getQuestions1', (req, res)=>{
  queryDB('SELECT Question, TextAnswer, `Order` FROM `Challenge1` ORDER BY `Order` ASC', (err, rows) => {
    if(err) throw err;
    res.send(rows)
  });
})
app.all('/getQuestions2', (req, res)=>{
  queryDB('SELECT Question, TextAnswer, `Order` FROM `Challenge2` ORDER BY `Order` ASC', (err, rows) => {
    if(err) throw err;
  res.send(rows)
  });
})
app.all('/getQuestions3', (req, res)=>{
  queryDB('SELECT Question, TextAnswer, `Order` FROM `Challenge3` ORDER BY `Order` ASC', (err, rows) => {
    if(err) throw err;
  res.send(rows)
  });
})
app.all('/getQuestions4', (req, res)=>{
  queryDB('SELECT Question, TextAnswer, `Order` FROM `Challenge4` ORDER BY `Order` ASC', (err, rows) => {
    if(err) throw err;
    
  res.send(rows)
  });
})

app.all('/getAnswers1', (req, res)=>{
  queryDB('SELECT UserID, Score, Answers FROM `Leaderboard1` ORDER BY Score ASC', (err, rows) => {
    if(err) throw err;
    for(i=0; i<rows.length; i++){
      rows[i]["Answers"] = JSON.parse(rows[i]["Answers"]);
    }
    console.log(rows[0]["Answers"][0])
  res.send(rows)
  });
})
app.all('/getAnswers2', (req, res)=>{
  queryDB('SELECT UserID, Score, Answers FROM `Leaderboard2` ORDER BY Score ASC', (err, rows) => {
    if(err) throw err;
    for(i=0; i<rows.length; i++){
      rows[i]["Answers"] = JSON.parse(rows[i]["Answers"]);
    }
  res.send(rows)
  });
})
app.all('/getAnswers3', (req, res)=>{
  queryDB('SELECT UserID, Score, Answers FROM `Leaderboard3` ORDER BY Score ASC', (err, rows) => {
    if(err) throw err;
    for(i=0; i<rows.length; i++){
      rows[i]["Answers"] = JSON.parse(rows[i]["Answers"]);
    }
    res.send(rows)
  });
  
})
app.all('/getAnswers4', (req, res)=>{
  queryDB('SELECT UserID, Score, Answers FROM `Leaderboard4` ORDER BY Score ASC', (err, rows) => {
    if(err) throw err;
  for(i=0; i<rows.length; i++){
    rows[i]["Answers"] = JSON.parse(rows[i]["Answers"]);
  }
  res.send(rows)
  });
})

app.all('/getPlayers', (req, res)=>{
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

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/../build/index.html'));
});

// start the server listening for requests
app.listen(process.env.PORT || port, 
	() => console.log("Server is running..."));