import React from 'react';
import { Typography, Box, List, ListItem, ListItemText, Button } from '@mui/material';

const SupportScreen: React.FC = () => {
  return (
    <Box sx={styles.container}>
      <Typography variant="h4" sx={styles.header}>
        Destek
      </Typography>
      <Box sx={styles.section}>
        <Typography variant="h6" sx={styles.subHeader}>
          Sıkça Sorulan Sorular
        </Typography>
        <List>
          <ListItem sx={styles.listItem}>
            <ListItemText primary="Uno nasıl oynanır?" secondary="Detaylı rehber için kurallar sekmesine göz atın." />
          </ListItem>
          <ListItem sx={styles.listItem}>
            <ListItemText primary="Hata bildirimi nasıl yapılır?" secondary="Destek ekibine ulaşabilirsiniz." />
          </ListItem>
        </List>
      </Box>
      <Box sx={styles.section}>
        <Typography variant="h6" sx={styles.subHeader}>
          İletişim
        </Typography>
        <Typography sx={styles.contactInfo}>E-posta: support@uno.com</Typography>
        <Typography sx={styles.contactInfo}>Telefon: +90 555 123 45 67</Typography>
      </Box>
      <Button sx={styles.reportButton} variant="contained" onClick={() => alert('Sorun bildirme ekranına yönlendiriliyor...')}>
        Sorun Bildir
      </Button>
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
        background: 'linear-gradient(120deg, #eaf6f6, #f9f9f9)',
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/soft-wallpaper.png")',
        backgroundSize: 'cover',
        padding: '20px',
    },
    header: {
        color: '#007bff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '20px',
    },
    section: {
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width:"50%",
    },
    subHeader: {
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#333',
    },
    listItem: {
        padding: '5px 0',
        color: '#555',
    },
    contactInfo: {
        margin: '5px 0',
        fontSize: '1rem',
        color: '#555',
    },
    reportButton: {
        marginTop: '10px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        '&:hover': {
        backgroundColor: '#c0392b',
        },
    },
};

export default SupportScreen;
