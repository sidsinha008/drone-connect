
import React, { useState } from "react";
import { AlertTriangle, Phone, Radio, Shield, Clock, Users, MapPin, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const EmergencyCommandCenter = () => {
  const [emergencyStatus, setEmergencyStatus] = useState("standby");

  const emergencyProtocols = [
    {
      id: "medical",
      title: "Medical Emergency",
      description: "Life-threatening situation requiring immediate response",
      icon: Heart,
      color: "bg-red-600 hover:bg-red-700"
    },
    {
      id: "security",
      title: "Security Alert",
      description: "Security breach or suspicious activity",
      icon: Shield,
      color: "bg-orange-600 hover:bg-orange-700"
    },
    {
      id: "evacuation",
      title: "Evacuation Protocol",
      description: "Emergency evacuation procedures",
      icon: Users,
      color: "bg-purple-600 hover:bg-purple-700"
    }
  ];

  const activeIncidents = [
    {
      id: "INC001",
      type: "Medical",
      location: "Section 105",
      status: "Active",
      priority: "Critical",
      time: "2 min ago",
      assignedDrones: 2
    },
    {
      id: "INC002", 
      type: "Security",
      location: "Gate 7",
      status: "Resolved",
      priority: "High",
      time: "15 min ago",
      assignedDrones: 1
    }
  ];

  const handleEmergencyActivation = (protocolId: string) => {
    setEmergencyStatus("active");
    toast.error("Emergency Protocol Activated", {
      description: `${protocolId} protocol initiated. All available resources mobilized.`,
      duration: 5000,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-red-200 bg-gradient-to-r from-red-50 to-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="w-5 h-5" />
            Emergency Command Center
          </CardTitle>
          <CardDescription>
            Centralized emergency response coordination and protocol activation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {emergencyProtocols.map((protocol) => (
              <Button
                key={protocol.id}
                onClick={() => handleEmergencyActivation(protocol.id)}
                className={`${protocol.color} text-white p-6 h-auto flex-col gap-2`}
              >
                <protocol.icon className="w-8 h-8" />
                <div className="text-center">
                  <p className="font-semibold">{protocol.title}</p>
                  <p className="text-xs opacity-90">{protocol.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Active Incidents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeIncidents.map((incident) => (
              <div key={incident.id} className="p-3 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={incident.status === "Active" ? "destructive" : "secondary"}>
                    {incident.type}
                  </Badge>
                  <span className="text-sm text-gray-600">{incident.time}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="font-medium">Location: {incident.location}</p>
                    <p>Priority: {incident.priority}</p>
                  </div>
                  <div>
                    <p>Status: {incident.status}</p>
                    <p>Drones: {incident.assignedDrones}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Radio className="w-5 h-5" />
              Communication Center
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Button variant="outline" className="justify-start">
                <Phone className="w-4 h-4 mr-2" />
                Contact Emergency Services
              </Button>
              <Button variant="outline" className="justify-start">
                <Radio className="w-4 h-4 mr-2" />
                Security Team Channel
              </Button>
              <Button variant="outline" className="justify-start">
                <Heart className="w-4 h-4 mr-2" />
                Medical Team Direct Line
              </Button>
              <Button variant="outline" className="justify-start">
                <MapPin className="w-4 h-4 mr-2" />
                Incident Command Post
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmergencyCommandCenter;
