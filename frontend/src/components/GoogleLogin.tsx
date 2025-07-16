import { useEffect } from "react";
import axios from "axios";
import dotenv from 'dotenv'
dotenv.config({ path: "../.env" });

interface GoogleLoginProps {
  onLogin: (user: { name: string; email: string }) => void;
}

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleLogin({ onLogin }: GoogleLoginProps) {
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.GOOGLE_CLIENT_ID,
      callback: handleLogin,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      { theme: "outline", size: "large" }
    );
  }, []);

  const handleLogin = async (res: { credential: string }) => {
    try {
      const r = await axios.post("http://localhost:3000/api/auth/google", {
        token: res.credential,
      });
      onLogin(r.data); // r.data is the user object from backend
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return <div id="google-btn"></div>;
}
