import React, { useEffect, useState, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
import './ChatPage.css';

function ChatPage() {
  const [connection, setConnection] = useState(null);
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (chat.length > 0) {
        const confirmationMessage = 'Do you want to clear the chat?';
        e.preventDefault();
        e.returnValue = confirmationMessage;
        const shouldClear = window.confirm(confirmationMessage);
        if (shouldClear) {
          localStorage.removeItem('chatHistory');
          setChat([]);
        }
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [chat]);

  useEffect(() => {
    if (isConnected) {
      localStorage.setItem('chatHistory', JSON.stringify(chat));
    }
  }, [chat, isConnected]);

  useEffect(() => {
    if (isConnected && user) {
      const savedChat = localStorage.getItem('chatHistory');
      if (savedChat) setChat(JSON.parse(savedChat));

      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl(`http://localhost:5158/chatHub?user=${user}`)
        .withAutomaticReconnect()
        .build();

      setConnection(newConnection);

      newConnection.start()
        .then(() => {
          console.log("Connected to SignalR");

          newConnection.on("ReceiveMessage", (sender, msgText) => {
            setChat(prev => [
              ...prev,
              {
                user: sender,
                message: msgText,
                timestamp: new Date().toLocaleTimeString(),
                isSystem: msgText.includes("joined the chat") || msgText.includes("left the chat"),
                seenBy: null
              }
            ]);
          });

          newConnection.on("UserSeenMessage", (seenByUser) => {
            setChat(prev =>
              prev.map(msg =>
                msg.user === user && !msg.isSystem ? { ...msg, seenBy: seenByUser } : msg
              )
            );
          });

          newConnection.on("UpdateUserCount", count => {
            setUserCount(count);
          });

          newConnection.invoke("SendMessage", user, `${user} joined the chat`);
        })
        .catch(err => console.error("Connection error:", err));

      const handleUnload = () => {
        if (newConnection.state === "Connected") {
          newConnection.invoke("SendMessage", user, `${user} left the chat`);
        }
      };
      window.addEventListener("beforeunload", handleUnload);
      return () => window.removeEventListener("beforeunload", handleUnload);
    }
  }, [isConnected, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    if (connection && connection.state === "Connected") {
      try {
        await connection.invoke("SendMessage", user, message);
        setMessage('');
      } catch (err) {
        console.error("Send error:", err);
      }
    }
  };

  const handleUserNameSubmit = () => {
    if (user.trim()) {
      setIsConnected(true);
    } else {
      alert("Please enter your name.");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        Chat With EveryOne
        <div style={{ fontSize: "0.85rem", marginTop: "5px" }}>
          🟢 Active Users: {userCount}
        </div>
      </div>

      {!isConnected ? (
        <div className="chat-user-setup">
          <input
            className="user-input"
            placeholder="Enter your name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <button className="send-button" onClick={handleUserNameSubmit}>Join Chat</button>
        </div>
      ) : (
        <>
          <div className="chat-body">
            {chat.length === 0 ? (
              <div className="empty-chat">No messages yet</div>
            ) : (
              chat.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-bubble ${
                    msg.isSystem
                      ? 'system-message'
                      : msg.user === user
                      ? 'sent'
                      : 'received'
                  }`}
                >
                  <div className="chat-user">{msg.user}</div>
                  <div className="chat-message">{msg.message}</div>
                  <div className="chat-timestamp">{msg.timestamp}</div>
                  {msg.user === user && !msg.isSystem && (
                    <div className={`chat-status ${msg.seenBy ? "seen" : "unseen"}`}>
                      {msg.seenBy ? `✔✔ Seen` : '✔ Sent'}
                    </div>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef}></div>
          </div>

          <div className="chat-footer">
            <input
              type="text"
              className="message-input"
              placeholder="Type a message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
            />
            <button className="send-button" onClick={sendMessage}>Send</button>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatPage;
