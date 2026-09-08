// CareConnect HMS - Enterprise Medical SaaS Architecture
// Pure Vanilla JavaScript (No Frameworks, Zero Dependencies)

const USERS = [
  {
    username: "reception1",
    password: "1234",
    role: "Receptionist",
    name: "Sarah Jenkins",
    title: "Front Desk Administrator",
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
    title: "Lead Dispensary Pharmacist",
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

// App State
let currentUser = null;
let patients = [];
let currentTab = "desk";

let receptionSearch = "";
let receptionStatusFilter = "All";

let pharmaSearch = "";
let pharmaDoctorFilter = "";
let pharmaDispenseFilter = "all";

let activeDoctorPrescriptionPatientId = null;

// Initializer
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
    console.error("Storage error", e);
  }
}

// Notification Toast
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
    toast.style.transform = "translateY(-10px)";
    toast.style.transition = "all 0.25s ease";
    setTimeout(() => toast.remove(), 250);
  }, 3000);
}

// Authentication
function quickLogin(username) {
  const user = USERS.find((u) => u.username === username);
  if (user) {
    currentUser = user;
    localStorage.setItem("careconnect_user", JSON.stringify(user));
    showToast(`Signed in as ${user.name}`, "success");
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

// Master Render Router
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
// 1. RECEPTIONIST DESK RENDERER
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
      <!-- Top Symmetrical Stat Cards -->
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon-wrapper blue">👥</div>
          <div class="stat-content">
            <span class="stat-number">${patients.length}</span>
            <span class="stat-title">Registered Patients</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrapper yellow">⏳</div>
          <div class="stat-content">
            <span class="stat-number" style="color: var(--amber);">${waitingCount}</span>
            <span class="stat-title">Awaiting Consultation</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrapper purple">📋</div>
          <div class="stat-content">
            <span class="stat-number" style="color: #c084fc;">${prescribedCount}</span>
            <span class="stat-title">Prescription Ready</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrapper green">✅</div>
          <div class="stat-content">
            <span class="stat-number" style="color: var(--emerald);">${dispensedCount}</span>
            <span class="stat-title">Medicines Dispensed</span>
          </div>
        </div>
      </div>

      <!-- 2-Column Balanced Layout -->
      <div class="reception-grid">
        <!-- Patient Intake Panel -->
        <div class="panel-card">
          <div class="panel-header">
            <div>
              <h3 class="panel-title">Patient Intake</h3>
              <p class="panel-subtitle">Register incoming patient into doctor queue</p>
            </div>
          </div>

          <form id="patientRegForm" onsubmit="handleRegisterPatient(event)" class="form-layout">
            <div class="form-row-2">
              <div class="form-group">
                <label>Full Name *</label>
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
                <label>Phone *</label>
                <input type="text" id="regContact" class="input-control" placeholder="+91 98765 43210" required />
              </div>
            </div>

            <div class="form-group">
              <label>Assigned Consulting Doctor *</label>
              <select id="regDoctor" class="input-control" style="color: var(--cyan); font-weight: 700;">
                ${DOCTORS.map((d) => `<option value="${d.username}">${d.name} — ${d.specialty} (${d.room})</option>`).join("")}
              </select>
            </div>

            <div class="form-group">
              <label>Chief Symptoms / Reason</label>
              <textarea id="regSymptoms" class="input-control" rows="2" placeholder="e.g. Fever, chest pain, recurring cough..."></textarea>
            </div>

            <div class="form-row-equal">
              <div class="form-group">
                <label>Blood Pressure (BP)</label>
                <input type="text" id="regBP" class="input-control" placeholder="120/80" value="120/80" />
              </div>
              <div class="form-group">
                <label>Body Temp (°F)</label>
                <input type="text" id="regTemp" class="input-control" placeholder="98.6 °F" value="98.6 °F" />
              </div>
            </div>

            <button type="submit" class="btn-primary" style="margin-top: 6px;">
              Register & Queue Patient ➔
            </button>
          </form>
        </div>

        <!-- Patient Directory Panel -->
        <div class="panel-card">
          <div class="panel-header">
            <div>
              <h3 class="panel-title">Consultation Queue</h3>
              <p class="panel-subtitle">${filtered.length} patient records found</p>
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
            <span class="search-icon-svg">🔍</span>
            <input
              type="text"
              class="input-control"
              placeholder="Search by Patient Name, ID, Phone, or Doctor..."
              value="${receptionSearch}"
              oninput="handleReceptionSearch(this.value)"
            />
            ${receptionSearch ? `<button class="search-clear-btn" onclick="handleReceptionSearch('')">✕</button>` : ""}
          </div>

          <!-- List -->
          <div class="patient-stream">
            ${
              filtered.length === 0
                ? `<div class="empty-placeholder"><div class="icon">📂</div><p>No patients match the filter criteria.</p></div>`
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
                    <span class="clinical-item-value" style="color: var(--cyan);">🩺 ${p.doctorName || p.doctor}</span>
                  </div>
                  <div class="clinical-item">
                    <span class="clinical-item-label">Reported Symptoms</span>
                    <span class="clinical-item-value">${p.symptoms || "General Checkup"}</span>
                  </div>
                  <div class="clinical-item">
                    <span class="clinical-item-label">Clinical Vitals</span>
                    <span class="clinical-item-value">BP: ${p.vitals?.bp || "120/80"} | Temp: ${p.vitals?.temp || "98.6°F"}</span>
                  </div>
                  <div class="clinical-item">
                    <span class="clinical-item-label">Intake Time</span>
                    <span class="clinical-item-value">${p.registeredAt || "Today"}</span>
                  </div>
                </div>

                <div class="patient-record-footer">
                  <span style="color: var(--text-secondary); font-weight: 600;">💊 ${(p.prescriptions || []).length} Prescriptions Logged</span>
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
  showToast(`Patient ${name} (${newId}) queued successfully`, "success");
  renderRoleDesk();
}

function deletePatient(id, name) {
  if (confirm(`Remove patient ${name} (${id})?`)) {
    const updated = patients.filter((p) => p.id !== id);
    savePatients(updated);
    showToast(`Removed patient ${name}`, "info");
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
// 2. DOCTOR DESK RENDERER
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
        <div class="doc-avatar-circle">${currentUser.avatar || "👨‍⚕️"}</div>
        <div class="doc-meta-info">
          <h2>${currentUser.name}</h2>
          <p>${currentUser.title} • Active Consultation Desk</p>
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
        <h3 class="panel-title">Assigned Patient Queue</h3>
        <span class="system-tag">${assigned.length} In Queue</span>
      </div>

      <div>
        ${
          assigned.length === 0
            ? `<div class="empty-placeholder"><div class="icon">📭</div><h3>No Patients Assigned Yet</h3><p>Your consultation queue is clear.</p></div>`
            : assigned
                .map((p) => {
                  const isDrawerOpen = activeDoctorPrescriptionPatientId === p.id;
                  const rxList = p.prescriptions || [];

                  return `
            <div class="doctor-patient-card">
              <div class="panel-header">
                <div>
                  <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 3px;">
                    <span class="patient-id-tag">${p.id}</span>
                    <span class="status-badge ${(p.status || "waiting").toLowerCase()}">${p.status || "Waiting"}</span>
                  </div>
                  <h3 style="font-size: 18px; font-weight: 700; color: #fff;">${p.name}</h3>
                  <p style="font-size: 12px; color: var(--text-secondary);">Age: ${p.age} | ${p.gender || "Patient"} | 📞 ${p.contact}</p>
                </div>

                <div class="action-row">
                  ${
                    p.status !== "Completed"
                      ? `<button class="btn-mark-consult-done" onclick="markPatientComplete('${p.id}')">✓ Mark Completed</button>`
                      : ""
                  }
                  <button class="btn-rx-action" onclick="toggleDoctorRxDrawer('${p.id}')">
                    ${isDrawerOpen ? "✕ Close Prescription Form" : "💊 Prescribe Medication"}
                  </button>
                </div>
              </div>

              <!-- Vitals Summary Strip -->
              <div class="clinical-summary-box">
                <div class="clinical-item">
                  <span class="clinical-item-label">Chief Symptoms</span>
                  <span class="clinical-item-value" style="color: #fbbf24;">${p.symptoms || "None reported"}</span>
                </div>
                <div class="clinical-item">
                  <span class="clinical-item-label">Vitals</span>
                  <span class="clinical-item-value">BP: ${p.vitals?.bp || "120/80"} | Temp: ${p.vitals?.temp || "98.6°F"}</span>
                </div>
                <div class="clinical-item">
                  <span class="clinical-item-label">Intake Logged</span>
                  <span class="clinical-item-value">${p.registeredAt || "Today"}</span>
                </div>
                <div class="clinical-item">
                  <span class="clinical-item-label">Status</span>
                  <span class="clinical-item-value">${p.status}</span>
                </div>
              </div>

              <!-- Prescription Drawer -->
              ${
                isDrawerOpen
                  ? `
                <div class="rx-drawer-card">
                  <h4 class="rx-drawer-heading">Write Prescription for ${p.name}</h4>

                  <div style="margin-bottom: 12px;">
                    <label style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Quick Formulary Select:</label>
                    <select class="input-control" style="color: var(--cyan); font-weight: 700; margin-top: 4px;" onchange="handleSelectCatalogMed(this.value)">
                      <option value="">-- Choose from Catalog or Type Manually Below --</option>
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
                      <button type="submit" class="btn-primary" style="background: var(--emerald); padding: 8px 18px; border-radius: var(--radius-full); font-size: 13px;">
                        ✓ Save & Forward to Dispensary
                      </button>
                      <button type="button" class="btn-logout" style="border-color: var(--border-color); color: var(--text-secondary);" onclick="toggleDoctorRxDrawer('${p.id}')">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              `
                  : ""
              }

              <!-- Prescription List -->
              <div style="border-top: 1px solid var(--border-color); padding-top: 14px; margin-top: 12px;">
                <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.04em;">Medications Prescribed (${rxList.length}):</span>
                ${
                  rxList.length === 0
                    ? `<p style="font-size: 12px; color: var(--text-muted); font-style: italic; margin-top: 6px;">No medications prescribed yet.</p>`
                    : `
                  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 10px; margin-top: 8px;">
                    ${rxList
                      .map(
                        (rx, idx) => `
                      <div class="rx-item-tile">
                        <div class="rx-item-header">
                          <span style="font-size: 10px; font-weight: 800; color: var(--cyan); font-family: monospace;">RX #${idx + 1}</span>
                          <span class="rx-tag-pill ${rx.dispensed ? "done" : "wait"}">${rx.dispensed ? "✔ Dispensed" : "⏳ Pending"}</span>
                        </div>
                        <h5 style="font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 2px;">${rx.medicine} <span style="font-size: 12px; color: var(--text-secondary); font-weight: 400;">(${rx.dosage})</span></h5>
                        <p style="font-size: 12px; color: var(--text-primary); margin-bottom: 2px;">📅 ${rx.frequency} • ${rx.duration}</p>
                        <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 8px;">ℹ️ ${rx.instructions || "As directed"}</p>
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
  showToast(`Prescription for ${med} saved`, "success");
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
// 3. PHARMACIST DESK RENDERER
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
      <!-- 3 Metrics Cards -->
      <div class="stats-row" style="grid-template-columns: repeat(3, 1fr);">
        <div class="stat-card">
          <div class="stat-icon-wrapper blue">💊</div>
          <div class="stat-content">
            <span class="stat-number">${totalPrescribed}</span>
            <span class="stat-title">Prescriptions Logged</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrapper yellow">⏳</div>
          <div class="stat-content">
            <span class="stat-number" style="color: var(--amber);">${totalPending}</span>
            <span class="stat-title">Awaiting Dispense</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrapper green">✅</div>
          <div class="stat-content">
            <span class="stat-number" style="color: var(--emerald);">${totalDispensed}</span>
            <span class="stat-title">Dispensed Items</span>
          </div>
        </div>
      </div>

      <!-- Controls Bar -->
      <div class="pharma-bar">
        <div class="search-container" style="margin-bottom: 0; min-width: 280px; flex: 1;">
          <span class="search-icon-svg">🔍</span>
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
          <select class="input-control" style="color: var(--cyan); font-weight: 700; width: auto; border-radius: var(--radius-full);" onchange="handlePharmaDocFilter(this.value)">
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

      <!-- Patient Cards with Clean Data Tables -->
      <div>
        ${
          filtered.length === 0
            ? `<div class="empty-placeholder"><div class="icon">📦</div><h3>No Prescriptions Match Filter</h3><p>Try resetting filters or search keyword.</p></div>`
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
                  <h4 style="font-size: 18px; font-weight: 700; color: #fff; margin-top: 2px;">${patient.name}</h4>
                  <span style="font-size: 12px; color: var(--text-secondary);">Age: ${patient.age} • 📞 ${patient.contact} • 🩺 ${patient.doctorName || patient.doctor}</span>
                </div>

                <div style="display: flex; align-items: center; gap: 10px;">
                  <span class="status-badge ${allDispensed ? "dispensed" : hasPending ? "waiting" : "default"}">
                    ${allDispensed ? "✓ Fully Dispensed" : hasPending ? "⏳ Dispense Pending" : "No Rx"}
                  </span>
                  ${
                    hasPending
                      ? `<button class="btn-bulk-dispense" onclick="dispenseAllForPatient('${patient.id}')">✓ Dispense All</button>`
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
                        <th>Dispense Status</th>
                        <th style="text-align: right;">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${rxList
                        .map(
                          (rx) => `
                        <tr style="${rx.dispensed ? "background: rgba(16, 185, 129, 0.04);" : ""}">
                          <td>
                            <strong style="color: #ffffff; font-size: 13px;">${rx.medicine}</strong>
                            <span style="display: block; font-size: 11px; color: var(--cyan); font-weight: 700;">${rx.dosage}</span>
                          </td>
                          <td>
                            <span style="display: block; font-size: 12px; color: var(--text-primary); font-weight: 600;">${rx.frequency}</span>
                            <span style="font-size: 11px; color: var(--text-secondary);">${rx.duration}</span>
                          </td>
                          <td style="color: var(--text-secondary); font-size: 12px;">${rx.instructions || "As instructed"}</td>
                          <td>
                            ${
                              rx.dispensed
                                ? `<span style="color: var(--emerald); font-size: 11px; font-weight: 700;">✔ Dispensed ${rx.dispensedAt ? `(${rx.dispensedAt})` : ""}</span>`
                                : `<span style="color: var(--amber); font-size: 11px; font-weight: 700;">⏳ Awaiting Dispense</span>`
                            }
                          </td>
                          <td style="text-align: right;">
                            <button
                              class="btn-disp-action ${rx.dispensed ? "undo" : "mark"}"
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
// 4. REPORTS & ANALYTICS RENDERER
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
          <h2 style="font-size: 22px; font-weight: 800; color: #fff;">Hospital Operational Analytics</h2>
          <p style="color: var(--text-secondary); font-size: 13px;">Real-time metrics across Front Desk, Consultation, and Dispensary</p>
        </div>
        <button class="btn-print-action" onclick="window.print()">🖨️ Print / Save PDF</button>
      </div>

      <!-- Stat Cards -->
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon-wrapper blue">👥</div>
          <div class="stat-content">
            <span class="stat-number">${totalPatients}</span>
            <span class="stat-title">Total Patients</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrapper yellow">⏳</div>
          <div class="stat-content">
            <span class="stat-number" style="color: var(--amber);">${waitingCount}</span>
            <span class="stat-title">Waiting Queue</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrapper purple">💊</div>
          <div class="stat-content">
            <span class="stat-number">${totalRx}</span>
            <span class="stat-title">Total Prescriptions</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrapper green">✅</div>
          <div class="stat-content">
            <span class="stat-number" style="color: var(--emerald);">${totalDisp} (${rate}%)</span>
            <span class="stat-title">Dispensed Items</span>
          </div>
        </div>
      </div>

      <!-- Progress Track -->
      <div class="progress-card">
        <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 700; margin-bottom: 6px;">
          <span>Pharmacy Fulfillment Rate</span>
          <span style="color: var(--emerald);">${rate}% Fulfilled</span>
        </div>
        <div class="progress-track">
          <div class="progress-indicator" style="width: ${rate}%;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-secondary); font-weight: 600;">
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
                    <strong style="color: #ffffff; font-size: 13px;">${doc.name}</strong>
                    <span style="display: block; font-size: 11px; color: var(--text-secondary);">${doc.specialty}</span>
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
                        <td><strong style="color: #ffffff;">${m.name}</strong></td>
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

window.addEventListener("DOMContentLoaded", initApp);
