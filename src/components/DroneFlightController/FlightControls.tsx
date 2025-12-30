
import { useState } from "react";
import { Play, Square, Plane, ShieldAlert, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FlightControlsProps {
  droneArmed: boolean;
  setDroneArmed: (armed: boolean) => void;
  flightMode: string;
  setFlightMode: (mode: string) => void;
}

const FlightControls = ({ droneArmed, setDroneArmed, flightMode, setFlightMode }: FlightControlsProps) => {
  const [isFlying, setIsFlying] = useState(false);

  const flightModes = [
    "GPS",
    "Attitude",
    "Sport", 
    "Cinematic",
    "Waypoint",
    "Follow Me",
    "Orbit"
  ];

  const handleArmDisarm = () => {
    if (!droneArmed) {
      // Arming sequence
      setDroneArmed(true);
    } else {
      // Disarming sequence
      setDroneArmed(false);
      setIsFlying(false);
    }
  };

  const handleTakeoff = () => {
    if (droneArmed && !isFlying) {
      setIsFlying(true);
    }
  };

  const handleLand = () => {
    if (isFlying) {
      setIsFlying(false);
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-600">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center gap-2">
          <Plane className="h-5 w-5" />
          Flight Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Flight Mode Selection */}
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Flight Mode</label>
          <Select value={flightMode} onValueChange={setFlightMode}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              {flightModes.map((mode) => (
                <SelectItem key={mode} value={mode} className="text-white hover:bg-slate-600">
                  {mode}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Arm/Disarm Controls */}
        <div className="space-y-3">
          <Button
            variant={droneArmed ? "destructive" : "default"}
            className="w-full font-bold text-base py-3"
            onClick={handleArmDisarm}
          >
            {droneArmed ? (
              <>
                <ShieldAlert className="h-5 w-5 mr-2" />
                DISARM MOTORS
              </>
            ) : (
              <>
                <Settings className="h-5 w-5 mr-2" />
                ARM MOTORS
              </>
            )}
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="default"
              disabled={!droneArmed || isFlying}
              onClick={handleTakeoff}
              className="bg-green-600 hover:bg-green-700"
            >
              <Play className="h-4 w-4 mr-1" />
              Take Off
            </Button>
            <Button
              variant="outline"
              disabled={!isFlying}
              onClick={handleLand}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Square className="h-4 w-4 mr-1" />
              Land
            </Button>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="space-y-2 pt-2 border-t border-slate-600">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-400">Motor Status:</span>
            <Badge variant={droneArmed ? "destructive" : "secondary"} className="text-xs">
              {droneArmed ? "ARMED" : "DISARMED"}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-400">Flight Status:</span>
            <Badge variant={isFlying ? "default" : "secondary"} className="text-xs">
              {isFlying ? "FLYING" : "GROUNDED"}
            </Badge>
          </div>
        </div>

        {/* Virtual Joysticks Placeholder */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="aspect-square bg-slate-700 rounded-full border-2 border-slate-600 flex items-center justify-center">
            <div className="w-6 h-6 bg-slate-500 rounded-full"></div>
            <div className="absolute text-xs text-slate-400 mt-16">Throttle/Yaw</div>
          </div>
          <div className="aspect-square bg-slate-700 rounded-full border-2 border-slate-600 flex items-center justify-center">
            <div className="w-6 h-6 bg-slate-500 rounded-full"></div>
            <div className="absolute text-xs text-slate-400 mt-16">Pitch/Roll</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightControls;
