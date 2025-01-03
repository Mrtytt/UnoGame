import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        email,
        password,
      });
      setMessage('Kayıt başarılı! Giriş yapabilirsiniz.');
    } catch (error: any) {
      setMessage(error.response?.data || 'Kayıt sırasında bir hata oluştu.');
    }
  };

  const [inputFocus, setInputFocus] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);

  const styles = {
    body: {
      margin: 0,
      fontFamily: "'Arial', sans-serif",
      background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      color: '#333',
    },
    container: {
      background: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
      padding: '2rem',
      textAlign: 'center' as const,
      width: '90%',
      maxWidth: '400px',
      animation: 'fadeIn 1s ease-in-out',
    },
    input: {
      width: '100%',
      padding: '0.8rem',
      marginBottom: '1.5rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      ...(inputFocus ? {
        borderColor: '#6a11cb',
        boxShadow: '0 0 8px rgba(106, 17, 203, 0.2)',
      } : {}),
    },
    button: {
      width: '100%',
      padding: '0.8rem',
      border: 'none',
      borderRadius: '8px',
      background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
      color: 'white',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ...(buttonHover ? {
        background: 'linear-gradient(135deg, #2575fc, #6a11cb)',
        boxShadow: '0 8px 15px rgba(37, 117, 252, 0.3)',
      } : {}),
    },
    link: {
      display: 'block',
      marginTop: '1.5rem',
      color: '#6a11cb',
      textDecoration: 'none',
      fontSize: '0.9rem',
      transition: 'color 0.3s ease',
    },
    message: {
      marginTop: '1.5rem',
      fontSize: '0.9rem',
      color: '#555',
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1>Kayıt Ol</h1>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
          />
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
          />
          <button
            type="submit"
            style={styles.button}
            onMouseOver={() => setButtonHover(true)}
            onMouseOut={() => setButtonHover(false)}
          >
            Kayıt Ol
          </button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
        <a style={styles.link} onClick={() => navigate('/login')}>
          Zaten hesabınız var mı? Giriş Yap
        </a>
      </div>
    </div>
  );
};

export default Register;
