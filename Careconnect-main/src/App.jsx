import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import ReceptionistDashboard from "./components/ReceptionistDashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import PharmacistDashboard from "./components/PharmacistDashboard";
import ReportsDashboard from "./components/ReportsDashboard";
import { INITIAL_PATIENTS } from "./data/mockData";
import "./App.css";

export default function App() {
  // Restore user session from localStorage if available
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("careconnect_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // Active view: "dashboard" or "reports"
  const [currentView, setCurrentView] = useState("dashboard");

  // Toast Notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Initialize patients from localStorage or seed initial realistic demo data
  const [patients, setPatients] = useState(() => {
    try {
      const savedPatients = localStorage.getItem("patients");
      if (savedPatients) {
        const parsed = JSON.parse(savedPatients);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      // If empty or first time, load sample patients
      localStorage.setItem("patients", JSON.stringify(INITIAL_PATIENTS));
      return INITIAL_PATIENTS;
    } catch {
      return INITIAL_PATIENTS;
    }
  });

  // Save patients to localStorage whenever patients state changes
  useEffect(() => {
    try {
      localStorage.setItem("patients", JSON.stringify(patients));
    } catch (e) {
      console.error("Failed to save patients to localStorage", e);
    }
  }, [patients]);

  const handleLogin = (authenticatedUser) => {
    setUser(authenticatedUser);
    localStorage.setItem("careconnect_user", JSON.stringify(authenticatedUser));
    showToast(`Welcome back, ${authenticatedUser.name}!`, "success");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("careconnect_user");
    setCurrentView("dashboard");
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-layout">
      {/* Global Toast Notification */}
      {toast && (
        <div className={`toast-notification ${toast.type}`}>
          <span className="toast-icon">
            {toast.type === "success" ? "✔" : toast.type === "error" ? "✖" : "ℹ"}
          </span>
          <span className="toast-message">{toast.message}</span>
        </div>
      )}

      {/* Modern Medical Top Header */}
      <header className="app-header">
        <div className="header-left">
          <div className="app-brand" onClick={() => setCurrentView("dashboard")}>
            <img
              src="https://res.cloudinary.com/dmy7kknrc/image/upload/v1755050942/Care_Connect_n28xvw.png"
              alt="CareConnect Logo"
              className="brand-icon-small"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <span className="brand-name">CareConnect</span>
            <span className="system-pill">HMS v2.0</span>
          </div>

          <nav className="header-nav">
            <button
              className={`nav-tab-btn ${currentView === "dashboard" ? "active" : ""}`}
              onClick={() => setCurrentView("dashboard")}
            >
              📊 {user.role} Desk
            </button>
            <button
              className={`nav-tab-btn ${currentView === "reports" ? "active" : ""}`}
              onClick={() => setCurrentView("reports")}
            >
              📈 Reports & Analytics
            </button>
          </nav>
        </div>

        <div className="header-right">
          {/* User Profile Capsule */}
          <div className="user-profile-capsule">
            <span className="user-avatar-small">{user.avatar || "👤"}</span>
            <div className="user-text-info">
              <span className="user-display-name">{user.name || user.username}</span>
              <span className="user-role-tag">{user.role}</span>
            </div>
          </div>

          <button onClick={handleLogout} className="logout-btn" title="Sign out">
            🚪 Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="app-content">
        {currentView === "reports" ? (
          <ReportsDashboard patients={patients} />
        ) : (
          <>
            {user.role === "Receptionist" && (
              <ReceptionistDashboard
                patients={patients}
                setPatients={setPatients}
                showToast={showToast}
              />
            )}
            {user.role === "Doctor" && (
              <DoctorDashboard
                patients={patients}
                setPatients={setPatients}
                user={user}
                showToast={showToast}
              />
            )}
            {user.role === "Pharmacist" && (
              <PharmacistDashboard
                patients={patients}
                setPatients={setPatients}
                showToast={showToast}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}