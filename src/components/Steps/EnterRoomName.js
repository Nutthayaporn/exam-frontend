import React, { useState } from "react";

import { db } from "../../services/firebase";

function EnterRoomName(props) {
  const { typeChat } = props;
  const [inputName, setInputName] = useState(null);
  const [showError, setShowError] = useState(false);

  let title = "";
  let buttonWords = "";
  if (typeChat === "createRoom") {
    title = "สร้างห้องใหม่";
    buttonWords = "ยืนยัน";
  } else if (typeChat === "joinChat") {
    title = "เข้าร่วมแชท";
    buttonWords = "เข้าร่วม";
  }

  const checkExistingRoom = async () => {
    try {
      return db
        .ref(`rooms/${inputName}`)
        .once("value")
        .then(function (snapshot) {
          const isExistingRoom = !!snapshot.val();
          return isExistingRoom;
        });
    } catch (error) {
      console.log("get message error", error.message);
      return false;
    }
  };

  const handleChangeInput = (e) => {
    const value = e.target.value;
    setInputName(value);
    setShowError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputName) {
      setShowError(true);
      return;
    }

    const isExistingRoom = await checkExistingRoom();

    if (typeChat === "createRoom" && isExistingRoom) {
      alert("มีห้องนี้แล้ว กรุณาสร้างห้องด้วยชื่ออื่น");
      return;
    }

    if (typeChat === "joinChat" && !isExistingRoom) {
      alert("ไม่มีชื่อห้องนี้ กรุณาระบุชื่อห้องใหม่อีกครั้ง");
      return;
    }

    props.onSubmitRoomName(inputName);
  };

  return (
    <div className="step3">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChangeInput} autoFocus />
        {showError && <div className="error-message">กรุณากรอกชื่อห้อง</div>}

        <div className="container-buttons">
          <div className="button-text" onClick={props.onClickBack}>
            กลับ
          </div>
          <button className="primary-btn" type="submit">
            {buttonWords}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EnterRoomName;
