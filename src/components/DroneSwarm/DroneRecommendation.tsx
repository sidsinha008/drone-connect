
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Zap,
  Battery,
  Radio,
  Eye,
  DollarSign,
  Plane,
  Target
} from "lucide-react";

const DroneRecommendation = () => {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  const droneVariants = [
    {
      id: "skyguard-x1",
      name: "SkyGuard X1",
      type: "Quadcopter",
      recommended: true,
      compatibilityScore: 94,
      specs: {
        payload: 2.5,
        battery: 45,
        range: 150,
        agility: 85,
        cost: 2800
      },
      strengths: ["Excellent maneuverability", "Long battery life", "Robust communication"],
      weaknesses: ["Higher cost", "Limited payload"],
      suitability: {
        "Complex Patterns": 90,
        "Long Duration": 95,
        "Communication": 88,
        "Cost Efficiency": 65
      }
    },
    {
      id: "skyguard-pro",
      name: "SkyGuard Pro",
      type: "Hexacopter",
      recommended: false,
      compatibilityScore: 78,
      specs: {
        payload: 5.0,
        battery: 35,
        range: 200,
        agility: 70,
        cost: 4200
      },
      strengths: ["High payload capacity", "Extended range", "Redundant rotors"],
      weaknesses: ["Lower agility", "Shorter battery life", "Expensive"],
      suitability: {
        "Complex Patterns": 65,
        "Long Duration": 70,
        "Communication": 92,
        "Cost Efficiency": 45
      }
    },
    {
      id: "skyguard-lite",
      name: "SkyGuard Lite",
      type: "Quadcopter",
      recommended: false,
      compatibilityScore: 82,
      specs: {
        payload: 1.0,
        battery: 30,
        range: 100,
        agility: 90,
        cost: 1500
      },
      strengths: ["Very agile", "Cost effective", "Lightweight"],
      weaknesses: ["Limited payload", "Shorter range", "Basic sensors"],
      suitability: {
        "Complex Patterns": 95,
        "Long Duration": 60,
        "Communication": 75,
        "Cost Efficiency": 90
      }
    }
  ];

  const analysisResults = {
    missionRequirements: {
      patternComplexity: "High",
      duration: "Medium (15 min)",
      communicationDemand: "High",
      payloadRequirement: "Light sensors only",
      budget: "$150,000"
    },
    recommendations: {
      primary: "skyguard-x1",
      alternative: "skyguard-lite",
      avoid: "skyguard-pro"
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-500";
    if (score >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  const getRecommendationIcon = (recommended: boolean, score: number) => {
    if (recommended && score >= 85) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (score >= 70) return <Info className="w-5 h-5 text-blue-500" />;
    return <AlertTriangle className="w-5 h-5 text-red-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Intelligent Drone Recommendation</h2>
        <Button variant="outline" className="flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Analyze Requirements
        </Button>
      </div>

      <Tabs defaultValue="analysis" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analysis">Requirement Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">Drone Variants</TabsTrigger>
          <TabsTrigger value="comparison">Detailed Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Mission Analysis
              </CardTitle>
              <CardDescription>
                Based on your simulation configuration and mission parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Pattern Complexity</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-orange-50">
                      {analysisResults.missionRequirements.patternComplexity}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Requires high agility drones
                    </span>
                  </div>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2">Mission Duration</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-50">
                      {analysisResults.missionRequirements.duration}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Standard battery sufficient
                    </span>
                  </div>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2">Communication</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-red-50">
                      {analysisResults.missionRequirements.communicationDemand}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Strong mesh networking needed
                    </span>
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Payload Requirements</h4>
                  <p className="text-sm text-muted-foreground">
                    {analysisResults.missionRequirements.payloadRequirement}
                  </p>
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">All variants suitable</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2">Budget Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Budget: {analysisResults.missionRequirements.budget}
                  </p>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">53 x SkyGuard X1 possible</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">100 x SkyGuard Lite possible</span>
                    </div>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {droneVariants.map((variant) => (
              <Card 
                key={variant.id}
                className={`cursor-pointer transition-all ${
                  selectedVariant === variant.id ? 'ring-2 ring-primary' : 'hover:shadow-lg'
                } ${variant.recommended ? 'border-green-500' : ''}`}
                onClick={() => setSelectedVariant(variant.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{variant.name}</CardTitle>
                    {getRecommendationIcon(variant.recommended, variant.compatibilityScore)}
                  </div>
                  <CardDescription>{variant.type}</CardDescription>
                  {variant.recommended && (
                    <Badge className="bg-green-500 text-white w-fit">
                      Recommended
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Compatibility Score</span>
                      <span className={`font-medium ${getScoreColor(variant.compatibilityScore)}`}>
                        {variant.compatibilityScore}%
                      </span>
                    </div>
                    <Progress value={variant.compatibilityScore} />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Battery className="w-3 h-3" />
                      <span>{variant.specs.battery}min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Radio className="w-3 h-3" />
                      <span>{variant.specs.range}m</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Plane className="w-3 h-3" />
                      <span>{variant.specs.payload}kg</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      <span>${variant.specs.cost.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Key Strengths</h5>
                    <ul className="text-xs space-y-1">
                      {variant.strengths.slice(0, 2).map((strength, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          {selectedVariant ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {droneVariants.find(v => v.id === selectedVariant)?.name} Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(() => {
                    const variant = droneVariants.find(v => v.id === selectedVariant);
                    if (!variant) return null;
                    
                    return (
                      <>
                        <div className="space-y-3">
                          {Object.entries(variant.suitability).map(([category, score]) => (
                            <div key={category}>
                              <div className="flex justify-between text-sm mb-1">
                                <span>{category}</span>
                                <span className={getScoreColor(score)}>{score}%</span>
                              </div>
                              <Progress value={score} />
                            </div>
                          ))}
                        </div>

                        <div className="space-y-3">
                          <div>
                            <h5 className="font-medium text-sm mb-2">Strengths</h5>
                            <ul className="space-y-1">
                              {variant.strengths.map((strength, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm">
                                  <CheckCircle className="w-3 h-3 text-green-500" />
                                  {strength}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-medium text-sm mb-2">Considerations</h5>
                            <ul className="space-y-1">
                              {variant.weaknesses.map((weakness, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm">
                                  <AlertTriangle className="w-3 h-3 text-yellow-500" />
                                  {weakness}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Deployment Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-300 mb-2">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium">Optimal Configuration</span>
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      Deploy 50 SkyGuard X1 units for optimal performance in your complex pattern mission.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-medium">Performance Predictions</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Pattern Formation Accuracy</span>
                        <span className="text-green-500">94%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mission Success Rate</span>
                        <span className="text-green-500">97%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Communication Reliability</span>
                        <span className="text-green-500">91%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Cost</span>
                        <span className="text-blue-500">$140,000</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">
                    Apply Recommendation to Simulation
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Eye className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Select a drone variant from the Recommendations tab to view detailed comparison
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DroneRecommendation;
