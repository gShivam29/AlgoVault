import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';  // Import GoogleOAuthProvider
import "./index.css"; // Global styles
import LandingPage from "./pages/LandingPage"; // This could be a page without Navbar
import Home from "./pages/Home";
import QuestionPage from "./pages/QuestionPage";
import Layout from "./components/Layout"; // Import Layout

// const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
// console.log(googleClientId);

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Wrap the Router with GoogleOAuthProvider and pass the environment variable */}
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Routes>
          {/* Routes that do not need the layout */}
          <Route path="/questions/:id" element={<QuestionPage />} />

          {/* Use Layout for pages that need the Navbar */}
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  </StrictMode>
);
