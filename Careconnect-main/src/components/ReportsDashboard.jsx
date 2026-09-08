import React from "react";
import "./ReportsDashboard.css";
import { DOCTORS } from "../data/mockData";

export default function ReportsDashboard({ patients }) {
  const totalPatients = patients.length;
  const waitingCount = patients.filter((p) => p.status === "Waiting").length;
  const prescribedCount = patients.filter((p) => p.status === "Prescribed").length;
  const completedCount = patients.filter(
    (p) => p.status === "Dispensed" || p.status === "Completed"
  ).length;

  let totalPrescriptionItems = 0;
  let totalDispensedItems = 0;
  const medCounts = {};

  patients.forEach((p) => {
    (p.prescriptions || []).forEach((rx) => {
      totalPrescriptionItems++;
      if (rx.dispensed) totalDispensedItems++;

      const medName = rx.medicine || "Unknown";
      if (!medCounts[medName]) {
        medCounts[medName] = { name: medName, count: 0, dispensed: 0 };
      }
      medCounts[medName].count++;
      if (rx.dispensed) medCounts[medName].dispensed++;
    });
  });

  const dispenseRate =
    totalPrescriptionItems > 0
      ? Math.round((totalDispensedItems / totalPrescriptionItems) * 100)
      : 0;

  // Doctor workload distribution
  const doctorStats = DOCTORS.map((doc) => {
    const docPatients = patients.filter(
      (p) => p.doctor && p.doctor.toLowerCase() === doc.username.toLowerCase()
    );
    const docRxCount = docPatients.reduce(
      (acc, p) => acc + (p.prescriptions?.length || 0),
      0
    );
    return {
      ...doc,
      patientCount: docPatients.length,
      rxCount: docRxCount
    };
  });

  const topMeds = Object.values(medCounts).sort((a, b) => b.count - a.count);

  return (
    <div className="reports-container">
      {/* Reports Header */}
      <div className="reports-header-row">
        <div>
          <h2>📊 Hospital Analytics & Clinical Reports</h2>
          <p className="reports-sub">
            Real-time operational metrics across Reception, Doctors, and Pharmacy
          </p>
        </div>
        <button
          className="print-report-btn"
          onClick={() => window.print()}
          title="Print or save PDF report"
        >
          🖨️ Print / Save PDF
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon blue">👥</div>
          <div className="kpi-body">
            <span className="kpi-value">{totalPatients}</span>
            <span className="kpi-label">Total Patients Registered</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon yellow">⏳</div>
          <div className="kpi-body">
            <span className="kpi-value">{waitingCount}</span>
            <span className="kpi-label">Awaiting Consultation</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon purple">💊</div>
          <div className="kpi-body">
            <span className="kpi-value">{totalPrescriptionItems}</span>
            <span className="kpi-label">Prescriptions Written</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon green">✅</div>
          <div className="kpi-body">
            <span className="kpi-value">{totalDispensedItems}</span>
            <span className="kpi-label">Medicines Dispensed ({dispenseRate}%)</span>
          </div>
        </div>
      </div>

      {/* Pharmacy Fulfillment Progress */}
      <div className="fulfillment-card">
        <div className="progress-header">
          <span className="prog-title">Pharmacy Fulfillment Rate</span>
          <span className="prog-pct">{dispenseRate}% Completed</span>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${dispenseRate}%` }} />
        </div>
        <div className="progress-legend">
          <span>{totalDispensedItems} Dispensed</span>
          <span>{totalPrescriptionItems - totalDispensedItems} Pending</span>
        </div>
      </div>

      {/* 2-Column Analytics Sections */}
      <div className="analytics-split-layout">
        {/* Doctor Workload Distribution */}
        <div className="analytics-card">
          <h3 className="section-title">🩺 Doctor Consultation Distribution</h3>
          <div className="doctor-load-list">
            {doctorStats.map((doc) => {
              const pct =
                totalPatients > 0
                  ? Math.round((doc.patientCount / totalPatients) * 100)
                  : 0;
              return (
                <div key={doc.id} className="doc-load-item">
                  <div className="doc-load-top">
                    <div>
                      <strong>{doc.name}</strong>
                      <span className="doc-spec">{doc.specialty}</span>
                    </div>
                    <span className="doc-stat-pill">
                      {doc.patientCount} Patients • {doc.rxCount} Rx
                    </span>
                  </div>
                  <div className="mini-progress-bg">
                    <div
                      className="mini-progress-fill"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Prescribed Medications */}
        <div className="analytics-card">
          <h3 className="section-title">💊 Medication Dispensation Log</h3>
          {topMeds.length === 0 ? (
            <p className="no-data-msg">No medications recorded yet.</p>
          ) : (
            <div className="meds-table-wrapper">
              <table className="meds-summary-table">
                <thead>
                  <tr>
                    <th>Medicine</th>
                    <th>Prescribed</th>
                    <th>Dispensed</th>
                    <th>Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {topMeds.map((med) => {
                    const rate =
                      med.count > 0 ? Math.round((med.dispensed / med.count) * 100) : 0;
                    return (
                      <tr key={med.name}>
                        <td><strong>{med.name}</strong></td>
                        <td>{med.count}</td>
                        <td>{med.dispensed}</td>
                        <td>
                          <span className={`rate-badge ${rate === 100 ? "full" : "partial"}`}>
                            {rate}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
