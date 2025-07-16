import React from 'react';
import Navbar from './Navbar';  // Import your Navbar component
import { Outlet } from 'react-router-dom';  // To render the child routes

const Layout: React.FC = () => {
  return (
    <div>
      <Navbar />  {/* This will be visible across the routes that use this layout */}
      <div className="main-content">
        <Outlet />  {/* The child routes will be rendered here */}
      </div>
    </div>
  );
};

export default Layout;
