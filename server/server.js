const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const mysql=require('mysql');
const moment = require('moment');
const cors=require('cors');
const router = require('./router');

const db = mysql.createConnection({
    host: "localhost",
    portt:"3306",
    user: "root",
    password: "rootpassword",
    database : 'new_database'
  });
  
db.connect(function(err) {
    if (err) {
        throw err;
    }
    console.log("Connected!");
 });


const app = express();
const server = http.createServer(app);
//const io = socketio(server);
app.use(cors());
app.use(router);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Run when client connects
io.on('connection', socket => {

  socket.on('join', join_msg => {
    db.query('SELECT * FROM messages', function (error, result) {
        if (error) {
            throw error;
        }

        console.log("new connection");
        socket.emit('message', result);
      });
    });
  // Listen for chatMessage
    socket.on('chatMessage', msg => { 
      msg.time=moment().format('h:mm a');
      let sql = 'insert into messages(username, message,time) values ( ?, ?,?)';
      let values = [msg.username, msg.message, msg.time];
    
    db.query(sql, values, function (err, result) {
        if (err) {
            throw err;
        }
        io.emit('message',[msg]);
      });
   
     });

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));