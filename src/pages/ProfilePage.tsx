import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Calendar, MapPin, Edit3, Trash2 } from "lucide-react";
import { fetchWithAuth } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const ProfilePage = () => {
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [user, setUser] = useState({ name: "", email: "", profileUrl: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchWithAuth("/auth/me");
        if (response.ok) {
          const data = await response.json();
          setUser(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
    const fetchBookings = async () => {
      try {
        const response = await fetchWithAuth("/auth/me/bookings");
        if (response.ok) {
          const data = await response.json();
          setUpcomingBookings(data.data.upcoming);
          setCompletedBookings(data.data.completed);
        }
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      }
    };
    fetchUser();
    fetchBookings();
  }, []);


  const handleCancelBooking = (bookingId) => {
    // Implement booking cancellation logic here
  };

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
                {upcomingBookings.map((booking) => (
                  <Card key={booking.id} className="bg-card/50 border-border/50 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{booking.movieTitle}</h3>
                        <div className="flex items-center gap-4 text-muted-foreground mt-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{booking.showtimeDate} at {booking.showtimeTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{booking.theaterName}</span>
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
                          {booking.seats.split(',').map((seat) => (
                            <Badge key={seat} variant="outline" className="text-white border-white/20">
                              {seat}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Food & Beverage</p>
                        <div className="mt-1">
                          <span className="text-sm text-muted-foreground">No food items</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border/50">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Total Amount</span>
                        <span className="text-lg font-semibold text-accent">${booking.totalAmount}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4">Booking History</h2>
                {completedBookings.map((booking) => (
                  <Card key={booking.id} className="bg-card/50 border-border/50 p-6 opacity-80">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-white">{booking.movieTitle}</h3>
                      <div className="flex items-center gap-4 text-muted-foreground mt-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{booking.showtimeDate} at {booking.showtimeTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{booking.theaterName}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-1">
                        {booking.seats.split(',').map((seat) => (
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
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={user.profileUrl} />
                    <AvatarFallback>
                      <User className="w-8 h-8 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold text-white">{user.name}</h2>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Name</label>
                    <input
                      type="text"
                      value={user.name}
                      className="w-full px-3 py-2 bg-background/50 border border-border/50 rounded-md text-white"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Email</label>
                    <input
                      type="email"
                      value={user.email}
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