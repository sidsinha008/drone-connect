
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Brain, 
  Calendar, 
  Clock, 
  Target, 
  Zap, 
  AlertTriangle,
  Plus,
  Settings,
  TrendingUp,
  PlayCircle
} from "lucide-react";

interface TrainingPlanBuilderProps {
  playerId: string;
}

const TrainingPlanBuilder = ({ playerId }: TrainingPlanBuilderProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [planDuration, setPlanDuration] = useState("4");
  const [focusArea, setFocusArea] = useState("batting");

  const aiSuggestedPlans = [
    {
      id: "plan1",
      name: "Batting Stance Optimization",
      duration: "2 weeks",
      priority: "High",
      description: "Address forward lean issue detected in drone analysis",
      estimatedImprovement: "15-20%",
      workload: "Medium",
      sessions: 8,
      focusAreas: ["Stance", "Balance", "Weight Distribution"]
    },
    {
      id: "plan2", 
      name: "Endurance & Recovery Enhancement",
      duration: "3 weeks",
      priority: "Medium",
      description: "Optimize cardiovascular fitness based on HR patterns",
      estimatedImprovement: "10-15%",
      workload: "High",
      sessions: 12,
      focusAreas: ["Cardio", "Recovery", "Load Management"]
    },
    {
      id: "plan3",
      name: "Reaction Time Improvement",
      duration: "2 weeks", 
      priority: "Medium",
      description: "Enhance close-catch reflexes using cognitive training",
      estimatedImprovement: "8-12%",
      workload: "Low",
      sessions: 6,
      focusAreas: ["Reflexes", "Cognitive", "Hand-eye Coordination"]
    }
  ];

  const weeklySchedule = [
    {
      day: "Monday",
      sessions: [
        { time: "09:00", type: "Technical", drill: "Batting Stance Drills", duration: "45min", intensity: "Medium" },
        { time: "16:00", type: "Fitness", drill: "Core Stability", duration: "30min", intensity: "Low" }
      ]
    },
    {
      day: "Tuesday", 
      sessions: [
        { time: "10:00", type: "Technical", drill: "Weight Distribution Practice", duration: "60min", intensity: "High" },
        { time: "15:00", type: "Recovery", drill: "Stretching & Mobility", duration: "30min", intensity: "Low" }
      ]
    },
    {
      day: "Wednesday",
      sessions: [
        { time: "09:30", type: "Match Simulation", drill: "Pressure Batting", duration: "90min", intensity: "High" }
      ]
    },
    {
      day: "Thursday",
      sessions: [
        { time: "10:00", type: "Technical", drill: "Footwork Refinement", duration: "45min", intensity: "Medium" },
        { time: "16:00", type: "Mental", drill: "Visualization Training", duration: "30min", intensity: "Low" }
      ]
    },
    {
      day: "Friday",
      sessions: [
        { time: "09:00", type: "Assessment", drill: "Technique Analysis", duration: "60min", intensity: "Medium" }
      ]
    },
    {
      day: "Saturday",
      sessions: [
        { time: "Rest Day", type: "Recovery", drill: "Active Recovery", duration: "30min", intensity: "Low" }
      ]
    },
    {
      day: "Sunday",
      sessions: [
        { time: "Rest Day", type: "Recovery", drill: "Complete Rest", duration: "-", intensity: "-" }
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Low": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "High": return "text-red-600";
      case "Medium": return "text-yellow-600";
      case "Low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Technical": return "bg-blue-100 text-blue-700";
      case "Fitness": return "bg-green-100 text-green-700";
      case "Recovery": return "bg-purple-100 text-purple-700";
      case "Mental": return "bg-indigo-100 text-indigo-700";
      case "Match Simulation": return "bg-orange-100 text-orange-700";
      case "Assessment": return "bg-teal-100 text-teal-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="ai-plans" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ai-plans" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            AI Suggestions
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Schedule View
          </TabsTrigger>
          <TabsTrigger value="create-custom" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Custom
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai-plans" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI-Generated Training Plans
              </CardTitle>
              <CardDescription>
                Personalized recommendations based on drone analysis and biometric data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {aiSuggestedPlans.map((plan) => (
                  <Card key={plan.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{plan.name}</h3>
                          <p className="text-sm text-muted-foreground">{plan.description}</p>
                        </div>
                        <Badge className={getPriorityColor(plan.priority)}>
                          {plan.priority} Priority
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Duration</p>
                          <p className="font-medium">{plan.duration}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Sessions</p>
                          <p className="font-medium">{plan.sessions}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Improvement</p>
                          <p className="font-medium text-green-600">{plan.estimatedImprovement}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Workload</p>
                          <p className={`font-medium ${getIntensityColor(plan.workload)}`}>{plan.workload}</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-2">Focus Areas:</p>
                        <div className="flex flex-wrap gap-2">
                          {plan.focusAreas.map((area, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1"
                          onClick={() => setSelectedPlan(plan.id)}
                        >
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Start Plan
                        </Button>
                        <Button variant="outline">
                          <Settings className="w-4 h-4 mr-2" />
                          Customize
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Weekly Training Schedule
              </CardTitle>
              <CardDescription>
                Detailed daily schedule for the current training plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklySchedule.map((day, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{day.day}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {day.sessions.map((session, sessionIndex) => (
                          <div key={sessionIndex} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium">{session.time}</span>
                              </div>
                              <Badge className={getTypeColor(session.type)}>
                                {session.type}
                              </Badge>
                              <span className="font-medium">{session.drill}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <span>{session.duration}</span>
                              <span className={`font-medium ${getIntensityColor(session.intensity)}`}>
                                {session.intensity}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create-custom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create Custom Training Plan
              </CardTitle>
              <CardDescription>
                Build a personalized training plan from scratch
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="plan-name">Plan Name</Label>
                    <Input id="plan-name" placeholder="Enter plan name" />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration (weeks)</Label>
                    <Input 
                      id="duration" 
                      type="number" 
                      value={planDuration}
                      onChange={(e) => setPlanDuration(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="focus">Primary Focus Area</Label>
                    <select 
                      id="focus"
                      value={focusArea}
                      onChange={(e) => setFocusArea(e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md"
                    >
                      <option value="batting">Batting</option>
                      <option value="bowling">Bowling</option>
                      <option value="fielding">Fielding</option>
                      <option value="fitness">Fitness</option>
                      <option value="mental">Mental Training</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label>Training Frequency</Label>
                    <div className="grid grid-cols-7 gap-1 mt-2">
                      {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          {day}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Target Intensity</Label>
                    <div className="flex gap-2 mt-2">
                      {["Low", "Medium", "High"].map((intensity) => (
                        <Button
                          key={intensity}
                          variant="outline"
                          size="sm"
                          className={`${getIntensityColor(intensity)}`}
                        >
                          {intensity}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button className="flex-1">
                  <Brain className="w-4 h-4 mr-2" />
                  Generate with AI
                </Button>
                <Button variant="outline" className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Build Manually
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrainingPlanBuilder;
