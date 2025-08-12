import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { FilterPopover } from "@/components/FilterPopover";

const foodItems = [
  { id: 1, name: "Large Popcorn", price: 8.99, category: "Snacks", description: "Classic movie theater popcorn", image: "🍿" },
  { id: 2, name: "Medium Coke", price: 4.50, category: "Drinks", description: "Refreshing cola drink", image: "🥤" },
  { id: 3, name: "Nachos & Cheese", price: 6.99, category: "Snacks", description: "Crispy nachos with cheese sauce", image: "🧀" },
  { id: 4, name: "Hot Dog", price: 5.99, category: "Food", description: "Classic hot dog with mustard", image: "🌭" },
  { id: 5, name: "Candy Mix", price: 3.99, category: "Snacks", description: "Assorted movie theater candy", image: "🍬" }
];

export const FoodTable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string[]>>({ category: [] });
  const itemsPerPage = 12;

  const filteredFood = foodItems
    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(item => filters.category.length === 0 || filters.category.includes(item.category));

  const totalPages = Math.ceil(filteredFood.length / itemsPerPage);

  const filterSections = [
    { title: 'By Category', stateKey: 'category', options: ['Snacks', 'Drinks', 'Food'] }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Food & Beverages</h1>
        <Button 
          className="bg-gradient-accent hover:shadow-glow transition-all duration-300"
          onClick={() => navigate("/add-food")}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Food Item
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="glass-card p-4">
        <div className="flex items-center justify-between space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search Food Items..."
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

      {/* Food Table */}
      <Card className="glass-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">                
                <th className="text-left p-4 text-muted-foreground font-medium">Name ↕</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Price</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Category</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Description</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFood.map((item) => (
                <tr key={item.id} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">                  
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-2xl">
                        {item.image}
                      </div>
                      <span className="font-medium text-foreground">{item.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-foreground font-medium">${item.price}</td>
                  <td className="p-4 text-muted-foreground">{item.category}</td>
                  <td className="p-4 text-muted-foreground">{item.description}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() => navigate(`/edit-food/${item.id}`)}
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
            Rows per page: {itemsPerPage} | 1-{filteredFood.length} of {foodItems.length}
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
