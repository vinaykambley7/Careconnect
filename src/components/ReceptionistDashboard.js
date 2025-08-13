import React, { useState } from "react";
import "./ReceptionistDashboard.css";

export default function ReceptionistDashboard({ patients, setPatients , onLogout}) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    contact: "",
    doctor: "",
  });
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddPatient = () => {
    if (!form.name || !form.age || !form.contact || !form.doctor) {
      alert("Please fill all fields");
      return;
    }
   const updatedPatients = [...patients, form];
  console.log("Adding patient:", form);
  console.log("Updated patients list:", updatedPatients);
  setPatients(updatedPatients);
  setForm({ name: "", age: "", contact: "", doctor: "" });
  };

  return (
    <div className="dashboard-container">
      
      <div className="dashboard-container">
      <h2>Receptionist Dashboard</h2>
      
    

  
    </div>
      <div className="form-group">
        <input
          name="name"
          placeholder="Patient Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          type="number"
        />
        <input
          name="contact"
          placeholder="Contact"
          value={form.contact}
          onChange={handleChange}
        />
        <input
          name="doctor"
          placeholder="Assign Doctor"
          value={form.doctor}
          onChange={handleChange}
        />
        <button className="add-patient-btn" onClick={handleAddPatient}>
          Add Patient
        </button>
      </div>

      <div className="patients-list">
        <h3>Patients List</h3>
        <ul>
          {patients.map((p, i) => (
            <li key={i}>
              {p.name} - Age: {p.age} - Contact: {p.contact} - Doctor: {p.doctor}
            </li>
          ))}
        </ul>
      </div>
    </div>
    
  );
   
}
