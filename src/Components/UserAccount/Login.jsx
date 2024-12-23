import React, { useState } from "react";
import emailIcon from "./img/email.svg";
import passwordIcon from "./img/password.svg";
import "./oath.css";

const Login = ({ togglePage }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false); // New state to track if the form is submitted

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid.";
    }
    if (!values.password) errors.password = "Password is required.";
    return errors;
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const validationErrors = validate(data);
    setErrors(validationErrors);
    setSubmitted(true); // Mark the form as submitted

    if (!Object.keys(validationErrors).length) {
      console.log("Login successful with data:", data);
      alert("Logged in successfully!");
      setSubmitted(false); // Reset submission state
      setData({
        email: "",
        password: "",
      });
    } else {
      // alert("Please fix the errors.");
    }
  };

  return (
    <div className="auth-container">
      <form className="form-login" onSubmit={submitHandler} autoComplete="off">
        <h2 className="heading">Sign In</h2>

        <div className={`input-group ${errors.email && submitted ? "input-error" : ""}`}>
          <input
            type="text"
            name="email"
            value={data.email}
            placeholder="E-mail"
            onChange={changeHandler}
            autoComplete="off"
          />
          <img src={emailIcon} alt="Email Icon" />
        </div>
        {errors.email && submitted && <span className="error">{errors.email}</span>}

        <div className={`input-group ${errors.password && submitted ? "input-error" : ""}`}>
          <input
            type="password"
            name="password"
            value={data.password}
            placeholder="Password"
            onChange={changeHandler}
            autoComplete="off"
          />
          <img src={passwordIcon} alt="Password Icon" />
        </div>
        {errors.password && submitted && <span className="error">{errors.password}</span>}

        <button type="submit" className="submit-btn">Login</button>
        <p className="toggle">
          Don't have a account? <a href="#" onClick={ togglePage }>Create account</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
