import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Loading from "./pages/loading";
import MainScreen from "./pages/mainscreen";
import RulesPage from "./pages/rules";
import UpdatesScreen from "./pages/updates";
import SupportScreen from "./pages/support";
import Settings from "./pages/settings";
import NotFound from "./pages/404NotFound";
import { MusicProvider } from "./context/MusicContext";
import { ThemeProvider } from "./context/ThemeContext";
import UNOGame from "./pages/unogame";
import { GameProvider } from "./context/GameContext";
import LoginScreen from "./pages/login"; // Login ekranını ekliyoruz
import RegisterScreen from "./pages/register"; // Register ekranını ekliyoruz
import { AuthProvider, useAuth } from "./context/AuthContext";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

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
                  {!isAuthenticated ? (
                    <>
                      <Route path="/login" element={<LoginScreen />} />
                      <Route path="/register" element={<RegisterScreen />} />
                      <Route
                        path="*"
                        element={<Navigate to="/login" replace />}
                      />
                    </>
                  ) : (
                    <>
                      <Route path="/" element={<MainScreen />} />
                      <Route path="/rules" element={<RulesPage />} />
                      <Route path="/updates" element={<UpdatesScreen />} />
                      <Route path="/support" element={<SupportScreen />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/unogame" element={<UNOGame />} />
                      <Route path="*" element={<NotFound />} />
                    </>
                  )}
                </Routes>
              )}
            </div>
          </GameProvider>
        </ThemeProvider>
      </MusicProvider>
    </Router>
  );
};

const AppWrapper: React.FC = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default AppWrapper;
