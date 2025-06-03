
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MusicPlayer from '@/components/layout/MusicPlayer';
import Album from '@/components/ui/Album';
import Playlist from '@/components/ui/Playlist';
import Track from '@/components/ui/Track';
import Featured from '@/components/ui/Featured';
import { Button } from '@/components/ui/button';
import { featuredAlbums, recentTracks, playlists, genres } from '@/lib/data';
import { usePlayer } from '@/context/PlayerContext';
import { useAuth } from '@/context/AuthContext';

export default function Index() {
  const { isAuthenticated, user } = useAuth();
  const { currentTrack } = usePlayer();
  
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      
      <main className="flex-1 ml-64 pb-24">
        <Navbar />
        
        <div className="px-6 py-6 space-y-8">
          <Featured playlist={playlists[0]} />
          
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Featured Albums</h2>
              <Link to="/albums">
                <Button variant="ghost" className="flex items-center text-muted-foreground hover:text-foreground">
                  See all <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {featuredAlbums.map(album => (
                <Album key={album.id} album={album} className="animate-fade-in" />
              ))}
            </div>
          </section>
          
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Playlists for You</h2>
              <Link to="/playlists">
                <Button variant="ghost" className="flex items-center text-muted-foreground hover:text-foreground">
                  See all <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {playlists.map(playlist => (
                <Playlist key={playlist.id} playlist={playlist} className="animate-fade-in" />
              ))}
            </div>
          </section>
          
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Recent Tracks</h2>
              <Link to="/recent">
                <Button variant="ghost" className="flex items-center text-muted-foreground hover:text-foreground">
                  See all <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
            
            <div className="bg-card rounded-xl p-4">
              {recentTracks.map((track, index) => (
                <Track 
                  key={track.id} 
                  track={track} 
                  index={index}
                  className="animate-fade-in" 
                  style={{ animationDelay: `${index * 50}ms` }} 
                />
              ))}
            </div>
          </section>
          
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Browse by Genre</h2>
              <Link to="/genres">
                <Button variant="ghost" className="flex items-center text-muted-foreground hover:text-foreground">
                  See all <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {genres.map(genre => (
                <Link key={genre} to={`/genres/${genre.toLowerCase()}`}>
                  <Button variant="outline" className="rounded-full animate-fade-in">
                    {genre}
                  </Button>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      {currentTrack && <MusicPlayer />}
    </div>
  );
}
