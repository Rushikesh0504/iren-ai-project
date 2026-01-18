import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Login({ goSignup, goProfile }) {
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      login(res.data);      // save user + token in context
      goProfile();          // 🔁 redirect to profile
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <>
      <h2>Login</h2>

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button onClick={handleLogin}>Login</button>

      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Don’t have an account?{" "}
        <span
          style={{ color: "#c7ff9b", cursor: "pointer" }}
          onClick={goSignup}
        >
          Sign up
        </span>
      </p>
    </>
  );
}

export default Login;
