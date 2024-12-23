import React, { useState, useEffect } from "react";
import userIcon from "./img/user.svg";
import emailIcon from "./img/email.svg";
import passwordIcon from "./img/password.svg";
import "./Oath.css"; // Add necessary CSS styles

const SignUp = ({ togglePage }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    IsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false); // New state to track submission

  const validate = (values) => {
    const errors = {};
    if (!values.name) errors.name = "Name is required.";
    if (!values.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid.";
    }
    if (!values.password) errors.password = "Password is required.";
    else if (values.password.length < 6)
      errors.password = "Password must be at least 6 characters.";
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required.";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match.";
    }
    if (!values.IsAccepted) errors.IsAccepted = "You must accept the privacy policy.";
    return errors;
  };

  useEffect(() => {
    if (submitted) {
      setErrors(validate(data));
    }
  }, [data, submitted]); // Validate only after submission

  const changeHandler = (event) => {
    const { name, value, type, checked } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const validationErrors = validate(data);
    setErrors(validationErrors);
    setSubmitted(true);

    if (!Object.keys(validationErrors).length) {
      console.log("Form Submitted", data);
      alert("Account created successfully!");
      setData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        IsAccepted: false,
      });
      setSubmitted(false); // Reset submission state
    }
  };

  return (
    <div className="auth-container">
      <form className="form-login" onSubmit={submitHandler}>
        <h2 className="heading">Sign Up</h2>

        <div className={`input-group ${errors.name ? "input-error" : ""}`}>
          <input
            type="text"
            name="name"
            value={data.name}
            placeholder="Name"
            onChange={changeHandler}
          />
          <img src={userIcon} alt="User Icon" />
        </div>
        {errors.name && <span className="error">{errors.name}</span>}

        <div className={`input-group ${errors.email ? "input-error" : ""}`}>
          <input
            type="text"
            name="email"
            value={data.email}
            placeholder="E-mail"
            onChange={changeHandler}
          />
          <img src={emailIcon} alt="Email Icon" />
        </div>
        {errors.email && <span className="error">{errors.email}</span>}

        <div className={`input-group ${errors.password ? "input-error" : ""}`}>
          <input
            type="password"
            name="password"
            value={data.password}
            placeholder="Password"
            onChange={changeHandler}
          />
          <img src={passwordIcon} alt="Password Icon" />
        </div>
        {errors.password && <span className="error">{errors.password}</span>}

        <div className={`input-group ${errors.confirmPassword ? "input-error" : ""}`}>
          <input
            type="password"
            name="confirmPassword"
            value={data.confirmPassword}
            placeholder="Confirm Password"
            onChange={changeHandler}
          />
          <img src={passwordIcon} alt="Password Icon" />
        </div>
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

        <div className="checkbox-group">
          <input
            type="checkbox"
            name="IsAccepted"
            checked={data.IsAccepted}
            onChange={changeHandler}
          />
          <label>I accept the privacy policy</label>
        </div>
        {errors.IsAccepted && <span className="error">{errors.IsAccepted}</span>}

        <button type="submit" className="submit-btn">Create Account</button>
        <p className="toggle">
          Already have an account? <a href="#" onClick={ togglePage }>Login</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
