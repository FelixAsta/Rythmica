
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, MoreHorizontal, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Track as TrackType } from '@/lib/data';
import { usePlayer } from '@/context/PlayerContext';
import { useLibrary } from '@/context/LibraryContext';

type TrackProps = {
  track: TrackType;
  index?: number;
  showAlbum?: boolean;
  showCover?: boolean;
  compact?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export default function Track({ 
  track, 
  index, 
  showAlbum = true, 
  showCover = true, 
  compact = false, 
  className,
  style
}: TrackProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayer();
  const { likedTracks, toggleLikeTrack } = useLibrary();
  
  const isActive = currentTrack?.id === track.id;
  const isLiked = likedTracks.some(t => t.id === track.id);
  
  const handlePlayPause = () => {
    if (isActive) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };
  
  return (
    <div 
      className={cn(
        "group flex items-center gap-4 p-2 rounded-md transition-colors duration-200",
        isActive ? "bg-secondary/80" : "hover:bg-secondary/50",
        compact ? "py-1" : "py-2",
        className
      )}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {typeof index === 'number' && (
        <div className="w-8 text-center">
          {isHovered || isActive ? (
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-6 w-6 rounded-full p-0 flex items-center justify-center"
              onClick={handlePlayPause}
            >
              {isActive && isPlaying ? (
                <Pause className="h-3 w-3" />
              ) : (
                <Play className="h-3 w-3" />
              )}
            </Button>
          ) : (
            <span className={cn(
              "text-sm font-medium",
              isActive ? "text-primary" : "text-muted-foreground"
            )}>
              {index + 1}
            </span>
          )}
        </div>
      )}
      
      {showCover && (
        <div className="relative min-w-10 h-10">
          <img 
            src={track.albumCover} 
            alt={track.title} 
            className="w-10 h-10 rounded object-cover"
          />
          {(isActive && isPlaying) && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded">
              <div className="audio-waves h-3">
                <div className="audio-wave"></div>
                <div className="audio-wave" style={{ animationDelay: "0.2s" }}></div>
                <div className="audio-wave" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <div className="flex flex-col">
          <span className={cn(
            "font-medium truncate",
            isActive ? "text-primary" : "text-foreground"
          )}>
            {track.title}
          </span>
          <div className="flex items-center gap-1">
            <Link 
              to={`/artists/${track.artist}`} 
              className="text-sm text-muted-foreground hover:text-foreground truncate"
            >
              {track.artist}
            </Link>
            
            {track.explicit && (
              <span className="text-xs px-1 bg-muted text-muted-foreground rounded">E</span>
            )}
          </div>
        </div>
      </div>
      
      {showAlbum && !compact && (
        <Link 
          to={`/albums/${track.albumId}`} 
          className="text-sm text-muted-foreground hover:text-foreground truncate hidden md:block"
        >
          {track.albumId}
        </Link>
      )}
      
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity",
            isLiked && "text-primary opacity-100"
          )}
          onClick={() => toggleLikeTrack(track)}
        >
          <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} />
        </Button>
        
        <span className="text-sm text-muted-foreground mx-2 w-10 text-right">{track.duration}</span>
        
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
