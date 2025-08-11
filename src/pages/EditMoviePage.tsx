import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const EditMoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data - in real app, this would fetch based on ID
  const [movieData, setMovieData] = useState({
    title: "Inception",
    duration: "148",
    genre: "sci-fi",
    rating: "8.8",
    releaseDate: "2010-07-16",
    language: "english",
    director: "Christopher Nolan",
    status: "playing",
    cast: "Leonardo DiCaprio, Marion Cotillard, Tom Hardy",
    trailerUrl: "https://youtube.com/watch?v=YoHD9XEInc0",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Movie Updated",
      description: "Movie details have been successfully updated.",
    });
    navigate(-1);
  };

  const handleInputChange = (field: string, value: string) => {
    setMovieData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-primary p-6">
      <div className="max-w-4xl mx-auto">
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
          <h1 className="text-2xl font-bold text-foreground">Edit Movie</h1>
        </div>

        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Movie Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-foreground">Title</Label>
                  <Input
                    id="title"
                    value={movieData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="bg-secondary/50 border-border/50 text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-foreground">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    value={movieData.duration}
                    onChange={(e) => handleInputChange("duration", e.target.value)}
                    className="bg-secondary/50 border-border/50 text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="genre" className="text-foreground">Genre</Label>
                  <Select value={movieData.genre} onValueChange={(value) => handleInputChange("genre", value)}>
                    <SelectTrigger className="bg-secondary/50 border-border/50 text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="action">Action</SelectItem>
                      <SelectItem value="comedy">Comedy</SelectItem>
                      <SelectItem value="drama">Drama</SelectItem>
                      <SelectItem value="horror">Horror</SelectItem>
                      <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                      <SelectItem value="romance">Romance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating" className="text-foreground">Rating</Label>
                  <Input
                    id="rating"
                    value={movieData.rating}
                    onChange={(e) => handleInputChange("rating", e.target.value)}
                    className="bg-secondary/50 border-border/50 text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="releaseDate" className="text-foreground">Release Date</Label>
                  <Input
                    id="releaseDate"
                    type="date"
                    value={movieData.releaseDate}
                    onChange={(e) => handleInputChange("releaseDate", e.target.value)}
                    className="bg-secondary/50 border-border/50 text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-foreground">Language</Label>
                  <Select value={movieData.language} onValueChange={(value) => handleInputChange("language", value)}>
                    <SelectTrigger className="bg-secondary/50 border-border/50 text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="mandarin">Mandarin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="director" className="text-foreground">Director</Label>
                  <Input
                    id="director"
                    value={movieData.director}
                    onChange={(e) => handleInputChange("director", e.target.value)}
                    className="bg-secondary/50 border-border/50 text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-foreground">Status</Label>
                  <Select value={movieData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger className="bg-secondary/50 border-border/50 text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="playing">Now Playing</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="ended">Ended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="cast" className="text-foreground">Cast</Label>
                  <Input
                    id="cast"
                    value={movieData.cast}
                    onChange={(e) => handleInputChange("cast", e.target.value)}
                    placeholder="Leonardo DiCaprio, Marion Cotillard, Tom Hardy"
                    className="bg-secondary/50 border-border/50 text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trailerUrl" className="text-foreground">Trailer URL</Label>
                  <Input
                    id="trailerUrl"
                    value={movieData.trailerUrl}
                    onChange={(e) => handleInputChange("trailerUrl", e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="bg-secondary/50 border-border/50 text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-foreground">Description</Label>
                  <Textarea
                    id="description"
                    value={movieData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                    className="bg-secondary/50 border-border/50 text-foreground resize-none"
                  />
                </div>
              </div>

              {/* Movie Poster Upload */}
              <div className="space-y-4">
                <Label className="text-foreground">Movie Poster</Label>
                <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-border transition-colors">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">Drop your poster here, or browse</p>
                  <p className="text-sm text-muted-foreground">Supports: JPG, PNG (Max 10MB)</p>
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
                  Update Movie
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};