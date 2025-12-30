
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Battery, 
  MapPin, 
  Clock, 
  Shield, 
  AlertTriangle,
  Download,
  Filter,
  CheckCircle,
  Zap
} from 'lucide-react';

// Enhanced mock data for comprehensive analytics
const fleetMetrics = {
  totalMissions: 1247,
  successRate: 96.8,
  avgBatteryEfficiency: 87.2,
  complianceRate: 99.1,
  totalFlightHours: 3456,
  energySaved: 245 // kWh
};

const routeEfficiencyData = [
  { date: '2024-01', planned: 85, actual: 82, savings: 12 },
  { date: '2024-02', planned: 88, actual: 85, savings: 15 },
  { date: '2024-03', planned: 90, actual: 87, savings: 18 },
  { date: '2024-04', planned: 92, actual: 90, savings: 22 },
  { date: '2024-05', planned: 94, actual: 92, savings: 25 },
  { date: '2024-06', planned: 96, actual: 94, savings: 28 }
];

const dockingStationData = [
  { station: 'Chennai Central', utilization: 89, avgChargeTime: 42, downtime: 2 },
  { station: 'OMR Hub', utilization: 76, avgChargeTime: 38, downtime: 5 },
  { station: 'Airport Mini', utilization: 92, avgChargeTime: 35, downtime: 1 },
  { station: 'Tech Park', utilization: 68, avgChargeTime: 45, downtime: 8 }
];

const complianceData = [
  { zone: 'Green Zone', flights: 856, violations: 2, rate: 99.8 },
  { zone: 'Yellow Zone', flights: 234, violations: 8, rate: 96.6 },
  { zone: 'Red Zone', flights: 12, violations: 0, rate: 100 },
  { zone: 'BVLOS', flights: 145, violations: 3, rate: 97.9 }
];

const batteryHealthData = [
  { drone: 'CHN-001', health: 94, cycles: 234, prediction: 'Good' },
  { drone: 'CHN-002', health: 87, cycles: 456, prediction: 'Fair' },
  { drone: 'CHN-003', health: 96, cycles: 123, prediction: 'Excellent' },
  { drone: 'CHN-004', health: 82, cycles: 567, prediction: 'Maintenance Soon' }
];

const weatherImpactData = [
  { condition: 'Clear', efficiency: 98, missions: 687 },
  { condition: 'Light Wind', efficiency: 92, missions: 345 },
  { condition: 'Moderate Wind', efficiency: 85, missions: 156 },
  { condition: 'Rain', efficiency: 78, missions: 59 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const EnhancedAnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header with Export Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Comprehensive insights into drone operations and route optimization</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">Total Missions</p>
                <p className="text-2xl font-bold">{fleetMetrics.totalMissions.toLocaleString()}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-600">↗ +12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">AI Success Rate</p>
                <p className="text-2xl font-bold">{fleetMetrics.successRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-600">↗ +2.3%</span> optimization improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">Battery Efficiency</p>
                <p className="text-2xl font-bold">{fleetMetrics.avgBatteryEfficiency}%</p>
              </div>
              <Battery className="h-8 w-8 text-orange-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-600">↗ +5.2%</span> energy savings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">DGCA Compliance</p>
                <p className="text-2xl font-bold">{fleetMetrics.complianceRate}%</p>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-600">✓</span> All regulatory requirements met
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs defaultValue="routes" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="routes">Route Performance</TabsTrigger>
          <TabsTrigger value="fleet">Fleet Health</TabsTrigger>
          <TabsTrigger value="docking">Docking Stations</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="environmental">Environmental</TabsTrigger>
        </TabsList>

        <TabsContent value="routes" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp size={20} />
                  Route Optimization Trends
                </CardTitle>
                <CardDescription>Planned vs Actual efficiency over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={routeEfficiencyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="planned" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="actual" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Energy Savings Analysis</CardTitle>
                <CardDescription>Cumulative energy savings from AI optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={routeEfficiencyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="savings" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Route Efficiency Heatmap Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="font-semibold text-green-800">High Efficiency Zones</div>
                  <p className="text-green-700 mt-2">Chennai OMR corridor, Tech Park routes</p>
                  <p className="text-xs text-green-600 mt-1">98% average efficiency</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="font-semibold text-yellow-800">Moderate Efficiency</div>
                  <p className="text-yellow-700 mt-2">Central Chennai, traffic-heavy areas</p>
                  <p className="text-xs text-yellow-600 mt-1">85% average efficiency</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="font-semibold text-red-800">Challenging Zones</div>
                  <p className="text-red-700 mt-2">Airport vicinity, weather-prone areas</p>
                  <p className="text-xs text-red-600 mt-1">72% average efficiency</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fleet" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Battery size={20} />
                  Battery Health Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {batteryHealthData.map((drone) => (
                    <div key={drone.drone} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{drone.drone}</div>
                        <div className="text-sm text-muted-foreground">{drone.cycles} cycles</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{drone.health}%</div>
                        <Badge 
                          variant="outline" 
                          className={
                            drone.prediction === 'Excellent' ? 'bg-green-50 text-green-700' :
                            drone.prediction === 'Good' ? 'bg-blue-50 text-blue-700' :
                            drone.prediction === 'Fair' ? 'bg-yellow-50 text-yellow-700' :
                            'bg-red-50 text-red-700'
                          }
                        >
                          {drone.prediction}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Predictive Maintenance Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-yellow-800">CHN-002 Maintenance Due</div>
                      <div className="text-sm text-yellow-700">Propeller replacement recommended in 47 flight hours</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-blue-800">CHN-004 Battery Calibration</div>
                      <div className="text-sm text-blue-700">Schedule calibration to improve efficiency</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-green-800">CHN-001 & CHN-003</div>
                      <div className="text-sm text-green-700">All systems optimal, no action required</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="docking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin size={20} />
                Docking Station Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dockingStationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="station" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="utilization" fill="#8884d8" />
                  <Bar dataKey="avgChargeTime" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-4 gap-4 mt-4">
                {dockingStationData.map((station) => (
                  <div key={station.station} className="text-center p-3 border rounded-lg">
                    <div className="font-semibold">{station.station}</div>
                    <div className="text-sm text-muted-foreground">
                      {station.utilization}% utilized
                    </div>
                    <div className="text-xs">
                      {station.avgChargeTime}min avg charge
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield size={20} />
                  DGCA Compliance by Zone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {complianceData.map((zone) => (
                    <div key={zone.zone} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{zone.zone}</div>
                        <div className="text-sm text-muted-foreground">{zone.flights} flights</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{zone.rate}%</div>
                        <div className="text-xs text-muted-foreground">{zone.violations} violations</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regulatory Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="font-medium text-green-800">Digital Sky Integration</div>
                    <div className="text-sm text-green-700 mt-1">
                      Real-time airspace data successfully integrated. 99.1% compliance rate maintained.
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="font-medium text-blue-800">NPNT Compliance</div>
                    <div className="text-sm text-blue-700 mt-1">
                      All registered drones maintain NPNT connectivity. Zero violations recorded.
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="font-medium text-yellow-800">Permits Status</div>
                    <div className="text-sm text-yellow-700 mt-1">
                      3 BVLOS permits pending approval. 12 approved for this quarter.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="environmental" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock size={20} />
                Weather Impact Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weatherImpactData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="condition" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="efficiency" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>Analysis shows 15% efficiency improvement during clear weather conditions compared to rainy conditions. AI optimization compensates for adverse weather by adjusting altitude and route planning.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedAnalyticsDashboard;
