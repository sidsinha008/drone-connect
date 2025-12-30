
import React, { useState } from "react";
import { MapPin, Plane, Clock, Battery, Camera, Radio, Target, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const LiveMissionTracking = () => {
  const [selectedDrone, setSelectedDrone] = useState("DRONE-001");

  const activeMissions = [
    {
      id: "M001",
      droneId: "DRONE-001",
      type: "Emergency",
      item: "AED Unit",
      destination: "Section 105, Row A",
      status: "En Route",
      progress: 75,
      eta: "2 min",
      priority: "critical",
      altitude: 45,
      speed: 15,
      battery: 87
    },
    {
      id: "M002",
      droneId: "DRONE-003",
      type: "Logistics",
      item: "Concession Supplies",
      destination: "Stand C",
      status: "Approaching",
      progress: 90,
      eta: "1 min",
      priority: "standard",
      altitude: 40,
      speed: 12,
      battery: 72
    },
    {
      id: "M003",
      droneId: "DRONE-007",
      type: "Emergency",
      item: "Trauma Kit",
      destination: "Gate 7",
      status: "Loading",
      progress: 25,
      eta: "5 min",
      priority: "urgent",
      altitude: 0,
      speed: 0,
      battery: 95
    }
  ];

  const selectedMission = activeMissions.find(m => m.droneId === selectedDrone) || activeMissions[0];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-600";
      case "urgent": return "bg-orange-500";
      default: return "bg-blue-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En Route": return "text-blue-600";
      case "Approaching": return "text-green-600";
      case "Loading": return "text-yellow-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Mission List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="w-5 h-5" />
                Active Missions
              </CardTitle>
              <CardDescription>
                {activeMissions.length} drones currently on missions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeMissions.map((mission) => (
                <div
                  key={mission.id}
                  className={`p-3 rounded-lg cursor-pointer border-2 transition-all ${
                    selectedDrone === mission.droneId 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedDrone(mission.droneId)}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{mission.droneId}</span>
                      <Badge className={getPriorityColor(mission.priority)}>
                        {mission.type}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium">{mission.item}</p>
                    <p className="text-xs text-gray-600">{mission.destination}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${getStatusColor(mission.status)}`}>
                        {mission.status}
                      </span>
                      <span className="text-sm text-gray-600">ETA: {mission.eta}</span>
                    </div>
                    <Progress value={mission.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Live Tracking Map */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Live Tracking Map - {selectedMission.droneId}
              </CardTitle>
              <CardDescription>
                Real-time 3D position and flight path visualization
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Map Placeholder */}
              <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-gray-300 h-80 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto">
                    <MapPin className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">3D Stadium Map</h3>
                    <p className="text-sm text-gray-500 max-w-md">
                      Interactive 3D visualization showing drone position, flight path, and stadium layout
                    </p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Badge variant="outline">Current Position: Grid C-7</Badge>
                    <Badge variant="outline">Altitude: {selectedMission.altitude}m</Badge>
                    <Badge variant="outline">Speed: {selectedMission.speed} m/s</Badge>
                  </div>
                </div>
              </div>

              {/* Flight Path Info */}
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Distance Remaining</p>
                  <p className="text-lg font-semibold">247m</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Flight Time</p>
                  <p className="text-lg font-semibold">3:42</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Wind Speed</p>
                  <p className="text-lg font-semibold">8 km/h</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Drone Telemetry */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Radio className="w-5 h-5" />
              Drone Telemetry - {selectedMission.droneId}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Battery Level</span>
                  <span className="text-sm">{selectedMission.battery}%</span>
                </div>
                <Progress value={selectedMission.battery} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Mission Progress</span>
                  <span className="text-sm">{selectedMission.progress}%</span>
                </div>
                <Progress value={selectedMission.progress} className="h-2" />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="text-center">
                <p className="text-sm text-gray-600">Altitude</p>
                <p className="text-lg font-semibold">{selectedMission.altitude}m</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Speed</p>
                <p className="text-lg font-semibold">{selectedMission.speed} m/s</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">GPS Accuracy</p>
                <p className="text-lg font-semibold">±0.5m</p>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Camera Feed</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  <Camera className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Payload Status</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  Secured
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Communication</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Strong Signal
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Live Camera Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Camera Feed Placeholder */}
            <div className="relative bg-gray-900 rounded-lg h-48 flex items-center justify-center">
              <div className="text-center space-y-2">
                <Camera className="w-8 h-8 text-gray-400 mx-auto" />
                <p className="text-gray-400 text-sm">Live HD Camera Feed</p>
                <p className="text-gray-500 text-xs">1920x1080 @ 30fps</p>
              </div>
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className="bg-red-600 text-white">
                  ● LIVE
                </Badge>
              </div>
            </div>
            
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm">
                <Camera className="w-4 h-4 mr-2" />
                Take Screenshot
              </Button>
              <Button variant="outline" size="sm">
                <Target className="w-4 h-4 mr-2" />
                Center on Destination
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveMissionTracking;
