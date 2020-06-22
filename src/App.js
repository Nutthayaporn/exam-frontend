import React, { useState } from "react";

import bg from "./assets/images/bg.jpg";
import logo from "./assets/images/logo.png";

import EnterName from "./components/Steps/EnterName";
import JoinOrCreateRoom from "./components/Steps/JoinOrCreateRoom";
import EnterRoomName from "./components/Steps/EnterRoomName";
import ChatRoom from "./components/Steps/ChatRoom";

function App() {
  const [step, setStep] = useState(1);
  const [username, setUserName] = useState(null);
  const [typeChat, setTypeChat] = useState(null);
  const [roomName, setRoomName] = useState(null);

  const handleSubmitName = (username) => {
    setUserName(username);
    setStep(2);
  };

  const handleClickTypeChat = (type) => {
    setTypeChat(type);
    setStep(3);
  };

  const handleClickBack = () => {
    setStep(2);
    setTypeChat(null);
  };

  const handleSubmitRoomName = (roomName) => {
    setRoomName(roomName);
    setStep(4);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <EnterName onSubmitName={handleSubmitName} />;
      case 2:
        return <JoinOrCreateRoom username={username} onClickTypeChat={handleClickTypeChat} />;
      case 3:
        return (
          <EnterRoomName
            typeChat={typeChat}
            onClickBack={handleClickBack}
            onSubmitRoomName={handleSubmitRoomName}
          />
        );
      case 4:
        return <ChatRoom roomName={roomName} username={username} />;
      default:
        return;
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="logo-wrapper">
        <img src={logo} alt="proxumer" />
      </div>
      <div className="container">{renderStep()}</div>
    </div>
  );
}

export default App;
