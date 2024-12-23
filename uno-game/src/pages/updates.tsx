import React, { useEffect, useState } from "react";
import { Typography, Box, List, ListItem, ListItemText, CircularProgress } from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";

const UpdatesScreen: React.FC = () => {
  const [updates, setUpdates] = useState<{ version: string; date: string; changes: string[] }[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme, themeStyles } = useTheme();

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/repos/Mrtytt/UnoGame/releases"
        );
        const fetchedUpdates = response.data.map((release: any) => ({
          version: release.tag_name,
          date: new Date(release.published_at).toLocaleDateString(),
          changes: release.body.split("\n").filter((line: string) => line.trim() !== ""),
        }));
        setUpdates(fetchedUpdates);
      } catch (error) {
        console.error("Error fetching updates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUpdates();
  }, []);

  return (
    <Box
      sx={{
        ...styles.container,
        background: themeStyles[theme].background,
        color: themeStyles[theme].textColor,
      }}
    >
      <Typography variant="h4" sx={styles.header}>
        Updates
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List sx={styles.list}>
          {updates.map((update, index) => (
            <Box key={index} sx={styles.updateCard}>
              <Typography variant="h6" sx={styles.version}>
                Version: {update.version}
              </Typography>
              <Typography sx={styles.date}>Date: {update.date}</Typography>
              <List sx={styles.changesList}>
                {update.changes.map((change, idx) => (
                  <ListItem key={idx} sx={styles.changeItem}>
                    <ListItemText primary={`- ${change}`} />
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </List>
      )}
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
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  updateCard: {
    padding: "15px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  version: {
    fontWeight: "bold",
    color: "#007bff",
  },
  date: {
    fontStyle: "italic",
    marginBottom: "10px",
    color: "#555",
  },
  changesList: {
    marginTop: "10px",
  },
  changeItem: {
    padding: 0,
    fontSize: "0.9rem",
  },
};

export default UpdatesScreen;
