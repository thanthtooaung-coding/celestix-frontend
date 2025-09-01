import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { fetchWithAuth } from "@/lib/api";


export const AddFoodPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [foodData, setFoodData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    allergens: "",
    availability: "Available",
  });

  const handleInputChange = (field: string, value: string) => {
    setFoodData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send POST request to Spring Boot backend
    await fetchWithAuth("/food", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: foodData.name,
        price: foodData.price,
        category: foodData.category,
        description: foodData.description,
        allergens: foodData.allergens,
        available: foodData.availability,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        toast({
          title: "Food Item Added",
          description: "New food item has been successfully added.",
        });
        navigate('/admin/food'); // go back to main page
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: "Error",
          description: "Failed to add food item.",
        });
      });
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
          <h1 className="text-2xl font-bold text-foreground">
            Add New Food Item
          </h1>
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
                <Select
                  value={foodData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Drinks">Drinks</SelectItem>
                    <SelectItem value="Snacks">Snacks</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Availability */}
              {/* <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Availability
                </label>
                <Select
                  value={foodData.availability}
                  onValueChange={(value) =>
                    handleInputChange("availability", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Out of Stock">Out-of-Stock</SelectItem>
                    <SelectItem value="Seasonal">Seasonal</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
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
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Enter food item description"
                rows={4}
              />
            </div>

            {/* Food Image Upload */}
            <div className="space-y-4">
              <Label className="text-foreground">Food Image</Label>
              <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-border transition-colors">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">
                  Drop your image here, or browse
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports: JPG, PNG (Max 5MB)
                </p>
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
              <Button
                type="submit"
                className="bg-gradient-accent text-background"
              >
                Add Food Item
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
