import React, {
    createContext,
    useContext,
    useRef,
    useState,
    useEffect,
  } from "react";
  
  interface MusicContextType {
    isPlaying: boolean;
    toggleMusic: () => void;
    volume: number;
    setVolume: (volume: number) => void;
  }
  
  const MusicContext = createContext<MusicContextType | undefined>(undefined);
  
  // useMusic custom hook
  export const useMusic = () => {
    const context = useContext(MusicContext);
    if (!context) {
      throw new Error("useMusic must be used within a MusicProvider");
    }
    return context;
  };
  
  // MusicProvider component
  export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
  
    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.volume = volume;
        if (isPlaying) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      }
    }, [isPlaying, volume]);
  
    const toggleMusic = () => {
      setIsPlaying(!isPlaying);
    };
  
    const handleVolumeChange = (volume: number) => {
      setVolume(volume);
    };
  
    return (
      <MusicContext.Provider
        value={{ isPlaying, toggleMusic, volume, setVolume: handleVolumeChange }}
      >
        <audio ref={audioRef} src="/music/background.mp3" loop />
        {children}
      </MusicContext.Provider>
    );
  };
  