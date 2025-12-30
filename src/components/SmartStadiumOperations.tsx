
import React, { useState } from "react";
import { ArrowLeft, Building2, Plane, Shield, Wrench, Eye, MapPin, AlertTriangle, Brain, Zap, Activity, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Stadium3DVisualization from "./StadiumOperations/Stadium3DVisualization";
import DroneMissionPlanner from "./StadiumOperations/DroneMissionPlanner";
import InfrastructureInspection from "./StadiumOperations/InfrastructureInspection";
import SecuritySurveillance from "./StadiumOperations/SecuritySurveillance";
import MaintenanceWorkflow from "./StadiumOperations/MaintenanceWorkflow";

interface SmartStadiumOperationsProps {
  onBack: () => void;
}

const SmartStadiumOperations = ({ onBack }: SmartStadiumOperationsProps) => {
  const [activeTab, setActiveTab] = useState("3d-visualization");

  const operationalStats = [
    {
      title: "Active Drones",
      value: "7",
      change: "+2",
      icon: Plane,
      status: "operational",
      description: "Multi-sensor fleet"
    },
    {
      title: "AI Anomalies Detected",
      value: "23",
      change: "+15",
      icon: Brain,
      status: "warning",
      description: "Predictive analysis"
    },
    {
      title: "Critical Infrastructure Alerts",
      value: "3",
      change: "-1",
      icon: AlertTriangle,
      status: "critical",
      description: "Structural health"
    },
    {
      title: "Predictive Maintenance Tasks",
      value: "12",
      change: "+4",
      icon: TrendingUp,
      status: "normal",
      description: "Proactive scheduling"
    }
  ];

  const advancedMetrics = [
    {
      title: "Digital Twin Sync",
      value: "99.8%",
      status: "excellent",
      description: "Real-time 3D model accuracy"
    },
    {
      title: "AI Confidence Score",
      value: "94.2%",
      status: "excellent", 
      description: "Deep learning anomaly detection"
    },
    {
      title: "Sensor Fusion Quality",
      value: "97.1%",
      status: "excellent",
      description: "Multi-sensor data correlation"
    },
    {
      title: "Predictive Accuracy",
      value: "91.7%",
      status: "good",
      description: "Infrastructure degradation forecasting"
    }
  ];

  const realtimeAlerts = [
    {
      id: "AI-001",
      type: "Structural Prediction",
      message: "Roof membrane degradation predicted in Section C-12",
      confidence: 87,
      timeframe: "14 days",
      severity: "medium"
    },
    {
      id: "AI-002", 
      type: "Thermal Anomaly",
      message: "HVAC thermal inefficiency detected - North Stand",
      confidence: 94,
      timeframe: "immediate",
      severity: "high"
    },
    {
      id: "AI-003",
      type: "Crowd Flow Prediction",
      message: "Congestion bottleneck predicted at Gate 5 during event",
      confidence: 78,
      timeframe: "2 hours",
      severity: "low"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "text-green-600";
      case "warning": return "text-yellow-600";
      case "critical": return "text-red-600";
      case "excellent": return "text-green-600";
      case "good": return "text-blue-600";
      default: return "text-blue-600";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-700 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
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
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Building2 className="text-primary" size={32} />
              Smart Stadium Operations & Security
            </h1>
          </div>
          <p className="text-muted-foreground mt-2">
            AI-powered digital twin platform with predictive analytics and autonomous drone operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Activity className="w-3 h-3 mr-1" />
            Live Digital Twin
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Zap className="w-3 h-3 mr-1" />
            AI Powered
          </Badge>
        </div>
      </div>

      {/* Enhanced Operational Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        {operationalStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <div className="flex items-baseline gap-2">
                    <p className={`text-2xl font-bold ${getStatusColor(stat.status)}`}>
                      {stat.value}
                    </p>
                    <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </div>
                <stat.icon className={`${getStatusColor(stat.status)}`} size={20} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Advanced AI Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Intelligence & Predictive Analytics
          </CardTitle>
          <CardDescription>
            Real-time performance metrics for AI-powered anomaly detection and predictive maintenance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {advancedMetrics.map((metric, index) => (
              <div key={index} className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border">
                <div className={`text-2xl font-bold ${getStatusColor(metric.status)} mb-1`}>
                  {metric.value}
                </div>
                <div className="text-sm font-medium text-gray-900 mb-1">{metric.title}</div>
                <div className="text-xs text-muted-foreground">{metric.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time AI Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Real-time AI Predictions & Alerts
          </CardTitle>
          <CardDescription>
            Proactive insights from multi-sensor data fusion and predictive analytics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {realtimeAlerts.map((alert) => (
            <div key={alert.id} className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{alert.type}</span>
                    <Badge variant="outline" className="text-xs">
                      {alert.confidence}% confidence
                    </Badge>
                  </div>
                  <p className="text-sm mb-1">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">
                    Predicted timeframe: {alert.timeframe}
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  Investigate
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Main Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="3d-visualization" className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Digital Twin
          </TabsTrigger>
          <TabsTrigger value="mission-planner" className="flex items-center gap-2">
            <Plane className="w-4 h-4" />
            Autonomous Missions
          </TabsTrigger>
          <TabsTrigger value="inspection" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Predictive Inspection
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Intelligent Security
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            Smart Maintenance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="3d-visualization">
          <Stadium3DVisualization />
        </TabsContent>

        <TabsContent value="mission-planner">
          <DroneMissionPlanner />
        </TabsContent>

        <TabsContent value="inspection">
          <InfrastructureInspection />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySurveillance />
        </TabsContent>

        <TabsContent value="maintenance">
          <MaintenanceWorkflow />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmartStadiumOperations;
