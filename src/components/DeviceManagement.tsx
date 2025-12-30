
import { useState } from "react";
import { 
  Cpu, 
  Filter, 
  Search, 
  SortAsc, 
  SortDesc, 
  Plane, 
  Battery, 
  Signal, 
  Calendar,
  Plus,
  MapPin,
  Wifi,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  Zap,
  Brain,
  TrendingUp,
  Shield,
  Eye,
  Users,
  Bot,
  Layers,
  FileText,
  Download
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import DroneOnboardingWizard from "./DroneOnboardingWizard";
import PredictiveInsights from "./DeviceManagement/PredictiveInsights";
import FleetVisualization from "./DeviceManagement/FleetVisualization";
import AutomatedDiscovery from "./DeviceManagement/AutomatedDiscovery";

// Enhanced mock data with AI predictions
const devices = [
  { 
    id: 1,
    droneId: "DRN-SX1-00192834",
    name: "Scout X1-001",
    model: "Scout X1",
    variant: "Surveillance",
    status: "Online",
    lastSeen: "2 minutes ago",
    assignedMission: "Perimeter Patrol Alpha",
    firmwareVersion: "v2.3.4",
    connectionProtocol: "MQTT",
    location: "Warehouse A - Zone 1",
    healthScore: 95,
    battery: 92,
    uptime: "15h 23m",
    // AI predictions
    predictedIssues: [],
    maintenanceRisk: "Low",
    remainingLifeEstimate: "45 days",
    performanceTrend: "Stable"
  },
  { 
    id: 2,
    droneId: "DRN-SX1-00823741",
    name: "Scout X1-042",
    model: "Scout X1",
    variant: "Surveillance",
    status: "In Flight",
    lastSeen: "30 seconds ago",
    assignedMission: "Route Survey Beta",
    firmwareVersion: "v2.3.4",
    connectionProtocol: "MQTT",
    location: "Downtown Sector 3",
    healthScore: 88,
    battery: 64,
    uptime: "3h 45m",
    predictedIssues: [
      { type: "Battery Degradation", severity: "Medium", eta: "2 hours", confidence: 85 }
    ],
    maintenanceRisk: "Medium",
    remainingLifeEstimate: "38 days",
    performanceTrend: "Declining"
  },
  { 
    id: 3,
    droneId: "DRN-CP1-04928374",
    name: "Cargo Pro-105",
    model: "Cargo Pro",
    variant: "Heavy Lift",
    status: "Idle",
    lastSeen: "5 minutes ago",
    assignedMission: null,
    firmwareVersion: "v1.9.2",
    connectionProtocol: "CoAP",
    location: "Distribution Center",
    healthScore: 92,
    battery: 87,
    uptime: "8h 12m",
    predictedIssues: [
      { type: "Motor 2 Efficiency Drop", severity: "Low", eta: "3 days", confidence: 72 }
    ],
    maintenanceRisk: "Low",
    remainingLifeEstimate: "52 days",
    performanceTrend: "Stable"
  },
  { 
    id: 4,
    droneId: "DRN-VA1-09283746",
    name: "Vista Air-027",
    model: "Vista Air",
    variant: "Mapping",
    status: "Connection Issues",
    lastSeen: "12 minutes ago",
    assignedMission: "Mapping Delta",
    firmwareVersion: "v3.1.0",
    connectionProtocol: "HTTP/S",
    location: "City Park",
    healthScore: 67,
    battery: 23,
    uptime: "1h 30m",
    predictedIssues: [
      { type: "Network Instability", severity: "High", eta: "Immediate", confidence: 95 },
      { type: "GPS Accuracy Sporadic", severity: "Medium", eta: "1 hour", confidence: 78 }
    ],
    maintenanceRisk: "High",
    remainingLifeEstimate: "15 days",
    performanceTrend: "Critical"
  },
  { 
    id: 5,
    droneId: "DRN-SE1-02837495",
    name: "Survey Elite-013",
    model: "Survey Elite",
    variant: "Precision Mapping",
    status: "Offline",
    lastSeen: "2 hours ago",
    assignedMission: null,
    firmwareVersion: "v2.0.1",
    connectionProtocol: "Custom UDP",
    location: "Construction Site B",
    healthScore: 78,
    battery: 0,
    uptime: "0h 0m",
    predictedIssues: [
      { type: "Battery Failure", severity: "Critical", eta: "Immediate", confidence: 99 }
    ],
    maintenanceRisk: "Critical",
    remainingLifeEstimate: "Requires Service",
    performanceTrend: "Failed"
  }
];

// AI-generated insights
const aiInsights = [
  {
    id: 1,
    type: "Prediction",
    severity: "High",
    title: "Battery Degradation Pattern Detected",
    description: "3 drones showing synchronized battery degradation. Predicted failure window: 24-48 hours.",
    affectedDrones: ["DRN-SX1-00823741", "DRN-VA1-09283746"],
    confidence: 87,
    suggestedActions: ["Schedule immediate battery replacement", "Reduce flight time by 30%"]
  },
  {
    id: 2,
    type: "Anomaly",
    severity: "Medium",
    title: "Network Instability in Zone 3",
    description: "Multiple drones experiencing connection issues in Downtown Sector 3.",
    affectedDrones: ["DRN-VA1-09283746"],
    confidence: 95,
    suggestedActions: ["Check network infrastructure", "Switch to backup communication protocol"]
  },
  {
    id: 3,
    type: "Optimization",
    severity: "Low",
    title: "Firmware Update Available",
    description: "5 drones can benefit from firmware v2.4.0 performance improvements.",
    affectedDrones: ["DRN-SX1-00192834", "DRN-CP1-04928374"],
    confidence: 100,
    suggestedActions: ["Schedule OTA update during maintenance window"]
  }
];

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusConfig = () => {
    switch(status) {
      case "Online": return { color: "bg-green-500/15 text-green-700 border-green-300", icon: CheckCircle };
      case "In Flight": return { color: "bg-blue-500/15 text-blue-700 border-blue-300", icon: Plane };
      case "Idle": return { color: "bg-gray-500/15 text-gray-700 border-gray-300", icon: Clock };
      case "Connection Issues": return { color: "bg-yellow-500/15 text-yellow-700 border-yellow-300", icon: AlertTriangle };
      case "Offline": return { color: "bg-red-500/15 text-red-700 border-red-300", icon: XCircle };
      default: return { color: "bg-gray-500/15 text-gray-700 border-gray-300", icon: Clock };
    }
  };
  
  const { color, icon: Icon } = getStatusConfig();
  
  return (
    <Badge variant="outline" className={`font-normal flex items-center gap-1 ${color}`}>
      <Icon size={12} />
      {status}
    </Badge>
  );
};

// Health score indicator
const HealthScore = ({ score }: { score: number }) => {
  let color = "text-green-600";
  if (score < 70) color = "text-red-600";
  else if (score < 85) color = "text-yellow-600";
  
  return (
    <span className={`font-medium ${color}`}>
      {score}%
    </span>
  );
};

// New Predictive Risk indicator
const PredictiveRisk = ({ risk, issues }: { risk: string, issues: any[] }) => {
  const getRiskColor = () => {
    switch(risk) {
      case "Low": return "text-green-600 bg-green-50 border-green-200";
      case "Medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "High": return "text-orange-600 bg-orange-50 border-orange-200";
      case "Critical": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };
  
  return (
    <div className="flex flex-col gap-1">
      <Badge variant="outline" className={`font-normal ${getRiskColor()}`}>
        {risk}
      </Badge>
      {issues.length > 0 && (
        <div className="text-xs text-muted-foreground">
          {issues[0].type} in {issues[0].eta}
        </div>
      )}
    </div>
  );
};

const DeviceManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDevices, setSelectedDevices] = useState<number[]>([]);
  const [currentTab, setCurrentTab] = useState("fleet");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState("name");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [viewMode, setViewMode] = useState("operations"); // operations, maintenance, security
  
  // Calculate enhanced fleet stats
  const fleetStats = {
    totalActive: devices.filter(d => d.status === "Online" || d.status === "In Flight").length,
    totalRegistered: devices.length,
    offlineLast24h: devices.filter(d => d.status === "Offline").length,
    connectionIssues: devices.filter(d => d.status === "Connection Issues").length,
    pendingOnboarding: 2,
    // New AI-powered stats
    predictedFailures: devices.filter(d => d.predictedIssues.some(i => i.severity === "Critical")).length,
    maintenanceRequired: devices.filter(d => d.maintenanceRisk === "High" || d.maintenanceRisk === "Critical").length,
    performanceOptimal: devices.filter(d => d.performanceTrend === "Stable").length
  };
  
  // Enhanced filtering and search with natural language support
  const filteredDevices = devices
    .filter(device => {
      // Natural language search simulation
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = device.name.toLowerCase().includes(searchLower) ||
                           device.droneId.toLowerCase().includes(searchLower) ||
                           device.model.toLowerCase().includes(searchLower) ||
                           device.location.toLowerCase().includes(searchLower) ||
                           // Natural language patterns
                           (searchLower.includes("low battery") && device.battery < 30) ||
                           (searchLower.includes("offline") && device.status === "Offline") ||
                           (searchLower.includes("issues") && device.predictedIssues.length > 0);
      
      const matchesStatus = statusFilter === "all" || device.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortField as keyof typeof a] || "";
      const bValue = b[sortField as keyof typeof b] || "";
      
      if (sortOrder === "asc") {
        return String(aValue).localeCompare(String(bValue));
      } else {
        return String(bValue).localeCompare(String(aValue));
      }
    });
  
  // Toggle device selection
  const toggleDeviceSelection = (deviceId: number) => {
    setSelectedDevices(prev => 
      prev.includes(deviceId) 
        ? prev.filter(id => id !== deviceId)
        : [...prev, deviceId]
    );
  };
  
  // Select all devices
  const toggleSelectAll = () => {
    if (selectedDevices.length === filteredDevices.length) {
      setSelectedDevices([]);
    } else {
      setSelectedDevices(filteredDevices.map(d => d.id));
    }
  };
  
  if (showOnboarding) {
    return <DroneOnboardingWizard onBack={() => setShowOnboarding(false)} />;
  }
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Brain className="text-primary" size={32} />
            AI-Powered Device Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Predictive fleet operations with intelligent automation
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowOnboarding(true)} className="flex items-center gap-2">
            <Bot size={18} />
            Auto Discovery
          </Button>
          <Button onClick={() => setShowOnboarding(true)} className="flex items-center gap-2">
            <Plus size={18} />
            Onboard Drone
          </Button>
        </div>
      </div>

      {/* AI Insights Alert Bar */}
      {aiInsights.filter(i => i.severity === "High" || i.severity === "Critical").length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-orange-600" size={20} />
              <div>
                <p className="font-medium text-orange-800">
                  {aiInsights.filter(i => i.severity === "High" || i.severity === "Critical").length} Critical AI Predictions Require Attention
                </p>
                <p className="text-sm text-orange-700">
                  Battery failures predicted, network instabilities detected. Review predictive insights tab.
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setCurrentTab("insights")}>
                View Insights
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Role-Based Dashboard Selector */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Eye size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium">Dashboard View:</span>
              <div className="flex gap-1">
                {[
                  { id: "operations", label: "Operations", icon: Plane },
                  { id: "maintenance", label: "Maintenance", icon: Zap },
                  { id: "security", label: "Security", icon: Shield }
                ].map(({ id, label, icon: Icon }) => (
                  <Button
                    key={id}
                    variant={viewMode === id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode(id)}
                    className="flex items-center gap-1"
                  >
                    <Icon size={14} />
                    {label}
                  </Button>
                ))}
              </div>
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download size={14} />
              Export Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Enhanced Fleet Summary KPIs */}
      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-7">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Fleet</p>
                <p className="text-2xl font-bold text-green-600">{fleetStats.totalActive}</p>
              </div>
              <CheckCircle className="text-green-500" size={20} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Registered</p>
                <p className="text-2xl font-bold">{fleetStats.totalRegistered}</p>
              </div>
              <Plane className="text-primary" size={20} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Predicted Failures</p>
                <p className="text-2xl font-bold text-red-600">{fleetStats.predictedFailures}</p>
              </div>
              <TrendingUp className="text-red-500" size={20} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Maintenance Due</p>
                <p className="text-2xl font-bold text-orange-600">{fleetStats.maintenanceRequired}</p>
              </div>
              <AlertTriangle className="text-orange-500" size={20} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Optimal Performance</p>
                <p className="text-2xl font-bold text-blue-600">{fleetStats.performanceOptimal}</p>
              </div>
              <CheckCircle className="text-blue-500" size={20} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Connection Issues</p>
                <p className="text-2xl font-bold text-yellow-600">{fleetStats.connectionIssues}</p>
              </div>
              <Wifi className="text-yellow-500" size={20} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Setup</p>
                <p className="text-2xl font-bold text-purple-600">{fleetStats.pendingOnboarding}</p>
              </div>
              <Clock className="text-purple-500" size={20} />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Enhanced Main Content with New Tabs */}
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="fleet">Fleet Overview</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="visualization">3D Fleet</TabsTrigger>
          <TabsTrigger value="discovery">Auto Discovery</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="fleet" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Intelligent Fleet Management</CardTitle>
                  <CardDescription>
                    AI-enhanced monitoring with predictive insights
                  </CardDescription>
                </div>
                
                {selectedDevices.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {selectedDevices.length} selected
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          Bulk Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>AI-Suggested Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Brain size={16} className="mr-2" />
                          Run Predictive Analysis
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Zap size={16} className="mr-2" />
                          Schedule Maintenance
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Wifi size={16} className="mr-2" />
                          Optimize Network Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Battery size={16} className="mr-2" />
                          Battery Health Check
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {/* Enhanced Search with Natural Language */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Try: 'low battery drones', 'offline in Chennai', 'firmware version 2.1'..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Filter size={16} className="mr-2" />
                        Status: {statusFilter === "all" ? "All" : statusFilter}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                        All Statuses
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("Online")}>
                        Online
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("In Flight")}>
                        In Flight
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("Idle")}>
                        Idle
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("Offline")}>
                        Offline
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("Connection Issues")}>
                        Connection Issues
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  >
                    {sortOrder === "asc" ? <SortAsc size={16} /> : <SortDesc size={16} />}
                  </Button>
                </div>
              </div>
              
              {/* Enhanced Drone Table with Predictive Columns */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedDevices.length === filteredDevices.length}
                          onCheckedChange={toggleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Drone ID</TableHead>
                      <TableHead>Model/Variant</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Predictive Risk</TableHead>
                      <TableHead>Health / Trend</TableHead>
                      <TableHead>Battery</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>RUL (Days)</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDevices.map((device) => (
                      <TableRow key={device.id} className={device.predictedIssues.length > 0 ? "bg-orange-50/50" : ""}>
                        <TableCell>
                          <Checkbox
                            checked={selectedDevices.includes(device.id)}
                            onCheckedChange={() => toggleDeviceSelection(device.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{device.name}</div>
                            <div className="text-xs text-muted-foreground font-mono">
                              {device.droneId}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{device.model}</div>
                            <div className="text-xs text-muted-foreground">{device.variant}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={device.status} />
                        </TableCell>
                        <TableCell>
                          <PredictiveRisk risk={device.maintenanceRisk} issues={device.predictedIssues} />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <HealthScore score={device.healthScore} />
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                device.performanceTrend === "Stable" ? "text-green-600" :
                                device.performanceTrend === "Declining" ? "text-yellow-600" :
                                device.performanceTrend === "Critical" ? "text-red-600" : "text-gray-600"
                              }`}
                            >
                              {device.performanceTrend}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Battery size={14} className={device.battery < 20 ? "text-red-500" : "text-muted-foreground"} />
                            <span className="text-sm">{device.battery}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin size={12} className="text-muted-foreground" />
                            <span className="text-sm">{device.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`text-sm font-medium ${
                            device.remainingLifeEstimate === "Requires Service" ? "text-red-600" :
                            parseInt(device.remainingLifeEstimate) < 20 ? "text-orange-600" : "text-green-600"
                          }`}>
                            {device.remainingLifeEstimate}
                          </span>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <Brain size={16} className="mr-2" />
                                AI Analysis
                              </DropdownMenuItem>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Predictive Maintenance</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                Emergency Stop
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="insights" className="space-y-4">
          <PredictiveInsights insights={aiInsights} devices={devices} />
        </TabsContent>
        
        <TabsContent value="visualization" className="space-y-4">
          <FleetVisualization devices={devices} />
        </TabsContent>
        
        <TabsContent value="discovery" className="space-y-4">
          <AutomatedDiscovery />
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Advanced Fleet Analytics</CardTitle>
              <CardDescription>
                Comprehensive analytics and machine learning insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <TrendingUp size={48} className="mx-auto mb-4 opacity-50" />
                <p>Advanced analytics dashboard with ML models...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeviceManagement;
