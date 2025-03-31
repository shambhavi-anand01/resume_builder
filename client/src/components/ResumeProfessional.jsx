
import React, { useState } from "react";
import jsPDF from "jspdf";

function ResumeProfessional() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    about: "",
    experience: "",
    skills: "",
    achievements: "",
    references: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Professional Resume", 10, 10);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${formData.name}`, 10, 20);
    doc.text(`Email: ${formData.email}`, 10, 30);
    doc.text(`Phone: ${formData.phone}`, 10, 40);
    doc.text(`About Me: ${formData.about}`, 10, 50);
    doc.text(`Experience: ${formData.experience}`, 10, 60);
    doc.text(`Skills: ${formData.skills}`, 10, 70);
    doc.text(`Achievements: ${formData.achievements}`, 10, 80);
    doc.text(`References: ${formData.references}`, 10, 90);
    doc.save("Professional_Resume.pdf");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Professional Resume</h1>
      {Object.keys(formData).map((field) => (
        <div key={field} style={styles.section}>
          <label>{field.toUpperCase()}</label>
          <textarea name={field} value={formData[field]} onChange={handleChange} style={styles.textarea} />
        </div>
      ))}
      <button onClick={downloadPDF} style={styles.button}>Download PDF</button>
    </div>
  );
}

const styles = {
  container: { fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "600px", margin: "auto", border: "1px solid #ccc", borderRadius: "10px", backgroundColor: "#f9f9f9" },
  header: { textAlign: "center", color: "#333" },
  section: { marginBottom: "15px", borderBottom: "1px solid #ccc", paddingBottom: "10px" },
  textarea: { width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "5px" },
  button: { padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer", borderRadius: "5px", marginTop: "10px", width: "100%" }
};

export default ResumeProfessional;

