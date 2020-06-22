import React, { useEffect, useState } from "react";

import { db } from "../../services/firebase";

function ChatRoom(props) {
  const { roomName, username } = props;
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      db.ref(`rooms/${roomName}`).on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        setChats(chats);
      });
    } catch (error) {
      console.log("get message error", error.message);
    }
  }, [roomName]);

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await db.ref(`rooms/${roomName}`).push({
        name: username,
        message: message,
      });
      setMessage("");
    } catch (error) {
      console.log("handleSubmit error", error.message);
    }
  };

  const handleChangeInput = (e) => {
    const value = e.target.value;
    setMessage(value);
  };

  const scrollToBottom = () => {
    const scrollingElement = document.querySelector(".chat-wrapper");
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
  };

  return (
    <div className="step4">
      <h2>ห้อง {roomName}</h2>
      <div className="container-chat">
        <div className="chat-wrapper">
          {chats.map((chat, index) => {
            const isMe = username === chat?.name;
            return (
              <div
                className={`chat-box ${isMe && "chat-box-right"}`}
                key={index}
              >
                <p className="chat-name">คุณ {chat?.name}</p>
                <div className="chat-message">{chat?.message}</div>
              </div>
            );
          })}
        </div>
        <div className="input-message-wrapper">
          <form onSubmit={handleSubmit}>
            <input value={message} onChange={handleChangeInput} autoFocus />
            <span type="submit">Enter เพื่อส่ง</span>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ChatRoom;
