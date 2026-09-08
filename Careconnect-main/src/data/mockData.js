// Mock data and system constants for CareConnect

export const USERS = [
  {
    username: "reception1",
    password: "1234",
    role: "Receptionist",
    name: "Sarah Jenkins",
    title: "Front Desk Administrator",
    avatar: "👩‍💼",
    badgeColor: "#3b82f6"
  },
  {
    username: "doctor1",
    password: "1234",
    role: "Doctor",
    name: "Dr. Rajesh Sharma",
    title: "Senior Cardiologist (MD)",
    avatar: "👨‍⚕️",
    badgeColor: "#10b981"
  },
  {
    username: "doctor2",
    password: "1234",
    role: "Doctor",
    name: "Dr. Ananya Patel",
    title: "General Physician (MBBS)",
    avatar: "👩‍⚕️",
    badgeColor: "#8b5cf6"
  },
  {
    username: "pharma1",
    password: "1234",
    role: "Pharmacist",
    name: "Alex Rivera",
    title: "Lead Pharmacist (B.Pharm)",
    avatar: "💊",
    badgeColor: "#f59e0b"
  }
];

export const DOCTORS = [
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

export const COMMON_MEDICINES = [
  { name: "Paracetamol", defaultDosage: "500 mg", defaultFreq: "1-0-1 (Twice daily)", defaultDuration: "3 days", defaultInstructions: "After meals" },
  { name: "Amoxicillin", defaultDosage: "250 mg", defaultFreq: "1-1-1 (Thrice daily)", defaultDuration: "5 days", defaultInstructions: "After meals with water" },
  { name: "Cetirizine", defaultDosage: "10 mg", defaultFreq: "0-0-1 (Once at bedtime)", defaultDuration: "5 days", defaultInstructions: "At bedtime" },
  { name: "Omeprazole", defaultDosage: "20 mg", defaultFreq: "1-0-0 (Once daily)", defaultDuration: "7 days", defaultInstructions: "30 mins before breakfast" },
  { name: "Azithromycin", defaultDosage: "500 mg", defaultFreq: "1-0-0 (Once daily)", defaultDuration: "3 days", defaultInstructions: "1 hour before food" },
  { name: "Metformin", defaultDosage: "500 mg", defaultFreq: "1-0-1 (Twice daily)", defaultDuration: "30 days", defaultInstructions: "With or after meals" },
  { name: "Atorvastatin", defaultDosage: "10 mg", defaultFreq: "0-0-1 (Once at night)", defaultDuration: "30 days", defaultInstructions: "At bedtime" },
  { name: "Ibuprofen", defaultDosage: "400 mg", defaultFreq: "1-0-1 (Twice daily)", defaultDuration: "3 days", defaultInstructions: "Strictly after food" }
];

export const INITIAL_PATIENTS = [
  {
    id: "PAT-1001",
    name: "Ramesh Kumar",
    age: 46,
    gender: "Male",
    contact: "+91 98450 12345",
    doctor: "doctor1",
    doctorName: "Dr. Rajesh Sharma",
    symptoms: "Mild chest tightness and high BP history",
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
        dispensedAt: "08 Sep 2026, 10:15 AM"
      },
      {
        id: "RX-102",
        medicine: "Paracetamol",
        dosage: "500 mg",
        frequency: "1-0-1 (Twice daily)",
        duration: "3 days",
        instructions: "As needed for mild pain",
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
    symptoms: "High fever (101°F), persistent cough and sore throat",
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
        dispensedAt: "08 Sep 2026, 10:45 AM"
      },
      {
        id: "RX-104",
        medicine: "Cetirizine",
        dosage: "10 mg",
        frequency: "0-0-1 (Once at bedtime)",
        duration: "5 days",
        instructions: "Take at night",
        dispensed: true,
        dispensedAt: "08 Sep 2026, 10:46 AM"
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
    symptoms: "Follow-up for routine heart checkup & ECG review",
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
    symptoms: "Acid reflux, stomach burn and nausea in mornings",
    vitals: { bp: "120/82", temp: "98.2 °F", pulse: "74 bpm" },
    registeredAt: "08 Sep 2026, 11:20 AM",
    status: "Waiting",
    prescriptions: []
  }
];
