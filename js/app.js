// CareConnect HMS - Pure Vanilla JavaScript Application (No frameworks, Zero dependencies)

// 1. System Users & Roles
const USERS = [
  {
    username: "reception1",
    password: "1234",
    role: "Receptionist",
    name: "Sarah Jenkins",
    title: "Front Desk Lead",
    avatar: "👩‍💼",
    badgeColor: "#38bdf8"
  },
  {
    username: "doctor1",
    password: "1234",
    role: "Doctor",
    name: "Dr. Rajesh Sharma",
    title: "Chief Cardiologist (MD)",
    avatar: "👨‍⚕️",
    badgeColor: "#10b981"
  },
  {
    username: "doctor2",
    password: "1234",
    role: "Doctor",
    name: "Dr. Ananya Patel",
    title: "Senior Physician (MBBS)",
    avatar: "👩‍⚕️",
    badgeColor: "#c084fc"
  },
  {
    username: "pharma1",
    password: "1234",
    role: "Pharmacist",
    name: "Alex Rivera",
    title: "Chief Dispensary Pharmacist",
    avatar: "💊",
    badgeColor: "#f59e0b"
  }
];

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

const COMMON_MEDICINES = [
  { name: "Paracetamol", defaultDosage: "500 mg", defaultFreq: "1-0-1 (Twice daily)", defaultDuration: "3 days", defaultInstructions: "After meals" },
  { name: "Amoxicillin", defaultDosage: "500 mg", defaultFreq: "1-1-1 (Thrice daily)", defaultDuration: "5 days", defaultInstructions: "After meals with water" },
  { name: "Cetirizine", defaultDosage: "10 mg", defaultFreq: "0-0-1 (Once at bedtime)", defaultDuration: "5 days", defaultInstructions: "Take at night" },
  { name: "Omeprazole", defaultDosage: "20 mg", defaultFreq: "1-0-0 (Once daily)", defaultDuration: "7 days", defaultInstructions: "30 mins before breakfast" },
  { name: "Azithromycin", defaultDosage: "500 mg", defaultFreq: "1-0-0 (Once daily)", defaultDuration: "3 days", defaultInstructions: "1 hour before food" },
  { name: "Metformin", defaultDosage: "500 mg", defaultFreq: "1-0-1 (Twice daily)", defaultDuration: "30 days", defaultInstructions: "With meals" },
  { name: "Atorvastatin", defaultDosage: "10 mg", defaultFreq: "0-0-1 (Once at night)", defaultDuration: "30 days", defaultInstructions: "At bedtime" },
  { name: "Ibuprofen", defaultDosage: "400 mg", defaultFreq: "1-0-1 (Twice daily)", defaultDuration: "3 days", defaultInstructions: "Strictly after food" }
];

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
        medicine: "Amoxicillin",
        dosage: "500 mg",
        frequency: "1-0-1 (Twice daily)",
        duration: "5 days",
        instructions: "After meals with water",
        dispensed: true,
        dispensedAt: "10:45 AM"
      },
      {
        id: "RX-104",
        medicine: "Cetirizine",
        dosage: "10 mg",
        frequency: "0-0-1 (Once at bedtime)",
        duration: "5 days",
        instructions: "Take at night",
        dispensed: true,
        dispensedAt: "10:46 AM"
      }
    ]
  },
  {
    id: "PAT-1003",
    name: "David Miller",
    age: 62,
    gender: "Male",
    contact: "+91 99887 76655",
    doctor: "doctor1",
    doctorName: "Dr. Rajesh Sharma",
    symptoms: "Follow-up consultation for routine ECG review",
    vitals: { bp: "124/80", temp: "98.6 °F", pulse: "70 bpm" },
    registeredAt: "08 Sep 2026, 11:00 AM",
    status: "Waiting",
    prescriptions: []
  },
  {
    id: "PAT-1004",
    name: "Sneha Reddy",
    age: 34,
    gender: "Female",
    contact: "+91 91234 56780",
    doctor: "doctor2",
    doctorName: "Dr. Ananya Patel",
    symptoms: "Severe acid reflux and morning stomach burn",
    vitals: { bp: "120/82", temp: "98.2 °F", pulse: "74 bpm" },
    registeredAt: "08 Sep 2026, 11:20 AM",
    status: "Waiting",
    prescriptions: []
  }
];

// State variables
let currentUser = null;
let patients = [];
let currentTab = "desk"; // "desk" or "reports"

let receptionSearch = "";
let receptionStatusFilter = "All";

let pharmaSearch = "";
let pharmaDoctorFilter = "";
let pharmaDispenseFilter = "all";

let activeDoctorPrescriptionPatientId = null;

// Initialize
function initApp() {
  try {
    const saved = localStorage.getItem("careconnect_patients");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        patients = parsed;
      } else {
        patients = [...INITIAL_PATIENTS];
        savePatients(patients);
      }
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
    console.error("Could not save to localStorage", e);
  }
}

// Toast Notifications
function showToast(msg, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  const icon = type === "success" ? "✔" : type === "error" ? "✖" : "ℹ";
  toast.innerHTML = `<span>${icon}</span> <span>${msg}</span>`;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px) scale(0.95)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Auth & Nav
function quickLogin(username) {
  const user = USERS.find((u) => u.username === username);
  if (user) {
    currentUser = user;
    localStorage.setItem("careconnect_user", JSON.stringify(user));
    showToast(`Welcome back, ${user.name}!`, "success");
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
    showToast(`Welcome back, ${user.name}!`, "success");
    renderApp();
  } else {
    alertBox.textContent = "Invalid credentials or department role mismatch.";
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

// Master Render
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

  document.getElementById("userAvatarSmall").textContent = currentUser.avatar || "👤";
  document.getElementById("userDisplayName").textContent = currentUser.name || currentUser.username;
  document.getElementById("userRoleTag").textContent = currentUser.role;

  const tabDesk = document.getElementById("tabDesk");
  const tabReports = document.getElementById("tabReports");

  tabDesk.textContent = `📊 ${currentUser.role} Desk`;

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
// RECEPTIONIST DESK
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
      <!-- Symmetrical Rounded Stats -->
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon blue">👥</div>
          <div class="stat-data">
            <span class="stat-value">${patients.length}</span>
            <span class="stat-label">Total Registered Patients</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon yellow">⏳</div>
          <div class="stat-data">
            <span class="stat-value" style="color: #fbbf24;">${waitingCount}</span>
            <span class="stat-label">Waiting for Consultation</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon purple">📋</div>
          <div class="stat-data">
            <span class="stat-value" style="color: #c084fc;">${prescribedCount}</span>
            <span class="stat-label">Prescription Ready</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green">✅</div>
          <div class="stat-data">
            <span class="stat-value" style="color: #34d399;">${dispensedCount}</span>
            <span class="stat-label">Medicines Dispensed</span>
          </div>
        </div>
      </div>

      <!-- 2-Column Balanced Layout -->
      <div class="reception-split">
        <!-- Registration Form Panel -->
        <div class="card-panel">
          <div class="card-header-flex">
            <div>
              <h3>➕ Patient Registration</h3>
              <p>Register new incoming patient & assign queue</p>
            </div>
          </div>

          <form id="patientRegForm" onsubmit="handleRegisterPatient(event)" class="form-grid">
            <div class="form-row">
              <div class="form-group flex-2">
                <label>Patient Full Name *</label>
                <input type="text" id="regName" class="input-control" placeholder="e.g. Rahul Verma" required />
              </div>
              <div class="form-group flex-1">
                <label>Age *</label>
                <input type="number" id="regAge" class="input-control" placeholder="Age" min="1" max="120" required />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group flex-1">
                <label>Gender</label>
                <select id="regGender" class="input-control">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div class="form-group flex-2">
                <label>Contact Number *</label>
                <input type="text" id="regContact" class="input-control" placeholder="+91 98765 43210" required />
              </div>
            </div>

            <div class="form-group">
              <label>Consulting Doctor Assignment *</label>
              <select id="regDoctor" class="input-control" style="color: var(--cyan); font-weight: 700;">
                ${DOCTORS.map((d) => `<option value="${d.username}">${d.name} — ${d.specialty} (${d.room})</option>`).join("")}
              </select>
            </div>

            <div class="form-group">
              <label>Chief Symptoms / Complaint</label>
              <textarea id="regSymptoms" class="input-control" rows="2" placeholder="e.g. Fever, chest pain, recurring cough..."></textarea>
            </div>

            <div class="form-row">
              <div class="form-group flex-1">
                <label>Blood Pressure (BP)</label>
                <input type="text" id="regBP" class="input-control" placeholder="120/80" value="120/80" />
              </div>
              <div class="form-group flex-1">
                <label>Body Temperature</label>
                <input type="text" id="regTemp" class="input-control" placeholder="98.6 °F" value="98.6 °F" />
              </div>
            </div>

            <button type="submit" class="btn-primary" style="margin-top: 8px;">
              <span>Register & Assign to Queue</span>
              <span>➔</span>
            </button>
          </form>
        </div>

        <!-- Patients Directory Panel -->
        <div class="card-panel">
          <div class="card-header-flex">
            <div>
              <h3>📋 Patient Queue & Registry</h3>
              <p>${filtered.length} patients found</p>
            </div>

            <!-- Segmented Pill Bar -->
            <div class="filter-pills-bar">
              ${["All", "Waiting", "Prescribed", "Dispensed"]
                .map(
                  (st) =>
                    `<button type="button" class="pill-opt ${receptionStatusFilter === st ? "active" : ""}" onclick="setReceptionFilter('${st}')">${st}</button>`
                )
                .join("")}
            </div>
          </div>

          <!-- Search Bar -->
          <div class="search-box-wrap">
            <span class="search-icon-pos">🔍</span>
            <input
              type="text"
              class="input-control"
              placeholder="Search by Patient Name, ID, Phone, or Doctor..."
              value="${receptionSearch}"
              oninput="handleReceptionSearch(this.value)"
            />
            ${receptionSearch ? `<button class="btn-clear" onclick="handleReceptionSearch('')">✕</button>` : ""}
          </div>

          <!-- Scrollable Patient Cards -->
          <div class="patients-list-scroll">
            ${
              filtered.length === 0
                ? `<div class="empty-box"><div class="icon">📂</div><p>No patients match the search or filter.</p></div>`
                : filtered
                    .map(
                      (p) => `
              <div class="patient-card-box">
                <div class="patient-head-row">
                  <div>
                    <span class="patient-id-badge">${p.id}</span>
                    <h4 class="patient-name-title">${p.name}</h4>
                    <span class="patient-sub-meta">${p.age} yrs • ${p.gender || "Patient"} • 📞 ${p.contact}</span>
                  </div>
                  <span class="badge-status ${(p.status || "waiting").toLowerCase()}">${p.status || "Waiting"}</span>
                </div>

                <div class="patient-details-grid">
                  <div class="detail-line">
                    <span>Assigned Doctor</span>
                    <span style="color: var(--cyan); font-weight: 700;">🩺 ${p.doctorName || p.doctor}</span>
                  </div>
                  <div class="detail-line">
                    <span>Symptoms</span>
                    <span>${p.symptoms || "General Checkup"}</span>
                  </div>
                  <div class="detail-line">
                    <span>Vitals Reading</span>
                    <span>BP: <strong>${p.vitals?.bp || "120/80"}</strong> | Temp: <strong>${p.vitals?.temp || "98.6°F"}</strong></span>
                  </div>
                  <div class="detail-line">
                    <span>Registration Time</span>
                    <span>${p.registeredAt || "Today"}</span>
                  </div>
                </div>

                <div class="patient-foot-row">
                  <span style="color: var(--text-sub); font-weight: 600;">💊 ${(p.prescriptions || []).length} Medicines Prescribed</span>
                  <button class="btn-del-patient" onclick="deletePatient('${p.id}', '${p.name}')">Remove Patient</button>
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
  showToast(`Patient ${name} (${newId}) registered!`, "success");
  renderRoleDesk();
}

function deletePatient(id, name) {
  if (confirm(`Remove patient record ${name} (${id})?`)) {
    const updated = patients.filter((p) => p.id !== id);
    savePatients(updated);
    showToast(`Patient ${name} removed.`, "info");
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
// DOCTOR DESK
// ==========================================================================
function renderDoctorDesk(container) {
  const assigned = patients.filter(
    (p) => p.doctor && p.doctor.toLowerCase() === currentUser.username.toLowerCase()
  );
  const waitingCount = assigned.filter((p) => p.status === "Waiting").length;

  container.innerHTML = `
    <div class="desk-container">
      <!-- Doctor Profile Hero Card -->
      <div class="doctor-banner">
        <div class="doc-banner-avatar">${currentUser.avatar || "👨‍⚕️"}</div>
        <div class="doc-banner-info">
          <h2>${currentUser.name}</h2>
          <p>${currentUser.title} • Active Clinical Consultation Desk</p>
        </div>
        <div style="display: flex; gap: 14px;">
          <div class="doc-counter-box">
            <span class="doc-counter-val">${assigned.length}</span>
            <span class="doc-counter-lbl">Assigned Patients</span>
          </div>
          <div class="doc-counter-box">
            <span class="doc-counter-val yellow">${waitingCount}</span>
            <span class="doc-counter-lbl">Waiting in Queue</span>
          </div>
        </div>
      </div>

      <div class="card-header-flex" style="margin-bottom: 20px;">
        <h3>🩺 Patient Consultation Queue</h3>
        <span class="system-tag">${assigned.length} Patients in Queue</span>
      </div>

      <div>
        ${
          assigned.length === 0
            ? `<div class="empty-box"><div class="icon">📭</div><h3>No Patients Assigned Yet</h3><p>Reception has not forwarded any patients to your queue right now.</p></div>`
            : assigned
                .map((p) => {
                  const isDrawerOpen = activeDoctorPrescriptionPatientId === p.id;
                  const rxList = p.prescriptions || [];

                  return `
            <div class="doc-patient-item">
              <div class="card-header-flex">
                <div>
                  <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
                    <span class="patient-id-badge">${p.id}</span>
                    <span class="badge-status ${(p.status || "waiting").toLowerCase()}">${p.status || "Waiting"}</span>
                  </div>
                  <h3 style="font-size: 19px; margin-bottom: 2px;">${p.name}</h3>
                  <p style="font-size: 13px; color: var(--text-sub);">Age: ${p.age} | ${p.gender || "Patient"} | 📞 ${p.contact}</p>
                </div>

                <div>
                  ${
                    p.status !== "Completed"
                      ? `<button class="btn-done-consult" onclick="markPatientComplete('${p.id}')">✓ Mark Completed</button>`
                      : ""
                  }
                  <button class="btn-rx-add" onclick="toggleDoctorRxDrawer('${p.id}')">
                    ${isDrawerOpen ? "✕ Close Prescription Form" : "💊 Add Prescription"}
                  </button>
                </div>
              </div>

              <!-- Vitals Strip -->
              <div style="display: flex; flex-wrap: wrap; gap: 20px; background: var(--bg-input); padding: 12px 18px; border-radius: var(--radius-md); margin: 16px 0; font-size: 12px; border: 1px solid var(--border-card);">
                <div><span style="color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Symptoms:</span> <span style="color: #fbbf24; font-weight: 700;">${p.symptoms || "None reported"}</span></div>
                <div><span style="color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Vitals:</span> <span>BP: <strong>${p.vitals?.bp || "120/80"}</strong> | Temp: <strong>${p.vitals?.temp || "98.6°F"}</strong></span></div>
                <div><span style="color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Registered:</span> <span>${p.registeredAt || "Today"}</span></div>
              </div>

              <!-- Prescription Drawer Form -->
              ${
                isDrawerOpen
                  ? `
                <div class="rx-drawer-panel">
                  <h4 class="rx-drawer-title">Write Prescription for ${p.name}</h4>

                  <div style="margin-bottom: 14px;">
                    <label style="display: block; font-size: 11px; font-weight: 700; color: var(--text-sub); text-transform: uppercase; margin-bottom: 6px;">Quick-Select Medication from Hospital Formulary:</label>
                    <select class="input-control" style="color: var(--cyan); font-weight: 700;" onchange="handleSelectCatalogMed(this.value)">
                      <option value="">-- Choose from Catalog or Type Custom Medication Below --</option>
                      ${COMMON_MEDICINES.map((m) => `<option value="${m.name}">${m.name} (${m.defaultDosage}, ${m.defaultFreq})</option>`).join("")}
                    </select>
                  </div>

                  <form onsubmit="handleSavePrescription(event, '${p.id}')" class="form-grid">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
                      <div class="form-group">
                        <label>Medicine Name *</label>
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
                      <label>Clinical Instructions</label>
                      <input type="text" id="docRxInstr" class="input-control" placeholder="e.g. Take after meals with warm water" value="After meals" />
                    </div>

                    <div style="display: flex; gap: 12px; margin-top: 8px;">
                      <button type="submit" class="btn-primary" style="background: var(--emerald); font-size: 13px; padding: 10px 20px; border-radius: var(--radius-full);">
                        ✓ Save & Forward to Pharmacy
                      </button>
                      <button type="button" class="btn-logout" style="border-color: var(--border-card); color: var(--text-sub);" onclick="toggleDoctorRxDrawer('${p.id}')">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              `
                  : ""
              }

              <!-- Current Prescriptions -->
              <div style="border-top: 1px solid var(--border-card); padding-top: 16px; margin-top: 14px;">
                <span style="font-size: 12px; font-weight: 800; color: var(--text-sub); text-transform: uppercase; letter-spacing: 0.5px;">Prescribed Medications (${rxList.length}):</span>
                ${
                  rxList.length === 0
                    ? `<p style="font-size: 13px; color: var(--text-muted); font-style: italic; margin-top: 8px;">No medications prescribed yet. Click "Add Prescription" above.</p>`
                    : `
                  <div class="rx-items-grid">
                    ${rxList
                      .map(
                        (rx, idx) => `
                      <div class="rx-item-card">
                        <div class="rx-item-top">
                          <span style="font-size: 10px; font-weight: 800; color: var(--cyan); font-family: monospace;">RX #${idx + 1}</span>
                          <span class="rx-disp-badge ${rx.dispensed ? "done" : "wait"}">${rx.dispensed ? "✔ Dispensed" : "⏳ Pharmacy Pending"}</span>
                        </div>
                        <h5 style="font-size: 15px; margin-bottom: 2px;">${rx.medicine} <span style="font-size: 12px; color: var(--text-sub); font-weight: 500;">(${rx.dosage})</span></h5>
                        <p style="font-size: 12px; color: #cbd5e1; margin-bottom: 2px;">📅 ${rx.frequency} • ${rx.duration}</p>
                        <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 10px;">ℹ️ ${rx.instructions || "As directed"}</p>
                        <button style="background: none; border: none; color: var(--rose); font-size: 11px; cursor: pointer; font-weight: 700;" onclick="deletePrescription('${p.id}', '${rx.id}')">✕ Remove</button>
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
  showToast(`Prescription for ${med} saved!`, "success");
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
  showToast("Prescription removed.", "info");
  renderRoleDesk();
}

function markPatientComplete(patientId) {
  const updated = patients.map((p) =>
    p.id === patientId ? { ...p, status: "Completed" } : p
  );
  savePatients(updated);
  showToast("Patient consultation marked as completed.", "success");
  renderRoleDesk();
}

// ==========================================================================
// PHARMACIST DESK
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
      <!-- Rounded Stat Cards -->
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon blue">💊</div>
          <div class="stat-data">
            <span class="stat-value">${totalPrescribed}</span>
            <span class="stat-label">Total Prescribed Items</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon yellow">⏳</div>
          <div class="stat-data">
            <span class="stat-value" style="color: #fbbf24;">${totalPending}</span>
            <span class="stat-label">Awaiting Dispense</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green">✅</div>
          <div class="stat-data">
            <span class="stat-value" style="color: #34d399;">${totalDispensed}</span>
            <span class="stat-label">Dispensed Today</span>
          </div>
        </div>
      </div>

      <!-- Controls Bar -->
      <div class="pharma-controls-bar">
        <div class="search-box-wrap" style="margin-bottom: 0; min-width: 300px; flex: 1;">
          <span class="search-icon-pos">🔍</span>
          <input
            type="text"
            class="input-control"
            placeholder="Search patient, ID, doctor, or medication..."
            value="${pharmaSearch}"
            oninput="handlePharmaSearch(this.value)"
          />
          ${pharmaSearch ? `<button class="btn-clear" onclick="handlePharmaSearch('')">✕</button>` : ""}
        </div>

        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
          <select class="input-control" style="color: var(--cyan); font-weight: 700; width: auto; border-radius: var(--radius-full);" onchange="handlePharmaDocFilter(this.value)">
            <option value="">All Consulting Doctors</option>
            ${uniqueDocs.map((doc) => `<option value="${doc}" ${pharmaDoctorFilter === doc ? "selected" : ""}>${doc}</option>`).join("")}
          </select>

          <div class="filter-pills-bar">
            <button type="button" class="pill-opt ${pharmaDispenseFilter === "all" ? "active" : ""}" onclick="setPharmaDispenseFilter('all')">All</button>
            <button type="button" class="pill-opt ${pharmaDispenseFilter === "pending" ? "active" : ""}" onclick="setPharmaDispenseFilter('pending')">Pending (${totalPending})</button>
            <button type="button" class="pill-opt ${pharmaDispenseFilter === "dispensed" ? "active" : ""}" onclick="setPharmaDispenseFilter('dispensed')">Completed (${totalDispensed})</button>
          </div>
        </div>
      </div>

      <!-- Patients List -->
      <div>
        ${
          filtered.length === 0
            ? `<div class="empty-box"><div class="icon">📦</div><h3>No Prescriptions Match Filter</h3><p>Try resetting filters or searching with another keyword.</p></div>`
            : filtered
                .map((patient) => {
                  const rxList = patient.prescriptions || [];
                  const hasPending = rxList.some((rx) => !rx.dispensed);
                  const allDispensed = rxList.length > 0 && rxList.every((rx) => rx.dispensed);

                  return `
            <div class="pharma-card-box">
              <div class="card-header-flex">
                <div>
                  <span class="patient-id-badge">${patient.id}</span>
                  <h4 style="font-size: 19px; margin: 4px 0 2px 0;">${patient.name}</h4>
                  <span style="font-size: 13px; color: var(--text-sub);">Age: ${patient.age} • 📞 ${patient.contact} • 🩺 ${patient.doctorName || patient.doctor}</span>
                </div>

                <div style="display: flex; align-items: center; gap: 12px;">
                  <span class="badge-status ${allDispensed ? "dispensed" : hasPending ? "waiting" : "default"}">
                    ${allDispensed ? "✓ Fully Dispensed" : hasPending ? "⏳ Dispensation Pending" : "No Rx"}
                  </span>
                  ${
                    hasPending
                      ? `<button class="btn-disp-all" onclick="dispenseAllForPatient('${patient.id}')">✓ Dispense All</button>`
                      : ""
                  }
                </div>
              </div>

              <div class="pharma-table-wrap">
                ${
                  rxList.length === 0
                    ? `<p style="color: var(--text-muted); font-style: italic; padding: 16px;">No active prescriptions recorded.</p>`
                    : `
                  <table class="pharma-table">
                    <thead>
                      <tr>
                        <th>Medicine & Dosage</th>
                        <th>Frequency / Duration</th>
                        <th>Instructions</th>
                        <th>Status</th>
                        <th style="text-align: right;">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${rxList
                        .map(
                          (rx) => `
                        <tr style="${rx.dispensed ? "background: rgba(16, 185, 129, 0.04);" : ""}">
                          <td>
                            <strong style="color: #ffffff; font-size: 14px;">${rx.medicine}</strong>
                            <span style="display: block; font-size: 11px; color: var(--cyan); font-weight: 700;">${rx.dosage}</span>
                          </td>
                          <td>
                            <span style="display: block; font-size: 12px; color: #cbd5e1; font-weight: 600;">${rx.frequency}</span>
                            <span style="font-size: 11px; color: var(--text-sub);">${rx.duration}</span>
                          </td>
                          <td style="color: var(--text-sub); font-size: 12px;">${rx.instructions || "As instructed"}</td>
                          <td>
                            ${
                              rx.dispensed
                                ? `<span style="color: #34d399; font-size: 12px; font-weight: 700;">✔ Dispensed ${rx.dispensedAt ? `(${rx.dispensedAt})` : ""}</span>`
                                : `<span style="color: #fbbf24; font-size: 12px; font-weight: 700;">⏳ Awaiting Dispense</span>`
                            }
                          </td>
                          <td style="text-align: right;">
                            <button
                              class="btn-disp-toggle ${rx.dispensed ? "undo" : "mark"}"
                              onclick="toggleDispensedStatus('${patient.id}', '${rx.id}')"
                            >
                              ${rx.dispensed ? "↺ Undo" : "✓ Mark Dispensed"}
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
  showToast("Medicine status updated & saved.", "success");
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
  showToast("All medications marked dispensed!", "success");
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
// REPORTS & ANALYTICS
// ==========================================================================
function renderReports() {
  const container = document.getElementById("reportsSection");

  const totalPatients = patients.length;
  const waitingCount = patients.filter((p) => p.status === "Waiting").length;
  const prescribedCount = patients.filter((p) => p.status === "Prescribed").length;
  const completedCount = patients.filter((p) => p.status === "Dispensed" || p.status === "Completed").length;

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
      <div class="reports-top-bar">
        <div>
          <h2 style="font-size: 26px; font-weight: 800; margin-bottom: 4px;">📊 Hospital Analytics & Clinical Reports</h2>
          <p style="color: var(--text-sub); font-size: 14px;">Real-time metrics across Front Desk, Clinical Consultation, and Pharmacy</p>
        </div>
        <button class="btn-print" onclick="window.print()">🖨️ Print / Save PDF</button>
      </div>

      <!-- Stats Row -->
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon blue">👥</div>
          <div class="stat-data">
            <span class="stat-value">${totalPatients}</span>
            <span class="stat-label">Total Patients Registered</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon yellow">⏳</div>
          <div class="stat-data">
            <span class="stat-value" style="color: #fbbf24;">${waitingCount}</span>
            <span class="stat-label">Awaiting Consultation</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon purple">💊</div>
          <div class="stat-data">
            <span class="stat-value">${totalRx}</span>
            <span class="stat-label">Prescriptions Written</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green">✅</div>
          <div class="stat-data">
            <span class="stat-value" style="color: #34d399;">${totalDisp} (${rate}%)</span>
            <span class="stat-label">Medicines Dispensed</span>
          </div>
        </div>
      </div>

      <!-- Rounded Progress Tracker -->
      <div class="prog-track-card">
        <div style="display: flex; justify-content: space-between; font-size: 14px; font-weight: 700; margin-bottom: 8px;">
          <span>Pharmacy Medication Fulfillment Rate</span>
          <span style="color: #34d399;">${rate}% Fulfilled</span>
        </div>
        <div class="prog-bg">
          <div class="prog-fill" style="width: ${rate}%;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-sub); font-weight: 600;">
          <span>${totalDisp} Prescriptions Dispensed</span>
          <span>${totalRx - totalDisp} Pending in Dispensary</span>
        </div>
      </div>

      <!-- 2-Column Split -->
      <div class="reports-split">
        <!-- Doctor Workload -->
        <div class="card-panel">
          <h3 style="font-size: 17px; font-weight: 800; margin-bottom: 20px;">🩺 Doctor Consultation Load</h3>
          <div>
            ${docStats
              .map((doc) => {
                const pct = totalPatients > 0 ? Math.round((doc.patients / totalPatients) * 100) : 0;
                return `
              <div class="doc-bar-item">
                <div class="doc-bar-top">
                  <div>
                    <strong style="color: #ffffff; font-size: 14px;">${doc.name}</strong>
                    <span style="display: block; font-size: 12px; color: var(--text-sub);">${doc.specialty}</span>
                  </div>
                  <span class="system-tag">${doc.patients} Patients • ${doc.rx} Rx</span>
                </div>
                <div class="doc-bar-bg">
                  <div class="doc-bar-fill" style="width: ${pct}%;"></div>
                </div>
              </div>
            `;
              })
              .join("")}
          </div>
        </div>

        <!-- Top Prescribed Medications -->
        <div class="card-panel">
          <h3 style="font-size: 17px; font-weight: 800; margin-bottom: 20px;">💊 Medication Dispensation Summary</h3>
          ${
            topMeds.length === 0
              ? `<p style="color: var(--text-muted); font-style: italic;">No medications logged yet.</p>`
              : `
            <div style="overflow-x: auto; border-radius: var(--radius-lg); border: 1px solid var(--border-card);">
              <table class="pharma-table">
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
                        <td><strong style="color: #ffffff;">${m.name}</strong></td>
                        <td>${m.count}</td>
                        <td>${m.dispensed}</td>
                        <td>
                          <span class="badge-status ${mRate === 100 ? "dispensed" : "waiting"}">${mRate}%</span>
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

window.addEventListener("DOMContentLoaded", initApp);
