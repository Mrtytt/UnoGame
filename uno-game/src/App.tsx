import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loading from "./pages/loading";
import MainScreen from "./pages/mainscreen";
import RulesPage from "./pages/rules";
import UpdatesScreen from "./pages/updates";
import SupportScreen from "./pages/support";
import Settings from "./pages/settings";
import { MusicProvider } from "./context/MusicContext";
import { ThemeProvider } from "./context/ThemeContext"; // Yeni ThemeProvider'ı ekliyoruz
import UNOGame from "./pages/unogame";
import { GameProvider } from "./context/GameContext";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <MusicProvider>
        <ThemeProvider>
          <GameProvider>
            <div>
              {isLoading ? (
                <Loading />
              ) : (
                <Routes>
                  <Route path="/" element={<MainScreen />} />
                  <Route path="/rules" element={<RulesPage />} />
                  <Route path="/updates" element={<UpdatesScreen />} />
                  <Route path="/support" element={<SupportScreen />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/unogame" element={<UNOGame />} />
                </Routes>
              )}
            </div>
          </GameProvider>
        </ThemeProvider>
      </MusicProvider>
    </Router>
  );
};

export default App;
