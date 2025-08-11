import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

type SeatType = 'premium' | 'regular' | 'economy' | 'basic';

interface SeatPricing {
  premium: string;
  regular: string;
  economy: string;
  basic: string;
}

// Mock theater data - in real app this would come from API
const theaterData = {
  "1": { name: "CINEMA 01", location: "J Cineplex (Junction City)" },
  "2": { name: "CINEMA 02", location: "J Cineplex (Junction City)" },
  "3": { name: "CINEMA 03", location: "J Cineplex (Junction City)" },
};

export const TheaterSeatPricingPage = () => {
  const { theaterId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const theater = theaterId ? theaterData[theaterId as keyof typeof theaterData] : null;
  
  const [seatPricing, setSeatPricing] = useState<SeatPricing>({
    premium: "26000",
    regular: "12000",
    economy: "11000",
    basic: "5000"
  });

  // Generate seat layout (14 rows, 12 seats per row)
  const generateSeatLayout = () => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
    const seatsPerRow = 12;
    
    return rows.map(row => {
      const seats = [];
      for (let i = 1; i <= seatsPerRow; i++) {
        let seatType: SeatType;
        // Define seat types based on position
        if (row <= 'B') {
          seatType = 'premium'; // Front premium rows
        } else if (row <= 'F') {
          seatType = 'regular'; // Middle regular rows
        } else if (row <= 'J') {
          seatType = 'economy'; // Economy rows
        } else {
          seatType = 'basic'; // Back basic rows
        }
        
        seats.push({
          id: `${row}${i}`,
          row,
          number: i,
          type: seatType
        });
      }
      return { row, seats };
    });
  };

  const seatLayout = generateSeatLayout();

  const getSeatColor = (seatType: SeatType) => {
    switch (seatType) {
      case 'premium': return 'bg-purple-500 hover:bg-purple-600';
      case 'regular': return 'bg-blue-500 hover:bg-blue-600';
      case 'economy': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'basic': return 'bg-green-500 hover:bg-green-600';
      default: return 'bg-gray-500';
    }
  };

  const handlePriceChange = (seatType: SeatType, value: string) => {
    setSeatPricing(prev => ({
      ...prev,
      [seatType]: value
    }));
  };

  const handleSave = () => {
    // In real app, this would update the theater pricing in database
    toast({
      title: "Pricing Updated",
      description: "Seat pricing has been successfully updated for " + theater?.name,
    });
  };

  if (!theater) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Theater Not Found</h1>
          <Button 
            onClick={() => navigate('/admin')} 
            className="mt-4 bg-gradient-accent hover:shadow-glow"
          >
            Back to Admin
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <ArrowLeft 
            className="w-6 h-6 text-foreground mr-4 cursor-pointer hover:text-primary" 
            onClick={() => navigate('/admin')}
          />
          <div>
            <h1 className="text-2xl font-bold text-foreground">{theater.name} - Seat Pricing</h1>
            <p className="text-muted-foreground">{theater.location}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Seat Layout */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-card/50 border-border/50">
              <h2 className="text-xl font-semibold text-foreground mb-4">Seat Layout</h2>
              
              {/* Screen */}
              <div className="mb-6">
                <div className="w-full h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-t-full mb-2"></div>
                <div className="text-center text-sm text-muted-foreground">SCREEN</div>
              </div>

              {/* Price Legend */}
              <div className="flex flex-wrap gap-4 mb-6 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-500 rounded"></div>
                  <span className="text-sm">Premium - {seatPricing.premium}KS</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-sm">Regular - {seatPricing.regular}KS</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span className="text-sm">Economy - {seatPricing.economy}KS</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm">Basic - {seatPricing.basic}KS</span>
                </div>
              </div>

              {/* Seats */}
              <div className="space-y-2">
                {seatLayout.map(({ row, seats }) => (
                  <div key={row} className="flex items-center justify-center gap-1">
                    <div className="w-6 text-center text-sm font-medium text-foreground">{row}</div>
                    <div className="flex gap-1">
                      {seats.map(seat => (
                        <div
                          key={seat.id}
                          className={`w-6 h-6 rounded cursor-pointer transition-colors ${getSeatColor(seat.type)}`}
                          title={`${seat.id} - ${seat.type} (${seatPricing[seat.type]}KS)`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Pricing Controls */}
          <div className="space-y-6">
            <Card className="p-6 bg-card/50 border-border/50">
              <h2 className="text-xl font-semibold text-foreground mb-4">Update Pricing</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Premium Seats
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-500 rounded"></div>
                    <Input
                      type="number"
                      value={seatPricing.premium}
                      onChange={(e) => handlePriceChange('premium', e.target.value)}
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground">KS</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Regular Seats
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <Input
                      type="number"
                      value={seatPricing.regular}
                      onChange={(e) => handlePriceChange('regular', e.target.value)}
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground">KS</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Economy Seats
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <Input
                      type="number"
                      value={seatPricing.economy}
                      onChange={(e) => handlePriceChange('economy', e.target.value)}
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground">KS</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Basic Seats
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <Input
                      type="number"
                      value={seatPricing.basic}
                      onChange={(e) => handlePriceChange('basic', e.target.value)}
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground">KS</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleSave}
                className="w-full mt-6 bg-gradient-accent hover:shadow-glow"
              >
                Save Pricing Changes
              </Button>
            </Card>

            {/* Theater Info */}
            <Card className="p-6 bg-card/50 border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-3">Theater Info</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Name:</span>
                  <span className="ml-2 text-foreground">{theater.name}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Location:</span>
                  <span className="ml-2 text-foreground">{theater.location}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Layout:</span>
                  <span className="ml-2 text-foreground">14x12 (168 seats)</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant="default" className="ml-2">Active</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};