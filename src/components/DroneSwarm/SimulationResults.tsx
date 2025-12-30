
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Share, 
  GitCompare, 
  FileText, 
  BarChart3, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter } from "recharts";

const SimulationResults = () => {
  const [selectedRun, setSelectedRun] = useState("run-001");

  const simulationRuns = [
    { id: "run-001", name: "Urban Formation Flight", date: "2024-01-15", status: "completed", score: 94 },
    { id: "run-002", name: "Search & Rescue Mission", date: "2024-01-14", status: "completed", score: 87 },
    { id: "run-003", name: "Area Patrol", date: "2024-01-13", status: "completed", score: 91 }
  ];

  const performanceSummary = {
    totalFlightTime: "14:32",
    averageBatteryUsage: "68%",
    collisionCount: 0,
    communicationSuccess: "97.8%",
    formationAccuracy: "94.2%",
    missionCompletion: "100%",
    averageSpeed: "12.8 m/s",
    maxAltitude: "185m"
  };

  const detailedMetrics = [
    { time: '0', battery: 100, speed: 0, altitude: 50, communication: 100 },
    { time: '2', battery: 95, speed: 8, altitude: 65, communication: 98 },
    { time: '4', battery: 88, speed: 12, altitude: 75, communication: 97 },
    { time: '6', battery: 82, speed: 15, altitude: 80, communication: 96 },
    { time: '8', battery: 75, speed: 13, altitude: 85, communication: 98 },
    { time: '10', battery: 68, speed: 14, altitude: 90, communication: 97 },
    { time: '12', battery: 58, speed: 16, altitude: 75, communication: 95 },
    { time: '14', battery: 45, speed: 12, altitude: 60, communication: 97 }
  ];

  const dronePerformance = [
    { drone: 'D1', efficiency: 95, battery: 45, distance: 2.8 },
    { drone: 'D2', efficiency: 92, battery: 52, distance: 2.6 },
    { drone: 'D3', efficiency: 97, battery: 38, distance: 3.1 },
    { drone: 'D4', efficiency: 89, battery: 48, distance: 2.9 },
    { drone: 'D5', efficiency: 94, battery: 41, distance: 3.0 },
    { drone: 'D6', efficiency: 91, battery: 55, distance: 2.5 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "running": return "bg-blue-500";
      case "error": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 75) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Simulation Results & Analysis</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Share className="w-4 h-4" />
            Share Results
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <GitCompare className="w-4 h-4" />
            Compare Runs
          </Button>
        </div>
      </div>

      {/* Simulation Runs History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Recent Simulation Runs
          </CardTitle>
          <CardDescription>
            View and compare results from previous simulations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {simulationRuns.map((run) => (
              <div 
                key={run.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedRun === run.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                }`}
                onClick={() => setSelectedRun(run.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{run.name}</h4>
                    <p className="text-sm text-muted-foreground">{run.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-lg font-bold ${getScoreColor(run.score)}`}>
                      {run.score}%
                    </span>
                    <Badge className={`${getStatusColor(run.status)} text-white`}>
                      {run.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="summary" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="individual">Individual Drones</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-6">
          {/* Performance Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Flight Time</p>
                    <p className="text-xl font-bold">{performanceSummary.totalFlightTime}</p>
                  </div>
                  <Clock className="w-6 h-6 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Mission Completion</p>
                    <p className="text-xl font-bold text-green-500">{performanceSummary.missionCompletion}</p>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Collisions</p>
                    <p className="text-xl font-bold text-green-500">{performanceSummary.collisionCount}</p>
                  </div>
                  <AlertTriangle className="w-6 h-6 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Speed</p>
                    <p className="text-xl font-bold">{performanceSummary.averageSpeed}</p>
                  </div>
                  <TrendingUp className="w-6 h-6 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Battery Usage</p>
                  <p className="text-2xl font-bold text-yellow-500">{performanceSummary.averageBatteryUsage}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Communication Success</p>
                  <p className="text-2xl font-bold text-green-500">{performanceSummary.communicationSuccess}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Formation Accuracy</p>
                  <p className="text-2xl font-bold text-blue-500">{performanceSummary.formationAccuracy}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Max Altitude</p>
                  <p className="text-2xl font-bold">{performanceSummary.maxAltitude}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Performance Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={detailedMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="battery" stroke="#eab308" name="Battery %" />
                  <Line type="monotone" dataKey="speed" stroke="#3b82f6" name="Speed (m/s)" />
                  <Line type="monotone" dataKey="altitude" stroke="#f59e0b" name="Altitude (m)" />
                  <Line type="monotone" dataKey="communication" stroke="#22c55e" name="Communication %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="individual" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Individual Drone Performance</CardTitle>
              <CardDescription>
                Detailed analysis of each drone's performance during the simulation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={dronePerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="drone" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="efficiency" fill="#3b82f6" name="Efficiency %" />
                  <Bar dataKey="battery" fill="#eab308" name="Remaining Battery %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Efficiency vs Distance Traveled</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart data={dronePerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="distance" name="Distance" unit="km" />
                  <YAxis dataKey="efficiency" name="Efficiency" unit="%" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Perfect Collision Avoidance</p>
                    <p className="text-sm text-muted-foreground">Zero collisions throughout the entire mission</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">High Formation Accuracy</p>
                    <p className="text-sm text-muted-foreground">94.2% accuracy in maintaining formation patterns</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Stable Communication</p>
                    <p className="text-sm text-muted-foreground">97.8% communication success rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-500" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Battery Optimization</p>
                    <p className="text-sm text-muted-foreground">Some drones consumed battery faster than optimal</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Speed Consistency</p>
                    <p className="text-sm text-muted-foreground">Variations in speed between drones could be reduced</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Formation Transitions</p>
                    <p className="text-sm text-muted-foreground">Formation changes took longer than expected</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Algorithm Optimization</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Consider implementing adaptive speed control to balance battery consumption across the swarm.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Training Enhancement</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    The current formation algorithms show excellent results and should be maintained as the baseline.
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                  <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">Parameter Tuning</h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Fine-tune communication protocols to achieve consistent 99%+ success rates.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SimulationResults;
