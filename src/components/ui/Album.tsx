
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, MoreHorizontal, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Album as AlbumType } from '@/lib/data';
import { usePlayer } from '@/context/PlayerContext';
import { useLibrary } from '@/context/LibraryContext';

type AlbumProps = {
  album: AlbumType;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

export default function Album({ album, className, size = 'md' }: AlbumProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayer();
  const { likedAlbums, toggleLikeAlbum } = useLibrary();
  
  const isLiked = likedAlbums.some(a => a.id === album.id);
  
  const dimensions = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
  };
  
  const handlePlay = () => {
    // In a real app, we would play the first track of the album
    // For now, we'll just pretend
    console.log(`Playing album: ${album.title}`);
  };
  
  return (
    <div className={cn("group flex flex-col", className)}>
      <div 
        className={cn("relative rounded-lg overflow-hidden mb-3", dimensions[size])}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={album.coverUrl} 
          alt={album.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className={cn(
          "absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300",
          isHovered && "opacity-100"
        )}>
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => toggleLikeAlbum(album)}
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 text-white hover:bg-white/20 transition-all duration-200"
            >
              <Heart className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} />
            </Button>
            
            <Button 
              onClick={handlePlay}
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 w-12 flex items-center justify-center transition-transform duration-200 hover:scale-105"
            >
              <Play className="h-6 w-6" />
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
        <Link to={`/albums/${album.id}`} className="text-foreground font-medium hover:text-primary transition-colors line-clamp-1">
          {album.title}
        </Link>
        <Link to={`/artists/${album.artist}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors line-clamp-1">
          {album.artist}
        </Link>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs text-muted-foreground">{album.year}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{album.genre}</span>
        </div>
      </div>
    </div>
  );
}
