import React, { useState } from "react";
import Chat from "./Chat";

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      setShowChat(true);
    }
  };

  return (
    <div className="App" style={{ textAlign: "center", padding: "30px" }}>
      {!showChat ? (
        <>
          <h2>Join a Chat Room</h2>
          <input
            type="text"
            placeholder="Your Name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br /><br />
          <input
            type="text"
            placeholder="Room ID"
            onChange={(e) => setRoom(e.target.value)}
          />
          <br /><br />
          <button onClick={joinRoom}>Join Chat</button>
        </>
      ) : (
        <Chat username={username} room={room} />
      )}
    </div>
  );
}

export default App;
