
import { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Battery, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Activity, 
  Zap, 
  Wind, 
  Thermometer, 
  Target, 
  Settings, 
  Eye, 
  Download,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Wrench,
  Cpu,
  Gauge,
  Shield,
  Globe,
  Layers,
  Navigation,
  Package,
  Brain,
  TrendingDownIcon,
  CloudRain,
  Sun,
  CloudSnow,
  Cloudy,
  AlertCircle,
  Calendar,
  Users,
  Radar,
  Satellite,
  Radio,
  Wifi,
  BatteryWarning
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  AreaChart,
  Area,
  ComposedChart
} from "recharts";

import MissionTypeConfiguration from "./MissionTypeConfiguration";
import DrillDownAnalytics from "./DrillDownAnalytics";

// Enhanced mock data for comprehensive AI/ML analytics
const fleetKpis = {
  totalFlightHours: { value: 1247, change: 12.5, trend: "up", target: 1300 },
  missionSuccessRate: { value: 94.2, change: -2.1, trend: "down", target: 96.0 },
  nextMaintenanceDue: { value: 3, change: 0, trend: "neutral", target: 5 },
  anomalyAlerts: { value: 7, change: 40, trend: "up", target: 3 },
  dronesInOperation: { value: 23, change: 15, trend: "up", target: 25 },
  predictedFailureRate: { value: 2.1, change: -12, trend: "down", target: 1.5 },
  fleetHealthScore: { value: 87, change: 3, trend: "up", target: 90 },
  avgPowerConsumption: { value: 245, change: -8, trend: "down", target: 230 }
};

const missionData = [
  { date: "Mon", successful: 45, failed: 3, efficiency: 93.7, powerConsumption: 234, dataCollected: 1200 },
  { date: "Tue", successful: 52, failed: 2, efficiency: 96.3, powerConsumption: 218, dataCollected: 1450 },
  { date: "Wed", successful: 48, failed: 5, efficiency: 90.6, powerConsumption: 267, dataCollected: 1100 },
  { date: "Thu", successful: 61, failed: 1, efficiency: 98.4, powerConsumption: 203, dataCollected: 1680 },
  { date: "Fri", successful: 55, failed: 4, efficiency: 93.2, powerConsumption: 241, dataCollected: 1320 },
  { date: "Sat", successful: 67, failed: 2, efficiency: 97.1, powerConsumption: 215, dataCollected: 1580 },
  { date: "Sun", successful: 43, failed: 3, efficiency: 93.5, powerConsumption: 252, dataCollected: 1050 }
];

const failureReasons = [
  { name: "Battery Depleted", value: 35, color: "#ef4444", trend: "increasing" },
  { name: "Communication Loss", value: 25, color: "#f97316", trend: "stable" },
  { name: "GPS Error", value: 20, color: "#eab308", trend: "decreasing" },
  { name: "Weather Conditions", value: 15, color: "#06b6d4", trend: "seasonal" },
  { name: "Pilot Error", value: 5, color: "#8b5cf6", trend: "decreasing" }
];

const componentHealth = [
  { 
    component: "Motors", 
    health: 87, 
    riskLevel: "Low", 
    dronesAffected: 3, 
    rul: "45 days",
    degradationRate: 2.1,
    maintenanceHistory: "Last: 12 days ago"
  },
  { 
    component: "Batteries", 
    health: 72, 
    riskLevel: "Medium", 
    dronesAffected: 8, 
    rul: "12 days",
    degradationRate: 5.8,
    maintenanceHistory: "Last: 3 days ago"
  },
  { 
    component: "Propellers", 
    health: 91, 
    riskLevel: "Low", 
    dronesAffected: 2, 
    rul: "67 days",
    degradationRate: 1.3,
    maintenanceHistory: "Last: 8 days ago"
  },
  { 
    component: "Sensors", 
    health: 45, 
    riskLevel: "High", 
    dronesAffected: 5, 
    rul: "3 days",
    degradationRate: 12.4,
    maintenanceHistory: "Overdue: 2 days"
  },
  { 
    component: "GPS Module", 
    health: 83, 
    riskLevel: "Low", 
    dronesAffected: 1, 
    rul: "28 days",
    degradationRate: 3.2,
    maintenanceHistory: "Last: 6 days ago"
  }
];

const altitudeData = [
  { range: "0-50m", frequency: 245, efficiency: 94.2, batteryDrain: 15.2 },
  { range: "51-100m", frequency: 187, efficiency: 96.1, batteryDrain: 18.7 },
  { range: "101-200m", frequency: 134, efficiency: 92.8, batteryDrain: 23.4 },
  { range: "201-300m", frequency: 89, efficiency: 89.3, batteryDrain: 31.8 },
  { range: ">300m", frequency: 45, efficiency: 85.7, batteryDrain: 42.1 }
];

const weatherImpact = [
  { condition: "Clear", missions: 45, success: 97.8, avgSpeed: 12.3, powerIncrease: 0, icon: Sun },
  { condition: "Light Rain", missions: 23, success: 89.1, avgSpeed: 10.8, powerIncrease: 15, icon: CloudRain },
  { condition: "Windy", missions: 34, success: 91.2, avgSpeed: 9.7, powerIncrease: 25, icon: Wind },
  { condition: "Fog", missions: 12, success: 83.3, avgSpeed: 8.2, powerIncrease: 8, icon: Cloudy },
  { condition: "Snow", missions: 8, success: 62.5, avgSpeed: 6.1, powerIncrease: 35, icon: CloudSnow }
];

const anomalyFeed = [
  { 
    id: 1, 
    type: "Power Spike", 
    drone: "DRN-001", 
    severity: "High", 
    time: "2 min ago", 
    rootCause: "Motor overheating",
    confidence: 94,
    location: "Sector 7A"
  },
  { 
    id: 2, 
    type: "Altitude Deviation", 
    drone: "DRN-045", 
    severity: "Medium", 
    time: "5 min ago", 
    rootCause: "GPS drift",
    confidence: 87,
    location: "Sector 3B"
  },
  { 
    id: 3, 
    type: "Communication Loss", 
    drone: "DRN-023", 
    severity: "Low", 
    time: "12 min ago", 
    rootCause: "Signal interference",
    confidence: 76,
    location: "Sector 12C"
  },
  { 
    id: 4, 
    type: "Motor Vibration", 
    drone: "DRN-067", 
    severity: "High", 
    time: "18 min ago", 
    rootCause: "Propeller imbalance",
    confidence: 91,
    location: "Sector 5A"
  }
];

const fleetLocations = [
  { id: "DRN-001", lat: 40.7128, lng: -74.0060, status: "Active", mission: "Surveillance", battery: 87, altitude: 150 },
  { id: "DRN-002", lat: 40.7589, lng: -73.9851, status: "Returning", mission: "Delivery", battery: 34, altitude: 120 },
  { id: "DRN-003", lat: 40.6892, lng: -74.0445, status: "Maintenance", mission: "Idle", battery: 100, altitude: 0 },
  { id: "DRN-004", lat: 40.7831, lng: -73.9712, status: "Active", mission: "Inspection", battery: 72, altitude: 200 },
  { id: "DRN-005", lat: 40.7505, lng: -73.9934, status: "Active", mission: "Search & Rescue", battery: 58, altitude: 300 },
  { id: "DRN-006", lat: 40.7282, lng: -73.9942, status: "Charging", mission: "Standby", battery: 15, altitude: 0 }
];

const terrainAnalysis = [
  { terrain: "Urban Dense", flights: 156, avgSpeed: 8.2, batteryUsage: 142, successRate: 94.2 },
  { terrain: "Urban Sparse", flights: 89, avgSpeed: 11.5, batteryUsage: 118, successRate: 96.8 },
  { terrain: "Suburban", flights: 134, avgSpeed: 13.7, batteryUsage: 105, successRate: 97.1 },
  { terrain: "Rural", flights: 78, avgSpeed: 15.2, batteryUsage: 98, successRate: 98.3 },
  { terrain: "Water Bodies", flights: 45, avgSpeed: 14.8, batteryUsage: 112, successRate: 95.7 },
  { terrain: "Mountain", flights: 23, avgSpeed: 9.1, batteryUsage: 178, successRate: 87.4 }
];

const DroneAnalytics = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedMissionType, setSelectedMissionType] = useState<string>("all");
  const [showConfiguration, setShowConfiguration] = useState(false);
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedDrone, setSelectedDrone] = useState<string | null>(null);

  const handleMissionTypeChange = (missionType: string) => {
    setSelectedMissionType(missionType);
    console.log(`Switching to mission type: ${missionType}`);
  };

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    console.log(`Time range changed to: ${range}`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Brain className="text-primary" size={32} />
            AI/ML Drone Analytics Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Predictive insights and operational intelligence powered by machine learning
            {selectedMissionType !== "all" && (
              <span className="ml-2 text-primary font-medium">
                • {selectedMissionType.charAt(0).toUpperCase() + selectedMissionType.slice(1)} Mission Focus
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 p-2 border rounded-lg bg-background">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <select 
              value={timeRange} 
              onChange={(e) => handleTimeRangeChange(e.target.value)}
              className="bg-transparent border-none outline-none text-sm font-medium"
            >
              <option value="1d">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
          </div>
          <div className="flex items-center gap-2 p-2 border rounded-lg bg-background">
            <Target className="w-4 h-4 text-muted-foreground" />
            <select 
              value={selectedMissionType} 
              onChange={(e) => handleMissionTypeChange(e.target.value)}
              className="bg-transparent border-none outline-none text-sm font-medium min-w-[180px]"
            >
              <option value="all">All Mission Types</option>
              <option value="inspection">Inspection Survey</option>
              <option value="delivery">Delivery Logistics</option>
              <option value="security">Security Patrol</option>
              <option value="agricultural">Agricultural Spraying</option>
              <option value="rescue">Search & Rescue</option>
            </select>
          </div>
          <Button 
            variant={showConfiguration ? "default" : "outline"}
            size="sm"
            onClick={() => setShowConfiguration(!showConfiguration)}
          >
            <Settings className="w-4 h-4 mr-2" />
            {showConfiguration ? "Back to Dashboard" : "Configure"}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Data Latency Indicator */}
      <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-700">Live Data Stream Active</span>
        </div>
        <span className="text-sm text-green-600">Last updated: 12 seconds ago</span>
      </div>

      {showConfiguration ? (
        <MissionTypeConfiguration onConfigurationChange={(config) => console.log(config)} />
      ) : (
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="overview">Fleet Overview</TabsTrigger>
              <TabsTrigger value="missions">Mission Performance</TabsTrigger>
              <TabsTrigger value="environment">Environmental Impact</TabsTrigger>
              <TabsTrigger value="predictive">Predictive Maintenance</TabsTrigger>
              <TabsTrigger value="anomalies">Anomaly Detection</TabsTrigger>
              <TabsTrigger value="geographic">Geographic Intelligence</TabsTrigger>
              <TabsTrigger value="drilldown">Drill-Down Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Enhanced KPI Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Object.entries(fleetKpis).map(([key, data]) => (
                  <EnhancedKpiCard
                    key={key}
                    title={formatKpiTitle(key)}
                    value={data.value}
                    unit={getKpiUnit(key)}
                    change={data.change}
                    trend={data.trend}
                    target={data.target}
                    icon={getKpiIcon(key)}
                  />
                ))}
              </div>

              {/* AI Fleet Health Score */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="text-primary" size={20} />
                    AI-Driven Fleet Health Score
                  </CardTitle>
                  <CardDescription>Machine learning assessment of overall fleet condition and risk profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center justify-center">
                      <div className="relative w-40 h-40">
                        <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 120 120">
                          <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="10"/>
                          <circle 
                            cx="60" 
                            cy="60" 
                            r="50" 
                            fill="none" 
                            stroke="#10b981" 
                            strokeWidth="10"
                            strokeDasharray={`${87 * 3.14159} ${100 * 3.14159}`}
                            className="transition-all duration-1000"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-4xl font-bold text-green-600">87</span>
                          <span className="text-sm text-muted-foreground">Health Score</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Component Health</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-secondary rounded-full">
                              <div className="w-[85%] h-2 bg-green-500 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">85%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Flight Performance</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-secondary rounded-full">
                              <div className="w-[92%] h-2 bg-blue-500 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">92%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Maintenance Status</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-secondary rounded-full">
                              <div className="w-[78%] h-2 bg-yellow-500 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">78%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Environmental Adaptation</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-secondary rounded-full">
                              <div className="w-[89%] h-2 bg-purple-500 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">89%</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-700">
                          <strong>AI Insight:</strong> Fleet health is above average. Primary risk factor: 
                          8 batteries approaching cycle limit. Recommend scheduled maintenance in 12-15 days.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Interactive Geographic Fleet Map */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="text-primary" size={20} />
                    Real-Time Fleet Geographic Distribution
                    <Badge variant="outline" className="ml-auto">Live Tracking</Badge>
                  </CardTitle>
                  <CardDescription>Interactive map with heatmap overlay and clustering for fleet visibility</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[500px] bg-gradient-to-br from-blue-50 to-green-50 rounded-lg relative overflow-hidden border">
                    {/* Simulated Map with Enhanced Features */}
                    <div className="absolute inset-0">
                      {/* Flight Path Traces */}
                      <svg className="absolute inset-0 w-full h-full">
                        <path 
                          d="M 100 200 Q 200 100 300 150 T 500 200" 
                          stroke="#3b82f6" 
                          strokeWidth="2" 
                          fill="none" 
                          strokeDasharray="5,5"
                          className="opacity-60"
                        />
                        <path 
                          d="M 150 300 Q 250 200 350 250 T 450 300" 
                          stroke="#10b981" 
                          strokeWidth="2" 
                          fill="none" 
                          strokeDasharray="5,5"
                          className="opacity-60"
                        />
                      </svg>
                      
                      {/* Drone Markers with Enhanced Info */}
                      {fleetLocations.map((drone, index) => (
                        <div 
                          key={drone.id}
                          className={`absolute cursor-pointer transform hover:scale-150 transition-all duration-300 ${
                            selectedDrone === drone.id ? 'scale-150 z-20' : 'z-10'
                          }`}
                          style={{
                            left: `${15 + index * 12}%`,
                            top: `${25 + index * 8}%`,
                          }}
                          onClick={() => setSelectedDrone(selectedDrone === drone.id ? null : drone.id)}
                        >
                          <div className="relative">
                            <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg ${
                              drone.status === "Active" ? "bg-green-500" :
                              drone.status === "Returning" ? "bg-yellow-500" :
                              drone.status === "Charging" ? "bg-blue-500" : "bg-red-500"
                            }`}>
                              <div className="absolute -inset-1 rounded-full border border-white/50 animate-pulse"></div>
                            </div>
                            {selectedDrone === drone.id && (
                              <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-xl border min-w-[200px] z-30">
                                <div className="text-sm font-semibold">{drone.id}</div>
                                <div className="text-xs text-muted-foreground">{drone.mission}</div>
                                <div className="flex justify-between mt-2 text-xs">
                                  <span>Battery: {drone.battery}%</span>
                                  <span>Alt: {drone.altitude}m</span>
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                  <div className={`w-2 h-2 rounded-full ${
                                    drone.status === "Active" ? "bg-green-500" : "bg-yellow-500"
                                  }`}></div>
                                  <span className="text-xs">{drone.status}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      {/* Heat Map Areas */}
                      <div className="absolute top-20 left-20 w-24 h-24 bg-red-500/20 rounded-full blur-sm"></div>
                      <div className="absolute top-32 right-32 w-32 h-32 bg-orange-500/20 rounded-full blur-sm"></div>
                      <div className="absolute bottom-24 left-1/3 w-20 h-20 bg-yellow-500/20 rounded-full blur-sm"></div>
                    </div>
                    
                    {/* Enhanced Legend */}
                    <div className="absolute bottom-4 left-4 bg-white/95 p-4 rounded-lg backdrop-blur-sm">
                      <h4 className="font-semibold mb-3 text-sm">Fleet Status & Heat Map</h4>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span>Active: 3 drones</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span>Returning: 1 drone</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span>Charging: 1 drone</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500/40 rounded-full"></div>
                            <span>High Activity</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-orange-500/40 rounded-full"></div>
                            <span>Medium Activity</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-yellow-500/40 rounded-full"></div>
                            <span>Low Activity</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Insights Panel */}
                    <div className="absolute top-4 right-4 bg-white/95 p-4 rounded-lg backdrop-blur-sm max-w-xs">
                      <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                        <Brain className="w-4 h-4 text-primary" />
                        AI Route Analysis
                      </h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                          <span>Optimal routes: 85% efficiency</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-3 h-3 text-yellow-500" />
                          <span>Traffic congestion: Sector 7A</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-3 h-3 text-blue-500" />
                          <span>Fuel savings: 12.5% vs planned</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="missions" className="space-y-6">
              {/* Mission Performance Analytics */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="text-primary" size={20} />
                      Mission Success vs. Failure Analysis
                    </CardTitle>
                    <CardDescription>AI-powered trend analysis with predictive insights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={missionData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip />
                          <Bar yAxisId="left" dataKey="successful" fill="#10b981" name="Successful" />
                          <Bar yAxisId="left" dataKey="failed" fill="#ef4444" name="Failed" />
                          <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="#0ea5e9" strokeWidth={3} name="Efficiency %" />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="text-primary" size={20} />
                      Failure Reason Distribution & Trends
                    </CardTitle>
                    <CardDescription>ML-categorized failure analysis with trend indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={failureReasons}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {failureReasons.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Flight Path Analysis */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Navigation className="text-primary" size={20} />
                    Flight Path Analysis & Route Optimization
                  </CardTitle>
                  <CardDescription>AI-driven route efficiency analysis and optimization recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Route Efficiency Metrics</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Optimal Route Adherence</span>
                          <Badge variant="outline">94.2%</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Average Speed Variance</span>
                          <Badge variant="outline">±8.7%</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Fuel Efficiency Gain</span>
                          <Badge variant="outline" className="text-green-600">+12.5%</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold">High-Traffic Corridors</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 rounded border">
                          <span className="text-sm">Downtown Corridor</span>
                          <Badge variant="outline">847 flights</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded border">
                          <span className="text-sm">Industrial Zone</span>
                          <Badge variant="outline">623 flights</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded border">
                          <span className="text-sm">Port Authority</span>
                          <Badge variant="outline">445 flights</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold">AI Recommendations</h4>
                      <div className="space-y-2 text-sm">
                        <div className="p-2 bg-blue-50 rounded border-l-2 border-blue-500">
                          <p className="font-medium">Route Optimization</p>
                          <p className="text-muted-foreground">Reroute 15% of downtown flights via Sector 9B for 8% efficiency gain</p>
                        </div>
                        <div className="p-2 bg-green-50 rounded border-l-2 border-green-500">
                          <p className="font-medium">Traffic Management</p>
                          <p className="text-muted-foreground">Implement time-slot scheduling for Industrial Zone</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="environment" className="space-y-6">
              {/* Environmental Impact Analysis */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="text-primary" size={20} />
                      Altitude Distribution & Performance
                    </CardTitle>
                    <CardDescription>Flight patterns and efficiency across altitude zones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={altitudeData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="range" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip />
                          <Bar yAxisId="left" dataKey="frequency" fill="#0ea5e9" name="Flight Frequency" />
                          <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={3} name="Efficiency %" />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wind className="text-primary" size={20} />
                      Weather Impact Correlation
                    </CardTitle>
                    <CardDescription>Performance analysis across weather conditions with ML insights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {weatherImpact.map((weather, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                          <div className="flex items-center gap-3">
                            <weather.icon className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{weather.condition}</div>
                              <div className="text-sm text-muted-foreground">{weather.missions} missions</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="text-center">
                              <div className="font-medium">{weather.success}%</div>
                              <div className="text-muted-foreground">Success</div>
                            </div>
                            <div className="text-center">
                              <div className="font-medium">{weather.avgSpeed} km/h</div>
                              <div className="text-muted-foreground">Avg Speed</div>
                            </div>
                            <div className="text-center">
                              <div className={`font-medium ${weather.powerIncrease > 20 ? 'text-red-500' : weather.powerIncrease > 10 ? 'text-yellow-500' : 'text-green-500'}`}>
                                +{weather.powerIncrease}%
                              </div>
                              <div className="text-muted-foreground">Power</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Terrain Analysis */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="text-primary" size={20} />
                    Terrain Profile & Performance Impact
                  </CardTitle>
                  <CardDescription>AI analysis of terrain complexity correlation with drone performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={terrainAnalysis}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="terrain" angle={-45} textAnchor="end" height={100} />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Bar yAxisId="left" dataKey="flights" fill="#8884d8" name="Flight Count" />
                        <Line yAxisId="right" type="monotone" dataKey="successRate" stroke="#10b981" strokeWidth={3} name="Success Rate %" />
                        <Line yAxisId="right" type="monotone" dataKey="avgSpeed" stroke="#f59e0b" strokeWidth={2} name="Avg Speed" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="predictive" className="space-y-6">
              {/* Enhanced Predictive Maintenance */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="text-primary" size={20} />
                    AI-Powered Predictive Maintenance Scorecard
                  </CardTitle>
                  <CardDescription>Machine learning-driven component health analysis and RUL predictions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {componentHealth.map((component, index) => (
                      <div key={index} className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              component.riskLevel === "High" ? "bg-red-100 text-red-600" :
                              component.riskLevel === "Medium" ? "bg-yellow-100 text-yellow-600" : 
                              "bg-green-100 text-green-600"
                            }`}>
                              {component.component === "Motors" ? <Cpu className="w-4 h-4" /> :
                               component.component === "Batteries" ? <Battery className="w-4 h-4" /> :
                               component.component === "Sensors" ? <Radar className="w-4 h-4" /> :
                               component.component === "GPS Module" ? <Satellite className="w-4 h-4" /> :
                               <Settings className="w-4 h-4" />}
                            </div>
                            <div>
                              <span className="font-medium text-lg">{component.component}</span>
                              <div className="text-sm text-muted-foreground">{component.maintenanceHistory}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge variant={component.riskLevel === "High" ? "destructive" : component.riskLevel === "Medium" ? "default" : "secondary"}>
                              {component.riskLevel} Risk
                            </Badge>
                            <div className="text-right">
                              <div className="text-sm font-medium">RUL: {component.rul}</div>
                              <div className="text-xs text-muted-foreground">{component.dronesAffected} drones affected</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Health Score</span>
                              <span className="font-medium">{component.health}%</span>
                            </div>
                            <div className="w-full bg-secondary rounded-full h-3">
                              <div 
                                className={`h-3 rounded-full transition-all duration-500 ${
                                  component.health >= 80 ? "bg-green-500" : 
                                  component.health >= 60 ? "bg-yellow-500" : "bg-red-500"
                                }`}
                                style={{ width: `${component.health}%` }}
                              />
                            </div>
                          </div>
                          
                          <div className="text-sm">
                            <div className="flex items-center justify-between">
                              <span>Degradation Rate</span>
                              <span className={`font-medium ${component.degradationRate > 10 ? 'text-red-500' : component.degradationRate > 5 ? 'text-yellow-500' : 'text-green-500'}`}>
                                {component.degradationRate}%/month
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Maintenance Recommendations */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="text-primary" size={20} />
                    AI-Generated Maintenance Recommendations
                  </CardTitle>
                  <CardDescription>Intelligent maintenance scheduling with confidence scores and impact analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border bg-card border-red-200 bg-red-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                          <div>
                            <div className="font-medium text-red-700">Critical: Replace sensors on DRN-023</div>
                            <div className="text-sm text-red-600">Predicted failure in 3 days • 91% confidence</div>
                            <div className="text-xs text-red-500 mt-1">Impact: Mission capability reduced by 40%</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="destructive">Schedule Now</Button>
                          <Button size="sm" variant="outline">Details</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg border bg-card border-yellow-200 bg-yellow-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-yellow-500" />
                          <div>
                            <div className="font-medium text-yellow-700">Medium: Battery cycle optimization</div>
                            <div className="text-sm text-yellow-600">8 batteries approaching cycle limit • 87% confidence</div>
                            <div className="text-xs text-yellow-500 mt-1">Impact: Potential 15% range reduction</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Plan Maintenance</Button>
                          <Button size="sm" variant="outline">Review</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg border bg-card border-green-200 bg-green-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          <div>
                            <div className="font-medium text-green-700">Preventive: Motor calibration recommended</div>
                            <div className="text-sm text-green-600">Optimal performance window available • 78% confidence</div>
                            <div className="text-xs text-green-500 mt-1">Impact: 5-8% efficiency improvement</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Schedule</Button>
                          <Button size="sm" variant="outline">Learn More</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="anomalies" className="space-y-6">
              {/* Enhanced Anomaly Detection */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="text-primary" size={20} />
                    Real-Time AI Anomaly Detection Feed
                  </CardTitle>
                  <CardDescription>Machine learning-powered anomaly detection with root cause analysis and confidence scoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-3">
                      {anomalyFeed.map((anomaly) => (
                        <div key={anomaly.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${
                              anomaly.severity === "High" ? "bg-red-100 text-red-600" : 
                              anomaly.severity === "Medium" ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"
                            }`}>
                              <AlertTriangle className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{anomaly.type}</div>
                              <div className="text-sm text-muted-foreground">
                                {anomaly.drone} • {anomaly.location} • {anomaly.time}
                              </div>
                              <div className="text-sm text-blue-600 mt-1">
                                Root cause: {anomaly.rootCause} • AI Confidence: {anomaly.confidence}%
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <SeverityBadge severity={anomaly.severity} />
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">Investigate</Button>
                              <Button size="sm" variant="outline">Auto-Resolve</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Anomaly Trends & Patterns */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="text-primary" size={20} />
                    Historical Anomaly Trends & Patterns
                  </CardTitle>
                  <CardDescription>AI-identified patterns in anomaly occurrence and correlation analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Anomaly Frequency by Type</h4>
                      <div className="space-y-3">
                        {["Power Spike", "GPS Drift", "Communication Loss", "Motor Vibration", "Altitude Deviation"].map((type, index) => (
                          <div key={type} className="flex items-center justify-between">
                            <span className="text-sm">{type}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-secondary rounded-full">
                                <div 
                                  className="h-2 bg-blue-500 rounded-full" 
                                  style={{ width: `${[75, 45, 60, 30, 55][index]}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{[15, 9, 12, 6, 11][index]}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">AI Pattern Recognition</h4>
                      <div className="space-y-3 text-sm">
                        <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                          <p className="font-medium">Weather Correlation</p>
                          <p className="text-muted-foreground">65% of communication losses occur during high wind conditions</p>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                          <p className="font-medium">Temporal Pattern</p>
                          <p className="text-muted-foreground">Motor vibrations increase 40% after 200+ flight hours</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                          <p className="font-medium">Geographic Cluster</p>
                          <p className="text-muted-foreground">GPS errors concentrated in downtown corridor (interference)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="geographic" className="space-y-6">
              {/* Geographic Intelligence */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Navigation className="text-primary" size={20} />
                    Geographic Intelligence & Spatial Analytics
                  </CardTitle>
                  <CardDescription>Advanced spatial analysis with AI-driven route optimization and performance correlation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">High-Traffic Zones Analysis</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded border bg-card">
                          <div>
                            <div className="font-medium">Downtown Corridor</div>
                            <div className="text-sm text-muted-foreground">Peak: 2-4 PM</div>
                          </div>
                          <Badge variant="outline">847 flights</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded border bg-card">
                          <div>
                            <div className="font-medium">Industrial District</div>
                            <div className="text-sm text-muted-foreground">Peak: 8-10 AM</div>
                          </div>
                          <Badge variant="outline">623 flights</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded border bg-card">
                          <div>
                            <div className="font-medium">Port Area</div>
                            <div className="text-sm text-muted-foreground">Peak: 10-12 PM</div>
                          </div>
                          <Badge variant="outline">445 flights</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold">Route Optimization Insights</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span>Average route efficiency: 94.2%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span>Potential fuel savings: 12.5%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span>Optimal altitude usage: 87.3%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <span>Traffic conflict reduction: 23%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold">AI Spatial Recommendations</h4>
                      <div className="space-y-2 text-sm">
                        <div className="p-2 bg-blue-50 rounded border-l-2 border-blue-500">
                          <p className="font-medium">Corridor Optimization</p>
                          <p className="text-muted-foreground">Establish dedicated lanes in Sector 7A</p>
                        </div>
                        <div className="p-2 bg-green-50 rounded border-l-2 border-green-500">
                          <p className="font-medium">Alternative Routes</p>
                          <p className="text-muted-foreground">3 new efficient paths identified</p>
                        </div>
                        <div className="p-2 bg-orange-50 rounded border-l-2 border-orange-500">
                          <p className="font-medium">Congestion Relief</p>
                          <p className="text-muted-foreground">Redistribute 20% peak hour traffic</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="drilldown" className="space-y-6">
              <DrillDownAnalytics selectedMissionType={selectedMissionType === "all" ? undefined : selectedMissionType} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

// Enhanced KPI Card Component
const EnhancedKpiCard = ({ title, value, unit, change, trend, target, icon: Icon }: any) => (
  <Card className="glass-card hover:shadow-lg transition-all duration-300 group">
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        {change !== 0 && (
          <div className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full ${
            trend === "up" ? "bg-green-100 text-green-700" : 
            trend === "down" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"
          }`}>
            {trend === "up" ? <TrendingUp size={14} /> : trend === "down" ? <TrendingDown size={14} /> : null}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-3xl font-bold">{value}{unit}</span>
          {target && (
            <span className="text-sm text-muted-foreground">/ {target}{unit}</span>
          )}
        </div>
        
        {target && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>Progress to Target</span>
              <span>{Math.round((value / target) * 100)}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  (value / target) >= 1 ? "bg-green-500" : 
                  (value / target) >= 0.8 ? "bg-blue-500" : "bg-yellow-500"
                }`}
                style={{ width: `${Math.min((value / target) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

// Helper functions for KPI formatting
const formatKpiTitle = (key: string) => {
  const titles: Record<string, string> = {
    totalFlightHours: "Total Flight Hours",
    missionSuccessRate: "Mission Success Rate",
    nextMaintenanceDue: "Next Maintenance Due",
    anomalyAlerts: "Anomaly Alerts (24h)",
    dronesInOperation: "Drones in Operation",
    predictedFailureRate: "Predicted Failure Rate",
    fleetHealthScore: "AI Fleet Health Score",
    avgPowerConsumption: "Avg Power Consumption"
  };
  return titles[key] || key;
};

const getKpiUnit = (key: string) => {
  const units: Record<string, string> = {
    totalFlightHours: "h",
    missionSuccessRate: "%",
    nextMaintenanceDue: " days",
    anomalyAlerts: "",
    dronesInOperation: "",
    predictedFailureRate: "%",
    fleetHealthScore: "/100",
    avgPowerConsumption: "W"
  };
  return units[key] || "";
};

const getKpiIcon = (key: string) => {
  const icons: Record<string, any> = {
    totalFlightHours: Clock,
    missionSuccessRate: Target,
    nextMaintenanceDue: Wrench,
    anomalyAlerts: AlertTriangle,
    dronesInOperation: Activity,
    predictedFailureRate: Cpu,
    fleetHealthScore: Brain,
    avgPowerConsumption: Zap
  };
  return icons[key] || Activity;
};

const SeverityBadge = ({ severity }: { severity: string }) => {
  const colors = {
    High: "bg-red-500/15 text-red-700 border-red-300",
    Medium: "bg-yellow-500/15 text-yellow-700 border-yellow-300",
    Low: "bg-green-500/15 text-green-700 border-green-300"
  };
  
  return (
    <Badge variant="outline" className={`${colors[severity as keyof typeof colors]} font-normal`}>
      {severity}
    </Badge>
  );
};

export default DroneAnalytics;
