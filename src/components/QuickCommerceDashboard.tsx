import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Battery, 
  Zap,
  Package,
  Truck,
  Settings,
  Bell,
  Activity
} from "lucide-react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

// Sample data for demonstration
const kpiData = {
  totalDeliveries: { value: 15847, change: 12.5, trend: "up" },
  avgDeliveryTime: { value: 18.5, change: -5.2, trend: "down" },
  onTimeRate: { value: 94.2, change: 2.1, trend: "up" },
  activeDrones: { value: 127, change: 8, trend: "up" },
  capacityUtilization: { value: 78.3, change: 3.7, trend: "up" }
};

const deliverySuccessData = [
  { name: 'Successful', value: 85, fill: '#22c55e' },
  { name: 'Failed', value: 12, fill: '#ef4444' },
  { name: 'Returned', value: 3, fill: '#f59e0b' }
];

const costTrendData = [
  { time: '00:00', cost: 8.5, target: 9.0 },
  { time: '04:00', cost: 7.8, target: 9.0 },
  { time: '08:00', cost: 9.2, target: 9.0 },
  { time: '12:00', cost: 10.1, target: 9.0 },
  { time: '16:00', cost: 8.7, target: 9.0 },
  { time: '20:00', cost: 7.9, target: 9.0 }
];

const demandPredictionData = [
  { time: 'Mon', historical: 450, predicted: 520, recommended: 32 },
  { time: 'Tue', historical: 380, predicted: 420, recommended: 28 },
  { time: 'Wed', historical: 520, predicted: 580, recommended: 36 },
  { time: 'Thu', historical: 490, predicted: 510, recommended: 34 },
  { time: 'Fri', historical: 640, predicted: 720, recommended: 42 },
  { time: 'Sat', historical: 780, predicted: 850, recommended: 48 },
  { time: 'Sun', historical: 680, predicted: 720, recommended: 44 }
];

const returnReasonsData = [
  { reason: 'Address Not Found', count: 145 },
  { reason: 'Customer Unavailable', count: 123 },
  { reason: 'Weather Conditions', count: 89 },
  { reason: 'Package Damage', count: 67 },
  { reason: 'Wrong Item', count: 45 }
];

const droneHealthData = {
  ready: 85,
  inFlight: 42,
  charging: 28,
  maintenance: 12,
  error: 3
};

const alerts = [
  { id: 1, type: 'critical', message: 'Drone #DX-442 emergency landing initiated', time: '2 min ago' },
  { id: 2, type: 'warning', message: 'High wind speeds detected in Sector 7', time: '5 min ago' },
  { id: 3, type: 'info', message: 'Maintenance completed for 3 drones', time: '12 min ago' },
  { id: 4, type: 'warning', message: 'Battery inventory below 20%', time: '18 min ago' },
  { id: 5, type: 'info', message: 'New delivery route optimized', time: '25 min ago' }
];

const QuickCommerceDashboard = () => {
  const [timeRange, setTimeRange] = useState("24h");

  const renderTrendIcon = (trend: string, change: number) => {
    if (trend === "up") {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    }
    return <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Quick Commerce Dashboard</h1>
            <p className="text-slate-400 mt-1">Executive Overview - Drone Delivery Operations</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32 bg-slate-800 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="24h" className="text-white hover:bg-slate-700">Last 24h</SelectItem>
                <SelectItem value="7d" className="text-white hover:bg-slate-700">Last 7 days</SelectItem>
                <SelectItem value="30d" className="text-white hover:bg-slate-700">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Executive Summary KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-400">Total Deliveries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-white">{kpiData.totalDeliveries.value.toLocaleString()}</div>
                <div className="flex items-center gap-1">
                  {renderTrendIcon(kpiData.totalDeliveries.trend, kpiData.totalDeliveries.change)}
                  <span className="text-sm text-green-500">+{kpiData.totalDeliveries.change}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-400">Avg Delivery Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-white">{kpiData.avgDeliveryTime.value} min</div>
                <div className="flex items-center gap-1">
                  {renderTrendIcon(kpiData.avgDeliveryTime.trend, kpiData.avgDeliveryTime.change)}
                  <span className="text-sm text-green-500">{kpiData.avgDeliveryTime.change}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-400">On-Time Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-white">{kpiData.onTimeRate.value}%</div>
                <div className="flex items-center gap-1">
                  {renderTrendIcon(kpiData.onTimeRate.trend, kpiData.onTimeRate.change)}
                  <span className="text-sm text-green-500">+{kpiData.onTimeRate.change}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-400">Active Drones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-white">{kpiData.activeDrones.value}</div>
                <div className="flex items-center gap-1">
                  {renderTrendIcon(kpiData.activeDrones.trend, kpiData.activeDrones.change)}
                  <span className="text-sm text-green-500">+{kpiData.activeDrones.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-400">Capacity Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-white">{kpiData.capacityUtilization.value}%</div>
                <div className="flex items-center gap-1">
                  {renderTrendIcon(kpiData.capacityUtilization.trend, kpiData.capacityUtilization.change)}
                  <span className="text-sm text-green-500">+{kpiData.capacityUtilization.change}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Performance & Efficiency */}
          <div className="col-span-4 space-y-6">
            {/* Delivery Success Rate */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Delivery Success Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={deliverySuccessData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {deliverySuccessData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Rate']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-4">
                  {deliverySuccessData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                      <span className="text-sm text-slate-300">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cost Per Delivery */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Cost Per Delivery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={costTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                      labelStyle={{ color: '#f3f4f6' }}
                    />
                    <Line type="monotone" dataKey="cost" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="target" stroke="#ef4444" strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Package Return Reasons */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Return Reasons (AI Analysis)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={returnReasonsData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis type="number" stroke="#9ca3af" />
                    <YAxis dataKey="reason" type="category" stroke="#9ca3af" width={120} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                      labelStyle={{ color: '#f3f4f6' }}
                    />
                    <Bar dataKey="count" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Center Column - AI/ML Insights */}
          <div className="col-span-4 space-y-6">
            {/* Predictive Demand */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  AI Demand Prediction & Fleet Allocation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={demandPredictionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                      labelStyle={{ color: '#f3f4f6' }}
                    />
                    <Line type="monotone" dataKey="historical" stroke="#6b7280" strokeWidth={2} name="Historical" />
                    <Line type="monotone" dataKey="predicted" stroke="#10b981" strokeWidth={2} name="AI Predicted" />
                    <Line type="monotone" dataKey="recommended" stroke="#f59e0b" strokeWidth={2} name="Recommended Fleet" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Drone Utilization Gauge */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Fleet Utilization Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#374151"
                        strokeWidth="8"
                        fill="transparent"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#10b981"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${78.3 * 2.51} 251`}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white">78.3%</div>
                        <div className="text-sm text-slate-400">Optimal</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Health Score */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  AI Fleet Health Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Overall Health</span>
                    <Badge className="bg-green-500 hover:bg-green-600">Excellent</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Predictive Score</span>
                      <span className="text-green-400">92/100</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">
                    AI predicts 2% risk of critical failures in next 24h
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Operational Health */}
          <div className="col-span-4 space-y-6">
            {/* Drone Health Overview */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Drone Fleet Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-500/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">{droneHealthData.ready}</div>
                    <div className="text-sm text-slate-300">Ready</div>
                  </div>
                  <div className="text-center p-3 bg-blue-500/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">{droneHealthData.inFlight}</div>
                    <div className="text-sm text-slate-300">In Flight</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-500/20 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-400">{droneHealthData.charging}</div>
                    <div className="text-sm text-slate-300">Charging</div>
                  </div>
                  <div className="text-center p-3 bg-orange-500/20 rounded-lg">
                    <div className="text-2xl font-bold text-orange-400">{droneHealthData.maintenance}</div>
                    <div className="text-sm text-slate-300">Maintenance</div>
                  </div>
                </div>
                <div className="mt-4 text-center p-3 bg-red-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-red-400">{droneHealthData.error}</div>
                  <div className="text-sm text-slate-300">Critical Alerts</div>
                </div>
              </CardContent>
            </Card>

            {/* Alerts Feed */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Real-time Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${getAlertColor(alert.type)}`}></div>
                      <div className="flex-1">
                        <div className="text-sm text-white">{alert.message}</div>
                        <div className="text-xs text-slate-400 mt-1">{alert.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Battery className="h-5 w-5" />
                  Resource Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">Batteries</span>
                      <span className="text-slate-300">156/200</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">Charging Ports</span>
                      <span className="text-slate-300">24/32</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3">
                      <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">Spare Parts</span>
                      <span className="text-slate-300">45/60</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3">
                      <div className="bg-orange-500 h-3 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickCommerceDashboard;
