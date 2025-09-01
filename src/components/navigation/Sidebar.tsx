import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Film, 
  Newspaper,
  Calendar,
  User,
  Building,
  ClipboardList,
  Tag,
  LogOut,
  Shield,
  Receipt,
} from "lucide-react";

interface SidebarProps {
  onPageChange: (page: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { id: "movies", label: "Movies", icon: Film, path: "/admin/movies" },
  { id: "movie-genre", label: "Movie Genre", icon: Tag, path: "/admin/movie-genres" },
  { id: "food", label: "Food", icon: Users, path: "/admin/food" },
  // { id: "food-category", label: "Food Category", icon: ClipboardList, path: "/admin/food-categories" },
  { id: "showtimes", label: "Showtimes", icon: Calendar, path: "/admin/showtimes" },
  { id: "theaters", label: "Theaters", icon: Building, path: "/admin/theaters" },
  { id: "bookings", label: "Bookings", icon: Newspaper, path: "/admin/bookings" },
  { id: "refunds", label: "Refunds", icon: Receipt, path: "/admin/refunds" },
  { id: "admins", label: "Admins", icon: Shield, path: "/admin/admins" },
];

const bottomMenuItems = [{ id: "logout", label: "Logout", icon: LogOut }];

export const Sidebar = ({ onPageChange }: SidebarProps) => {
  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <div className="w-64 h-screen bg-secondary/30 glass-card border-r border-border/50 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/CELESTIX.png" 
            alt="CELESTIX Logo" 
            className="w-8 h-8 object-contain"
          />
          <span className="text-xl font-bold gradient-text">CELESTIX</span>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-background" />
          </div>
          <div>
            <p className="font-medium text-foreground">Admin</p>
            <p className="text-sm text-muted-foreground">Administrator</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 flex-1">
        {menuItems.map((item) => (
            <Link to={item.path} key={item.id}>
                <Button
                    variant={currentPage === item.path || (item.path === "/admin" && currentPage.startsWith("/admin/")) && currentPage !== "/admin/movies" && currentPage !== "/admin/movie-genres" && currentPage !== "/admin/food" && currentPage !== "/admin/food-category" && currentPage !== "/admin/showtimes" && currentPage !== "/admin/theaters" && currentPage !== "/admin/bookings" ? "default" : "ghost"}
                    className={cn(
                    "w-full justify-start space-x-3 h-12",
                    currentPage === item.path || (item.path === "/admin" && currentPage.startsWith("/admin/")) && currentPage !== "/admin/movies" && currentPage !== "/admin/movie-genres" && currentPage !== "/admin/food" && currentPage !== "/admin/food-category" && currentPage !== "/admin/showtimes" && currentPage !== "/admin/theaters" && currentPage !== "/admin/bookings"
                        ? "bg-gradient-accent text-background shadow-glow" 
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}
                >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                </Button>
            </Link>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <nav className="p-4 space-y-2 border-t border-border/50">
        {bottomMenuItems.map((item) => (
          <Button
            key={item.id}
            variant={"ghost"}
            className={cn(
              "w-full justify-start space-x-3 h-12",
              "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
            onClick={() => onPageChange(item.id)}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Button>
        ))}
      </nav>
    </div>
  );
};