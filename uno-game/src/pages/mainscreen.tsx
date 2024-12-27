import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import AppDrawer from "../utils/AppDrawer";
import BackButton from "../utils/BackButton";

const MainScreen: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const { theme, themeStyles } = useTheme(); // theme ve themeStyles'ı alıyoruz

  return (
    <div
      style={{
        ...styles.container,
        background: themeStyles[theme].background, // Temadan gelen arka plan
        color: themeStyles[theme].textColor, // Temadan gelen yazı rengi
      }}
    >
      {/* Background Music */}
      <audio ref={audioRef} src="/music/background.mp3" loop />

      <BackButton />
      <AppDrawer />

      <h1 style={{ ...styles.welcomeText }}>Welcome to UNO!</h1>

      {/* Buttons */}
      <div style={styles.buttonsContainer}>
        <button
          style={{
            ...styles.button,
            color: themeStyles[theme].nameTextColor.currentPlayer,
            backgroundColor: themeStyles[theme].handContainer.currentPlayer, // Temadan gelen buton yazı rengi
          }}
          onClick={() => navigate("unogame")} // UNOGame rotasına yönlendirme
        >
          Start Game
        </button>
        <button
          style={{
            ...styles.button,
            color: themeStyles[theme].nameTextColor.currentPlayer, // Temadan gelen buton yazı rengi
            backgroundColor: themeStyles[theme].handContainer.currentPlayer, // Temadan gelen buton yazı rengi
          }}
        >
          Exit
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
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
  welcomeText: {
    fontSize: "3rem",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
  },
  button: {
    padding: "15px 30px",
    fontSize: "1.5rem",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
    transition: "all 0.3s ease",
  },
};

export default MainScreen;
