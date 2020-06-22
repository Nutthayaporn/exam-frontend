import React, { useState } from "react";

function EnterName(props) {
  const [inputName, setInputName] = useState(null);

  const handleChangeInput = (e) => {
    const value = e.target.value;
    setInputName(value);
  };

  const handleSubmit = () => {
    props.onSubmitName(inputName);
  };

  return (
    <div className="step1">
      <h2>ชื่อของคุณ</h2>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChangeInput} autoFocus />
        <div className={`button-wrapper ${inputName && "show-button"}`}>
          <button className="primary-btn" type="submit">
            ยืนยัน
          </button>
        </div>
      </form>
    </div>
  );
}

export default EnterName;
