import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme } from "../context/ThemeContext";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigate one page backward
  };
  const { themeStyles, theme } = useTheme();

  return (
    <IconButton
      onClick={handleBackClick}
      sx={{
        color: themeStyles[theme].textColor,
        position: "absolute" as const,
        top: "20px",
        left: "20px", // Customize color
      }}
    >
      <ArrowBackIcon />
    </IconButton>
  );
};

export default BackButton;
