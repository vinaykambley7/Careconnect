// ReportsDashboard.js
import React from "react";

export default function ReportsDashboard({ patients }) {
  const totalPatients = patients.length;
  const totalPrescriptions = patients.reduce(
    (sum, p) => sum + (p.prescriptions?.length || 0),
    0
  );

  return (
    <div style={{ maxWidth: 600, margin: "20px auto", padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
      <h2>Reports & Analytics</h2>
      <p><strong>Total Patients:</strong> {totalPatients}</p>
      <p><strong>Total Prescriptions Given:</strong> {totalPrescriptions}</p>
      <p><strong>Total Medicines Dispensed:</strong> {totalPrescriptions}</p>
    </div>
  );
}

