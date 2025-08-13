import React, { useState } from "react";
import "./PharmacistDashboard.css";

export default function PharmacistDashboard({ patients, onLogout }) {
  const [dispensed, setDispensed] = useState({}); // track which medicines are dispensed
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDoctor, setFilterDoctor] = useState("");

  const uniqueDoctors = [...new Set(patients.map((p) => p.doctor))];

  // Filter patients based on search term and doctor filter
  const filteredPatients = patients.filter((patient) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      patient.name.toLowerCase().includes(search) ||
      patient.doctor.toLowerCase().includes(search) ||
      (patient.prescriptions &&
        patient.prescriptions.some((med) => med.toLowerCase().includes(search)));

    const matchesDoctor = filterDoctor ? patient.doctor === filterDoctor : true;

    return matchesSearch && matchesDoctor;
  });

  const toggleDispensed = (patientIndex, med) => {
    setDispensed((prev) => {
      const key = `${patientIndex}-${med}`;
      return { ...prev, [key]: !prev[key] };
    });
  };

  return (
    <div className="dashboard-container">
      <h2>Pharmacist Dashboard</h2>


      {/* Search input */}
      <input
        type="text"
        placeholder="Search patients, doctors, or medicines"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "10px", padding: "6px", width: "60%" }}
      />

      {/* Filter dropdown */}
      <select
        value={filterDoctor}
        onChange={(e) => setFilterDoctor(e.target.value)}
        style={{ marginLeft: "10px", padding: "6px" }}
      >
        <option value="">Filter by Doctor</option>
        {uniqueDoctors.map((doc) => (
          <option key={doc} value={doc}>
            {doc}
          </option>
        ))}
      </select>

      <h3>Prescriptions List</h3>

      {filteredPatients.length === 0 && <p>No patients found.</p>}

      <ul>
        {filteredPatients.map((patient, i) => (
          <li key={i} style={{ marginBottom: "30px" }}>
            <strong>{patient.name}</strong> (Age: {patient.age}) - Doctor: {patient.doctor}
            <br />
            <strong>Prescriptions:</strong>
            <ul>
              {(patient.prescriptions || []).length === 0 && <li>No prescriptions yet.</li>}
              {(patient.prescriptions || []).map((med, idx) => {
                const key = `${i}-${med}`;
                return (
                  <li key={idx}>
                    {med}{" "}
                    <button onClick={() => toggleDispensed(i, med)}>
                      {dispensed[key] ? "Mark as Undispensed" : "Mark as Dispensed"}
                    </button>
                    {dispensed[key] && (
                      <span style={{ color: "green", marginLeft: "10px" }}>✔ Dispensed</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
