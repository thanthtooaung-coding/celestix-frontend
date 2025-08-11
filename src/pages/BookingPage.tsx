import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ArrowLeft } from "lucide-react";

interface BookingPageProps {
  movieId?: string | null;
  onBack?: () => void;
}

export const BookingPage = ({ movieId, onBack }: BookingPageProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"cinema" | "seats">("cinema");
  const [selectedCinema, setSelectedCinema] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("01");
  const [selectedShowtime, setSelectedShowtime] = useState<string>("");
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [foodCombos, setFoodCombos] = useState<Record<string, number>>({});

  // Static movie & UI data
  const movie = {
    title: "Horror Express (Sub: English)",
    duration: "1h 31m",
    genre: "Horror",
    cinema: "J Cineplex (Junction City)",
    image: "/lovable-uploads/horror-express.jpg",
  };
  const dates = [
    { date: "31", day: "Thu" },
    { date: "01", day: "Fri" },
    { date: "02", day: "Sat" },
  ];
  const cinemas = [
    { name: "CINEMA 02", showtimes: [{ time: "15:00", type: "2D" }] },
    { name: "CINEMA 03", showtimes: [{ time: "10:50", type: "2D" }] },
  ];
  const seatPricing = [
    { price: "5000KS", color: "bg-blue-200" },
    { price: "11000KS", color: "bg-green-200" },
    { price: "12000KS", color: "bg-yellow-200" },
    { price: "26000KS", color: "bg-purple-200" },
  ];
  const combos = [
    {
      id: "milo-combo",
      name: "MiLo Combo",
      image: "/lovable-uploads/milo-combo.jpg",
      price: 14,
      items: ["MiLo Drink", "Popcorn", "Snacks"],
    },
    {
      id: "fa-combo",
      name: "FA Combo",
      image: "/lovable-uploads/fa-combo.jpg",
      price: 5,
      items: ["Drink", "Large Popcorn"],
    },
    {
      id: "tissue-combo",
      name: "Tissue Peach Combo",
      image: "/lovable-uploads/tissue-combo.jpg",
      price: 18,
      items: ["Peach Drink", "Tissues", "Snacks"],
    },
  ];

  // Helpers for seats
  const seatRows = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M"];
  const seatNumbers = Array.from({ length: 14 }, (_, i) => i + 1);
  const getSeatPrice = (row: string) => {
    if (["A", "B"].includes(row)) return "26000KS";
    if (["C", "D", "E"].includes(row)) return "12000KS";
    if (["F", "G", "H"].includes(row)) return "11000KS";
    return "5000KS";
  };
  const getSeatColor = (row: string) => {
    switch (getSeatPrice(row)) {
      case "26000KS":
        return "bg-purple-200 hover:bg-purple-300";
      case "12000KS":
        return "bg-yellow-200 hover:bg-yellow-300";
      case "11000KS":
        return "bg-green-200 hover:bg-green-300";
      default:
        return "bg-blue-200 hover:bg-blue-300";
    }
  };
  const getSeatStatus = (row: string, num: number) => {
    const id = `${row}${num}`;
    if (selectedSeats.includes(id)) return "selected";
    if (["A1", "A2", "B1", "B2"].includes(id)) return "reserved";
    return "available";
  };
  const handleSeatClick = (row: string, num: number) => {
    const id = `${row}${num}`;
    if (getSeatStatus(row, num) === "reserved") return;
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };
  const getSeatClass = (status: string, row: string) => {
    if (status === "selected") return "bg-primary text-primary-foreground border-2 border-primary";
    if (status === "reserved") return "bg-muted text-muted-foreground cursor-not-allowed";
    return `${getSeatColor(row)} text-foreground border border-border cursor-pointer`;
  };

  // Food combos price
  const totalFoodPrice = Object.entries(foodCombos).reduce((sum, [id, qty]) => {
    const combo = combos.find((c) => c.id === id);
    return sum + (combo ? combo.price * qty : 0);
  }, 0);

  // Seat price in KS
  const seatPrice = selectedSeats.reduce((sum, seat) => {
    const row = seat.charAt(0);
    const priceKS = parseInt(getSeatPrice(row).replace("KS", ""), 10);
    return sum + priceKS;
  }, 0);

  const totalPrice = seatPrice + totalFoodPrice * 1000; // food prices in KS

  // Unified back handler
  const handleBack = () => {
    if (step === "seats") {
      setStep("cinema");
    } else if (onBack) {
      onBack();
    } else {
      navigate("/");
    }
  };

  // --- RENDER ---
  if (step === "cinema") {
    return (
      <div className="min-h-screen bg-gradient-cinema">
        <div className="container mx-auto px-4 py-8 max-w-md">
          {/* Header */}
          <div className="flex items-center mb-6">
            <ArrowLeft className="w-6 h-6 mr-4 cursor-pointer" onClick={handleBack} />
            <h1 className="text-xl font-bold">{movie.cinema}</h1>
          </div>

          {/* Movie Info */}
          <Card className="p-4 mb-6 bg-card/50 border-border/50">
            <div className="flex space-x-4">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-16 h-20 rounded object-cover"
              />
              <div>
                <h2 className="font-bold">{movie.title}</h2>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {movie.duration}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {movie.genre}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{movie.cinema}</p>
              </div>
            </div>
          </Card>

          {/* Date Selection */}
          <div className="mb-6">
            <p className="font-medium mb-4">
              Pick the date you want to checkout for ticket
            </p>
            <div className="flex justify-center space-x-4">
              {dates.map(({ date, day }) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`px-4 py-3 rounded-lg text-center ${
                    selectedDate === date
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  <div className="text-xl font-bold">{date}</div>
                  <div className="text-xs">{day}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Showtime Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <p className="font-medium">Please select the showtime</p>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              {cinemas.map(({ name, showtimes }) => (
                <div key={name}>
                  <h3 className="font-bold mb-2">{name}</h3>
                  <div className="flex space-x-2">
                    {showtimes.map(({ time, type }) => (
                      <button
                        key={`${name}-${time}`}
                        onClick={() => {
                          setSelectedCinema(name);
                          setSelectedShowtime(time);
                        }}
                        className={`px-4 py-2 rounded-lg font-medium ${
                          selectedCinema === name && selectedShowtime === time
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {time} <span className="text-xs ml-1">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <Button
            onClick={() => setStep("seats")}
            disabled={!selectedCinema || !selectedShowtime}
            className="w-full bg-gradient-accent hover:shadow-glow text-lg font-bold py-3"
          >
            Select Seats
          </Button>
        </div>
      </div>
    );
  }

  // -- seats step --
  return (
    <div className="min-h-screen bg-gradient-cinema">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Header */}
        <div className="flex items-center mb-6">
          <ArrowLeft className="w-6 h-6 mr-4 cursor-pointer" onClick={handleBack} />
          <h1 className="text-xl font-bold">{movie.cinema}</h1>
        </div>

        {/* Movie & Showtime Summary */}
        <Card className="p-4 mb-6 bg-card/50 border-border/50">
          <div className="flex space-x-4">
            <img
              src={movie.image}
              alt={movie.title}
              className="w-16 h-20 rounded object-cover"
            />
            <div>
              <h2 className="font-bold">{movie.title}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {movie.duration}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {movie.genre}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedCinema} @ {selectedShowtime}
              </p>
            </div>
          </div>
        </Card>

        {/* Seat Pricing Legend */}
        <div className="flex justify-center space-x-4 mb-4">
          {seatPricing.map(({ price, color }, i) => (
            <div key={i} className="text-center">
              <div className={`w-6 h-6 ${color} rounded border mx-auto mb-1`} />
              <span className="text-xs text-muted-foreground">{price}</span>
            </div>
          ))}
        </div>

        {/* Seats Grid */}
        <Card className="p-4 mb-6 bg-card/50 border-border/50">
          <p className="text-center font-medium mb-4">
            Select the seat which you want to book or buy
          </p>
          <div className="mb-6">
            <p className="text-center text-muted-foreground text-sm mb-2">SCREEN</p>
            <div className="bg-gradient-accent rounded-lg h-2 mb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 rounded-lg" />
            </div>
          </div>

          {seatRows.map((row) => (
            <div key={row} className="flex items-center justify-center space-x-1 mb-1">
              <span className="w-6 text-center text-xs font-bold text-muted-foreground">
                {row}
              </span>
              <div className="flex space-x-1">
                {seatNumbers.map((num) => {
                  const status = getSeatStatus(row, num);
                  return (
                    <button
                      key={`${row}${num}`}
                      onClick={() => handleSeatClick(row, num)}
                      className={`w-6 h-6 rounded text-xs font-bold transition-colors ${
                        getSeatClass(status, row)
                      }`}
                      disabled={status === "reserved"}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </Card>

        {/* Summary & Next */}
        {selectedSeats.length > 0 && (
          <Card className="p-4 mb-6 bg-card/50 border-border/50">
            <h4 className="font-bold mb-2">Checkout Summary</h4>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Selected Seats:</span>
                <span>{selectedSeats.join(", ")}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Price:</span>
                <span className="font-bold">{totalPrice}KS</span>
              </div>
            </div>
          </Card>
        )}

        <Button
          disabled={selectedSeats.length === 0}
          className="w-full bg-gradient-accent hover:shadow-glow text-lg font-bold py-3"
        >
          NEXT
        </Button>
      </div>
    </div>
  );
};
