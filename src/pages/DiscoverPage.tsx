import { useState } from "react";
import { MovieCard } from "@/components/movies/MovieCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";

interface DiscoverPageProps {
  onPageChange: (page: string, movieId?: string) => void;
  isAuthenticated: boolean;
}

export const DiscoverPage = ({ onPageChange, isAuthenticated }: DiscoverPageProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const genres = [
    "ACTION", "ADVENTURE", "ANIMATION", "COMEDY", "CRIME",
    "DOCUMENTARY", "DRAMA", "FAMILY", "FANTASY", "HISTORY",
    "HORROR", "MUSIC", "MYSTERY", "ROMANCE", "SCI-FI",
    "THRILLER", "WAR", "WESTERN"
  ];

  const movies = [
    {
      id: "1",
      title: "The Green Knight",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFbyCAAY8Hw6RFlIi1RYPTZdvvQuA_SB1u_ZPj7VJQFNHwrrvZiAp1LetLgsWXkPb-HaCcWU6NUtscgzjGDrse4A",
      duration: "127 minutes",
      rating: 7.2,
      genre: "Fantasy",
      releaseDate: "Thursday, July 29, 2021",
      ageRating: "C18"
    },
    {
      id: "2",
      title: "Shang-Chi and the Legend of the Ten Rings",
      image: "/lovable-uploads/shang-chi.jpg",
      duration: "132 minutes",
      rating: 7.4,
      genre: "Action",
      releaseDate: "Monday, August 2, 2021",
      ageRating: "C18"
    },
    {
      id: "3",
      title: "The Suicide Squad",
      image: "/lovable-uploads/suicide-squad.jpg",
      duration: "115 minutes",
      rating: 7.2,
      genre: "Action",
      releaseDate: "Wednesday, July 28, 2021",
      ageRating: "C18"
    },
    {
      id: "4",
      title: "House of Gucci",
      image: "/lovable-uploads/house-gucci.jpg",
      duration: "118 minutes",
      rating: 6.8,
      genre: "Drama",
      releaseDate: "Friday, November 26, 2021",
      ageRating: "C13"
    }
  ];

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(movie.genre.toUpperCase());
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-gradient-cinema">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">SEARCH MOVIE</h1>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-secondary/50 border-border/50 text-foreground"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="bg-card/50 border border-border/50 rounded-lg p-6 sticky top-24">
              <div className="flex items-center space-x-2 mb-6">
                <span className="text-sm font-medium text-foreground">🔽</span>
                <h3 className="text-lg font-bold text-foreground">SEARCH FILTER</h3>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">GENRES</h4>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {genres.map((genre) => (
                    <div key={genre} className="flex items-center space-x-2">
                      <Checkbox
                        id={genre}
                        checked={selectedGenres.includes(genre)}
                        onCheckedChange={() => handleGenreToggle(genre)}
                      />
                      <label
                        htmlFor={genre}
                        className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                      >
                        {genre}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Movie Results */}
          <div className="lg:col-span-3">
            {/* Search Results */}
            <div className="mb-6">
              {searchQuery && (
                <div className="space-y-4">
                  {filteredMovies.slice(0, 3).map((movie) => (
                    <div key={movie.id} className="bg-card/50 border border-border/50 rounded-lg p-4 hover:border-primary/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <img
                          src={movie.image}
                          alt={movie.title}
                          className="w-16 h-24 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                              movie.ageRating === 'C18' ? 'bg-red-600 text-white' : 'bg-orange-600 text-white'
                            }`}>
                              {movie.ageRating}
                            </span>
                            <h3 className="font-bold text-foreground">{movie.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">{movie.duration}</p>
                          <p className="text-sm text-success">{movie.releaseDate}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Featured Movie */}
            <div className="mb-8">
              <div className="relative rounded-lg overflow-hidden bg-card/50 border border-border/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  <div>
                    <img
                      src="/lovable-uploads/featured-movie.jpg"
                      alt="Featured Movie"
                      className="w-full h-64 object-cover rounded"
                    />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">The Green Knight</h2>
                    <p className="text-muted-foreground">
                      An epic fantasy adventure based on the timeless Arthurian legend, The Green Knight tells the story of Sir Gawain, King Arthur's reckless and headstrong nephew, who embarks on a daring quest to confront the eponymous Green Knight, a gigantic emerald-skinned stranger and tester of men.
                    </p>
                    <div className="flex items-center space-x-4">
                      <Button variant="outline" className="flex items-center space-x-2">
                        <span>❤️</span>
                        <span>Like</span>
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => window.open('https://www.youtube.com/watch?v=JfVOs4VSpmA', '_blank')}
                      >
                        🎬 Watch Trailer
                      </Button>
                      <Button 
                        className="bg-gradient-accent hover:shadow-glow"
                        onClick={() => onPageChange("booking", "1")}
                      >
                        BOOK TICKET
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Movie Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onBookTicket={(id) => onPageChange("booking", id)}
                  onViewDetails={(id) => onPageChange("details", id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};