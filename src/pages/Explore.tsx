
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MusicPlayer from '@/components/layout/MusicPlayer';
import Album from '@/components/ui/Album';
import Playlist from '@/components/ui/Playlist';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { featuredAlbums, playlists, genres } from '@/lib/data';
import { usePlayer } from '@/context/PlayerContext';

export default function Explore() {
  const [activeTab, setActiveTab] = useState('new-releases');
  const { currentTrack } = usePlayer();

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      
      <main className="flex-1 ml-64 pb-24">
        <Navbar />
        
        <div className="px-6 py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Explore Music</h1>
            <p className="text-muted-foreground">Discover new music, trending playlists, and more</p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="new-releases">New Releases</TabsTrigger>
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
              <TabsTrigger value="genres">Genres</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>
            
            <TabsContent value="new-releases" className="animate-fade-in">
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">New Albums</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {featuredAlbums.map(album => (
                    <Album key={album.id} album={album} />
                  ))}
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">Singles & EPs</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {featuredAlbums.slice(2, 7).map(album => (
                    <Album key={album.id} album={album} />
                  ))}
                </div>
              </section>
            </TabsContent>
            
            <TabsContent value="playlists" className="animate-fade-in">
              <section>
                <h2 className="text-2xl font-bold mb-4">Featured Playlists</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {playlists.map(playlist => (
                    <Playlist key={playlist.id} playlist={playlist} />
                  ))}
                </div>
              </section>
              
              <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Mood Playlists</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {playlists.slice(1, 4).map(playlist => (
                    <Playlist key={playlist.id} playlist={playlist} />
                  ))}
                </div>
              </section>
            </TabsContent>
            
            <TabsContent value="genres" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {genres.map(genre => (
                  <div 
                    key={genre} 
                    className="relative h-40 rounded-xl overflow-hidden group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-secondary hover:from-accent/50 hover:to-secondary/70 transition-all duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-2xl font-bold">{genre}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="trending" className="animate-fade-in">
              <section>
                <h2 className="text-2xl font-bold mb-4">Trending Albums</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {featuredAlbums.slice(1, 6).map(album => (
                    <Album key={album.id} album={album} />
                  ))}
                </div>
              </section>
              
              <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Popular Playlists</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {playlists.map(playlist => (
                    <Playlist key={playlist.id} playlist={playlist} />
                  ))}
                </div>
              </section>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {currentTrack && <MusicPlayer />}
    </div>
  );
}
