import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Calendar, Play, Heart, Share2 } from "lucide-react";

interface MovieDetailsPageProps {
  movieId: string | null;
  onPageChange: (page: string, movieId?: string) => void;
}

export const MovieDetailsPage = ({ movieId, onPageChange }: MovieDetailsPageProps) => {
  const [isLiked, setIsLiked] = useState(false);

  // Mock movie data - in real app this would come from an API
  const movie = {
    id: "1",
    title: "The Suicide Squad",
    image: "https://images.unsplash.com/photo-1489599904797-75ef9e90338d?w=300&h=450&fit=crop",
    duration: "115 minutes",
    rating: 8.2,
    genre: "Action, Comedy",
    releaseDate: "2021-08-05",
    ageRating: "R",
    description: "Welcome to hell—a.k.a. Belle Reve, the prison with the highest mortality rate in the US. Where the worst Super-Villains are kept and where they will do anything to get out—even join the super-secret, super-shady Task Force X.",
    director: "James Gunn",
    cast: ["Margot Robbie", "Idris Elba", "John Cena", "Joel Kinnaman"],
    trailerUrl: "https://www.youtube.com/watch?v=6B8OKFkUe9A"
  };

  const handleWatchTrailer = () => {
    window.open(movie.trailerUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-cinema">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => onPageChange("home")}
          className="mb-6 text-white hover:bg-white/10"
        >
          ← Back to Home
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden bg-card/50 border-border/50">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover"
              />
            </Card>
          </div>

          {/* Movie Details */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl font-bold text-white">{movie.title}</h1>
                <Badge className="bg-primary text-primary-foreground">
                  {movie.ageRating}
                </Badge>
              </div>

              <div className="flex items-center gap-6 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-white font-semibold">{movie.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{movie.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{movie.releaseDate}</span>
                </div>
              </div>

              <div className="flex gap-3 mb-6">
                <Button 
                  className="bg-gradient-accent hover:shadow-glow"
                  onClick={() => onPageChange("booking", movie.id)}
                >
                  Book Tickets
                </Button>
                <Button 
                  variant="outline" 
                  className="text-white border-white/20 hover:bg-white/10"
                  onClick={handleWatchTrailer}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Watch Trailer
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>                
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Synopsis</h3>
              <p className="text-muted-foreground leading-relaxed">{movie.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Director</h3>
                <p className="text-muted-foreground">{movie.director}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Genre</h3>
                <p className="text-muted-foreground">{movie.genre}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Cast</h3>
              <div className="flex flex-wrap gap-2">
                {movie.cast.map((actor, index) => (
                  <Badge key={index} variant="outline" className="text-white border-white/20">
                    {actor}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};