
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plane, 
  MapPin, 
  Clock, 
  Battery, 
  Camera, 
  Route,
  Play,
  Square,
  RotateCcw,
  Settings,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const DroneMissionPlanner = () => {
  const [selectedMission, setSelectedMission] = useState<string | null>(null);
  const [activeDrones, setActiveDrones] = useState([
    {
      id: "drone-001",
      name: "Sky Guardian 1",
      status: "active",
      battery: 85,
      altitude: 50,
      mission: "Roof Inspection",
      eta: "12 mins"
    },
    {
      id: "drone-002", 
      name: "Security Patrol Alpha",
      status: "charging",
      battery: 100,
      altitude: 0,
      mission: "Standby",
      eta: "-"
    },
    {
      id: "drone-003",
      name: "Infrastructure Scout",
      status: "active", 
      battery: 62,
      altitude: 75,
      mission: "Facade Survey",
      eta: "8 mins"
    }
  ]);

  const missionTemplates = [
    {
      id: "daily-roof",
      name: "Daily Roof Inspection",
      duration: "15 mins",
      waypoints: 12,
      coverage: "100%",
      sensors: ["Visual", "Thermal"],
      description: "Comprehensive roof condition assessment"
    },
    {
      id: "security-patrol",
      name: "Perimeter Security Patrol", 
      duration: "25 mins",
      waypoints: 20,
      coverage: "100%",
      sensors: ["Visual", "IR"],
      description: "360° perimeter security monitoring"
    },
    {
      id: "structural-scan",
      name: "Pre-Event Structural Scan",
      duration: "45 mins", 
      waypoints: 35,
      coverage: "95%",
      sensors: ["Visual", "LiDAR", "Thermal"],
      description: "Detailed structural integrity assessment"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-600";
      case "charging": return "text-blue-600";
      case "maintenance": return "text-yellow-600";
      case "offline": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return CheckCircle;
      case "charging": return Battery;
      case "maintenance": return Settings;
      case "offline": return AlertTriangle;
      default: return Plane;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="w-5 h-5" />
            Drone Mission Control Center
          </CardTitle>
          <CardDescription>
            Plan, execute, and monitor automated drone missions for stadium operations
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="fleet-status" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="fleet-status" className="flex items-center gap-2">
            <Plane className="w-4 h-4" />
            Fleet Status
          </TabsTrigger>
          <TabsTrigger value="mission-planner" className="flex items-center gap-2">
            <Route className="w-4 h-4" />
            Mission Planner
          </TabsTrigger>
          <TabsTrigger value="live-monitoring" className="flex items-center gap-2">
            <Camera className="w-4 h-4" />
            Live Monitoring
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fleet-status" className="space-y-6">
          <div className="grid gap-4">
            {activeDrones.map((drone) => {
              const StatusIcon = getStatusIcon(drone.status);
              return (
                <Card key={drone.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <StatusIcon className={`w-8 h-8 ${getStatusColor(drone.status)}`} />
                        <div>
                          <h3 className="font-semibold">{drone.name}</h3>
                          <p className="text-sm text-muted-foreground">Current Mission: {drone.mission}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-xs text-muted-foreground">Battery</p>
                          <p className={`font-bold ${drone.battery < 20 ? 'text-red-600' : drone.battery < 50 ? 'text-yellow-600' : 'text-green-600'}`}>
                            {drone.battery}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Altitude</p>
                          <p className="font-bold">{drone.altitude}m</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">ETA</p>
                          <p className="font-bold">{drone.eta}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="mission-planner" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mission Templates</CardTitle>
              <CardDescription>
                Pre-configured mission templates for common inspection and monitoring tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {missionTemplates.map((template) => (
                  <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{template.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span className="font-medium">{template.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Waypoints:</span>
                          <span className="font-medium">{template.waypoints}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Coverage:</span>
                          <span className="font-medium">{template.coverage}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-xs text-muted-foreground mb-2">Sensors:</p>
                        <div className="flex flex-wrap gap-1">
                          {template.sensors.map((sensor, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {sensor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" className="flex-1">
                          <Play className="w-3 h-3 mr-1" />
                          Start
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="live-monitoring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Mission Monitoring</CardTitle>
              <CardDescription>
                Real-time tracking and control of active drone missions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="font-semibold">Active Mission: Roof Inspection</h3>
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Live Drone Feed</p>
                      <p className="text-sm text-muted-foreground">Sky Guardian 1 - Camera A</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Square className="w-3 h-3 mr-1" />
                      Stop
                    </Button>
                    <Button size="sm" variant="outline">
                      <RotateCcw className="w-3 h-3 mr-1" />
                      Return Home
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Mission Progress</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Waypoints Completed</span>
                        <span>8/12</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: '67%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Area Coverage</span>
                        <span>67%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '67%'}}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Current Speed</p>
                      <p className="font-bold">12 m/s</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Wind Speed</p>
                      <p className="font-bold">8 km/h NE</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Signal Strength</p>
                      <p className="font-bold">98%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Data Captured</p>
                      <p className="font-bold">2.4 GB</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DroneMissionPlanner;
