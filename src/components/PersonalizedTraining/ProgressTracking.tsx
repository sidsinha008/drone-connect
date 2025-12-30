
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Trophy, 
  Target, 
  Calendar,
  Download,
  Share,
  BarChart3,
  Activity
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

interface ProgressTrackingProps {
  playerId: string;
}

const ProgressTracking = ({ playerId }: ProgressTrackingProps) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("4w");

  const progressData = [
    { week: "Week 1", batting: 75, fielding: 70, fitness: 65, overall: 70 },
    { week: "Week 2", batting: 78, fielding: 73, fitness: 68, overall: 73 },
    { week: "Week 3", batting: 82, fielding: 76, fitness: 72, overall: 77 },
    { week: "Week 4", batting: 85, fielding: 78, fitness: 75, overall: 79 }
  ];

  const skillComparisonData = [
    { skill: "Batting Stance", baseline: 70, current: 85, target: 90 },
    { skill: "Weight Distribution", baseline: 65, current: 82, target: 88 },
    { skill: "Reaction Time", baseline: 75, current: 78, target: 85 },
    { skill: "Endurance", baseline: 70, current: 76, target: 82 },
    { skill: "Mental Focus", baseline: 80, current: 88, target: 92 },
    { skill: "Technique", baseline: 78, current: 84, target: 90 }
  ];

  const achievements = [
    {
      id: 1,
      title: "Stance Stability Master",
      description: "Achieved 90%+ stability in weight distribution drills",
      date: "2024-01-14",
      category: "Technical",
      points: 250
    },
    {
      id: 2,
      title: "Consistency Champion",
      description: "Completed 15 consecutive training sessions",
      date: "2024-01-12",
      category: "Dedication",
      points: 300
    },
    {
      id: 3,
      title: "Improvement Streak",
      description: "Showed improvement for 4 weeks straight",
      date: "2024-01-10",
      category: "Progress",
      points: 400
    }
  ];

  const drillPerformance = [
    { drill: "Weight Distribution", sessions: 12, avgScore: 85, improvement: "+15%" },
    { drill: "Reaction Training", sessions: 8, avgScore: 78, improvement: "+8%" },
    { drill: "Cardio Intervals", sessions: 10, avgScore: 76, improvement: "+12%" },
    { drill: "Stance Practice", sessions: 15, avgScore: 88, improvement: "+18%" }
  ];

  const weeklyStats = {
    totalSessions: 16,
    totalHours: 24.5,
    avgIntensity: 76,
    improvementRate: 12.8,
    goalsAchieved: 8,
    goalsTotal: 10
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Technical": return "bg-blue-100 text-blue-700";
      case "Dedication": return "bg-green-100 text-green-700";
      case "Progress": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Export Options */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Progress Tracking & Analysis</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Share className="w-4 h-4" />
            Share Progress
          </Button>
        </div>
      </div>

      {/* Weekly Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Sessions</p>
                <p className="text-2xl font-bold">{weeklyStats.totalSessions}</p>
              </div>
              <Calendar className="text-primary" size={20} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Training Hours</p>
                <p className="text-2xl font-bold">{weeklyStats.totalHours}h</p>
              </div>
              <Activity className="text-primary" size={20} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Improvement Rate</p>
                <p className="text-2xl font-bold text-green-600">+{weeklyStats.improvementRate}%</p>
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Goals Achieved</p>
                <p className="text-2xl font-bold">{weeklyStats.goalsAchieved}/{weeklyStats.goalsTotal}</p>
              </div>
              <Target className="text-primary" size={20} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skill Analysis</TabsTrigger>
          <TabsTrigger value="drills">Drill Performance</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Overall Progress Trends
              </CardTitle>
              <div className="flex gap-2">
                {["2w", "4w", "8w", "12w"].map((period) => (
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
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis domain={[60, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="batting" stroke="#3b82f6" name="Batting" strokeWidth={2} />
                  <Line type="monotone" dataKey="fielding" stroke="#22c55e" name="Fielding" strokeWidth={2} />
                  <Line type="monotone" dataKey="fitness" stroke="#f59e0b" name="Fitness" strokeWidth={2} />
                  <Line type="monotone" dataKey="overall" stroke="#8b5cf6" name="Overall" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Key Progress Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                    Excellent Batting Improvement
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Batting performance has improved by 13% over the last 4 weeks, particularly in stance stability and weight distribution.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    Consistent Training Dedication
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    100% attendance rate and strong engagement with AI-recommended drills is driving steady progress.
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                  <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                    Focus Area: Reaction Time
                  </h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    While improving, reaction time still lags behind other metrics. Consider increasing specific drill intensity.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Skill Development Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={skillComparisonData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis domain={[50, 100]} />
                  <Radar name="Baseline" dataKey="baseline" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} />
                  <Radar name="Current" dataKey="current" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  <Radar name="Target" dataKey="target" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Individual Skill Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillComparisonData.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{skill.skill}</span>
                      <span className="text-sm font-bold text-green-600">
                        +{skill.current - skill.baseline} points
                      </span>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full relative"
                          style={{ width: `${skill.current}%` }}
                        >
                          <div 
                            className="absolute top-0 right-0 w-1 h-2 bg-green-500"
                            style={{ right: `${100 - skill.target}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Baseline: {skill.baseline}</span>
                        <span>Current: {skill.current}</span>
                        <span>Target: {skill.target}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Drill Performance Analysis</CardTitle>
              <CardDescription>
                Individual drill progress and effectiveness tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {drillPerformance.map((drill, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{drill.drill}</h4>
                      <Badge className="bg-green-100 text-green-700">
                        {drill.improvement}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Sessions</p>
                        <p className="font-bold">{drill.sessions}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg Score</p>
                        <p className="font-bold">{drill.avgScore}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Progress</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${drill.avgScore}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Recent Achievements
              </CardTitle>
              <CardDescription>
                Milestones and accomplishments in your training journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      <Trophy className="w-8 h-8 text-yellow-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{achievement.title}</h4>
                        <Badge className={getCategoryColor(achievement.category)}>
                          {achievement.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {achievement.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{achievement.date}</span>
                        <span className="font-bold text-yellow-600">+{achievement.points} points</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProgressTracking;
