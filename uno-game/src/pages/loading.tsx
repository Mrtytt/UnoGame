import React from 'react';

const Loading: React.FC = () => {
  return (
    <div style={containerStyle}>
      <div style={spinnerStyle}></div>
      <p style={textStyle}>Loading...</p>
    </div>
  );
};

// CSS stilleri için React.CSSProperties kullanımı
const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f5f5f5',
};

const spinnerStyle: React.CSSProperties = {
  width: '50px',
  height: '50px',
  border: '5px solid #ccc',
  borderTop: '5px solid #007bff',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

const textStyle: React.CSSProperties = {
  marginTop: '10px',
  fontSize: '18px',
  color: '#333',
};

// Keyframe animasyonu eklemek için (isteğe bağlı)
const styleSheet = document.styleSheets[0];
const keyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default Loading;
