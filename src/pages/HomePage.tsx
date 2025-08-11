import { useState } from "react";
import { MovieCard } from "@/components/movies/MovieCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Calendar, Clock } from "lucide-react";

interface HomePageProps {
  onPageChange: (page: string, movieId?: string) => void;
  isAuthenticated?: boolean;
}

export const HomePage = ({ onPageChange, isAuthenticated }: HomePageProps) => {
  const [selectedCategory, setSelectedCategory] = useState("now-playing");

  const categories = [
    { id: "now-playing", label: "Now Playing" },
    { id: "coming-soon", label: "Coming Soon" }
  ];

  const featuredMovie = {
    id: "1",
    title: "Black Widow",
    description: "Natasha Romanoff confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises.",
    image: "/lovable-uploads/movie-hero.jpg",
    duration: "134 minutes",
    rating: 8.5,
    genres: ["Action", "Adventure", "Sci-Fi"],
    releaseDate: "2021",
    trailer: "#"
  };

  const movies = [
    {
      id: "1",
      title: "Spider-Man: No Way Home",
      image: "/lovable-uploads/spiderman.jpg",
      duration: "148 min",
      rating: 8.4,
      genre: "Action",
      releaseDate: "Dec 17, 2021",
      ageRating: "PG-13"
    },
    {
      id: "2", 
      title: "The Batman",
      image: "/lovable-uploads/batman.jpg",
      duration: "176 min",
      rating: 7.8,
      genre: "Action",
      releaseDate: "Mar 4, 2022",
      ageRating: "PG-13"
    },
    {
      id: "3",
      title: "Top Gun: Maverick",
      image: "/lovable-uploads/topgun.jpg", 
      duration: "130 min",
      rating: 8.3,
      genre: "Action",
      releaseDate: "May 27, 2022",
      ageRating: "PG-13"
    },
    {
      id: "4",
      title: "Doctor Strange 2",
      image: "/lovable-uploads/strange.jpg",
      duration: "126 min", 
      rating: 6.9,
      genre: "Action",
      releaseDate: "May 6, 2022",
      ageRating: "PG-13"
    }
  ];

  const schedules = [
    { cinema: "CGV Hung Vuong", times: ["18:30", "20:25"], movie: "The Suicide Squad" },
    { cinema: "Lotte Cinema", times: ["19:00", "21:30"], movie: "Black Widow" },
    { cinema: "Galaxy Cinema", times: ["17:45", "20:00"], movie: "Fast & Furious 9" }
  ];

  const news = [
    {
      id: "1",
      title: "Marvel Announces Phase 5 Movies",
      excerpt: "Disney reveals the next phase of Marvel Cinematic Universe with exciting new projects...",
      image: "/lovable-uploads/news1.jpg",
      date: "2 hours ago"
    },
    {
      id: "2", 
      title: "Oscar 2024 Nominations",
      excerpt: "The Academy announces this year's nominees for the biggest night in cinema...",
      image: "/lovable-uploads/news2.jpg",
      date: "1 day ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-cinema">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/lovable-uploads/hero-bg.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl space-y-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                {featuredMovie.genres.map((genre) => (
                  <Badge key={genre} variant="secondary">{genre}</Badge>
                ))}
              </div>
              <h1 className="text-5xl font-bold text-foreground">{featuredMovie.title}</h1>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              {featuredMovie.description}
            </p>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{featuredMovie.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{featuredMovie.releaseDate}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                size="lg" 
                className="bg-gradient-accent hover:shadow-glow"
                onClick={() => window.open('https://www.youtube.com/watch?v=nt86yKkdeLU', '_blank')}
              >
                <Play className="w-5 h-5 mr-2" />
                🎬 Watch Trailer
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => onPageChange("booking", featuredMovie.id)}
              >
                Book Tickets
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Movies Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Movies</h2>
            <div className="flex space-x-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "ghost"}
                  onClick={() => {
                    if (category.id === "coming-soon") {
                      onPageChange("coming-soon");
                    } else {
                      setSelectedCategory(category.id);
                    }
                  }}
                  className={selectedCategory === category.id ? "bg-primary" : ""}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onBookTicket={(id) => onPageChange("booking", id)}
                onViewDetails={(id) => onPageChange("details", id)}
              />
            ))}
          </div>
        </section>

        {/* Showtimes Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Showtime Schedules</h2>
          <div className="space-y-4">
            {schedules.map((schedule, index) => (
              <div key={index} className="bg-card/50 border border-border/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{schedule.cinema}</h3>
                    <p className="text-sm text-muted-foreground">{schedule.movie}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {schedule.times.map((time) => (
                      <Button 
                        key={time} 
                        variant="outline" 
                        size="sm"
                        onClick={() => onPageChange("booking", "1")}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};