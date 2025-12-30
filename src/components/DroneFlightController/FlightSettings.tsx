
import { useState } from "react";
import { Settings, Shield, Gauge, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const FlightSettings = () => {
  const [maxAltitude, setMaxAltitude] = useState("120");
  const [maxDistance, setMaxDistance] = useState("500");
  const [rthAltitude, setRthAltitude] = useState("60");
  const [obstacleAvoidance, setObstacleAvoidance] = useState(true);
  const [lowBatteryRth, setLowBatteryRth] = useState(true);
  const [batteryThreshold, setBatteryThreshold] = useState([25]);
  const [controlSensitivity, setControlSensitivity] = useState([50]);
  const [units, setUnits] = useState("metric");

  return (
    <Card className="bg-slate-800 border-slate-600">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Flight Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Flight Limits */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-slate-300 font-medium">
            <Gauge className="h-4 w-4" />
            Flight Limits
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-xs text-slate-400">Max Altitude (m)</label>
              <Input
                type="number"
                value={maxAltitude}
                onChange={(e) => setMaxAltitude(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-slate-400">Max Distance (m)</label>
              <Input
                type="number"
                value={maxDistance}
                onChange={(e) => setMaxDistance(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs text-slate-400">RTH Altitude (m)</label>
            <Input
              type="number"
              value={rthAltitude}
              onChange={(e) => setRthAltitude(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>
        </div>

        {/* Safety Features */}
        <div className="space-y-3 pt-2 border-t border-slate-600">
          <div className="flex items-center gap-2 text-sm text-slate-300 font-medium">
            <Shield className="h-4 w-4" />
            Safety Features
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Obstacle Avoidance</span>
              <Switch
                checked={obstacleAvoidance}
                onCheckedChange={setObstacleAvoidance}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Low Battery RTH</span>
              <Switch
                checked={lowBatteryRth}
                onCheckedChange={setLowBatteryRth}
              />
            </div>
            
            {lowBatteryRth && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Battery Threshold</span>
                  <span className="text-xs text-white font-mono">{batteryThreshold[0]}%</span>
                </div>
                <Slider
                  value={batteryThreshold}
                  onValueChange={setBatteryThreshold}
                  max={50}
                  min={10}
                  step={5}
                  className="flex-1"
                />
              </div>
            )}
          </div>
        </div>

        {/* Control Settings */}
        <div className="space-y-3 pt-2 border-t border-slate-600">
          <div className="text-sm text-slate-300 font-medium">Control Settings</div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Control Sensitivity</span>
              <span className="text-xs text-white font-mono">{controlSensitivity[0]}%</span>
            </div>
            <Slider
              value={controlSensitivity}
              onValueChange={setControlSensitivity}
              max={100}
              min={10}
              step={5}
              className="flex-1"
            />
          </div>
        </div>

        {/* General Settings */}
        <div className="space-y-3 pt-2 border-t border-slate-600">
          <div className="flex items-center gap-2 text-sm text-slate-300 font-medium">
            <Globe className="h-4 w-4" />
            General
          </div>
          
          <div className="space-y-2">
            <label className="text-xs text-slate-400">Units</label>
            <Select value={units} onValueChange={setUnits}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="metric" className="text-white hover:bg-slate-600">Metric</SelectItem>
                <SelectItem value="imperial" className="text-white hover:bg-slate-600">Imperial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightSettings;
