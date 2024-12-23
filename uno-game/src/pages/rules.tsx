import { useTheme } from "../context/ThemeContext";
import rules from "../utils/Rules";

const RulesPage = () => {
  const { theme, themeStyles } = useTheme(); // Get theme and themeStyles

  return (
    <div
      style={{
        ...styles.container,
        background: themeStyles[theme].background, // Background from theme
        color: themeStyles[theme].textColor, // Text color from theme
      }}
    >
      <h1 style={{ ...styles.title, color: themeStyles[theme].textColor }}>
        UNO Game Rules
      </h1>
      <ul
        style={{
          ...styles.rulesList,
          backgroundColor: themeStyles[theme].cardBackground, // Card background from theme
          color: themeStyles[theme].cardText, // Card text color from theme
        }}
      >
        {rules.map((rule, index) => (
          <li key={index}>{rule}</li>
        ))}
      </ul>
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
    backgroundBlendMode: "overlay" as const, // Blended background effect
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    fontWeight: "bold",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)", // Appealing title effect
  },
  rulesList: {
    listStyleType: "disc",
    textAlign: "left" as const,
    margin: "20px auto",
    width: "80%",
    padding: "10px 20px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    fontSize: "1.1rem",
    lineHeight: "1.8",
    backdropFilter: "blur(5px)", // Subtle blur effect
  },
};

export default RulesPage;
