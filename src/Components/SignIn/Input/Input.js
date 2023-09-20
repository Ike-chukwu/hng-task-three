import React, { useState } from "react";
import "./Input.css";

const Input = (props) => {
  const [focused, setFocused] = useState(false);

  const activateFocus = () => {
    setFocused(true);
  };

  return (
    <div className="input-parent">
      <label className="label" htmlFor="">
        {props.name}
      </label>
      <input
        className="validation-input"
        onChange={(e) => props.onChange(e)}
        value={props.value}
        {...props}
        focused={focused.toString()}
        onBlur={activateFocus}
      />
      <p className="error-message">{props.errorMessage}</p>
    </div>
  );
};

export default Input;
