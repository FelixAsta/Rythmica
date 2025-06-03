
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className={`sticky top-0 z-30 w-full transition-all duration-300 ${
      scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border/50' : 'bg-transparent'
    }`}>
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSearch} className="relative max-w-md w-full mx-4 hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for songs, artists, or albums"
            className="pl-10 bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <div className="flex items-center gap-2">
          <Link to="/search" className="md:hidden">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
              </Button>
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="rounded-full flex items-center gap-2">
                  <img 
                    src={user?.avatar} 
                    alt={user?.name} 
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="hidden md:inline-block font-medium">{user?.name}</span>
                </Button>
              </Link>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="default" size="sm" className="rounded-full">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
