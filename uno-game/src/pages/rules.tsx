import React from "react";
import { useTheme } from "../context/ThemeContext";

const RulesPage = () => {
  const { theme, themeStyles } = useTheme(); // theme ve themeStyles'ı alıyoruz

  return (
    <div
      style={{
        ...styles.container,
        background: themeStyles[theme].background, // Temadan gelen arka plan
        color: themeStyles[theme].textColor, // Temadan gelen yazı rengi
      }}
    >
      <h1 style={{ ...styles.title, color: themeStyles[theme].textColor }}>
        UNO Oyun Kuralları
      </h1>
      <ul
        style={{
          ...styles.rulesList,
          backgroundColor: themeStyles[theme].cardBackground, // Temadan gelen kart arka planı
          color: themeStyles[theme].cardText, // Temadan gelen kart yazı rengi
        }}
      >
        <li>UNO, 2 ila 10 oyuncu ile oynanabilen bir kart oyunudur.</li>
        <li>Her oyuncuya 7 kart dağıtılır.</li>
        <li>
          Oyuncular sırasıyla kart oynarlar. Oynadıkları kart, önceki kartla aynı
          renk veya aynı sayıya sahip olmalıdır.
        </li>
        <li>Renk değiştirme veya kartın yönünü değiştirme gibi özel kartlar mevcuttur.</li>
        <li>
          Eğer bir oyuncunun elinde sadece bir kart kaldıysa, "UNO!" demek
          zorundadır. Aksi takdirde, ceza olarak 2 kart çeker.
        </li>
        <li>Oyunun amacı, kartları bitirip ilk önce oyunu bitirmektir.</li>
        <li>Oyun bitene kadar oyuncular sırayla kartlarını oynar ve oyun devam eder.</li>
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
    backgroundBlendMode: "overlay" as const, // Desenle renk geçişi
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    fontWeight: "bold",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)", // Göze hoş gelen bir başlık efekti
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
    backdropFilter: "blur(5px)", // Hafif bulanıklık efekti
  },
};

export default RulesPage;
