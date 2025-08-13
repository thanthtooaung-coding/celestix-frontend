import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const MovieGenreTable = () => {
    const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://47.130.149.164:8081/api/v1/movie-genres")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch genres");
        return res.json();
      })
      .then((data) => {
        setGenres(data);
      })
      .catch((err) => {
        console.error("Error fetching genres:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredGenres = genres.filter((genre) =>
    genre.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Movie Genres</h1>
        <Button
            className="bg-gradient-accent hover:shadow-glow"
            onClick={() => navigate("/add-movie-genre")}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Genre
        </Button>
      </div>

      <Card className="glass-card p-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search Genres..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-secondary/50 border-border/50"
          />
        </div>
      </Card>

      <Card className="glass-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 text-muted-foreground font-medium">Genre Name</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Description</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGenres.map((genre) => (
                <tr key={genre.id} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                  <td className="p-4 font-medium text-foreground">{genre.name}</td>
                  <td className="p-4 text-muted-foreground">{genre.description}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};