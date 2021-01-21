import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message';

const Messages = ({messages}) => {

return(
<ScrollToBottom  className="msger-chat">
{messages.map(({ username, message, time }, index) => (<div key={index}><Message username={username} message={message} time={time}/></div>))}
</ScrollToBottom>
)};

export default Messages;
