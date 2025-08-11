import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const AddFoodPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [foodData, setFoodData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    allergens: "",
    availability: "Available"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save to database
    toast({
      title: "Food Item Added",
      description: "New food item has been successfully added.",
    });
    navigate(-1);
  };

  const handleInputChange = (field: string, value: string) => {
    setFoodData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <ArrowLeft 
            className="w-6 h-6 text-foreground mr-4 cursor-pointer" 
            onClick={() => navigate(-1)}
          />
          <h1 className="text-2xl font-bold text-foreground">Add New Food Item</h1>
        </div>

        <Card className="p-6 bg-card/50 border-border/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Food Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Food Name *
                </label>
                <Input
                  value={foodData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter food item name"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Price *
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={foodData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category *
                </label>
                <Select value={foodData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Snacks">Snacks</SelectItem>
                    <SelectItem value="Drinks">Drinks</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Desserts">Desserts</SelectItem>
                    <SelectItem value="Combos">Combos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Availability
                </label>
                <Select value={foodData.availability} onValueChange={(value) => handleInputChange("availability", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                    <SelectItem value="Seasonal">Seasonal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Allergens */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Allergens
              </label>
              <Input
                value={foodData.allergens}
                onChange={(e) => handleInputChange("allergens", e.target.value)}
                placeholder="e.g., Contains nuts, dairy, gluten"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <Textarea
                value={foodData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Enter food item description"
                rows={4}
              />
            </div>

            {/* Food Image Upload */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Food Image
              </label>
              <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, GIF up to 10MB
                </p>
                <input type="file" className="hidden" accept="image/*" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-accent text-background">
                Add Food Item
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};