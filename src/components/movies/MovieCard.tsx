import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Calendar } from "lucide-react";

interface MovieCardProps {
  movie: {
    id: string;
    title: string;
    image: string;
    duration: string;
    rating: number;
    genre: string;
    releaseDate: string;
    ageRating: string;
  };
  onBookTicket?: (movieId: string) => void;
  onViewDetails?: (movieId: string) => void;
}

export const MovieCard = ({ movie, onBookTicket, onViewDetails }: MovieCardProps) => {
  const handleWatchTrailer = () => {
    // Direct YouTube trailer links based on movie title
    const trailerLinks: { [key: string]: string } = {
      "Spider-Man: No Way Home": "https://www.youtube.com/watch?v=JfVOs4VSpmA",
      "The Batman": "https://www.youtube.com/watch?v=mqqft2x_Aa4",
      "Top Gun: Maverick": "https://www.youtube.com/watch?v=qSqVVswa420",
      "Doctor Strange 2": "https://www.youtube.com/watch?v=aWzlQ2N6qqg"
    };
    
    const trailerUrl = trailerLinks[movie.title] || `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' trailer')}`;
    window.open(trailerUrl, '_blank');
  };

  return (
    <Card className="group relative overflow-hidden bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-movie">
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="space-y-2 w-full px-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onViewDetails?.(movie.id)}
              className="w-full"
            >
              View Details
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleWatchTrailer}
              className="w-full text-white border-white/20 hover:bg-white/10"
            >
              🎬 Watch Trailer
            </Button>
            <Button
              className="w-full bg-gradient-accent hover:shadow-glow"
              size="sm"
              onClick={() => onBookTicket?.(movie.id)}
            >
              Book Ticket
            </Button>
          </div>
        </div>

        {/* Age Rating Badge */}
        <Badge 
          className="absolute top-2 left-2 bg-primary text-primary-foreground"
        >
          {movie.ageRating}
        </Badge>

        {/* Rating */}
        <div className="absolute top-2 right-2 flex items-center space-x-1 bg-black/80 rounded px-2 py-1">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span className="text-xs text-white font-medium">{movie.rating}</span>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4 space-y-3">
        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1">
          {movie.title}
        </h3>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{movie.duration}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{movie.releaseDate}</span>
          </div>
        </div>

        <Badge variant="outline" className="text-xs">
          {movie.genre}
        </Badge>
      </div>
    </Card>
  );
};