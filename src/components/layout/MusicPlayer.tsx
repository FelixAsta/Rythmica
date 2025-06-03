
import { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart, Repeat, Shuffle, PlusCircle, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { usePlayer } from '@/context/PlayerContext';
import { useLibrary } from '@/context/LibraryContext';

export default function MusicPlayer() {
  const { 
    currentTrack, 
    isPlaying, 
    volume, 
    progress, 
    duration,
    playTrack,
    togglePlay, 
    setVolume, 
    seekTo, 
    nextTrack,
    prevTrack
  } = usePlayer();
  
  const { likedTracks, toggleLikeTrack } = useLibrary();
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);
  
  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };
  
  const toggleMute = () => {
    if (isMuted) {
      setVolume(prevVolume || 0.5);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };
  
  const handleSeek = (value: number[]) => {
    seekTo(value[0]);
  };
  
  const isLiked = currentTrack && likedTracks.some(track => track.id === currentTrack.id);
  
  if (!currentTrack) {
    return null; // Don't render player if no track is selected
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-player border-t border-border h-20 px-4 flex items-center justify-between animate-slide-up">
      <div className="flex items-center w-1/4">
        <div className="relative group">
          <img 
            src={currentTrack.albumCover} 
            alt={currentTrack.title} 
            className="h-12 w-12 rounded-md object-cover mr-3"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-md transition-opacity">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mr-4 overflow-hidden">
          <h4 className="text-sm font-medium truncate">{currentTrack.title}</h4>
          <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
        </div>
        <div className="hidden sm:flex gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "h-8 w-8 text-muted-foreground hover:text-foreground",
              isLiked && "text-primary hover:text-primary"
            )}
            onClick={() => currentTrack && toggleLikeTrack(currentTrack)}
          >
            <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center w-2/4">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hidden sm:flex">
            <Shuffle className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-foreground hover:text-primary" onClick={prevTrack}>
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button 
            className="rounded-full p-2 bg-white text-black hover:bg-white/90 transition-all duration-200 h-10 w-10"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-foreground hover:text-primary" onClick={nextTrack}>
            <SkipForward className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hidden sm:flex">
            <Repeat className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2 w-full max-w-lg">
          <span className="text-xs text-muted-foreground w-8 text-right">
            {formatTime(progress)}
          </span>
          <Slider
            value={[progress]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground w-8">
            {formatTime(duration)}
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-end w-1/4 gap-1">
        {isPlaying && (
          <div className="audio-waves mr-2 hidden sm:flex">
            <div className="audio-wave"></div>
            <div className="audio-wave" style={{ animationDelay: "0.2s" }}></div>
            <div className="audio-wave" style={{ animationDelay: "0.4s" }}></div>
            <div className="audio-wave" style={{ animationDelay: "0.6s" }}></div>
            <div className="audio-wave" style={{ animationDelay: "0.8s" }}></div>
          </div>
        )}
        
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={toggleMute}>
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
        <Slider
          value={[volume]}
          max={1}
          step={0.01}
          onValueChange={handleVolumeChange}
          className="w-24 hidden sm:flex"
        />
      </div>
    </div>
  );
}
