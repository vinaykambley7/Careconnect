import React, { useState } from "react";
import "./DoctorDashboard.css";
import { COMMON_MEDICINES } from "../data/mockData";

export default function DoctorDashboard({ patients, setPatients, user, showToast }) {
  // Find assigned patients for current doctor
  const assignedPatients = patients.filter(
    (p) => p.doctor && p.doctor.toLowerCase() === user.username.toLowerCase()
  );

  // Active patient for prescription modal/drawer
  const [activePatientId, setActivePatientId] = useState(null);

  // Prescription Form state
  const [rxForm, setRxForm] = useState({
    medicine: "",
    dosage: "500 mg",
    frequency: "1-0-1 (Twice daily)",
    duration: "5 days",
    instructions: "After meals"
  });

  const handleSelectPredefinedMed = (e) => {
    const medName = e.target.value;
    if (!medName) return;
    const found = COMMON_MEDICINES.find((m) => m.name === medName);
    if (found) {
      setRxForm({
        medicine: found.name,
        dosage: found.defaultDosage,
        frequency: found.defaultFreq,
        duration: found.defaultDuration,
        instructions: found.defaultInstructions
      });
    } else {
      setRxForm({ ...rxForm, medicine: medName });
    }
  };

  const handleAddPrescription = (patientId) => {
    if (!rxForm.medicine.trim()) {
      if (showToast) showToast("Please select or enter a medicine name.", "error");
      else alert("Please select or enter a medicine name.");
      return;
    }

    const newPrescription = {
      id: `RX-${Math.floor(100 + Math.random() * 900)}`,
      medicine: rxForm.medicine.trim(),
      dosage: rxForm.dosage.trim() || "As directed",
      frequency: rxForm.frequency.trim() || "Once daily",
      duration: rxForm.duration.trim() || "3 days",
      instructions: rxForm.instructions.trim() || "After food",
      dispensed: false,
      dispensedAt: null
    };

    const updatedPatients = patients.map((p) => {
      if (p.id === patientId) {
        const existingRx = Array.isArray(p.prescriptions) ? p.prescriptions : [];
        return {
          ...p,
          status: "Prescribed",
          prescriptions: [...existingRx, newPrescription]
        };
      }
      return p;
    });

    setPatients(updatedPatients);
    setRxForm({
      medicine: "",
      dosage: "500 mg",
      frequency: "1-0-1 (Twice daily)",
      duration: "5 days",
      instructions: "After meals"
    });
    setActivePatientId(null);

    if (showToast) {
      showToast(`Prescription for ${newPrescription.medicine} added successfully!`, "success");
    }
  };

  const handleDeletePrescription = (patientId, rxId) => {
    const updatedPatients = patients.map((p) => {
      if (p.id === patientId) {
        const filteredRx = p.prescriptions.filter((rx) => rx.id !== rxId);
        return {
          ...p,
          status: filteredRx.length === 0 ? "Waiting" : p.status,
          prescriptions: filteredRx
        };
      }
      return p;
    });

    setPatients(updatedPatients);
    if (showToast) showToast("Prescription removed.", "info");
  };

  const handleMarkCompleted = (patientId) => {
    const updated = patients.map((p) =>
      p.id === patientId ? { ...p, status: "Completed" } : p
    );
    setPatients(updated);
    if (showToast) showToast("Patient consultation marked as completed.", "success");
  };

  return (
    <div className="doctor-container">
      {/* Doctor Header Banner */}
      <div className="doctor-header-banner">
        <div className="doc-avatar-large">{user.avatar || "👨‍⚕️"}</div>
        <div className="doc-profile-info">
          <h2>{user.name || `Dr. ${user.username}`}</h2>
          <p className="doc-title">{user.title || "Clinical Specialist"} • Active Consultation Desk</p>
        </div>
        <div className="doc-quick-stats">
          <div className="quick-stat-box">
            <span className="stat-num">{assignedPatients.length}</span>
            <span className="stat-lbl">Assigned Patients</span>
          </div>
          <div className="quick-stat-box">
            <span className="stat-num yellow">
              {assignedPatients.filter((p) => p.status === "Waiting").length}
            </span>
            <span className="stat-lbl">In Waiting Queue</span>
          </div>
        </div>
      </div>

      {/* Patient Consultation List */}
      <div className="consultation-section">
        <div className="section-title-row">
          <h3>🩺 Assigned Patient Consultations</h3>
          <span className="queue-count">{assignedPatients.length} Patients in your queue</span>
        </div>

        {assignedPatients.length === 0 ? (
          <div className="no-patients-box">
            <div className="empty-icon">📭</div>
            <h4>No Patients Assigned Yet</h4>
            <p>Reception has not forwarded any patients to your queue right now.</p>
          </div>
        ) : (
          <div className="doctor-patient-list">
            {assignedPatients.map((p) => (
              <div key={p.id} className="clinical-card">
                <div className="clinical-header">
                  <div>
                    <div className="patient-tag-row">
                      <span className="patient-id-tag">{p.id}</span>
                      <span className={`status-pill ${p.status ? p.status.toLowerCase() : "waiting"}`}>
                        {p.status || "Waiting"}
                      </span>
                    </div>
                    <h3 className="patient-title">{p.name}</h3>
                    <p className="patient-sub">
                      Age: {p.age} | Gender: {p.gender || "N/A"} | 📞 {p.contact}
                    </p>
                  </div>

                  <div className="header-actions">
                    {p.status !== "Completed" && (
                      <button
                        className="mark-done-btn"
                        onClick={() => handleMarkCompleted(p.id)}
                        title="Mark consultation done"
                      >
                        ✓ Mark Completed
                      </button>
                    )}
                    <button
                      className="add-rx-trigger-btn"
                      onClick={() =>
                        setActivePatientId(activePatientId === p.id ? null : p.id)
                      }
                    >
                      {activePatientId === p.id ? "✕ Close Form" : "💊 Add Prescription"}
                    </button>
                  </div>
                </div>

                {/* Patient Clinical Info (Vitals & Symptoms) */}
                <div className="vitals-strip">
                  <div className="vital-item">
                    <span className="v-label">Reason / Symptoms:</span>
                    <span className="v-val complaint">{p.symptoms || "None reported"}</span>
                  </div>
                  <div className="vital-item">
                    <span className="v-label">Vitals:</span>
                    <span className="v-val">
                      BP: <strong>{p.vitals?.bp || "120/80"}</strong> | Temp: <strong>{p.vitals?.temp || "98.6°F"}</strong>
                    </span>
                  </div>
                  <div className="vital-item">
                    <span className="v-label">Registered:</span>
                    <span className="v-val">{p.registeredAt || "Today"}</span>
                  </div>
                </div>

                {/* Prescription Input Form Drawer */}
                {activePatientId === p.id && (
                  <div className="rx-form-panel">
                    <h4 className="panel-title">Write Prescription for {p.name}</h4>

                    <div className="rx-quick-select">
                      <label>Quick Pick Common Medication:</label>
                      <select onChange={handleSelectPredefinedMed} defaultValue="">
                        <option value="">-- Choose from Catalog or Type Below --</option>
                        {COMMON_MEDICINES.map((m) => (
                          <option key={m.name} value={m.name}>
                            {m.name} ({m.defaultDosage}, {m.defaultFreq})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="rx-grid-inputs">
                      <div className="rx-field">
                        <label>Medicine Name *</label>
                        <input
                          type="text"
                          placeholder="e.g. Paracetamol, Amoxicillin"
                          value={rxForm.medicine}
                          onChange={(e) => setRxForm({ ...rxForm, medicine: e.target.value })}
                        />
                      </div>

                      <div className="rx-field">
                        <label>Dosage</label>
                        <input
                          type="text"
                          placeholder="e.g. 500 mg, 10 ml"
                          value={rxForm.dosage}
                          onChange={(e) => setRxForm({ ...rxForm, dosage: e.target.value })}
                        />
                      </div>

                      <div className="rx-field">
                        <label>Frequency</label>
                        <input
                          type="text"
                          placeholder="e.g. 1-0-1 (Twice daily)"
                          value={rxForm.frequency}
                          onChange={(e) => setRxForm({ ...rxForm, frequency: e.target.value })}
                        />
                      </div>

                      <div className="rx-field">
                        <label>Duration</label>
                        <input
                          type="text"
                          placeholder="e.g. 5 days, 1 week"
                          value={rxForm.duration}
                          onChange={(e) => setRxForm({ ...rxForm, duration: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="rx-field full-width">
                      <label>Clinical Instructions</label>
                      <input
                        type="text"
                        placeholder="e.g. After meals with warm water, avoid cold beverages"
                        value={rxForm.instructions}
                        onChange={(e) => setRxForm({ ...rxForm, instructions: e.target.value })}
                      />
                    </div>

                    <div className="panel-buttons">
                      <button
                        className="save-rx-btn"
                        onClick={() => handleAddPrescription(p.id)}
                      >
                        ✓ Save & Forward to Pharmacy
                      </button>
                      <button
                        className="cancel-rx-btn"
                        onClick={() => setActivePatientId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Prescriptions List */}
                <div className="prescribed-section">
                  <span className="rx-header-lbl">Current Prescriptions ({p.prescriptions?.length || 0}):</span>
                  {(!p.prescriptions || p.prescriptions.length === 0) ? (
                    <p className="no-rx-msg">No medicines prescribed yet. Click "Add Prescription" above.</p>
                  ) : (
                    <div className="rx-cards-grid">
                      {p.prescriptions.map((rx, idx) => (
                        <div key={rx.id || idx} className="rx-card-item">
                          <div className="rx-card-top">
                            <span className="med-badge">Rx #{idx + 1}</span>
                            <span className={`dispense-tag ${rx.dispensed ? "dispensed" : "pending"}`}>
                              {rx.dispensed ? "✔ Dispensed" : "⏳ Pharmacy Pending"}
                            </span>
                          </div>
                          <h5 className="med-name">{rx.medicine} <span className="med-dosage">({rx.dosage})</span></h5>
                          <p className="med-info">📅 {rx.frequency} • {rx.duration}</p>
                          <p className="med-notes">ℹ️ {rx.instructions || "As directed"}</p>

                          <button
                            className="del-rx-btn"
                            onClick={() => handleDeletePrescription(p.id, rx.id)}
                            title="Remove medicine"
                          >
                            ✕ Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
