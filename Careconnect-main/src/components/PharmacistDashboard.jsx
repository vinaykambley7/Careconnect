import React, { useState } from "react";
import "./PharmacistDashboard.css";

export default function PharmacistDashboard({ patients, setPatients, showToast }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDoctor, setFilterDoctor] = useState("");
  const [dispenseFilter, setDispenseFilter] = useState("all"); // all, pending, dispensed

  // Extract unique doctor names from patients
  const uniqueDoctors = [
    ...new Set(patients.map((p) => p.doctorName || p.doctor).filter(Boolean))
  ];

  // Calculate live stats
  let totalPrescribedMeds = 0;
  let totalDispensedMeds = 0;

  patients.forEach((p) => {
    (p.prescriptions || []).forEach((rx) => {
      totalPrescribedMeds++;
      if (rx.dispensed) totalDispensedMeds++;
    });
  });

  const totalPendingMeds = totalPrescribedMeds - totalDispensedMeds;

  // Toggle single medicine dispensed status
  const handleToggleDispensed = (patientId, rxId) => {
    const updatedPatients = patients.map((p) => {
      if (p.id === patientId) {
        const updatedRx = (p.prescriptions || []).map((rx) => {
          if (rx.id === rxId) {
            const nextDispensed = !rx.dispensed;
            return {
              ...rx,
              dispensed: nextDispensed,
              dispensedAt: nextDispensed
                ? new Date().toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit"
                  })
                : null
            };
          }
          return rx;
        });

        // If all prescriptions are dispensed, mark patient as Dispensed
        const allDispensed = updatedRx.length > 0 && updatedRx.every((rx) => rx.dispensed);
        return {
          ...p,
          status: allDispensed ? "Dispensed" : "Prescribed",
          prescriptions: updatedRx
        };
      }
      return p;
    });

    setPatients(updatedPatients);
    if (showToast) showToast("Medicine status updated and saved.", "success");
  };

  // Dispense all medicines for a given patient at once
  const handleDispenseAllForPatient = (patientId) => {
    const updatedPatients = patients.map((p) => {
      if (p.id === patientId) {
        const timeNow = new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit"
        });
        const updatedRx = (p.prescriptions || []).map((rx) => ({
          ...rx,
          dispensed: true,
          dispensedAt: rx.dispensedAt || timeNow
        }));

        return {
          ...p,
          status: "Dispensed",
          prescriptions: updatedRx
        };
      }
      return p;
    });

    setPatients(updatedPatients);
    if (showToast) showToast("All medications dispensed for patient!", "success");
  };

  // Filter patients
  const filteredPatients = patients.filter((patient) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      (patient.name && patient.name.toLowerCase().includes(search)) ||
      (patient.id && patient.id.toLowerCase().includes(search)) ||
      (patient.doctorName && patient.doctorName.toLowerCase().includes(search)) ||
      (patient.prescriptions &&
        patient.prescriptions.some((rx) =>
          rx.medicine && rx.medicine.toLowerCase().includes(search)
        ));

    const matchesDoctor = filterDoctor
      ? (patient.doctorName === filterDoctor || patient.doctor === filterDoctor)
      : true;

    const rxList = patient.prescriptions || [];
    let matchesDispenseFilter = true;
    if (dispenseFilter === "pending") {
      matchesDispenseFilter = rxList.some((rx) => !rx.dispensed);
    } else if (dispenseFilter === "dispensed") {
      matchesDispenseFilter = rxList.length > 0 && rxList.every((rx) => rx.dispensed);
    }

    return matchesSearch && matchesDoctor && matchesDispenseFilter;
  });

  return (
    <div className="pharma-container">
      {/* Pharmacy Metric Cards */}
      <div className="pharma-stats-grid">
        <div className="pharma-stat-card">
          <div className="pharma-icon blue">💊</div>
          <div className="stat-content">
            <span className="p-stat-value">{totalPrescribedMeds}</span>
            <span className="p-stat-label">Total Prescribed</span>
          </div>
        </div>
        <div className="pharma-stat-card">
          <div className="pharma-icon yellow">⏳</div>
          <div className="stat-content">
            <span className="p-stat-value yellow-text">{totalPendingMeds}</span>
            <span className="p-stat-label">Awaiting Dispense</span>
          </div>
        </div>
        <div className="pharma-stat-card">
          <div className="pharma-icon green">✅</div>
          <div className="stat-content">
            <span className="p-stat-value green-text">{totalDispensedMeds}</span>
            <span className="p-stat-label">Dispensed Today</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="pharma-controls">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search patient, ID, doctor, or medication name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pharma-search-input"
          />
          {searchTerm && (
            <button className="clear-btn" onClick={() => setSearchTerm("")}>
              ✕
            </button>
          )}
        </div>

        <div className="filters-wrapper">
          <select
            value={filterDoctor}
            onChange={(e) => setFilterDoctor(e.target.value)}
            className="doctor-filter-select"
          >
            <option value="">All Consulting Doctors</option>
            {uniqueDoctors.map((doc) => (
              <option key={doc} value={doc}>
                {doc}
              </option>
            ))}
          </select>

          <div className="toggle-pills">
            <button
              type="button"
              className={`t-pill ${dispenseFilter === "all" ? "active" : ""}`}
              onClick={() => setDispenseFilter("all")}
            >
              All
            </button>
            <button
              type="button"
              className={`t-pill ${dispenseFilter === "pending" ? "active" : ""}`}
              onClick={() => setDispenseFilter("pending")}
            >
              Pending ({totalPendingMeds})
            </button>
            <button
              type="button"
              className={`t-pill ${dispenseFilter === "dispensed" ? "active" : ""}`}
              onClick={() => setDispenseFilter("dispensed")}
            >
              Completed ({totalDispensedMeds})
            </button>
          </div>
        </div>
      </div>

      {/* Patients & Prescriptions List */}
      <div className="pharma-cards-list">
        {filteredPatients.length === 0 ? (
          <div className="pharma-empty-state">
            <p className="empty-icon">📦</p>
            <h3>No Prescriptions Match Your Criteria</h3>
            <p>Try clearing filters or changing your search keyword.</p>
          </div>
        ) : (
          filteredPatients.map((patient) => {
            const rxList = patient.prescriptions || [];
            const hasPending = rxList.some((rx) => !rx.dispensed);
            const allDispensed = rxList.length > 0 && rxList.every((rx) => rx.dispensed);

            return (
              <div key={patient.id} className="pharma-patient-card">
                <div className="pharma-card-header">
                  <div className="p-info-left">
                    <span className="p-badge-id">{patient.id}</span>
                    <h4 className="p-name">{patient.name}</h4>
                    <span className="p-sub-info">
                      Age: {patient.age} • 📞 {patient.contact} • 🩺 {patient.doctorName || patient.doctor}
                    </span>
                  </div>

                  <div className="p-info-right">
                    <span className={`pharma-status-badge ${allDispensed ? "done" : hasPending ? "pending" : "empty"}`}>
                      {allDispensed ? "✓ Fully Dispensed" : hasPending ? "⏳ Dispensation Pending" : "No Rx"}
                    </span>
                    {hasPending && (
                      <button
                        className="dispense-all-btn"
                        onClick={() => handleDispenseAllForPatient(patient.id)}
                      >
                        ✓ Dispense All
                      </button>
                    )}
                  </div>
                </div>

                <div className="pharma-rx-table-container">
                  {rxList.length === 0 ? (
                    <p className="no-rx-text">No active prescription recorded by the doctor yet.</p>
                  ) : (
                    <table className="rx-table">
                      <thead>
                        <tr>
                          <th>Medicine & Dosage</th>
                          <th>Frequency / Duration</th>
                          <th>Instructions</th>
                          <th>Status</th>
                          <th style={{ textAlign: "right" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rxList.map((rx) => (
                          <tr key={rx.id} className={rx.dispensed ? "row-dispensed" : "row-pending"}>
                            <td>
                              <strong className="med-name-bold">{rx.medicine}</strong>
                              <span className="med-dosage-sub">{rx.dosage}</span>
                            </td>
                            <td>
                              <span className="med-freq-tag">{rx.frequency}</span>
                              <span className="med-dur-tag">{rx.duration}</span>
                            </td>
                            <td className="med-instr">{rx.instructions || "As instructed"}</td>
                            <td>
                              {rx.dispensed ? (
                                <span className="status-indicator dispensed">
                                  ✔ Dispensed {rx.dispensedAt && `at ${rx.dispensedAt}`}
                                </span>
                              ) : (
                                <span className="status-indicator pending">
                                  ⏳ Awaiting Dispense
                                </span>
                              )}
                            </td>
                            <td style={{ textAlign: "right" }}>
                              <button
                                className={`dispense-toggle-btn ${rx.dispensed ? "undo" : "mark"}`}
                                onClick={() => handleToggleDispensed(patient.id, rx.id)}
                              >
                                {rx.dispensed ? "↺ Undo" : "✓ Mark Dispensed"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
