import React, { useRef, useState, useEffect } from "react";
import { useMusic } from '../context/MusicContext';

const Settings: React.FC = () => {
  const { isPlaying, toggleMusic, volume, setVolume } = useMusic();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [difficulty, setDifficulty] = useState("Orta");
  const [theme, setTheme] = useState<"black" | "white" | "navy">("black");

  // Tema değiştiğinde arka plan rengini kaydet
  const changeTheme = (newTheme: keyof typeof themes) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Tema kaydediliyor
  };

  // Ses değiştiğinde ses seviyesini kaydet
  const adjustVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setVolume(newVolume);
    localStorage.setItem("volume", newVolume.toString()); // Ses kaydediliyor
  };

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDifficulty(event.target.value);
  };

  // Sayfa yüklendiğinde kullanıcı tercihlerini yükle
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as
      | "black"
      | "white"
      | "navy"
      | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }

    const savedVolume = localStorage.getItem("volume");
    if (savedVolume) {
      const volumeValue = parseFloat(savedVolume);
      setVolume(volumeValue);
      if (audioRef.current) {
        audioRef.current.volume = volumeValue;
      }
    }
  }, []);

  // Sayfa yüklenirken tema ve ses ayarlarını uygula
  useEffect(() => {
    document.body.style.backgroundColor = themes[theme];
    document.body.style.color = theme === "white" ? "black" : "white";
  }, [theme]);

  const themes: Record<"black" | "white" | "navy", string> = {
    black: "#121212",
    white: "#f5f5f5",
    navy: "#1a1b41",
  };

  return (
    <div style={styles.settings}>
      <h2 style={styles.title}>Oyun Ayarları</h2>
      <div style={styles.firstPart}>
        <div style={styles.setting}>
        <label style={styles.volumeLabel}>Zorluk Ayarları</label>
        <select
            value={difficulty}
            onChange={handleDifficultyChange}
            style={styles.select}
          >
            <option value="Kolay">Kolay</option>
            <option value="Orta">Orta</option>
            <option value="Zor">Zor</option>
          </select>
        </div>
        <div style={styles.setting}>
          <audio ref={audioRef} src="/music/background.mp3" loop />
          <div style={styles.volumeControl}>
            <label style={styles.volumeLabel}>Müzik:</label>
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
            {isPlaying ? "Duraklat" : "Çal"}
          </button>
        </div>
      </div>
      <div style={styles.setting}>
        <div style={styles.themeSelector}>
          <h3>Tema Seçici</h3>
          <button
            style={{
              ...styles.themeButton,
              backgroundColor: "#121212",
              color: "white",
            }}
            onClick={() => changeTheme("black")}
          >
            Siyah
          </button>
          <button
            style={{
              ...styles.themeButton,
              backgroundColor: "#f5f5f5",
              color: "black",
            }}
            onClick={() => changeTheme("white")}
          >
            Beyaz
          </button>
          <button
            style={{
              ...styles.themeButton,
              backgroundColor: "#1a1b41",
              color: "white",
            }}
            onClick={() => changeTheme("navy")}
          >
            Mavi
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
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
    marginTop:"10px",
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
    justifyContent: "space-between",
    gap: "20px",
  },
  themeButton: {
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  firstPart: {
    flexDirection: "row" as const,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
};

export default Settings;
