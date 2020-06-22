import React from "react";

function JoinOrCreateRoom(props) {
  const { username } = props;

  return (
    <div className="step2">
      <h2>คุณ {username}</h2>
      <div className="container-menu">
        <button className="primary-btn" onClick={() => props.onClickTypeChat('createRoom')}>
          สร้างห้องใหม่
        </button>
        <div className="button-text" onClick={() => props.onClickTypeChat('joinChat')}>เข้าร่วมแชท</div>
      </div>
    </div>
  );
}

export default JoinOrCreateRoom;
