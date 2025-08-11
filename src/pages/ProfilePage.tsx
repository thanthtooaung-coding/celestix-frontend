import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Calendar, MapPin, Edit3, Trash2 } from "lucide-react";

export const ProfilePage = () => {
  const [bookings, setBookings] = useState([
    {
      id: "1",
      movie: "The Suicide Squad",
      date: "2024-01-15",
      time: "18:30",
      seats: ["D5", "D6", "D7"],
      cinema: "CGV Hung Vuong",
      room: "Room 2D 1",
      price: 30,
      status: "upcoming",
      foodItems: [
        { name: "FA Combo", quantity: 2, price: 10 }
      ]
    },
    {
      id: "2",
      movie: "Black Widow",
      date: "2024-01-10",
      time: "20:00",
      seats: ["E8", "E9"],
      cinema: "CGV Landmark",
      room: "Room IMAX",
      price: 25,
      status: "completed",
      foodItems: []
    }
  ]);

  const handleCancelBooking = (bookingId: string) => {
    setBookings(bookings.filter(booking => booking.id !== bookingId));
  };

 // const handleEditBooking = (bookingId: string) => {
    // This would open an edit modal in a real app
    //console.log("Edit booking:", bookingId);
  //};

  return (
    <div className="min-h-screen bg-gradient-cinema">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">My Profile</h1>

          <Tabs defaultValue="bookings" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-card/50 border-border/50">
              <TabsTrigger value="bookings" className="text-white data-[state=active]:bg-primary">
                Bookings
              </TabsTrigger>
              <TabsTrigger value="history" className="text-white data-[state=active]:bg-primary">
                History
              </TabsTrigger>
              <TabsTrigger value="profile" className="text-white data-[state=active]:bg-primary">
                Profile Info
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="mt-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4">Upcoming Bookings</h2>
                {bookings.filter(booking => booking.status === "upcoming").map((booking) => (
                  <Card key={booking.id} className="bg-card/50 border-border/50 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{booking.movie}</h3>
                        <div className="flex items-center gap-4 text-muted-foreground mt-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{booking.date} at {booking.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{booking.cinema} - {booking.room}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Seats</p>
                        <div className="flex gap-1 mt-1">
                          {booking.seats.map((seat) => (
                            <Badge key={seat} variant="outline" className="text-white border-white/20">
                              {seat}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Food & Beverage</p>
                        <div className="mt-1">
                          {booking.foodItems.length > 0 ? (
                            booking.foodItems.map((item, index) => (
                              <div key={index} className="text-sm text-white">
                                {item.quantity}x {item.name} - ${item.price}
                              </div>
                            ))
                          ) : (
                            <span className="text-sm text-muted-foreground">No food items</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Total Amount</span>
                        <span className="text-lg font-semibold text-accent">${booking.price}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4">Booking History</h2>
                {bookings.filter(booking => booking.status === "completed").map((booking) => (
                  <Card key={booking.id} className="bg-card/50 border-border/50 p-6 opacity-80">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-white">{booking.movie}</h3>
                      <div className="flex items-center gap-4 text-muted-foreground mt-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{booking.date} at {booking.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{booking.cinema} - {booking.room}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1">
                        {booking.seats.map((seat) => (
                          <Badge key={seat} variant="outline" className="text-white border-white/20">
                            {seat}
                          </Badge>
                        ))}
                      </div>
                      <Badge className="bg-green-600 text-white">Completed</Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="profile" className="mt-6">
              <Card className="bg-card/50 border-border/50 p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">John Doe</h2>
                    <p className="text-muted-foreground">john.doe@example.com</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Name</label>
                    <input
                      type="text"
                      value="John Doe"
                      className="w-full px-3 py-2 bg-background/50 border border-border/50 rounded-md text-white"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Email</label>
                    <input
                      type="email"
                      value="john.doe@example.com"
                      className="w-full px-3 py-2 bg-background/50 border border-border/50 rounded-md text-white"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Phone</label>
                    <input
                      type="tel"
                      value="+1 (555) 123-4567"
                      className="w-full px-3 py-2 bg-background/50 border border-border/50 rounded-md text-white"
                      readOnly
                    />
                  </div>
                </div>
                
                <Button 
                  className="mt-6 bg-gradient-accent hover:shadow-glow"
                  onClick={() => window.location.href = '/edit-profile'}
                >
                  Edit Profile
                </Button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};