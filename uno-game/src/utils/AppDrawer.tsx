import React, { useState } from "react";
import { List, ListItemButton, ListItemText, Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DrawerButton from "./DrawerButton";

const AppDrawer: React.FC = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerLinkClick = (path: string) => {
    navigate(path);
    setDrawerOpen(false); // Close drawer after navigation
  };

  return (
    <>
      <DrawerButton drawerOpen={drawerOpen} toggleDrawer={setDrawerOpen} />
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)} // Close drawer on outside click
      >
        <List>
          <ListItemButton onClick={() => handleDrawerLinkClick("settings")}>
            <ListItemText primary="Settings" />
          </ListItemButton>
          <ListItemButton onClick={() => handleDrawerLinkClick("rules")}>
            <ListItemText primary="Rules" />
          </ListItemButton>
          <ListItemButton onClick={() => handleDrawerLinkClick("updates")}>
            <ListItemText primary="Updates" />
          </ListItemButton>
          <ListItemButton onClick={() => handleDrawerLinkClick("support")}>
            <ListItemText primary="Support" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export default AppDrawer;
