import { useState } from "react";
import axios from "axios";

function Signup({ goLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    phone: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/signup",
        form
      );

      alert("Signup successful. Please login.");
      goLogin(); // 🔁 redirect to login
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <>
      <h2>Signup</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <input name="age" placeholder="Age" onChange={handleChange} />
      <input name="gender" placeholder="Gender" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />

      <button onClick={handleSignup}>Signup</button>

      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Already have an account?{" "}
        <span
          style={{ color: "#c7ff9b", cursor: "pointer" }}
          onClick={goLogin}
        >
          Login
        </span>
      </p>
    </>
  );
}

export default Signup;
