
import { useState } from "react";
import { Plus, Search, Filter, Battery, Wifi, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DroneSelectionProps {
  selectedDrone: string | null;
  onDroneSelect: (droneId: string) => void;
}

interface DroneData {
  id: string;
  name: string;
  model: string;
  batteryLevel: number;
  status: "Ready" | "In Flight" | "Maintenance" | "Offline";
  connectionStatus: "Connected" | "Disconnected" | "Weak Signal";
  lastSeen: string;
}

const mockDrones: DroneData[] = [
  {
    id: "drone-001",
    name: "Xrili Swift Alpha",
    model: "XR-Swift-Pro",
    batteryLevel: 85,
    status: "Ready",
    connectionStatus: "Connected",
    lastSeen: "2 minutes ago"
  },
  {
    id: "drone-002",
    name: "Xrili Hauler Beta",
    model: "XR-Hauler-Max",
    batteryLevel: 92,
    status: "In Flight",
    connectionStatus: "Connected",
    lastSeen: "Active"
  },
  {
    id: "drone-003",
    name: "Xrili Rapid Gamma",
    model: "XR-Rapid-Lite",
    batteryLevel: 34,
    status: "Ready",
    connectionStatus: "Weak Signal",
    lastSeen: "5 minutes ago"
  },
  {
    id: "drone-004",
    name: "Xrili Swift Delta",
    model: "XR-Swift-Pro",
    batteryLevel: 0,
    status: "Maintenance",
    connectionStatus: "Disconnected",
    lastSeen: "2 hours ago"
  }
];

export const DroneSelection = ({ selectedDrone, onDroneSelect }: DroneSelectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredDrones = mockDrones.filter(drone => {
    const matchesSearch = drone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drone.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drone.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || drone.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready": return "bg-green-500";
      case "In Flight": return "bg-blue-500";
      case "Maintenance": return "bg-orange-500";
      case "Offline": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getConnectionIcon = (connectionStatus: string) => {
    switch (connectionStatus) {
      case "Connected": return <Wifi className="h-4 w-4 text-green-500" />;
      case "Weak Signal": return <Wifi className="h-4 w-4 text-orange-500" />;
      case "Disconnected": return <Wifi className="h-4 w-4 text-red-500" />;
      default: return <Wifi className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Fleet Overview</CardTitle>
            <p className="text-sm text-muted-foreground">
              Select a drone to configure its settings
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Drone
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search drones by name, model, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-input rounded-md bg-background"
          >
            <option value="all">All Status</option>
            <option value="ready">Ready</option>
            <option value="in flight">In Flight</option>
            <option value="maintenance">Maintenance</option>
            <option value="offline">Offline</option>
          </select>
        </div>

        {/* Drone Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredDrones.map((drone) => (
            <Card
              key={drone.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                selectedDrone === drone.id && "ring-2 ring-primary border-primary"
              )}
              onClick={() => onDroneSelect(drone.id)}
            >
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{drone.name}</h4>
                      <p className="text-sm text-muted-foreground">{drone.model}</p>
                      <p className="text-xs text-muted-foreground">ID: {drone.id}</p>
                    </div>
                    <Badge className={cn("text-white", getStatusColor(drone.status))}>
                      {drone.status}
                    </Badge>
                  </div>

                  {/* Status Indicators */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Battery className="h-4 w-4" />
                        <span className="text-sm">{drone.batteryLevel}%</span>
                      </div>
                      {drone.batteryLevel < 20 && (
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {getConnectionIcon(drone.connectionStatus)}
                        <span className="text-sm">{drone.connectionStatus}</span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Last seen: {drone.lastSeen}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDrones.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No drones found matching your criteria
          </div>
        )}
      </CardContent>
    </Card>
  );
};
