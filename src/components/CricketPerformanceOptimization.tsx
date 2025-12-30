
import React, { useState } from "react";
import { ArrowLeft, Upload, Users, Play, BarChart3, FileText, Settings, Target, Camera, Brain, Activity, Calendar, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SessionManagement from "./CricketOptimization/SessionManagement";
import PlayerProfiles from "./CricketOptimization/PlayerProfiles";
import VideoAnalysis from "./CricketOptimization/VideoAnalysis";
import AIInsights from "./CricketOptimization/AIInsights";
import PerformanceReports from "./CricketOptimization/PerformanceReports";

interface CricketPerformanceOptimizationProps {
  onBack: () => void;
}

const CricketPerformanceOptimization = ({ onBack }: CricketPerformanceOptimizationProps) => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const quickStats = [
    { label: "Active Sessions", value: "24", change: "+12%", icon: Play },
    { label: "Players Tracked", value: "156", change: "+8%", icon: Users },
    { label: "Hours Analyzed", value: "342", change: "+23%", icon: Activity },
    { label: "AI Insights Generated", value: "89", change: "+15%", icon: Brain }
  ];

  const recentSessions = [
    { id: 1, name: "Batting Practice - Team A", date: "2024-06-14", duration: "2h 15m", players: 8, status: "Analyzed" },
    { id: 2, name: "Fielding Drills - Team B", date: "2024-06-13", duration: "1h 45m", players: 11, status: "Processing" },
    { id: 3, name: "Bowling Technique", date: "2024-06-13", duration: "1h 30m", players: 5, status: "Analyzed" },
    { id: 4, name: "Match Simulation", date: "2024-06-12", duration: "3h 20m", players: 22, status: "Analyzed" }
  ];

  const aiInsights = [
    { type: "Performance", message: "Player Johnson's batting stance has improved 15% over last week", priority: "medium" },
    { type: "Injury Risk", message: "Bowler Smith showing fatigue patterns - recommend rest", priority: "high" },
    { type: "Tactical", message: "Field positioning efficiency increased by 8% with new formation", priority: "low" },
    { type: "Technique", message: "3 players showing consistent footwork improvements", priority: "medium" }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <Badge variant="outline" className="text-xs text-green-600 bg-green-50">
                    {stat.change}
                  </Badge>
                </div>
                <stat.icon className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Recent Training Sessions
            </CardTitle>
            <CardDescription>Latest drone-captured training activities</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <div className="space-y-3">
                {recentSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{session.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {session.date} • {session.duration} • {session.players} players
                      </p>
                    </div>
                    <Badge variant={session.status === "Analyzed" ? "default" : "secondary"}>
                      {session.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Latest AI Insights
            </CardTitle>
            <CardDescription>Real-time performance analysis and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <div className="space-y-3">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {insight.type}
                      </Badge>
                      <Badge 
                        variant={insight.priority === "high" ? "destructive" : insight.priority === "medium" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {insight.priority}
                      </Badge>
                    </div>
                    <p className="text-sm">{insight.message}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Get started with key platform features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => setActiveSection("sessions")}
            >
              <Upload className="w-6 h-6" />
              Upload Session
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => setActiveSection("analysis")}
            >
              <Play className="w-6 h-6" />
              Analyze Video
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => setActiveSection("reports")}
            >
              <FileText className="w-6 h-6" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "sessions":
        return <SessionManagement />;
      case "players":
        return <PlayerProfiles />;
      case "analysis":
        return <VideoAnalysis />;
      case "insights":
        return <AIInsights />;
      case "reports":
        return <PerformanceReports />;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">Cricket Performance Optimization</h1>
          </div>
          <p className="text-muted-foreground mt-2">
            AI/ML-powered cricket analytics with drone-captured performance data
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            <Camera className="w-3 h-3 mr-1" />
            Drone Analytics
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Brain className="w-3 h-3 mr-1" />
            AI Powered
          </Badge>
        </div>
      </div>

      <Tabs value={activeSection} onValueChange={setActiveSection}>
        <TabsList className="grid w-full lg:w-auto grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="sessions" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Sessions
          </TabsTrigger>
          <TabsTrigger value="players" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Players
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            Analysis
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            AI Insights
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeSection} className="mt-6">
          {renderContent()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CricketPerformanceOptimization;
