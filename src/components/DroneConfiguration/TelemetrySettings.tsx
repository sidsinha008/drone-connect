
import { useState } from "react";
import { Zap, Download, Settings, Database } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TelemetrySettingsProps {
  droneData: any;
  onSettingsChange: () => void;
}

export const TelemetrySettings = ({ droneData, onSettingsChange }: TelemetrySettingsProps) => {
  const [loggingEnabled, setLoggingEnabled] = useState(true);
  const [loggingFrequency, setLoggingFrequency] = useState("1");
  const [storageLocation, setStorageLocation] = useState("cloud");

  const dataPoints = [
    { key: "gps", label: "GPS Coordinates", enabled: true },
    { key: "altitude", label: "Altitude", enabled: true },
    { key: "speed", label: "Speed & Velocity", enabled: true },
    { key: "battery", label: "Battery Status", enabled: true },
    { key: "motors", label: "Motor RPM", enabled: false },
    { key: "gimbal", label: "Gimbal Position", enabled: true },
    { key: "camera", label: "Camera Settings", enabled: false },
    { key: "sensors", label: "Environmental Sensors", enabled: false },
  ];

  const handleChange = () => {
    onSettingsChange();
  };

  return (
    <div className="space-y-6">
      {/* Data Logging Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Logging Configuration
          </CardTitle>
          <CardDescription>
            Configure what telemetry data is collected and how frequently
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="logging-enabled">Enable Data Logging</Label>
              <p className="text-sm text-muted-foreground">
                Record telemetry data during flight operations
              </p>
            </div>
            <Switch
              id="logging-enabled"
              checked={loggingEnabled}
              onCheckedChange={(checked) => {
                setLoggingEnabled(checked);
                handleChange();
              }}
            />
          </div>

          {loggingEnabled && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Logging Frequency</Label>
                  <select 
                    value={loggingFrequency}
                    onChange={(e) => {
                      setLoggingFrequency(e.target.value);
                      handleChange();
                    }}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="0.5">Every 0.5 seconds (High)</option>
                    <option value="1">Every 1 second (Normal)</option>
                    <option value="2">Every 2 seconds (Low)</option>
                    <option value="5">Every 5 seconds (Minimal)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Storage Location</Label>
                  <select 
                    value={storageLocation}
                    onChange={(e) => {
                      setStorageLocation(e.target.value);
                      handleChange();
                    }}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="cloud">Cloud Storage</option>
                    <option value="internal">Internal Drone Storage</option>
                    <option value="both">Both Cloud & Internal</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Points Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Telemetry Data Points
          </CardTitle>
          <CardDescription>
            Select which data points to record during flights
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {dataPoints.map((point) => (
              <div key={point.key} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={point.enabled}
                    onCheckedChange={handleChange}
                  />
                  <span className="font-medium">{point.label}</span>
                </div>
                <Badge variant={point.enabled ? "default" : "secondary"}>
                  {point.enabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Data Management
          </CardTitle>
          <CardDescription>
            Download, sync, and manage collected telemetry data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">2.3 GB</div>
              <div className="text-sm text-muted-foreground">Total Data Collected</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">156</div>
              <div className="text-sm text-muted-foreground">Flight Sessions</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">24h</div>
              <div className="text-sm text-muted-foreground">Total Flight Time</div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download All Data
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Export Settings
            </Button>
            <Button variant="outline">
              Sync to Cloud
            </Button>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Recent Flight Data</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <span className="font-medium">Flight #156 - Delivery Route Alpha</span>
                  <p className="text-sm text-muted-foreground">Today, 14:30 - 15:15 (45 min)</p>
                </div>
                <Button size="sm" variant="outline">Download</Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <span className="font-medium">Flight #155 - Inspection Mission</span>
                  <p className="text-sm text-muted-foreground">Yesterday, 09:20 - 10:45 (1h 25min)</p>
                </div>
                <Button size="sm" variant="outline">Download</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
