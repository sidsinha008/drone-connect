
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
  Satellite,
  Network,
  Signal,
  Activity,
  Layers,
  ToggleLeft,
  ToggleRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

// Enhanced mock data for the dashboard
const mockFleetData = {
  activeDrones: 8,
  totalDrones: 12,
  onlinePilots: 4,
  activeMissions: 3,
  weatherConditions: {
    windSpeed: 12,
    windDirection: "NE",
    temperature: 28,
    humidity: 65,
    visibility: "Clear"
  },
  networkStatus: {
    totalLinks: 24,
    activeLinks: 22,
    weakLinks: 2,
    brokenLinks: 0,
    avgLatency: 45,
    avgBandwidth: 85,
    networkHealth: 92
  },
  drones: [
    {
      id: "D-001",
      name: "Sky Guardian Alpha",
      status: "active",
      mission: "Security Patrol",
      position: { lat: 13.0827, lng: 80.2707, x: 25, y: 30 },
      altitude: 120,
      battery: [85, 78],
      speed: 15,
      heading: 45,
      flightTime: "00:23:45",
      pilot: "Rajesh Kumar",
      videoFeed: "HD Active",
      thermalFeed: "Active",
      signalStrength: 95,
      role: "leader",
      connectedTo: ["D-002", "D-003"],
      coverageRadius: 500,
      networkId: "NET-001"
    },
    {
      id: "D-002", 
      name: "Urban Scout Beta",
      status: "returning",
      mission: "Traffic Monitoring",
      position: { lat: 13.0878, lng: 80.2785, x: 45, y: 25 },
      altitude: 80,
      battery: [45],
      speed: 22,
      heading: 180,
      flightTime: "01:15:22",
      pilot: "Priya Sharma",
      videoFeed: "HD Active",
      thermalFeed: "Inactive",
      signalStrength: 78,
      role: "relay",
      connectedTo: ["D-001", "D-004"],
      coverageRadius: 300,
      networkId: "NET-001"
    },
    {
      id: "D-003",
      name: "Cargo Hawk",
      status: "idle",
      mission: "Standby",
      position: { lat: 13.0625, lng: 80.2574, x: 60, y: 55 },
      altitude: 0,
      battery: [92, 88, 85],
      speed: 0,
      heading: 0,
      flightTime: "00:00:00",
      pilot: "Unassigned",
      videoFeed: "Inactive",
      thermalFeed: "Inactive",
      signalStrength: 100,
      role: "collector",
      connectedTo: ["D-001"],
      coverageRadius: 200,
      networkId: "NET-001"
    },
    {
      id: "D-004",
      name: "Metro Surveyor",
      status: "active",
      mission: "Route Survey",
      position: { lat: 13.0920, lng: 80.2820, x: 75, y: 20 },
      altitude: 150,
      battery: [67],
      speed: 18,
      heading: 90,
      flightTime: "00:45:12",
      pilot: "Arjun Patel",
      videoFeed: "HD Active",
      thermalFeed: "Active",
      signalStrength: 82,
      role: "scout",
      connectedTo: ["D-002", "D-005"],
      coverageRadius: 400,
      networkId: "NET-002"
    },
    {
      id: "D-005",
      name: "Harbor Watch",
      status: "warning",
      mission: "Port Security",
      position: { lat: 13.0750, lng: 80.2900, x: 85, y: 45 },
      altitude: 95,
      battery: [23],
      speed: 8,
      heading: 270,
      flightTime: "02:30:18",
      pilot: "Kavya Singh",
      videoFeed: "HD Active",
      thermalFeed: "Inactive",
      signalStrength: 56,
      role: "sentinel",
      connectedTo: ["D-004"],
      coverageRadius: 350,
      networkId: "NET-002"
    }
  ],
  recentMedia: [
    { id: 1, type: "image", thumbnail: "/placeholder.svg", timestamp: "14:23", location: "Marina Beach", size: "4.2MB" },
    { id: 2, type: "video", thumbnail: "/placeholder.svg", timestamp: "14:15", location: "T Nagar", size: "156MB" },
    { id: 3, type: "thermal", thumbnail: "/placeholder.svg", timestamp: "14:08", location: "Central Station", size: "2.8MB" }
  ],
  alerts: [
    { id: 1, type: "warning", message: "D-005 Battery Critical - RTH Required", timestamp: "2 min ago", severity: "high" },
    { id: 2, type: "network", message: "Network Link D-004 to D-005 Degraded", timestamp: "3 min ago", severity: "medium" },
    { id: 3, type: "info", message: "Mission 'Security Patrol' 75% Complete", timestamp: "5 min ago", severity: "low" }
  ]
};

const TechDrivenDroneDashboard = () => {
  const [selectedDrone, setSelectedDrone] = useState("D-001");
  const [satelliteView, setSatelliteView] = useState(true);
  const [satelliteOpacity, setSatelliteOpacity] = useState([85]);
  const [droneTopology, setDroneTopology] = useState(true);
  const [showCoverage, setShowCoverage] = useState(true);
  const [showLinks, setShowLinks] = useState(true);
  const [showHierarchy, setShowHierarchy] = useState(true);
  const [selectedNetwork, setSelectedNetwork] = useState("all");
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

  const getRoleColor = (role: string) => {
    switch (role) {
      case "leader": return "ring-purple-500 bg-purple-500";
      case "relay": return "ring-blue-500 bg-blue-500";
      case "collector": return "ring-green-500 bg-green-500";
      case "scout": return "ring-orange-500 bg-orange-500";
      case "sentinel": return "ring-red-500 bg-red-500";
      default: return "ring-gray-500 bg-gray-500";
    }
  };

  const getLinkQuality = (signalStrength: number) => {
    if (signalStrength >= 80) return { color: "stroke-green-500", style: "solid" };
    if (signalStrength >= 60) return { color: "stroke-yellow-500", style: "dashed" };
    return { color: "stroke-red-500", style: "dotted" };
  };

  const getSignalStrength = (strength: number) => {
    if (strength >= 80) return "text-green-500";
    if (strength >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  // Filter drones by network if needed
  const filteredDrones = selectedNetwork === "all" 
    ? mockFleetData.drones 
    : mockFleetData.drones.filter(d => d.networkId === selectedNetwork);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white p-4 rounded-lg shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">AI-Enhanced Operations Map</h1>
            <p className="text-blue-100">Satellite View with Drone Topology Intelligence</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Plane size={16} />
              <span>{mockFleetData.activeDrones}/{mockFleetData.totalDrones} Active</span>
            </div>
            <div className="flex items-center gap-2">
              <Network size={16} />
              <span>{mockFleetData.networkStatus.activeLinks}/{mockFleetData.networkStatus.totalLinks} Links</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity size={16} />
              <span>{mockFleetData.networkStatus.networkHealth}% Health</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Enhanced Map Display with Satellite and Topology */}
        <div className="xl:col-span-2">
          <Card className="h-[700px]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Satellite className="h-5 w-5 text-blue-500" />
                  AI-Enhanced Operations Map
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant={satelliteView ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSatelliteView(!satelliteView)}
                    className="flex items-center gap-1"
                  >
                    <Satellite size={14} />
                    Satellite
                  </Button>
                  <Button
                    variant={droneTopology ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDroneTopology(!droneTopology)}
                    className="flex items-center gap-1"
                  >
                    <Network size={14} />
                    Topology
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 h-full">
              
              {/* Layer Controls */}
              <div className="mb-4 space-y-3">
                {/* Satellite Controls */}
                {satelliteView && (
                  <div className="flex items-center gap-4 p-2 bg-muted rounded-lg">
                    <Eye size={14} className="text-muted-foreground" />
                    <span className="text-sm font-medium">Satellite Opacity:</span>
                    <Slider
                      value={satelliteOpacity}
                      onValueChange={setSatelliteOpacity}
                      max={100}
                      step={5}
                      className="w-24"
                    />
                    <span className="text-xs text-muted-foreground w-10">{satelliteOpacity[0]}%</span>
                  </div>
                )}
                
                {/* Topology Controls */}
                {droneTopology && (
                  <div className="flex items-center gap-4 p-2 bg-muted rounded-lg">
                    <Network size={14} className="text-muted-foreground" />
                    <div className="flex items-center gap-2">
                      <Switch checked={showLinks} onCheckedChange={setShowLinks} />
                      <span className="text-xs">Links</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={showCoverage} onCheckedChange={setShowCoverage} />
                      <span className="text-xs">Coverage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={showHierarchy} onCheckedChange={setShowHierarchy} />
                      <span className="text-xs">Hierarchy</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Map Canvas */}
              <div className="relative bg-slate-100 rounded-lg h-[500px] flex items-center justify-center overflow-hidden">
                
                {/* Satellite Background Layer */}
                {satelliteView && (
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-green-200 via-blue-200 to-brown-200 rounded-lg"
                    style={{ opacity: satelliteOpacity[0] / 100 }}
                  >
                    {/* Simulated satellite imagery patterns */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-1/4 left-1/4 w-16 h-8 bg-green-600 rounded transform rotate-12"></div>
                      <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-blue-700 rounded-full"></div>
                      <div className="absolute bottom-1/3 left-1/2 w-20 h-4 bg-gray-600 rounded transform -rotate-6"></div>
                    </div>
                  </div>
                )}
                
                {/* Default Map Background */}
                {!satelliteView && (
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg"></div>
                )}
                
                {/* SVG Overlay for Network Elements */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  
                  {/* Coverage Areas */}
                  {droneTopology && showCoverage && filteredDrones.map((drone) => (
                    <circle
                      key={`coverage-${drone.id}`}
                      cx={drone.position.x}
                      cy={drone.position.y}
                      r={drone.coverageRadius / 50} // Scale down for display
                      fill={drone.role === "leader" ? "rgba(147, 51, 234, 0.1)" : 
                            drone.role === "relay" ? "rgba(59, 130, 246, 0.1)" : 
                            "rgba(34, 197, 94, 0.1)"}
                      stroke={drone.role === "leader" ? "rgb(147, 51, 234)" : 
                             drone.role === "relay" ? "rgb(59, 130, 246)" : 
                             "rgb(34, 197, 94)"}
                      strokeWidth="0.2"
                      strokeDasharray="1,1"
                    />
                  ))}
                  
                  {/* Communication Links */}
                  {droneTopology && showLinks && filteredDrones.map((drone) => 
                    drone.connectedTo.map((targetId) => {
                      const targetDrone = filteredDrones.find(d => d.id === targetId);
                      if (!targetDrone) return null;
                      
                      const linkQuality = getLinkQuality(Math.min(drone.signalStrength, targetDrone.signalStrength));
                      
                      return (
                        <line
                          key={`link-${drone.id}-${targetId}`}
                          x1={drone.position.x}
                          y1={drone.position.y}
                          x2={targetDrone.position.x}
                          y2={targetDrone.position.y}
                          className={linkQuality.color}
                          strokeWidth="0.3"
                          strokeDasharray={linkQuality.style === "dashed" ? "2,2" : linkQuality.style === "dotted" ? "1,1" : "none"}
                        />
                      );
                    })
                  )}
                  
                  {/* Hierarchical Indicators */}
                  {droneTopology && showHierarchy && filteredDrones.filter(d => d.role === "leader").map((leader) => (
                    <circle
                      key={`hierarchy-${leader.id}`}
                      cx={leader.position.x}
                      cy={leader.position.y}
                      r="3"
                      fill="none"
                      stroke="rgb(147, 51, 234)"
                      strokeWidth="0.4"
                      strokeDasharray="1,0.5"
                    />
                  ))}
                </svg>
                
                {/* Drone Markers */}
                {filteredDrones.map((drone) => (
                  <div
                    key={drone.id}
                    className={cn(
                      "absolute w-8 h-8 rounded-full border-2 border-white shadow-lg cursor-pointer transition-all hover:scale-125 z-10",
                      getRoleColor(drone.role),
                      selectedDrone === drone.id && "ring-4 ring-blue-300 scale-110"
                    )}
                    style={{
                      top: `${drone.position.y}%`,
                      left: `${drone.position.x}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => setSelectedDrone(drone.id)}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <Plane size={12} className="text-white" style={{ transform: `rotate(${drone.heading}deg)` }} />
                    </div>
                    
                    {/* Role Indicator */}
                    {droneTopology && showHierarchy && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center text-xs">
                        {drone.role === "leader" && "L"}
                        {drone.role === "relay" && "R"}
                        {drone.role === "collector" && "C"}
                        {drone.role === "scout" && "S"}
                        {drone.role === "sentinel" && "X"}
                      </div>
                    )}
                    
                    {/* Drone ID Label */}
                    <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs font-medium bg-white px-2 py-1 rounded shadow border">
                      {drone.id}
                    </div>
                  </div>
                ))}
                
                {/* Legend Overlay */}
                <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg border max-w-xs">
                  <h4 className="text-sm font-semibold mb-2">Map Legend</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span>Leader Drone</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Relay Drone</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Collector Drone</span>
                    </div>
                    {droneTopology && (
                      <>
                        <div className="border-t pt-1 mt-1">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-0.5 bg-green-500"></div>
                            <span>Strong Link</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-0.5 bg-yellow-500 border-dashed border-t"></div>
                            <span>Weak Link</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-0.5 bg-red-500" style={{borderTop: '1px dotted'}}></div>
                            <span>Poor Link</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Telemetry Panel */}
        <div className="space-y-6">
          
          {/* Selected Drone Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Radio className="h-4 w-4 text-green-500" />
                  {activeDrone?.name}
                </span>
                <div className="flex items-center gap-2">
                  <div className={cn("w-3 h-3 rounded-full", getStatusColor(activeDrone?.status || "idle"))}></div>
                  <Badge variant="outline" className="text-xs">
                    {activeDrone?.role?.toUpperCase()}
                  </Badge>
                </div>
              </CardTitle>
              <CardDescription>
                {activeDrone?.mission} • Network: {activeDrone?.networkId}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Battery Status */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Battery Status</span>
                  <div className={cn("flex items-center gap-1", getSignalStrength(activeDrone?.signalStrength || 0))}>
                    <Signal size={12} />
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

              {/* Network Topology Info */}
              {droneTopology && (
                <div className="border-t pt-3">
                  <div className="text-sm font-medium mb-2">Network Topology</div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Connected To:</span>
                      <span>{activeDrone?.connectedTo.length || 0} drones</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Coverage Radius:</span>
                      <span>{activeDrone?.coverageRadius}m</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Role:</span>
                      <Badge variant="secondary" className="text-xs">
                        {activeDrone?.role}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}

              {/* Flight Metrics */}
              <div className="grid grid-cols-2 gap-4 text-sm border-t pt-3">
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
            </CardContent>
          </Card>

          {/* Network Status Overview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Network className="h-4 w-4 text-blue-500" />
                Network Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Overall Health</span>
                  <div className="flex items-center gap-2">
                    <Progress value={mockFleetData.networkStatus.networkHealth} className="w-16 h-2" />
                    <span className="text-sm font-medium">{mockFleetData.networkStatus.networkHealth}%</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-muted-foreground">Active Links</div>
                    <div className="font-semibold text-green-600">
                      {mockFleetData.networkStatus.activeLinks}/{mockFleetData.networkStatus.totalLinks}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Avg Latency</div>
                    <div className="font-semibold">{mockFleetData.networkStatus.avgLatency}ms</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Weak Links</div>
                    <div className="font-semibold text-yellow-600">{mockFleetData.networkStatus.weakLinks}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Bandwidth</div>
                    <div className="font-semibold">{mockFleetData.networkStatus.avgBandwidth}%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Control Panel */}
        <div className="space-y-6">
          
          {/* Network Filter Controls */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-purple-500" />
                Network Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Button
                    variant={selectedNetwork === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedNetwork("all")}
                    className="flex-1"
                  >
                    All Networks
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={selectedNetwork === "NET-001" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedNetwork("NET-001")}
                  >
                    NET-001
                  </Button>
                  <Button
                    variant={selectedNetwork === "NET-002" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedNetwork("NET-002")}
                  >
                    NET-002
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-gray-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Home size={12} />
                  RTH All
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Target size={12} />
                  Optimize
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Shield size={12} />
                  Emergency
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Activity size={12} />
                  Health Check
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
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Network Analytics */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-green-500" />
              Network Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Data Throughput</span>
                  <span className="font-medium">2.4 GB/h</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Network Load</span>
                  <span className="font-medium">68%</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Coverage Efficiency</span>
                  <span className="font-medium">91%</span>
                </div>
                <Progress value={91} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Alerts */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-orange-500" />
                Live Alerts & Network Status
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
                        {alert.type === "network" ? (
                          <Network size={14} className={
                            alert.severity === "high" ? "text-red-500" :
                            alert.severity === "medium" ? "text-yellow-500" : "text-blue-500"
                          } />
                        ) : (
                          <AlertTriangle size={14} className={
                            alert.severity === "high" ? "text-red-500" :
                            alert.severity === "medium" ? "text-yellow-500" : "text-blue-500"
                          } />
                        )}
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
      </div>
    </div>
  );
};

export default TechDrivenDroneDashboard;
