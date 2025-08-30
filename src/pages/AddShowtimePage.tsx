import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { fetchWithAuth } from "@/lib/api";

export const AddShowtimePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showtimeData, setShowtimeData] = useState({
    movieId: "",
    theaterId: "",
    showtimeDate: "",
    showtimeTime: "",
    seatsAvailable: "",
    status: "Available",
  });
  const [templateData, setTemplateData] = useState({
    movies: [],
    theaters: [],
    statusOptions: [],
  });

  // Effect to fetch initial template data for dropdowns
  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const response = await fetchWithAuth("/showtimes/template");
        if (response.ok) {
          const data = await response.json();
          setTemplateData(data.data);
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch template data.",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while fetching template data.",
          variant: "destructive",
        });
      }
    };
    fetchTemplateData();
  }, [toast]);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Prepare the payload for the API
    const payload = {
      ...showtimeData,
      // Ensure seatsAvailable is an integer
      seatsAvailable: parseInt(showtimeData.seatsAvailable),
    };

    try {
      const response = await fetchWithAuth("/showtimes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast({
          title: "Showtime Added",
          description: "New showtime has been successfully added.",
        });
        navigate(-1);
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.message || "Failed to add showtime.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while adding the showtime.",
        variant: "destructive",
      });
    }
  };

  // Generic input change handler
  const handleInputChange = (field: string, value: string) => {
    setShowtimeData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    const [, minutes] = time.split(':').map(Number);

    if (minutes % 10 !== 0) {
      e.target.setCustomValidity("Time must be in 10-minute increments.");
    } else {
      e.target.setCustomValidity("");
    }
    handleInputChange("showtimeTime", time);
  };

  // Specific handler for theater selection change
  const handleTheaterChange = async (theaterId: string) => {
    // First, update the theaterId in the state
    handleInputChange("theaterId", theaterId);

    // If a theater is selected, fetch its details to get the capacity
    if (theaterId) {
      try {
        const response = await fetchWithAuth(`/theaters/${theaterId}`);
        if (response.ok) {
          const result = await response.json();
          const capacity = result.data.seatConfiguration.row * result.data.seatConfiguration.column;
          // Update the seatsAvailable field with the fetched capacity
          handleInputChange("seatsAvailable", capacity.toString());
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch theater capacity.",
            variant: "destructive",
          });
          // Clear seats available if the fetch fails
          handleInputChange("seatsAvailable", "");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while fetching theater details.",
          variant: "destructive",
        });
        handleInputChange("seatsAvailable", "");
      }
    } else {
      // If no theater is selected (e.g., cleared), clear the seats available input
      handleInputChange("seatsAvailable", "");
    }
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
          <h1 className="text-2xl font-bold text-foreground">
            Add New Showtime
          </h1>
        </div>

        <Card className="p-6 bg-card/50 border-border/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Movie */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Movie *
                </label>
                <Select
                  value={showtimeData.movieId}
                  onValueChange={(value) => handleInputChange("movieId", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select movie" />
                  </SelectTrigger>
                  <SelectContent>
                    {templateData.movies.map((movie: any) => (
                      <SelectItem key={movie.id} value={movie.id.toString()}>
                        {movie.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Theater */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Theater *
                </label>
                <Select
                  value={showtimeData.theaterId}
                  onValueChange={handleTheaterChange} // Use the new specific handler
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select theater" />
                  </SelectTrigger>
                  <SelectContent>
                    {templateData.theaters.map((theater: any) => (
                      <SelectItem key={theater.id} value={theater.id.toString()}>
                        {theater.name}
                      </SelectItem>
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
                  value={showtimeData.showtimeDate}
                  min={new Date().toISOString().split("T")[0]} // Prevents past dates
                  onChange={(e) =>
                    handleInputChange("showtimeDate", e.target.value)
                  }
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
                  value={showtimeData.showtimeTime}
                  onChange={handleTimeChange}
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
                  onChange={(e) =>
                    handleInputChange("seatsAvailable", e.target.value)
                  }
                  placeholder="Auto-filled from theater"
                  required
                  readOnly // Prevents manual editing
                  className="bg-muted/50" // Style to indicate it's read-only
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Status
                </label>
                <Select
                  value={showtimeData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {templateData.statusOptions.map((status: any) => (
                      <SelectItem key={status.id} value={status.name}>
                        {status.name}
                      </SelectItem>
                    ))}
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
              <Button
                type="submit"
                className="bg-gradient-accent text-background"
              >
                Add Showtime
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
