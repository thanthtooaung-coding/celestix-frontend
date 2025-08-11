import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FoodComboCard } from "@/components/movies/FoodComboCard";
import { ShoppingCart, Plus, Minus } from "lucide-react";

export const FoodComboPage = () => {
  const [cart, setCart] = useState<{[key: string]: number}>({});

  const foodCombos = [
    {
      id: "1",
      name: "MiLo Combo",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop",
      price: 14,
      items: ["MiLo Drink", "Small Popcorn", "Candy"]
    },
    {
      id: "2",
      name: "FA Combo",
      image: "https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=200&h=150&fit=crop",
      price: 5,
      items: ["Large Popcorn", "Large Soda"]
    },
    {
      id: "3",
      name: "Tissue Peach Combo",
      image: "https://images.unsplash.com/photo-1562833763-89b80dfc9e5a?w=200&h=150&fit=crop",
      price: 18,
      items: ["Peach Drink", "Nachos", "Chocolate"]
    },
    {
      id: "4",
      name: "Family Combo",
      image: "https://images.unsplash.com/photo-1627662235167-b48e3bf55a9b?w=200&h=150&fit=crop",
      price: 22,
      items: ["2 Large Popcorns", "4 Sodas", "Candy Mix"]
    },
    {
      id: "5",
      name: "Sweet Combo",
      image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=200&h=150&fit=crop",
      price: 20,
      items: ["Ice Cream", "Chocolate Bar", "Juice"]
    },
    {
      id: "6",
      name: "Classic Combo",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop",
      price: 8,
      items: ["Medium Popcorn", "Soda"]
    }
  ];

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity === 0) {
      const newCart = { ...cart };
      delete newCart[id];
      setCart(newCart);
    } else {
      setCart({ ...cart, [id]: quantity });
    }
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [id, quantity]) => {
      const combo = foodCombos.find(c => c.id === id);
      return total + (combo ? combo.price * quantity : 0);
    }, 0);
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-cinema">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Food & Beverage</h1>
            {getTotalItems() > 0 && (
              <Card className="bg-card/50 border-border/50 p-4">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      {getTotalItems()} item(s) in cart
                    </div>
                    <div className="text-lg font-semibold text-white">
                      ${getTotalPrice()}
                    </div>
                  </div>
                  <Button className="bg-gradient-accent hover:shadow-glow ml-4">
                    Checkout
                  </Button>
                </div>
              </Card>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodCombos.map((combo) => (
              <div key={combo.id} className="relative">
                <FoodComboCard
                  combo={combo}
                  quantity={cart[combo.id] || 0}
                  onQuantityChange={handleQuantityChange}
                />
                {cart[combo.id] && (
                  <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground min-w-[24px] h-6 rounded-full flex items-center justify-center">
                    {cart[combo.id]}
                  </Badge>
                )}
              </div>
            ))}
          </div>

          {/* Popular Items Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Individual Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: "Large Popcorn", price: 8, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop" },
                { name: "Large Soda", price: 5, image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=150&h=150&fit=crop" },
                { name: "Nachos", price: 6, image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=150&h=150&fit=crop" },
                { name: "Ice Cream", price: 4, image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=150&h=150&fit=crop" },
                { name: "Candy", price: 3, image: "https://images.unsplash.com/photo-1575481831880-8d36d32e7c89?w=150&h=150&fit=crop" },
                { name: "Hot Dog", price: 7, image: "https://images.unsplash.com/photo-1612392062798-2dd0c1c2c5fa?w=150&h=150&fit=crop" },
                { name: "Coffee", price: 4, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=150&h=150&fit=crop" },
                { name: "Water", price: 2, image: "https://images.unsplash.com/photo-1559839914-17aae04f7861?w=150&h=150&fit=crop" }
              ].map((item, index) => (
                <Card key={index} className="bg-card/50 border-border/50 p-4 hover:border-primary/50 transition-colors">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <h3 className="font-semibold text-white mb-2">{item.name}</h3>
                  <div className="flex justify-between items-center">
                    <Badge className="bg-primary text-primary-foreground">
                      ${item.price}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-white min-w-[20px] text-center">0</span>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};