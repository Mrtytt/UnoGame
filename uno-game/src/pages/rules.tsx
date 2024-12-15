import React from 'react';

const RulesPage = () => {
  return (
    <div style={styles.container}>
      <h1>UNO Oyun Kuralları</h1>
      <ul style={styles.rulesList}>
        <li>UNO, 2 ila 10 oyuncu ile oynanabilen bir kart oyunudur.</li>
        <li>Her oyuncuya 7 kart dağıtılır.</li>
        <li>Oyuncular sırasıyla kart oynarlar. Oynadıkları kart, önceki kartla aynı renk veya aynı sayıya sahip olmalıdır.</li>
        <li>Renk değiştirme veya kartın yönünü değiştirme gibi özel kartlar mevcuttur.</li>
        <li>Eğer bir oyuncunun elinde sadece bir kart kaldıysa, "UNO!" demek zorundadır. Aksi takdirde, ceza olarak 2 kart çeker.</li>
        <li>Oyunun amacı, kartları bitirip ilk önce oyunu bitirmektir.</li>
        <li>Oyun bitene kadar oyuncular sırayla kartlarını oynar ve oyun devam eder.</li>
      </ul>
      <button onClick={() => window.history.back()} style={styles.backButton}>Geri Dön</button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center' as 'center',
  },
  rulesList: {
    listStyleType: 'disc' as 'disc',
    textAlign: 'left' as 'left',
    margin: '20px auto',
    width: '80%',
  },
  backButton: {
    padding: '10px 20px',
    marginTop: '20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default RulesPage;
