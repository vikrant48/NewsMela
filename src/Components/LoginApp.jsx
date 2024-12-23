import React, { useState } from "react";
import SignUp from "./UserAccount/SignUp";
import Login from "./UserAccount/Login";

function LoginApp() {
  const [showUserAccount, setShowUserAccount] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleUserAccount = () => {
    setShowUserAccount(!showUserAccount);
  };

  const togglePage = () => {
    setIsSignIn(!isSignIn);
  };
  
  return (

    <div className="signin-cnt">
      <button className="signin-btn" onClick={toggleUserAccount}>Sign In</button>

      {showUserAccount && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={toggleUserAccount}>✖</button>

            <div className="app-container">
              {isSignIn ? (
                <Login togglePage={togglePage} />
              ) : (
                <SignUp togglePage={togglePage} />
              )}
            </div>

          </div>
        </div>
      )}
    </div>

  );
}

export default LoginApp;
