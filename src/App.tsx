import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/add-movie" element={<AddMoviePage />} />
          <Route path="/add-food" element={<AddFoodPage />} />
          <Route path="/add-showtime" element={<AddShowtimePage />} />
          <Route
            path="/admin/theater/:theaterId/pricing"
            element={<TheaterSeatPricingPage />}
          />
          <Route path="/edit-movie/:id" element={<EditMoviePage />} />
          <Route path="/edit-food/:id" element={<EditFoodPage />} />
          <Route path="/edit-showtime/:id" element={<EditShowtimePage />} />
          <Route path="/add-admin" element={<AddAdminPage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
