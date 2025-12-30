
import React, { useState } from "react";
import { Eye, AlertTriangle, CheckCircle, Camera, Thermometer } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InfrastructureInspection = () => {
  const [selectedAnomalyType, setSelectedAnomalyType] = useState("all");

  const detectedAnomalies = [
    {
      id: "AN-001",
      type: "Structural",
      severity: "Critical",
      location: "North Stand - Section 12",
      description: "Concrete crack detected in support beam",
      timestamp: "2024-01-15 14:23",
      image: "/placeholder.svg",
      aiConfidence: 94
    },
    {
      id: "AN-002", 
      type: "Electrical",
      severity: "Major",
      location: "Floodlight Tower 3",
      description: "Loose electrical connection identified",
      timestamp: "2024-01-15 13:45",
      image: "/placeholder.svg",
      aiConfidence: 87
    },
    {
      id: "AN-003",
      type: "Safety",
      severity: "Minor",
      location: "Emergency Exit 7",
      description: "Exit sign partially obscured",
      timestamp: "2024-01-15 12:10",
      image: "/placeholder.svg",
      aiConfidence: 78
    }
  ];

  const inspectionHistory = [
    { date: "2024-01-15", issues: 12, resolved: 8, pending: 4 },
    { date: "2024-01-14", issues: 8, resolved: 8, pending: 0 },
    { date: "2024-01-13", issues: 15, resolved: 12, pending: 3 }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-red-100 text-red-700";
      case "Major": return "bg-yellow-100 text-yellow-700";
      case "Minor": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* AI Detection Results */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                AI-Powered Anomaly Detection
              </CardTitle>
              <CardDescription>
                Automatically identified issues from latest drone inspection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active">
                <TabsList className="mb-4">
                  <TabsTrigger value="active">Active Issues</TabsTrigger>
                  <TabsTrigger value="thermal">Thermal Analysis</TabsTrigger>
                  <TabsTrigger value="historical">Historical Data</TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="space-y-4">
                  {detectedAnomalies.map((anomaly) => (
                    <div key={anomaly.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-3">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Camera className="w-6 h-6 text-gray-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{anomaly.description}</h4>
                            <p className="text-sm text-muted-foreground">{anomaly.location}</p>
                            <p className="text-xs text-muted-foreground">{anomaly.timestamp}</p>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <Badge className={getSeverityColor(anomaly.severity)}>
                            {anomaly.severity}
                          </Badge>
                          <p className="text-xs text-muted-foreground">
                            AI Confidence: {anomaly.aiConfidence}%
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button size="sm" variant="outline">Assign Task</Button>
                        <Button size="sm">Mark Resolved</Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="thermal">
                  <div className="text-center py-8">
                    <Thermometer className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Thermal Analysis</h3>
                    <p className="text-muted-foreground">
                      Advanced thermal imaging analysis for electrical and mechanical systems
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="historical">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Inspection History</h4>
                    {inspectionHistory.map((entry, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded">
                        <span className="font-medium">{entry.date}</span>
                        <div className="flex gap-4 text-sm">
                          <span className="text-red-600">{entry.issues} Issues</span>
                          <span className="text-green-600">{entry.resolved} Resolved</span>
                          <span className="text-yellow-600">{entry.pending} Pending</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Inspection Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Inspection Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">2</div>
                  <div className="text-sm text-red-700">Critical</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">5</div>
                  <div className="text-sm text-yellow-700">Major</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">5</div>
                  <div className="text-sm text-blue-700">Minor</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">15</div>
                  <div className="text-sm text-green-700">Resolved</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                AI Analysis Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Image Processing</span>
                  <span className="text-sm text-green-600">Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Anomaly Detection</span>
                  <span className="text-sm text-blue-600">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-4/5"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Report Generation</span>
                  <span className="text-sm text-yellow-600">Pending</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full w-1/3"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InfrastructureInspection;
