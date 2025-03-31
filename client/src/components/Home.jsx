
import React from "react";
import { useNavigate } from "react-router-dom";
import image from "./resume.png"
import Chat from './Chat';
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
    fontFamily: "Arial, sans-serif",
    position: "relative",
  },
  loginButton: {
    position: "absolute",
    top: "20px",
    right: "30px",
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "0.3s ease",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
    textTransform: "uppercase",
  },
  description: {
    fontSize: "1.2rem",
    color: "#555",
    maxWidth: "600px",
    lineHeight: "1.6",
    marginBottom: "30px",
  },
  image: {
    width: "80%",
    maxWidth: "600px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  chatBox: {
    position: "absolute",
    bottom: "20px",
    right: "20px",
    width: "300px",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
};

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Resume Templates</h1>
      <p style={styles.description}>
        Build your professional resume effortlessly! Choose from our expertly crafted templates, tailored for freshers and professionals.
      </p>
      <img
        src={image}
        alt="Resume Builder"
        style={styles.image}
      />
      <div style={styles.chatBox}>
        <Chat />
      </div>
    </div>
  );
}

export default Home;

