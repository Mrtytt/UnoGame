import React, { useState } from "react";
import { List, ListItemButton, ListItemText, Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import DrawerButton from "./DrawerButton";

const AppDrawer: React.FC = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { themeStyles, theme } = useTheme();

  const handleDrawerLinkClick = (path: string) => {
    navigate(`/${path}`); // Prepend '/' to make the path absolute
    setDrawerOpen(false); // Close drawer after navigation
  };

  const drawerStyle = {
    backgroundColor: themeStyles[theme].cardBackground,
    color: themeStyles[theme].textColor, // Zıt renk seçimi
  };

  return (
    <>
      <DrawerButton drawerOpen={drawerOpen} toggleDrawer={setDrawerOpen} />
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          style: {
            backgroundColor: themeStyles[theme].cardBackground, // Panelin arka plan rengini değiştir
            color: themeStyles[theme].textColor, // Panelin yazı rengini değiştir
            width: "100px", // Drawer genişliğini ayarla (isteğe bağlı)
            height: "100%", // Tam yükseklik için
          },
        }}
      >
        <List>
          <ListItemButton
            onClick={() => handleDrawerLinkClick("settings")}
            style={{
              color: themeStyles[theme].textColor,
            }}
          >
            <ListItemText primary="Settings" />
          </ListItemButton>
          <ListItemButton
            onClick={() => handleDrawerLinkClick("rules")}
            style={{
              color: themeStyles[theme].textColor,
            }}
          >
            <ListItemText primary="Rules" />
          </ListItemButton>
          <ListItemButton
            onClick={() => handleDrawerLinkClick("updates")}
            style={{
              color: themeStyles[theme].textColor,
            }}
          >
            <ListItemText primary="Updates" />
          </ListItemButton>
          <ListItemButton
            onClick={() => handleDrawerLinkClick("support")}
            style={{
              color: themeStyles[theme].textColor,
            }}
          >
            <ListItemText primary="Support" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export default AppDrawer;
