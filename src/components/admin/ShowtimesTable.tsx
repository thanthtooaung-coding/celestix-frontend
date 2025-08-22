import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { FilterPopover } from "@/components/FilterPopover";
import { fetchWithAuth } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

const StatusBadge = ({ status } : { status: string }) => {
  const variants : { [key: string]: string } = {
    Available: "bg-green-500/20 text-green-400 border-green-500/30",
    "Sold Out": "bg-red-500/20 text-red-400 border-red-500/30",
  };
  return <Badge className={`${variants[status]} border`}>{status}</Badge>;
};

export const ShowtimesTable = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string[]>>({
    status: [],
  });
  const [showtimes, setShowtimes] = useState<any[]>([]);
  const itemsPerPage = 12;

  const fetchShowtimes = async () => {
    try {
      const response = await fetchWithAuth("/showtimes");
      if (response.ok) {
        const data = await response.json();
        setShowtimes(data.data);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch showtimes.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while fetching showtimes.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchShowtimes();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetchWithAuth(`/showtimes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Showtime Deleted",
          description: "Showtime has been successfully deleted.",
        });
        fetchShowtimes();
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.message || "Failed to delete showtime.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while deleting the showtime.",
        variant: "destructive",
      });
    }
  };

  const filteredShowtimes = showtimes
    .filter(
      (showtime) =>
        showtime.movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        showtime.theater.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (showtime) =>
        filters.status.length === 0 || filters.status.includes(showtime.status)
    );

  const totalPages = Math.ceil(filteredShowtimes.length / itemsPerPage);

  const filterSections = [
    { title: "By Status", stateKey: "status", options: ["Available", "Sold Out"] },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Showtimes</h1>
        <Button
          className="bg-gradient-accent hover:shadow-glow transition-all duration-300"
          onClick={() => navigate("/admin/showtimes/add")}
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
                  Movie ↕
                </th>
                <th className="text-left p-4 text-muted-foreground font-medium">
                  Theater
                </th>
                <th className="text-left p-4 text-muted-foreground font-medium">
                  Date
                </th>
                <th className="text-left p-4 text-muted-foreground font-medium">
                  Time
                </th>
                <th className="text-left p-4 text-muted-foreground font-medium">
                  Seats Available
                </th>
                <th className="text-left p-4 text-muted-foreground font-medium">
                  Status
                </th>
                <th className="text-left p-4 text-muted-foreground font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredShowtimes.map((showtime) => (
                <tr
                  key={showtime.id}
                  className="border-b border-border/30 hover:bg-secondary/30 transition-colors"
                >
                  <td className="p-4 font-medium text-foreground">
                    {showtime.movie.title}
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {showtime.theater.name}
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {showtime.showtimeDate}
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {`${showtime.showtimeTime}`}
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {showtime.seatsAvailable}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={showtime.status} />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() =>
                          navigate(`/admin/showtimes/edit/${showtime.id}`)
                        }
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => handleDelete(showtime.id)}
                      >
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
            Rows per page: {itemsPerPage} | 1-{filteredShowtimes.length} of{" "}
            {showtimes.length}
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
