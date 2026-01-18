import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import Clients from "./pages/Clients";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");

  if (page === "login") {
    return (
      <div className="center">
        <div className="card">
          <Login
            goSignup={() => setPage("signup")}
            goProfile={() => setPage("profile")}
          />
        </div>
      </div>
    );
  }

  if (page === "signup") {
    return (
      <div className="center">
        <div className="card">
          <Signup goLogin={() => setPage("login")} />
        </div>
      </div>
    );
  }

  if (page === "profile") {
    return (
      <div className="center">
        <div className="card">
          <Profile
            goUpdate={() => setPage("update")}
            goClients={() => setPage("clients")}
            goLogout={() => setPage("login")}
          />
        </div>
      </div>
    );
  }

  if (page === "update") {
    return (
      <div className="center">
        <div className="card">
          <UpdateProfile goBack={() => setPage("profile")} />
        </div>
      </div>
    );
  }

  if (page === "clients") {
    return (
      <div className="center">
        <div className="card">
          <Clients goBack={() => setPage("profile")} />
        </div>
      </div>
    );
  }

  return null;
}

export default App;
