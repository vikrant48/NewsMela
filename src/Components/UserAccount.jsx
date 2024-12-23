import React, { useState } from "react";
import "../assets/UserAccount.css";

const UserAccount = () => {
  const [showUserAccount, setShowUserAccount] = useState(false);
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const toggleUserAccount = () => {
    setShowUserAccount(!showUserAccount);
};

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
    <div className="signin-cnt">
      <button className="signin-btn" onClick={toggleUserAccount}>Sign In</button>

      {showUserAccount && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={toggleUserAccount}>✖</button>
            <h2 className="modal-heading" >Sign-in/Sign-up</h2>
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
            </div>

          </div>
        </div>
      )}
    </div>

  );
};

export default UserAccount;
