import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { FilterPopover } from "@/components/FilterPopover";

const showtimes = [
  { id: 1, movie: "Spider-Man: No Way Home", theater: "Theater 1", date: "2024-01-15", time: "14:30", price: 12.99, status: "Available", seatsAvailable: 45 },
  { id: 2, movie: "The Batman", theater: "Theater 2", date: "2024-01-15", time: "17:00", price: 14.99, status: "Available", seatsAvailable: 32 },
  { id: 3, movie: "Top Gun: Maverick", theater: "Theater 3", date: "2024-01-15", time: "19:30", price: 15.99, status: "Sold Out", seatsAvailable: 0 },
  { id: 4, movie: "Doctor Strange 2", theater: "Theater 1", date: "2024-01-16", time: "16:00", price: 13.99, status: "Available", seatsAvailable: 28 }
];

const StatusBadge = ({ status }) => {
  const variants = {
    Available: "bg-green-500/20 text-green-400 border-green-500/30",
    "Sold Out": "bg-red-500/20 text-red-400 border-red-500/30"
  };
  return <Badge className={`${variants[status]} border`}>{status}</Badge>;
};

export const ShowtimesTable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string[]>>({ status: [] });
  const itemsPerPage = 12;

  const filteredShowtimes = showtimes
    .filter(showtime =>
      showtime.movie.toLowerCase().includes(searchTerm.toLowerCase()) ||
      showtime.theater.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(showtime =>
      filters.status.length === 0 || filters.status.includes(showtime.status)
    );

  const totalPages = Math.ceil(filteredShowtimes.length / itemsPerPage);

  const filterSections = [
    { title: "By Status", stateKey: "status", options: ["Available", "Sold Out"] }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Showtimes</h1>
        <Button
          className="bg-gradient-accent hover:shadow-glow transition-all duration-300"
          onClick={() => navigate("/add-showtime")}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Showtime
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="glass-card p-4">
        <div className="flex items-center justify-between space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search Showtimes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-secondary/50 border-border/50"
            />
          </div>
          <FilterPopover
            filterSections={filterSections}
            selectedFilters={filters}
            onFilterChange={setFilters}
          />
        </div>
      </Card>

      {/* Showtimes Table */}
      <Card className="glass-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 text-muted-foreground font-medium">
                  <input type="checkbox" className="w-4 h-4 rounded border-border bg-secondary" />
                </th>
                <th className="text-left p-4 text-muted-foreground font-medium">Movie ↕</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Theater</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Date</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Time</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Price</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Seats Available</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Status</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredShowtimes.map((showtime) => (
                <tr key={showtime.id} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                  <td className="p-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-border bg-secondary" />
                  </td>
                  <td className="p-4 font-medium text-foreground">{showtime.movie}</td>
                  <td className="p-4 text-muted-foreground">{showtime.theater}</td>
                  <td className="p-4 text-muted-foreground">{showtime.date}</td>
                  <td className="p-4 text-muted-foreground">{showtime.time}</td>
                  <td className="p-4 text-foreground font-medium">${showtime.price}</td>
                  <td className="p-4 text-muted-foreground">{showtime.seatsAvailable}</td>
                  <td className="p-4">
                    <StatusBadge status={showtime.status} />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() => navigate(`/edit-showtime/${showtime.id}`)}
                      >
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

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border/50">
          <div className="text-sm text-muted-foreground">
            Rows per page: {itemsPerPage} | 1-{filteredShowtimes.length} of {showtimes.length}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="text-muted-foreground"
            >
              ←
            </Button>
            <Button
              variant="ghost"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="text-muted-foreground"
            >
              →
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
