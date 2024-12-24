import React, { useState, useRef } from "react";
import { useMusic } from "../context/MusicContext";
import { useTheme } from "../context/ThemeContext";
import BackButton from "../utils/BackButton";

const Settings: React.FC = () => {
  const { isPlaying, toggleMusic, volume, setVolume } = useMusic();
  const { theme, changeTheme, themeStyles } = useTheme();
  const audioRef = useRef<HTMLAudioElement>(null);

  const adjustVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setVolume(newVolume);
    localStorage.setItem("volume", newVolume.toString());
  };

  // State to manage collapsible sections
  const [openSections, setOpenSections] = useState({
    theme: true,
    music: false,
    volume: false,
  });
  
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div
      style={{
        ...styles.container,
        background: themeStyles[theme].background,
        color: themeStyles[theme].textColor,
      }}
    >
      <BackButton></BackButton>
      <div style={styles.settings}>
        <h2 style={styles.title}>Settings</h2>

        {/* Theme Settings Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Theme Settings</h3>
            <button
              style={styles.toggleButton}
              onClick={() => toggleSection("theme")}
            >
              {openSections.theme ? "▲" : "▼"}
            </button>
          </div>
          {openSections.theme && (
            <div style={styles.sectionContent}>
              <div style={styles.themeButtons}>
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
          )}
        </div>

        {/* Music Settings Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Music Settings</h3>
            <button
              style={styles.toggleButton}
              onClick={() => toggleSection("music")}
            >
              {openSections.music ? "▲" : "▼"}
            </button>
          </div>
          {openSections.music && (
            <div style={styles.sectionContent}>
              <audio ref={audioRef} src="/music/background.mp3" loop />
              <button style={styles.musicButton} onClick={toggleMusic}>
                {isPlaying ? "Pause Music" : "Play Music"}
              </button>
            </div>
          )}
        </div>

        {/* Volume Settings Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Volume Settings</h3>
            <button
              style={styles.toggleButton}
              onClick={() => toggleSection("volume")}
            >
              {openSections.volume ? "▲" : "▼"}
            </button>
          </div>
          {openSections.volume && (
            <div style={styles.sectionContent}>
              <div style={styles.volumeControl}>
                <label style={styles.volumeLabel}>Music Volume:</label>
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
            </div>
          )}
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
    backgroundBlendMode: "overlay" as const,
  },
  settings: {
    padding: "30px",
    backgroundColor: "#2c2f33",
    color: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
    maxWidth: "500px",
    width: "100%",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
    textAlign: "center" as const,
  },
  section: {
    marginBottom: "20px",
    padding: "10px",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    margin: 0,
  },
  toggleButton: {
    fontSize: "1rem",
    backgroundColor: "transparent",
    color: "white",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  sectionContent: {
    marginTop: "10px",
  },
  themeButtons: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(60px, 1fr))",
    gap: "10px",
  },
  themeButton: {
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "0.9rem",
    textAlign: "center" as const,
    transition: "background-color 0.3s ease, transform 0.2s",
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
  },
  volumeControl: {
    display: "flex",
    flexDirection: "row" as const,
    alignItems: "center",
    gap: "10px",
    width: "100%",
  },
  volumeLabel: {
    fontWeight: "bold",
  },
  slider: {
    width: "100%",
  },
};

export default Settings;
