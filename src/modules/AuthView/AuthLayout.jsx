import { useState } from "react";

import LoginForm from "../Forms/LoginForm";
import RegisterForm from "../Forms/RegisterForm";

export default function AuthView() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="d-flex justify-content-center">
      {showLogin ? (
        <LoginForm viewRegister={() => setShowLogin(false)} />
      ) : (
        <RegisterForm viewLogin={() => setShowLogin(true)} />
      )}
    </div>
  );
}
