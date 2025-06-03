
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Track, Playlist, Album, playlists as mockPlaylists } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './AuthContext';

type LibraryContextType = {
  playlists: Playlist[];
  likedTracks: Track[];
  likedAlbums: Album[];
  recentlyPlayed: Track[];
  createPlaylist: (title: string, description: string) => Promise<Playlist>;
  addToPlaylist: (playlistId: string, track: Track) => void;
  removeFromPlaylist: (playlistId: string, trackId: string) => void;
  toggleLikeTrack: (track: Track) => void;
  toggleLikeAlbum: (album: Album) => void;
  addToRecentlyPlayed: (track: Track) => void;
};

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [likedTracks, setLikedTracks] = useState<Track[]>([]);
  const [likedAlbums, setLikedAlbums] = useState<Album[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([]);
  
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    // Load user's library data from localStorage or mock data
    if (isAuthenticated) {
      try {
        const storedPlaylists = localStorage.getItem('rhythmica_playlists');
        const storedLikedTracks = localStorage.getItem('rhythmica_liked_tracks');
        const storedLikedAlbums = localStorage.getItem('rhythmica_liked_albums');
        const storedRecentlyPlayed = localStorage.getItem('rhythmica_recently_played');
        
        setPlaylists(storedPlaylists ? JSON.parse(storedPlaylists) : mockPlaylists);
        setLikedTracks(storedLikedTracks ? JSON.parse(storedLikedTracks) : []);
        setLikedAlbums(storedLikedAlbums ? JSON.parse(storedLikedAlbums) : []);
        setRecentlyPlayed(storedRecentlyPlayed ? JSON.parse(storedRecentlyPlayed) : []);
      } catch (error) {
        console.error('Error loading library data:', error);
      }
    } else {
      // Default to mock data for non-authenticated users
      setPlaylists(mockPlaylists);
    }
  }, [isAuthenticated]);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('rhythmica_playlists', JSON.stringify(playlists));
      localStorage.setItem('rhythmica_liked_tracks', JSON.stringify(likedTracks));
      localStorage.setItem('rhythmica_liked_albums', JSON.stringify(likedAlbums));
      localStorage.setItem('rhythmica_recently_played', JSON.stringify(recentlyPlayed));
    }
  }, [isAuthenticated, playlists, likedTracks, likedAlbums, recentlyPlayed]);

  const createPlaylist = async (title: string, description: string): Promise<Playlist> => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to create a playlist",
        variant: "destructive",
      });
      throw new Error('Authentication required');
    }

    const newPlaylist: Playlist = {
      id: `user-playlist-${Date.now()}`,
      title,
      description,
      coverUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=500&auto=format&fit=crop',
      tracks: [],
      owner: user?.name || 'User',
    };

    setPlaylists([...playlists, newPlaylist]);

    toast({
      title: "Playlist created",
      description: `Your new playlist "${title}" has been created`,
    });

    return newPlaylist;
  };

  const addToPlaylist = (playlistId: string, track: Track) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to add tracks to a playlist",
        variant: "destructive",
      });
      return;
    }

    setPlaylists(playlists.map(playlist => {
      if (playlist.id === playlistId) {
        // Check if track already exists in playlist
        if (playlist.tracks.some(t => t.id === track.id)) {
          toast({
            title: "Track already in playlist",
            description: `"${track.title}" is already in this playlist`,
          });
          return playlist;
        }

        toast({
          title: "Track added",
          description: `"${track.title}" added to "${playlist.title}"`,
        });

        return {
          ...playlist,
          tracks: [...playlist.tracks, track],
        };
      }
      return playlist;
    }));
  };

  const removeFromPlaylist = (playlistId: string, trackId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to remove tracks from a playlist",
        variant: "destructive",
      });
      return;
    }

    setPlaylists(playlists.map(playlist => {
      if (playlist.id === playlistId) {
        const trackToRemove = playlist.tracks.find(t => t.id === trackId);
        
        if (trackToRemove) {
          toast({
            title: "Track removed",
            description: `"${trackToRemove.title}" removed from "${playlist.title}"`,
          });
        }

        return {
          ...playlist,
          tracks: playlist.tracks.filter(track => track.id !== trackId),
        };
      }
      return playlist;
    }));
  };

  const toggleLikeTrack = (track: Track) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to like tracks",
        variant: "destructive",
      });
      return;
    }

    const isLiked = likedTracks.some(t => t.id === track.id);

    if (isLiked) {
      setLikedTracks(likedTracks.filter(t => t.id !== track.id));
      toast({
        title: "Track unliked",
        description: `"${track.title}" removed from your liked tracks`,
      });
    } else {
      setLikedTracks([...likedTracks, track]);
      toast({
        title: "Track liked",
        description: `"${track.title}" added to your liked tracks`,
      });
    }
  };

  const toggleLikeAlbum = (album: Album) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to like albums",
        variant: "destructive",
      });
      return;
    }

    const isLiked = likedAlbums.some(a => a.id === album.id);

    if (isLiked) {
      setLikedAlbums(likedAlbums.filter(a => a.id !== album.id));
      toast({
        title: "Album unliked",
        description: `"${album.title}" removed from your liked albums`,
      });
    } else {
      setLikedAlbums([...likedAlbums, album]);
      toast({
        title: "Album liked",
        description: `"${album.title}" added to your liked albums`,
      });
    }
  };

  const addToRecentlyPlayed = (track: Track) => {
    // Add to start of recently played, remove duplicates
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(t => t.id !== track.id);
      return [track, ...filtered].slice(0, 20); // Cap at 20 items
    });
  };

  return (
    <LibraryContext.Provider
      value={{
        playlists,
        likedTracks,
        likedAlbums,
        recentlyPlayed,
        createPlaylist,
        addToPlaylist,
        removeFromPlaylist,
        toggleLikeTrack,
        toggleLikeAlbum,
        addToRecentlyPlayed,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};
