import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Plus, Search, Filter, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const theaterSchema = z.object({
  name: z.string().min(1, "Theater name is required"),
  location: z.string().min(1, "Location is required"),
  seatConfig: z.string().min(1, "Seat configuration is required"),
  seatPricing: z.object({
    premium: z.string().min(1, "Premium price is required"),
    regular: z.string().min(1, "Regular price is required"),
    economy: z.string().min(1, "Economy price is required"),
    basic: z.string().min(1, "Basic price is required"),
  }),
  capacity: z.string().min(1, "Capacity is required"),
  facilities: z.array(z.string()),
});

type Theater = {
  id: string;
  name: string;
  location: string;
  seatConfig: string;
  seatPricing: {
    premium: string;
    regular: string;
    economy: string;
    basic: string;
  };
  capacity: number;
  facilities: string[];
  status: "Active" | "Maintenance" | "Inactive";
};

export const TheatersTable = () => {
  const navigate = useNavigate();
  const [theaters, setTheaters] = useState<Theater[]>([
    {
      id: "1",
      name: "CINEMA 01",
      location: "J Cineplex (Junction City)",
      seatConfig: "14x12 Layout",
      seatPricing: {
        premium: "26000KS",
        regular: "12000KS",
        economy: "11000KS",
        basic: "5000KS"
      },
      capacity: 168,
      facilities: ["2D", "3D", "IMAX"],
      status: "Active"
    },
    {
      id: "2",
      name: "CINEMA 02",
      location: "J Cineplex (Junction City)",
      seatConfig: "14x12 Layout",
      seatPricing: {
        premium: "26000KS",
        regular: "12000KS",
        economy: "11000KS",
        basic: "5000KS"
      },
      capacity: 168,
      facilities: ["2D", "3D"],
      status: "Active"
    },
    {
      id: "3",
      name: "CINEMA 03",
      location: "J Cineplex (Junction City)",
      seatConfig: "14x12 Layout",
      seatPricing: {
        premium: "26000KS",
        regular: "12000KS",
        economy: "11000KS",
        basic: "5000KS"
      },
      capacity: 168,
      facilities: ["2D"],
      status: "Active"
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTheater, setEditingTheater] = useState<Theater | null>(null);

  const form = useForm<z.infer<typeof theaterSchema>>({
    resolver: zodResolver(theaterSchema),
    defaultValues: {
      name: "",
      location: "",
      seatConfig: "",
      seatPricing: {
        premium: "",
        regular: "",
        economy: "",
        basic: ""
      },
      capacity: "",
      facilities: [],
    },
  });

  const filteredTheaters = theaters.filter(theater => {
    const matchesSearch = theater.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         theater.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || theater.status === statusFilter;
    const matchesLocation = locationFilter === "all" || theater.location === locationFilter;
    
    return matchesSearch && matchesStatus && matchesLocation;
  });

  const onSubmit = (values: z.infer<typeof theaterSchema>) => {
    if (editingTheater) {
      setTheaters(prev => prev.map(theater => 
        theater.id === editingTheater.id 
          ? { 
              ...theater, 
              name: values.name,
              location: values.location,
              seatConfig: values.seatConfig,
              seatPricing: {
                premium: values.seatPricing.premium,
                regular: values.seatPricing.regular,
                economy: values.seatPricing.economy,
                basic: values.seatPricing.basic
              },
              capacity: parseInt(values.capacity),
              facilities: values.facilities 
            }
          : theater
      ));
      setEditingTheater(null);
    } else {
      const newTheater: Theater = {
        id: Date.now().toString(),
        name: values.name,
        location: values.location,
        seatConfig: values.seatConfig,
        seatPricing: {
          premium: values.seatPricing.premium,
          regular: values.seatPricing.regular,
          economy: values.seatPricing.economy,
          basic: values.seatPricing.basic
        },
        capacity: parseInt(values.capacity),
        facilities: values.facilities,
        status: "Active"
      };
      setTheaters(prev => [...prev, newTheater]);
    }
    
    form.reset();
    setIsAddDialogOpen(false);
  };

  const handleEdit = (theater: Theater) => {
    setEditingTheater(theater);
    form.reset({
      name: theater.name,
      location: theater.location,
      seatConfig: theater.seatConfig,
      seatPricing: theater.seatPricing,
      capacity: theater.capacity.toString(),
      facilities: theater.facilities,
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setTheaters(prev => prev.filter(theater => theater.id !== id));
  };

  const uniqueLocations = Array.from(new Set(theaters.map(theater => theater.location)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Theater Management</h1>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-accent hover:shadow-glow">
              <Plus className="w-4 h-4 mr-2" />
              Add Theater
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingTheater ? "Edit Theater" : "Add New Theater"}</DialogTitle>
              <DialogDescription>
                {editingTheater ? "Update theater information and seat pricing." : "Add a new theater with seat configuration and pricing."}
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Theater Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., CINEMA 01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., J Cineplex (Junction City)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="seatConfig"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seat Configuration</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 14x12 Layout" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacity</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 168" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Seat Pricing</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="seatPricing.premium"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Premium Seats</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 26000KS" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="seatPricing.regular"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Regular Seats</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 12000KS" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="seatPricing.economy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Economy Seats</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 11000KS" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="seatPricing.basic"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Basic Seats</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 5000KS" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsAddDialogOpen(false);
                      setEditingTheater(null);
                      form.reset();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-gradient-accent hover:shadow-glow">
                    {editingTheater ? "Update Theater" : "Add Theater"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="p-6 bg-card/50 border-border/50">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="text-sm font-medium text-foreground mb-2 block">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search theaters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="min-w-[150px]">
            <label className="text-sm font-medium text-foreground mb-2 block">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="min-w-[200px]">
            <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {uniqueLocations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
         
        </div>
      </Card>

      {/* Theaters Table */}
      <Card className="bg-card/50 border-border/50">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50">
              <TableHead className="text-foreground">Theater</TableHead>
              <TableHead className="text-foreground">Location</TableHead>
              <TableHead className="text-foreground">Configuration</TableHead>
              <TableHead className="text-foreground">Seat Pricing</TableHead>
              <TableHead className="text-foreground">Capacity</TableHead>
              <TableHead className="text-foreground">Facilities</TableHead>
              <TableHead className="text-foreground">Status</TableHead>
              <TableHead className="text-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTheaters.map((theater) => (
              <TableRow key={theater.id} className="border-border/50">
                <TableCell className="text-foreground font-medium">{theater.name}</TableCell>
                <TableCell className="text-muted-foreground">{theater.location}</TableCell>
                <TableCell className="text-muted-foreground">{theater.seatConfig}</TableCell>
                <TableCell>
                  <div className="space-y-1 text-xs">
                    <div>Premium: {theater.seatPricing.premium}</div>
                    <div>Regular: {theater.seatPricing.regular}</div>
                    <div>Economy: {theater.seatPricing.economy}</div>
                    <div>Basic: {theater.seatPricing.basic}</div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{theater.capacity}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {theater.facilities.map((facility) => (
                      <Badge key={facility} variant="secondary" className="text-xs">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={theater.status === "Active" ? "default" : theater.status === "Maintenance" ? "secondary" : "destructive"}
                  >
                    {theater.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/admin/theater/${theater.id}/pricing`)}
                      className="hover:bg-primary/10"
                      title="Manage Seat Pricing"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(theater.id)}
                      className="hover:bg-destructive/10 text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};