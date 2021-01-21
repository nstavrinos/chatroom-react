import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import Messages from '../Messages/Messages';
const ENDPOINT = 'localhost:5000';

let socket;
//const username="User";
var username = prompt("Please enter your nickname", "User");
const Chat = () => {

  const [msg, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    socket = io(ENDPOINT);

    socket.emit('join', "join") ;

  }, []);

  useEffect(() => {
    socket.on('message', message => {
  
      if(message.length){
        for(var i=0  ; i<message.length; i++){
       setMessages(messages => [ ...messages, message[i]]);}}
    });

}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    console.log(msg);
    if(msg) {
      socket.emit('chatMessage', {username:username,message:msg});
    }
    setMessage('');
    
  }

  return (
    <section className="msger">
    <header className="msger-header">
      <div className="msger-header-title">
        <i className="fas fa-comment-alt"></i> Chat Room
      </div>
      <div className="msger-header-options">
        <span><i className="fas fa-cog"></i></span>
      </div>
    </header>
  <Messages messages={messages} />
    <form id="msger-inputarea">
    <input
      id="msgerinput"
      type="text"
      placeholder="Enter your message..."
      value={msg}
      onChange={({ target: { value } }) =>  setMessage(value)}
    />
    <button className="msger-send-btn" onClick={e =>sendMessage(e) }>Send</button>
  </form>
  </section>
  );
}

export default Chat;
