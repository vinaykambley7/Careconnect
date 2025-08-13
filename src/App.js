import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import ReceptionistDashboard from "./components/ReceptionistDashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import PharmacistDashboard from "./components/PharmacistDashboard";
import ReportsDashboard from "./components/ReportsDashboard";
import "./App.css"
export default function App() {
  const [user, setUser] = useState(null);
       const [currentView, setCurrentView] = useState("dashboard"); // "dashboard" or "reports"
  // Initialize patients from localStorage or empty array
  const [patients, setPatients] = useState(() => {
    const savedPatients = localStorage.getItem("patients");
    return savedPatients ? JSON.parse(savedPatients) : [];
  });

  // Save patients to localStorage whenever patients state changes
  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={setUser} />;
  }
   
    if (currentView === "reports") {
    return (
      <div>
        <button onClick={() => setCurrentView("dashboard")} className="top-bar-btn">
          Back to Dashboard
        </button>
        <ReportsDashboard patients={patients} />
        <button onClick={handleLogout} className="top-bar-btn">
          Logout
        </button>
      </div>
    );
  }
  
   
   return (
    <div>
      <div style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
        <span>Welcome, {user.username} ({user.role})</span>
        <button onClick={handleLogout} className="top-bar-btn">
          Logout
        </button>
        <button
          onClick={() => setCurrentView("reports")}
          className="top-bar-btn"
        >
          View Reports
        </button>
      </div>

      {user.role === "Receptionist" && (
        <ReceptionistDashboard patients={patients} setPatients={setPatients} onLogout={handleLogout} />
      )}
      {user.role === "Doctor" && (
        <DoctorDashboard patients={patients} setPatients={setPatients} user={user} onLogout={handleLogout} />
      )}
      {user.role === "Pharmacist" && (
        <PharmacistDashboard patients={patients} onLogout={handleLogout} />
      )}
    </div>
  );
}