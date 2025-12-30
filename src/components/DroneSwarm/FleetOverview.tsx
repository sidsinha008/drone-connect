
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Users, 
  Battery, 
  MapPin, 
  Radio,
  Eye,
  Settings,
  Play,
  Square,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plane
} from "lucide-react";

const FleetOverview = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDrone, setSelectedDrone] = useState<string | null>(null);

  const fleetSummary = {
    totalDrones: 247,
    activeDrones: 189,
    inactiveDrones: 58,
    batteryLow: 12,
    connected: 234,
    disconnected: 13,
    inMission: 45
  };

  const drones = [
    {
      din: "DRN-001-2024",
      model: "SkyGuard X1",
      status: "active",
      battery: 87,
      location: "Sector A-1",
      connected: true,
      lastUpdate: "2 min ago",
      softwareVersion: "v2.1.4",
      missionStatus: "patrol"
    },
    {
      din: "DRN-002-2024",
      model: "SkyGuard X1",
      status: "active",
      battery: 23,
      location: "Sector B-3",
      connected: true,
      lastUpdate: "1 min ago",
      softwareVersion: "v2.1.3",
      missionStatus: "idle"
    },
    {
      din: "DRN-003-2024",
      model: "SkyGuard Pro",
      status: "inactive",
      battery: 0,
      location: "Base Station",
      connected: false,
      lastUpdate: "3 hours ago",
      softwareVersion: "v2.0.8",
      missionStatus: "maintenance"
    },
    {
      din: "DRN-004-2024",
      model: "SkyGuard X1",
      status: "active",
      battery: 76,
      location: "Sector C-2",
      connected: true,
      lastUpdate: "30 sec ago",
      softwareVersion: "v2.1.4",
      missionStatus: "search"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "inactive": return "bg-gray-500";
      case "maintenance": return "bg-yellow-500";
      case "error": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 50) return "text-green-500";
    if (battery > 20) return "text-yellow-500";
    return "text-red-500";
  };

  const filteredDrones = drones.filter(drone =>
    drone.din.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drone.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drone.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Fleet Management Dashboard</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Create Group
          </Button>
        </div>
      </div>

      {/* Fleet Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{fleetSummary.totalDrones}</p>
              <p className="text-sm text-muted-foreground">Total Drones</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">{fleetSummary.activeDrones}</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-500">{fleetSummary.inactiveDrones}</p>
              <p className="text-sm text-muted-foreground">Inactive</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-500">{fleetSummary.batteryLow}</p>
              <p className="text-sm text-muted-foreground">Low Battery</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-500">{fleetSummary.connected}</p>
              <p className="text-sm text-muted-foreground">Connected</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-500">{fleetSummary.inMission}</p>
              <p className="text-sm text-muted-foreground">In Mission</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-500">{fleetSummary.disconnected}</p>
              <p className="text-sm text-muted-foreground">Offline</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Drone List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="w-5 h-5" />
                Drone Fleet
              </CardTitle>
              <CardDescription>
                Search and manage individual drones by DIN/VIN
              </CardDescription>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by DIN, model, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredDrones.map((drone) => (
                  <div
                    key={drone.din}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedDrone === drone.din ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedDrone(drone.din)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(drone.status)}`}></div>
                          <span className="font-medium">{drone.din}</span>
                        </div>
                        <Badge variant="outline">{drone.model}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {drone.connected ? (
                          <Radio className="w-4 h-4 text-green-500" />
                        ) : (
                          <Radio className="w-4 h-4 text-red-500" />
                        )}
                        <Battery className={`w-4 h-4 ${getBatteryColor(drone.battery)}`} />
                        <span className={`text-sm ${getBatteryColor(drone.battery)}`}>
                          {drone.battery}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {drone.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {drone.lastUpdate}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>v{drone.softwareVersion}</span>
                        <Badge variant="secondary" className="text-xs">
                          {drone.missionStatus}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Drone View */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Drone Details
              </CardTitle>
              <CardDescription>
                {selectedDrone ? `Details for ${selectedDrone}` : "Select a drone to view details"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDrone ? (
                <div className="space-y-4">
                  {(() => {
                    const drone = drones.find(d => d.din === selectedDrone);
                    if (!drone) return null;
                    
                    return (
                      <>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Status</span>
                            <Badge className={`${getStatusColor(drone.status)} text-white`}>
                              {drone.status}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Battery</span>
                            <span className={`font-medium ${getBatteryColor(drone.battery)}`}>
                              {drone.battery}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Location</span>
                            <span className="font-medium">{drone.location}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Connection</span>
                            <span className={`font-medium ${drone.connected ? 'text-green-500' : 'text-red-500'}`}>
                              {drone.connected ? 'Connected' : 'Offline'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Software</span>
                            <span className="font-medium">{drone.softwareVersion}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Mission</span>
                            <Badge variant="secondary">{drone.missionStatus}</Badge>
                          </div>
                        </div>

                        <div className="pt-4 border-t space-y-2">
                          <h4 className="font-medium">Remote Commands</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <Button size="sm" variant="outline" className="flex items-center gap-1">
                              <Play className="w-3 h-3" />
                              Start
                            </Button>
                            <Button size="sm" variant="outline" className="flex items-center gap-1">
                              <Square className="w-3 h-3" />
                              Land
                            </Button>
                            <Button size="sm" variant="outline" className="flex items-center gap-1">
                              <Settings className="w-3 h-3" />
                              Config
                            </Button>
                            <Button size="sm" variant="outline" className="flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              RTB
                            </Button>
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <h4 className="font-medium mb-2">Quick Actions</h4>
                          <div className="space-y-2">
                            <Button size="sm" className="w-full">
                              Add to Group
                            </Button>
                            <Button size="sm" variant="outline" className="w-full">
                              Schedule OTA Update
                            </Button>
                            <Button size="sm" variant="outline" className="w-full">
                              View Flight History
                            </Button>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <Plane className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select a drone from the list to view detailed information and control options.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FleetOverview;
