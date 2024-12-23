import React from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { useTheme } from "../context/ThemeContext";

const SupportScreen: React.FC = () => {
  const { theme, themeStyles } = useTheme(); // Get theme and theme styles

  return (
    <Box
      style={{
        ...styles.container,
        background: themeStyles[theme].background, // Background from theme
        color: themeStyles[theme].textColor, // Text color from theme
      }}
    >
      <Typography variant="h4" sx={styles.header}>
        Support
      </Typography>
      <Box sx={styles.section}>
        <Typography variant="h6" sx={styles.subHeader}>
          Frequently Asked Questions
        </Typography>
        <List>
          <ListItem sx={styles.listItem}>
            <ListItemText
              primary="How to play Uno?"
              secondary="For a detailed guide, check the rules section."
            />
          </ListItem>
          <ListItem sx={styles.listItem}>
            <ListItemText
              primary="How to report a bug?"
              secondary="You can reach out to the support team."
            />
          </ListItem>
        </List>
      </Box>
      <Box sx={styles.section}>
        <Typography variant="h6" sx={styles.subHeader}>
          Contact
        </Typography>
        <Typography sx={styles.contactInfo}>
          E-Mail: support@uno.com
        </Typography>
        <Typography sx={styles.contactInfo}>
          Phone: +90 555 123 45 67
        </Typography>
      </Box>
      <Button
        sx={styles.reportButton}
        variant="contained"
        onClick={() => alert("Redirecting to issue reporting screen...")}
      >
        Contact Us
      </Button>
    </Box>
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
    backgroundBlendMode: "overlay" as const, // Background color transition effect
  },
  header: {
    color: "#007bff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
  },
  section: {
    marginBottom: "20px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "60%",
    maxWidth: "600px", // Ensures responsiveness
  },
  subHeader: {
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#333",
  },
  listItem: {
    padding: "10px 0",
    color: "#555",
    borderBottom: "1px solid #f1f1f1", // Adds separation between items
  },
  contactInfo: {
    margin: "8px 0",
    fontSize: "1.1rem",
    color: "#555",
  },
  reportButton: {
    marginTop: "20px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "#c0392b",
    },
  },
};

export default SupportScreen;
