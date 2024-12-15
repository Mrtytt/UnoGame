import React, { useRef, useState } from "react";

interface SettingsProps {
  onPauseChange: (paused: boolean) => void;
  onVolumeChange: (volume: number) => void;
}

const Settings: React.FC<SettingsProps> = ({ onPauseChange, onVolumeChange }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const handlePauseToggle = () => {
    setIsPlaying(prevState => {
      onPauseChange(!prevState);
      return !prevState;
    });
  };
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const adjustVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(event.target.value);
      if (audioRef.current) {
        audioRef.current.volume = newVolume;
      }
      setVolume(newVolume);
    };

  return (
    <div style={styles.settings}>
        <audio ref={audioRef} src="/music/background.mp3" loop />
        <div style={styles.musicControls}>
            <button style={styles.musicButton} onClick={toggleMusic}>
            {isPlaying ? "Duraklat" : "Çal"}
            </button>
        <div style={styles.volumeControl}>
          <label style={styles.volumeLabel}>Ses:</label>
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
    </div>
    
  );
};

const styles = {
  settings: {
    padding: '20px',
    backgroundColor: '#282c34',
    color: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '300px',
    margin: '20px',
  },
  setting: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '16px',
    marginBottom: '10px',
    display: 'block',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  musicControls: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "10px",
  },
  musicButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "white",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  volumeControl: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  volumeLabel: {
    color: "white",
    fontWeight: "bold",
  },
  slider: {
    width: "150px",
  },
};

export default Settings;
