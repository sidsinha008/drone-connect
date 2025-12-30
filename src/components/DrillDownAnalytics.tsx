
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  ScatterChart,
  Scatter
} from "recharts";
import { 
  Activity, 
  AlertTriangle, 
  Battery, 
  Cpu, 
  Filter, 
  TrendingDown, 
  TrendingUp, 
  Wrench,
  Zap,
  Radio,
  Thermometer,
  Gauge,
  MapPin,
  Clock,
  Target,
  CheckCircle,
  XCircle
} from "lucide-react";

interface DrillDownAnalyticsProps {
  selectedMissionType?: string;
}

// Mock data for drill-down analysis
const droneVariants = [
  { id: "scout-x1", name: "Scout X1", type: "Multi-rotor", count: 12, avgHealth: 87, avgFlightHours: 245 },
  { id: "cargo-pro", name: "Cargo Pro", type: "Heavy-lift", count: 8, avgHealth: 92, avgFlightHours: 156 },
  { id: "vista-air", name: "Vista Air", type: "Fixed-wing", count: 6, avgHealth: 78, avgFlightHours: 389 },
  { id: "survey-elite", name: "Survey Elite", type: "VTOL", count: 4, avgHealth: 85, avgFlightHours: 198 }
];

const componentHealthData = [
  { 
    component: "Motors", 
    avgHealth: 85, 
    riskDistribution: { high: 2, medium: 8, low: 20 },
    predictedFailures: 1,
    avgRUL: 45 
  },
  { 
    component: "Batteries", 
    avgHealth: 72, 
    riskDistribution: { high: 8, medium: 12, low: 10 },
    predictedFailures: 3,
    avgRUL: 28 
  },
  { 
    component: "Propellers", 
    avgHealth: 91, 
    riskDistribution: { high: 1, medium: 4, low: 25 },
    predictedFailures: 0,
    avgRUL: 67 
  },
  { 
    component: "Flight Controller", 
    avgHealth: 94, 
    riskDistribution: { high: 0, medium: 2, low: 28 },
    predictedFailures: 0,
    avgRUL: 120 
  },
  { 
    component: "GPS Module", 
    avgHealth: 88, 
    riskDistribution: { high: 1, medium: 6, low: 23 },
    predictedFailures: 1,
    avgRUL: 89 
  }
];

const anomalyFeedData = [
  { 
    id: 1, 
    timestamp: "2024-01-15 14:32:15", 
    droneId: "DRN-001", 
    type: "GPS Drift", 
    severity: "Medium", 
    location: { lat: 40.7128, lng: -74.0060 },
    rootCause: "Signal interference from nearby structure",
    status: "Investigating"
  },
  { 
    id: 2, 
    timestamp: "2024-01-15 13:45:23", 
    droneId: "DRN-045", 
    type: "Battery Overheat", 
    severity: "High", 
    location: { lat: 40.7589, lng: -73.9851 },
    rootCause: "Excessive current draw during climb",
    status: "Resolved"
  },
  { 
    id: 3, 
    timestamp: "2024-01-15 12:18:07", 
    droneId: "DRN-023", 
    type: "Motor Vibration", 
    severity: "Critical", 
    location: { lat: 40.6892, lng: -74.0445 },
    rootCause: "Propeller imbalance detected",
    status: "Maintenance Required"
  }
];

const DrillDownAnalytics = ({ selectedMissionType }: DrillDownAnalyticsProps) => {
  const [selectedVariant, setSelectedVariant] = useState<string>("all");
  const [selectedComponent, setSelectedComponent] = useState<string>("motors");
  const [selectedAnomaly, setSelectedAnomaly] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("variants");

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "text-red-600 bg-red-50 border-red-200";
      case "High": return "text-orange-600 bg-orange-50 border-orange-200";
      case "Medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "Low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 85) return "text-green-600";
    if (health >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Granular Fleet Analytics</h2>
          <p className="text-muted-foreground">
            {selectedMissionType ? `Filtered for: ${selectedMissionType}` : "All mission types"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedVariant} onValueChange={setSelectedVariant}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by Variant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Variants</SelectItem>
              {droneVariants.map(variant => (
                <SelectItem key={variant.id} value={variant.id}>{variant.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="variants">Drone Variants Analysis</TabsTrigger>
          <TabsTrigger value="components">Component Health Drill-down</TabsTrigger>
          <TabsTrigger value="anomalies">Anomaly Feed Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="variants" className="space-y-6">
          {/* Variant Comparison Overview */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Fleet Performance by Drone Variant
              </CardTitle>
              <CardDescription>Comparative analysis across different drone models</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {droneVariants.map((variant) => (
                  <Card key={variant.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{variant.name}</h4>
                          <p className="text-sm text-muted-foreground">{variant.type}</p>
                        </div>
                        <Badge variant="outline">{variant.count} units</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Avg Health</span>
                          <span className={`font-medium ${getHealthColor(variant.avgHealth)}`}>
                            {variant.avgHealth}%
                          </span>
                        </div>
                        <Progress value={variant.avgHealth} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <span>Avg Flight Hours</span>
                          <span className="font-medium">{variant.avgFlightHours}h</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Comparative Charts */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Health Score Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={droneVariants}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="avgHealth" fill="#0ea5e9" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Flight Hours Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart data={droneVariants}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="avgFlightHours" name="Flight Hours" />
                      <YAxis dataKey="avgHealth" name="Health Score" />
                      <Tooltip />
                      <Scatter dataKey="count" fill="#10b981" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="components" className="space-y-6">
          {/* Component Selection */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-5 h-5" />
                Component Health Analysis
              </CardTitle>
              <CardDescription>Deep dive into component-level health and maintenance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-6">
                {componentHealthData.map((comp) => (
                  <Button
                    key={comp.component.toLowerCase()}
                    variant={selectedComponent === comp.component.toLowerCase() ? "default" : "outline"}
                    onClick={() => setSelectedComponent(comp.component.toLowerCase())}
                    className="flex items-center gap-2"
                  >
                    {comp.component === "Motors" && <Zap size={16} />}
                    {comp.component === "Batteries" && <Battery size={16} />}
                    {comp.component === "Propellers" && <Activity size={16} />}
                    {comp.component === "Flight Controller" && <Radio size={16} />}
                    {comp.component === "GPS Module" && <MapPin size={16} />}
                    {comp.component}
                  </Button>
                ))}
              </div>

              {/* Component Overview Grid */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-6">
                {componentHealthData.map((comp) => (
                  <Card key={comp.component} className="border">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <h4 className="font-semibold mb-2">{comp.component}</h4>
                        <div className={`text-2xl font-bold mb-2 ${getHealthColor(comp.avgHealth)}`}>
                          {comp.avgHealth}%
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-red-600">High Risk:</span>
                            <span>{comp.riskDistribution.high}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-yellow-600">Medium:</span>
                            <span>{comp.riskDistribution.medium}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-600">Low Risk:</span>
                            <span>{comp.riskDistribution.low}</span>
                          </div>
                        </div>
                        <div className="mt-3 p-2 bg-muted rounded">
                          <div className="text-xs text-muted-foreground">Avg RUL</div>
                          <div className="font-medium">{comp.avgRUL} days</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Detailed Component View */}
              <Card className="border">
                <CardHeader>
                  <CardTitle>Detailed Component Analysis - {selectedComponent}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Drone ID</TableHead>
                        <TableHead>Component Serial</TableHead>
                        <TableHead>Health Score</TableHead>
                        <TableHead>RUL</TableHead>
                        <TableHead>Risk Level</TableHead>
                        <TableHead>Last Maintenance</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">DRN-00{i}</TableCell>
                          <TableCell className="font-mono text-sm">SN-{selectedComponent.toUpperCase()}-{1000 + i}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`text-sm font-medium ${getHealthColor(85 - i * 5)}`}>
                                {85 - i * 5}%
                              </div>
                              <Progress value={85 - i * 5} className="w-16 h-2" />
                            </div>
                          </TableCell>
                          <TableCell>{45 - i * 8} days</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              i <= 2 ? "text-green-600 border-green-600" :
                              i <= 4 ? "text-yellow-600 border-yellow-600" : "text-red-600 border-red-600"
                            }>
                              {i <= 2 ? "Low" : i <= 4 ? "Medium" : "High"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            2024-01-{10 + i}
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              <Wrench size={14} className="mr-1" />
                              Schedule
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anomalies" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Anomaly Feed */}
            <div className="lg:col-span-2">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Real-time Anomaly Feed
                  </CardTitle>
                  <CardDescription>Detailed anomaly detection and analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-3">
                      {anomalyFeedData.map((anomaly) => (
                        <Card 
                          key={anomaly.id} 
                          className={`border cursor-pointer transition-colors hover:bg-muted/50 ${
                            selectedAnomaly?.id === anomaly.id ? "ring-2 ring-primary" : ""
                          }`}
                          onClick={() => setSelectedAnomaly(anomaly)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <AlertTriangle className={`w-4 h-4 ${
                                  anomaly.severity === "Critical" ? "text-red-500" :
                                  anomaly.severity === "High" ? "text-orange-500" :
                                  anomaly.severity === "Medium" ? "text-yellow-500" : "text-green-500"
                                }`} />
                                <div>
                                  <div className="font-medium">{anomaly.type}</div>
                                  <div className="text-sm text-muted-foreground">{anomaly.droneId}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge variant="outline" className={getSeverityColor(anomaly.severity)}>
                                  {anomaly.severity}
                                </Badge>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {anomaly.timestamp}
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{anomaly.rootCause}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <MapPin size={12} />
                                {anomaly.location.lat.toFixed(4)}, {anomaly.location.lng.toFixed(4)}
                              </div>
                              <Badge variant={
                                anomaly.status === "Resolved" ? "secondary" :
                                anomaly.status === "Investigating" ? "default" : "destructive"
                              }>
                                {anomaly.status}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Anomaly Details Panel */}
            <div>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Anomaly Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedAnomaly ? (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">{selectedAnomaly.type}</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Drone ID:</span>
                            <span className="font-medium">{selectedAnomaly.droneId}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Severity:</span>
                            <Badge variant="outline" className={getSeverityColor(selectedAnomaly.severity)}>
                              {selectedAnomaly.severity}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Timestamp:</span>
                            <span className="font-medium">{selectedAnomaly.timestamp}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Location:</span>
                            <span className="font-medium">
                              {selectedAnomaly.location.lat.toFixed(4)}, {selectedAnomaly.location.lng.toFixed(4)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">Root Cause Analysis</h5>
                        <p className="text-sm text-muted-foreground">{selectedAnomaly.rootCause}</p>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">Recommended Actions</h5>
                        <div className="space-y-2">
                          {selectedAnomaly.type === "GPS Drift" && (
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle size={14} className="text-green-500" />
                              Calibrate GPS module
                            </div>
                          )}
                          {selectedAnomaly.type === "Battery Overheat" && (
                            <div className="flex items-center gap-2 text-sm">
                              <XCircle size={14} className="text-red-500" />
                              Immediate battery inspection required
                            </div>
                          )}
                          {selectedAnomaly.type === "Motor Vibration" && (
                            <div className="flex items-center gap-2 text-sm">
                              <AlertTriangle size={14} className="text-yellow-500" />
                              Schedule propeller replacement
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <Button size="sm" className="w-full">
                          View Detailed Telemetry
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <AlertTriangle size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Select an anomaly to view details</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DrillDownAnalytics;
