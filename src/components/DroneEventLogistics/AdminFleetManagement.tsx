
import React, { useState } from "react";
import { Plane, Battery, Settings, MapPin, Clock, Wrench, Plus, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminFleetManagement = () => {
  const [selectedDrone, setSelectedDrone] = useState("DRONE-001");

  const droneFleet = [
    {
      id: "DRONE-001",
      model: "AeroDelivery Pro",
      status: "Active",
      battery: 87,
      location: "Station A",
      missions: 15,
      flightHours: 42.5,
      lastMaintenance: "2024-06-01"
    },
    {
      id: "DRONE-002", 
      model: "AeroDelivery Pro",
      status: "Charging",
      battery: 45,
      location: "Charging Bay 1",
      missions: 8,
      flightHours: 28.2,
      lastMaintenance: "2024-06-10"
    },
    {
      id: "DRONE-003",
      model: "Emergency Response Unit",
      status: "In Flight",
      battery: 72,
      location: "Grid C-7",
      missions: 23,
      flightHours: 67.3,
      lastMaintenance: "2024-05-28"
    },
    {
      id: "DRONE-004",
      model: "Heavy Payload Carrier",
      status: "Maintenance",
      battery: 0,
      location: "Maintenance Bay",
      missions: 31,
      flightHours: 89.1,
      lastMaintenance: "2024-06-14"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "In Flight": return "bg-blue-100 text-blue-800";
      case "Charging": return "bg-yellow-100 text-yellow-800";
      case "Maintenance": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const selectedDroneData = droneFleet.find(d => d.id === selectedDrone) || droneFleet[0];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="w-5 h-5" />
            Fleet Management Dashboard
          </CardTitle>
          <CardDescription>
            Comprehensive administration and monitoring of drone fleet operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input placeholder="Search drones..." className="pl-10" />
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Drone
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Fleet Overview</CardTitle>
              <CardDescription>
                {droneFleet.length} drones in fleet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {droneFleet.map((drone) => (
                <div
                  key={drone.id}
                  className={`p-3 rounded-lg cursor-pointer border-2 transition-all ${
                    selectedDrone === drone.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedDrone(drone.id)}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{drone.id}</span>
                      <Badge className={getStatusColor(drone.status)}>
                        {drone.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{drone.model}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span>Battery: {drone.battery}%</span>
                      <span>{drone.location}</span>
                    </div>
                    <Progress value={drone.battery} className="h-1" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>{selectedDroneData.id} - Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Model</p>
                      <p className="text-lg">{selectedDroneData.model}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Current Status</p>
                      <Badge className={getStatusColor(selectedDroneData.status)}>
                        {selectedDroneData.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Battery Level</p>
                      <div className="flex items-center gap-2">
                        <Progress value={selectedDroneData.battery} className="flex-1" />
                        <span className="text-sm">{selectedDroneData.battery}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Location</p>
                      <p className="text-lg flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {selectedDroneData.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                    <Button variant="outline">
                      <MapPin className="w-4 h-4 mr-2" />
                      Locate
                    </Button>
                    <Button variant="outline">
                      <Battery className="w-4 h-4 mr-2" />
                      Send to Charge
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="maintenance">
              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Last Maintenance</p>
                        <p className="text-sm text-gray-600">{selectedDroneData.lastMaintenance}</p>
                      </div>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Next Scheduled</p>
                        <p className="text-sm text-gray-600">2024-06-21</p>
                      </div>
                      <Badge variant="outline">Upcoming</Badge>
                    </div>

                    <Button className="w-full">
                      <Wrench className="w-4 h-4 mr-2" />
                      Schedule Maintenance
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{selectedDroneData.missions}</p>
                      <p className="text-sm text-gray-600">Total Missions</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{selectedDroneData.flightHours}h</p>
                      <p className="text-sm text-gray-600">Flight Hours</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">98.2%</p>
                      <p className="text-sm text-gray-600">Success Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">2.1 min</p>
                      <p className="text-sm text-gray-600">Avg Response Time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminFleetManagement;
