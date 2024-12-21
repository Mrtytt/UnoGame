import React, { useRef, useState, useEffect } from "react";
import { useMusic } from "../context/MusicContext";
import { useTheme } from "../context/ThemeContext";

const Settings: React.FC = () => {
  const { isPlaying, toggleMusic, volume, setVolume } = useMusic();
  const { theme, changeTheme, themeStyles } = useTheme(); // ThemeContext'ten gelen değerler
  const audioRef = useRef<HTMLAudioElement>(null);
  const [difficulty, setDifficulty] = useState("Orta");

  const adjustVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setVolume(newVolume);
    localStorage.setItem("volume", newVolume.toString());
  };

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDifficulty(event.target.value);
  };

  return (
    <div
      style={{
        ...styles.container,
        background: themeStyles[theme].background, // Temadan gelen arka plan
        color: themeStyles[theme].textColor, // Temadan gelen yazı rengi
      }}
    >
      <div style={styles.settings}>
        <h2 style={styles.title}>Game Seetings</h2>
        <div style={styles.firstPart}>
          <div style={styles.setting}>
            <label style={styles.volumeLabel}>Choose Difficulty</label>
            <select
              value={difficulty}
              onChange={handleDifficultyChange}
              style={styles.select}
            >
              <option value="Kolay">Easy</option>
              <option value="Orta">Medium</option>
              <option value="Zor">Hard</option>
            </select>
          </div>
          <div style={styles.setting}>
            <audio ref={audioRef} src="/music/background.mp3" loop />
            <div style={styles.volumeControl}>
              <label style={styles.volumeLabel}>Music:</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={adjustVolume}
                style={styles.slider}
              />
            </div>
            <button style={styles.musicButton} onClick={toggleMusic}>
              {isPlaying ? "Pause" : "Play"}
            </button>
          </div>
        </div>
        <div style={styles.setting}>
          <div style={styles.themeSelector}>
            <h3>Choose Theme</h3>
            <button
              style={{
                ...styles.themeButton,
                backgroundColor: "#121212",
                color: "white",
              }}
              onClick={() => changeTheme("black")}
            >
              Black
            </button>
            <button
              style={{
                ...styles.themeButton,
                backgroundColor: "#f5f5f5",
                color: "black",
              }}
              onClick={() => changeTheme("white")}
            >
              White
            </button>
            <button
              style={{
                ...styles.themeButton,
                backgroundColor: "#1a1b41",
                color: "white",
              }}
              onClick={() => changeTheme("navy")}
            >
              Blue
            </button>
            <button
              style={{
                ...styles.themeButton,
                backgroundColor: "#ff7e5f",
                color: "white",
              }}
              onClick={() => changeTheme("sunset")}
            >
              Sunset
            </button>
            <button
              style={{
                ...styles.themeButton,
                backgroundColor: "#005c5b",
                color: "white",
              }}
              onClick={() => changeTheme("forest")}
            >
              Forest
            </button>
            <button
              style={{
                ...styles.themeButton,
                backgroundColor: "#ff9a9e",
                color: "black",
              }}
              onClick={() => changeTheme("candy")}
            >
              Candy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center" as const,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    backgroundSize: "cover",
    backgroundBlendMode: "overlay" as const, // Desenle renk geçişi
  },
  settings: {
    padding: "20px",
    backgroundColor: "#282c34",
    color: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    maxWidth: "400px",
    margin: "20px auto",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "20px",
    textAlign: "center" as const,
  },
  setting: {
    marginBottom: "10px",
    marginTop: "10px",
    width: "45%",
  },
  label: {
    fontSize: "16px",
    display: "block",
    marginTop: "10px",
  },
  select: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    marginTop: "20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
  musicControls: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "15px", // Adjusted gap to match the other components
  },
  musicButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "white",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    width: "100%",
    marginTop: "10px",
  },
  volumeControl: {
    display: "flex",
    flexDirection: "row" as const,
    alignItems: "center",
    gap: "10px",
    width: "100%",
    marginBottom: "10px",
  },
  volumeLabel: {
    color: "white",
    fontWeight: "bold",
    width: "45px", // Adjusted for alignment with slider
  },
  slider: {
    width: "100%", // Stretch to fill available space
  },
  themeSelector: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "10px",
  },
  themeButton: {
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
  firstPart: {
    flexDirection: "row" as const,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
};

export default Settings;
