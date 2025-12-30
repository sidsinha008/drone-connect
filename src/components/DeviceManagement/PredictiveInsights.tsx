
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  AlertTriangle, 
  TrendingUp, 
  Target, 
  Users, 
  Clock,
  CheckCircle,
  XCircle,
  Zap,
  Battery,
  Wifi
} from "lucide-react";

interface PredictiveInsightsProps {
  insights: any[];
  devices: any[];
}

const PredictiveInsights = ({ insights, devices }: PredictiveInsightsProps) => {
  const [selectedInsight, setSelectedInsight] = useState<number | null>(null);

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case "Critical": return "bg-red-100 text-red-800 border-red-300";
      case "High": return "bg-orange-100 text-orange-800 border-orange-300";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Low": return "bg-blue-100 text-blue-800 border-blue-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getInsightIcon = (type: string) => {
    switch(type) {
      case "Prediction": return TrendingUp;
      case "Anomaly": return AlertTriangle;
      case "Optimization": return Target;
      default: return Brain;
    }
  };

  // Smart grouping suggestions
  const smartGroups = [
    {
      id: 1,
      name: "Battery Risk Group",
      description: "Drones with predicted battery failure in 30 days",
      devices: devices.filter(d => d.predictedIssues.some(i => i.type.includes("Battery"))),
      riskLevel: "High",
      suggestedAction: "Schedule battery replacement maintenance window"
    },
    {
      id: 2,
      name: "Network Instability Cluster",
      description: "Drones in zones with communication issues",
      devices: devices.filter(d => d.status === "Connection Issues"),
      riskLevel: "Medium",
      suggestedAction: "Deploy network infrastructure team to affected zones"
    },
    {
      id: 3,
      name: "Firmware Update Candidates",
      description: "Drones eligible for performance firmware update",
      devices: devices.filter(d => d.firmwareVersion.includes("v2.3") || d.firmwareVersion.includes("v1.9")),
      riskLevel: "Low",
      suggestedAction: "Schedule OTA update during next maintenance window"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="text-primary" size={24} />
            AI-Powered Predictive Insights
          </CardTitle>
          <CardDescription>
            Proactive fleet management with machine learning predictions
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="predictions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="predictions">Active Predictions</TabsTrigger>
          <TabsTrigger value="anomalies">Anomaly Detection</TabsTrigger>
          <TabsTrigger value="groups">Smart Grouping</TabsTrigger>
          <TabsTrigger value="trends">Performance Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-4">
          <div className="grid gap-4">
            {insights.map((insight) => {
              const Icon = getInsightIcon(insight.type);
              return (
                <Card 
                  key={insight.id} 
                  className={`cursor-pointer transition-all ${
                    selectedInsight === insight.id ? 'ring-2 ring-primary' : ''
                  } ${insight.severity === 'Critical' ? 'border-red-300 bg-red-50/50' : ''}`}
                  onClick={() => setSelectedInsight(selectedInsight === insight.id ? null : insight.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="text-primary" size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{insight.title}</h3>
                            <Badge variant="outline" className={getSeverityColor(insight.severity)}>
                              {insight.severity}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm mb-2">
                            {insight.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Target size={12} />
                              Confidence: {insight.confidence}%
                            </span>
                            <span className="flex items-center gap-1">
                              <Users size={12} />
                              {insight.affectedDrones.length} drones affected
                            </span>
                          </div>
                        </div>
                      </div>
                      <Progress value={insight.confidence} className="w-20 h-2" />
                    </div>

                    {selectedInsight === insight.id && (
                      <div className="mt-4 pt-4 border-t space-y-3">
                        <div>
                          <h4 className="font-medium mb-2">Affected Drones:</h4>
                          <div className="flex flex-wrap gap-1">
                            {insight.affectedDrones.map((droneId: string) => (
                              <Badge key={droneId} variant="secondary" className="text-xs">
                                {droneId}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Suggested Actions:</h4>
                          <div className="space-y-1">
                            {insight.suggestedActions.map((action: string, index: number) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <CheckCircle size={14} className="text-green-500" />
                                {action}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button size="sm" className="flex items-center gap-1">
                            <Zap size={14} />
                            Execute Actions
                          </Button>
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <Clock size={14} />
                            Schedule Later
                          </Button>
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <XCircle size={14} />
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="anomalies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="text-yellow-500" size={20} />
                Real-Time Anomaly Detection
              </CardTitle>
              <CardDescription>
                AI-detected deviations from normal operational patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {devices.filter(d => d.predictedIssues.length > 0).map(device => (
                  <div key={device.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        device.predictedIssues.some(i => i.severity === "Critical") ? "bg-red-500" :
                        device.predictedIssues.some(i => i.severity === "High") ? "bg-orange-500" :
                        "bg-yellow-500"
                      }`}></div>
                      <div>
                        <div className="font-medium">{device.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {device.predictedIssues[0]?.type} - ETA: {device.predictedIssues[0]?.eta}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {device.predictedIssues[0]?.confidence}% confidence
                      </Badge>
                      <Button size="sm" variant="outline">Investigate</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="groups" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="text-blue-500" size={20} />
                AI-Generated Smart Groups
              </CardTitle>
              <CardDescription>
                Automatically grouped drones based on common issues and patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {smartGroups.map(group => (
                  <Card key={group.id} className="border-2 border-dashed">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{group.name}</h3>
                            <Badge variant="outline" className={getSeverityColor(group.riskLevel)}>
                              {group.riskLevel} Risk
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {group.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                            <span>{group.devices.length} drones in group</span>
                            <span>Suggested: {group.suggestedAction}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {group.devices.slice(0, 5).map(device => (
                              <Badge key={device.id} variant="secondary" className="text-xs">
                                {device.name}
                              </Badge>
                            ))}
                            {group.devices.length > 5 && (
                              <Badge variant="secondary" className="text-xs">
                                +{group.devices.length - 5} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button size="sm" className="flex items-center gap-1">
                            <Zap size={14} />
                            Create Group
                          </Button>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="text-green-500" size={20} />
                Performance Trend Analysis
              </CardTitle>
              <CardDescription>
                Long-term performance patterns and predictions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <TrendingUp size={48} className="mx-auto mb-4 opacity-50" />
                <p>Advanced trend analysis coming soon...</p>
                <p className="text-sm">Including battery degradation curves, performance optimization opportunities, and predictive maintenance scheduling.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PredictiveInsights;
