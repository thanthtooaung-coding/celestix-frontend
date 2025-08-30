import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fetchWithAuth } from "@/lib/api";

export const EditShowtimePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [showtimeData, setShowtimeData] = useState({
    movieId: "",
    theaterId: "",
    showtimeDate: "",
    showtimeTime: "",
    seatsAvailable: "",
    status: "",
  });
  const [templateData, setTemplateData] = useState({
    movies: [],
    theaters: [],
    statusOptions: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // First, fetch the template data for the dropdowns
        const templateResponse = await fetchWithAuth("/showtimes/template");
        if (!templateResponse.ok) {
          throw new Error("Failed to fetch template data.");
        }
        const templateJson = await templateResponse.json();
        setTemplateData(templateJson.data);

        // THEN, fetch the specific showtime data
        const showtimeResponse = await fetchWithAuth(`/showtimes/${id}`);
        if (!showtimeResponse.ok) {
          throw new Error("Failed to fetch showtime data.");
        }
        const showtimeJson = await showtimeResponse.json();
        const showtime = showtimeJson.data;
        
        setShowtimeData({
          movieId: showtime.movie.id.toString(),
          theaterId: showtime.theater.id.toString(),
          showtimeDate: showtime.showtimeDate,
          showtimeTime: showtime.showtimeTime.slice(0, 5), // Format to HH:mm
          seatsAvailable: showtime.seatsAvailable.toString(),
          status: showtime.status,
        });

      } catch (error) {
        toast({
          title: "Error",
          description: error.message || "An error occurred while fetching data.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that minutes are in 10-minute increments
    const [, minutes] = showtimeData.showtimeTime.split(":").map(Number);
    if (minutes % 10 !== 0) {
      toast({
        title: "Invalid Time",
        description: "Showtime must be in 10-minute increments (e.g., 10:00, 10:10, 10:20).",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      ...showtimeData,
      showtimeTime: `${showtimeData.showtimeTime}:00`, // Ensure seconds are included for backend
      seatsAvailable: parseInt(showtimeData.seatsAvailable),
    };

    try {
      const response = await fetchWithAuth(`/showtimes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast({
          title: "Showtime Updated",
          description: "Showtime has been successfully updated.",
        });
        navigate(-1);
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.message || "Failed to update showtime.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating the showtime.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setShowtimeData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-primary p-6 flex justify-center items-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

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
            <CardTitle className="text-foreground">
              Showtime Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="movie" className="text-foreground">
                    Movie
                  </Label>
                  <Select
                    value={showtimeData.movieId}
                    onValueChange={(value) => handleInputChange("movieId", value)}
                  >
                    <SelectTrigger className="bg-secondary/50 border-border/50 text-foreground">
                      <SelectValue placeholder="Select a movie" />
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
                <div className="space-y-2">
                  <Label htmlFor="theater" className="text-foreground">
                    Theater
                  </Label>
                  <Select
                    value={showtimeData.theaterId}
                    onValueChange={(value) =>
                      handleInputChange("theaterId", value)
                    }
                  >
                    <SelectTrigger className="bg-secondary/50 border-border/50 text-foreground">
                      <SelectValue placeholder="Select a theater" />
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
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-foreground">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={showtimeData.showtimeDate}
                    min={new Date().toISOString().split("T")[0]}                    
                    onChange={(e) =>
                      handleInputChange("showtimeDate", e.target.value)
                    }
                    className="bg-secondary/50 border-border/50 text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-foreground">
                    Time
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    step="600" // 10 minutes in seconds
                    value={showtimeData.showtimeTime}
                    onChange={(e) =>
                      handleInputChange("showtimeTime", e.target.value)
                    }
                    className="bg-secondary/50 border-border/50 text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seatsAvailable" className="text-foreground">
                    Seats Available
                  </Label>
                  <Input
                    id="seatsAvailable"
                    type="number"
                    value={showtimeData.seatsAvailable}
                    readOnly
                    className="bg-muted/50 border-border/50 text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-foreground">
                    Status
                  </Label>
                  <Select
                    value={showtimeData.status}
                    onValueChange={(value) => handleInputChange("status", value)}
                  >
                    <SelectTrigger className="bg-secondary/50 border-border/50 text-foreground">
                      <SelectValue placeholder="Select a status" />
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
