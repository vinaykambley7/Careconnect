// ==========================================================================
// CareConnect Health System - Official Hospital Information System (HIS)
// Pure Vanilla JavaScript (Zero Dependencies, Medical Theme, Clean Architecture)
// ==========================================================================

// SVG Medical Icon Library (Eliminating messy emojis)
const ICONS = {
  cross: `<svg viewBox="0 0 24 24"><path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/></svg>`,
  user: `<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
  doctor: `<svg viewBox="0 0 24 24"><path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3V8zm-7 4c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-1.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
  pill: `<svg viewBox="0 0 24 24"><path d="M6 3h12c1.66 0 3 1.34 3 3v12c0 1.66-1.34 3-3 3H6c-1.66 0-3-1.34-3-3V6c0-1.66 1.34-3 3-3zm0 2c-.55 0-1 .45-1 1v5h14V6c0-.55-.45-1-1-1H6zm14 8H4v5c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-5z"/></svg>`,
  clock: `<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>`,
  check: `<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
  search: `<svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>`,
  clipboard: `<svg viewBox="0 0 24 24"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>`,
  printer: `<svg viewBox="0 0 24 24"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>`,
  trash: `<svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`
};

// Authorized Hospital Staff Directory
const USERS = [
  {
    username: "reception1",
    password: "1234",
    role: "Receptionist",
    name: "Sarah Jenkins",
    title: "Patient Intake Coordinator",
    badge: "Front Desk",
    badgeColor: "#0d9488"
  },
  {
    username: "doctor1",
    password: "1234",
    role: "Doctor",
    name: "Dr. Rajesh Sharma",
    title: "Senior Cardiologist (MD)",
    badge: "Cardiology",
    badgeColor: "#0284c7"
  },
  {
    username: "doctor2",
    password: "1234",
    role: "Doctor",
    name: "Dr. Ananya Patel",
    title: "Consulting Physician (MBBS)",
    badge: "Medicine",
    badgeColor: "#7c3aed"
  },
  {
    username: "pharma1",
    password: "1234",
    role: "Pharmacist",
    name: "Alex Rivera",
    title: "Lead Dispensary Pharmacist",
    badge: "Dispensary",
    badgeColor: "#059669"
  }
];

// Active Hospital Doctors
const DOCTORS = [
  {
    id: "doctor1",
    username: "doctor1",
    name: "Dr. Rajesh Sharma",
    specialty: "Cardiology (MD)",
    room: "Cabin 102"
  },
  {
    id: "doctor2",
    username: "doctor2",
    name: "Dr. Ananya Patel",
    specialty: "General Medicine (MBBS)",
    room: "Cabin 205"
  }
];

// Official Hospital Formulary (Quick Auto-Fill Catalog)
const COMMON_MEDICINES = [
  { name: "Paracetamol", defaultDosage: "500 mg", defaultFreq: "1-0-1 (Twice daily)", defaultDuration: "3 days", defaultInstructions: "After meals with water" },
  { name: "Amoxicillin", defaultDosage: "500 mg", defaultFreq: "1-1-1 (Thrice daily)", defaultDuration: "5 days", defaultInstructions: "After meals" },
  { name: "Cetirizine", defaultDosage: "10 mg", defaultFreq: "0-0-1 (Once at bedtime)", defaultDuration: "5 days", defaultInstructions: "Take at night" },
  { name: "Omeprazole", defaultDosage: "20 mg", defaultFreq: "1-0-0 (Once daily)", defaultDuration: "7 days", defaultInstructions: "30 mins before breakfast" },
  { name: "Azithromycin", defaultDosage: "500 mg", defaultFreq: "1-0-0 (Once daily)", defaultDuration: "3 days", defaultInstructions: "1 hour before food" },
  { name: "Metformin", defaultDosage: "500 mg", defaultFreq: "1-0-1 (Twice daily)", defaultDuration: "30 days", defaultInstructions: "With meals" },
  { name: "Atorvastatin", defaultDosage: "10 mg", defaultFreq: "0-0-1 (Once at night)", defaultDuration: "30 days", defaultInstructions: "At bedtime" },
  { name: "Ibuprofen", defaultDosage: "400 mg", defaultFreq: "1-0-1 (Twice daily)", defaultDuration: "3 days", defaultInstructions: "Strictly after meals" }
];

// Sample Hospital Patients for Triage Roster
const INITIAL_PATIENTS = [
  {
    id: "PAT-1001",
    name: "Ramesh Kumar",
    age: 46,
    gender: "Male",
    contact: "+91 98450 12345",
    doctor: "doctor1",
    doctorName: "Dr. Rajesh Sharma",
    symptoms: "Mild chest tightness, elevated BP history",
    vitals: { bp: "135/90", temp: "98.4 °F", pulse: "82 bpm" },
    registeredAt: "08 Sep 2026, 09:30 AM",
    status: "Prescribed",
    prescriptions: [
      {
        id: "RX-101",
        medicine: "Atorvastatin",
        dosage: "10 mg",
        frequency: "0-0-1 (Once at night)",
        duration: "30 days",
        instructions: "Take at bedtime",
        dispensed: true,
        dispensedAt: "10:15 AM"
      },
      {
        id: "RX-102",
        medicine: "Paracetamol",
        dosage: "500 mg",
        frequency: "1-0-1 (Twice daily)",
        duration: "3 days",
        instructions: "Take as needed for chest ache",
        dispensed: false,
        dispensedAt: null
      }
    ]
  },
  {
    id: "PAT-1002",
    name: "Priya Sharma",
    age: 29,
    gender: "Female",
    contact: "+91 97123 45678",
    doctor: "doctor2",
    doctorName: "Dr. Ananya Patel",
    symptoms: "High seasonal fever, persistent dry cough",
    vitals: { bp: "118/76", temp: "101.2 °F", pulse: "94 bpm" },
    registeredAt: "08 Sep 2026, 10:10 AM",
    status: "Prescribed",
    prescriptions: [
      {
        id: "RX-103",
        medicine: "Paracetamol",
        dosage: "500 mg",
        frequency: "1-1-1 (Thrice daily)",
        duration: "3 days",
        instructions: "After meals with water",
        dispensed: true,
        dispensedAt: "10:45 AM"
      },
      {
        id: "RX-104",
        medicine: "Cetirizine",
        dosage: "10 mg",
        frequency: "0-0-1 (Once at night)",
        duration: "5 days",
        instructions: "Take at bedtime",
        dispensed: false,
        dispensedAt: null
      }
    ]
  },
  {
    id: "PAT-1003",
    name: "Anil Deshmukh",
    age: 58,
    gender: "Male",
    contact: "+91 98220 98765",
    doctor: "doctor1",
    doctorName: "Dr. Rajesh Sharma",
    symptoms: "Arrhythmia palpitations and fatigue",
    vitals: { bp: "142/92", temp: "98.6 °F", pulse: "88 bpm" },
    registeredAt: "08 Sep 2026, 11:00 AM",
    status: "Waiting",
    prescriptions: []
  },
  {
    id: "PAT-1004",
    name: "Sneha Reddy",
    age: 34,
    gender: "Female",
    contact: "+91 94401 23456",
    doctor: "doctor2",
    doctorName: "Dr. Ananya Patel",
    symptoms: "Acid reflux and recurring gastric distress",
    vitals: { bp: "120/80", temp: "98.2 °F", pulse: "74 bpm" },
    registeredAt: "08 Sep 2026, 11:45 AM",
    status: "Dispensed",
    prescriptions: [
      {
        id: "RX-105",
        medicine: "Omeprazole",
        dosage: "20 mg",
        frequency: "1-0-0 (Once daily)",
        duration: "7 days",
        instructions: "30 mins before breakfast",
        dispensed: true,
        dispensedAt: "12:15 PM"
      }
    ]
  }
];

// App State
let currentUser = null;
let currentTab = "desk";
let patients = [];

// Filter States
let receptionSearch = "";
let receptionStatusFilter = "All";
let pharmaSearch = "";
let pharmaDoctorFilter = "";
let pharmaDispenseFilter = "all";
let activeDoctorPrescriptionPatientId = null;

// Initialization
function initApp() {
  try {
    const savedPatients = localStorage.getItem("careconnect_patients");
    if (savedPatients) {
      patients = JSON.parse(savedPatients);
    } else {
      patients = [...INITIAL_PATIENTS];
      savePatients(patients);
    }
  } catch (e) {
    patients = [...INITIAL_PATIENTS];
  }

  try {
    const savedUser = localStorage.getItem("careconnect_user");
    if (savedUser) {
      currentUser = JSON.parse(savedUser);
    }
  } catch (e) {
    currentUser = null;
  }

  renderApp();
}

function savePatients(newPatients) {
  patients = newPatients;
  try {
    localStorage.setItem("careconnect_patients", JSON.stringify(patients));
  } catch (e) {
    console.error("Storage error", e);
  }
}

// Clinical Toast Alert
function showToast(msg, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === "success" ? "✔" : type === "error" ? "✖" : "ℹ"}</span> <span>${msg}</span>`;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-8px)";
    toast.style.transition = "all 0.2s ease";
    setTimeout(() => toast.remove(), 200);
  }, 3000);
}

// Authentication
function quickLogin(username) {
  const user = USERS.find((u) => u.username === username);
  if (user) {
    currentUser = user;
    localStorage.setItem("careconnect_user", JSON.stringify(user));
    showToast(`Signed in as ${user.name} (${user.role})`, "success");
    renderApp();
  }
}

function handleManualLogin(e) {
  if (e) e.preventDefault();
  const role = document.getElementById("loginRole").value;
  const uname = document.getElementById("loginUsername").value.trim().toLowerCase();
  const pwd = document.getElementById("loginPassword").value;
  const alertBox = document.getElementById("loginErrorAlert");

  const user = USERS.find(
    (u) => u.username.toLowerCase() === uname && u.password === pwd && u.role === role
  );

  if (user) {
    alertBox.style.display = "none";
    currentUser = user;
    localStorage.setItem("careconnect_user", JSON.stringify(user));
    showToast(`Welcome back, ${user.name}`, "success");
    renderApp();
  } else {
    alertBox.textContent = "Invalid staff credentials or department role mismatch.";
    alertBox.style.display = "block";
  }
}

function logout() {
  currentUser = null;
  localStorage.removeItem("careconnect_user");
  currentTab = "desk";
  activeDoctorPrescriptionPatientId = null;
  renderApp();
}

function switchTab(tab) {
  currentTab = tab;
  renderApp();
}

function togglePasswordVisibility() {
  const input = document.getElementById("loginPassword");
  const btn = document.getElementById("togglePwdBtn");
  if (input.type === "password") {
    input.type = "text";
    btn.textContent = "Hide";
  } else {
    input.type = "password";
    btn.textContent = "Show";
  }
}

// Master View Router
function renderApp() {
  const loginView = document.getElementById("loginView");
  const appView = document.getElementById("appView");

  if (!currentUser) {
    loginView.style.display = "flex";
    appView.style.display = "none";
    return;
  }

  loginView.style.display = "none";
  appView.style.display = "block";

  // Update Header Identity
  document.getElementById("userDisplayName").textContent = currentUser.name || currentUser.username;
  document.getElementById("userRoleTag").textContent = currentUser.title || currentUser.role;

  const tabDesk = document.getElementById("tabDesk");
  const tabReports = document.getElementById("tabReports");

  tabDesk.querySelector("span").textContent = `${currentUser.role} Desk`;

  if (currentTab === "desk") {
    tabDesk.classList.add("active");
    tabReports.classList.remove("active");
    document.getElementById("deskSection").style.display = "block";
    document.getElementById("reportsSection").style.display = "none";
    renderRoleDesk();
  } else {
    tabDesk.classList.remove("active");
    tabReports.classList.add("active");
    document.getElementById("deskSection").style.display = "none";
    document.getElementById("reportsSection").style.display = "block";
    renderReports();
  }
}

function renderRoleDesk() {
  const container = document.getElementById("deskSection");
  if (currentUser.role === "Receptionist") {
    renderReceptionistDesk(container);
  } else if (currentUser.role === "Doctor") {
    renderDoctorDesk(container);
  } else if (currentUser.role === "Pharmacist") {
    renderPharmacistDesk(container);
  }
}

// ==========================================================================
// 1. RECEPTIONIST DESK (PATIENT INTAKE & ROSTER)
// ==========================================================================
function renderReceptionistDesk(container) {
  const waitingCount = patients.filter((p) => p.status === "Waiting").length;
  const prescribedCount = patients.filter((p) => p.status === "Prescribed").length;
  const dispensedCount = patients.filter((p) => p.status === "Dispensed").length;

  const filtered = patients.filter((p) => {
    const s = receptionSearch.toLowerCase();
    const matchSearch =
      (p.name && p.name.toLowerCase().includes(s)) ||
      (p.id && p.id.toLowerCase().includes(s)) ||
      (p.contact && p.contact.includes(s)) ||
      (p.doctorName && p.doctorName.toLowerCase().includes(s));
    const matchStatus = receptionStatusFilter === "All" || p.status === receptionStatusFilter;
    return matchSearch && matchStatus;
  });

  container.innerHTML = `
    <div class="desk-container">
      <!-- Hospital Metrics Row -->
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon-wrapper teal">${ICONS.user}</div>
          <div class="stat-content">
            <span class="stat-number">${patients.length}</span>
            <span class="stat-title">Admitted Patients</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrapper amber">${ICONS.clock}</div>
          <div class="stat-content">
            <span class="stat-number">${waitingCount}</span>
            <span class="stat-title">Awaiting Consultation</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrapper blue">${ICONS.clipboard}</div>
          <div class="stat-content">
            <span class="stat-number">${prescribedCount}</span>
            <span class="stat-title">Consulted / Prescribed</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrapper green">${ICONS.check}</div>
          <div class="stat-content">
            <span class="stat-number">${dispensedCount}</span>
            <span class="stat-title">Medicines Dispensed</span>
          </div>
        </div>
      </div>

      <!-- 2-Column Clinical Layout -->
      <div class="reception-grid">
        <!-- Patient Admission Form -->
        <div class="panel-card">
          <div class="panel-header">
            <div>
              <h3 class="panel-title">Patient Intake & Triage</h3>
              <p class="panel-subtitle">Register new patient & assign clinical queue</p>
            </div>
          </div>

          <form id="patientRegForm" onsubmit="handleRegisterPatient(event)" class="form-layout">
            <div class="form-row-2">
              <div class="form-group">
                <label>Patient Full Name *</label>
                <input type="text" id="regName" class="input-control" placeholder="e.g. Rahul Verma" required />
              </div>
              <div class="form-group">
                <label>Age *</label>
                <input type="number" id="regAge" class="input-control" placeholder="Age" min="1" max="120" required />
              </div>
            </div>

            <div class="form-row-equal">
              <div class="form-group">
                <label>Gender</label>
                <select id="regGender" class="input-control">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div class="form-group">
                <label>Contact Phone *</label>
                <input type="text" id="regContact" class="input-control" placeholder="+91 98765 43210" required />
              </div>
            </div>

            <div class="form-group">
              <label>Consulting Doctor Assignment *</label>
              <select id="regDoctor" class="input-control" style="color: var(--hospital-teal-hover); font-weight: 600;">
                ${DOCTORS.map((d) => `<option value="${d.username}">${d.name} — ${d.specialty} (${d.room})</option>`).join("")}
              </select>
            </div>

            <div class="form-group">
              <label>Chief Symptoms / Clinical Concern</label>
              <textarea id="regSymptoms" class="input-control" rows="2" placeholder="e.g. Mild chest pain, seasonal fever, cough..."></textarea>
            </div>

            <div class="form-row-equal">
              <div class="form-group">
                <label>Blood Pressure (BP)</label>
                <input type="text" id="regBP" class="input-control" placeholder="120/80" value="120/80" />
              </div>
              <div class="form-group">
                <label>Body Temperature</label>
                <input type="text" id="regTemp" class="input-control" placeholder="98.6 °F" value="98.6 °F" />
              </div>
            </div>

            <button type="submit" class="btn-primary" style="margin-top: 6px;">
              Queue Patient for Consultation ➔
            </button>
          </form>
        </div>

        <!-- Consultation Queue Stream -->
        <div class="panel-card">
          <div class="panel-header">
            <div>
              <h3 class="panel-title">Consultation Queue</h3>
              <p class="panel-subtitle">${filtered.length} active patient records</p>
            </div>

            <div class="filter-tabs">
              ${["All", "Waiting", "Prescribed", "Dispensed"]
                .map(
                  (st) =>
                    `<button type="button" class="filter-tab ${receptionStatusFilter === st ? "active" : ""}" onclick="setReceptionFilter('${st}')">${st}</button>`
                )
                .join("")}
            </div>
          </div>

          <!-- Search Bar -->
          <div class="search-container">
            <span class="search-icon-svg">${ICONS.search}</span>
            <input
              type="text"
              class="input-control"
              placeholder="Search by patient name, ID, phone, or doctor..."
              value="${receptionSearch}"
              oninput="handleReceptionSearch(this.value)"
            />
            ${receptionSearch ? `<button class="search-clear-btn" onclick="handleReceptionSearch('')">✕</button>` : ""}
          </div>

          <!-- Stream List -->
          <div class="patient-stream">
            ${
              filtered.length === 0
                ? `<div class="empty-placeholder"><div class="empty-icon">${ICONS.clipboard}</div><h3>No Patients Found</h3><p>No records match the search or filter criteria.</p></div>`
                : filtered
                    .map(
                      (p) => `
              <div class="patient-record-card">
                <div class="patient-record-header">
                  <div>
                    <span class="patient-id-tag">${p.id}</span>
                    <h4 class="patient-fullname">${p.name}</h4>
                    <span class="patient-subdata">${p.age} yrs • ${p.gender || "Patient"} • 📞 ${p.contact}</span>
                  </div>
                  <span class="status-badge ${(p.status || "waiting").toLowerCase()}">${p.status || "Waiting"}</span>
                </div>

                <div class="clinical-summary-box">
                  <div class="clinical-item">
                    <span class="clinical-item-label">Consulting Doctor</span>
                    <span class="clinical-item-value" style="color: var(--hospital-teal-hover); font-weight: 600;">🩺 ${p.doctorName || p.doctor}</span>
                  </div>
                  <div class="clinical-item">
                    <span class="clinical-item-label">Chief Symptoms</span>
                    <span class="clinical-item-value">${p.symptoms || "Routine Checkup"}</span>
                  </div>
                  <div class="clinical-item">
                    <span class="clinical-item-label">Clinical Vitals</span>
                    <span class="clinical-item-value">BP: ${p.vitals?.bp || "120/80"} | Temp: ${p.vitals?.temp || "98.6°F"}</span>
                  </div>
                  <div class="clinical-item">
                    <span class="clinical-item-label">Admission Time</span>
                    <span class="clinical-item-value">${p.registeredAt || "Today"}</span>
                  </div>
                </div>

                <div class="patient-record-footer">
                  <span style="color: var(--text-muted); font-weight: 500;">Prescriptions: ${(p.prescriptions || []).length} items</span>
                  <button class="btn-remove-patient" onclick="deletePatient('${p.id}', '${p.name}')">Remove</button>
                </div>
              </div>
            `
                    )
                    .join("")
            }
          </div>
        </div>
      </div>
    </div>
  `;
}

function handleRegisterPatient(e) {
  e.preventDefault();
  const name = document.getElementById("regName").value.trim();
  const age = Number(document.getElementById("regAge").value);
  const gender = document.getElementById("regGender").value;
  const contact = document.getElementById("regContact").value.trim();
  const docId = document.getElementById("regDoctor").value;
  const symptoms = document.getElementById("regSymptoms").value.trim();
  const bp = document.getElementById("regBP").value.trim() || "120/80";
  const temp = document.getElementById("regTemp").value.trim() || "98.6 °F";

  const assignedDoc = DOCTORS.find((d) => d.username === docId) || DOCTORS[0];
  const newId = `PAT-${Math.floor(1000 + Math.random() * 9000)}`;

  const newPatient = {
    id: newId,
    name,
    age,
    gender,
    contact,
    doctor: assignedDoc.username,
    doctorName: assignedDoc.name,
    symptoms: symptoms || "General Consultation",
    vitals: { bp, temp, pulse: "76 bpm" },
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

  const updated = [newPatient, ...patients];
  savePatients(updated);
  showToast(`Patient ${name} (${newId}) admitted to queue`, "success");
  renderRoleDesk();
}

function deletePatient(id, name) {
  if (confirm(`Remove admission record for ${name} (${id})?`)) {
    const updated = patients.filter((p) => p.id !== id);
    savePatients(updated);
    showToast(`Removed patient record ${name}`, "info");
    renderRoleDesk();
  }
}

function setReceptionFilter(status) {
  receptionStatusFilter = status;
  renderRoleDesk();
}

function handleReceptionSearch(val) {
  receptionSearch = val;
  renderRoleDesk();
}

// ==========================================================================
// 2. DOCTOR DESK (CLINICAL CONSULTATION)
// ==========================================================================
function renderDoctorDesk(container) {
  const assigned = patients.filter(
    (p) => p.doctor && p.doctor.toLowerCase() === currentUser.username.toLowerCase()
  );
  const waitingCount = assigned.filter((p) => p.status === "Waiting").length;

  container.innerHTML = `
    <div class="desk-container">
      <!-- Doctor Hero Card -->
      <div class="doctor-hero">
        <div class="doc-info-block">
          <div class="doc-avatar-circle">${ICONS.doctor}</div>
          <div class="doc-meta-info">
            <h2>${currentUser.name}</h2>
            <p>${currentUser.title} • Active Clinical Workstation</p>
          </div>
        </div>
        <div style="display: flex; gap: 12px;">
          <div class="doc-queue-pill">
            <span class="doc-queue-val">${assigned.length}</span>
            <span class="doc-queue-lbl">Assigned</span>
          </div>
          <div class="doc-queue-pill">
            <span class="doc-queue-val amber">${waitingCount}</span>
            <span class="doc-queue-lbl">Waiting</span>
          </div>
        </div>
      </div>

      <div class="panel-header" style="margin-bottom: 20px;">
        <div>
          <h3 class="panel-title">Assigned Patients Roster</h3>
          <p class="panel-subtitle">Review vitals, diagnose symptoms, and prescribe treatment</p>
        </div>
        <span class="system-tag">${assigned.length} Patients in Queue</span>
      </div>

      <div>
        ${
          assigned.length === 0
            ? `<div class="empty-placeholder"><div class="empty-icon">${ICONS.clipboard}</div><h3>No Patients Assigned</h3><p>Your consultation queue is clear at this time.</p></div>`
            : assigned
                .map((p) => {
                  const isDrawerOpen = activeDoctorPrescriptionPatientId === p.id;
                  const rxList = p.prescriptions || [];

                  return `
            <div class="doctor-patient-card">
              <div class="panel-header">
                <div>
                  <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
                    <span class="patient-id-tag">${p.id}</span>
                    <span class="status-badge ${(p.status || "waiting").toLowerCase()}">${p.status || "Waiting"}</span>
                  </div>
                  <h3 style="font-size: 16px; font-weight: 600; color: var(--text-title);">${p.name}</h3>
                  <p style="font-size: 12px; color: var(--text-muted);">${p.age} yrs • ${p.gender || "Patient"} • 📞 ${p.contact}</p>
                </div>

                <div class="action-row">
                  ${
                    p.status !== "Completed"
                      ? `<button class="btn-mark-consult-done" onclick="markPatientComplete('${p.id}')">✔ Complete Visit</button>`
                      : ""
                  }
                  <button class="btn-rx-action" onclick="toggleDoctorRxDrawer('${p.id}')">
                    ${isDrawerOpen ? "✕ Close Rx Pad" : "💊 Prescribe Medication"}
                  </button>
                </div>
              </div>

              <!-- Vitals Summary -->
              <div class="clinical-summary-box">
                <div class="clinical-item">
                  <span class="clinical-item-label">Chief Symptoms</span>
                  <span class="clinical-item-value" style="color: var(--badge-waiting-text); font-weight: 600;">${p.symptoms || "None reported"}</span>
                </div>
                <div class="clinical-item">
                  <span class="clinical-item-label">Recorded Vitals</span>
                  <span class="clinical-item-value">BP: ${p.vitals?.bp || "120/80"} | Temp: ${p.vitals?.temp || "98.6°F"}</span>
                </div>
                <div class="clinical-item">
                  <span class="clinical-item-label">Admission Logged</span>
                  <span class="clinical-item-value">${p.registeredAt || "Today"}</span>
                </div>
                <div class="clinical-item">
                  <span class="clinical-item-label">Current Status</span>
                  <span class="clinical-item-value">${p.status}</span>
                </div>
              </div>

              <!-- Prescription Drawer Form -->
              ${
                isDrawerOpen
                  ? `
                <div class="rx-drawer-card">
                  <h4 class="rx-drawer-heading">Prescription Pad: ${p.name} (${p.id})</h4>

                  <div style="margin-bottom: 12px;">
                    <label style="font-size: 11px; font-weight: 600; color: var(--hospital-teal-hover); text-transform: uppercase; letter-spacing: 0.03em;">Select from Hospital Formulary:</label>
                    <select class="input-control" style="color: var(--hospital-teal-hover); font-weight: 600; margin-top: 4px;" onchange="handleSelectCatalogMed(this.value)">
                      <option value="">-- Choose Medication from Catalog or Type Below --</option>
                      ${COMMON_MEDICINES.map((m) => `<option value="${m.name}">${m.name} (${m.defaultDosage}, ${m.defaultFreq})</option>`).join("")}
                    </select>
                  </div>

                  <form onsubmit="handleSavePrescription(event, '${p.id}')" class="form-layout">
                    <div class="rx-grid-4">
                      <div class="form-group">
                        <label>Medication *</label>
                        <input type="text" id="docRxMed" class="input-control" placeholder="e.g. Paracetamol" required />
                      </div>
                      <div class="form-group">
                        <label>Dosage</label>
                        <input type="text" id="docRxDosage" class="input-control" placeholder="500 mg" value="500 mg" />
                      </div>
                      <div class="form-group">
                        <label>Frequency</label>
                        <input type="text" id="docRxFreq" class="input-control" placeholder="1-0-1 (Twice daily)" value="1-0-1 (Twice daily)" />
                      </div>
                      <div class="form-group">
                        <label>Duration</label>
                        <input type="text" id="docRxDur" class="input-control" placeholder="5 days" value="5 days" />
                      </div>
                    </div>

                    <div class="form-group">
                      <label>Clinical Directions</label>
                      <input type="text" id="docRxInstr" class="input-control" placeholder="e.g. Take after meals with warm water" value="After meals" />
                    </div>

                    <div style="display: flex; gap: 10px; margin-top: 6px;">
                      <button type="submit" class="btn-primary" style="padding: 8px 18px; font-size: 12.5px;">
                        ✔ Save & Send to Dispensary
                      </button>
                      <button type="button" class="btn-logout" onclick="toggleDoctorRxDrawer('${p.id}')">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              `
                  : ""
              }

              <!-- Prescription List -->
              <div style="border-top: 1px solid var(--border-light); padding-top: 14px; margin-top: 12px;">
                <span style="font-size: 11px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.04em;">Active Prescriptions (${rxList.length}):</span>
                ${
                  rxList.length === 0
                    ? `<p style="font-size: 12px; color: var(--text-caption); font-style: italic; margin-top: 6px;">No medications prescribed yet.</p>`
                    : `
                  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 10px; margin-top: 8px;">
                    ${rxList
                      .map(
                        (rx, idx) => `
                      <div class="rx-item-tile">
                        <div class="rx-item-header">
                          <span style="font-size: 10.5px; font-weight: 700; color: var(--hospital-teal-hover); font-family: monospace;">RX #${idx + 1}</span>
                          <span class="rx-tag-pill ${rx.dispensed ? "done" : "wait"}">${rx.dispensed ? "✔ Dispensed" : "⏳ Pending"}</span>
                        </div>
                        <div style="font-size: 13.5px; font-weight: 600; color: var(--text-title); margin-bottom: 2px;">
                          ${rx.medicine} <span style="font-size: 12px; color: var(--text-muted); font-weight: 500;">(${rx.dosage})</span>
                        </div>
                        <p style="font-size: 12px; color: var(--text-body); margin-bottom: 2px;">${rx.frequency} • ${rx.duration}</p>
                        <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 8px;">Directions: ${rx.instructions || "As directed"}</p>
                        <button style="background: none; border: none; color: var(--badge-danger-text); font-size: 11px; cursor: pointer; font-weight: 600;" onclick="deletePrescription('${p.id}', '${rx.id}')">✕ Remove</button>
                      </div>
                    `
                      )
                      .join("")}
                  </div>
                `
                }
              </div>
            </div>
          `;
                })
                .join("")
        }
      </div>
    </div>
  `;
}

function toggleDoctorRxDrawer(patientId) {
  if (activeDoctorPrescriptionPatientId === patientId) {
    activeDoctorPrescriptionPatientId = null;
  } else {
    activeDoctorPrescriptionPatientId = patientId;
  }
  renderRoleDesk();
}

function handleSelectCatalogMed(medName) {
  if (!medName) return;
  const found = COMMON_MEDICINES.find((m) => m.name === medName);
  if (found) {
    document.getElementById("docRxMed").value = found.name;
    document.getElementById("docRxDosage").value = found.defaultDosage;
    document.getElementById("docRxFreq").value = found.defaultFreq;
    document.getElementById("docRxDur").value = found.defaultDuration;
    document.getElementById("docRxInstr").value = found.defaultInstructions;
  }
}

function handleSavePrescription(e, patientId) {
  e.preventDefault();
  const med = document.getElementById("docRxMed").value.trim();
  const dosage = document.getElementById("docRxDosage").value.trim() || "500 mg";
  const freq = document.getElementById("docRxFreq").value.trim() || "1-0-1 (Twice daily)";
  const dur = document.getElementById("docRxDur").value.trim() || "5 days";
  const instr = document.getElementById("docRxInstr").value.trim() || "After meals";

  const newRx = {
    id: `RX-${Math.floor(100 + Math.random() * 900)}`,
    medicine: med,
    dosage,
    frequency: freq,
    duration: dur,
    instructions: instr,
    dispensed: false,
    dispensedAt: null
  };

  const updated = patients.map((p) => {
    if (p.id === patientId) {
      const rxList = Array.isArray(p.prescriptions) ? p.prescriptions : [];
      return {
        ...p,
        status: "Prescribed",
        prescriptions: [...rxList, newRx]
      };
    }
    return p;
  });

  savePatients(updated);
  activeDoctorPrescriptionPatientId = null;
  showToast(`Prescription for ${med} saved and forwarded`, "success");
  renderRoleDesk();
}

function deletePrescription(patientId, rxId) {
  const updated = patients.map((p) => {
    if (p.id === patientId) {
      const filteredRx = (p.prescriptions || []).filter((rx) => rx.id !== rxId);
      return {
        ...p,
        status: filteredRx.length === 0 ? "Waiting" : p.status,
        prescriptions: filteredRx
      };
    }
    return p;
  });

  savePatients(updated);
  showToast("Prescription removed", "info");
  renderRoleDesk();
}

function markPatientComplete(patientId) {
  const updated = patients.map((p) =>
    p.id === patientId ? { ...p, status: "Completed" } : p
  );
  savePatients(updated);
  showToast("Consultation marked as completed", "success");
  renderRoleDesk();
}

// ==========================================================================
// 3. PHARMACIST DESK (DISPENSARY)
// ==========================================================================
function renderPharmacistDesk(container) {
  const uniqueDocs = [...new Set(patients.map((p) => p.doctorName || p.doctor).filter(Boolean))];

  let totalPrescribed = 0;
  let totalDispensed = 0;

  patients.forEach((p) => {
    (p.prescriptions || []).forEach((rx) => {
      totalPrescribed++;
      if (rx.dispensed) totalDispensed++;
    });
  });

  const totalPending = totalPrescribed - totalDispensed;

  const filtered = patients.filter((p) => {
    const s = pharmaSearch.toLowerCase();
    const matchSearch =
      (p.name && p.name.toLowerCase().includes(s)) ||
      (p.id && p.id.toLowerCase().includes(s)) ||
      (p.doctorName && p.doctorName.toLowerCase().includes(s)) ||
      (p.prescriptions && p.prescriptions.some((rx) => rx.medicine && rx.medicine.toLowerCase().includes(s)));

    const matchDoc = pharmaDoctorFilter
      ? (p.doctorName === pharmaDoctorFilter || p.doctor === pharmaDoctorFilter)
      : true;

    const rxList = p.prescriptions || [];
    let matchDispense = true;
    if (pharmaDispenseFilter === "pending") {
      matchDispense = rxList.some((rx) => !rx.dispensed);
    } else if (pharmaDispenseFilter === "dispensed") {
      matchDispense = rxList.length > 0 && rxList.every((rx) => rx.dispensed);
    }

    return matchSearch && matchDoc && matchDispense;
  });

  container.innerHTML = `
    <div class="desk-container">
      <!-- Metrics Cards -->
      <div class="stats-row" style="grid-template-columns: repeat(3, 1fr);">
        <div class="stat-card">
          <div class="stat-icon-wrapper blue">${ICONS.pill}</div>
          <div class="stat-content">
            <span class="stat-number">${totalPrescribed}</span>
            <span class="stat-title">Prescriptions Logged</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrapper amber">${ICONS.clock}</div>
          <div class="stat-content">
            <span class="stat-number">${totalPending}</span>
            <span class="stat-title">Awaiting Fulfillment</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrapper green">${ICONS.check}</div>
          <div class="stat-content">
            <span class="stat-number">${totalDispensed}</span>
            <span class="stat-title">Dispensed Items</span>
          </div>
        </div>
      </div>

      <!-- Controls Bar -->
      <div class="pharma-bar">
        <div class="search-container" style="margin-bottom: 0; min-width: 280px; flex: 1;">
          <span class="search-icon-svg">${ICONS.search}</span>
          <input
            type="text"
            class="input-control"
            placeholder="Search patient, ID, doctor, or medication..."
            value="${pharmaSearch}"
            oninput="handlePharmaSearch(this.value)"
          />
          ${pharmaSearch ? `<button class="search-clear-btn" onclick="handlePharmaSearch('')">✕</button>` : ""}
        </div>

        <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
          <select class="input-control" style="color: var(--hospital-teal-hover); font-weight: 600; width: auto;" onchange="handlePharmaDocFilter(this.value)">
            <option value="">All Consulting Doctors</option>
            ${uniqueDocs.map((doc) => `<option value="${doc}" ${pharmaDoctorFilter === doc ? "selected" : ""}>${doc}</option>`).join("")}
          </select>

          <div class="filter-tabs">
            <button type="button" class="filter-tab ${pharmaDispenseFilter === "all" ? "active" : ""}" onclick="setPharmaDispenseFilter('all')">All</button>
            <button type="button" class="filter-tab ${pharmaDispenseFilter === "pending" ? "active" : ""}" onclick="setPharmaDispenseFilter('pending')">Pending (${totalPending})</button>
            <button type="button" class="filter-tab ${pharmaDispenseFilter === "dispensed" ? "active" : ""}" onclick="setPharmaDispenseFilter('dispensed')">Completed (${totalDispensed})</button>
          </div>
        </div>
      </div>

      <!-- Dispensary Records Table -->
      <div>
        ${
          filtered.length === 0
            ? `<div class="empty-placeholder"><div class="empty-icon">${ICONS.pill}</div><h3>No Prescriptions Found</h3><p>Try resetting the search keyword or doctor filter.</p></div>`
            : filtered
                .map((patient) => {
                  const rxList = patient.prescriptions || [];
                  const hasPending = rxList.some((rx) => !rx.dispensed);
                  const allDispensed = rxList.length > 0 && rxList.every((rx) => rx.dispensed);

                  return `
            <div class="pharma-record-block">
              <div class="panel-header">
                <div>
                  <span class="patient-id-tag">${patient.id}</span>
                  <h4 style="font-size: 16px; font-weight: 600; color: var(--text-title); margin-top: 2px;">${patient.name}</h4>
                  <span style="font-size: 12px; color: var(--text-muted);">${patient.age} yrs • 📞 ${patient.contact} • 🩺 ${patient.doctorName || patient.doctor}</span>
                </div>

                <div style="display: flex; align-items: center; gap: 10px;">
                  <span class="status-badge ${allDispensed ? "dispensed" : hasPending ? "waiting" : "default"}">
                    ${allDispensed ? "✔ Fully Dispensed" : hasPending ? "⏳ Dispense Pending" : "No Rx"}
                  </span>
                  ${
                    hasPending
                      ? `<button class="btn-bulk-dispense" onclick="dispenseAllForPatient('${patient.id}')">✔ Dispense All</button>`
                      : ""
                  }
                </div>
              </div>

              <div class="data-table-container">
                ${
                  rxList.length === 0
                    ? `<p style="color: var(--text-muted); font-style: italic; padding: 14px;">No active prescriptions recorded.</p>`
                    : `
                  <table class="enterprise-table">
                    <thead>
                      <tr>
                        <th>Medication</th>
                        <th>Frequency & Duration</th>
                        <th>Clinical Directions</th>
                        <th>Status</th>
                        <th style="text-align: right;">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${rxList
                        .map(
                          (rx) => `
                        <tr style="${rx.dispensed ? "background-color: var(--hospital-teal-light);" : ""}">
                          <td>
                            <strong style="color: var(--text-title); font-size: 13px;">${rx.medicine}</strong>
                            <span style="display: block; font-size: 11px; color: var(--hospital-teal-hover); font-weight: 600;">${rx.dosage}</span>
                          </td>
                          <td>
                            <span style="display: block; font-size: 12px; color: var(--text-body); font-weight: 500;">${rx.frequency}</span>
                            <span style="font-size: 11px; color: var(--text-muted);">${rx.duration}</span>
                          </td>
                          <td style="color: var(--text-muted); font-size: 12px;">${rx.instructions || "As instructed"}</td>
                          <td>
                            ${
                              rx.dispensed
                                ? `<span style="color: var(--badge-dispensed-text); font-size: 11.5px; font-weight: 600;">✔ Dispensed ${rx.dispensedAt ? `(${rx.dispensedAt})` : ""}</span>`
                                : `<span style="color: var(--badge-waiting-text); font-size: 11.5px; font-weight: 600;">⏳ Awaiting Dispense</span>`
                            }
                          </td>
                          <td style="text-align: right;">
                            <button
                              class="btn-disp-action ${rx.dispensed ? "undo" : "mark"}"
                              onclick="toggleDispensedStatus('${patient.id}', '${rx.id}')"
                            >
                              ${rx.dispensed ? "↺ Undo" : "✔ Mark Dispensed"}
                            </button>
                          </td>
                        </tr>
                      `
                        )
                        .join("")}
                    </tbody>
                  </table>
                `
                }
              </div>
            </div>
          `;
                })
                .join("")
        }
      </div>
    </div>
  `;
}

function toggleDispensedStatus(patientId, rxId) {
  const updated = patients.map((p) => {
    if (p.id === patientId) {
      const nextRx = (p.prescriptions || []).map((rx) => {
        if (rx.id === rxId) {
          const isDisp = !rx.dispensed;
          return {
            ...rx,
            dispensed: isDisp,
            dispensedAt: isDisp
              ? new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
              : null
          };
        }
        return rx;
      });

      const allDone = nextRx.length > 0 && nextRx.every((rx) => rx.dispensed);
      return {
        ...p,
        status: allDone ? "Dispensed" : "Prescribed",
        prescriptions: nextRx
      };
    }
    return p;
  });

  savePatients(updated);
  showToast("Dispensary record updated", "success");
  renderRoleDesk();
}

function dispenseAllForPatient(patientId) {
  const timeNow = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  const updated = patients.map((p) => {
    if (p.id === patientId) {
      const nextRx = (p.prescriptions || []).map((rx) => ({
        ...rx,
        dispensed: true,
        dispensedAt: rx.dispensedAt || timeNow
      }));
      return {
        ...p,
        status: "Dispensed",
        prescriptions: nextRx
      };
    }
    return p;
  });

  savePatients(updated);
  showToast("All medications marked as dispensed", "success");
  renderRoleDesk();
}

function handlePharmaSearch(val) {
  pharmaSearch = val;
  renderRoleDesk();
}

function handlePharmaDocFilter(val) {
  pharmaDoctorFilter = val;
  renderRoleDesk();
}

function setPharmaDispenseFilter(val) {
  pharmaDispenseFilter = val;
  renderRoleDesk();
}

// ==========================================================================
// 4. REPORTS & OPERATIONAL ANALYTICS
// ==========================================================================
function renderReports() {
  const container = document.getElementById("reportsSection");

  const totalPatients = patients.length;
  const waitingCount = patients.filter((p) => p.status === "Waiting").length;
  const prescribedCount = patients.filter((p) => p.status === "Prescribed").length;

  let totalRx = 0;
  let totalDisp = 0;
  const medCounts = {};

  patients.forEach((p) => {
    (p.prescriptions || []).forEach((rx) => {
      totalRx++;
      if (rx.dispensed) totalDisp++;
      const mName = rx.medicine || "Unknown";
      if (!medCounts[mName]) {
        medCounts[mName] = { name: mName, count: 0, dispensed: 0 };
      }
      medCounts[mName].count++;
      if (rx.dispensed) medCounts[mName].dispensed++;
    });
  });

  const rate = totalRx > 0 ? Math.round((totalDisp / totalRx) * 100) : 0;

  const docStats = DOCTORS.map((doc) => {
    const docPatients = patients.filter(
      (p) => p.doctor && p.doctor.toLowerCase() === doc.username.toLowerCase()
    );
    const docRx = docPatients.reduce((sum, p) => sum + (p.prescriptions?.length || 0), 0);
    return {
      ...doc,
      patients: docPatients.length,
      rx: docRx
    };
  });

  const topMeds = Object.values(medCounts).sort((a, b) => b.count - a.count);

  container.innerHTML = `
    <div class="desk-container">
      <div class="reports-header-box">
        <div>
          <h2 style="font-size: 20px; font-weight: 700; color: var(--text-title);">Hospital Operational Analytics</h2>
          <p style="color: var(--text-muted); font-size: 12.5px;">Real-time metrics across Front Desk Intake, Consultation, and Dispensary</p>
        </div>
        <button class="btn-print-action" onclick="window.print()">
          ${ICONS.printer}
          <span>Print / Save PDF</span>
        </button>
      </div>

      <!-- Stat Cards -->
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon-wrapper teal">${ICONS.user}</div>
          <div class="stat-content">
            <span class="stat-number">${totalPatients}</span>
            <span class="stat-title">Admitted Patients</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrapper amber">${ICONS.clock}</div>
          <div class="stat-content">
            <span class="stat-number">${waitingCount}</span>
            <span class="stat-title">Waiting Queue</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrapper blue">${ICONS.pill}</div>
          <div class="stat-content">
            <span class="stat-number">${totalRx}</span>
            <span class="stat-title">Prescriptions Issued</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrapper green">${ICONS.check}</div>
          <div class="stat-content">
            <span class="stat-number">${totalDisp} (${rate}%)</span>
            <span class="stat-title">Dispensed Items</span>
          </div>
        </div>
      </div>

      <!-- Pharmacy Fulfillment Track -->
      <div class="progress-card">
        <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 6px;">
          <span style="color: var(--text-title);">Pharmacy Fulfillment Rate</span>
          <span style="color: var(--badge-dispensed-text);">${rate}% Fulfilled</span>
        </div>
        <div class="progress-track">
          <div class="progress-indicator" style="width: ${rate}%;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-muted); font-weight: 500;">
          <span>${totalDisp} Prescriptions Dispensed</span>
          <span>${totalRx - totalDisp} Pending in Dispensary</span>
        </div>
      </div>

      <!-- 2-Column Split -->
      <div class="reports-columns">
        <!-- Doctor Workload -->
        <div class="panel-card">
          <h3 class="panel-title" style="margin-bottom: 16px;">Doctor Consultation Workload</h3>
          <div>
            ${docStats
              .map((doc) => {
                const pct = totalPatients > 0 ? Math.round((doc.patients / totalPatients) * 100) : 0;
                return `
              <div class="doctor-bar-card">
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                  <div>
                    <strong style="color: var(--text-title); font-size: 13px;">${doc.name}</strong>
                    <span style="display: block; font-size: 11px; color: var(--text-muted);">${doc.specialty}</span>
                  </div>
                  <span class="system-tag">${doc.patients} Patients • ${doc.rx} Rx</span>
                </div>
                <div class="progress-track" style="height: 6px; margin: 4px 0 0 0;">
                  <div class="progress-indicator" style="width: ${pct}%;"></div>
                </div>
              </div>
            `;
              })
              .join("")}
          </div>
        </div>

        <!-- Top Medications -->
        <div class="panel-card">
          <h3 class="panel-title" style="margin-bottom: 16px;">Medication Dispensary Log</h3>
          ${
            topMeds.length === 0
              ? `<p style="color: var(--text-muted); font-style: italic;">No medications logged yet.</p>`
              : `
            <div class="data-table-container">
              <table class="enterprise-table">
                <thead>
                  <tr>
                    <th>Medicine</th>
                    <th>Prescribed</th>
                    <th>Dispensed</th>
                    <th>Fulfillment</th>
                  </tr>
                </thead>
                <tbody>
                  ${topMeds
                    .map((m) => {
                      const mRate = m.count > 0 ? Math.round((m.dispensed / m.count) * 100) : 0;
                      return `
                      <tr>
                        <td><strong style="color: var(--text-title);">${m.name}</strong></td>
                        <td>${m.count}</td>
                        <td>${m.dispensed}</td>
                        <td>
                          <span class="status-badge ${mRate === 100 ? "dispensed" : "waiting"}">${mRate}%</span>
                        </td>
                      </tr>
                    `;
                    })
                    .join("")}
                </tbody>
              </table>
            </div>
          `
          }
        </div>
      </div>
    </div>
  `;
}

// Attach Bootstrap
window.addEventListener("DOMContentLoaded", initApp);
