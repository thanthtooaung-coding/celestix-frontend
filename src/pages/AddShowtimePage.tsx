import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const AddShowtimePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showtimeData, setShowtimeData] = useState({
    movie: "",
    theater: "",
    date: "",
    time: "",
    seatsAvailable: "",
    status: "Available"
  });

  // Mock data - in real app this would come from API
  const movies = [
    "Spider-Man: No Way Home",
    "The Batman",
    "Top Gun: Maverick",
    "Doctor Strange 2"
  ];

  const theaters = [
    "Theater 1",
    "Theater 2", 
    "Theater 3",
    "Theater 4"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save to database
    toast({
      title: "Showtime Added",
      description: "New showtime has been successfully added.",
    });
    navigate(-1);
  };

  const handleInputChange = (field: string, value: string) => {
    setShowtimeData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <ArrowLeft 
            className="w-6 h-6 text-foreground mr-4 cursor-pointer" 
            onClick={() => navigate(-1)}
          />
          <h1 className="text-2xl font-bold text-foreground">Add New Showtime</h1>
        </div>

        <Card className="p-6 bg-card/50 border-border/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Movie */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Movie *
                </label>
                <Select value={showtimeData.movie} onValueChange={(value) => handleInputChange("movie", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select movie" />
                  </SelectTrigger>
                  <SelectContent>
                    {movies.map((movie) => (
                      <SelectItem key={movie} value={movie}>{movie}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Theater */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Theater *
                </label>
                <Select value={showtimeData.theater} onValueChange={(value) => handleInputChange("theater", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select theater" />
                  </SelectTrigger>
                  <SelectContent>
                    {theaters.map((theater) => (
                      <SelectItem key={theater} value={theater}>{theater}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Date *
                </label>
                <Input
                  type="date"
                  value={showtimeData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  required
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Time *
                </label>
                <Input
                  type="time"
                  value={showtimeData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  required
                />
              </div>

              {/* Seats Available */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Seats Available *
                </label>
                <Input
                  type="number"
                  value={showtimeData.seatsAvailable}
                  onChange={(e) => handleInputChange("seatsAvailable", e.target.value)}
                  placeholder="e.g., 50"
                  required
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Status
                </label>
                <Select value={showtimeData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Sold Out">Sold Out</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-accent text-background">
                Add Showtime
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};