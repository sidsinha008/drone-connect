
import React, { useState } from "react";
import { Layers, Maximize2, RotateCcw, Ruler, MapPin, Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const Stadium3DVisualization = () => {
  const [activeLayers, setActiveLayers] = useState({
    blueprints: true,
    utilities: false,
    security: true,
    exits: true,
    seating: false,
    crowdDensity: false
  });

  const [viewMode, setViewMode] = useState("overview");

  const layers = [
    { id: "blueprints", name: "Architectural Blueprints", description: "Building structure and layout" },
    { id: "utilities", name: "Utility Lines", description: "Water, electrical, HVAC systems" },
    { id: "security", name: "Security Cameras", description: "Camera locations and coverage" },
    { id: "exits", name: "Emergency Exits", description: "Exit routes and assembly points" },
    { id: "seating", name: "Seating Plans", description: "Seating sections and capacity" },
    { id: "crowdDensity", name: "Crowd Density", description: "Real-time occupancy data" }
  ];

  const toggleLayer = (layerId: string) => {
    setActiveLayers(prev => ({
      ...prev,
      [layerId]: !prev[layerId]
    }));
  };

  const annotations = [
    { id: 1, type: "measurement", location: "North Stand", value: "85.5m", status: "info" },
    { id: 2, type: "issue", location: "Section A12", value: "Lighting Issue", status: "warning" },
    { id: 3, type: "security", location: "Gate 5", value: "Security Alert", status: "critical" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-4">
        {/* 3D Visualization Area */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Maximize2 className="w-5 h-5" />
                  3D Stadium Model - Digital Twin
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Ruler className="w-4 h-4 mr-2" />
                    Measure
                  </Button>
                </div>
              </div>
              <CardDescription>
                Interactive 3D visualization with real-time data overlays
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* 3D Visualization Placeholder */}
              <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-gray-300 h-96 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Maximize2 className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">3D Stadium Visualization</h3>
                    <p className="text-sm text-gray-500 max-w-md">
                      High-fidelity 3D model with drone-captured photogrammetry and LiDAR data
                    </p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button 
                      variant={viewMode === "overview" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("overview")}
                    >
                      Overview
                    </Button>
                    <Button 
                      variant={viewMode === "walkthrough" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("walkthrough")}
                    >
                      Walk-Through
                    </Button>
                    <Button 
                      variant={viewMode === "flythrough" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("flythrough")}
                    >
                      Fly-Through
                    </Button>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Use mouse to pan, zoom, and rotate • Press H for help
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Layer Controls & Annotations */}
        <div className="space-y-6">
          {/* Layer Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5" />
                Data Layers
              </CardTitle>
              <CardDescription>
                Toggle visibility of different data overlays
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {layers.map((layer) => (
                <div key={layer.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor={layer.id} className="text-sm font-medium">
                      {layer.name}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {layer.description}
                    </p>
                  </div>
                  <Switch
                    id={layer.id}
                    checked={activeLayers[layer.id]}
                    onCheckedChange={() => toggleLayer(layer.id)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Active Annotations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Active Annotations
              </CardTitle>
              <CardDescription>
                Current measurements and markers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {annotations.map((annotation) => (
                <div key={annotation.id} className="p-3 rounded-lg border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{annotation.location}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      annotation.status === "critical" 
                        ? "bg-red-100 text-red-700"
                        : annotation.status === "warning"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {annotation.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{annotation.value}</p>
                  <Button variant="outline" size="sm" className="mt-2 w-full">
                    View Details
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Stadium3DVisualization;
