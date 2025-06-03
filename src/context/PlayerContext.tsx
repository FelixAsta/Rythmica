
import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { Track } from '@/lib/data';

type PlayerContextType = {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  queue: Track[];
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  seekTo: (position: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  addToQueue: (track: Track) => void;
  clearQueue: () => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queue, setQueue] = useState<Track[]>([]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
      });
      
      audioRef.current.addEventListener('ended', () => {
        nextTrack();
      });
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const startProgressInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = window.setInterval(() => {
      if (audioRef.current) {
        setProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };

  const playTrack = (track: Track) => {
    if (currentTrack?.id === track.id) {
      togglePlay();
      return;
    }
    
    setCurrentTrack(track);
    
    if (audioRef.current) {
      audioRef.current.src = track.url;
      audioRef.current.volume = volume;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        startProgressInterval();
      }).catch(err => {
        console.error('Error playing track:', err);
        setIsPlaying(false);
      });
    }
  };

  const togglePlay = () => {
    if (!currentTrack) return;
    
    if (isPlaying) {
      audioRef.current?.pause();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else {
      audioRef.current?.play();
      startProgressInterval();
    }
    
    setIsPlaying(!isPlaying);
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const seekTo = (position: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = position;
      setProgress(position);
    }
  };

  const nextTrack = () => {
    if (queue.length > 0) {
      const nextTrack = queue[0];
      setQueue(queue.slice(1));
      playTrack(nextTrack);
    } else {
      // Stop playing when queue is empty
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  const prevTrack = () => {
    // For now, just restart the current track
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setProgress(0);
    }
  };

  const addToQueue = (track: Track) => {
    setQueue([...queue, track]);
  };

  const clearQueue = () => {
    setQueue([]);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        volume,
        progress,
        duration,
        queue,
        playTrack,
        togglePlay,
        setVolume,
        seekTo,
        nextTrack,
        prevTrack,
        addToQueue,
        clearQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
