
import { useState } from "react";
import { MapPin, Home, Settings, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

interface GeneralSettingsProps {
  droneData: any;
  onSettingsChange: () => void;
}

export const GeneralSettings = ({ droneData, onSettingsChange }: GeneralSettingsProps) => {
  const [droneName, setDroneName] = useState(droneData.name);
  const [homePoint, setHomePoint] = useState("13.0827° N, 80.2707° E");
  const [rthAltitude, setRthAltitude] = useState([120]);
  const [maxAltitude, setMaxAltitude] = useState([500]);
  const [maxDistance, setMaxDistance] = useState([1000]);
  const [units, setUnits] = useState("metric");
  const [autoRth, setAutoRth] = useState(true);
  const [lowBatteryRth, setLowBatteryRth] = useState([25]);

  const handleChange = () => {
    onSettingsChange();
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Basic Information
          </CardTitle>
          <CardDescription>
            Configure fundamental drone identification and display settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="drone-name">Drone Name</Label>
              <Input
                id="drone-name"
                value={droneName}
                onChange={(e) => {
                  setDroneName(e.target.value);
                  handleChange();
                }}
                placeholder="Enter drone name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="drone-id">Drone ID</Label>
              <Input
                id="drone-id"
                value={droneData.id}
                disabled
                className="bg-muted"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Preferred Units</Label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="metric"
                  checked={units === "metric"}
                  onChange={(e) => {
                    setUnits(e.target.value);
                    handleChange();
                  }}
                />
                <span>Metric (m, km/h, °C)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="imperial"
                  checked={units === "imperial"}
                  onChange={(e) => {
                    setUnits(e.target.value);
                    handleChange();
                  }}
                />
                <span>Imperial (ft, mph, °F)</span>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Home Point Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Home Point Configuration
          </CardTitle>
          <CardDescription>
            Set the drone's home point and return-to-home behavior
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="home-point">Home Point Coordinates</Label>
            <div className="flex gap-2">
              <Input
                id="home-point"
                value={homePoint}
                onChange={(e) => {
                  setHomePoint(e.target.value);
                  handleChange();
                }}
                placeholder="Latitude, Longitude"
              />
              <Button variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                Set Current Location
              </Button>
              <Button variant="outline">
                <Globe className="h-4 w-4 mr-2" />
                Select on Map
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Return-to-Home Altitude: {rthAltitude[0]}m</Label>
              <Slider
                value={rthAltitude}
                onValueChange={(value) => {
                  setRthAltitude(value);
                  handleChange();
                }}
                max={500}
                min={30}
                step={10}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                Altitude the drone will fly at when returning home
              </p>
            </div>

            <div className="space-y-2">
              <Label>Low Battery RTH: {lowBatteryRth[0]}%</Label>
              <Slider
                value={lowBatteryRth}
                onValueChange={(value) => {
                  setLowBatteryRth(value);
                  handleChange();
                }}
                max={50}
                min={10}
                step={5}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                Battery level that triggers automatic return-to-home
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="auto-rth"
              checked={autoRth}
              onCheckedChange={(checked) => {
                setAutoRth(checked);
                handleChange();
              }}
            />
            <Label htmlFor="auto-rth">Enable automatic return-to-home on signal loss</Label>
          </div>
        </CardContent>
      </Card>

      {/* Operational Limits */}
      <Card>
        <CardHeader>
          <CardTitle>Operational Limits</CardTitle>
          <CardDescription>
            Set maximum altitude and distance limits for safe operation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Maximum Altitude: {maxAltitude[0]}m</Label>
              <Slider
                value={maxAltitude}
                onValueChange={(value) => {
                  setMaxAltitude(value);
                  handleChange();
                }}
                max={1000}
                min={30}
                step={10}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                Maximum height the drone can reach
              </p>
            </div>

            <div className="space-y-2">
              <Label>Maximum Distance: {maxDistance[0]}m</Label>
              <Slider
                value={maxDistance}
                onValueChange={(value) => {
                  setMaxDistance(value);
                  handleChange();
                }}
                max={5000}
                min={100}
                step={50}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                Maximum distance from home point
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
