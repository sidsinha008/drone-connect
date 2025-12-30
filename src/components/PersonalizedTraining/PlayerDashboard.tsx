
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  Heart, 
  Zap, 
  Target, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  BarChart3,
  MapPin
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar } from "recharts";

interface PlayerDashboardProps {
  playerId: string;
}

const PlayerDashboard = ({ playerId }: PlayerDashboardProps) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");

  // Mock data - in real app this would come from APIs
  const playerData = {
    name: "Virat Kohli",
    role: "Batsman",
    currentStatus: "Active",
    injuryRisk: "Low",
    lastSession: "2024-01-15",
    nextSession: "2024-01-16"
  };

  const biometricData = [
    { date: "Jan 10", heartRate: 145, load: 78, fatigue: 25, recovery: 85 },
    { date: "Jan 11", heartRate: 152, load: 82, fatigue: 30, recovery: 80 },
    { date: "Jan 12", heartRate: 148, load: 75, fatigue: 22, recovery: 88 },
    { date: "Jan 13", heartRate: 155, load: 88, fatigue: 35, recovery: 75 },
    { date: "Jan 14", heartRate: 142, load: 70, fatigue: 20, recovery: 90 },
    { date: "Jan 15", heartRate: 149, load: 76, fatigue: 28, recovery: 82 }
  ];

  const performanceMetrics = [
    { skill: "Batting", current: 85, benchmark: 80, target: 90 },
    { skill: "Fielding", current: 78, benchmark: 75, target: 85 },
    { skill: "Running", current: 82, benchmark: 78, target: 88 },
    { skill: "Fitness", current: 88, benchmark: 85, target: 92 },
    { skill: "Mental", current: 90, benchmark: 85, target: 95 },
    { skill: "Technique", current: 87, benchmark: 82, target: 92 }
  ];

  const droneInsights = [
    {
      category: "Batting Stance",
      finding: "Slight forward lean detected",
      impact: "May affect balance against fast bowling",
      severity: "Medium",
      recommendation: "Focus on weight distribution drills"
    },
    {
      category: "Footwork",
      finding: "Excellent front-foot placement",
      impact: "Strong drive shots execution",
      severity: "Positive",
      recommendation: "Maintain current technique"
    },
    {
      category: "Ball Tracking",
      finding: "Head movement optimized",
      impact: "Better line and length judgment",
      severity: "Positive",
      recommendation: "Continue eye training exercises"
    }
  ];

  const wearableData = {
    heartRate: { current: 72, resting: 58, max: 185, zone: "Recovery" },
    sleep: { duration: 7.5, quality: 85, deepSleep: 2.1 },
    hydration: { level: 78, target: 85 },
    calories: { burned: 2840, intake: 3200, net: 360 },
    steps: 12450,
    distance: 8.2
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High": return "bg-red-100 text-red-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Low": return "bg-blue-100 text-blue-700";
      case "Positive": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Player Status Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Status</p>
                <p className="text-lg font-bold text-green-600">{playerData.currentStatus}</p>
              </div>
              <CheckCircle className="text-green-500" size={20} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Injury Risk</p>
                <p className="text-lg font-bold text-green-600">{playerData.injuryRisk}</p>
              </div>
              <AlertTriangle className="text-green-500" size={20} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Heart Rate</p>
                <p className="text-lg font-bold">{wearableData.heartRate.current} BPM</p>
                <p className="text-xs text-muted-foreground">{wearableData.heartRate.zone}</p>
              </div>
              <Heart className="text-red-500" size={20} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sleep Quality</p>
                <p className="text-lg font-bold">{wearableData.sleep.quality}%</p>
                <p className="text-xs text-muted-foreground">{wearableData.sleep.duration}h sleep</p>
              </div>
              <Activity className="text-blue-500" size={20} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="biometrics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="biometrics">Biometrics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="drone-insights">Drone Insights</TabsTrigger>
          <TabsTrigger value="correlations">AI Correlations</TabsTrigger>
        </TabsList>

        <TabsContent value="biometrics" className="space-y-6">
          {/* Biometric Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Biometric Trends (Last 7 Days)
              </CardTitle>
              <div className="flex gap-2">
                {["7d", "14d", "30d"].map((period) => (
                  <Button
                    key={period}
                    variant={selectedTimeframe === period ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTimeframe(period)}
                  >
                    {period}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={biometricData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="heartRate" stroke="#ef4444" name="Avg Heart Rate" />
                  <Line type="monotone" dataKey="load" stroke="#3b82f6" name="Training Load" />
                  <Line type="monotone" dataKey="fatigue" stroke="#f59e0b" name="Fatigue Level" />
                  <Line type="monotone" dataKey="recovery" stroke="#22c55e" name="Recovery Score" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Today's Wearable Data */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Daily Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Steps</span>
                  <span className="font-bold">{wearableData.steps.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Distance</span>
                  <span className="font-bold">{wearableData.distance} km</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Calories Burned</span>
                  <span className="font-bold">{wearableData.calories.burned}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Recovery Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Resting HR</span>
                  <span className="font-bold">{wearableData.heartRate.resting} BPM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">HRV</span>
                  <span className="font-bold">45 ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Deep Sleep</span>
                  <span className="font-bold">{wearableData.sleep.deepSleep}h</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Hydration & Nutrition</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Hydration</span>
                  <span className="font-bold">{wearableData.hydration.level}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Calorie Surplus</span>
                  <span className="font-bold text-green-600">+{wearableData.calories.net}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Protein Target</span>
                  <span className="font-bold">85%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Performance Radar Chart
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={performanceMetrics}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar name="Current" dataKey="current" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  <Radar name="Benchmark" dataKey="benchmark" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} />
                  <Radar name="Target" dataKey="target" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drone-insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Latest Drone Analysis Insights
              </CardTitle>
              <CardDescription>
                AI-powered analysis from latest training session drone footage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {droneInsights.map((insight, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{insight.category}</h4>
                      <Badge className={getSeverityColor(insight.severity)}>
                        {insight.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{insight.finding}</p>
                    <p className="text-sm mb-3"><strong>Impact:</strong> {insight.impact}</p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        <strong>Recommendation:</strong> {insight.recommendation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="correlations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                AI-Discovered Correlations
              </CardTitle>
              <CardDescription>
                Machine learning insights combining drone and wearable data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                    Strong Positive Correlation (r=0.84)
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Sleep quality directly correlates with batting stance stability (drone analysis). 
                    Better sleep leads to 23% improvement in weight distribution consistency.
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                  <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                    Moderate Negative Correlation (r=-0.61)
                  </h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    High training load days show decreased reaction time for close catches. 
                    Recommend load management on match days.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    Predictive Pattern Identified
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Heart rate variability patterns predict optimal batting performance windows. 
                    Current window: 2:30 PM - 4:00 PM today.
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

export default PlayerDashboard;
