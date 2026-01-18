import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Clients({ goBack }) {
  const { token } = useContext(AuthContext);
  const [clients, setClients] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://iren-ai-project.onrender.com/api/auth/clients", {
        headers: {
          Authorization: token
        }
      })
      .then((res) => {
        // ✅ SAFETY CHECK
        if (Array.isArray(res.data)) {
          setClients(res.data);
        } else {
          setError("No clients found or unauthorized");
        }
      })
      .catch(() => {
        setError("Failed to load clients");
      });
  }, [token]);

  return (
    <>
      <h2>Clients</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {clients.length === 0 && !error && <p>No clients available</p>}

      {clients.map((client) => (
        <div key={client._id} style={{ marginBottom: "10px" }}>
          <p><b>Name:</b> {client.name}</p>
          <p><b>Email:</b> {client.email}</p>
          <p><b>Age:</b> {client.age}</p>
          <p><b>Gender:</b> {client.gender}</p>
          <p><b>Phone:</b> {client.phone}</p>
          <hr />
        </div>
      ))}

      <button onClick={goBack}>Back to Profile</button>
    </>
  );
}

export default Clients;
