import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fetchWithAuth } from "@/lib/api";

export const EditFoodPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [foodData, setFood] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    allergens: "",
    available: ""
  });

  // Fetch food by ID from backend
  useEffect(() => {
    fetchWithAuth(`/food`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((f) => f.id === Number(id));
        if (found) setFood(found);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleInputChange = (field: string, value: string) => {
    setFood(prev => ({ ...prev, [field]: value }));
  };
    
    const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchWithAuth(`/food/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(foodData),
    })
      .then((res) => res.json())
      .then(() => navigate("/admin/food"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-gradient-primary p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Edit Food Item</h1>
        </div>

        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Food Item Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">Name</Label>
                  <Input
                    id="name"
                    value={foodData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="bg-secondary/50 border-border/50 text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-foreground">Price ($)</Label>
                  <Input
                    id="price"
                    value={foodData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    className="bg-secondary/50 border-border/50 text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-foreground">Category</Label>
                  <Select value={foodData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className="bg-secondary/50 border-border/50 text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Drinks">Drinks</SelectItem>
                      <SelectItem value="Snacks">Snacks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* <div className="space-y-2">
                  <Label htmlFor="availabile" className="text-foreground">Availability</Label>
                  <Select value={foodData.available} onValueChange={(value) => handleInputChange("availabile", value)}>
                    <SelectTrigger className="bg-secondary/50 border-border/50 text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                      <SelectItem value="Discontinued">Discontinued</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
              </div>

              {/* Additional Information */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-foreground">Description</Label>
                  <Textarea
                    id="description"
                    value={foodData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={3}
                    className="bg-secondary/50 border-border/50 text-foreground resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="allergens" className="text-foreground">Allergens</Label>
                  <Input
                    id="allergens"
                    value={foodData.allergens}
                    onChange={(e) => handleInputChange("allergens", e.target.value)}
                    placeholder="Contains dairy, nuts, etc."
                    className="bg-secondary/50 border-border/50 text-foreground"
                  />
                </div>
              </div>

              {/* Food Image Upload */}
              <div className="space-y-4">
                <Label className="text-foreground">Food Image</Label>
                <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-border transition-colors">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">Drop your image here, or browse</p>
                  <p className="text-sm text-muted-foreground">Supports: JPG, PNG (Max 5MB)</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="border-border/50 text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-accent text-background hover:opacity-90"
                >
                  Update Food Item
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};