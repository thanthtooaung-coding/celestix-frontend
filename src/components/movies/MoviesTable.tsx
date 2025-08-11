import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { FilterPopover } from "@/components/FilterPopover";

const movies = [
  { id: 1, title: "Candyman", duration: "134 minutes", releaseDate: "Wed Aug 25 2021", rating: 3, genre: "Horror", status: "Playing", poster: "🍬" },
  { id: 2, title: "Chaos Walking", duration: "109 minutes", releaseDate: "Wed Feb 24 2021", rating: 3, genre: "Sci-Fi", status: "Playing", poster: "🚶" },
  { id: 3, title: "Everybody's Talking About Jamie", duration: "111 minutes", releaseDate: "Fri Sep 10 2021", rating: 0, genre: "Musical", status: "Upcoming", poster: "🎭" },
  { id: 4, title: "Free Guy", duration: "115 minutes", releaseDate: "Wed Aug 11 2021", rating: 4, genre: "Action", status: "Playing", poster: "🎮" },
  { id: 5, title: "Hitman's Wife's Bodyguard", duration: "109 minutes", releaseDate: "Mon Jun 14 2021", rating: 4, genre: "Action", status: "Playing", poster: "🔫" },
  { id: 6, title: "House of Gucci", duration: "118 minutes", releaseDate: "Wed Nov 24 2021", rating: 0, genre: "Drama", status: "Upcoming", poster: "👑" },
  { id: 7, title: "Jolt", duration: "107 minutes", releaseDate: "Thu Jul 15 2021", rating: 3, genre: "Thriller", status: "Playing", poster: "⚡" },
  { id: 8, title: "No Time to Die", duration: "163 minutes", releaseDate: "Thu Sep 30 2021", rating: 0, genre: "Action", status: "Upcoming", poster: "🕴️" },
];

const StarRating = ({ rating }) => (
  <div className="flex space-x-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <span key={star} className={`text-lg ${star <= rating ? "text-yellow-400" : "text-gray-600"}`}>★</span>
    ))}
  </div>
);

const StatusBadge = ({ status }) => {
  const variants = {
    Playing: "bg-green-500/20 text-green-400 border-green-500/30",
    Upcoming: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  };
  return <Badge className={`${variants[status]} border`}>{status}</Badge>;
};

export const MoviesTable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string[]>>({ genre: [] });
  const itemsPerPage = 12;

  const filterSections = [
    {
      title: "By Genre",
      stateKey: "genre",
      options: ["Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Mystery", "Romance", "Sci-Fi", "Thriller", "War", "Western"],
    },
  ];

  const filteredMovies = movies
    .filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((movie) => filters.genre.length === 0 || filters.genre.includes(movie.genre));

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Movies</h1>
        <Button className="bg-gradient-accent hover:shadow-glow transition-all duration-300" onClick={() => navigate("/add-movie")}> <Plus className="w-4 h-4 mr-2" /> New Movie </Button>
      </div>

      <Card className="glass-card p-4">
        <div className="flex items-center justify-between space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search Movie..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 bg-secondary/50 border-border/50" />
          </div>
          <FilterPopover filterSections={filterSections} selectedFilters={filters} onFilterChange={setFilters} />
        </div>
      </Card>

      <Card className="glass-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 text-muted-foreground font-medium"><input type="checkbox" className="w-4 h-4 rounded border-border bg-secondary" /></th>
                <th className="text-left p-4 text-muted-foreground font-medium">Title ↕</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Duration</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Release Date</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Rating</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Genre</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Status</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies.map((movie) => (
                <tr key={movie.id} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                  <td className="p-4"><input type="checkbox" className="w-4 h-4 rounded border-border bg-secondary" /></td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-2xl">{movie.poster}</div>
                      <span className="font-medium text-foreground">{movie.title}</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{movie.duration}</td>
                  <td className="p-4 text-muted-foreground">{movie.releaseDate}</td>
                  <td className="p-4"><StarRating rating={movie.rating} /></td>
                  <td className="p-4 text-muted-foreground">{movie.genre}</td>
                  <td className="p-4"><StatusBadge status={movie.status} /></td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={() => navigate(`/edit-movie/${movie.id}`)}><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-4 border-t border-border/50">
          <div className="text-sm text-muted-foreground">Rows per page: {itemsPerPage} | 1-12 of {filteredMovies.length}</div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)} className="text-muted-foreground">←</Button>
            <Button variant="ghost" size="icon" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)} className="text-muted-foreground">→</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
