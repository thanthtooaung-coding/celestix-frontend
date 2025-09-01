import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FoodComboCard } from "@/components/movies/FoodComboCard";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { fetchWithAuth } from "@/lib/api";

export const FoodComboPage = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const [combos, setCombos] = useState([]);

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity === 0) {
      const newCart = { ...cart };
      delete newCart[id];
      setCart(newCart);
    } else {
      setCart({ ...cart, [id]: quantity });
    }
  };

  // const getTotalPrice = () => {
  //   return Object.entries(cart).reduce((total, [id, quantity]) => {
  //     const combo = combos.find((c) => c.id === id);
  //     return total + (combo ? combo.price * quantity : 0);
  //   }, 0);
  // };

  const getTotalPrice = () => {
    // Sum for combos
    const comboTotal = Object.entries(cart).reduce((total, [id, quantity]) => {
      const combo = combos.find((c) => c.id === id);
      return total + (combo ? combo.price * quantity : 0);
    }, 0);

    // Sum for individual foods
    const foodTotal = Object.entries(cart).reduce((total, [id, quantity]) => {
      const food = foods.find((f) => f.id.toString() === id);
      return total + (food ? food.price * quantity : 0);
    }, 0);

    return comboTotal + foodTotal;
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  useEffect(() => {
    setLoading(true); // start loading

    Promise.all([
      fetchWithAuth("/food").then((res) => res.json()),
      fetchWithAuth("/food/combos").then((res) => res.json()),
    ])
      .then(([foodData, comboData]) => {
        setFoods(foodData);

        const mapped = comboData.map((c) => ({
          id: c.id.toString(),
          name: c.comboName,
          image: c.image || "https://via.placeholder.com/150",
          price: c.comboPrice,
          items: c.foods.map((f) => f.name),
        }));
        setCombos(mapped);
      })
      .catch((err) => console.error("Failed to fetch data:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-cinema flex items-center justify-center">
        <p className="text-white text-lg">Loading menu...</p>
      </div>
    );
  }

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
                      {getTotalPrice()} Ks
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
            {combos.map((combo) => (
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

          {/* Food Items Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Individual Items
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {foods.map((food) => (
                <Card
                  key={food.id}
                  className="bg-card/50 border-border/50 p-4 hover:border-primary/50 transition-colors relative"
                >
                  {/* Image */}
                  <img
                    src={food.image || "https://via.placeholder.com/150"}
                    alt={food.name}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <h3 className="font-semibold text-white mb-2">{food.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {food.description || "No description"}
                  </p>
                  {food.allergens && (
                    <p className="text-xs text-red-400 mb-1">
                      ⚠ Allergens: {food.allergens}
                    </p>
                  )}
                  <p
                    className={`text-xs mb-2 ${
                      food.available === "available"
                        ? "text-green-400"
                        : "text-gray-400"
                    }`}
                  >
                    {food.available}
                  </p>
                  <div className="flex justify-between items-center">
                    <Badge className="bg-primary text-primary-foreground">
                      {food.price} Ks
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        disabled={(cart[food.id] || 0) === 0}
                        onClick={() => {
                          const currentQty = cart[food.id] || 0;
                          if (currentQty > 0) {
                            handleQuantityChange(food.id, currentQty - 1);
                          }
                        }}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>

                      <span className="text-white min-w-[20px] text-center">
                        {cart[food.id] || 0}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() =>
                          handleQuantityChange(
                            food.id,
                            (cart[food.id] || 0) + 1
                          )
                        }
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Badge for quantity */}
                  {cart[food.id] && (
                    <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground min-w-[24px] h-6 rounded-full flex items-center justify-center">
                      {cart[food.id]}
                    </Badge>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
