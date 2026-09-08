import React, { useState } from "react";
import "./ReceptionistDashboard.css";
import { DOCTORS } from "../data/mockData";

export default function ReceptionistDashboard({ patients, setPatients, showToast }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "Male",
    contact: "",
    doctorId: DOCTORS[0].username,
    symptoms: "",
    bp: "120/80",
    temp: "98.6 °F"
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddPatient = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.age || !form.contact.trim()) {
      if (showToast) showToast("Please fill in patient name, age, and contact number.", "error");
      else alert("Please fill in patient name, age, and contact number.");
      return;
    }

    const assignedDoctor = DOCTORS.find((d) => d.username === form.doctorId) || DOCTORS[0];
    const newId = `PAT-${Math.floor(1000 + Math.random() * 9000)}`;

    const newPatient = {
      id: newId,
      name: form.name.trim(),
      age: Number(form.age),
      gender: form.gender,
      contact: form.contact.trim(),
      doctor: assignedDoctor.username,
      doctorName: assignedDoctor.name,
      symptoms: form.symptoms.trim() || "General Consultation",
      vitals: {
        bp: form.bp.trim() || "120/80",
        temp: form.temp.trim() || "98.6 °F",
        pulse: "76 bpm"
      },
      registeredAt: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      status: "Waiting",
      prescriptions: []
    };

    setPatients([newPatient, ...patients]);
    setForm({
      name: "",
      age: "",
      gender: "Male",
      contact: "",
      doctorId: DOCTORS[0].username,
      symptoms: "",
      bp: "120/80",
      temp: "98.6 °F"
    });

    if (showToast) {
      showToast(`Patient ${newPatient.name} (${newPatient.id}) registered successfully!`, "success");
    }
  };

  const handleDeletePatient = (patientId, patientName) => {
    if (window.confirm(`Are you sure you want to remove patient ${patientName} (${patientId})?`)) {
      const updated = patients.filter((p) => p.id !== patientId);
      setPatients(updated);
      if (showToast) showToast(`Patient ${patientName} removed.`, "info");
    }
  };

  // Filter patients based on search and status
  const filteredPatients = patients.filter((p) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      (p.name && p.name.toLowerCase().includes(search)) ||
      (p.id && p.id.toLowerCase().includes(search)) ||
      (p.contact && p.contact.includes(search)) ||
      (p.doctorName && p.doctorName.toLowerCase().includes(search));

    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const countWaiting = patients.filter((p) => p.status === "Waiting").length;
  const countPrescribed = patients.filter((p) => p.status === "Prescribed").length;
  const countDispensed = patients.filter((p) => p.status === "Dispensed").length;

  return (
    <div className="reception-container">
      {/* Overview Stat Cards */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon blue">👥</div>
          <div className="stat-data">
            <span className="stat-value">{patients.length}</span>
            <span className="stat-label">Total Registered</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon yellow">⏳</div>
          <div className="stat-data">
            <span className="stat-value">{countWaiting}</span>
            <span className="stat-label">Waiting for Doctor</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">📋</div>
          <div className="stat-data">
            <span className="stat-value">{countPrescribed}</span>
            <span className="stat-label">Prescription Ready</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">✅</div>
          <div className="stat-data">
            <span className="stat-value">{countDispensed}</span>
            <span className="stat-label">Meds Dispensed</span>
          </div>
        </div>
      </div>

      <div className="reception-layout">
        {/* Left Column: Register New Patient Form */}
        <div className="registration-card">
          <div className="card-header">
            <h3>➕ New Patient Registration</h3>
            <p>Enter patient details and assign to a consultation queue</p>
          </div>

          <form onSubmit={handleAddPatient} className="reg-form">
            <div className="form-row">
              <div className="input-group flex-2">
                <label>Patient Full Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Rahul Verma"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group flex-1">
                <label>Age *</label>
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  min="1"
                  max="120"
                  value={form.age}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group flex-1">
                <label>Gender</label>
                <select name="gender" value={form.gender} onChange={handleChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="input-group flex-2">
                <label>Phone / Contact *</label>
                <input
                  type="text"
                  name="contact"
                  placeholder="+91 98765 43210"
                  value={form.contact}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Assign Consulting Doctor *</label>
              <select name="doctorId" value={form.doctorId} onChange={handleChange} className="doctor-select">
                {DOCTORS.map((doc) => (
                  <option key={doc.username} value={doc.username}>
                    {doc.name} — {doc.specialty} ({doc.room})
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>Chief Symptoms / Medical Reason</label>
              <textarea
                name="symptoms"
                rows="2"
                placeholder="e.g. Mild chest pain, seasonal fever, severe cough..."
                value={form.symptoms}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="input-group flex-1">
                <label>Blood Pressure (BP)</label>
                <input
                  type="text"
                  name="bp"
                  placeholder="120/80"
                  value={form.bp}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group flex-1">
                <label>Body Temp</label>
                <input
                  type="text"
                  name="temp"
                  placeholder="98.6 °F"
                  value={form.temp}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="submit-patient-btn">
              Register & Assign to Queue
            </button>
          </form>
        </div>

        {/* Right Column: Patients Queue & Directory */}
        <div className="directory-card">
          <div className="card-header between">
            <div>
              <h3>📋 Patient Queue & Registry</h3>
              <p>{filteredPatients.length} patient records listed</p>
            </div>

            {/* Filter Pills */}
            <div className="filter-pills">
              {["All", "Waiting", "Prescribed", "Dispensed"].map((st) => (
                <button
                  key={st}
                  type="button"
                  className={`pill-btn ${statusFilter === st ? "active" : ""}`}
                  onClick={() => setStatusFilter(st)}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by Patient Name, ID, Contact, or Doctor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm("")}>
                ✕
              </button>
            )}
          </div>

          {/* Patient Cards List */}
          <div className="patients-scroll-list">
            {filteredPatients.length === 0 ? (
              <div className="empty-state">
                <p className="empty-icon">📂</p>
                <p>No patients found matching your search or filter.</p>
              </div>
            ) : (
              filteredPatients.map((p) => (
                <div key={p.id} className="patient-card">
                  <div className="patient-top">
                    <div className="patient-identity">
                      <span className="patient-id-badge">{p.id}</span>
                      <h4 className="patient-name">{p.name}</h4>
                      <span className="patient-meta">
                        {p.age} yrs • {p.gender || "Patient"} • 📞 {p.contact}
                      </span>
                    </div>
                    <div className="patient-status-badge">
                      <span className={`badge ${p.status ? p.status.toLowerCase() : "waiting"}`}>
                        {p.status || "Waiting"}
                      </span>
                    </div>
                  </div>

                  <div className="patient-details-grid">
                    <div className="detail-item">
                      <span className="detail-label">Assigned Doctor</span>
                      <span className="detail-val doctor-val">🩺 {p.doctorName || p.doctor}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Symptoms / Complaint</span>
                      <span className="detail-val">{p.symptoms || "Routine Checkup"}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Vitals</span>
                      <span className="detail-val">
                        BP: {p.vitals?.bp || "N/A"} | Temp: {p.vitals?.temp || "N/A"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Registration Time</span>
                      <span className="detail-val">{p.registeredAt || "Today"}</span>
                    </div>
                  </div>

                  <div className="patient-card-footer">
                    <span className="rx-count">
                      💊 {p.prescriptions ? p.prescriptions.length : 0} Medicines Prescribed
                    </span>
                    <button
                      className="delete-patient-btn"
                      onClick={() => handleDeletePatient(p.id, p.name)}
                      title="Remove patient from registry"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
