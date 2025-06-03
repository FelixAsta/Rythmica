
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ui/theme-provider';
import Index from '@/pages/Index';
import Explore from '@/pages/Explore';
import NotFound from '@/pages/NotFound';
import { AuthProvider } from '@/context/AuthContext';
import { PlayerProvider } from '@/context/PlayerContext';
import { LibraryProvider } from '@/context/LibraryContext';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="rhythmica-theme">
      <AuthProvider>
        <PlayerProvider>
          <LibraryProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
            <Toaster />
          </LibraryProvider>
        </PlayerProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
