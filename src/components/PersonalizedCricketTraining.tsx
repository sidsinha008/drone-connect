
import React, { useState } from "react";
import { ArrowLeft, Users, Target, Activity, TrendingUp, Calendar, Brain, Zap, Eye, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlayerDashboard from "./PersonalizedTraining/PlayerDashboard";
import TrainingPlanBuilder from "./PersonalizedTraining/TrainingPlanBuilder";
import DrillLibrary from "./PersonalizedTraining/DrillLibrary";
import ProgressTracking from "./PersonalizedTraining/ProgressTracking";

interface PersonalizedCricketTrainingProps {
  onBack: () => void;
}

const PersonalizedCricketTraining = ({ onBack }: PersonalizedCricketTrainingProps) => {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  const players = [
    { 
      id: "p1", 
      name: "Virat Kohli", 
      role: "Batsman", 
      status: "Active", 
      riskScore: "Low", 
      lastSession: "2024-01-15",
      injuryRisk: {
        overall: 15,
        shoulder: 8,
        knee: 12,
        back: 18,
        elbow: 10
      },
      biomechanicalScore: 92,
      aiInsights: "Excellent technique stability, minor front-foot timing variance detected"
    },
    { 
      id: "p2", 
      name: "Jasprit Bumrah", 
      role: "Bowler", 
      status: "Recovery", 
      riskScore: "Medium", 
      lastSession: "2024-01-14",
      injuryRisk: {
        overall: 35,
        shoulder: 42,
        knee: 28,
        back: 38,
        elbow: 30
      },
      biomechanicalScore: 78,
      aiInsights: "Slight arm angle deviation detected in last 3 sessions, workload management required"
    },
    { 
      id: "p3", 
      name: "Ravindra Jadeja", 
      role: "All-rounder", 
      status: "Active", 
      riskScore: "Low", 
      lastSession: "2024-01-15",
      injuryRisk: {
        overall: 12,
        shoulder: 15,
        knee: 8,
        back: 14,
        elbow: 12
      },
      biomechanicalScore: 95,
      aiInsights: "Optimal movement patterns across all disciplines, excellent kinetic chain efficiency"
    },
    { 
      id: "p4", 
      name: "Rohit Sharma", 
      role: "Batsman", 
      status: "Active", 
      riskScore: "High", 
      lastSession: "2024-01-13",
      injuryRisk: {
        overall: 45,
        shoulder: 38,
        knee: 52,
        back: 48,
        elbow: 35
      },
      biomechanicalScore: 68,
      aiInsights: "Increased lower-back stress during pull shots, recommending technique adjustment drills"
    }
  ];

  const systemStats = {
    droneHours: 432,
    biomechanicalAnalyses: 1247,
    aiInsights: 89,
    adaptivePlans: 24,
    realTimeAlerts: 156,
    correlationsFound: 34
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-700";
      case "Recovery": return "bg-yellow-100 text-yellow-700";
      case "Injured": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "text-green-600";
      case "Medium": return "text-yellow-600";
      case "High": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getBiomechanicalColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  if (selectedPlayer) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedPlayer(null)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Players
          </Button>
          <h1 className="text-2xl font-bold">
            {players.find(p => p.id === selectedPlayer)?.name} - AI-Powered Training Analysis
          </h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Holistic Dashboard
            </TabsTrigger>
            <TabsTrigger value="plan-builder" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Adaptive Plans
            </TabsTrigger>
            <TabsTrigger value="drills" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Smart Drills
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Progress Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <PlayerDashboard playerId={selectedPlayer} />
          </TabsContent>

          <TabsContent value="plan-builder">
            <TrainingPlanBuilder playerId={selectedPlayer} />
          </TabsContent>

          <TabsContent value="drills">
            <DrillLibrary playerId={selectedPlayer} />
          </TabsContent>

          <TabsContent value="progress">
            <ProgressTracking playerId={selectedPlayer} />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Brain className="text-primary" size={32} />
              AI-Powered Personalized Cricket Training
            </h1>
          </div>
          <p className="text-muted-foreground mt-2">
            Hyper-personalized training driven by multi-sensor drone analysis, IoT wearables, and adaptive AI/ML
          </p>
        </div>
      </div>

      {/* Enhanced System Stats */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Players</p>
                <p className="text-2xl font-bold">{players.filter(p => p.status === "Active").length}</p>
              </div>
              <Users className="text-primary" size={20} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Drone Analysis Hours</p>
                <p className="text-2xl font-bold">{systemStats.droneHours}</p>
              </div>
              <Eye className="text-primary" size={20} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Biomechanical Analyses</p>
                <p className="text-2xl font-bold">{systemStats.biomechanicalAnalyses.toLocaleString()}</p>
              </div>
              <BarChart3 className="text-primary" size={20} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">AI Insights</p>
                <p className="text-2xl font-bold">{systemStats.aiInsights}</p>
              </div>
              <Brain className="text-primary" size={20} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Adaptive Plans</p>
                <p className="text-2xl font-bold">{systemStats.adaptivePlans}</p>
              </div>
              <Zap className="text-primary" size={20} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Real-time Alerts</p>
                <p className="text-2xl font-bold">{systemStats.realTimeAlerts}</p>
              </div>
              <Activity className="text-red-500" size={20} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Player Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Player Selection & AI Assessment Overview</CardTitle>
          <CardDescription>
            Choose a player to access their comprehensive multi-sensor analysis dashboard and adaptive training ecosystem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {players.map((player) => (
              <Card 
                key={player.id} 
                className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30"
                onClick={() => setSelectedPlayer(player.id)}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{player.name}</h3>
                        <p className="text-sm text-muted-foreground">{player.role}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(player.status)}`}>
                        {player.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Injury Risk</p>
                        <p className={`font-bold ${getRiskColor(player.riskScore)}`}>
                          {player.riskScore} ({player.injuryRisk.overall}%)
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Biomechanical Score</p>
                        <p className={`font-bold ${getBiomechanicalColor(player.biomechanicalScore)}`}>
                          {player.biomechanicalScore}/100
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Shoulder</p>
                        <div className={`text-xs font-medium ${getRiskColor(player.injuryRisk.shoulder > 30 ? "High" : player.injuryRisk.shoulder > 15 ? "Medium" : "Low")}`}>
                          {player.injuryRisk.shoulder}%
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Knee</p>
                        <div className={`text-xs font-medium ${getRiskColor(player.injuryRisk.knee > 30 ? "High" : player.injuryRisk.knee > 15 ? "Medium" : "Low")}`}>
                          {player.injuryRisk.knee}%
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Back</p>
                        <div className={`text-xs font-medium ${getRiskColor(player.injuryRisk.back > 30 ? "High" : player.injuryRisk.back > 15 ? "Medium" : "Low")}`}>
                          {player.injuryRisk.back}%
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Elbow</p>
                        <div className={`text-xs font-medium ${getRiskColor(player.injuryRisk.elbow > 30 ? "High" : player.injuryRisk.elbow > 15 ? "Medium" : "Low")}`}>
                          {player.injuryRisk.elbow}%
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Latest AI Insight:</p>
                      <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                        {player.aiInsights}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>Last Session: {player.lastSession}</span>
                    </div>
                    
                    <Button className="w-full" size="sm">
                      <Brain className="w-4 h-4 mr-2" />
                      Access AI Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Insights Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Latest AI-Driven Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                Strong Correlation Discovered
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Sleep quality strongly correlates (r=0.87) with biomechanical consistency in batting stance. 
                Players with 7+ hours quality sleep show 34% better weight distribution stability.
              </p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                Predictive Model Alert
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Advanced kinematic analysis predicts optimal performance windows for each player. 
                Current system accuracy: 89% for injury prevention, 92% for performance optimization.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizedCricketTraining;
