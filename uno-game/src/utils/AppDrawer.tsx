import React from "react";
import { List, ListItemButton, ListItemText, Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface DrawerProps {
  drawerOpen: boolean;
  toggleDrawer: (open: boolean) => void;
}

const AppDrawer: React.FC<DrawerProps> = ({ drawerOpen, toggleDrawer }) => {
  const navigate = useNavigate();

  const handleDrawerLinkClick = (path: string) => {
    navigate(path);
    toggleDrawer(false);
  };

  return (
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
  );
};

export default AppDrawer;
