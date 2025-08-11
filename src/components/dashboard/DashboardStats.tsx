import { Card } from "@/components/ui/card";
import { Users, Film, Calendar, ShoppingCart, Shield } from "lucide-react";

const stats = [
  {
    label: "TOTAL USERS",
    value: "12.25k",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    label: "TOTAL CINEMAS",
    value: "123",
    icon: Film,
    color: "bg-purple-500",
  },
  {
    label: "TOTAL MOVIES",
    value: "2.41k",
    icon: Calendar,
    color: "bg-pink-500",
  },
  {
    label: "TOTAL ADMIN",
    value: "15",
    icon: Shield,
    color: "bg-green-500",
  },
  {
    label: "TOTAL RESERVATION",
    value: "2.48k",
    icon: ShoppingCart,
    color: "bg-orange-500",
  },
];

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="glass-card p-6 hover:shadow-glow transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
            <div className={`w-14 h-14 rounded-full ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-7 h-7 text-white" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};