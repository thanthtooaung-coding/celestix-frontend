import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const EditShowtimePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data - in real app, this would fetch based on ID
  const [showtimeData, setShowtimeData] = useState({
    movie: "inception",
    theater: "theater-1",
    date: "2024-01-15",
    time: "19:30",
    seatsAvailable: "120",
    status: "available"
  });

  // Mock data for movies and theaters
  const movies = [
    { id: "inception", title: "Inception" },
    { id: "avatar", title: "Avatar: The Way of Water" },
    { id: "top-gun", title: "Top Gun: Maverick" },
    { id: "dune", title: "Dune: Part Two" }
  ];

  const theaters = [
    { id: "theater-1", name: "Theater 1 - Premium Hall" },
    { id: "theater-2", name: "Theater 2 - Standard Hall" },
    { id: "theater-3", name: "Theater 3 - IMAX" },
    { id: "theater-4", name: "Theater 4 - VIP Experience" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Showtime Updated",
      description: "Showtime has been successfully updated.",
    });
    navigate(-1);
  };

  const handleInputChange = (field: string, value: string) => {
    setShowtimeData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-primary p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Edit Showtime</h1>
        </div>

        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Showtime Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="movie" className="text-foreground">Movie</Label>
                  <Select value={showtimeData.movie} onValueChange={(value) => handleInputChange("movie", value)}>
                    <SelectTrigger className="bg-secondary/50 border-border/50 text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {movies.map((movie) => (
                        <SelectItem key={movie.id} value={movie.id}>
                          {movie.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="theater" className="text-foreground">Theater</Label>
                  <Select value={showtimeData.theater} onValueChange={(value) => handleInputChange("theater", value)}>
                    <SelectTrigger className="bg-secondary/50 border-border/50 text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {theaters.map((theater) => (
                        <SelectItem key={theater.id} value={theater.id}>
                          {theater.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-foreground">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={showtimeData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="bg-secondary/50 border-border/50 text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-foreground">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={showtimeData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    className="bg-secondary/50 border-border/50 text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seatsAvailable" className="text-foreground">Seats Available</Label>
                  <Input
                    id="seatsAvailable"
                    value={showtimeData.seatsAvailable}
                    onChange={(e) => handleInputChange("seatsAvailable", e.target.value)}
                    className="bg-secondary/50 border-border/50 text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-foreground">Status</Label>
                  <Select value={showtimeData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger className="bg-secondary/50 border-border/50 text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="sold-out">Sold Out</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="border-border/50 text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-accent text-background hover:opacity-90"
                >
                  Update Showtime
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};