import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, List, ListItemButton, ListItemText, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const MainScreen: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  // Drawer toggle
  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  // Navigate to page
  const handleDrawerLinkClick = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <div style={styles.container}>
      {/* Background Music */}
      <audio ref={audioRef} src="/music/background.mp3" loop />

      {/* Menu Icon */}
      <IconButton style={styles.menuButton} onClick={() => toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>

      {/* Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
        <List>
          <ListItemButton onClick={() => handleDrawerLinkClick("settings")}>
            <ListItemText primary="Ayarlar" />
          </ListItemButton>
          <ListItemButton onClick={() => handleDrawerLinkClick("rules")}>
            <ListItemText primary="Kurallar" />
          </ListItemButton>
          <ListItemButton onClick={() => handleDrawerLinkClick("updates")}>
            <ListItemText primary="Güncellemeler" />
          </ListItemButton>
          <ListItemButton onClick={() => handleDrawerLinkClick("support")}>
            <ListItemText primary="Destek" />
          </ListItemButton>   
        </List>
      </Drawer>

      <h1 style={styles.welcomeText}>DUO'ya Hoşgeldiniz</h1>

      {/* Buttons */}
      <div style={styles.buttonsContainer}>
        <button style={styles.button} onClick={() => alert("Oyun başlıyor...")}>
          Oyun Başlat
        </button>
        <button style={styles.button}>Oyundan Çık</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url(/1.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative" as const,
  },
  menuButton: {
    position: "absolute" as const,
    top: "20px",
    right: "20px",
    color: "white",
  },
  welcomeText: {
    color: "white",
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
    color: "white",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
    transition: "all 0.3s ease",
  },
};

export default MainScreen;
