import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "../styles/LoginModal.css"; 

// Define the structure of the decoded JWT token (You can modify this based on your JWT structure)
type JwtPayload = {
  sub: string; // Example: subject (user id)
  email: string; // Example: user email
  // Add more fields here based on your JWT structure
};

type CredentialResponse = {
  credential?: string; // The JWT string (could be undefined)
};

type Props = {
  onSuccess: (token: string) => void; // Function to handle successful login
};

export default function LoginModal({ onSuccess }: Props) {
  // Success handler for Google Login
  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    const { credential } = credentialResponse;

    // Check if credential exists and is a string
    if (credential) {
      try {
        // Decode the JWT token
        // const decoded = jwtDecode<JwtPayload>(credential);
        // console.log(decoded); // Log the decoded JWT payload

        // Optionally, you can access specific fields from the decoded payload:
        // const { sub, email } = decoded;
        // console.log(`User ID: ${sub}, Email: ${email}`);

        const response = await axios.post(
          "http://localhost:3000/api/auth/login",
          { token: credential },
          { withCredentials: true }
        );

        console.log("Backend response:", response.data);

        // Call the onSuccess prop with the decoded token
        onSuccess(credential);
      } catch (error) {
        console.error("Error decoding JWT token:", error);
      }
    } else {
      console.error("Credential is undefined or invalid.");
    }
  };

  return (
    <div className="login-modal">
      <h2>Login to Your Account</h2>

      {/* Google Login Button */}
      <GoogleLogin
        onSuccess={handleLoginSuccess} // Use the success handler
        onError={() => {
          console.error("Login Failed");
        }}
        containerProps={{
          className: "google-login-btn", // Apply the class to the container
        }}
      />
    </div>
  );
}
