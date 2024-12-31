// components/ColorPopup.tsx
import React from "react";

interface ColorPopupProps {
  onColorSelect: (color: string) => void;
  colors: string[];
}

const ColorPopup: React.FC<ColorPopupProps> = ({ onColorSelect, colors }) => {
  const styles = {
    popup: {
      position: "absolute" as const,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      padding: "10px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      zIndex: 999,
    },
    button: {
      margin: "5px",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
      gap: "5px",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#333",
      marginBottom: "25px",
      marginTop: "10px",
      textTransform: "uppercase" as const,
      letterSpacing: "1px",
      textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%", // Center vertically if needed
      margin: 0, // Remove default margin
    },
  };

  return (
    <div style={styles.popup}>
      <h3 style={styles.heading}>Choose Color</h3>
      {colors.map((color) => (
        <button
          key={color}
          style={{
            ...styles.button,
            backgroundColor: color,
            color: color === "yellow" ? "#000" : "#fff", // Yellow için siyah yazı
          }}
          onClick={() => onColorSelect(color)}
        >
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default ColorPopup;
