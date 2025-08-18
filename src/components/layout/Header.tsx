import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Menu } from "lucide-react";

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string, movieId?: string) => void;
  onLogout: () => void;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  isAuthenticated?: boolean;
  userRole?: string | null;
}

export const Header = ({ onLogout, onLoginClick, onRegisterClick, isAuthenticated, userRole }: HeaderProps) => {
  const navigate = useNavigate();

  const navItems = [
    { id: "home", label: "HOME", path: "/" },
    { id: "discover", label: "DISCOVER", path: "/discover" },
    { id: "profile", label: "PROFILE", path: "/profile", requiresAuth: true },
    { id: "food", label: "FOOD", path: "/food", requiresAuth: true },
    ...(isAuthenticated && userRole === 'ADMIN' ? [{ id: "admin", label: "ADMIN", path: "/admin" }] : [])
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
          <img 
            src="/lovable-uploads/CELESTIX.png" 
            alt="CELESTIX Logo" 
            className="w-10 h-10 object-contain"
          />
          <span className="text-xl font-bold gradient-text">CELESTIX</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            if (item.requiresAuth && !isAuthenticated) {
              return null;
            }
            return (
                <NavLink
                    key={item.id}
                    to={item.path}
                    className={({ isActive }) =>
                        `text-sm font-medium transition-colors ${
                        isActive
                            ? "text-primary border-b-2 border-primary pb-4"
                            : "text-muted-foreground hover:text-foreground"
                        }`
                    }
                >
                    {item.label}
                </NavLink>
            )
          })}
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={onLogout}
              className="w-8 h-8 rounded-full bg-gradient-accent"
            >
              <User className="w-4 h-4 text-background" />
            </Button>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="outline" onClick={onLoginClick}>Login</Button>
              <Button onClick={onRegisterClick}>Register</Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
