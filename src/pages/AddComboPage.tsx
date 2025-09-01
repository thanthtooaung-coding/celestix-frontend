import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
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
import { ArrowLeft, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { fetchWithAuth } from "@/lib/api";

export const AddComboPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [totalPrice, setTotalPrice] = useState(0);

  const [foodData, setFoodData] = useState({
    name: "",
    price: "",
    availability: "Available",
  });

  const [allFoods, setAllFoods] = useState<any[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<{ [key: number]: number }>(
    {}
  );

  // Fetch all foods
  useEffect(() => {
    fetchWithAuth("/food")
      .then((res) => res.json())
      .then((data) => setAllFoods(data))
      .catch((err) => console.error(err));
  }, []);

  const getTotalItems = () =>
    Object.values(selectedFoods).reduce((sum, qty) => sum + qty, 0);

  // Input change
  const handleInputChange = (field: string, value: string) => {
    setFoodData((prev) => ({ ...prev, [field]: value }));
  };

  // Food selection
  const handleQuantityChange = (foodId: number, delta: number) => {
    const currentQty = selectedFoods[foodId] || 0;
    const total = getTotalItems();
    const newQty = currentQty + delta;
    const newTotal = total + delta;

    // Prevent invalid moves
    if (newQty < 0) return; // shouldn't happen because button is disabled, but safe-guard
    if (newTotal > 5) {
      toast({ title: "A combo cannot exceed 5 food items." });
      return;
    }

    // Build updated selection (preserve duplicates). Remove key if qty becomes 0.
    const updatedSelected: { [key: number]: number } = { ...selectedFoods };
    if (newQty > 0) {
      updatedSelected[foodId] = newQty;
    } else {
      // newQty === 0 -> remove the entry
      delete updatedSelected[foodId];
    }

    // Recalculate sum from the updated selection
    const sum = Object.entries(updatedSelected).reduce((acc, [id, qty]) => {
      const food = allFoods.find((f) => f.id === Number(id));
      return acc + (food ? food.price * (qty as number) : 0);
    }, 0);

    // Determine discount using the updated total
    let discountRate = 0;
    switch (newTotal) {
      case 2:
        discountRate = 0.03;
        break;
      case 3:
        discountRate = 0.05;
        break;
      case 4:
        discountRate = 0.08;
        break;
      case 5:
        discountRate = 0.1;
        break;
      default:
        discountRate = 0;
    }

    setSelectedFoods(updatedSelected);
    setTotalPrice(sum * (1 - discountRate));
  };

  // Submit combo
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!foodData.name) {
      toast({ title: "Enter combo name" });
      return;
    }

    const totalItems = getTotalItems();
    const foodIds = Object.entries(selectedFoods).flatMap(([id, qty]) =>
      Array(qty).fill(Number(id))
    );

    if (totalItems < 2) {
      toast({ title: "A combo must have at least 2 food items." });
      return;
    }
    if (totalItems > 5) {
      toast({ title: "A combo cannot exceed 5 food items." });
      return;
    }

    fetchWithAuth(
      `/food/combos?comboName=${encodeURIComponent(
        foodData.name
      )}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(foodIds),
      }
    )
      .then((res) => res.json())
      .then(() => {
        toast({
          title: "Food Combo Added",
          description: "New food combo has been successfully added.",
        });
        navigate(-1); // back to combo list
      })
      .catch((err) => {
        console.error(err);
        toast({ title: "Error", description: "Failed to add combo." });
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
            Add New Food Combo
          </h1>
        </div>

        {/* Food Selection */}
        <Card className="p-6 bg-card/50 border-border/50 mb-6">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Select Food Items
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto">
            {allFoods.map((food) => (
              <div
                key={food.id}
                className="flex items-center justify-between p-2 border rounded"
              >
                <span>
                  {food.name} - {food.price} Ks
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={(selectedFoods[food.id] || 0) === 0}
                    onClick={() => handleQuantityChange(food.id, -1)}
                  >
                    −
                  </Button>
                  <span>{selectedFoods[food.id] || 0}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={getTotalItems() >= 5}
                    onClick={() => handleQuantityChange(food.id, +1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Combo Form */}
        <Card className="p-6 bg-card/50 border-border/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Combo Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Food Combo Name *
                </label>
                <Input
                  value={foodData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter combo name"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Total Price (Ks)
                </label>
                <Input
                  value={totalPrice + " Ks"}
                  readOnly
                  placeholder="Select foods to see total price"
                />
              </div>
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
                Add Food Combo
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
