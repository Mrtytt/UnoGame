// styles/getCardStyles.ts

export const getCardStyles = (color: string) => {
    let backgroundColor = "#fff";
    let textColor = "#000";
  
    switch (color) {
      case "red":
        backgroundColor = "#ff0000";
        textColor = "#fff";
        break;
      case "green":
        backgroundColor = "#4caf50";
        textColor = "#fff";
        break;
      case "blue":
        backgroundColor = "#2196f3";
        textColor = "#fff";
        break;
      case "yellow":
        backgroundColor = "#ffeb3b";
        textColor = "#000";
        break;
      default:
        backgroundColor = "#000";
        textColor = "#fff";
    }
  
    return {
      backgroundColor,
      color: textColor,
      padding: "5px",
      borderRadius: "5px",
      display: "inline-block",
      cursor: "pointer",
      margin: "5px",
      width: "75px", // Fixed card width
      height: "50px", // Fixed card height
      textAlign: "center" as const,
      fontSize: "16px",
    };
  };
  