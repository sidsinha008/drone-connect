
import { useState, useMemo } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Plane, 
  MapPin, 
  Layers, 
  Target, 
  Eye, 
  AlertTriangle, 
  Info, 
  Search, 
  WifiOff, 
  Battery, 
  Gauge, 
  Wind,
  Radar,
  Shield,
  Mic,
  Users,
  Share2,
  Volume2,
  Settings,
  Activity,
  Zap,
  Navigation,
  Clock,
  Camera
} from "lucide-react";
import { toast } from "sonner";

// Enhanced mock data with AI attributes for Chennai Smart Skies
const mockDrones = [
  { 
    id: 'VT-DEL-001', 
    type: 'Delivery Drone', 
    status: 'compliant', 
    lat: 13.0827, lng: 80.2707, altitude: 120, speed: 45, heading: 90, battery: 85, 
    flightPlan: true, operator: 'SkyTrans Logistics', location: 'Chennai',
    threatLevel: 1, aiConfidence: 98, behavioralAnomaly: null, predictedAction: 'Proceeding to destination',
    aiClassification: 'DJI Matrice 300 RTK (98% Conf.)', aiRiskAssessment: 'Low - Standard delivery pattern',
    predictedPath: 'Marina Beach → T. Nagar', estimatedDestination: '2 min 30 sec'
  },
  { 
    id: 'MAA-SUR-02', 
    type: 'Surveillance Quadcopter', 
    status: 'non-compliant', 
    lat: 13.0604, lng: 80.2495, altitude: 150, speed: 30, heading: 180, battery: 70, 
    flightPlan: true, operator: 'CityWatch Security', location: 'Chennai',
    threatLevel: 3, aiConfidence: 92, behavioralAnomaly: 'Altitude deviation', predictedAction: 'Possible manual override',
    aiClassification: 'DJI Phantom 4 Pro (92% Conf.)', aiRiskAssessment: 'Medium - Flight plan deviation detected',
    predictedPath: 'Current → Chepauk Stadium periphery', estimatedDestination: '4 min 15 sec'
  },
  { 
    id: 'UNKNOWN-CHN-01', 
    type: 'Unknown', 
    status: 'unidentified', 
    lat: 13.08, lng: 80.28, altitude: 90, speed: 25, heading: 270, battery: null, 
    flightPlan: false, operator: null, location: 'Chennai',
    threatLevel: 5, aiConfidence: 45, behavioralAnomaly: 'Erratic flight path', predictedAction: 'Potential threat assessment required',
    aiClassification: 'Unknown Large Multi-Rotor (45% Conf.)', aiRiskAssessment: 'HIGH - Unidentified, erratic behavior near critical infrastructure',
    predictedPath: 'Approaching Chepauk Stadium', estimatedDestination: 'IMMEDIATE ALERT'
  },
  { 
    id: 'TN-GOV-SEC-3', 
    type: 'Fixed-Wing Inspection', 
    status: 'compliant', 
    lat: 13.0475, lng: 80.2631, altitude: 110, speed: 50, heading: 45, battery: 92, 
    flightPlan: true, operator: 'InfraSec Drones', location: 'Chennai',
    threatLevel: 1, aiConfidence: 99, behavioralAnomaly: null, predictedAction: 'Following inspection route',
    aiClassification: 'Parrot ANAFI USA (99% Conf.)', aiRiskAssessment: 'Low - Authorized government inspection',
    predictedPath: 'Infrastructure inspection corridor', estimatedDestination: '12 min'
  },
  { 
    id: 'PRED-CONF-01',
    type: 'Small Quadcopter',
    status: 'predicted-conflict',
    lat: 13.09, lng: 80.275, altitude: 100, speed: 35, heading: 220, battery: 78,
    flightPlan: true, operator: 'Hobbyist Flyer', location: 'Chennai',
    threatLevel: 4, aiConfidence: 89, behavioralAnomaly: 'Predicted TFR breach', predictedAction: 'Approaching restricted zone - intervention required',
    aiClassification: 'DJI Mini 3 Pro (89% Conf.)', aiRiskAssessment: 'High - Predicted conflict with Chepauk Stadium TFR',
    predictedPath: 'Current trajectory → TFR boundary', estimatedDestination: '1 min 45 sec'
  }
];

const mockAlerts = [
  { 
    id: 1, 
    severity: 'unidentified', 
    message: 'CRITICAL ALERT: Unidentified large multi-rotor approaching Chepauk Stadium. AI Confidence: 45%. Estimated breach in 1 min 45 sec.',
    timestamp: '14:23:15',
    aiPriority: 'IMMEDIATE',
    responseStatus: 'Security dispatched'
  },
  { 
    id: 2, 
    severity: 'predicted-conflict', 
    message: 'PREDICTIVE ALERT: PRED-CONF-01 on collision course with TFR. AI suggests immediate operator contact.',
    timestamp: '14:22:48',
    aiPriority: 'HIGH',
    responseStatus: 'Operator contacted'
  },
  { 
    id: 3, 
    severity: 'non-compliant', 
    message: 'WARNING: MAA-SUR-02 altitude deviation detected. Exceeding approved flight ceiling by 30m.',
    timestamp: '14:21:30',
    aiPriority: 'MEDIUM',
    responseStatus: 'Auto-warning sent'
  },
  { 
    id: 4, 
    severity: 'info', 
    message: 'INFO: Chennai Smart Skies system integration successful. All sensors online.',
    timestamp: '14:20:00',
    aiPriority: 'LOW',
    responseStatus: 'Acknowledged'
  }
];

const getStatusClasses = (status: string) => {
  switch (status) {
    case 'compliant': return { 
      dot: 'bg-green-500', 
      text: 'text-green-700', 
      badge: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-300', 
      map: 'bg-green-500/80 shadow-green-500/50' 
    };
    case 'non-compliant': return { 
      dot: 'bg-yellow-500', 
      text: 'text-yellow-700', 
      badge: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-300', 
      map: 'bg-yellow-500/80 shadow-yellow-500/50 animate-pulse' 
    };
    case 'unidentified': return { 
      dot: 'bg-red-500', 
      text: 'text-red-700', 
      badge: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-300', 
      map: 'bg-red-500/90 shadow-red-500/70 animate-pulse border-red-500' 
    };
    case 'predicted-conflict': return { 
      dot: 'bg-orange-500', 
      text: 'text-orange-700', 
      badge: 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-300', 
      map: 'bg-orange-500/80 shadow-orange-500/50 animate-pulse' 
    };
    case 'offline': return { 
      dot: 'bg-gray-500', 
      text: 'text-gray-700', 
      badge: 'bg-gray-100 dark:bg-gray-800/20 text-gray-700 dark:text-gray-400 border-gray-300', 
      map: 'bg-gray-500/80 opacity-50' 
    };
    default: return { 
      dot: 'bg-gray-500', 
      text: 'text-gray-700', 
      badge: 'bg-gray-100', 
      map: 'bg-gray-500/80' 
    };
  }
}

const getAlertIcon = (severity: string) => {
  switch (severity) {
    case 'unidentified': return <AlertTriangle className="text-red-500" />;
    case 'non-compliant': return <AlertTriangle className="text-yellow-500" />;
    case 'predicted-conflict': return <Zap className="text-orange-500" />;
    case 'info': return <Info className="text-blue-500" />;
    default: return <Info className="text-gray-500" />;
  }
}

const CombinedMapTraffic = () => {
  const [selectedDrone, setSelectedDrone] = useState<string | null>(null);
  const [selectedDrones, setSelectedDrones] = useState<string[]>([]);
  const [showRestrictedZones, setShowRestrictedZones] = useState(true);
  const [showTFRs, setShowTFRs] = useState(true);
  const [showGeofences, setShowGeofences] = useState(true);
  const [showSensorCoverage, setShowSensorCoverage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [spottingMode, setSpottingMode] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const handleSpotAnomaly = () => {
    setSpottingMode(!spottingMode);
    toast(spottingMode ? "Spotting mode deactivated" : "AI-Assisted Spotting Mode Activated", {
      description: spottingMode ? "Normal map interaction restored" : "Click on the map to mark unidentified drone location. AI will assist with classification.",
      icon: <Radar size={16} className="text-blue-500" />,
    });
  };

  const handleVoiceCommand = () => {
    setVoiceEnabled(!voiceEnabled);
    toast(voiceEnabled ? "Voice commands disabled" : "Voice commands activated", {
      description: voiceEnabled ? "Touch/click interaction only" : "Say 'Mark drone at [location]' or 'Show threat level high'",
      icon: <Mic size={16} className={voiceEnabled ? "text-green-500" : "text-blue-500"} />,
    });
  };

  const handleMultiSelect = (droneId: string) => {
    setSelectedDrones(prev => 
      prev.includes(droneId) 
        ? prev.filter(id => id !== droneId)
        : [...prev, droneId]
    );
  };

  const handleBatchAction = (action: string) => {
    toast(`Batch Action: ${action}`, {
      description: `Applied to ${selectedDrones.length} selected drones`,
      icon: <Users size={16} className="text-blue-500" />,
    });
  };

  const handleResponseAction = (action: string, droneId: string) => {
    const drone = mockDrones.find(d => d.id === droneId);
    toast(`${action} initiated for ${droneId}`, {
      description: `AI Risk Level: ${drone?.threatLevel}/5 - ${drone?.aiRiskAssessment}`,
      icon: <Shield size={16} className="text-blue-500" />,
    });
  };

  const filteredDrones = useMemo(() => {
    return mockDrones.filter(drone => 
      drone.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (drone.operator && drone.operator.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (drone.aiClassification && drone.aiClassification.toLowerCase().includes(searchTerm.toLowerCase()))
    ).sort((a, b) => b.threatLevel - a.threatLevel);
  }, [searchTerm]);

  const mapCenter = { lat: 13.06, lng: 80.265 };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Enhanced Header */}
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-1 flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Radar className="text-primary w-6 h-6" />
            </div>
            Chennai Smart Skies
          </h1>
          <p className="text-muted-foreground">AI-Powered Real-time Drone Airspace Management & Threat Detection</p>
        </div>
        <div className="flex gap-2 items-center">
          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
            <Activity className="w-3 h-3 mr-1" />
            All Systems Online
          </Badge>
          <Button variant="outline" size="sm" onClick={handleVoiceCommand}>
            <Mic className={`w-4 h-4 mr-2 ${voiceEnabled ? 'text-green-500' : ''}`} />
            Voice {voiceEnabled ? 'ON' : 'OFF'}
          </Button>
        </div>
      </div>

      {/* Airspace Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Compliant</p>
                <p className="text-2xl font-bold text-green-700">
                  {filteredDrones.filter(d => d.status === 'compliant').length}
                </p>
              </div>
              <Shield className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600 font-medium">Warnings</p>
                <p className="text-2xl font-bold text-yellow-700">
                  {filteredDrones.filter(d => d.status === 'non-compliant').length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 font-medium">Threats</p>
                <p className="text-2xl font-bold text-red-700">
                  {filteredDrones.filter(d => d.status === 'unidentified').length}
                </p>
              </div>
              <Target className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Predicted</p>
                <p className="text-2xl font-bold text-orange-700">
                  {filteredDrones.filter(d => d.status === 'predicted-conflict').length}
                </p>
              </div>
              <Zap className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Active</p>
                <p className="text-2xl font-bold text-blue-700">{filteredDrones.length}</p>
              </div>
              <Plane className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-3">
        {/* Enhanced Interactive Map */}
        <div className="xl:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="text-primary" size={20} />
                  Chennai Airspace Command Center
                </CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant={spottingMode ? "destructive" : "outline"} 
                    size="sm" 
                    onClick={handleSpotAnomaly}
                  >
                    <Radar className="w-4 h-4 mr-2" />
                    {spottingMode ? 'Exit Spotting' : 'Spot Anomaly'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    CCTV Feed
                  </Button>
                </div>
              </div>
              <CardDescription>
                {filteredDrones.length} active drones detected • AI-Enhanced 3D Airspace View
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`relative rounded-lg overflow-hidden border bg-muted/20 h-[600px] ${spottingMode ? 'cursor-crosshair border-red-500 border-2' : ''}`}>
                <div className="w-full h-full bg-cover bg-center flex items-center justify-center relative" style={{backgroundImage: "url('https://images.unsplash.com/photo-1616892314599-0417122e4313?q=80&w=2070&auto=format&fit=crop')"}}>
                  {/* Enhanced Drone Markers */}
                  {filteredDrones.map(drone => (
                    <div 
                      key={drone.id}
                      className={`absolute w-10 h-10 -ml-5 -mt-5 transition-all duration-300 cursor-pointer ${
                        selectedDrone === drone.id ? "z-20 scale-150" : 
                        selectedDrones.includes(drone.id) ? "z-10 scale-125 ring-2 ring-blue-500" : "z-0"
                      }`}
                      style={{ 
                        left: `calc(50% + ${(drone.lng - mapCenter.lng) * 4000}px)`,
                        top: `calc(50% + ${(mapCenter.lat - drone.lat) * 8000}px)`,
                        transform: `rotate(${drone.heading}deg)`,
                      }}
                      onClick={() => {
                        if (selectedDrones.length > 0) {
                          handleMultiSelect(drone.id);
                        } else {
                          setSelectedDrone(selectedDrone === drone.id ? null : drone.id);
                        }
                      }}
                    >
                      <div 
                        className={`rounded-full w-full h-full flex items-center justify-center 
                        ${getStatusClasses(drone.status).map} 
                        border-2 border-white shadow-lg hover:shadow-xl`}
                      >
                        <Plane size={20} className="text-white -rotate-90" />
                      </div>
                      {/* AI Confidence Badge */}
                      <div className="absolute -top-2 -right-2 bg-black/80 text-white text-xs px-1 py-0.5 rounded text-center min-w-8">
                        {drone.aiConfidence}%
                      </div>
                      {/* Predicted Path */}
                      {drone.status !== 'offline' && (
                        <div className="absolute top-full left-1/2 w-0.5 h-16 bg-current opacity-50 transform -translate-x-1/2" />
                      )}
                    </div>
                  ))}
                  
                  {/* Enhanced Airspace Overlays */}
                  {showRestrictedZones && (
                    <div className="absolute w-64 h-64 rounded-lg border-2 border-dashed border-red-500/60 bg-red-500/10 left-1/4 top-1/4 -ml-32 -mt-32 flex items-center justify-center text-red-500/80 text-xs font-semibold">
                      <div className="text-center">
                        <Shield className="w-6 h-6 mx-auto mb-1" />
                        Chennai Airport<br/>RED ZONE
                      </div>
                    </div>
                  )}
                  
                  {showTFRs && (
                    <div className="absolute w-48 h-48 rounded-full border-2 border-dashed border-blue-500/60 bg-blue-500/10 left-2/3 top-1/2 -ml-24 -mt-24 flex items-center justify-center text-blue-500/80 text-xs font-semibold">
                      <div className="text-center">
                        <AlertTriangle className="w-6 h-6 mx-auto mb-1" />
                        Chepauk Stadium<br/>TFR Active
                      </div>
                    </div>
                  )}
                  
                  {showGeofences && (
                    <div className="absolute w-40 h-40 rounded border-2 border-dashed border-yellow-500/60 bg-yellow-500/10 right-1/4 bottom-1/4 -mr-20 -mb-20 flex items-center justify-center text-yellow-500/80 text-xs font-semibold">
                      <div className="text-center">
                        <MapPin className="w-5 h-5 mx-auto mb-1" />
                        Marina Beach<br/>GEOFENCE
                      </div>
                    </div>
                  )}
                  
                  {showSensorCoverage && (
                    <div className="absolute inset-0 bg-gradient-radial from-green-500/20 via-green-500/10 to-transparent" />
                  )}
                  
                  {spottingMode && (
                    <div className="absolute inset-0 bg-red-500/5 border-2 border-red-500 border-dashed flex items-center justify-center">
                      <div className="bg-red-500/90 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                        <Radar className="w-4 h-4 inline mr-2" />
                        AI-ASSISTED SPOTTING MODE ACTIVE
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Batch Actions Bar */}
              {selectedDrones.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-700">
                    {selectedDrones.length} drones selected
                  </span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleBatchAction('Track All')}>
                      <Eye className="w-4 h-4 mr-1" />
                      Track All
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleBatchAction('Alert Operators')}>
                      <Volume2 className="w-4 h-4 mr-1" />
                      Alert Operators
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setSelectedDrones([])}>
                      Clear Selection
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enhanced AI Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Zap size={18} className="text-orange-500" />
                AI-Prioritized Alerts & Threat Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-64 overflow-auto">
              {mockAlerts.map(alert => (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 border hover:bg-secondary/70 transition-colors">
                  <div className="flex flex-col items-center gap-1">
                    {getAlertIcon(alert.severity)}
                    <Badge variant="outline" className="text-xs px-1">
                      {alert.aiPriority}
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-secondary-foreground mb-1">{alert.message}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {alert.timestamp}
                      </span>
                      <span className="text-blue-600">{alert.responseStatus}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Share2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Control Panel */}
        <div className="xl:col-span-1 space-y-4">
          {/* AI Spot & Report */}
          <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target size={20} className="text-red-500" />
                AI Anomaly Detection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full" 
                onClick={handleSpotAnomaly} 
                variant={spottingMode ? "destructive" : "default"}
              >
                <Radar size={16} className="mr-2" />
                {spottingMode ? 'Exit Spotting Mode' : 'Activate AI Spotting'}
              </Button>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• AI-assisted drone classification</p>
                <p>• Multi-sensor data fusion</p>
                <p>• Predictive threat assessment</p>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Map Layers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers size={20} />
                Airspace Layers & Sensors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="restricted-zones" className="text-sm font-medium flex items-center gap-2">
                    <Shield className="w-4 h-4 text-red-500" />
                    Restricted Zones
                  </label>
                  <Switch id="restricted-zones" checked={showRestrictedZones} onCheckedChange={setShowRestrictedZones} />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="tfrs" className="text-sm font-medium flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-blue-500" />
                    TFRs (Live)
                  </label>
                  <Switch id="tfrs" checked={showTFRs} onCheckedChange={setShowTFRs} />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="geofences" className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-yellow-500" />
                    Custom Geofences
                  </label>
                  <Switch id="geofences" checked={showGeofences} onCheckedChange={setShowGeofences} />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="sensor-coverage" className="text-sm font-medium flex items-center gap-2">
                    <Radar className="w-4 h-4 text-green-500" />
                    Sensor Coverage
                  </label>
                  <Switch id="sensor-coverage" checked={showSensorCoverage} onCheckedChange={setShowSensorCoverage} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Enhanced Drone List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity size={20} />
                AI-Ranked Threat Assessment
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search drones, operators, or AI classifications..." 
                  className="pl-8" 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
              </div>
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-auto pr-2 space-y-3">
              {filteredDrones.length > 0 ? filteredDrones.map(drone => (
                <div
                  key={drone.id}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    selectedDrone === drone.id ? 'bg-secondary border-primary' : 
                    selectedDrones.includes(drone.id) ? 'bg-blue-50 border-blue-300' : 
                    'hover:bg-secondary/50'
                  }`}
                  onClick={() => setSelectedDrone(selectedDrone === drone.id ? null : drone.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2 font-semibold">
                      <div className={`w-3 h-3 rounded-full ${getStatusClasses(drone.status).dot}`}></div>
                      <span className="text-sm">{drone.id}</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMultiSelect(drone.id);
                        }}
                      >
                        <Users className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant="outline" className={`text-xs ${getStatusClasses(drone.status).badge}`}>
                        Threat: {drone.threatLevel}/5
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        AI: {drone.aiConfidence}%
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="text-xs space-y-1">
                    <div className="font-medium text-blue-600">{drone.aiClassification}</div>
                    <div className="text-muted-foreground">{drone.operator || "Unknown Operator"}</div>
                    
                    <div className="flex items-center gap-4 flex-wrap text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Gauge size={10} /> {drone.altitude}m
                      </span>
                      <span className="flex items-center gap-1">
                        <Wind size={10} /> {drone.speed}km/h
                      </span>
                      {drone.battery && (
                        <span className="flex items-center gap-1">
                          <Battery size={10} /> {drone.battery}%
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-2 space-y-1">
                      <div className="text-orange-600 font-medium text-xs">
                        Risk: {drone.aiRiskAssessment}
                      </div>
                      {drone.behavioralAnomaly && (
                        <div className="text-red-600 text-xs">
                          ⚠ {drone.behavioralAnomaly}
                        </div>
                      )}
                      <div className="text-blue-600 text-xs">
                        → {drone.predictedAction}
                      </div>
                      <div className="text-green-600 text-xs">
                        📍 {drone.predictedPath} • ETA: {drone.estimatedDestination}
                      </div>
                    </div>
                    
                    {/* Quick Response Actions */}
                    {drone.threatLevel >= 3 && (
                      <div className="mt-2 flex gap-1">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs h-6 px-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleResponseAction('Contact Operator', drone.id);
                          }}
                        >
                          Contact
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs h-6 px-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleResponseAction('Dispatch Security', drone.id);
                          }}
                        >
                          Dispatch
                        </Button>
                        {drone.threatLevel >= 4 && (
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            className="text-xs h-6 px-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleResponseAction('Emergency Response', drone.id);
                            }}
                          >
                            Emergency
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No drones match your search criteria
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CombinedMapTraffic;
