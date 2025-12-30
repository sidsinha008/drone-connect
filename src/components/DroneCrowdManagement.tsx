import React, { useState } from "react";
import { ArrowLeft, Users, AlertTriangle, Eye, MapPin, Radio, Shield, Brain, Zap, Activity, Monitor, Navigation, Command, Target, Radar, Bell, Camera, Play, Pause, RotateCw, Volume2, MessageSquare, TrendingUp, Clock, Battery, Settings, Layers, Maximize2, Ruler, Power, Upload, Download, Wifi, Signal, Search, Filter, Plus, Edit, Trash2, RefreshCw, Headphones, Map, Wrench, Calendar, CheckCircle, XCircle, AlertCircle, Info, Thermometer, Gauge, BarChart3, PieChart, LineChart, Cpu, HardDrive, Router, Satellite } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DroneCrowdManagementProps {
  onBack: () => void;
}

const DroneCrowdManagement = ({ onBack }: DroneCrowdManagementProps) => {
  const [activeTab, setActiveTab] = useState("command-overview");
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [selectedDrone, setSelectedDrone] = useState<string | null>(null);
  const [selectedMission, setSelectedMission] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState("3d-overview");
  const [activeLayers, setActiveLayers] = useState({
    drones: true,
    flightPaths: true,
    crowdDensity: true,
    sensors: false,
    noFlyZones: true,
    patrolZones: true,
    chargingStations: true
  });

  // Enhanced drone fleet with variants and health data
  const droneFleet = [
    {
      id: "SURV-001",
      variant: "Sentinel-Patrol",
      type: "Security Patrol",
      status: "Active Patrol",
      battery: 87,
      altitude: 50,
      speed: 12,
      flightHours: 234,
      lastMaintenance: "2024-06-10",
      nextMaintenance: "2024-07-10",
      payload: "Thermal + Visual",
      maxRange: "5km",
      maxPayload: "2kg",
      currentMission: "PATROL-001",
      position: { x: 45, y: 30 },
      capabilities: ["Thermal Imaging", "Night Vision", "AI Object Detection"],
      health: {
        motorTemp: 42,
        gpsSignal: 98,
        communicationStrength: 95,
        sensorCalibration: 100,
        batteryHealth: 92,
        propellerWear: 15,
        overallScore: 94
      },
      maintenance: {
        batteryReplacements: 2,
        propellerReplacements: 1,
        sensorRecalibrations: 3,
        firmwareUpdates: 12,
        lastInspection: "2024-06-08"
      },
      performance: {
        successfulMissions: 45,
        totalMissions: 47,
        averageFlightTime: "28 min",
        maxAltitudeReached: "120m",
        totalDistance: "1,245 km"
      }
    },
    {
      id: "CARGO-002", 
      variant: "Cargo-200",
      type: "Heavy Lift Logistics",
      status: "Charging",
      battery: 23,
      altitude: 0,
      speed: 0,
      flightHours: 156,
      lastMaintenance: "2024-06-12",
      nextMaintenance: "2024-07-15",
      payload: "200kg Cargo Bay",
      maxRange: "3km",
      maxPayload: "200kg",
      currentMission: null,
      position: { x: 80, y: 20 },
      capabilities: ["Heavy Cargo", "Precision Drop", "Weather Resistant"],
      health: {
        motorTemp: 38,
        gpsSignal: 100,
        communicationStrength: 98,
        sensorCalibration: 95,
        batteryHealth: 78,
        propellerWear: 8,
        overallScore: 89
      },
      maintenance: {
        batteryReplacements: 1,
        propellerReplacements: 0,
        sensorRecalibrations: 2,
        firmwareUpdates: 8,
        lastInspection: "2024-06-10"
      },
      performance: {
        successfulMissions: 28,
        totalMissions: 29,
        averageFlightTime: "22 min",
        maxAltitudeReached: "80m",
        totalDistance: "678 km"
      }
    },
    {
      id: "SWIFT-003",
      variant: "Swift-Emergency",
      type: "Emergency Response",
      status: "Ready",
      battery: 98,
      altitude: 0,
      speed: 0,
      flightHours: 89,
      lastMaintenance: "2024-06-13",
      nextMaintenance: "2024-07-20",
      payload: "Medical Kit + AED",
      maxRange: "8km",
      maxPayload: "5kg",
      currentMission: null,
      position: { x: 50, y: 50 },
      capabilities: ["High Speed", "Medical Equipment", "Emergency Beacon"],
      health: {
        motorTemp: 35,
        gpsSignal: 100,
        communicationStrength: 100,
        sensorCalibration: 100,
        batteryHealth: 98,
        propellerWear: 5,
        overallScore: 98
      },
      maintenance: {
        batteryReplacements: 0,
        propellerReplacements: 0,
        sensorRecalibrations: 1,
        firmwareUpdates: 5,
        lastInspection: "2024-06-12"
      },
      performance: {
        successfulMissions: 18,
        totalMissions: 18,
        averageFlightTime: "15 min",
        maxAltitudeReached: "150m",
        totalDistance: "423 km"
      }
    },
    {
      id: "MULTI-004",
      variant: "Multi-Sensor",
      type: "Advanced Surveillance",
      status: "Maintenance",
      battery: 0,
      altitude: 0,
      speed: 0,
      flightHours: 445,
      lastMaintenance: "2024-06-08",
      nextMaintenance: "2024-06-18",
      payload: "LiDAR + Multispectral",
      maxRange: "6km",
      maxPayload: "8kg",
      currentMission: null,
      position: { x: 75, y: 75 },
      capabilities: ["LiDAR Mapping", "Multispectral Analysis", "3D Reconstruction"],
      health: {
        motorTemp: 0,
        gpsSignal: 0,
        communicationStrength: 0,
        sensorCalibration: 85,
        batteryHealth: 65,
        propellerWear: 35,
        overallScore: 65
      },
      maintenance: {
        batteryReplacements: 3,
        propellerReplacements: 2,
        sensorRecalibrations: 8,
        firmwareUpdates: 15,
        lastInspection: "2024-06-08"
      },
      performance: {
        successfulMissions: 82,
        totalMissions: 85,
        averageFlightTime: "35 min",
        maxAltitudeReached: "180m",
        totalDistance: "2,890 km"
      }
    }
  ];

  const activeMissions = [
    {
      id: "PATROL-001",
      type: "Security Patrol",
      droneId: "SURV-001",
      priority: "High",
      status: "In Progress",
      progress: 65,
      startTime: "14:15:00",
      estimatedCompletion: "15:30:00",
      area: "North Perimeter",
      objective: "Crowd monitoring and security surveillance"
    },
    {
      id: "DELIVERY-002",
      type: "Emergency Medical",
      droneId: null,
      priority: "Critical",
      status: "Pending Assignment",
      progress: 0,
      startTime: null,
      estimatedCompletion: null,
      area: "Section 112",
      objective: "AED delivery to medical emergency"
    },
    {
      id: "LOGISTICS-003",
      type: "Standard Logistics",
      droneId: null,
      priority: "Normal",
      status: "Queued",
      progress: 0,
      startTime: null,
      estimatedCompletion: null,
      area: "Concession Stand C",
      objective: "Supply replenishment"
    }
  ];

  const patrolZones = [
    { id: "zone-1", name: "North Perimeter", status: "Active", droneCount: 1, coverage: 95 },
    { id: "zone-2", name: "Main Entrances", status: "Scheduled", droneCount: 0, coverage: 0 },
    { id: "zone-3", name: "VIP Areas", status: "Active", droneCount: 1, coverage: 87 },
    { id: "zone-4", name: "Parking Areas", status: "Idle", droneCount: 0, coverage: 0 }
  ];

  const systemAlerts = [
    {
      id: "ALERT-001",
      severity: "Critical",
      type: "Emergency Request",
      message: "Medical emergency - AED required at Section 112",
      timestamp: "14:23:15",
      source: "Medical Staff"
    },
    {
      id: "ALERT-002",
      severity: "High", 
      type: "Drone Status",
      message: "CARGO-002 low battery - returning to charging station",
      timestamp: "14:21:30",
      source: "Fleet Management"
    },
    {
      id: "ALERT-003",
      severity: "Moderate",
      type: "Airspace",
      message: "Temporary no-fly zone activated near stage area",
      timestamp: "14:20:45",
      source: "Operations Control"
    }
  ];

  const systemMetrics = {
    fleetUtilization: 67,
    averageResponseTime: "3.2 min",
    successfulMissions: 94.7,
    networkLatency: "12ms",
    dataProcessed: "2.4 TB",
    aiAccuracy: 97.3
  };

  // Drone variants configuration
  const droneVariants = [
    {
      id: "sentinel-patrol",
      name: "Sentinel-Patrol",
      category: "Security & Surveillance",
      maxPayload: "2kg",
      maxRange: "5km",
      flightTime: "45 min",
      capabilities: ["Thermal Imaging", "Night Vision", "AI Object Detection", "Zoom Camera"],
      price: "$15,000",
      inFleet: 1,
      available: 1
    },
    {
      id: "cargo-200",
      name: "Cargo-200",
      category: "Heavy Lift Logistics",
      maxPayload: "200kg",
      maxRange: "3km",
      flightTime: "30 min",
      capabilities: ["Heavy Cargo", "Precision Drop", "Weather Resistant", "Auto-Navigation"],
      price: "$25,000",
      inFleet: 1,
      available: 0
    },
    {
      id: "swift-emergency",
      name: "Swift-Emergency",
      category: "Emergency Response",
      maxPayload: "5kg",
      maxRange: "8km",
      flightTime: "20 min",
      capabilities: ["High Speed", "Medical Equipment", "Emergency Beacon", "First Aid Kit"],
      price: "$18,000",
      inFleet: 1,
      available: 1
    },
    {
      id: "multi-sensor",
      name: "Multi-Sensor",
      category: "Advanced Surveillance",
      maxPayload: "8kg",
      maxRange: "6km",
      flightTime: "40 min",
      capabilities: ["LiDAR Mapping", "Multispectral Analysis", "3D Reconstruction", "AI Analytics"],
      price: "$35,000",
      inFleet: 1,
      available: 0
    }
  ];

  const toggleLayer = (layerId: string) => {
    setActiveLayers(prev => ({
      ...prev,
      [layerId]: !prev[layerId]
    }));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-red-600 text-white";
      case "High": return "bg-orange-500 text-white";
      case "Moderate": return "bg-yellow-500 text-white";
      default: return "bg-blue-500 text-white";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active Patrol": return "text-green-600 bg-green-50";
      case "Ready": return "text-blue-600 bg-blue-50";
      case "Charging": return "text-yellow-600 bg-yellow-50";
      case "Maintenance": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const handleDroneCommand = (command: string, droneId?: string) => {
    switch (command) {
      case "launch":
        toast.success(`Drone ${droneId} launched successfully`);
        break;
      case "return":
        toast.info(`Drone ${droneId} returning to base`);
        break;
      case "hold":
        toast.info(`Drone ${droneId} holding position`);
        break;
      case "emergency-land":
        toast.warning(`Emergency landing initiated for drone ${droneId}`);
        break;
      case "launch-all":
        toast.success("All available drones launched");
        break;
      case "return-all":
        toast.info("All drones returning to base");
        break;
      case "emergency-land-all":
        toast.warning("Emergency landing initiated for all drones");
        break;
      case "auto-charge":
        toast.success("Auto charge mode activated");
        break;
      case "schedule-maintenance":
        toast.success(`Maintenance scheduled for drone ${droneId}`);
        break;
      case "run-diagnostics":
        toast.info(`Running diagnostics on drone ${droneId}`);
        break;
      case "update-firmware":
        toast.info(`Firmware update initiated for drone ${droneId}`);
        break;
      default:
        toast.success(`Command executed: ${command}`);
    }
  };

  const handleMissionAction = (action: string, missionId?: string) => {
    switch (action) {
      case "assign-drone":
        toast.success(`Drone assigned to mission ${missionId}`);
        break;
      case "abort-mission":
        toast.warning(`Mission ${missionId} aborted`);
        break;
      case "priority-boost":
        toast.info(`Mission ${missionId} priority increased`);
        break;
      case "patrol-perimeter":
        toast.success("Perimeter patrol deployed");
        break;
      case "crowd-monitoring":
        toast.success("Crowd monitoring activated");
        break;
      case "emergency-response":
        toast.warning("Emergency response mode activated");
        break;
      default:
        toast.success(`Mission action executed: ${action}`);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Enhanced Header - Fixed */}
      <div className="flex-none p-6 border-b bg-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-bold flex items-center gap-3">
                <Command className="text-blue-600" size={28} />
                Drone Operations Command & Control Center
              </h1>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">
              Centralized command interface for comprehensive drone fleet management and mission control
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => setEmergencyMode(!emergencyMode)}
              className={`${emergencyMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              {emergencyMode ? 'EMERGENCY ACTIVE' : 'EMERGENCY MODE'}
            </Button>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Brain className="w-3 h-3 mr-1" />
              AI-Powered
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Monitor className="w-3 h-3 mr-1" />
              4 Drones Fleet
            </Badge>
          </div>
        </div>
      </div>

      {/* System Status Bar - Fixed */}
      <div className="flex-none p-4 bg-gray-50">
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">System Online</span>
              </div>
              <p className="text-xl font-bold text-green-600">100%</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">Active Missions</span>
              </div>
              <p className="text-xl font-bold text-blue-600">{activeMissions.filter(m => m.status === "In Progress").length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Battery className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">Fleet Ready</span>
              </div>
              <p className="text-xl font-bold text-green-600">{droneFleet.filter(d => d.status === "Ready" || d.status === "Active Patrol").length}/{droneFleet.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium">Active Alerts</span>
              </div>
              <p className="text-xl font-bold text-orange-600">{systemAlerts.length}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content Area - Scrollable */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full p-4">
          {/* Main Command Interface */}
          <div className="grid gap-4 lg:grid-cols-4 h-full">
            {/* Central 3D Viewport */}
            <div className="lg:col-span-3">
              <Card className="h-full flex flex-col">
                <CardHeader className="flex-none">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Maximize2 className="w-5 h-5" />
                      Interactive 3D Digital Twin - Command View
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button 
                        variant={viewMode === "3d-overview" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("3d-overview")}
                      >
                        Overview
                      </Button>
                      <Button 
                        variant={viewMode === "tactical" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("tactical")}
                      >
                        Tactical
                      </Button>
                      <Button 
                        variant={viewMode === "drone-cam" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("drone-cam")}
                      >
                        Drone View
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  {/* Enhanced 3D Visualization */}
                  <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-lg border flex items-center justify-center overflow-hidden flex-1">
                    <div className="text-center space-y-3">
                      <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto">
                        <Maximize2 className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">3D Stadium Command Interface</h3>
                        <p className="text-sm text-blue-200 max-w-md">
                          Interactive digital twin with real-time drone tracking, mission overlays, and AI-powered situational awareness
                        </p>
                      </div>
                      <div className="flex gap-2 justify-center flex-wrap">
                        <Badge variant="outline" className="bg-blue-600/20 text-blue-200 border-blue-400">Real-time Tracking</Badge>
                        <Badge variant="outline" className="bg-green-600/20 text-green-200 border-green-400">Mission Overlay</Badge>
                        <Badge variant="outline" className="bg-purple-600/20 text-purple-200 border-purple-400">AI Analytics</Badge>
                      </div>
                    </div>

                    {droneFleet.map((drone) => (
                      <div
                        key={drone.id}
                        className={`absolute w-3 h-3 rounded-full border-2 border-white ${
                          drone.status === "Active Patrol" ? "bg-green-500 animate-pulse" :
                          drone.status === "Ready" ? "bg-blue-500" :
                          drone.status === "Charging" ? "bg-yellow-500" :
                          "bg-red-500"
                        } cursor-pointer hover:scale-150 transition-transform`}
                        style={{
                          left: `${drone.position.x}%`,
                          top: `${drone.position.y}%`,
                        }}
                        onClick={() => setSelectedDrone(drone.id)}
                        title={`${drone.id} - ${drone.variant} - ${drone.status}`}
                      >
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black bg-opacity-75 px-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                          {drone.id}
                        </div>
                      </div>
                    ))}

                    <div className="absolute top-3 left-3 bg-black bg-opacity-75 text-white p-2 rounded text-xs">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Active Patrol
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Ready/Standby
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        Charging
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        Maintenance
                      </div>
                    </div>
                  </div>

                  {/* Data Layer Controls */}
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {Object.entries(activeLayers).map(([layerId, isActive]) => (
                      <Button
                        key={layerId}
                        variant={isActive ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleLayer(layerId)}
                        className="text-xs"
                      >
                        <Layers className="w-3 h-3 mr-1" />
                        {layerId.split(/(?=[A-Z])/).join(' ')}
                      </Button>
                    ))}
                  </div>

                  {/* Live Stream Window (when drone selected) */}
                  {selectedDrone && (
                    <div className="mt-3 bg-black rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-semibold text-sm">Live Feed - {selectedDrone}</h4>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Camera className="w-3 h-3 mr-1" />
                            Thermal
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3 mr-1" />
                            Night Vision
                          </Button>
                        </div>
                      </div>
                      <div className="bg-gray-800 rounded h-32 flex items-center justify-center">
                        <div className="text-center text-gray-400">
                          <Camera className="w-6 h-6 mx-auto mb-1" />
                          <p className="text-sm">Live video feed from {selectedDrone}</p>
                          <p className="text-xs">1920x1080 @ 30fps</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Command Sidebar - Scrollable */}
            <div className="space-y-4">
              <ScrollArea className="h-full">
                {/* Fleet Status */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Target className="w-5 h-5" />
                      Fleet Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 gap-3">
                      {droneFleet.map((drone) => (
                        <div 
                          key={drone.id} 
                          className={`p-3 rounded border cursor-pointer transition-colors ${
                            selectedDrone === drone.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                          }`}
                          onClick={() => setSelectedDrone(drone.id)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-sm">{drone.id}</span>
                            <Badge className={getStatusColor(drone.status)} variant="secondary">
                              {drone.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{drone.variant}</p>
                          <div className="grid grid-cols-2 gap-1 text-xs mb-2">
                            <div>Battery: {drone.battery}%</div>
                            <div>Alt: {drone.altitude}m</div>
                            <div>Range: {drone.maxRange}</div>
                            <div>Payload: {drone.maxPayload}</div>
                          </div>
                          <Progress value={drone.battery} className="h-1 mb-2" />
                          <div className="flex gap-1">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs flex-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDroneCommand("launch", drone.id);
                              }}
                            >
                              <Play className="w-3 h-3 mr-1" />
                              Launch
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs flex-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDroneCommand("return", drone.id);
                              }}
                            >
                              <Navigation className="w-3 h-3 mr-1" />
                              RTB
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Active Missions */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Activity className="w-5 h-5" />
                      Active Missions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {activeMissions.map((mission) => (
                      <div key={mission.id} className="p-3 rounded border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-sm">{mission.id}</span>
                          <Badge className={
                            mission.priority === "Critical" ? "bg-red-600 text-white" :
                            mission.priority === "High" ? "bg-orange-500 text-white" :
                            "bg-blue-500 text-white"
                          }>
                            {mission.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{mission.type}</p>
                        <p className="text-xs mb-2">{mission.objective}</p>
                        <div className="text-xs text-gray-500 mb-2">
                          Area: {mission.area}
                          {mission.droneId && <div>Drone: {mission.droneId}</div>}
                        </div>
                        {mission.status === "In Progress" && (
                          <Progress value={mission.progress} className="h-1 mb-2" />
                        )}
                        <div className="flex gap-1">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs flex-1"
                            onClick={() => handleMissionAction("assign-drone", mission.id)}
                          >
                            <Target className="w-3 h-3 mr-1" />
                            Assign
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs flex-1"
                            onClick={() => handleMissionAction("abort-mission", mission.id)}
                          >
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Abort
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* System Alerts */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Bell className="w-5 h-5" />
                      System Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {systemAlerts.map((alert) => (
                      <div key={alert.id} className="p-3 rounded border-l-4 border-orange-500 bg-orange-50">
                        <div className="flex items-center justify-between mb-1">
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                          <span className="text-xs text-gray-500">{alert.timestamp}</span>
                        </div>
                        <h5 className="font-semibold text-sm">{alert.type}</h5>
                        <p className="text-xs text-gray-600">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-1">Source: {alert.source}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Command Tabs - Fixed Bottom */}
      <div className="flex-none border-t bg-white">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="command-overview" className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              Command
            </TabsTrigger>
            <TabsTrigger value="fleet-management" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Fleet Admin
            </TabsTrigger>
            <TabsTrigger value="mission-planning" className="flex items-center gap-2">
              <Navigation className="w-4 h-4" />
              Mission Planning
            </TabsTrigger>
            <TabsTrigger value="patrol-zones" className="flex items-center gap-2">
              <Map className="w-4 h-4" />
              Patrol Zones
            </TabsTrigger>
            <TabsTrigger value="live-control" className="flex items-center gap-2">
              <Command className="w-4 h-4" />
              Live Control
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="command-overview">
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">Fleet Utilization</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{systemMetrics.fleetUtilization}%</div>
                    <Progress value={systemMetrics.fleetUtilization} className="h-2 mt-2" />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">Avg Response Time</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">{systemMetrics.averageResponseTime}</div>
                    <div className="text-xs text-muted-foreground mt-1">24h average</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium">Mission Success</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">{systemMetrics.successfulMissions}%</div>
                    <div className="text-xs text-muted-foreground mt-1">Last 30 days</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium">AI Accuracy</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-600">{systemMetrics.aiAccuracy}%</div>
                    <div className="text-xs text-muted-foreground mt-1">Real-time</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Command className="w-5 h-5" />
                      Fleet Command Center
                    </CardTitle>
                    <CardDescription>
                      Real-time fleet control and mission coordination
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Button className="w-full justify-start" onClick={() => handleDroneCommand("launch-all")}>
                        <Play className="w-4 h-4 mr-2" />
                        Launch All Available
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => handleDroneCommand("return-all")}>
                        <Navigation className="w-4 h-4 mr-2" />
                        Return All to Base
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => handleDroneCommand("emergency-land-all")}>
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Emergency Land All
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => handleDroneCommand("auto-charge")}>
                        <Battery className="w-4 h-4 mr-2" />
                        Auto Charge Mode
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Quick Deployment</h4>
                      <div className="grid grid-cols-1 gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleMissionAction("patrol-perimeter")}>
                          <Shield className="w-3 h-3 mr-2" />
                          Deploy Perimeter Patrol
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleMissionAction("crowd-monitoring")}>
                          <Users className="w-3 h-3 mr-2" />
                          Activate Crowd Monitoring
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleMissionAction("emergency-response")}>
                          <AlertTriangle className="w-3 h-3 mr-2" />
                          Emergency Response Mode
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      System Analytics
                    </CardTitle>
                    <CardDescription>
                      Real-time performance and operational insights
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Network Latency</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          {systemMetrics.networkLatency}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Data Processed (24h)</span>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          {systemMetrics.dataProcessed}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Active Connections</span>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700">
                          {droneFleet.length + 12} Devices
                        </Badge>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">System Health</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Communication Systems</span>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs">Optimal</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs">AI Processing</span>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs">Optimal</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Data Storage</span>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span className="text-xs">75% Used</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="w-5 h-5" />
                    Live Mission Operations
                  </CardTitle>
                  <CardDescription>
                    Real-time mission tracking and fleet coordination dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 lg:grid-cols-3">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        <Play className="w-4 h-4 text-green-600" />
                        Active Missions ({activeMissions.filter(m => m.status === "In Progress").length})
                      </h4>
                      {activeMissions.filter(m => m.status === "In Progress").map((mission) => (
                        <div key={mission.id} className="p-3 bg-green-50 border border-green-200 rounded">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{mission.id}</span>
                            <Badge variant="outline">{mission.progress}%</Badge>
                          </div>
                          <p className="text-xs text-gray-600">{mission.objective}</p>
                          <Progress value={mission.progress} className="h-1 mt-2" />
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-600" />
                        Pending Queue ({activeMissions.filter(m => m.status === "Pending Assignment" || m.status === "Queued").length})
                      </h4>
                      {activeMissions.filter(m => m.status === "Pending Assignment" || m.status === "Queued").map((mission) => (
                        <div key={mission.id} className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{mission.id}</span>
                            <Badge className={
                              mission.priority === "Critical" ? "bg-red-600 text-white" :
                              mission.priority === "High" ? "bg-orange-500 text-white" :
                              "bg-blue-500 text-white"
                            }>
                              {mission.priority}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600">{mission.objective}</p>
                          <Button size="sm" className="w-full mt-2" onClick={() => handleMissionAction("assign-drone", mission.id)}>
                            Assign Drone
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        <Target className="w-4 h-4 text-blue-600" />
                        Fleet Status ({droneFleet.filter(d => d.status === "Ready" || d.status === "Active Patrol").length} Ready)
                      </h4>
                      {droneFleet.filter(d => d.status === "Ready" || d.status === "Active Patrol").slice(0, 3).map((drone) => (
                        <div key={drone.id} className="p-3 bg-blue-50 border border-blue-200 rounded">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{drone.id}</span>
                            <Badge className={getStatusColor(drone.status)}>
                              {drone.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{drone.variant}</p>
                          <div className="flex items-center gap-2 text-xs">
                            <Battery className="w-3 h-3" />
                            <span>{drone.battery}%</span>
                            <Progress value={drone.battery} className="h-1 flex-1" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="fleet-management">
            <div className="space-y-6">
              {/* Fleet Administration Hub Header */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-6 h-6 text-blue-600" />
                    Fleet Administration Hub
                  </CardTitle>
                  <CardDescription>
                    Comprehensive drone inventory, health monitoring, and variant configuration with predictive maintenance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium">Total Fleet</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">{droneFleet.length}</div>
                        <div className="text-xs text-muted-foreground">Active Drones</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium">Operational</span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">{droneFleet.filter(d => d.status !== "Maintenance").length}</div>
                        <div className="text-xs text-muted-foreground">Ready for missions</div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Wrench className="w-4 h-4 text-orange-600" />
                          <span className="text-sm font-medium">Maintenance</span>
                        </div>
                        <div className="text-2xl font-bold text-orange-600">{droneFleet.filter(d => d.status === "Maintenance").length}</div>
                        <div className="text-xs text-muted-foreground">In service</div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium">Avg Health</span>
                        </div>
                        <div className="text-2xl font-bold text-purple-600">
                          {Math.round(droneFleet.reduce((acc, drone) => acc + drone.health.overallScore, 0) / droneFleet.length)}%
                        </div>
                        <div className="text-xs text-muted-foreground">Fleet health score</div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              {/* Comprehensive Drone Inventory Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HardDrive className="w-5 h-5" />
                    Comprehensive Drone Inventory
                  </CardTitle>
                  <CardDescription>
                    Detailed fleet overview with health metrics, maintenance status, and performance data
                  </CardDescription>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Drone
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Drone ID</TableHead>
                        <TableHead>Variant</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Battery</TableHead>
                        <TableHead>Health Score</TableHead>
                        <TableHead>Flight Hours</TableHead>
                        <TableHead>Last Maintenance</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {droneFleet.map((drone) => (
                        <TableRow key={drone.id} className="cursor-pointer hover:bg-gray-50">
                          <TableCell className="font-semibold">{drone.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{drone.variant}</div>
                              <div className="text-xs text-gray-500">{drone.type}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(drone.status)} variant="secondary">
                              {drone.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Battery className="w-4 h-4" />
                              <span>{drone.battery}%</span>
                              <Progress value={drone.battery} className="h-1 w-16" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`font-semibold ${getHealthScoreColor(drone.health.overallScore)}`}>
                                {drone.health.overallScore}%
                              </div>
                              {drone.health.overallScore >= 90 && <CheckCircle className="w-4 h-4 text-green-600" />}
                              {drone.health.overallScore < 70 && <AlertCircle className="w-4 h-4 text-red-600" />}
                            </div>
                          </TableCell>
                          <TableCell>{drone.flightHours}h</TableCell>
                          <TableCell>
                            <div className="text-sm">{drone.lastMaintenance}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="outline" size="sm" onClick={() => setSelectedDrone(drone.id)}>
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleDroneCommand("run-diagnostics", drone.id)}>
                                <Activity className="w-3 h-3" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleDroneCommand("schedule-maintenance", drone.id)}>
                                <Wrench className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Detailed Health Monitoring */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Advanced Health Monitoring & Diagnostics
                  </CardTitle>
                  <CardDescription>
                    Real-time health metrics and predictive maintenance indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 lg:grid-cols-2">
                    {droneFleet.map((drone) => (
                      <Card key={drone.id} className="border-l-4 border-l-blue-500">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{drone.id}</CardTitle>
                            <Badge className={getStatusColor(drone.status)} variant="secondary">
                              {drone.status}
                            </Badge>
                          </div>
                          <CardDescription>{drone.variant} - {drone.type}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* Health Metrics */}
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm">Health Metrics</h4>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="flex items-center justify-between">
                                <span>Motor Temp</span>
                                <div className="flex items-center gap-1">
                                  <Thermometer className="w-3 h-3" />
                                  <span>{drone.health.motorTemp}°C</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>GPS Signal</span>
                                <div className="flex items-center gap-1">
                                  <Satellite className="w-3 h-3" />
                                  <span>{drone.health.gpsSignal}%</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Communication</span>
                                <div className="flex items-center gap-1">
                                  <Router className="w-3 h-3" />
                                  <span>{drone.health.communicationStrength}%</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Sensors</span>
                                <div className="flex items-center gap-1">
                                  <Cpu className="w-3 h-3" />
                                  <span>{drone.health.sensorCalibration}%</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Battery Health</span>
                                <div className="flex items-center gap-1">
                                  <Battery className="w-3 h-3" />
                                  <span>{drone.health.batteryHealth}%</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Propeller Wear</span>
                                <div className="flex items-center gap-1">
                                  <RotateCw className="w-3 h-3" />
                                  <span>{drone.health.propellerWear}%</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Overall Health Score */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-sm">Overall Health Score</span>
                              <span className={`font-bold text-lg ${getHealthScoreColor(drone.health.overallScore)}`}>
                                {drone.health.overallScore}%
                              </span>
                            </div>
                            <Progress value={drone.health.overallScore} className="h-2" />
                          </div>

                          {/* Maintenance Info */}
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm">Maintenance Status</h4>
                            <div className="text-xs space-y-1">
                              <div className="flex justify-between">
                                <span>Last Maintenance:</span>
                                <span>{drone.lastMaintenance}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Next Scheduled:</span>
                                <span>{drone.nextMaintenance}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Battery Replacements:</span>
                                <span>{drone.maintenance.batteryReplacements}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Firmware Version:</span>
                                <span>v2.{drone.maintenance.firmwareUpdates}.0</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => handleDroneCommand("run-diagnostics", drone.id)}
                            >
                              <Activity className="w-3 h-3 mr-1" />
                              Diagnostics
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => handleDroneCommand("schedule-maintenance", drone.id)}
                            >
                              <Calendar className="w-3 h-3 mr-1" />
                              Schedule
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => handleDroneCommand("update-firmware", drone.id)}
                            >
                              <Download className="w-3 h-3 mr-1" />
                              Update
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Drone Variant Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Drone Variant Configuration
                  </CardTitle>
                  <CardDescription>
                    Manage drone variants, capabilities, and fleet composition
                  </CardDescription>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Variant
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Selected
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 lg:grid-cols-2">
                    {droneVariants.map((variant) => (
                      <Card key={variant.id} className="border">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{variant.name}</CardTitle>
                            <Badge variant="outline">{variant.category}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* Specifications */}
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm">Specifications</h4>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="flex justify-between">
                                <span>Max Payload:</span>
                                <span className="font-medium">{variant.maxPayload}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Max Range:</span>
                                <span className="font-medium">{variant.maxRange}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Flight Time:</span>
                                <span className="font-medium">{variant.flightTime}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Price:</span>
                                <span className="font-medium">{variant.price}</span>
                              </div>
                            </div>
                          </div>

                          {/* Capabilities */}
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm">Capabilities</h4>
                            <div className="flex flex-wrap gap-1">
                              {variant.capabilities.map((capability) => (
                                <Badge key={capability} variant="secondary" className="text-xs">
                                  {capability}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Fleet Status */}
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm">Fleet Status</h4>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="flex justify-between">
                                <span>In Fleet:</span>
                                <span className="font-medium">{variant.inFleet}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Available:</span>
                                <span className="font-medium text-green-600">{variant.available}</span>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Edit className="w-3 h-3 mr-1" />
                              Configure
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Plus className="w-3 h-3 mr-1" />
                              Add Unit
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Predictive Maintenance Dashboard */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Predictive Maintenance Intelligence
                  </CardTitle>
                  <CardDescription>
                    AI-powered maintenance forecasting and optimization recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 lg:grid-cols-3">
                    {/* Maintenance Alerts */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-orange-600" />
                          Maintenance Alerts
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="p-2 bg-red-50 border border-red-200 rounded text-xs">
                          <div className="font-semibold text-red-700">MULTI-004</div>
                          <div className="text-red-600">Battery replacement required (65% health)</div>
                          <div className="text-red-500 text-xs">Due: Now</div>
                        </div>
                        <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
                          <div className="font-semibold text-yellow-700">CARGO-002</div>
                          <div className="text-yellow-600">Battery health declining (78%)</div>
                          <div className="text-yellow-500 text-xs">Due: 2 weeks</div>
                        </div>
                        <div className="p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                          <div className="font-semibold text-blue-700">SURV-001</div>
                          <div className="text-blue-600">Routine maintenance due</div>
                          <div className="text-blue-500 text-xs">Due: 1 month</div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Performance Trends */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-blue-600" />
                          Performance Trends
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Fleet Availability</span>
                            <span className="font-medium">87%</span>
                          </div>
                          <Progress value={87} className="h-1" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Mission Success Rate</span>
                            <span className="font-medium">96%</span>
                          </div>
                          <Progress value={96} className="h-1" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Maintenance Efficiency</span>
                            <span className="font-medium">92%</span>
                          </div>
                          <Progress value={92} className="h-1" />
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          Trends based on 30-day rolling average
                        </div>
                      </CardContent>
                    </Card>

                    {/* Cost Analysis */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-green-600" />
                          Cost Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-xs space-y-2">
                          <div className="flex justify-between">
                            <span>Monthly Maintenance:</span>
                            <span className="font-medium">$2,450</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Predicted Savings:</span>
                            <span className="font-medium text-green-600">$890</span>
                          </div>
                          <div className="flex justify-between">
                            <span>ROI Improvement:</span>
                            <span className="font-medium text-green-600">+23%</span>
                          </div>
                        </div>
                        <Separator />
                        <div className="text-xs">
                          <div className="font-semibold mb-1">Optimization Recommendations:</div>
                          <ul className="space-y-1 text-gray-600">
                            <li>• Batch maintenance for CARGO variants</li>
                            <li>• Proactive battery replacement schedule</li>
                            <li>• Sensor recalibration automation</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mission-planning">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="w-5 h-5" />
                  Intelligent Mission Planning & Automated Patrols
                </CardTitle>
                <CardDescription>
                  AI-powered mission creation with automated patrol configuration and airspace management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 rounded-lg border-2 border-dashed border-gray-300 h-64 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-600/10 rounded-full flex items-center justify-center mx-auto">
                      <Navigation className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">Mission Planning Wizard</h3>
                      <p className="text-sm text-gray-500 max-w-md">
                        Intelligent mission creation with AI-powered route optimization and automated conflict resolution
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patrol-zones">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="w-5 h-5" />
                  Patrol Zone Management
                </CardTitle>
                <CardDescription>
                  Configure and monitor automated patrol areas with intelligent coverage optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patrolZones.map((zone) => (
                    <div key={zone.id} className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{zone.name}</h4>
                        <Badge className={
                          zone.status === "Active" ? "bg-green-600 text-white" :
                          zone.status === "Scheduled" ? "bg-blue-500 text-white" :
                          "bg-gray-500 text-white"
                        }>
                          {zone.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Assigned Drones:</span>
                          <div className="font-semibold">{zone.droneCount}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Coverage:</span>
                          <div className="font-semibold">{zone.coverage}%</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Status:</span>
                          <div className="font-semibold">{zone.status}</div>
                        </div>
                      </div>
                      <Progress value={zone.coverage} className="h-2 mt-2" />
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3 mr-1" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm">
                          <Play className="w-3 h-3 mr-1" />
                          Activate
                        </Button>
                        <Button variant="outline" size="sm">
                          <Map className="w-3 h-3 mr-1" />
                          View Zone
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="live-control">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Command className="w-5 h-5" />
                  Real-time Command & Control Interface
                </CardTitle>
                <CardDescription>
                  Direct drone control with live telemetry and multi-sensor feed monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50 rounded-lg border-2 border-dashed border-gray-300 h-64 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-indigo-600/10 rounded-full flex items-center justify-center mx-auto">
                      <Command className="w-8 h-8 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">Live Command Interface</h3>
                      <p className="text-sm text-gray-500 max-w-md">
                        Direct drone control with real-time telemetry, live video feeds, and emergency override capabilities
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Performance Analytics & Mission Intelligence
                </CardTitle>
                <CardDescription>
                  Comprehensive analytics for fleet optimization and operational intelligence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 rounded-lg border-2 border-dashed border-gray-300 h-64 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-orange-600/10 rounded-full flex items-center justify-center mx-auto">
                      <TrendingUp className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">Mission Analytics Engine</h3>
                      <p className="text-sm text-gray-500 max-w-md">
                        Advanced analytics for fleet performance, mission success rates, and predictive maintenance insights
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DroneCrowdManagement;
