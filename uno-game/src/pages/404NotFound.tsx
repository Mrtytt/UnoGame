import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { themeStyles, theme } = useTheme();

  return (
    <div
      style={{
        ...styles.containerStyle,
        background: themeStyles[theme].background,
        color: themeStyles[theme].handContainer.currentPlayer,
      }}
    >
      <h1 style={styles.headingStyle}>404</h1>
      <p style={styles.textStyle}>Oops! The page you're looking for doesn't exist.</p>
      <button style={styles.buttonStyle} onClick={() => navigate("/")}>
        Go Back Home
      </button>
    </div>
  );
};
const styles = {
  containerStyle: {
    padding: "20px",
    textAlign: "center" as const,
    minHeight: "94vh",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    backgroundSize: "cover",
    backgroundBlendMode: "overlay" as const, // Desenle renk geçişi
  },
  headingStyle:{
    fontSize: "6rem",
    fontWeight: "bold",
    margin: "0",
    color: "#007bff",
  },
  
  textStyle: {
    fontSize: "1.5rem",
    margin: "20px 0",
  },
  
  buttonStyle:{
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  }
}

export default NotFound;
