
import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Plane, AlertTriangle, Navigation2, Radio, Shield, Clock, Battery, Target, Play, Square, Volume2, VolumeX, Eye, Settings, Zap, Route } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface VertiportVertiHubProps {
  onBack: () => void;
}

// Mock data for Chennai eVTOL operations
const mockChennaiData = {
  eVTOL: {
    id: "EVTOL-CHN-001",
    name: "Urban Air Taxi Alpha",
    type: "Passenger eVTOL",
    battery: 22,
    status: "In Flight",
    location: { lat: 13.0827, lng: 80.2707, name: "Above Anna Salai" },
    altitude: "150m AGL",
    speed: "85 km/h",
    heading: "Northwest",
    mission: "Passenger Transport - T.Nagar to Airport",
    flightTime: "00:18:45",
    estimatedRange: "12 km",
    criticalAlert: true,
    passengers: 3,
    maxPassengers: 4
  },
  vertiports: [
    {
      id: "VP-CHN-001",
      name: "Chennai Airport VertiHub",
      location: { lat: 13.0827, lng: 80.2707 },
      operator: "AAI Vertiport Services",
      contact: "+91-44-2256-0551",
      availableSlots: 2,
      totalSlots: 6,
      supportedTypes: ["Light eVTOL", "Passenger eVTOL", "Cargo eVTOL"],
      chargingAvailable: true,
      distance: "8.2 km",
      eta: "12 min",
      specialProcedures: "IFR approach required, Contact ATC on 121.9 MHz",
      operatingHours: "24/7",
      emergencyReady: true
    },
    {
      id: "VP-CHN-002",
      name: "Marina Beach VertiPort",
      location: { lat: 13.0878, lng: 80.2785 },
      operator: "Chennai Metro Vertiports",
      contact: "+91-44-2819-3456",
      availableSlots: 4,
      totalSlots: 4,
      supportedTypes: ["Light eVTOL", "Passenger eVTOL"],
      chargingAvailable: false,
      distance: "6.8 km",
      eta: "9 min",
      specialProcedures: "VFR only, Avoid tourist helicopter routes",
      operatingHours: "06:00 - 22:00",
      emergencyReady: true
    },
    {
      id: "VP-CHN-003",
      name: "T.Nagar Commercial Hub",
      location: { lat: 13.0458, lng: 80.2209 },
      operator: "Private Vertiport Solutions",
      contact: "+91-44-2434-7890",
      availableSlots: 0,
      totalSlots: 8,
      supportedTypes: ["Light eVTOL", "Passenger eVTOL", "Cargo eVTOL", "Heavy Lift"],
      chargingAvailable: true,
      distance: "15.3 km",
      eta: "20 min",
      specialProcedures: "Controlled airspace, Prior permission required",
      operatingHours: "05:00 - 23:00",
      emergencyReady: false
    }
  ],
  airspaceRestrictions: [
    {
      id: "NFZ-CHN-001",
      type: "No-Fly Zone",
      name: "Raj Bhavan Restricted Area",
      coordinates: [{ lat: 13.0732, lng: 80.2609 }],
      reason: "Government Security",
      authority: "DGCA/Security Forces",
      altitudeLimit: "All altitudes",
      activeStatus: "Permanent",
      severity: "critical"
    },
    {
      id: "TFZ-CHN-002", 
      type: "Temporarily Restricted Zone",
      name: "MA Chidambaram Stadium Event Zone",
      coordinates: [{ lat: 13.0641, lng: 80.2787 }],
      reason: "Cricket Match - High VIP Movement",
      authority: "Local Police/DGCA",
      altitudeLimit: "Below 300m AGL",
      activeStatus: "Active until 22:00",
      activePeriod: "18:00 - 22:00 IST",
      severity: "high"
    },
    {
      id: "RFZ-CHN-003",
      type: "Restricted Flying Zone", 
      name: "Coast Guard Station Approach",
      coordinates: [{ lat: 13.1067, lng: 80.2963 }],
      reason: "Military Operations",
      authority: "Indian Coast Guard",
      altitudeLimit: "Below 500m AGL",
      activeStatus: "Operational Hours",
      activePeriod: "06:00 - 18:00 IST",
      severity: "medium"
    }
  ],
  multiLegRoute: {
    legs: [
      { from: "Current Position", to: "VP-CHN-002", distance: "6.8 km", eta: "9 min", batteryUsage: "8%" },
      { from: "VP-CHN-002", to: "VP-CHN-001", distance: "12.4 km", eta: "16 min", batteryUsage: "15%" },
      { from: "VP-CHN-001", to: "Final Destination", distance: "8.7 km", eta: "11 min", batteryUsage: "12%" }
    ],
    totalDistance: "27.9 km",
    totalTime: "36 min",
    totalBatteryUsage: "35%"
  }
};

const VertiportVertiHub = ({ onBack }: VertiportVertiHubProps) => {
  const [activeTab, setActiveTab] = useState("navigation");
  const [showVertiportLayer, setShowVertiportLayer] = useState(true);
  const [showAirspaceLayer, setShowAirspaceLayer] = useState(true);
  const [selectedVertiport, setSelectedVertiport] = useState<string | null>(null);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [audioAlerts, setAudioAlerts] = useState(true);
  const [routePlanningMode, setRoutePlanningMode] = useState(false);

  // Critical battery alert simulation
  useEffect(() => {
    if (mockChennaiData.eVTOL.criticalAlert && audioAlerts) {
      console.log("🚨 CRITICAL BATTERY ALERT: eVTOL requires immediate landing at nearest Vertiport!");
    }
  }, [audioAlerts]);

  const getVertiportAvailabilityColor = (available: number, total: number) => {
    const ratio = available / total;
    if (ratio === 0) return "text-red-600 bg-red-100";
    if (ratio < 0.3) return "text-orange-600 bg-orange-100";
    if (ratio < 0.7) return "text-yellow-600 bg-yellow-100";
    return "text-green-600 bg-green-100";
  };

  const getAirspaceRestrictionColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-600 bg-red-100 border-red-300";
      case "high": return "text-orange-600 bg-orange-100 border-orange-300";
      case "medium": return "text-yellow-600 bg-yellow-100 border-yellow-300";
      default: return "text-gray-600 bg-gray-100 border-gray-300";
    }
  };

  const handleEmergencyLanding = () => {
    setEmergencyMode(true);
    // Auto-select nearest available vertiport with emergency capabilities
    const emergencyVertiports = mockChennaiData.vertiports.filter(vp => vp.emergencyReady && vp.availableSlots > 0);
    if (emergencyVertiports.length > 0) {
      setSelectedVertiport(emergencyVertiports[0].id);
    }
  };

  const nearestVertiport = mockChennaiData.vertiports.find(vp => vp.emergencyReady && vp.availableSlots > 0);

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
              <MapPin className="text-rose-500" size={32} />
              SkyPort Connect: Chennai Vertiport Operations
            </h1>
          </div>
          <p className="text-muted-foreground mt-2">
            Integrated vertiport & airspace management for eVTOL operations with DGCA compliance
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
          <Badge variant="outline" className="text-green-600 bg-green-100">
            <Radio className="w-3 h-3 mr-1" />
            DGCA Compliant
          </Badge>
        </div>
      </div>

      {/* Critical Alerts Section */}
      {mockChennaiData.eVTOL.criticalAlert && (
        <Alert className="border-red-200 bg-red-50 animate-pulse">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="flex items-center justify-between">
            <div>
              <strong className="text-red-800">CRITICAL BATTERY ALERT:</strong> {mockChennaiData.eVTOL.name} at {mockChennaiData.eVTOL.battery}% battery requires immediate landing!
            </div>
            <Button size="sm" className="bg-red-600 hover:bg-red-700" onClick={handleEmergencyLanding}>
              <AlertTriangle size={12} className="mr-1" />
              Emergency Landing
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Emergency Mode Active */}
      {emergencyMode && (
        <Alert className="border-orange-200 bg-orange-50">
          <Navigation2 className="h-4 w-4 text-orange-600 animate-pulse" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <div>
                <strong className="text-orange-800">EMERGENCY ROUTE ACTIVE:</strong> Directing to {nearestVertiport?.name} - ETA: {nearestVertiport?.eta}
              </div>
              <Button size="sm" variant="outline" onClick={() => setEmergencyMode(false)}>
                Cancel Emergency
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* eVTOL Status Overview */}
      <Card className="glass-card border-l-4 border-l-rose-500">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Plane className="text-rose-500" size={24} />
              {mockChennaiData.eVTOL.name}
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={mockChennaiData.eVTOL.battery <= 20 ? "text-red-600 bg-red-100" : "text-green-600 bg-green-100"}>
                <Battery size={12} className="mr-1" />
                {mockChennaiData.eVTOL.battery}%
              </Badge>
              <Badge variant="secondary">{mockChennaiData.eVTOL.status}</Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Location:</span>
              <div className="font-medium">{mockChennaiData.eVTOL.location.name}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Altitude:</span>
              <div className="font-medium">{mockChennaiData.eVTOL.altitude}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Speed:</span>
              <div className="font-medium">{mockChennaiData.eVTOL.speed}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Passengers:</span>
              <div className="font-medium">{mockChennaiData.eVTOL.passengers}/{mockChennaiData.eVTOL.maxPassengers}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Interface Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="navigation">Navigation Map</TabsTrigger>
          <TabsTrigger value="route-planning">Route Planning</TabsTrigger>
          <TabsTrigger value="airspace">Airspace Monitor</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Ops</TabsTrigger>
        </TabsList>

        <TabsContent value="navigation" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Chennai Airspace Navigation</CardTitle>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={showVertiportLayer}
                      onCheckedChange={setShowVertiportLayer}
                      id="vertiport-layer"
                    />
                    <label htmlFor="vertiport-layer" className="text-sm font-medium">Vertiports</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={showAirspaceLayer}
                      onCheckedChange={setShowAirspaceLayer}
                      id="airspace-layer"
                    />
                    <label htmlFor="airspace-layer" className="text-sm font-medium">Restrictions</label>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative bg-slate-100 rounded-lg h-[500px] overflow-hidden border">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50"></div>
                
                {/* eVTOL Current Position */}
                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className={cn(
                    "w-16 h-16 rounded-full border-4 border-white shadow-lg flex items-center justify-center relative",
                    mockChennaiData.eVTOL.criticalAlert ? "bg-red-500 animate-pulse" : "bg-rose-500"
                  )}>
                    <Plane size={20} className="text-white" />
                    {mockChennaiData.eVTOL.criticalAlert && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                        <AlertTriangle size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs p-3 rounded whitespace-nowrap">
                    <div className="font-medium">{mockChennaiData.eVTOL.name}</div>
                    <div>Battery: {mockChennaiData.eVTOL.battery}% | {mockChennaiData.eVTOL.altitude}</div>
                  </div>
                </div>

                {/* Vertiport Markers */}
                {showVertiportLayer && mockChennaiData.vertiports.map((vertiport, index) => (
                  <div
                    key={vertiport.id}
                    className={cn(
                      "absolute cursor-pointer transition-all hover:scale-110",
                      selectedVertiport === vertiport.id && "ring-4 ring-rose-500 rounded-lg"
                    )}
                    style={{
                      top: `${60 + index * 10}%`,
                      right: `${20 + index * 15}%`
                    }}
                    onClick={() => setSelectedVertiport(vertiport.id)}
                  >
                    <div className={cn(
                      "w-20 h-20 rounded-lg border-2 border-white shadow-lg flex items-center justify-center",
                      vertiport.availableSlots > 0 ? "bg-green-500" : "bg-red-500",
                      vertiport.emergencyReady && mockChennaiData.eVTOL.criticalAlert && "animate-pulse"
                    )}>
                      <div className="text-center">
                        <MapPin size={20} className="text-white mx-auto" />
                        <div className="text-xs text-white font-bold">
                          {vertiport.availableSlots}/{vertiport.totalSlots}
                        </div>
                      </div>
                    </div>
                    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs p-2 rounded text-center min-w-max">
                      <div className="font-medium">{vertiport.name}</div>
                      <div>ETA: {vertiport.eta}</div>
                      {vertiport.emergencyReady && (
                        <div className="text-green-400">Emergency Ready</div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Airspace Restrictions */}
                {showAirspaceLayer && mockChennaiData.airspaceRestrictions.map((restriction, index) => (
                  <div
                    key={restriction.id}
                    className="absolute cursor-pointer"
                    style={{
                      top: `${30 + index * 20}%`,
                      left: `${15 + index * 25}%`
                    }}
                  >
                    <div className={cn(
                      "w-24 h-24 rounded-full border-4 border-dashed flex items-center justify-center opacity-80",
                      restriction.severity === "critical" && "bg-red-200 border-red-500",
                      restriction.severity === "high" && "bg-orange-200 border-orange-500",
                      restriction.severity === "medium" && "bg-yellow-200 border-yellow-500"
                    )}>
                      <Shield size={16} className="text-gray-700" />
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs p-1 rounded text-center whitespace-nowrap">
                      {restriction.type}
                    </div>
                  </div>
                ))}

                {/* Emergency Route Visualization */}
                {emergencyMode && nearestVertiport && (
                  <div className="absolute inset-0 pointer-events-none">
                    <svg className="w-full h-full">
                      <defs>
                        <marker id="emergency-arrow" markerWidth="10" markerHeight="7" 
                                refX="10" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
                        </marker>
                      </defs>
                      <path 
                        d="M 300 200 Q 400 150 500 300" 
                        stroke="#ef4444" 
                        strokeWidth="4" 
                        fill="none" 
                        strokeDasharray="15,10"
                        markerEnd="url(#emergency-arrow)"
                        className="animate-pulse"
                      />
                    </svg>
                  </div>
                )}

                {/* Center Map Title */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                  <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                    <h3 className="font-medium text-gray-800">Chennai Metropolitan Airspace</h3>
                    <p className="text-sm text-gray-600">Real-time eVTOL Navigation & Vertiport Integration</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selected Vertiport Details */}
          {selectedVertiport && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Vertiport Details</CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const vertiport = mockChennaiData.vertiports.find(vp => vp.id === selectedVertiport);
                  if (!vertiport) return null;
                  
                  return (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{vertiport.name}</h3>
                        <Badge variant="outline" className={getVertiportAvailabilityColor(vertiport.availableSlots, vertiport.totalSlots)}>
                          {vertiport.availableSlots}/{vertiport.totalSlots} Available
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Operator:</span>
                          <div className="font-medium">{vertiport.operator}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Contact:</span>
                          <div className="font-medium">{vertiport.contact}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Distance:</span>
                          <div className="font-medium">{vertiport.distance}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">ETA:</span>
                          <div className="font-medium">{vertiport.eta}</div>
                        </div>
                      </div>

                      <div>
                        <span className="text-muted-foreground">Special Procedures:</span>
                        <div className="text-sm mt-1 p-2 bg-yellow-50 rounded">{vertiport.specialProcedures}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
                          <Navigation2 size={12} className="mr-1" />
                          Navigate to Vertiport
                        </Button>
                        <Button size="sm" variant="outline">
                          <Radio size={12} className="mr-1" />
                          Contact Operator
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="route-planning" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Multi-Leg Route Planning</CardTitle>
                <Button 
                  variant={routePlanningMode ? "destructive" : "default"}
                  onClick={() => setRoutePlanningMode(!routePlanningMode)}
                >
                  <Route size={16} className="mr-2" />
                  {routePlanningMode ? "Cancel Planning" : "Plan New Route"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="font-medium">Suggested Multi-Leg Route</h3>
                
                {mockChennaiData.multiLegRoute.legs.map((leg, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{leg.from} → {leg.to}</div>
                        <div className="text-sm text-muted-foreground">
                          {leg.distance} • {leg.eta} • Battery: -{leg.batteryUsage}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Settings size={12} className="mr-1" />
                      Modify
                    </Button>
                  </div>
                ))}

                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-2">Route Summary</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Total Distance:</span>
                      <div className="font-medium">{mockChennaiData.multiLegRoute.totalDistance}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total Time:</span>
                      <div className="font-medium">{mockChennaiData.multiLegRoute.totalTime}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Battery Usage:</span>
                      <div className="font-medium">{mockChennaiData.multiLegRoute.totalBatteryUsage}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="airspace" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>DGCA Airspace Compliance Monitor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockChennaiData.airspaceRestrictions.map((restriction) => (
                  <div key={restriction.id} className={cn("p-4 rounded-lg border", getAirspaceRestrictionColor(restriction.severity))}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{restriction.name}</h4>
                      <Badge variant="outline" className={restriction.severity === "critical" ? "border-red-500 text-red-700" : 
                                                        restriction.severity === "high" ? "border-orange-500 text-orange-700" :
                                                        "border-yellow-500 text-yellow-700"}>
                        {restriction.type}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-muted-foreground">Authority:</span>
                        <div className="font-medium">{restriction.authority}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Altitude Limit:</span>
                        <div className="font-medium">{restriction.altitudeLimit}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Status:</span>
                        <div className="font-medium">{restriction.activeStatus}</div>
                      </div>
                      {restriction.activePeriod && (
                        <div>
                          <span className="text-muted-foreground">Active Period:</span>
                          <div className="font-medium">{restriction.activePeriod}</div>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-sm">
                      <span className="text-muted-foreground">Reason:</span>
                      <div className="mt-1">{restriction.reason}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergency" className="space-y-4">
          <Card className="glass-card border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle size={20} />
                Emergency Operations Protocol
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription>
                    <strong>Current Status:</strong> {mockChennaiData.eVTOL.criticalAlert ? "CRITICAL BATTERY ALERT ACTIVE" : "All systems normal"}
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    size="lg" 
                    className="bg-red-600 hover:bg-red-700 h-16"
                    onClick={handleEmergencyLanding}
                    disabled={emergencyMode}
                  >
                    <AlertTriangle size={20} className="mr-2" />
                    <div className="text-left">
                      <div className="font-semibold">EMERGENCY LANDING</div>
                      <div className="text-sm opacity-90">Nearest Vertiport</div>
                    </div>
                  </Button>

                  <Button size="lg" variant="outline" className="h-16">
                    <Radio size={20} className="mr-2" />
                    <div className="text-left">
                      <div className="font-semibold">Emergency Broadcast</div>
                      <div className="text-sm text-muted-foreground">Alert all Vertiports</div>
                    </div>
                  </Button>
                </div>

                {nearestVertiport && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium mb-2">Nearest Emergency-Ready Vertiport</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Name:</span>
                        <div className="font-medium">{nearestVertiport.name}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Distance:</span>
                        <div className="font-medium">{nearestVertiport.distance}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">ETA:</span>
                        <div className="font-medium">{nearestVertiport.eta}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Available Slots:</span>
                        <div className="font-medium">{nearestVertiport.availableSlots}/{nearestVertiport.totalSlots}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VertiportVertiHub;
