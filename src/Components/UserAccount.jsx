import React, { useState } from "react";
import "../assets/UserAccount.css";

const UserAccount = () => {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Handle Sign Up
  const handleSignUp = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    setUsers([...users, { username, email, password, preferences: {} }]);
    alert("Sign up successful!");
    e.target.reset(); // Clear the form
  };

  // Handle Log In
  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      setLoggedInUser(user);
      alert(`Welcome back, ${user.username}!`);
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="account-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input type="text" name="username" placeholder="Enter Username" required />
        <input type="email" name="email" placeholder="Enter Email" required />
        <input type="password" name="password" placeholder="Enter Password" required />
        <button type="submit">Sign Up</button>
      </form>

      <h2>Log In</h2>
      <form onSubmit={handleLogIn}>
        <input type="email" name="email" placeholder="Enter Email" required />
        <input type="password" name="password" placeholder="Enter Password" required />
        <button type="submit">Log In</button>
      </form>

      {loggedInUser && (
        <div className="welcome-message">
          <h3>Welcome, {loggedInUser.username}!</h3>
          <p>Your preferences: {JSON.stringify(loggedInUser.preferences)}</p>
        </div>
      )}
    </div>
  );
};

export default UserAccount;
