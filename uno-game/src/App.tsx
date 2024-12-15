import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loading from './pages/loading';
import MainScreen from './pages/mainscreen';
import RulesPage from './pages/rules';
import UpdatesScreen from './pages/updates';
import SupportScreen from './pages/support';
import Settings from './pages/settings';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Duraklatma fonksiyonu
  const handlePauseChange = (paused: boolean) => {
    setIsPaused(paused);
  };

  // Ses seviyesi değiştirme fonksiyonu
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  return (
    <Router>
      <div>
        {isLoading ? <Loading /> : (
          <Routes>
            <Route path="/" element={<MainScreen />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/updates" element={<UpdatesScreen />} />
            <Route path="/support" element={<SupportScreen />} />
            <Route 
              path="/settings" 
              element={<Settings onPauseChange={handlePauseChange} onVolumeChange={handleVolumeChange} />} 
            />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
