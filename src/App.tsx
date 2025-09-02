import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, Navigate, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import NotFound from "./pages/NotFound";
import { AddMoviePage } from "./pages/AddMoviePage";
import { AddFoodPage } from "./pages/AddFoodPage";
import { AddShowtimePage } from "./pages/AddShowtimePage";
import { TheaterSeatPricingPage } from "./pages/TheaterSeatPricingPage";
import { AdminDashboard } from "./pages/AdminDashboard";
import { EditMoviePage } from "./pages/EditMoviePage";
import { EditFoodPage } from "./pages/EditFoodPage";
import { EditShowtimePage } from "./pages/EditShowtimePage";
import { AddAdminPage } from "./pages/AddAdminPage";
import { EditProfilePage } from "./pages/EditProfilePage";
import { AddFoodCategoryPage } from "./pages/AddFoodCategoryPage";
import { AddMovieGenrePage } from "./pages/AddMovieGenrePage";
import { HomePage } from "./pages/HomePage";
import { DiscoverPage } from "./pages/DiscoverPage";
import { ComingSoonPage } from "./pages/ComingSoonPage";
import { MovieDetailsPage } from "./pages/MovieDetailsPage";
import { BookingPage } from "./pages/BookingPage";
import { FoodComboPage } from "./pages/FoodComboPage";
import { ProfilePage } from "./pages/ProfilePage";
import { LoginForm } from "./components/auth/LoginForm";
import { RegisterForm } from "./components/auth/RegisterForm";
import { ForgotPasswordForm } from "./components/auth/ForgotPasswordForm";
import { MoviesTable } from "./components/movies/MoviesTable";
import { MovieGenreTable } from "./components/admin/MovieGenreTable";
import { FoodTable } from "./components/admin/FoodTable";
import { FoodCategoryTable } from "./components/admin/FoodCategoryTable";
import { ShowtimesTable } from "./components/admin/ShowtimesTable";
import { TheatersTable } from "./components/admin/TheatersTable";
import { BookingsTable } from "./components/admin/BookingsTable";
import { DashboardStats } from "./components/dashboard/DashboardStats";
import React from "react";
import { AdminsTable } from "./components/admin/AdminsTable";
import { AddComboPage } from "./pages/AddComboPage";
import { EditComboPage } from "./pages/EditComboPage";
import { BookingRefundsTable } from "./components/admin/BookingRefundsTable";
import { EditMovieGenrePage } from "./pages/EditMovieGenrePage";

const queryClient = new QueryClient();

// Function to check if user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

// Component for protected routes
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Layout for user-facing pages
const UserLayout = () => {
    const navigate = useNavigate();
    const [isAuthenticatedState, setIsAuthenticatedState] = React.useState(isAuthenticated());

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticatedState(false);
        navigate("/");
    };
    
    return (
        <div className="min-h-screen bg-gradient-cinema">
            <Header
                currentPage=""
                onPageChange={()=>{}}
                onLogout={handleLogout}
                onLoginClick={() => navigate("/login")}
                onRegisterClick={() => navigate("/register")}
                isAuthenticated={isAuthenticatedState}
                userRole={localStorage.getItem("role")}
            />
            <Outlet />
        </div>
    );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* User Facing Routes */}
          <Route element={<UserLayout />}>
            <Route index path="/" element={<HomePage />} />
            <Route path="/discover" element={<DiscoverPage onPageChange={() => {}} isAuthenticated={isAuthenticated()} />} />
            <Route path="/coming-soon" element={<ComingSoonPage onPageChange={() => {}} isAuthenticated={isAuthenticated()} />} />
            <Route path="/movies/:id" element={<MovieDetailsPage movieId={null} onPageChange={() => {}} />} />
            <Route path="/booking/:id" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
            <Route path="/food" element={<ProtectedRoute><FoodComboPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/edit-profile" element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<LoginForm onLogin={(role) => {
              localStorage.setItem("role", role);
              window.location.href = role === 'ADMIN' ? '/admin' : '/';
          }} onSwitchToRegister={() => {window.location.href ='/register'}} />} />
          <Route path="/register" element={<RegisterForm onSwitchToLogin={() => {window.location.href ='/login'}} />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm onBack={()=>{window.location.href ='/login'}} />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} >
                <Route index element={<DashboardStats />} />
                <Route path="movies" element={<MoviesTable />} />
                <Route path="movies/add" element={<AddMoviePage />} />
                <Route path="movies/edit/:id" element={<EditMoviePage />} />
                <Route path="movie-genres" element={<MovieGenreTable />} />
                <Route path="movie-genres/add" element={<AddMovieGenrePage />} />
                <Route path="movie-genres/edit/:id" element={<EditMovieGenrePage />} />
                <Route path="food" element={<FoodTable />} />
                <Route path="food/add" element={<AddFoodPage />} />
                <Route path="food/edit/:id" element={<EditFoodPage />} />
                <Route path="food-categories" element={<FoodCategoryTable />} />
                <Route path="food-categories/add" element={<AddFoodCategoryPage />} />
                <Route path="showtimes" element={<ShowtimesTable />} />
                <Route path="showtimes/add" element={<AddShowtimePage />} />
                <Route path="showtimes/edit/:id" element={<EditShowtimePage />} />
                <Route path="theaters" element={<TheatersTable />} />
                <Route path="theaters/:theaterId/pricing" element={<TheaterSeatPricingPage />} />
                <Route path="bookings" element={<BookingsTable />} />
                <Route path="admins" element={<AdminsTable />} />
                <Route path="admins/add" element={<AddAdminPage />} />
                <Route path="combo" element={<AddComboPage />} />
                <Route path="combo/edit/:id" element={<EditComboPage />} />
                <Route path="refunds" element={<BookingRefundsTable />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
