import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import Modal from "./Modal";
import LoginModal from "./LoginModal";

const ProtectedRoute = (): React.ReactElement => {
  const { isAuthenticated, isLoading } = useAuth();
  const [showForm, setShowForm] = useState(false);

  const handleLoginSuccess = () => {
    setShowForm(false);
    window.location.href = "http://localhost:5173/home";
  };

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      setShowForm(true);
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!isAuthenticated) {
    return (
      <>
        <Modal
          isOpen={showForm}
          onClose={() => {
            setShowForm(false);
            window.location.href = "http://localhost:5173/";
          }}
        >
          <LoginModal onSuccess={handleLoginSuccess} />
        </Modal>
      </>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
