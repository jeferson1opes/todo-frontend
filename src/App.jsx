import { useState } from "react";

import AuthContext from "./core/auth/context";
import authStorage from "./core/auth/storage";

import NavBar from "./base/Navbar/NavBar";
import AuthView from "./modules/AuthView/AuthLayout";
import ProjectsView from "./modules/ProjectsView/ProjectsView";

export default function App() {
  const [user, setUser] = useState(authStorage.getUser());

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavBar />
      {user ? <ProjectsView /> : <AuthView />}
    </AuthContext.Provider>
  );
}
