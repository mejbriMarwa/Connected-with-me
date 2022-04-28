import React from "react";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import chatEmoji from "./chatEmoji.png";
import "../style/main.css";
const socket = io.connect("http://localhost:8000");
const JoinChat = () => {
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [room, setRoom] = useState("");

  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  return (
    <div>
      {!showChat ? (
        <div className="joinChatGroup">
          <div className="Part1">
            <h3>Join A Chat</h3>
            <input
              type="url"
              placeholder="put your url image.."
              required
              onChange={(event) => {
                setImage(event.target.value);
              }}
            />{" "}
            <br />
            <input
              type="text"
              placeholder="John..."
              required
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />{" "}
            <br />
            <input
              type="text"
              placeholder="Room ID..."
              required
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />{" "}
            <br />
            <button onClick={joinRoom}>Join a room</button>
          </div>
          <div className="Part2">
            <img src={chatEmoji} />
          </div>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} image={image} />
      )}
    </div>
  );
};

export default JoinChat;
