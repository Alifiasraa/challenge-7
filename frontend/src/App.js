import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/Login";
import RegisterForm from "./components/Register";
import ForgotPasswordForm from "./components/ForgotPassword";
import EmailSent from "./components/EmailSent";
import ResetPasswordForm from "./components/ResetPassword";
import ResetSuccess from "./components/ResetSuccess";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/forgot-password" element={<ForgotPasswordForm />} />
      <Route path="/email-sent" element={<EmailSent />} />
      <Route path="/reset-password" element={<ResetPasswordForm />} />
      <Route path="/reset-success" element={<ResetSuccess />} />
    </Routes>
  );
}

export default App;
