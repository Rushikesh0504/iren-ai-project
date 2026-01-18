import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function UpdateProfile({ goBack }) {
  const { token, user, setUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    phone: ""
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        age: user.age || "",
        gender: user.gender || "",
        phone: user.phone || ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/profile",
        form,
        {
          headers: { Authorization: token }
        }
      );

      setUser(res.data);
      alert("Profile updated successfully");
      goBack();
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <>
      <h2>Update Profile</h2>

      <input
        name="name"
        value={form.name}
        placeholder="Name"
        onChange={handleChange}
      />

      <input
        name="email"
        value={form.email}
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        name="age"
        value={form.age}
        placeholder="Age"
        onChange={handleChange}
      />

      <input
        name="gender"
        value={form.gender}
        placeholder="Gender"
        onChange={handleChange}
      />

      <input
        name="phone"
        value={form.phone}
        placeholder="Phone"
        onChange={handleChange}
      />

      <button onClick={handleSave}>Save</button>
      <button onClick={goBack}>Cancel</button>
    </>
  );
}

export default UpdateProfile;
