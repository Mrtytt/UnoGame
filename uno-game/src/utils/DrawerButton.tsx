import React from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// Props türünü belirtiyoruz
interface DrawerButtonProps {
  drawerOpen: boolean;
  toggleDrawer: (open: boolean) => void;
}

const DrawerButton: React.FC<DrawerButtonProps> = ({ drawerOpen, toggleDrawer }) => {
  return (
    <IconButton
      style={{ ...styles.menuButton, color: "white" }}
      onClick={() => toggleDrawer(!drawerOpen)} // Drawer durumunu tersine çevir
    >
      <MenuIcon />
    </IconButton>
  );
};

const styles = {
  menuButton: {
    position: "absolute" as const,
    top: "20px",
    right: "20px",
  },
};

export default DrawerButton;
