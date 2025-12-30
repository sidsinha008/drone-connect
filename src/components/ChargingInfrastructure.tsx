
import { useState, useEffect } from "react";
import { ArrowLeft, Battery, BatteryLow, Zap, MapPin, AlertTriangle, Power, Clock, DollarSign, Wifi, Activity, TrendingUp, Settings, Eye, Gauge, Radio, Grid3X3, Bell, Navigation2, Target, ChevronDown, ChevronUp, Play, Square, Volume2, VolumeX } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface ChargingInfrastructureProps {
  onBack: () => void;
}

// Mock data for fleet and charging infrastructure
const mockFleetData = {
  vehicles: [
    {
      id: "DRN-001",
      name: "Sky Patrol Alpha",
      type: "Surveillance Drone",
      battery: 85,
      status: "In Flight",
      location: { lat: 13.0827, lng: 80.2707 },
      mission: "Perimeter Security",
      flightTime: "02:15:30",
      estimatedRange: "45 km",
      chargingType: "Fast",
      criticalAlert: false
    },
    {
      id: "EVTOL-002", 
      name: "Urban Taxi Beta",
      type: "Passenger eVTOL",
      battery: 18,
      status: "Emergency Landing",
      location: { lat: 13.0878, lng: 80.2785 },
      mission: "Passenger Transport",
      flightTime: "00:47:12",
      estimatedRange: "8 km",
      chargingType: "Fast",
      criticalAlert: true
    },
    {
      id: "DRN-003",
      name: "Cargo Express Gamma",
      type: "Heavy Lift Drone",
      battery: 62,
      status: "Charging",
      location: { lat: 13.0458, lng: 80.2209 },
      mission: "Package Delivery",
      flightTime: "01:23:45",
      estimatedRange: "28 km",
      chargingType: "Slow",
      criticalAlert: false
    }
  ],
  chargingStations: [
    {
      id: "CS-001",
      name: "Chennai Airport Hub",
      location: { lat: 13.0827, lng: 80.2707 },
      type: "Fast Charging",
      availableSlots: 3,
      totalSlots: 8,
      chargingTypes: ["CCS", "Type 2", "Proprietary"],
      estimatedWaitTime: "5 min",
      costPerKwh: 8.5,
      gridStatus: "Optimal",
      distance: "2.3 km"
    },
    {
      id: "CS-002", 
      name: "Marina Beach Station",
      location: { lat: 13.0878, lng: 80.2785 },
      type: "Slow Charging",
      availableSlots: 6,
      totalSlots: 6,
      chargingTypes: ["Type 2", "Proprietary"],
      estimatedWaitTime: "0 min",
      costPerKwh: 6.2,
      gridStatus: "High Demand",
      distance: "1.8 km"
    },
    {
      id: "CS-003",
      name: "T. Nagar Commercial Hub",
      location: { lat: 13.0458, lng: 80.2209 },
      type: "Fast Charging",
      availableSlots: 0,
      totalSlots: 12,
      chargingTypes: ["CCS", "Type 2", "CHAdeMO", "Proprietary"],
      estimatedWaitTime: "25 min",
      costPerKwh: 9.1,
      gridStatus: "Stable",
      distance: "4.7 km"
    }
  ],
  smartGrid: {
    status: "Stable",
    demand: 72,
    renewablePercent: 45,
    peakHours: "18:00 - 22:00",
    offPeakDiscount: 25,
    carbonFootprint: "Low"
  }
};

const ChargingInfrastructure = ({ onBack }: ChargingInfrastructureProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showChargingLayer, setShowChargingLayer] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [audioAlerts, setAudioAlerts] = useState(true);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [expandedAlerts, setExpandedAlerts] = useState(true);

  // Critical battery alert simulation
  useEffect(() => {
    const criticalVehicles = mockFleetData.vehicles.filter(v => v.criticalAlert);
    if (criticalVehicles.length > 0 && audioAlerts) {
      // Simulate audio alert
      console.log("🚨 CRITICAL BATTERY ALERT: Vehicle requires immediate charging!");
    }
  }, [audioAlerts]);

  const getBatteryColor = (level: number) => {
    if (level <= 20) return "text-red-600 bg-red-100";
    if (level <= 40) return "text-orange-600 bg-orange-100";
    if (level <= 60) return "text-yellow-600 bg-yellow-100";
    return "text-green-600 bg-green-100";
  };

  const getStationAvailabilityColor = (available: number, total: number) => {
    const ratio = available / total;
    if (ratio === 0) return "text-red-600 bg-red-100";
    if (ratio < 0.3) return "text-orange-600 bg-orange-100";
    if (ratio < 0.7) return "text-yellow-600 bg-yellow-100";
    return "text-green-600 bg-green-100";
  };

  const getGridStatusColor = (status: string) => {
    switch (status) {
      case "Optimal": return "text-green-600 bg-green-100";
      case "Stable": return "text-blue-600 bg-blue-100";
      case "High Demand": return "text-orange-600 bg-orange-100";
      case "Critical": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const criticalVehicles = mockFleetData.vehicles.filter(v => v.criticalAlert);
  const chargingVehicles = mockFleetData.vehicles.filter(v => v.status === "Charging");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Battery className="text-cyan-500" size={32} />
              SkyCharge: Intelligent Energy Management
            </h1>
          </div>
          <p className="text-muted-foreground mt-2">
            Connected drone & eVTOL charging ecosystem with smart grid integration
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Switch
              checked={audioAlerts}
              onCheckedChange={setAudioAlerts}
              id="audio-alerts"
            />
            <label htmlFor="audio-alerts" className="text-sm font-medium flex items-center gap-1">
              {audioAlerts ? <Volume2 size={16} /> : <VolumeX size={16} />}
              Audio Alerts
            </label>
          </div>
          <Badge variant="outline" className={getGridStatusColor(mockFleetData.smartGrid.status)}>
            <Activity className="w-3 h-3 mr-1" />
            Grid: {mockFleetData.smartGrid.status}
          </Badge>
        </div>
      </div>

      {/* Critical Alerts Section */}
      {criticalVehicles.length > 0 && (
        <Alert className="border-red-200 bg-red-50 animate-pulse">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="flex items-center justify-between">
            <div>
              <strong className="text-red-800">CRITICAL BATTERY ALERT:</strong> {criticalVehicles.length} vehicle(s) require immediate charging attention!
            </div>
            <Button size="sm" className="bg-red-600 hover:bg-red-700" onClick={() => setEmergencyMode(true)}>
              Emergency Protocol
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Fleet Status Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Fleet</p>
                <p className="text-2xl font-bold text-blue-600">
                  {mockFleetData.vehicles.filter(v => v.status !== "Offline").length}
                </p>
              </div>
              <Activity className="text-blue-500" size={20} />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical Battery</p>
                <p className="text-2xl font-bold text-red-600">{criticalVehicles.length}</p>
              </div>
              <BatteryLow className="text-red-500" size={20} />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Currently Charging</p>
                <p className="text-2xl font-bold text-green-600">{chargingVehicles.length}</p>
              </div>
              <Zap className="text-green-500" size={20} />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Available Slots</p>
                <p className="text-2xl font-bold text-cyan-600">
                  {mockFleetData.chargingStations.reduce((sum, station) => sum + station.availableSlots, 0)}
                </p>
              </div>
              <Power className="text-cyan-500" size={20} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Fleet Overview</TabsTrigger>
          <TabsTrigger value="map">Charging Map</TabsTrigger>
          <TabsTrigger value="smartgrid">Smart Grid</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Fleet Status */}
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Real-time Fleet Status</CardTitle>
                  <Button variant="outline" size="sm">
                    <Settings size={14} className="mr-1" />
                    Configure Alerts
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockFleetData.vehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className={cn(
                      "p-4 rounded-lg border transition-all cursor-pointer",
                      vehicle.criticalAlert ? "border-red-300 bg-red-50" : "border-gray-200 hover:bg-gray-50",
                      selectedVehicle === vehicle.id && "ring-2 ring-blue-500"
                    )}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{vehicle.name}</h4>
                        <p className="text-sm text-muted-foreground">{vehicle.type}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getBatteryColor(vehicle.battery)}>
                          <Battery size={12} className="mr-1" />
                          {vehicle.battery}%
                        </Badge>
                        {vehicle.criticalAlert && (
                          <AlertTriangle className="text-red-500 animate-pulse" size={16} />
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant="secondary" className="ml-2">{vehicle.status}</Badge>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Range:</span>
                        <span className="ml-2 font-medium">{vehicle.estimatedRange}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Mission:</span>
                        <span className="ml-2">{vehicle.mission}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Flight Time:</span>
                        <span className="ml-2">{vehicle.flightTime}</span>
                      </div>
                    </div>

                    {vehicle.criticalAlert && (
                      <div className="mt-3 pt-3 border-t border-red-200">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-red-700 font-medium">Emergency charging required</span>
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            <Navigation2 size={12} className="mr-1" />
                            Navigate to Station
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Charging Stations Status */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Charging Infrastructure Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockFleetData.chargingStations.map((station) => (
                  <div
                    key={station.id}
                    className={cn(
                      "p-4 rounded-lg border transition-all cursor-pointer hover:bg-gray-50",
                      selectedStation === station.id && "ring-2 ring-blue-500"
                    )}
                    onClick={() => setSelectedStation(station.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{station.name}</h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin size={12} />
                          {station.distance}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className={station.type === "Fast Charging" ? "text-red-600 bg-red-100" : "text-blue-600 bg-blue-100"}>
                          {station.type}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">₹{station.costPerKwh}/kWh</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Availability</span>
                          <Badge variant="outline" className={getStationAvailabilityColor(station.availableSlots, station.totalSlots)}>
                            {station.availableSlots}/{station.totalSlots}
                          </Badge>
                        </div>
                        <Progress 
                          value={(station.availableSlots / station.totalSlots) * 100} 
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Wait Time:</span>
                          <span className="ml-2 font-medium">{station.estimatedWaitTime}</span>
                        </div>
                        <div className="text-sm mt-1">
                          <span className="text-muted-foreground">Grid Status:</span>
                          <Badge variant="outline" className={`ml-2 ${getGridStatusColor(station.gridStatus)}`}>
                            {station.gridStatus}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {station.availableSlots === 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-sm text-orange-600">Station at capacity - estimated wait: {station.estimatedWaitTime}</p>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="map" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Intelligent Charging Map</CardTitle>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={showChargingLayer}
                      onCheckedChange={setShowChargingLayer}
                      id="charging-layer"
                    />
                    <label htmlFor="charging-layer" className="text-sm font-medium">
                      Charging Stations Layer
                    </label>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye size={14} className="mr-1" />
                    Toggle View
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative bg-slate-100 rounded-lg h-[600px] overflow-hidden border">
                {/* Map Placeholder with Interactive Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50"></div>
                
                {/* Vehicle Markers */}
                {mockFleetData.vehicles.map((vehicle, index) => (
                  <div
                    key={vehicle.id}
                    className={cn(
                      "absolute cursor-pointer transition-all hover:scale-110",
                      vehicle.criticalAlert && "animate-pulse"
                    )}
                    style={{
                      top: `${20 + index * 15}%`,
                      left: `${30 + index * 20}%`
                    }}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-full border-2 border-white shadow-lg flex items-center justify-center",
                      vehicle.criticalAlert ? "bg-red-500" : 
                      vehicle.status === "Charging" ? "bg-green-500" : "bg-blue-500"
                    )}>
                      <Battery size={16} className="text-white" />
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs p-2 rounded whitespace-nowrap">
                      {vehicle.name}: {vehicle.battery}%
                    </div>
                  </div>
                ))}

                {/* Charging Station Markers */}
                {showChargingLayer && mockFleetData.chargingStations.map((station, index) => (
                  <div
                    key={station.id}
                    className="absolute cursor-pointer transition-all hover:scale-110"
                    style={{
                      top: `${50 + index * 10}%`,
                      right: `${20 + index * 15}%`
                    }}
                  >
                    <div className={cn(
                      "w-16 h-16 rounded-lg border-2 border-white shadow-lg flex items-center justify-center",
                      station.type === "Fast Charging" ? "bg-red-500" : "bg-blue-500",
                      station.availableSlots === 0 && "opacity-50"
                    )}>
                      <div className="text-center">
                        <Zap size={16} className="text-white mx-auto" />
                        <div className="text-xs text-white font-bold">
                          {station.availableSlots}/{station.totalSlots}
                        </div>
                      </div>
                    </div>
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs p-2 rounded text-center min-w-max">
                      <div className="font-medium">{station.name}</div>
                      <div>{station.type}</div>
                    </div>
                  </div>
                ))}

                {/* Emergency Flight Path Visualization */}
                {criticalVehicles.length > 0 && (
                  <div className="absolute inset-0 pointer-events-none">
                    <svg className="w-full h-full">
                      <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                                refX="10" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
                        </marker>
                      </defs>
                      <path 
                        d="M 200 150 Q 400 100 600 250" 
                        stroke="#ef4444" 
                        strokeWidth="3" 
                        fill="none" 
                        strokeDasharray="10,5"
                        markerEnd="url(#arrowhead)"
                        className="animate-pulse"
                      />
                    </svg>
                    <div className="absolute top-4 left-4 bg-red-600 text-white p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Navigation2 size={16} />
                        <span className="font-medium">Emergency Route Active</span>
                      </div>
                      <div className="text-sm opacity-90">Directing to nearest available station</div>
                    </div>
                  </div>
                )}

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                  <h4 className="font-medium mb-2">Legend</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <span>Active Drone/eVTOL</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                      <span>Critical Battery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span>Fast Charging</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      <span>Slow Charging</span>
                    </div>
                  </div>
                </div>

                {/* Center Placeholder Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center text-gray-500">
                    <Grid3X3 size={80} className="mx-auto mb-4 opacity-30" />
                    <p className="text-xl font-medium">Chennai Charging Network</p>
                    <p className="text-sm mt-2">Real-time fleet and infrastructure monitoring</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="smartgrid" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="text-green-500" size={20} />
                  Smart Grid Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{mockFleetData.smartGrid.demand}%</div>
                    <div className="text-sm text-muted-foreground">Current Demand</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{mockFleetData.smartGrid.renewablePercent}%</div>
                    <div className="text-sm text-muted-foreground">Renewable Energy</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Grid Load</span>
                    <Badge variant="outline" className={getGridStatusColor(mockFleetData.smartGrid.status)}>
                      {mockFleetData.smartGrid.status}
                    </Badge>
                  </div>
                  <Progress value={mockFleetData.smartGrid.demand} className="h-3" />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Peak Hours:</span>
                      <div className="font-medium">{mockFleetData.smartGrid.peakHours}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Off-Peak Discount:</span>
                      <div className="font-medium text-green-600">{mockFleetData.smartGrid.offPeakDiscount}%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="text-yellow-500" size={20} />
                  Charging Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-yellow-200 bg-yellow-50">
                  <Zap className="h-4 w-4 text-yellow-600" />
                  <AlertDescription>
                    <div className="font-medium text-yellow-800">Optimal Charging Window</div>
                    <div className="text-sm text-yellow-700 mt-1">
                      Schedule charging between 2:00 AM - 6:00 AM for 25% cost savings
                    </div>
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Renewable Energy Available</span>
                      <Badge className="bg-green-100 text-green-800">Recommended</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      45% renewable energy currently available - optimal for eco-friendly charging
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Load Balancing Active</span>
                      <Badge variant="outline" className="text-blue-600 bg-blue-100">Smart Scheduling</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      3 vehicles scheduled for staggered charging to optimize grid load
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="text-purple-500" size={20} />
                Energy Analytics Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <TrendingUp size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Advanced Analytics Coming Soon</p>
                <p className="text-sm mt-2">
                  Energy consumption patterns, cost optimization insights, and predictive maintenance analytics
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChargingInfrastructure;
