// src/components/Navbar.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import Modal from "./Modal";
import LoginModal from "./LoginModal";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleLoginSuccess = (token: string) => {
    // You can store the token in localStorage or context
    // localStorage.setItem("token", token);

    setIsLoggedIn(true);
    setShowForm(false);
    window.location.href = "http://localhost:5173/home";
  };

  const toggleLogin = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    } else {
      setShowForm(true);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/" className="navbar-link">
            AlgoVault
          </Link>
        </div>
        <div className="navbar-links">
          <button className="navbar-button" onClick={toggleLogin}>
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </div>
      </nav>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <LoginModal onSuccess={handleLoginSuccess} />
      </Modal>
    </>
  );
}
