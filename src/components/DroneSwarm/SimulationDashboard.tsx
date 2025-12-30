
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Battery, 
  Zap, 
  Users, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Radio,
  Target,
  TrendingUp,
  Activity
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

interface SimulationDashboardProps {
  status: string;
  progress: number;
}

const SimulationDashboard: React.FC<SimulationDashboardProps> = ({ status, progress }) => {
  const [realTimeData, setRealTimeData] = useState({
    activeDrones: 18,
    totalDrones: 20,
    averageBattery: 75,
    communicationSuccess: 98,
    collisions: 0,
    missionProgress: progress,
    averageSpeed: 12.5,
    formationAccuracy: 94
  });

  const [performanceData, setPerformanceData] = useState([
    { time: '0', battery: 100, speed: 0, altitude: 50 },
    { time: '1', battery: 98, speed: 8, altitude: 55 },
    { time: '2', battery: 95, speed: 12, altitude: 60 },
    { time: '3', battery: 92, speed: 15, altitude: 58 },
    { time: '4', battery: 88, speed: 13, altitude: 62 },
    { time: '5', battery: 85, speed: 14, altitude: 65 },
  ]);

  const batteryDistribution = [
    { name: '90-100%', value: 5, color: '#22c55e' },
    { name: '70-90%', value: 8, color: '#eab308' },
    { name: '50-70%', value: 4, color: '#f97316' },
    { name: '30-50%', value: 2, color: '#ef4444' },
    { name: '<30%', value: 1, color: '#dc2626' },
  ];

  // Simulate real-time data updates
  useEffect(() => {
    if (status === "running") {
      const interval = setInterval(() => {
        setRealTimeData(prev => ({
          ...prev,
          averageBattery: Math.max(20, prev.averageBattery - Math.random() * 0.5),
          communicationSuccess: 95 + Math.random() * 5,
          averageSpeed: 10 + Math.random() * 5,
          formationAccuracy: 90 + Math.random() * 10,
          missionProgress: progress
        }));

        setPerformanceData(prev => {
          const newTime = (parseInt(prev[prev.length - 1].time) + 1).toString();
          const newData = {
            time: newTime,
            battery: Math.max(20, prev[prev.length - 1].battery - Math.random() * 2),
            speed: 10 + Math.random() * 10,
            altitude: 50 + Math.random() * 20
          };
          return [...prev.slice(-9), newData];
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [status, progress]);

  const getStatusColor = (value: number, thresholds: { good: number, warning: number }) => {
    if (value >= thresholds.good) return "text-green-500";
    if (value >= thresholds.warning) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Real-time Dashboard</h2>
        <Badge variant={status === "running" ? "default" : "secondary"}>
          {status === "running" ? "Live Data" : "Simulation Stopped"}
        </Badge>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Drones</p>
                <p className="text-2xl font-bold">{realTimeData.activeDrones}/{realTimeData.totalDrones}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Battery</p>
                <p className={`text-2xl font-bold ${getStatusColor(realTimeData.averageBattery, { good: 70, warning: 30 })}`}>
                  {realTimeData.averageBattery.toFixed(1)}%
                </p>
              </div>
              <Battery className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Communication</p>
                <p className={`text-2xl font-bold ${getStatusColor(realTimeData.communicationSuccess, { good: 95, warning: 85 })}`}>
                  {realTimeData.communicationSuccess.toFixed(1)}%
                </p>
              </div>
              <Radio className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Collisions</p>
                <p className={`text-2xl font-bold ${realTimeData.collisions === 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {realTimeData.collisions}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Performance Metrics
            </CardTitle>
            <CardDescription>Real-time swarm performance data</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="battery" stroke="#22c55e" name="Battery %" />
                <Line type="monotone" dataKey="speed" stroke="#3b82f6" name="Speed (m/s)" />
                <Line type="monotone" dataKey="altitude" stroke="#f59e0b" name="Altitude (m)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Battery className="w-5 h-5" />
              Battery Distribution
            </CardTitle>
            <CardDescription>Current battery levels across the swarm</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={batteryDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {batteryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Mission Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span>{realTimeData.missionProgress}%</span>
              </div>
              <Progress value={realTimeData.missionProgress} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Formation Accuracy</span>
                <span>{realTimeData.formationAccuracy.toFixed(1)}%</span>
              </div>
              <Progress value={realTimeData.formationAccuracy} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">GPS Signal</span>
              <Badge variant="outline" className="text-green-500 border-green-500">
                <CheckCircle className="w-3 h-3 mr-1" />
                Strong
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Weather Conditions</span>
              <Badge variant="outline" className="text-green-500 border-green-500">
                <CheckCircle className="w-3 h-3 mr-1" />
                Clear
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Communication Network</span>
              <Badge variant="outline" className="text-green-500 border-green-500">
                <CheckCircle className="w-3 h-3 mr-1" />
                Stable
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Timing Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Simulation Time</span>
              <span className="text-sm font-medium">
                {Math.floor(progress * 0.15)}:{((progress * 0.15 % 1) * 60).toFixed(0).padStart(2, '0')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Avg Speed</span>
              <span className="text-sm font-medium">{realTimeData.averageSpeed.toFixed(1)} m/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Est. Completion</span>
              <span className="text-sm font-medium">
                {Math.max(0, 15 - Math.floor(progress * 0.15))}:{((1 - (progress * 0.15 % 1)) * 60).toFixed(0).padStart(2, '0')}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimulationDashboard;
