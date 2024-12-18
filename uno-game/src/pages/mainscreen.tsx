import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "../context/ThemeContext";


const MainScreen: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const { theme, themeStyles } = useTheme(); // theme ve themeStyles'ı alıyoruz

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
    <div
      style={{
        ...styles.container,
        background: themeStyles[theme].background, // Temadan gelen arka plan
        color: themeStyles[theme].textColor, // Temadan gelen yazı rengi
      }}
    >
      {/* Background Music */}
      <audio ref={audioRef} src="/music/background.mp3" loop />

      {/* Menu Icon */}
      <IconButton
        style={{ ...styles.menuButton,color:"white"}}
        onClick={() => toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
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

      <h1 style={{ ...styles.welcomeText}}>
        DUO'ya Hoşgeldiniz
      </h1>

      {/* Buttons */}
      <div style={styles.buttonsContainer}>
        <button
          style={{
            ...styles.button
          }}
          onClick={() => navigate("unogame")} // UNOGame rotasına yönlendirme
        >
          Oyun Başlat
        </button>
        <button
          style={{
            ...styles.button,
          }}
        >
          Oyundan Çık
        </button>
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
  menuButton: {
    position: "absolute" as const,
    top: "20px",
    right: "20px",
    
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
