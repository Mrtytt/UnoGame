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
import BackButton from "../utils/BackButton";
import supportTexts from "../data/supportTexts.json"; // JSON dosyasını içe aktar

const SupportScreen: React.FC = () => {
  const { theme, themeStyles } = useTheme(); // Tema bilgilerini alın

  return (
    <Box
      style={{
        ...styles.container,
        background: themeStyles[theme].background,
        color: themeStyles[theme].textColor,
      }}
    >
      <BackButton />
      <Typography variant="h4" sx={{...styles.header,color: themeStyles[theme].textColor}}>
        {supportTexts.header}
      </Typography>
      <Box sx={styles.section}>
        <Typography variant="h6" sx={styles.subHeader}>
          {supportTexts.faqSection.title}
        </Typography>
        <List>
          {supportTexts.faqSection.questions.map((question, index) => (
            <ListItem key={index} sx={styles.listItem}>
              <ListItemText
                primary={question.primary}
                secondary={question.secondary}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={styles.section}>
        <Typography variant="h6" sx={styles.subHeader}>
          {supportTexts.contactSection.title}
        </Typography>
        <Typography sx={styles.contactInfo}>
          {supportTexts.contactSection.email}
        </Typography>
        <Typography sx={styles.contactInfo}>
          {supportTexts.contactSection.phone}
        </Typography>
      </Box>
      <Button
        sx={styles.reportButton}
        variant="contained"
        onClick={() => alert(supportTexts.buttonAlert)}
      >
        {supportTexts.buttonText}
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
    backgroundBlendMode: "overlay" as const,
  },
  header: {
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
    maxWidth: "600px",
  },
  subHeader: {
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#333",
  },
  listItem: {
    padding: "10px 0",
    color: "#555",
    borderBottom: "1px solid #f1f1f1",
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
