
import { Music, Radio, Mic2, Library, ListMusic, PlusCircle, Heart, Clock, Album, PlayCircle, MoreHorizontal, UserCircle2, Settings } from 'lucide-react';

// Types
export type Album = {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  year: number;
  genre: string;
};

export type Track = {
  id: string;
  title: string;
  artist: string;
  albumId: string;
  albumCover: string;
  duration: string;
  explicit: boolean;
  url: string;
};

export type Playlist = {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  tracks: Track[];
  owner: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

// Mock Data
export const mockUser: User = {
  id: '1',
  name: 'Alex Morgan',
  email: 'alex@example.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop',
};

export const featuredAlbums: Album[] = [
  {
    id: '1',
    title: 'In Rainbows',
    artist: 'Radiohead',
    coverUrl: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=500&auto=format&fit=crop',
    year: 2007,
    genre: 'Alternative Rock',
  },
  {
    id: '2',
    title: 'Blonde',
    artist: 'Frank Ocean',
    coverUrl: 'https://images.unsplash.com/photo-1503455637927-730bce8583c0?q=80&w=500&auto=format&fit=crop',
    year: 2016,
    genre: 'R&B',
  },
  {
    id: '3',
    title: 'Future Nostalgia',
    artist: 'Dua Lipa',
    coverUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=500&auto=format&fit=crop',
    year: 2020,
    genre: 'Pop',
  },
  {
    id: '4',
    title: 'To Pimp a Butterfly',
    artist: 'Kendrick Lamar',
    coverUrl: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?q=80&w=500&auto=format&fit=crop',
    year: 2015,
    genre: 'Hip Hop',
  },
  {
    id: '5',
    title: 'When We All Fall Asleep, Where Do We Go?',
    artist: 'Billie Eilish',
    coverUrl: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?q=80&w=500&auto=format&fit=crop',
    year: 2019,
    genre: 'Pop',
  },
];

export const recentTracks: Track[] = [
  {
    id: '1',
    title: 'Weird Fishes/Arpeggi',
    artist: 'Radiohead',
    albumId: '1',
    albumCover: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=500&auto=format&fit=crop',
    duration: '3:48',
    explicit: false,
    url: '/audio-sample.mp3',
  },
  {
    id: '2',
    title: 'Nights',
    artist: 'Frank Ocean',
    albumId: '2',
    albumCover: 'https://images.unsplash.com/photo-1503455637927-730bce8583c0?q=80&w=500&auto=format&fit=crop',
    duration: '5:07',
    explicit: true,
    url: '/audio-sample.mp3',
  },
  {
    id: '3',
    title: 'Levitating',
    artist: 'Dua Lipa',
    albumId: '3',
    albumCover: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=500&auto=format&fit=crop',
    duration: '3:23',
    explicit: false,
    url: '/audio-sample.mp3',
  },
  {
    id: '4',
    title: 'Alright',
    artist: 'Kendrick Lamar',
    albumId: '4',
    albumCover: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?q=80&w=500&auto=format&fit=crop',
    duration: '3:39',
    explicit: true,
    url: '/audio-sample.mp3',
  },
  {
    id: '5',
    title: 'bad guy',
    artist: 'Billie Eilish',
    albumId: '5',
    albumCover: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?q=80&w=500&auto=format&fit=crop',
    duration: '3:14',
    explicit: false,
    url: '/audio-sample.mp3',
  },
];

export const playlists: Playlist[] = [
  {
    id: '1',
    title: 'Chill Vibes',
    description: 'Relaxing tunes for your downtime',
    coverUrl: 'https://images.unsplash.com/photo-1483232539664-d89822fb5d3e?q=80&w=500&auto=format&fit=crop',
    tracks: recentTracks.slice(0, 3),
    owner: 'Rhythmica',
  },
  {
    id: '2',
    title: 'Workout Mix',
    description: 'High energy tracks to keep you moving',
    coverUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=500&auto=format&fit=crop',
    tracks: recentTracks.slice(2, 5),
    owner: 'Rhythmica',
  },
  {
    id: '3',
    title: 'Focus',
    description: 'Concentrate with these instrumental tracks',
    coverUrl: 'https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?q=80&w=500&auto=format&fit=crop',
    tracks: recentTracks.slice(1, 4),
    owner: 'Rhythmica',
  },
  {
    id: '4',
    title: 'Indie Discoveries',
    description: 'Fresh indie tracks you might have missed',
    coverUrl: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?q=80&w=500&auto=format&fit=crop',
    tracks: recentTracks.slice(3, 5).concat(recentTracks.slice(0, 1)),
    owner: 'Alex Morgan',
  },
];

export const genres = [
  'Pop', 'Rock', 'Hip Hop', 'R&B', 'Electronic', 'Classical', 'Jazz', 'Country', 'Alternative', 'Indie'
];

export const navItems = [
  { icon: Music, label: 'Home', href: '/' },
  { icon: Radio, label: 'Explore', href: '/explore' },
  { icon: Library, label: 'Library', href: '/library' },
  { icon: ListMusic, label: 'Playlists', href: '/playlists' },
  { icon: Mic2, label: 'Artists', href: '/artists' },
  { icon: Album, label: 'Albums', href: '/albums' },
];

export const userLibraryItems = [
  { icon: PlusCircle, label: 'Create Playlist', href: '/create-playlist' },
  { icon: Heart, label: 'Liked Songs', href: '/liked-songs' },
  { icon: Clock, label: 'Recently Played', href: '/recent' },
];

export const playerControls = [
  { icon: PlayCircle, label: 'Play', action: 'play' },
  { icon: Heart, label: 'Like', action: 'like' },
  { icon: MoreHorizontal, label: 'More', action: 'more' },
];

export const userMenuItems = [
  { icon: UserCircle2, label: 'Profile', href: '/profile' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];
