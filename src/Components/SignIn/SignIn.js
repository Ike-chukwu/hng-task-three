import React, { useContext, useState } from "react";
import "./SignIn.css";
import Input from "./Input/Input";
import { AuthContext } from "../../context";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { signIn, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState();

  const [inputDetails, setInputDetails] = useState({
    Email: "",
    Password: "",
  });

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputDetails({
      ...inputDetails,
      [name]: value,
    });
  };

  const userDetails = [
    {
      id: 0,
      placeholder: "Email",
      name: "Email",
      errorMessage: "Invalid format!",
      required: true,
      type: "email",
    },
    {
      id: 1,
      placeholder: "Password",
      name: "Password",
      errorMessage: "Field cannot be empty",
      pattern: "^(?!s*$).+",
      required: true,
      type: "password",
    },
  ];

  const submitSignin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(inputDetails.Email, inputDetails.Password);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div className="sign-in-parent">
      <form onSubmit={submitSignin} className="sign-in-form">
        <h3>Sign in</h3>
        <div className="inputs-pack">
          {userDetails.map((field) => (
            <Input
              key={field.id}
              value={inputDetails[field.name]}
              placeholder={field.placeholder}
              name={field.name}
              errorMessage={field.errorMessage}
              required={field.required}
              type={field.type}
              pattern={field.pattern}
              onChange={inputChangeHandler}
            />
          ))}
        </div>
        <button className="submit-btn">Submit</button>
        <p style={{fontSize:"1.4rem", color:"red"}}>{error}</p>
      </form>
    </div>
  );
};

export default SignIn;
