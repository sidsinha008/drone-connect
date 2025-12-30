
import { useState } from "react";
import { Camera, Settings, Zap, Monitor } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface PayloadConfigurationProps {
  droneData: any;
  onSettingsChange: () => void;
}

export const PayloadConfiguration = ({ droneData, onSettingsChange }: PayloadConfigurationProps) => {
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [iso, setIso] = useState([200]);
  const [shutterSpeed, setShutterSpeed] = useState([125]);
  const [videoResolution, setVideoResolution] = useState("4K");
  const [gimbalMode, setGimbalMode] = useState("follow");

  const handleChange = () => {
    onSettingsChange();
  };

  return (
    <div className="space-y-6">
      {/* Detected Payloads */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Detected Payloads
          </CardTitle>
          <CardDescription>
            Currently connected sensors and payloads
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Camera className="h-5 w-5 text-blue-500" />
                <div>
                  <span className="font-medium">4K Camera & Gimbal</span>
                  <p className="text-sm text-muted-foreground">Status: Connected</p>
                </div>
              </div>
              <Button size="sm" variant="outline">Configure</Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-green-500" />
                <div>
                  <span className="font-medium">GPS Module</span>
                  <p className="text-sm text-muted-foreground">Status: Active</p>
                </div>
              </div>
              <Button size="sm" variant="outline">Configure</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Camera Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Camera Configuration
          </CardTitle>
          <CardDescription>
            Adjust camera settings for optimal image and video capture
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="camera-enabled">Enable Camera</Label>
              <p className="text-sm text-muted-foreground">
                Activate camera for photo and video capture
              </p>
            </div>
            <Switch
              id="camera-enabled"
              checked={cameraEnabled}
              onCheckedChange={(checked) => {
                setCameraEnabled(checked);
                handleChange();
              }}
            />
          </div>

          {cameraEnabled && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Video Resolution</Label>
                  <select 
                    value={videoResolution}
                    onChange={(e) => {
                      setVideoResolution(e.target.value);
                      handleChange();
                    }}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="4K">4K (3840x2160) 30fps</option>
                    <option value="2.7K">2.7K (2704x1520) 60fps</option>
                    <option value="1080p">1080p (1920x1080) 120fps</option>
                    <option value="720p">720p (1280x720) 240fps</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Photo Mode</Label>
                  <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                    <option value="single">Single Shot</option>
                    <option value="burst">Burst Mode</option>
                    <option value="timelapse">Time Lapse</option>
                    <option value="hdr">HDR</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>ISO: {iso[0]}</Label>
                  <Slider
                    value={iso}
                    onValueChange={(value) => {
                      setIso(value);
                      handleChange();
                    }}
                    max={3200}
                    min={100}
                    step={100}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Shutter Speed: 1/{shutterSpeed[0]}</Label>
                  <Slider
                    value={shutterSpeed}
                    onValueChange={(value) => {
                      setShutterSpeed(value);
                      handleChange();
                    }}
                    max={1000}
                    min={30}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>White Balance</Label>
                  <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                    <option value="auto">Auto</option>
                    <option value="sunny">Sunny</option>
                    <option value="cloudy">Cloudy</option>
                    <option value="indoor">Indoor</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Gimbal Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Gimbal Configuration
          </CardTitle>
          <CardDescription>
            Configure gimbal behavior and stabilization settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Gimbal Mode</Label>
              <select 
                value={gimbalMode}
                onChange={(e) => {
                  setGimbalMode(e.target.value);
                  handleChange();
                }}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="follow">Follow Mode</option>
                <option value="fpv">FPV Mode</option>
                <option value="lock">Lock Mode</option>
                <option value="smooth">Smooth Track</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Stabilization</Label>
              <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                <option value="high">High Stabilization</option>
                <option value="medium">Medium Stabilization</option>
                <option value="low">Low Stabilization</option>
                <option value="off">Off</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Gimbal Limits</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Pitch Range: -90° to +30°</Label>
                <div className="text-sm text-muted-foreground">
                  Vertical tilt limits for the gimbal
                </div>
              </div>
              <div className="space-y-2">
                <Label>Yaw Range: -120° to +120°</Label>
                <div className="text-sm text-muted-foreground">
                  Horizontal rotation limits for the gimbal
                </div>
              </div>
            </div>
          </div>

          <Button onClick={handleChange}>
            <Settings className="h-4 w-4 mr-2" />
            Calibrate Gimbal
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
