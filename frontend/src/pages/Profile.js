import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Profile({ goUpdate, goClients, goLogout }) {
  const { token, user, setUser, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: token }
      })
      .then((res) => {
        setProfile(res.data);
        setUser(res.data);
      });
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <>
      <h2>Profile</h2>

      <p><b>Name:</b> {profile.name}</p>
      <p><b>Email:</b> {profile.email}</p>
      <p><b>Age:</b> {profile.age}</p>
      <p><b>Gender:</b> {profile.gender}</p>
      <p><b>Phone:</b> {profile.phone}</p>

      <button onClick={goUpdate}>Update Profile</button>
      <button onClick={goClients}>See Clients</button>
      <button
        onClick={() => {
          logout();
          goLogout();
        }}
      >
        Logout
      </button>
    </>
  );
}

export default Profile;
