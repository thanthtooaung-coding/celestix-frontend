import { useEffect, useState } from "react";
import { MovieCard } from "@/components/movies/MovieCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "@/lib/api";

interface HomePageProps {
  isAuthenticated?: boolean;
}

export const HomePage = ({ isAuthenticated }: HomePageProps) => {
  const [selectedCategory, setSelectedCategory] = useState("Now Showing");
  const navigate = useNavigate();
  const [movies, setMovies] = useState<any[]>([]);
  const [schedules, setSchedules] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetchApi(`/public/movies?status=${selectedCategory.replace('now-playing', 'Now Showing').replace('coming-soon', 'Coming Soon')}`);
        if (response.ok) {
          const data = await response.json();
          setMovies(data.data);
        } else {
          console.error("Failed to fetch movies");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await fetchApi("/public/showtimes/grouped");
        if (response.ok) {
          const data = await response.json();
          setSchedules(data.data);
        } else {
          console.error("Failed to fetch schedules");
        }
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchSchedules();
  }, []);


  const handleBookTicket = (movieId: string) => {
    const isAuth = localStorage.getItem("token") !== null;
    if (isAuth) {
      navigate(`/booking/${movieId}`);
    } else {
      navigate("/login");
    }
  };

  const formatTime = (timeString: string) => {
    const [hour, minute] = timeString.split(':');
    const hourNum = parseInt(hour, 10);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const formattedHour = hourNum % 12 || 12;
    return `${formattedHour}:${minute} ${ampm}`;
  };

  const categories = [
    { id: "Now Showing", label: "Now Playing" },
    { id: "Coming Soon", label: "Coming Soon" }
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
                onClick={() => handleBookTicket(featuredMovie.id)}
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
                    setSelectedCategory(category.id);
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
                movie={{
                  ...movie,
                  image: movie.moviePosterUrl,
                  genre: movie.genres.map((g: any) => g.name).join(', '),
                  ageRating: movie.rating
                }}
                onBookTicket={handleBookTicket}
                onViewDetails={(id) => navigate(`/movies/${id}`)}
              />
            ))}
          </div>
        </section>

        {/* Showtimes Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Showtime Schedules</h2>
          <div className="space-y-4">
          {schedules.map((schedule, index) =>
              schedule.theaters.map((theater: any, theaterIndex: number) => (
                <div key={`${index}-${theaterIndex}`} className="bg-card/50 border border-border/50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{theater.theater.name}</h3>
                      <p className="text-sm text-muted-foreground">{schedule.movie.title}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {theater.showtimes.map((showtime: any, timeIndex: number) => (
                        <Button
                          key={timeIndex}
                          variant="outline"
                          size="sm"
                          onClick={() => handleBookTicket(schedule.movie.id)}
                        >
                          {formatTime(showtime.showtimeTime)}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};