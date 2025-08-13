import React, { useState } from "react";
import "./DoctorDashboard.css";

export default function DoctorDashboard({ patients, setPatients, user, onLogout }) {
  // Map patients to include their original index, then filter
  const assignedPatients = patients
    .map((p, idx) => ({ ...p, originalIndex: idx }))
    .filter((p) => p.doctor.toLowerCase() === user.username.toLowerCase());

  const [medicineInputs, setMedicineInputs] = useState({});
  const [patientIdForPrescription, setPatientIdForPrescription] = useState(null);

  const handleMedicineChange = (index, value) => {
    setMedicineInputs((prev) => ({ ...prev, [index]: value }));
  };

  const addPrescription = (assignedIndex) => {
    const patient = assignedPatients[assignedIndex];
    const medicine = medicineInputs[assignedIndex];
    if (!medicine) {
      alert("Please enter medicine name");
      return;
    }

    const updatedPatients = [...patients];
    const originalIndex = patient.originalIndex;
    const updatedPatient = { ...updatedPatients[originalIndex] };

    if (!Array.isArray(updatedPatient.prescriptions)) {
      updatedPatient.prescriptions = [];
    }
    updatedPatient.prescriptions.push(medicine);

    updatedPatients[originalIndex] = updatedPatient;
    setPatients(updatedPatients);

    // Clear input and close input box
    setMedicineInputs((prev) => ({ ...prev, [assignedIndex]: "" }));
    setPatientIdForPrescription(null);
  };

  return (
    <div className="dashboard-container">
      <h2>Doctor Dashboard</h2>
      <button onClick={onLogout} style={{ float: "right", marginBottom: "10px" }}>
        Logout
      </button>
      <h3>Assigned Patients</h3>
      <ul className="patients-list">
        {assignedPatients.length === 0 && <p>No patients assigned.</p>}
        {assignedPatients.map((p, i) => (
          <li key={i} className="patient-item">
            <strong>{p.name}</strong> <span>(Age: {p.age}, Contact: {p.contact})</span>
            <br />
            <button onClick={() => setPatientIdForPrescription(i)}>Add Prescription</button>

            {patientIdForPrescription === i && (
              <div className="prescription-input" style={{ marginTop: "10px" }}>
                <input
                  type="text"
                  placeholder="Medicine name"
                  value={medicineInputs[i] || ""}
                  onChange={(e) => handleMedicineChange(i, e.target.value)}
                />
                <button onClick={() => addPrescription(i)}>Save</button>
                <button onClick={() => setPatientIdForPrescription(null)}>Cancel</button>
              </div>
            )}

            {Array.isArray(p.prescriptions) && p.prescriptions.length > 0 && (
              <div className="prescriptions-list" style={{ marginTop: "10px" }}>
                <strong>Prescriptions:</strong>
                <ul>
                  {p.prescriptions.map((med, idx) => (
                    <li key={idx}>{med}</li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
