import { createRoot } from "react-dom/client";
import { AuthModalProvider } from "./Auth/AuthModal";
import "./index.css";
import App from "./App.jsx";
import { OtpModalProvider } from "./Auth/OtpModal";
import { PassProvider } from "./Auth/PasswordModal.jsx";

createRoot(document.getElementById("root")).render(
  <AuthModalProvider>
    <PassProvider>
      <OtpModalProvider>
        <App />
      </OtpModalProvider>
    </PassProvider>
  </AuthModalProvider>
);
