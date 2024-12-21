export const getCardStyles = (color: string, value: string | number) => {
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

  // Value'nin türüne göre font size belirleniyor
  const fontSize = typeof value === "number" ? "36px" : "16px";

  return {
    backgroundColor,
    color: textColor,
    borderRadius: "5px",
    display: "inline-block",
    cursor: "pointer",
    width: "75px", // Fixed card width
    height: "100px", // Fixed card height
    textAlign: "center" as const,
    fontSize,
  };
};
