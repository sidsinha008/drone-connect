
import React, { useState } from "react";
import { AlertTriangle, Brain, TrendingUp, Target, Clock, Users, BarChart3, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const AIInsights = () => {
  const [selectedInsightType, setSelectedInsightType] = useState("all");

  const insights = [
    {
      id: 1,
      type: "Performance",
      title: "Batting Stance Improvement",
      message: "Player Johnson's batting stance has improved 15% over last week",
      confidence: 92,
      priority: "medium",
      timestamp: "2 hours ago",
      actionable: true
    },
    {
      id: 2,
      type: "Injury Risk",
      title: "Fatigue Pattern Detection",
      message: "Bowler Smith showing fatigue patterns - recommend rest",
      confidence: 87,
      priority: "high",
      timestamp: "30 minutes ago",
      actionable: true
    },
    {
      id: 3,
      type: "Tactical",
      title: "Field Formation Optimization",
      message: "Field positioning efficiency increased by 8% with new formation",
      confidence: 94,
      priority: "low",
      timestamp: "1 hour ago",
      actionable: false
    },
    {
      id: 4,
      type: "Technique",
      title: "Footwork Analysis",
      message: "3 players showing consistent footwork improvements",
      confidence: 89,
      priority: "medium",
      timestamp: "45 minutes ago",
      actionable: true
    }
  ];

  const filteredInsights = selectedInsightType === "all" 
    ? insights 
    : insights.filter(insight => insight.type.toLowerCase() === selectedInsightType);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/15 text-red-700 border-red-300";
      case "medium": return "bg-yellow-500/15 text-yellow-700 border-yellow-300";
      case "low": return "bg-green-500/15 text-green-700 border-green-300";
      default: return "bg-gray-500/15 text-gray-700 border-gray-300";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Performance": return <TrendingUp className="w-4 h-4" />;
      case "Injury Risk": return <AlertTriangle className="w-4 h-4" />;
      case "Tactical": return <Target className="w-4 h-4" />;
      case "Technique": return <Users className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">AI Insights & Recommendations</h2>
          <p className="text-muted-foreground">Machine learning-powered analysis and predictions</p>
        </div>
        <div className="flex items-center gap-2">
          <select 
            value={selectedInsightType} 
            onChange={(e) => setSelectedInsightType(e.target.value)}
            className="flex h-10 w-[180px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="all">All Insights</option>
            <option value="performance">Performance</option>
            <option value="injury risk">Injury Risk</option>
            <option value="tactical">Tactical</option>
            <option value="technique">Technique</option>
          </select>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <ScrollArea className="h-[600px]">
          <div className="space-y-4">
            {filteredInsights.map((insight) => (
              <Card key={insight.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(insight.type)}
                      <div>
                        <h3 className="font-semibold">{insight.title}</h3>
                        <Badge variant="outline" className="text-xs mt-1">
                          {insight.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getPriorityColor(insight.priority)}>
                        {insight.priority} priority
                      </Badge>
                      <span className="text-sm text-muted-foreground">{insight.timestamp}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm mb-4">{insight.message}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Confidence:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-secondary rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-blue-500"
                            style={{ width: `${insight.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium">{insight.confidence}%</span>
                      </div>
                    </div>
                    
                    {insight.actionable && (
                      <Button size="sm">
                        View Details
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default AIInsights;
