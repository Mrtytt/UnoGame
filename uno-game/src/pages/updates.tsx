import React from 'react';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const UpdatesScreen: React.FC = () => {
  const updates = [
    { version: '1.0.1', date: '15/12/2024', changes: ['Hata düzeltmeleri', 'Performans iyileştirmeleri'] },
    { version: '1.0.0', date: '10/12/2024', changes: ['İlk sürüm yayında!', 'Temel oyun işlevleri'] },
  ];

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" sx={styles.header}>
        Güncellemeler
      </Typography>
      <List sx={styles.list}>
        {updates.map((update, index) => (
          <Box key={index} sx={styles.updateCard}>
            <Typography variant="h6" sx={styles.version}>
              Sürüm: {update.version}
            </Typography>
            <Typography sx={styles.date}>Tarih: {update.date}</Typography>
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
    </Box>
  );
};

const styles = {
    container: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e3f2fd, #ffffff)',
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
        backgroundRepeat: 'repeat',
        padding: '20px',
    },
    header: {
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '20px',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    updateCard: {
        padding: '15px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    version: {
        fontWeight: 'bold',
        color: '#007bff',
    },
    date: {
        fontStyle: 'italic',
        marginBottom: '10px',
        color: '#555',
    },
    changesList: {
        marginTop: '10px',
    },
    changeItem: {
        padding: 0,
        fontSize: '0.9rem',
    },
};

export default UpdatesScreen;
