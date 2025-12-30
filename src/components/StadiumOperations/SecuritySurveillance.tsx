
import React, { useState } from "react";
import { Shield, AlertTriangle, Eye, Radio, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SecuritySurveillance = () => {
  const securityAlerts = [
    {
      id: "SEC-001",
      type: "Unauthorized Access",
      location: "North Gate - Restricted Area",
      timestamp: "14:23:45",
      severity: "High",
      status: "Active"
    },
    {
      id: "SEC-002",
      type: "Suspicious Package",
      location: "Concourse Level 2 - Section B",
      timestamp: "13:45:22", 
      severity: "Critical",
      status: "Investigating"
    },
    {
      id: "SEC-003",
      type: "Crowd Density Alert",
      location: "Main Entrance",
      timestamp: "13:30:15",
      severity: "Medium",
      status: "Resolved"
    }
  ];

  const dronePatrols = [
    {
      id: "PATROL-001",
      name: "Perimeter Security",
      status: "Active",
      coverage: "External Perimeter",
      battery: 78,
      lastUpdate: "14:25"
    },
    {
      id: "PATROL-002", 
      name: "Crowd Monitoring",
      status: "Standby",
      coverage: "Concourse Areas",
      battery: 95,
      lastUpdate: "14:20"
    },
    {
      id: "PATROL-003",
      name: "Emergency Response",
      status: "Deployed",
      coverage: "Incident Zone",
      battery: 65,
      lastUpdate: "14:26"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-red-100 text-red-700";
      case "High": return "bg-orange-100 text-orange-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      default: return "bg-blue-100 text-blue-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "text-red-600";
      case "Investigating": return "text-orange-600";
      case "Resolved": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Security Alerts */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Active Security Alerts
              </CardTitle>
              <CardDescription>
                Real-time security incidents detected by AI surveillance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {securityAlerts.map((alert) => (
                <div key={alert.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{alert.type}</h4>
                      <p className="text-muted-foreground">{alert.location}</p>
                      <p className="text-sm text-muted-foreground">
                        Alert Time: {alert.timestamp}
                      </p>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                      <p className={`text-sm font-medium ${getStatusColor(alert.status)}`}>
                        {alert.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">
                      <Eye className="w-3 h-3 mr-1" />
                      View Feed
                    </Button>
                    <Button size="sm" variant="outline">
                      <Radio className="w-3 h-3 mr-1" />
                      Dispatch
                    </Button>
                    <Button size="sm" variant="outline">
                      Mark Resolved
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Emergency Response Planning */}
          <Card>
            <CardHeader>
              <CardTitle>Emergency Response Coordination</CardTitle>
              <CardDescription>
                Real-time incident mapping and response planning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border-2 border-dashed border-red-200 h-48 flex items-center justify-center">
                <div className="text-center">
                  <Shield className="w-12 h-12 text-red-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-red-700">Emergency Response Map</h3>
                  <p className="text-sm text-red-600">
                    Real-time incident locations and evacuation routes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Status Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">2</div>
                  <div className="text-sm text-red-700">Active Alerts</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">8</div>
                  <div className="text-sm text-green-700">Resolved Today</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">24</div>
                  <div className="text-sm text-blue-700">Personnel</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">3</div>
                  <div className="text-sm text-yellow-700">Active Patrols</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Drone Patrols</CardTitle>
              <CardDescription>
                Current security patrol status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {dronePatrols.map((patrol) => (
                <div key={patrol.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{patrol.name}</h4>
                      <p className="text-sm text-muted-foreground">{patrol.coverage}</p>
                    </div>
                    <Badge variant={patrol.status === "Active" ? "default" : "secondary"}>
                      {patrol.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Battery:</span>
                      <span className={patrol.battery > 50 ? "text-green-600" : "text-yellow-600"}>
                        {patrol.battery}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Update:</span>
                      <span>{patrol.lastUpdate}</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-2">
                    View Live Feed
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Emergency Lockdown
              </Button>
              <Button className="w-full" variant="outline">
                <Radio className="w-4 h-4 mr-2" />
                All-Call Security
              </Button>
              <Button className="w-full" variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                View All Cameras
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SecuritySurveillance;
