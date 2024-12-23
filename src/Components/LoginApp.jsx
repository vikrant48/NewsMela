import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./UserAccount/SignUp";
import Login from "./UserAccount/Login";

function LoginApp() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      {/* Redirect from "/" to "/signup" */}
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  );
}

export default LoginApp;
