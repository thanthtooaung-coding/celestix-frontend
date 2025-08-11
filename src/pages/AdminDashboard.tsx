import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/navigation/Sidebar";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { MoviesTable } from "@/components/movies/MoviesTable";
import { FoodTable } from "@/components/admin/FoodTable";
import { ShowtimesTable } from "@/components/admin/ShowtimesTable";
import { TheatersTable } from "@/components/admin/TheatersTable";
import { BookingsTable } from "@/components/admin/BookingsTable";
import { Button } from "@/components/ui/button";
import { Bell, Search, Plus } from "lucide-react";

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderContent = () => {
    switch (currentPage) {
      case "movies":
        return <MoviesTable />;
      case "food":
        return <FoodTable />;
      case "showtimes":
        return <ShowtimesTable />;
      case "theaters":
        return <TheatersTable />;
      case "bookings":
        return <BookingsTable />;
      case "dashboard":
      default:
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-foreground mb-2">Hi, Welcome back</h1>
              <Button
                onClick={() => navigate("/add-admin")}
                className="bg-gradient-accent text-background hover:opacity-90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Admin
              </Button>
            </div>
            <DashboardStats />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="flex">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="h-16 border-b border-border/50 bg-secondary/20 backdrop-blur-xl flex items-center justify-between px-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-secondary/50 border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 w-80"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs"></span>
              </Button>
              <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center">
                <span className="text-background font-bold text-sm">A</span>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};