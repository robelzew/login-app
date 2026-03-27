import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="737019901228-tecvfts0c6f99h4h16f44loae5hncna7.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);