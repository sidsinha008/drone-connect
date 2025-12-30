
import { useState, useEffect } from "react";
import { 
  Plane, 
  Battery, 
  Gauge, 
  Calendar, 
  MapPin, 
  Camera, 
  Video, 
  Play, 
  Pause, 
  Square, 
  Home, 
  AlertTriangle, 
  Users, 
  Settings, 
  Eye, 
  EyeOff, 
  Zap,
  Wind,
  Thermometer,
  Navigation,
  Target,
  Shield,
  FileImage,
  BarChart3,
  Clock,
  Wifi,
  WifiOff,
  Bell,
  Filter,
  Grid3X3,
  Route,
  ChevronDown,
  ChevronUp,
  Maximize2,
  RotateCcw,
  Radio,
  Satellite
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Mock data for the enhanced dashboard
const mockFleetData = {
  activeDrones: 3,
  totalDrones: 5,
  onlinePilots: 2,
  activeMissions: 1,
  weatherConditions: {
    windSpeed: 12,
    windDirection: "NE",
    temperature: 28,
    humidity: 65,
    visibility: "Clear"
  },
  drones: [
    {
      id: "D-001",
      name: "Sky Guardian Alpha",
      status: "active",
      mission: "Security Patrol",
      position: { lat: 13.0827, lng: 80.2707 },
      altitude: 120,
      battery: [85, 78], // Multi-battery drone
      speed: 15,
      heading: 45,
      flightTime: "00:23:45",
      pilot: "Rajesh Kumar",
      videoFeed: "HD Active",
      thermalFeed: "Active",
      signalStrength: 95
    },
    {
      id: "D-002", 
      name: "Urban Scout Beta",
      status: "returning",
      mission: "Traffic Monitoring",
      position: { lat: 13.0878, lng: 80.2785 },
      altitude: 80,
      battery: [45],
      speed: 22,
      heading: 180,
      flightTime: "01:15:22",
      pilot: "Priya Sharma",
      videoFeed: "HD Active",
      thermalFeed: "Inactive",
      signalStrength: 78
    },
    {
      id: "D-003",
      name: "Cargo Hawk",
      status: "idle",
      mission: "Standby",
      position: { lat: 13.0625, lng: 80.2574 },
      altitude: 0,
      battery: [92, 88, 85], // Triple battery system
      speed: 0,
      heading: 0,
      flightTime: "00:00:00",
      pilot: "Unassigned",
      videoFeed: "Inactive",
      thermalFeed: "Inactive",
      signalStrength: 100
    }
  ],
  recentMedia: [
    { id: 1, type: "image", thumbnail: "/placeholder.svg", timestamp: "14:23", location: "Marina Beach", size: "4.2MB" },
    { id: 2, type: "video", thumbnail: "/placeholder.svg", timestamp: "14:15", location: "T Nagar", size: "156MB" },
    { id: 3, type: "thermal", thumbnail: "/placeholder.svg", timestamp: "14:08", location: "Central Station", size: "2.8MB" }
  ],
  alerts: [
    { id: 1, type: "warning", message: "D-002 Battery Low - RTH Recommended", timestamp: "2 min ago", severity: "medium" },
    { id: 2, type: "info", message: "Mission 'Security Patrol' 75% Complete", timestamp: "5 min ago", severity: "low" },
    { id: 3, type: "weather", message: "Wind Speed Increasing - Monitor Conditions", timestamp: "8 min ago", severity: "medium" }
  ]
};

const ConnectedDroneDashboard = () => {
  const [selectedDrone, setSelectedDrone] = useState("D-001");
  const [activeVideoFeed, setActiveVideoFeed] = useState("hd");
  const [mapView, setMapView] = useState("2d");
  const [showAirspace, setShowAirspace] = useState(true);
  const [alertsExpanded, setAlertsExpanded] = useState(true);

  const activeDrone = mockFleetData.drones.find(d => d.id === selectedDrone);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "returning": return "bg-blue-500";
      case "warning": return "bg-yellow-500";
      case "critical": return "bg-red-500";
      case "idle": return "bg-gray-400";
      default: return "bg-gray-400";
    }
  };

  const getSignalStrength = (strength: number) => {
    if (strength >= 80) return "text-green-500";
    if (strength >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white p-4 rounded-lg shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Connected Drone Operations Center</h1>
            <p className="text-blue-100">Real-time Command & Control Dashboard</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Plane size={16} />
              <span>{mockFleetData.activeDrones}/{mockFleetData.totalDrones} Active</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>{mockFleetData.onlinePilots} Pilots Online</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind size={16} />
              <span>{mockFleetData.weatherConditions.windSpeed} km/h {mockFleetData.weatherConditions.windDirection}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Primary Map Display - Spans 2 columns on XL screens */}
        <div className="xl:col-span-2">
          <Card className="h-[600px]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  Live Operations Map
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant={mapView === "2d" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMapView("2d")}
                  >
                    2D
                  </Button>
                  <Button
                    variant={mapView === "3d" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMapView("3d")}
                  >
                    3D
                  </Button>
                  <Button
                    variant={showAirspace ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowAirspace(!showAirspace)}
                  >
                    <Shield size={14} className="mr-1" />
                    Airspace
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="relative bg-slate-100 rounded-lg h-full flex items-center justify-center overflow-hidden">
                {/* Simulated Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100"></div>
                
                {/* Airspace Overlays */}
                {showAirspace && (
                  <>
                    <div className="absolute top-16 left-16 w-24 h-24 bg-red-500/20 border-2 border-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-red-700">NFZ</span>
                    </div>
                    <div className="absolute bottom-20 right-20 w-32 h-20 bg-orange-500/20 border-2 border-orange-500 border-dashed rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-orange-700">TFR</span>
                    </div>
                  </>
                )}
                
                {/* Drone Positions */}
                {mockFleetData.drones.map((drone, index) => (
                  <div
                    key={drone.id}
                    className={cn(
                      "absolute w-10 h-10 rounded-full border-2 border-white shadow-lg cursor-pointer transition-all hover:scale-110",
                      getStatusColor(drone.status),
                      selectedDrone === drone.id && "ring-4 ring-blue-300"
                    )}
                    style={{
                      top: `${20 + index * 25}%`,
                      left: `${30 + index * 20}%`
                    }}
                    onClick={() => setSelectedDrone(drone.id)}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <Plane size={16} className="text-white" />
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium bg-white px-1 rounded shadow">
                      {drone.id}
                    </div>
                  </div>
                ))}
                
                <div className="text-center text-muted-foreground">
                  <MapPin size={48} className="mx-auto mb-2 opacity-50" />
                  <p className="text-lg font-medium">Live Chennai Operations Map</p>
                  <p className="text-sm">Click drone icons to select • Toggle airspace view</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Telemetry Panel */}
        <div className="space-y-6">
          
          {/* Selected Drone Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Radio className="h-4 w-4 text-green-500" />
                  {activeDrone?.name}
                </span>
                <div className={cn("w-3 h-3 rounded-full", getStatusColor(activeDrone?.status || "idle"))}></div>
              </CardTitle>
              <CardDescription>{activeDrone?.mission} • Pilot: {activeDrone?.pilot}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Battery Status */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Battery Status</span>
                  <div className={cn("flex items-center gap-1", getSignalStrength(activeDrone?.signalStrength || 0))}>
                    <Wifi size={12} />
                    <span className="text-xs">{activeDrone?.signalStrength}%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {activeDrone?.battery.map((level, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Battery size={16} className={level < 30 ? "text-red-500" : level < 60 ? "text-yellow-500" : "text-green-500"} />
                      <Progress value={level} className="flex-1 h-2" />
                      <span className="text-xs w-10">{level}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flight Metrics */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Altitude</div>
                  <div className="font-semibold">{activeDrone?.altitude}m</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Speed</div>
                  <div className="font-semibold">{activeDrone?.speed} km/h</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Heading</div>
                  <div className="font-semibold">{activeDrone?.heading}°</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Flight Time</div>
                  <div className="font-semibold">{activeDrone?.flightTime}</div>
                </div>
              </div>

              {/* Quick Controls */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Home size={12} />
                  RTH
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Square size={12} />
                  Land
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Pause size={12} />
                  Pause
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Target size={12} />
                  Track
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Weather Conditions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-blue-500" />
                Environmental
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Wind size={14} className="text-blue-500" />
                  <div>
                    <div className="font-medium">{mockFleetData.weatherConditions.windSpeed} km/h</div>
                    <div className="text-muted-foreground text-xs">{mockFleetData.weatherConditions.windDirection}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Thermometer size={14} className="text-orange-500" />
                  <div>
                    <div className="font-medium">{mockFleetData.weatherConditions.temperature}°C</div>
                    <div className="text-muted-foreground text-xs">Clear</div>
                  </div>
                </div>
              </div>
              <Alert className="mt-3 border-yellow-200 bg-yellow-50">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800 text-xs">
                  Wind conditions approaching limit. Monitor closely.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Video Feeds & Controls */}
        <div className="space-y-6">
          
          {/* Live Video Feeds */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-4 w-4 text-green-500" />
                  Live Feeds
                </CardTitle>
                <div className="flex items-center gap-1">
                  <Button
                    variant={activeVideoFeed === "hd" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveVideoFeed("hd")}
                  >
                    HD
                  </Button>
                  <Button
                    variant={activeVideoFeed === "thermal" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveVideoFeed("thermal")}
                  >
                    Thermal
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Primary Feed */}
                <div className="relative bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
                  <div className="text-center text-white">
                    <Camera size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">{activeVideoFeed === "hd" ? "HD Camera Feed" : "Thermal Feed"}</p>
                    <p className="text-xs opacity-75">1920x1080 • 30 FPS</p>
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Badge variant="secondary" className="text-xs">LIVE</Badge>
                    <Badge variant="outline" className="text-xs">{activeDrone?.id}</Badge>
                  </div>
                </div>
                
                {/* Feed Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <RotateCcw size={12} className="mr-1" />
                      Record
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileImage size={12} className="mr-1" />
                      Capture
                    </Button>
                  </div>
                  <Button variant="outline" size="sm">
                    <Maximize2 size={12} className="mr-1" />
                    Fullscreen
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Media */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <FileImage className="h-4 w-4 text-purple-500" />
                Recent Media
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockFleetData.recentMedia.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer">
                    <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                      {item.type === "video" ? <Video size={16} /> : <Camera size={16} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{item.location}</div>
                      <div className="text-xs text-muted-foreground">{item.timestamp} • {item.size}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section - Alerts and Fleet Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Alerts & Notifications */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-orange-500" />
                Live Alerts & Notifications
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAlertsExpanded(!alertsExpanded)}
              >
                {alertsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
            </div>
          </CardHeader>
          {alertsExpanded && (
            <CardContent>
              <div className="space-y-3">
                {mockFleetData.alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={cn(
                      "p-3 rounded-lg border-l-4 text-sm",
                      {
                        "bg-red-50 border-red-500": alert.severity === "high",
                        "bg-yellow-50 border-yellow-500": alert.severity === "medium",
                        "bg-blue-50 border-blue-500": alert.severity === "low"
                      }
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle size={14} className={
                          alert.severity === "high" ? "text-red-500" :
                          alert.severity === "medium" ? "text-yellow-500" : "text-blue-500"
                        } />
                        <span className="font-medium">{alert.message}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>

        {/* Fleet Status Overview */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-500" />
              Fleet Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockFleetData.drones.map((drone) => (
                <div 
                  key={drone.id}
                  className={cn(
                    "p-2 rounded-lg border cursor-pointer transition-all hover:shadow-md",
                    selectedDrone === drone.id && "border-blue-500 bg-blue-50"
                  )}
                  onClick={() => setSelectedDrone(drone.id)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-2 h-2 rounded-full", getStatusColor(drone.status))}></div>
                      <span className="text-sm font-medium">{drone.id}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {drone.battery.map((level, idx) => (
                        <div key={idx} className={cn("w-1 h-3 rounded-full", level > 50 ? "bg-green-500" : level > 30 ? "bg-yellow-500" : "bg-red-500")}></div>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{drone.mission}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConnectedDroneDashboard;
