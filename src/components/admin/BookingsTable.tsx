import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Edit, Trash2, Eye } from "lucide-react";
import { FilterPopover } from "@/components/FilterPopover";

const bookings = [
  { id: 1, bookingId: "BK001", customerName: "John Doe", email: "john.doe@email.com", movie: "Spider-Man: No Way Home", theater: "Theater 1", date: "2024-01-15", time: "14:30", seats: "A1, A2", totalAmount: 25.98, status: "Confirmed", paymentStatus: "Paid" },
  { id: 2, bookingId: "BK002", customerName: "Jane Smith", email: "jane.smith@email.com", movie: "The Batman", theater: "Theater 2", date: "2024-01-15", time: "17:00", seats: "B5, B6, B7", totalAmount: 44.97, status: "Confirmed", paymentStatus: "Paid" },
  { id: 3, bookingId: "BK003", customerName: "Mike Johnson", email: "mike.j@email.com", movie: "Top Gun: Maverick", theater: "Theater 3", date: "2024-01-15", time: "19:30", seats: "C10", totalAmount: 15.99, status: "Cancelled", paymentStatus: "Paid" },
  { id: 4, bookingId: "BK004", customerName: "Sarah Wilson", email: "sarah.w@email.com", movie: "Doctor Strange 2", theater: "Theater 1", date: "2024-01-16", time: "16:00", seats: "D3, D4", totalAmount: 27.98, status: "Confirmed", paymentStatus: "Paid" }
];

const StatusBadge = ({ status }) => {
  const variants = {
    Confirmed: "bg-green-500/20 text-green-400 border-green-500/30",
    Cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
  };
  return <Badge className={`${variants[status]} border`}>{status}</Badge>;
};

const PaymentStatusBadge = ({ status }) => {
  return <Badge className="bg-green-500/20 text-green-400 border-green-500/30 border">{status}</Badge>;
};

export const BookingsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string[]>>({ status: [] });
  const itemsPerPage = 12;

  const filteredBookings = bookings
    .filter((b) =>
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.movie.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((b) => filters.status.length === 0 || filters.status.includes(b.status));

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const filterSections = [
    { title: "By Booking Status", stateKey: "status", options: ["Confirmed", "Cancelled"] },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Bookings</h1>
      </div>

      <Card className="glass-card p-4">
        <div className="flex items-center justify-between space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search Bookings..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 bg-secondary/50 border-border/50" />
          </div>
          <FilterPopover filterSections={filterSections} selectedFilters={filters} onFilterChange={setFilters} />
        </div>
      </Card>

      <Card className="glass-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 text-muted-foreground font-medium"><input type="checkbox" className="w-4 h-4 rounded border-border bg-secondary" /></th>
                <th className="text-left p-4 text-muted-foreground font-medium">Booking ID ↕</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Customer</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Movie</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Date & Time</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Seats</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Amount</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Status</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Payment</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b) => (
                <tr key={b.id} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                  <td className="p-4"><input type="checkbox" className="w-4 h-4 rounded border-border bg-secondary" /></td>
                  <td className="p-4 font-medium text-foreground">{b.bookingId}</td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-foreground">{b.customerName}</div>
                      <div className="text-sm text-muted-foreground">{b.email}</div>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{b.movie}</td>
                  <td className="p-4 text-muted-foreground">
                    <div>{b.date}</div>
                    <div className="text-sm">{b.time}</div>
                  </td>
                  <td className="p-4 text-muted-foreground">{b.seats}</td>
                  <td className="p-4 text-foreground font-medium">${b.totalAmount}</td>
                  <td className="p-4"><StatusBadge status={b.status} /></td>
                  <td className="p-4"><PaymentStatusBadge status={b.paymentStatus} /></td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-4 border-t border-border/50">
          <div className="text-sm text-muted-foreground">Rows per page: {itemsPerPage} | 1-{filteredBookings.length} of {bookings.length}</div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="text-muted-foreground">←</Button>
            <Button variant="ghost" size="icon" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="text-muted-foreground">→</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
