
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Playlist as PlaylistType } from '@/lib/data';
import { usePlayer } from '@/context/PlayerContext';

type PlaylistProps = {
  playlist: PlaylistType;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

export default function Playlist({ playlist, className, size = 'md' }: PlaylistProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayer();
  
  const dimensions = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
  };
  
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
    <div className={cn("group flex flex-col", className)}>
      <div 
        className={cn("relative rounded-lg overflow-hidden mb-3", dimensions[size])}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={playlist.coverUrl} 
          alt={playlist.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className={cn(
          "absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300",
          isHovered && "opacity-100"
        )}>
          <div className="flex items-center gap-2">
            <Button 
              onClick={isCurrentlyPlaying ? togglePlay : handlePlay}
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 w-12 flex items-center justify-center transition-transform duration-200 hover:scale-105"
            >
              {isCurrentlyPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 text-white hover:bg-white/20 transition-all duration-200"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col">
        <Link to={`/playlists/${playlist.id}`} className="text-foreground font-medium hover:text-primary transition-colors line-clamp-1">
          {playlist.title}
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2">{playlist.description}</p>
        <span className="text-xs text-muted-foreground mt-1">By {playlist.owner} • {playlist.tracks.length} tracks</span>
      </div>
    </div>
  );
}
