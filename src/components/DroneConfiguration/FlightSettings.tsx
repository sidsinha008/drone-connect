
import { useState } from "react";
import { Shield, Zap, AlertTriangle, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface FlightSettingsProps {
  droneData: any;
  onSettingsChange: () => void;
}

export const FlightSettings = ({ droneData, onSettingsChange }: FlightSettingsProps) => {
  const [obstacleAvoidance, setObstacleAvoidance] = useState(true);
  const [avoidanceSensitivity, setAvoidanceSensitivity] = useState([3]);
  const [sportMode, setSportMode] = useState(false);
  const [maxSpeed, setMaxSpeed] = useState([15]);
  const [ascentRate, setAscentRate] = useState([6]);
  const [descentRate, setDescentRate] = useState([3]);

  const handleChange = () => {
    onSettingsChange();
  };

  return (
    <div className="space-y-6">
      {/* Flight Modes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Flight Modes & Performance
          </CardTitle>
          <CardDescription>
            Configure flight characteristics and performance parameters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="sport-mode">Sport Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Enable high-performance flight mode with increased speed and agility
                </p>
              </div>
              <Switch
                id="sport-mode"
                checked={sportMode}
                onCheckedChange={(checked) => {
                  setSportMode(checked);
                  handleChange();
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Max Speed: {maxSpeed[0]} m/s</Label>
                <Slider
                  value={maxSpeed}
                  onValueChange={(value) => {
                    setMaxSpeed(value);
                    handleChange();
                  }}
                  max={sportMode ? 25 : 15}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Ascent Rate: {ascentRate[0]} m/s</Label>
                <Slider
                  value={ascentRate}
                  onValueChange={(value) => {
                    setAscentRate(value);
                    handleChange();
                  }}
                  max={10}
                  min={1}
                  step={0.5}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Descent Rate: {descentRate[0]} m/s</Label>
                <Slider
                  value={descentRate}
                  onValueChange={(value) => {
                    setDescentRate(value);
                    handleChange();
                  }}
                  max={6}
                  min={1}
                  step={0.5}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Obstacle Avoidance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Obstacle Avoidance
          </CardTitle>
          <CardDescription>
            Configure obstacle detection and avoidance behavior
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="obstacle-avoidance">Enable Obstacle Avoidance</Label>
              <p className="text-sm text-muted-foreground">
                Automatically detect and avoid obstacles during flight
              </p>
            </div>
            <Switch
              id="obstacle-avoidance"
              checked={obstacleAvoidance}
              onCheckedChange={(checked) => {
                setObstacleAvoidance(checked);
                handleChange();
              }}
            />
          </div>

          {obstacleAvoidance && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Avoidance Sensitivity: {avoidanceSensitivity[0]}</Label>
                <Slider
                  value={avoidanceSensitivity}
                  onValueChange={(value) => {
                    setAvoidanceSensitivity(value);
                    handleChange();
                  }}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Less Sensitive</span>
                  <span>More Sensitive</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Avoidance Action</Label>
                  <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                    <option value="brake">Brake and Hover</option>
                    <option value="bypass">Smart Bypass</option>
                    <option value="rth">Return to Home</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Detection Range</Label>
                  <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                    <option value="close">Close (0.7m)</option>
                    <option value="normal">Normal (1.5m)</option>
                    <option value="far">Far (3.0m)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Geofencing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Geofencing
          </CardTitle>
          <CardDescription>
            Manage restricted zones and flight boundaries
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Button variant="outline">
              <MapPin className="h-4 w-4 mr-2" />
              Create Geofence
            </Button>
            <Button variant="outline">
              View All Zones
            </Button>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Active Geofences</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <span className="font-medium">Airport Restriction Zone</span>
                  <p className="text-sm text-muted-foreground">5km radius from Chennai Airport</p>
                </div>
                <Button size="sm" variant="outline">Edit</Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <span className="font-medium">City Center No-Fly Zone</span>
                  <p className="text-sm text-muted-foreground">Government district restrictions</p>
                </div>
                <Button size="sm" variant="outline">Edit</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Procedures */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Emergency Procedures
          </CardTitle>
          <CardDescription>
            Configure actions for critical flight situations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>GPS Signal Loss</Label>
              <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                <option value="hover">Hover in Place</option>
                <option value="rth">Return to Home</option>
                <option value="land">Emergency Landing</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Motor Failure</Label>
              <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                <option value="land">Immediate Landing</option>
                <option value="rth">Attempt RTH</option>
                <option value="parachute">Deploy Parachute</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Communication Loss</Label>
              <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                <option value="rth">Return to Home</option>
                <option value="hover">Hover and Wait</option>
                <option value="continue">Continue Mission</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Critical Battery Level</Label>
              <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                <option value="rth">Return to Home</option>
                <option value="land">Land Immediately</option>
                <option value="nearest">Land at Nearest Safe Location</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
