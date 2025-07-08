import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function Chat({ username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");

  useEffect(() => {
    socket.emit("join_room", room);

    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });

    socket.on("typing", ({ username }) => {
      setTypingStatus(`${username} is typing...`);
      setTimeout(() => setTypingStatus(""), 1500);
    });

    return () => {
      socket.disconnect();
    };
  }, [room]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date().toLocaleTimeString(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  const handleTyping = () => {
    socket.emit("typing", { room, username });
  };

  return (
    <div>
      <h3>Room: {room}</h3>
      <div style={{ height: "250px", overflowY: "scroll", border: "1px solid gray", padding: "10px", marginBottom: "10px" }}>
        {messageList.map((msg, index) => (
          <p key={index}><strong>{msg.author}</strong>: {msg.message} <small>{msg.time}</small></p>
        ))}
      </div>
      <p style={{ color: "gray" }}>{typingStatus}</p>
      <input
        type="text"
        value={currentMessage}
        placeholder="Type message"
        onChange={(e) => setCurrentMessage(e.target.value)}
        onKeyDown={handleTyping}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
