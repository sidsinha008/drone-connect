
import React, { useState } from "react";
import { Calendar, Clock, Plus, MapPin, Package, Users, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DroneScheduling = () => {
  const [selectedDate, setSelectedDate] = useState("2024-06-14");
  const [viewMode, setViewMode] = useState<"day" | "week">("day");

  const scheduledMissions = [
    {
      id: "SCH001",
      time: "09:00",
      duration: "30 min",
      type: "Logistics",
      mission: "Concession Supply Run",
      drone: "DRONE-002",
      location: "Concession Stands A-D",
      status: "Scheduled",
      priority: "Standard"
    },
    {
      id: "SCH002", 
      time: "10:30",
      duration: "15 min",
      type: "Security",
      mission: "Perimeter Patrol",
      drone: "DRONE-003",
      location: "Stadium Perimeter",
      status: "In Progress",
      priority: "High"
    },
    {
      id: "SCH003",
      time: "14:00",
      duration: "45 min",
      type: "Emergency Standby",
      mission: "Medical Response Ready",
      drone: "DRONE-001",
      location: "Emergency Station",
      status: "Scheduled",
      priority: "Critical"
    },
    {
      id: "SCH004",
      time: "16:15",
      duration: "20 min", 
      type: "Logistics",
      mission: "Equipment Delivery",
      drone: "DRONE-004",
      location: "Maintenance Bay",
      status: "Completed",
      priority: "Standard"
    }
  ];

  const availableDrones = [
    { id: "DRONE-001", status: "Available", battery: 95 },
    { id: "DRONE-002", status: "Charging", battery: 67 },
    { id: "DRONE-003", status: "Active", battery: 78 },
    { id: "DRONE-004", status: "Available", battery: 89 },
    { id: "DRONE-005", status: "Maintenance", battery: 0 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled": return "bg-blue-100 text-blue-800";
      case "In Progress": return "bg-green-100 text-green-800";
      case "Completed": return "bg-gray-100 text-gray-800";
      default: return "bg-yellow-100 text-yellow-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-600";
      case "High": return "bg-orange-500";
      default: return "bg-blue-500";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Drone Scheduling & Resource Management
          </CardTitle>
          <CardDescription>
            Plan and coordinate drone missions, maintenance, and resource allocation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label>Date:</Label>
                <Input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-auto"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant={viewMode === "day" ? "default" : "outline"}
                  onClick={() => setViewMode("day")}
                  size="sm"
                >
                  Day
                </Button>
                <Button 
                  variant={viewMode === "week" ? "default" : "outline"}
                  onClick={() => setViewMode("week")}
                  size="sm"
                >
                  Week
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Schedule Mission
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Daily Schedule - {selectedDate}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scheduledMissions.map((mission) => (
                  <div key={mission.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <p className="font-semibold text-lg">{mission.time}</p>
                          <p className="text-xs text-gray-500">{mission.duration}</p>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={getPriorityColor(mission.priority)}>
                              {mission.type}
                            </Badge>
                            <Badge variant="outline" className={getStatusColor(mission.status)}>
                              {mission.status}
                            </Badge>
                          </div>
                          <h4 className="font-medium">{mission.mission}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Package className="w-3 h-3" />
                              {mission.drone}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {mission.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Available Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Drone Fleet Status</h4>
                <div className="space-y-2">
                  {availableDrones.map((drone) => (
                    <div key={drone.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium text-sm">{drone.id}</p>
                        <p className="text-xs text-gray-600">Battery: {drone.battery}%</p>
                      </div>
                      <Badge 
                        variant="outline"
                        className={
                          drone.status === "Available" 
                            ? "bg-green-50 text-green-700" 
                            : drone.status === "Active"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-gray-50 text-gray-700"
                        }
                      >
                        {drone.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Quick Schedule</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="w-4 h-4 mr-2" />
                    Emergency Standby
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="w-4 h-4 mr-2" />
                    Logistics Run
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="w-4 h-4 mr-2" />
                    Security Patrol
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DroneScheduling;
