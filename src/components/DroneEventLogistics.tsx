
import React, { useState } from "react";
import { ArrowLeft, Package, MapPin, Plane, Clock, AlertTriangle, Shield, Radio, Heart, Zap, Activity, Users, Calendar, Settings, Battery, Camera, Target, Navigation, Monitor, Truck, CheckCircle, Command, Brain, Satellite, Wind, Thermometer, Radar, Cpu, Globe, Eye, PlayCircle, StopCircle, RotateCw, AlertOctagon, Headphones, FileText, Layers, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import DeliveryRequestPortal from "./DroneEventLogistics/DeliveryRequestPortal";
import LiveMissionTracking from "./DroneEventLogistics/LiveMissionTracking";
import EmergencyCommandCenter from "./DroneEventLogistics/EmergencyCommandCenter";
import AdminFleetManagement from "./DroneEventLogistics/AdminFleetManagement";
import DroneScheduling from "./DroneEventLogistics/DroneScheduling";

interface DroneEventLogisticsProps {
  onBack: () => void;
}

const DroneEventLogistics = ({ onBack }: DroneEventLogisticsProps) => {
  const [activeTab, setActiveTab] = useState("mission-control");
  const [emergencyMode, setEmergencyMode] = useState(false);

  // Advanced Multi-Variant Drone Fleet Data
  const droneVariants = [
    {
      id: "HEAVY-001",
      variant: "Heavy-Lift Cargo",
      model: "DJI Matrice 600 Pro",
      status: "Available",
      battery: 95,
      payload: "0/6kg",
      maxPayload: "6kg",
      range: "5km",
      speed: "18 m/s",
      sensors: ["4K Camera", "Thermal", "LiDAR"],
      location: "Charging Bay A",
      flightHours: 127,
      missions: 45,
      successRate: 98.2
    },
    {
      id: "EMERGENCY-001",
      variant: "Compact Emergency",
      model: "Custom Medical Drone",
      status: "In-Flight",
      battery: 72,
      payload: "2.1/3kg",
      maxPayload: "3kg",
      range: "3km", 
      speed: "25 m/s",
      sensors: ["HD Camera", "GPS+", "Emergency Beacon"],
      location: "Section 105",
      flightHours: 89,
      missions: 76,
      successRate: 99.8
    },
    {
      id: "RECON-001",
      variant: "High-Speed Reconnaissance",
      model: "DJI Mini 3 Pro",
      status: "Charging",
      battery: 45,
      payload: "0/1kg",
      maxPayload: "1kg",
      range: "10km",
      speed: "35 m/s",
      sensors: ["4K Gimbal", "Zoom", "Night Vision"],
      location: "Charging Bay C",
      flightHours: 203,
      missions: 134,
      successRate: 97.1
    },
    {
      id: "CARGO-001",
      variant: "Standard Logistics",
      model: "DJI Matrice 300 RTK",
      status: "Maintenance",
      battery: 0,
      payload: "0/4kg",
      maxPayload: "4kg",
      range: "8km",
      speed: "20 m/s",
      sensors: ["Dual Camera", "RTK GPS", "Obstacle Avoidance"],
      location: "Maintenance Bay",
      flightHours: 456,
      missions: 289,
      successRate: 96.8
    }
  ];

  // Advanced Mission Control Data
  const activeMissions = [
    {
      id: "M2024-001",
      type: "Emergency Medical",
      priority: "Critical",
      droneId: "EMERGENCY-001",
      droneVariant: "Compact Emergency",
      item: "AED Unit + Trauma Kit",
      origin: "Medical Supply Hub",
      destination: "Section 105, Row A, Seat 12",
      recipient: "Dr. Sarah Chen",
      status: "Approaching Target",
      progress: 85,
      eta: "30 sec",
      flightTime: "02:45",
      altitude: 45,
      speed: 22,
      batteryUsed: 28,
      routeOptimization: "AI-Optimized (23% faster)",
      weatherImpact: "Low wind impact"
    },
    {
      id: "M2024-002",
      type: "Urgent Logistics",
      priority: "High",
      droneId: "HEAVY-001",
      droneVariant: "Heavy-Lift Cargo",
      item: "Beverage Restock (Cases 1-8)",
      origin: "Central Supply Depot",
      destination: "Concession Stand C-7",
      recipient: "Mike Rodriguez",
      status: "Loading Payload",
      progress: 15,
      eta: "4 min",
      flightTime: "00:00",
      altitude: 0,
      speed: 0,
      batteryUsed: 5,
      routeOptimization: "Multi-waypoint optimized",
      weatherImpact: "Wind compensation active"
    }
  ];

  // Environmental Data
  const environmentalData = {
    weather: {
      wind: { speed: 8, direction: "NE", gusts: 12 },
      temperature: 24,
      humidity: 65,
      visibility: "Excellent",
      precipitation: 0
    },
    airspace: {
      activeNoFlyZones: 2,
      temporaryRestrictions: 1,
      trafficLevel: "Low",
      altitude: "Clear up to 120m"
    },
    stadium: {
      crowdDensity: "High",
      eventPhase: "Half-time",
      emergencyStatus: "Normal",
      activeLandingPads: 6
    }
  };

  const handleEmergencyOverride = () => {
    setEmergencyMode(!emergencyMode);
    toast.error("EMERGENCY OVERRIDE ACTIVATED", {
      description: "All non-critical missions paused. Emergency protocols engaged.",
      duration: 8000,
    });
  };

  const handleMissionControl = (action: string, missionId?: string) => {
    switch (action) {
      case "abort":
        toast.warning(`Mission ${missionId} aborted - Drone returning to base`);
        break;
      case "reroute":
        toast.info(`Mission ${missionId} rerouted - New path calculated`);
        break;
      case "manual-control":
        toast.info("Manual control activated - Operator has full command");
        break;
      default:
        toast.success(`Command executed: ${action}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "text-green-600 bg-green-50";
      case "In-Flight": return "text-blue-600 bg-blue-50";
      case "Charging": return "text-yellow-600 bg-yellow-50";
      case "Maintenance": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-600 text-white";
      case "High": return "bg-orange-500 text-white";
      case "Medium": return "bg-yellow-500 text-white";
      default: return "bg-blue-500 text-white";
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Mission Control Status */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Command className="text-blue-600" size={32} />
              Advanced Drone Command & Control Center
            </h1>
          </div>
          <p className="text-muted-foreground mt-2">
            Cutting-edge multi-variant drone fleet management with AI-driven mission planning and real-time command
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={handleEmergencyOverride}
            className={`${emergencyMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
          >
            <AlertOctagon className="w-4 h-4 mr-2" />
            {emergencyMode ? 'EMERGENCY ACTIVE' : 'EMERGENCY OVERRIDE'}
          </Button>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Brain className="w-3 h-3 mr-1" />
            AI-Optimized
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Satellite className="w-3 h-3 mr-1" />
            4 Variants Active
          </Badge>
        </div>
      </div>

      {/* Mission Control Dashboard */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Active Missions Panel */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Live Mission Control Dashboard
              </CardTitle>
              <CardDescription>
                Real-time command and control for active drone missions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeMissions.map((mission) => (
                <div key={mission.id} className="p-4 rounded-lg border-2 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getPriorityColor(mission.priority)}>
                          {mission.type}
                        </Badge>
                        <Badge variant="outline">{mission.droneVariant}</Badge>
                        <Badge variant="outline" className="text-xs">
                          {mission.droneId}
                        </Badge>
                      </div>
                      <h4 className="font-bold text-lg">{mission.item}</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mt-2">
                        <div>Origin: {mission.origin}</div>
                        <div>Destination: {mission.destination}</div>
                        <div>Recipient: {mission.recipient}</div>
                        <div>Status: <span className="font-semibold text-blue-600">{mission.status}</span></div>
                      </div>
                    </div>
                  </div>

                  {/* Live Telemetry */}
                  <div className="grid grid-cols-4 gap-4 mb-4 p-3 bg-gray-50 rounded">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Altitude</p>
                      <p className="font-semibold">{mission.altitude}m</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Speed</p>
                      <p className="font-semibold">{mission.speed} m/s</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Battery Used</p>
                      <p className="font-semibold">{mission.batteryUsed}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">ETA</p>
                      <p className="font-semibold text-green-600">{mission.eta}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Mission Progress</span>
                      <span>{mission.progress}%</span>
                    </div>
                    <Progress value={mission.progress} className="h-3" />
                  </div>

                  {/* AI Insights */}
                  <div className="text-xs text-blue-600 mb-3">
                    <div className="flex items-center gap-1 mb-1">
                      <Brain className="w-3 h-3" />
                      Route: {mission.routeOptimization}
                    </div>
                    <div className="flex items-center gap-1">
                      <Wind className="w-3 h-3" />
                      Weather: {mission.weatherImpact}
                    </div>
                  </div>

                  {/* Mission Control Commands */}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleMissionControl("abort", mission.id)}
                    >
                      <StopCircle className="w-3 h-3 mr-1" />
                      Abort
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleMissionControl("reroute", mission.id)}
                    >
                      <RotateCw className="w-3 h-3 mr-1" />
                      Reroute
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleMissionControl("manual-control", mission.id)}
                    >
                      <Command className="w-3 h-3 mr-1" />
                      Manual
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-3 h-3 mr-1" />
                      Live Feed
                    </Button>
                    <Button variant="outline" size="sm">
                      <Headphones className="w-3 h-3 mr-1" />
                      Comms
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Environmental & Fleet Status */}
        <div className="space-y-6">
          {/* Environmental Conditions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Environmental Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded">
                  <Wind className="w-6 h-6 mx-auto text-blue-600 mb-1" />
                  <p className="text-xs text-gray-600">Wind</p>
                  <p className="font-semibold">{environmentalData.weather.wind.speed} km/h {environmentalData.weather.wind.direction}</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded">
                  <Thermometer className="w-6 h-6 mx-auto text-green-600 mb-1" />
                  <p className="text-xs text-gray-600">Temperature</p>
                  <p className="font-semibold">{environmentalData.weather.temperature}°C</p>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded">
                  <Radar className="w-6 h-6 mx-auto text-yellow-600 mb-1" />
                  <p className="text-xs text-gray-600">Airspace</p>
                  <p className="font-semibold">{environmentalData.airspace.trafficLevel}</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded">
                  <Users className="w-6 h-6 mx-auto text-purple-600 mb-1" />
                  <p className="text-xs text-gray-600">Crowd</p>
                  <p className="font-semibold">{environmentalData.stadium.crowdDensity}</p>
                </div>
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <div>• No-fly zones: {environmentalData.airspace.activeNoFlyZones}</div>
                <div>• Landing pads available: {environmentalData.stadium.activeLandingPads}</div>
                <div>• Event phase: {environmentalData.stadium.eventPhase}</div>
              </div>
            </CardContent>
          </Card>

          {/* Fleet Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="w-5 h-5" />
                Fleet Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {droneVariants.map((drone) => (
                <div key={drone.id} className="p-3 rounded border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">{drone.id}</span>
                    <Badge className={getStatusColor(drone.status)}>
                      {drone.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{drone.variant}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Battery: {drone.battery}%</div>
                    <div>Payload: {drone.payload}</div>
                    <div>Range: {drone.range}</div>
                    <div>Success: {drone.successRate}%</div>
                  </div>
                  {drone.status === "Available" && (
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      <PlayCircle className="w-3 h-3 mr-1" />
                      Deploy
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Application Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="mission-control" className="flex items-center gap-2">
            <Command className="w-4 h-4" />
            Mission Control
          </TabsTrigger>
          <TabsTrigger value="delivery-portal" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Request Portal
          </TabsTrigger>
          <TabsTrigger value="live-tracking" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            3D Tracking
          </TabsTrigger>
          <TabsTrigger value="fleet-admin" className="flex items-center gap-2">
            <Plane className="w-4 h-4" />
            Fleet Admin
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="emergency" className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Emergency
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mission-control">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5" />
                3D Stadium Digital Twin & AI Mission Planner
              </CardTitle>
              <CardDescription>
                Interactive 3D environment with real-time drone positions and AI-optimized flight paths
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* 3D Digital Twin Placeholder */}
              <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 rounded-lg border-2 border-dashed border-gray-300 h-96 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto">
                    <Layers className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">3D Stadium Digital Twin</h3>
                    <p className="text-sm text-gray-500 max-w-md">
                      Real-time 3D visualization with AI-driven route optimization, multi-drone tracking, and environmental monitoring
                    </p>
                  </div>
                  <div className="flex gap-2 justify-center flex-wrap">
                    <Badge variant="outline">Multi-Drone Tracking</Badge>
                    <Badge variant="outline">AI Route Optimization</Badge>
                    <Badge variant="outline">Real-time Weather</Badge>
                    <Badge variant="outline">Collision Avoidance</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivery-portal">
          <DeliveryRequestPortal />
        </TabsContent>

        <TabsContent value="live-tracking">
          <LiveMissionTracking />
        </TabsContent>

        <TabsContent value="fleet-admin">
          <AdminFleetManagement />
        </TabsContent>

        <TabsContent value="analytics">
          <DroneScheduling />
        </TabsContent>

        <TabsContent value="emergency">
          <EmergencyCommandCenter />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DroneEventLogistics;
