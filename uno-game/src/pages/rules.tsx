import React from 'react';

const RulesPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>UNO Oyun Kuralları</h1>
      <ul style={styles.rulesList}>
        <li>UNO, 2 ila 10 oyuncu ile oynanabilen bir kart oyunudur.</li>
        <li>Her oyuncuya 7 kart dağıtılır.</li>
        <li>Oyuncular sırasıyla kart oynarlar. Oynadıkları kart, önceki kartla aynı renk veya aynı sayıya sahip olmalıdır.</li>
        <li>Renk değiştirme veya kartın yönünü değiştirme gibi özel kartlar mevcuttur.</li>
        <li>Eğer bir oyuncunun elinde sadece bir kart kaldıysa, "UNO!" demek zorundadır. Aksi takdirde, ceza olarak 2 kart çeker.</li>
        <li>Oyunun amacı, kartları bitirip ilk önce oyunu bitirmektir.</li>
        <li>Oyun bitene kadar oyuncular sırayla kartlarını oynar ve oyun devam eder.</li>
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center' as const,
    backgroundColor: '#f4f4f9',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    backgroundImage: 'url("https://www.transparenttextures.com/patterns/soft-wallpaper.png")',
  },
  title: {
    fontSize: '2.5rem',
    color: '#e63946',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  rulesList: {
    listStyleType: 'disc',
    textAlign: 'left' as const,
    margin: '20px auto',
    width: '80%',
    padding: '10px 20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    color: '#555',
    fontSize: '1.1rem',
    lineHeight: '1.8',
  },
};

export default RulesPage;
