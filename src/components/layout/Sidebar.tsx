
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PlusCircle, Heart, Music, Radio, Library, ListMusic, Mic2, Album, ChevronLeft, ChevronRight, LogOut, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { navItems, userLibraryItems } from '@/lib/data';
import { useAuth } from '@/context/AuthContext';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className={cn(
      "h-screen fixed top-0 left-0 bottom-0 z-40 flex flex-col bg-sidebar border-r border-border transition-all duration-300",
      collapsed ? "w-20" : "w-64",
    )}>
      <div className="flex items-center justify-between p-6">
        <Link to="/" className="flex items-center gap-3">
          {!collapsed && (
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Rhythmica
            </h1>
          )}
          {collapsed && (
            <Music className="h-8 w-8 text-primary" />
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="hover:bg-secondary/80"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      <div className="px-3 py-2">
        <nav className="space-y-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "nav-link",
                location.pathname === item.href && "active"
              )}
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-4 px-3">
        <h3 className={cn(
          "px-3 text-xs uppercase text-muted-foreground font-medium mb-2",
          collapsed && "sr-only"
        )}>
          Your Library
        </h3>
        <nav className="space-y-1">
          {userLibraryItems.map(item => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "nav-link",
                location.pathname === item.href && "active"
              )}
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4">
        {isAuthenticated ? (
          <div className="flex flex-col gap-2">
            <Link to="/profile" className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-accent/10">
              <div className="relative">
                <img 
                  src={user?.avatar} 
                  alt={user?.name} 
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ring-background"></span>
              </div>
              {!collapsed && (
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-medium truncate">{user?.name}</span>
                  <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
                </div>
              )}
            </Link>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 justify-start"
                onClick={() => logout()}
              >
                <LogOut className="h-4 w-4 mr-2" />
                {!collapsed && "Log out"}
              </Button>
              
              <Link to="/settings">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Link to="/auth">
              <Button 
                className={cn(
                  "w-full bg-primary text-primary-foreground hover:bg-primary/90",
                  collapsed && "p-2"
                )}
              >
                {collapsed ? <Music className="h-5 w-5" /> : "Sign In"}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
