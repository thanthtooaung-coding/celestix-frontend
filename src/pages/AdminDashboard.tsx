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
import { FoodCategoryTable } from "@/components/admin/FoodCategoryTable";
import { MovieGenreTable } from "@/components/admin/MovieGenreTable";

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderContent = () => {
    switch (currentPage) {
      case "movies":
        return <MoviesTable />;
      case "movie-genre":
        return <MovieGenreTable />;
      case "food":
        return <FoodTable />;
      case "food-category":
        return <FoodCategoryTable />;
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
          

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};