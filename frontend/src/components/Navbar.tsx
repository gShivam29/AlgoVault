// src/components/Navbar.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import Modal from "./Modal";
import LoginModal from "./LoginModal";
import axios from "axios";
import { useAuth } from "../context/AuthContext";


export default function Navbar() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const {isAuthenticated} = useAuth();

  const handleLoginSuccess = (token: string) => {
    setShowForm(false);
    window.location.href = "http://localhost:5173/home";
  };

  const handleLogout = async () => {
    try{
      await axios.post("http://localhost:3000/api/auth/logout", {}, {withCredentials: true,});
      window.location.replace("http://localhost:5173/");
    } catch(err){
      console.error("Logout Failed", err);
    }
  }
  const toggleLogin = () => {
    if (isAuthenticated) {
      handleLogout(); 
    } else {
      setShowForm(true);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to={isAuthenticated ? "/home" : "/"} className="navbar-link">
            AlgoVault
          </Link>
        </div>
        <div className="navbar-links">
          <button className="navbar-button" onClick={toggleLogin}>
            {isAuthenticated ? "Logout" : "Login"}
          </button>
        </div>
      </nav>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <LoginModal onSuccess={handleLoginSuccess} />
      </Modal>
    </>
  );
}
