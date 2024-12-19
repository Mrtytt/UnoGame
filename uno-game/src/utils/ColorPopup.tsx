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
      padding: "20px",
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
    },
  };

  return (
    <div style={styles.popup}>
      <h3>Renk Seçin:</h3>
      {colors.map((color) => (
        <button
          key={color}
          style={{ ...styles.button, backgroundColor: color }}
          onClick={() => onColorSelect(color)}
        >
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default ColorPopup;
