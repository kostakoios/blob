import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "../homepage/HomePage";
import Register from "../register/Register";
import Login from "../login/Login";
import { AuthProvider } from "../context/AuthContext";
import PrivateRoute from "../privateroute/PrivateRoute";

const Layout = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute path="/" element={<HomePage />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default Layout;
