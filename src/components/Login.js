import React, { useState } from "react";
import "./Login.css";

const users = [
  { username: "reception1", password: "1234", role: "Receptionist" },
  { username: "doctor1", password: "1234", role: "Doctor" },
   { username: "doctor2", password: "1234", role: "Doctor" },
  { username: "pharma1", password: "1234", role: "Pharmacist" },
];

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Receptionist");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const user = users.find(
      (u) => u.username === username && u.password === password && u.role === role
    );
    if (user) {
      onLogin(user);
    } else {
      setError("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Logo */}
        <img src="https://res.cloudinary.com/dmy7kknrc/image/upload/v1755050942/Care_Connect_n28xvw.png" alt="CareConnect Logo" class="login-logo"/> 
        <h2>Hospital Login</h2>
        {error && <p className="error-msg">{error}</p>}

        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option>Receptionist</option>
          <option>Doctor</option>
          <option>Pharmacist</option>
        </select>

        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
