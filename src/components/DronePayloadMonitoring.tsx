
import { useState } from "react";
import { 
  Plane, 
  Package, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  Battery, 
  Users,
  TrendingUp,
  Calendar,
  Building,
  Phone,
  Search,
  Filter,
  MoreVertical
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Mock data for the dashboard
const mockData = {
  storeInfo: {
    name: "Downtown Dark Store #007",
    id: "DS-007",
    totalOrdersToday: 127
  },
  statusCards: {
    activeDrones: { count: 8, health: "healthy" },
    pendingOrders: { count: 12, alert: false },
    inFlightOrders: { count: 6, avgDeliveryTime: "12 min" },
    deliveredLastHour: { count: 23 },
    returningDrones: { count: 3 },
    maintenanceDrones: { count: 2 }
  },
  drones: [
    { id: "D001", status: "in-flight", position: { lat: 40.7128, lng: -74.0060 }, batteryLevel: 85, payloadId: "O12345", eta: "8 min", customer: "J. Smith - Apt 3B" },
    { id: "D003", status: "returning", position: { lat: 40.7580, lng: -73.9855 }, batteryLevel: 45, payloadId: null, eta: "5 min", customer: null },
    { id: "D007", status: "warning", position: { lat: 40.7831, lng: -73.9712 }, batteryLevel: 25, payloadId: "O67890", eta: "15 min", customer: "M. Johnson - Floor 2" },
    { id: "D002", status: "on-track", position: { lat: 40.7505, lng: -73.9934 }, batteryLevel: 92, payloadId: "O54321", eta: "6 min", customer: "A. Davis - Suite 101" },
    { id: "D005", status: "docking", position: { lat: 40.7614, lng: -73.9776 }, batteryLevel: 78, payloadId: null, eta: "2 min", customer: null }
  ],
  orders: [
    { id: "O12345", customerName: "J. Smith", address: "Apartment 3B", items: "5 items", droneId: "D001", status: "in-flight", eta: "14:10", timeRemaining: "8 min", weight: "2.3 kg", statusIndicator: "green" },
    { id: "O67890", customerName: "M. Johnson", address: "Floor 2", items: "3 items", droneId: "D007", status: "delayed", eta: "14:25", timeRemaining: "15 min", weight: "1.8 kg", statusIndicator: "yellow" },
    { id: "O54321", customerName: "A. Davis", address: "Suite 101", items: "7 items", droneId: "D002", status: "in-flight", eta: "14:08", timeRemaining: "6 min", weight: "3.1 kg", statusIndicator: "green" },
    { id: "O98765", customerName: "S. Wilson", address: "Building C", items: "2 items", droneId: null, status: "pending", eta: "14:30", timeRemaining: "pending", weight: "1.2 kg", statusIndicator: "blue" },
    { id: "O11111", customerName: "R. Brown", address: "Office 204", items: "4 items", droneId: "D005", status: "delivered", eta: "13:45", timeRemaining: "delivered", weight: "2.7 kg", statusIndicator: "green" }
  ],
  alerts: [
    { id: 1, severity: "warning", message: "DRONE D007: Low Battery - Potential Delay", timestamp: "2 min ago" },
    { id: 2, severity: "info", message: "NEW ORDER: #O98765 Ready for Dispatch", timestamp: "3 min ago" },
    { id: 3, severity: "success", message: "DELIVERY CONFIRMED: Order O11111 by Drone D005", timestamp: "5 min ago" },
    { id: 4, severity: "critical", message: "PAYLOAD MISMATCH: Order O67890 Detected Weight Variance", timestamp: "7 min ago" }
  ],
  dockingStations: [
    { id: "DOCK-1", status: "occupied", droneId: "D004", batteryLevel: 95, condition: "charging" },
    { id: "DOCK-2", status: "occupied", droneId: "D006", batteryLevel: 100, condition: "ready" },
    { id: "DOCK-3", status: "empty", droneId: null, batteryLevel: null, condition: "available" },
    { id: "DOCK-4", status: "fault", droneId: null, batteryLevel: null, condition: "maintenance" }
  ]
};

const getCurrentDateTime = () => {
  const now = new Date();
  return {
    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    date: now.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  };
};

const StatusCard = ({ title, value, subtitle, icon: Icon, alertLevel = "normal" }: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  alertLevel?: "normal" | "warning" | "critical";
}) => {
  const getAlertColor = () => {
    switch (alertLevel) {
      case "warning": return "border-yellow-500 bg-yellow-50";
      case "critical": return "border-red-500 bg-red-50";
      default: return "border-border bg-background";
    }
  };

  return (
    <Card className={cn("glass-card", getAlertColor())}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          <Icon className="h-8 w-8 text-primary" />
        </div>
      </CardContent>
    </Card>
  );
};

const DroneIcon = ({ status }: { status: string }) => {
  const getStatusColor = () => {
    switch (status) {
      case "on-track": return "text-green-500";
      case "warning": return "text-yellow-500";
      case "critical": return "text-red-500";
      case "returning": case "docking": return "text-blue-500";
      default: return "text-gray-500";
    }
  };

  return <Plane className={cn("h-4 w-4", getStatusColor())} />;
};

const DronePayloadMonitoring = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const dateTime = getCurrentDateTime();

  const filteredOrders = mockData.orders.filter(order => {
    if (selectedFilter === "all") return true;
    return order.status === selectedFilter;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Zepto Drone Dispatch</h1>
            <p className="text-blue-100">Payload Monitor</p>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{dateTime.time} - {dateTime.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building size={16} />
              <span>{mockData.storeInfo.name} (ID: {mockData.storeInfo.id})</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp size={16} />
              <span>Orders Today: {mockData.storeInfo.totalOrdersToday}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm transition-colors">
            Manual Dispatch
          </button>
          <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm transition-colors">
            Report Issue
          </button>
          <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm transition-colors">
            View All Orders
          </button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatusCard
          title="Active Drones"
          value={mockData.statusCards.activeDrones.count}
          subtitle="Fleet healthy"
          icon={Plane}
        />
        <StatusCard
          title="Pending Pickup"
          value={mockData.statusCards.pendingOrders.count}
          subtitle="Next 15 min"
          icon={Package}
          alertLevel={mockData.statusCards.pendingOrders.count > 10 ? "warning" : "normal"}
        />
        <StatusCard
          title="In-Flight"
          value={mockData.statusCards.inFlightOrders.count}
          subtitle={`Avg: ${mockData.statusCards.inFlightOrders.avgDeliveryTime}`}
          icon={Plane}
        />
        <StatusCard
          title="Delivered"
          value={mockData.statusCards.deliveredLastHour.count}
          subtitle="Last hour"
          icon={Package}
        />
        <StatusCard
          title="Returning"
          value={mockData.statusCards.returningDrones.count}
          subtitle="En route to dock"
          icon={Plane}
        />
        <StatusCard
          title="Maintenance"
          value={mockData.statusCards.maintenanceDrones.count}
          subtitle="Offline"
          icon={AlertTriangle}
          alertLevel={mockData.statusCards.maintenanceDrones.count > 2 ? "warning" : "normal"}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Live Map View */}
        <div className="lg:col-span-2">
          <Card className="glass-card h-[500px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Live Fleet Map
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Search size={16} className="text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search orders, drones..." 
                    className="text-sm bg-muted px-2 py-1 rounded"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="bg-slate-100 rounded-lg h-full flex items-center justify-center relative overflow-hidden">
                <div className="text-center text-muted-foreground">
                  <MapPin size={48} className="mx-auto mb-2 opacity-50" />
                  <p>Interactive Map View</p>
                  <p className="text-sm">Real-time drone positions and flight paths</p>
                </div>
                {/* Simulated drone positions */}
                {mockData.drones.map((drone, index) => (
                  <div
                    key={drone.id}
                    className={cn(
                      "absolute w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold",
                      {
                        "bg-green-500": drone.status === "on-track",
                        "bg-yellow-500": drone.status === "warning",
                        "bg-blue-500": drone.status === "returning" || drone.status === "docking",
                        "bg-gray-500": drone.status === "in-flight"
                      }
                    )}
                    style={{
                      top: `${20 + index * 15}%`,
                      left: `${15 + index * 20}%`
                    }}
                  >
                    <DroneIcon status={drone.status} />
                  </div>
                ))}
                {/* Dark store marker */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <Building size={12} className="text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts & Notifications */}
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Live Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 max-h-60 overflow-y-auto">
              <div className="space-y-3">
                {mockData.alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={cn(
                      "p-3 rounded-lg text-sm border-l-4",
                      {
                        "bg-red-50 border-red-500": alert.severity === "critical",
                        "bg-yellow-50 border-yellow-500": alert.severity === "warning",
                        "bg-blue-50 border-blue-500": alert.severity === "info",
                        "bg-green-50 border-green-500": alert.severity === "success"
                      }
                    )}
                  >
                    <p className="font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Docking Station Status */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Battery className="h-5 w-5" />
                Docking Stations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {mockData.dockingStations.map((dock) => (
                  <div
                    key={dock.id}
                    className="flex items-center justify-between p-2 bg-muted rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-3 h-3 rounded-full",
                        {
                          "bg-green-500": dock.status === "occupied" && dock.condition === "ready",
                          "bg-yellow-500": dock.status === "occupied" && dock.condition === "charging",
                          "bg-gray-300": dock.status === "empty",
                          "bg-red-500": dock.status === "fault"
                        }
                      )} />
                      <span className="text-sm font-medium">{dock.id}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {dock.droneId || dock.condition}
                      {dock.batteryLevel && ` (${dock.batteryLevel}%)`}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Order Queue */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Queue & Status
            </CardTitle>
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-muted-foreground" />
              <select 
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="bg-muted px-3 py-1 rounded text-sm"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending Pickup</option>
                <option value="in-flight">In Flight</option>
                <option value="delivered">Delivered</option>
                <option value="delayed">Issues</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className={cn(
                  "p-4 border rounded-lg hover:bg-accent/50 transition-all cursor-pointer",
                  selectedOrder === order.id && "border-primary bg-primary/10"
                )}
                onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-3 h-3 rounded-full",
                      {
                        "bg-green-500": order.statusIndicator === "green",
                        "bg-yellow-500": order.statusIndicator === "yellow",
                        "bg-blue-500": order.statusIndicator === "blue",
                        "bg-red-500": order.statusIndicator === "red"
                      }
                    )} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{order.id}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm">{order.customerName} - {order.address}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span>{order.items}</span>
                        <span>Weight: {order.weight}</span>
                        {order.droneId && <span>Drone: {order.droneId}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium">{order.eta}</div>
                      <div className="text-sm text-muted-foreground">{order.timeRemaining}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-muted-foreground hover:text-foreground cursor-pointer" />
                      <MoreVertical size={16} className="text-muted-foreground hover:text-foreground cursor-pointer" />
                    </div>
                  </div>
                </div>
                {selectedOrder === order.id && (
                  <div className="mt-3 pt-3 border-t bg-muted/30 rounded p-3">
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Status: </span>
                        <span className="capitalize">{order.status}</span>
                      </div>
                      <div>
                        <span className="font-medium">Customer: </span>
                        <span>{order.customerName}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DronePayloadMonitoring;
