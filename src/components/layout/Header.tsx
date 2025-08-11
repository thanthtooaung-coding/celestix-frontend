import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  User, 
  Menu, 
  Bell,
  Film
} from "lucide-react";

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string, movieId?: string) => void;
  onAuthClick: () => void;
  isAuthenticated?: boolean;
}

export const Header = ({ currentPage, onPageChange, onAuthClick, isAuthenticated }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications] = useState([
    { id: 1, message: "New movie 'Dune 2' now available!", read: false },
    { id: 2, message: "Your booking for 'The Batman' confirmed", read: true },
    { id: 3, message: "Special discount on food combos!", read: false }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { id: "home", label: "HOME" },
    { id: "discover", label: "DISCOVER" },
    { id: "profile", label: "PROFILE", requiresAuth: true },
    { id: "food", label: "FOOD", requiresAuth: true },
    ...(isAuthenticated ? [{ id: "admin", label: "ADMIN" }] : [])
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/CELESTIX.png" 
            alt="CELESTIX Logo" 
            className="w-10 h-10 object-contain"
          />
          <span className="text-xl font-bold gradient-text">CELESTIX</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`text-sm font-medium transition-colors ${
                currentPage === item.id
                  ? "text-primary border-b-2 border-primary pb-4"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary/50 border-border/50"
            />
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                {unreadCount}
              </Badge>
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onAuthClick}
            className="w-8 h-8 rounded-full bg-gradient-accent"
          >
            <User className="w-4 h-4 text-background" />
          </Button>

          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};