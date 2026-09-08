import React, { useState } from "react";
import "./Login.css";
import { USERS } from "../data/mockData";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Receptionist");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    const user = USERS.find(
      (u) =>
        u.username.trim().toLowerCase() === username.trim().toLowerCase() &&
        u.password === password &&
        u.role === role
    );
    if (user) {
      setError("");
      onLogin(user);
    } else {
      setError("Invalid credentials or role mismatch. Please try again.");
    }
  };

  const handleQuickLogin = (quickUser) => {
    setUsername(quickUser.username);
    setPassword(quickUser.password);
    setRole(quickUser.role);
    setError("");
    onLogin(quickUser);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header Branding */}
        <div className="login-header">
          <img
            src="https://res.cloudinary.com/dmy7kknrc/image/upload/v1755050942/Care_Connect_n28xvw.png"
            alt="CareConnect Logo"
            className="login-logo"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <h1 className="brand-title">CareConnect</h1>
          <p className="brand-subtitle">Hospital & Clinical Management Portal</p>
        </div>

        {/* 1-Click Easy Login Section */}
        <div className="easy-login-section">
          <div className="easy-login-header">
            <span className="sparkle-icon">⚡</span>
            <span>1-Click Quick Demo Login</span>
          </div>
          <div className="easy-login-grid">
            {USERS.map((u) => (
              <button
                key={u.username}
                type="button"
                className="easy-login-btn"
                onClick={() => handleQuickLogin(u)}
                title={`Quick Sign In as ${u.name}`}
              >
                <span className="easy-avatar">{u.avatar}</span>
                <div className="easy-info">
                  <span className="easy-name">{u.name}</span>
                  <span className="easy-role" style={{ color: u.badgeColor }}>
                    {u.role}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="divider-line">
          <span>OR SIGN IN MANUALLY</span>
        </div>

        {/* Manual Login Form */}
        <form onSubmit={handleLogin} className="login-form">
          {error && <div className="error-msg">{error}</div>}

          <div className="form-field">
            <label>Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="login-input"
            >
              <option value="Receptionist">Receptionist (Front Desk)</option>
              <option value="Doctor">Doctor (Consultation)</option>
              <option value="Pharmacist">Pharmacist (Dispensary)</option>
            </select>
          </div>

          <div className="form-field">
            <label>Username</label>
            <input
              type="text"
              placeholder="e.g. doctor1, reception1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
              autoComplete="username"
              required
            />
          </div>

          <div className="form-field">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password (default: 1234)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input password-input"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="toggle-pwd-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button type="submit" className="login-submit-btn">
            Sign In to Dashboard
          </button>
        </form>

        {/* Demo Credentials Cheat Sheet */}
        <div className="credentials-helper">
          <span className="helper-label">Demo Credentials:</span>
          <div className="helper-chips">
            <code>reception1 / 1234</code>
            <code>doctor1 / 1234</code>
            <code>doctor2 / 1234</code>
            <code>pharma1 / 1234</code>
          </div>
        </div>
      </div>
    </div>
  );
}
