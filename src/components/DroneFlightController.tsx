
import { useState } from "react";
import { ArrowLeft, Gamepad2, Play, Square, Camera, Video, MapPin, Settings, Battery, Wifi, AlertTriangle, Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import LiveVideoStream from "./DroneFlightController/LiveVideoStream";
import FlightControls from "./DroneFlightController/FlightControls";
import TelemetryDashboard from "./DroneFlightController/TelemetryDashboard";
import MissionPlanning from "./DroneFlightController/MissionPlanning";
import CameraGimbalControl from "./DroneFlightController/CameraGimbalControl";
import FlightSettings from "./DroneFlightController/FlightSettings";

interface DroneFlightControllerProps {
  onBack: () => void;
}

const DroneFlightController = ({ onBack }: DroneFlightControllerProps) => {
  const [activeTab, setActiveTab] = useState("flight");
  const [droneArmed, setDroneArmed] = useState(false);
  const [flightMode, setFlightMode] = useState("GPS");
  const [isRecording, setIsRecording] = useState(false);

  // Mock telemetry data
  const telemetryData = {
    altitude: 45.2,
    speed: 12.5,
    battery: 87,
    gpsSignal: 16,
    distance: 234.8,
    flightTime: "05:23",
    signalStrength: 95,
    temperature: 24
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onBack}
              className="hover:bg-slate-700 text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-700 text-white rounded-lg">
                <Gamepad2 className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">SkyPilot Flight Controller</h1>
                <p className="text-slate-300">Professional Drone Operations Platform</p>
              </div>
            </div>
          </div>

          {/* Quick Status Indicators */}
          <div className="flex items-center gap-4">
            <Badge variant={droneArmed ? "destructive" : "secondary"} className="text-xs">
              {droneArmed ? "ARMED" : "DISARMED"}
            </Badge>
            <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
              Mode: {flightMode}
            </Badge>
            <div className="flex items-center gap-2 text-sm">
              <Battery className="h-4 w-4 text-green-400" />
              <span>{telemetryData.battery}%</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Wifi className="h-4 w-4 text-blue-400" />
              <span>{telemetryData.signalStrength}%</span>
            </div>
          </div>
        </div>

        {/* Main Interface */}
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-140px)]">
          {/* Left Panel - Controls & Telemetry */}
          <div className="col-span-3 space-y-4 overflow-y-auto">
            <TelemetryDashboard data={telemetryData} />
            <FlightControls 
              droneArmed={droneArmed}
              setDroneArmed={setDroneArmed}
              flightMode={flightMode}
              setFlightMode={setFlightMode}
            />
          </div>

          {/* Center Panel - Live Video Stream */}
          <div className="col-span-6">
            <LiveVideoStream 
              isRecording={isRecording}
              setIsRecording={setIsRecording}
            />
          </div>

          {/* Right Panel - Secondary Controls */}
          <div className="col-span-3 space-y-4 overflow-y-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-800">
                <TabsTrigger value="camera" className="text-xs">Camera</TabsTrigger>
                <TabsTrigger value="mission" className="text-xs">Mission</TabsTrigger>
                <TabsTrigger value="settings" className="text-xs">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="camera" className="mt-4">
                <CameraGimbalControl />
              </TabsContent>

              <TabsContent value="mission" className="mt-4">
                <MissionPlanning />
              </TabsContent>

              <TabsContent value="settings" className="mt-4">
                <FlightSettings />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Emergency Controls Bar */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-800 border border-slate-600 rounded-lg p-3 flex items-center gap-4">
          <Button variant="destructive" size="sm" className="font-bold">
            <AlertTriangle className="h-4 w-4 mr-2" />
            EMERGENCY STOP
          </Button>
          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Home className="h-4 w-4 mr-2" />
            Return Home
          </Button>
          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <RotateCcw className="h-4 w-4 mr-2" />
            Auto Land
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DroneFlightController;
