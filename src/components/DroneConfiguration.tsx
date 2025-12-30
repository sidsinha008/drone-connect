
import { useState } from "react";
import { ArrowLeft, Settings, Wifi, Battery, MapPin, Shield, Camera, Zap, Download, Save, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DroneSelection } from "./DroneConfiguration/DroneSelection";
import { GeneralSettings } from "./DroneConfiguration/GeneralSettings";
import { FlightSettings } from "./DroneConfiguration/FlightSettings";
import { PayloadConfiguration } from "./DroneConfiguration/PayloadConfiguration";
import { TelemetrySettings } from "./DroneConfiguration/TelemetrySettings";
import { FirmwareUpdates } from "./DroneConfiguration/FirmwareUpdates";
import { MissionSimulation } from "./DroneConfiguration/MissionSimulation";

interface DroneConfigurationProps {
  onBack: () => void;
}

const DroneConfiguration = ({ onBack }: DroneConfigurationProps) => {
  const [selectedDrone, setSelectedDrone] = useState<string | null>("drone-001");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleSaveConfiguration = () => {
    // Simulate saving configuration
    console.log("Saving drone configuration...");
    setHasUnsavedChanges(false);
  };

  const selectedDroneData = selectedDrone ? {
    id: "drone-001",
    name: "Xrili Swift Alpha",
    model: "XR-Swift-Pro",
    batteryLevel: 85,
    status: "Ready",
    connectionStatus: "Connected",
    lastSeen: "2 minutes ago",
    firmwareVersion: "v2.1.4"
  } : null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Drone Configuration & Simulation</h1>
            <p className="text-muted-foreground">
              Configure your drone fleet and simulate mission scenarios
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {hasUnsavedChanges && (
            <Badge variant="outline" className="text-orange-600">
              Unsaved Changes
            </Badge>
          )}
          <Button onClick={handleSaveConfiguration} disabled={!hasUnsavedChanges}>
            <Save className="h-4 w-4 mr-2" />
            Save Configuration
          </Button>
        </div>
      </div>

      {/* Drone Selection */}
      <DroneSelection 
        selectedDrone={selectedDrone}
        onDroneSelect={setSelectedDrone}
      />

      {/* Configuration Interface */}
      {selectedDroneData && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Drone Overview Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  {selectedDroneData.name}
                </CardTitle>
                <CardDescription>
                  {selectedDroneData.model} • ID: {selectedDroneData.id}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="default" className="bg-green-500">
                    <Wifi className="h-3 w-3 mr-1" />
                    {selectedDroneData.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Battery</span>
                  <div className="flex items-center gap-1">
                    <Battery className="h-4 w-4" />
                    <span className="text-sm font-medium">{selectedDroneData.batteryLevel}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Connection</span>
                  <Badge variant="outline" className="text-green-600">
                    {selectedDroneData.connectionStatus}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Seen</span>
                  <span className="text-sm">{selectedDroneData.lastSeen}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Firmware</span>
                  <span className="text-sm font-mono">{selectedDroneData.firmwareVersion}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Configuration Tabs */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="general" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  General
                </TabsTrigger>
                <TabsTrigger value="flight" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Flight
                </TabsTrigger>
                <TabsTrigger value="payload" className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Payload
                </TabsTrigger>
                <TabsTrigger value="telemetry" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Telemetry
                </TabsTrigger>
                <TabsTrigger value="firmware" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Firmware
                </TabsTrigger>
                <TabsTrigger value="simulation" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Simulation
                </TabsTrigger>
                <TabsTrigger value="advanced" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Advanced
                </TabsTrigger>
              </TabsList>

              <TabsContent value="general">
                <GeneralSettings 
                  droneData={selectedDroneData}
                  onSettingsChange={() => setHasUnsavedChanges(true)}
                />
              </TabsContent>

              <TabsContent value="flight">
                <FlightSettings 
                  droneData={selectedDroneData}
                  onSettingsChange={() => setHasUnsavedChanges(true)}
                />
              </TabsContent>

              <TabsContent value="payload">
                <PayloadConfiguration 
                  droneData={selectedDroneData}
                  onSettingsChange={() => setHasUnsavedChanges(true)}
                />
              </TabsContent>

              <TabsContent value="telemetry">
                <TelemetrySettings 
                  droneData={selectedDroneData}
                  onSettingsChange={() => setHasUnsavedChanges(true)}
                />
              </TabsContent>

              <TabsContent value="firmware">
                <FirmwareUpdates 
                  droneData={selectedDroneData}
                  onSettingsChange={() => setHasUnsavedChanges(true)}
                />
              </TabsContent>

              <TabsContent value="simulation">
                <MissionSimulation 
                  droneData={selectedDroneData}
                  onSettingsChange={() => setHasUnsavedChanges(true)}
                />
              </TabsContent>

              <TabsContent value="advanced">
                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Settings</CardTitle>
                    <CardDescription>
                      Expert-level configuration options for experienced users
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Advanced settings panel coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default DroneConfiguration;
