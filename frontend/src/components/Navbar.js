import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="nav-logo">AuthApp</div>

      <div className="nav-buttons">
        {user && <button onClick={logout}>Logout</button>}
      </div>
    </div>
  );
}

export default Navbar;
