
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Playlist } from '@/lib/data';
import { usePlayer } from '@/context/PlayerContext';

type FeaturedProps = {
  playlist: Playlist;
  className?: string;
};

export default function Featured({ playlist, className }: FeaturedProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayer();
  
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  
  const handlePlay = () => {
    // Play the first track in the playlist
    if (playlist.tracks.length > 0) {
      playTrack(playlist.tracks[0]);
    }
  };
  
  const isCurrentlyPlaying = isPlaying && 
    currentTrack && 
    playlist.tracks.some(track => track.id === currentTrack.id);
  
  return (
    <div 
      ref={containerRef} 
      className={cn(
        "group relative rounded-xl overflow-hidden h-80 w-full bg-gradient-to-br from-accent/50 to-secondary",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10"></div>
      
      <div className="absolute top-0 right-0 bottom-0 w-2/3 flex justify-end items-center overflow-hidden">
        <div 
          className="relative w-full h-full transform -rotate-12 translate-x-20 translate-y-10"
          style={{ 
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          {playlist.tracks.slice(0, 3).map((track, index) => (
            <div 
              key={track.id}
              className="absolute shadow-2xl rounded-lg overflow-hidden"
              style={{
                width: `${Math.min(400, containerWidth * 0.4)}px`,
                height: `${Math.min(400, containerWidth * 0.4)}px`,
                left: `${index * 40}px`,
                top: `${index * 20}px`,
                zIndex: 3 - index,
                transform: `rotateY(${index * 5}deg) scale(${1 - index * 0.1})`,
                transition: 'all 0.5s ease-out',
              }}
            >
              <img 
                src={track.albumCover} 
                alt={track.title} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute inset-0 z-20 flex flex-col justify-center p-8">
        <div className="max-w-md">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full mb-4">
            Featured Playlist
          </span>
          <h2 className="text-4xl font-bold mb-2">{playlist.title}</h2>
          <p className="text-muted-foreground mb-6 line-clamp-2">{playlist.description}</p>
          
          <div className="flex items-center gap-4">
            <Button 
              onClick={isCurrentlyPlaying ? togglePlay : handlePlay}
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 flex items-center gap-2"
            >
              {isCurrentlyPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              {isCurrentlyPlaying ? "Pause" : "Play"}
            </Button>
            
            <Link to={`/playlists/${playlist.id}`}>
              <Button
                variant="outline"
                className="rounded-full border-white/20 text-white hover:bg-white/10 h-12 px-6"
              >
                Explore
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
