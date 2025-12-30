
import { useState } from "react";
import { Camera, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Settings, Sun, Aperture } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CameraGimbalControl = () => {
  const [gimbalPitch, setGimbalPitch] = useState([0]);
  const [gimbalYaw, setGimbalYaw] = useState([0]);
  const [resolution, setResolution] = useState("4K");
  const [iso, setIso] = useState([100]);
  const [exposure, setExposure] = useState([0]);

  return (
    <Card className="bg-slate-800 border-slate-600">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Camera & Gimbal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Gimbal Controls */}
        <div className="space-y-3">
          <div className="text-sm text-slate-300 font-medium">Gimbal Control</div>
          
          {/* Pitch Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Pitch</span>
              <span className="text-xs text-white font-mono">{gimbalPitch[0]}°</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setGimbalPitch([Math.max(-90, gimbalPitch[0] - 10)])}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <ArrowDown className="h-3 w-3" />
              </Button>
              <Slider
                value={gimbalPitch}
                onValueChange={setGimbalPitch}
                max={30}
                min={-90}
                step={1}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setGimbalPitch([Math.min(30, gimbalPitch[0] + 10)])}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <ArrowUp className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Yaw Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Yaw</span>
              <span className="text-xs text-white font-mono">{gimbalYaw[0]}°</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setGimbalYaw([Math.max(-180, gimbalYaw[0] - 15)])}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <ArrowLeft className="h-3 w-3" />
              </Button>
              <Slider
                value={gimbalYaw}
                onValueChange={setGimbalYaw}
                max={180}
                min={-180}
                step={1}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setGimbalYaw([Math.min(180, gimbalYaw[0] + 15)])}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Center Gimbal Button */}
          <Button
            variant="outline"
            className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
            onClick={() => {
              setGimbalPitch([0]);
              setGimbalYaw([0]);
            }}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Center Gimbal
          </Button>
        </div>

        {/* Camera Settings */}
        <div className="space-y-3 pt-2 border-t border-slate-600">
          <div className="text-sm text-slate-300 font-medium">Camera Settings</div>
          
          {/* Resolution */}
          <div className="space-y-2">
            <label className="text-xs text-slate-400">Resolution</label>
            <Select value={resolution} onValueChange={setResolution}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="4K" className="text-white hover:bg-slate-600">4K (3840x2160)</SelectItem>
                <SelectItem value="2.7K" className="text-white hover:bg-slate-600">2.7K (2704x1520)</SelectItem>
                <SelectItem value="1080p" className="text-white hover:bg-slate-600">1080p (1920x1080)</SelectItem>
                <SelectItem value="720p" className="text-white hover:bg-slate-600">720p (1280x720)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ISO */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">ISO</span>
              <span className="text-xs text-white font-mono">{iso[0]}</span>
            </div>
            <Slider
              value={iso}
              onValueChange={setIso}
              max={3200}
              min={100}
              step={100}
              className="flex-1"
            />
          </div>

          {/* Exposure Compensation */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Exposure</span>
              <span className="text-xs text-white font-mono">{exposure[0] > 0 ? '+' : ''}{exposure[0]}</span>
            </div>
            <Slider
              value={exposure}
              onValueChange={setExposure}
              max={3}
              min={-3}
              step={0.3}
              className="flex-1"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2 pt-2 border-t border-slate-600">
          <div className="text-sm text-slate-300 font-medium">Quick Actions</div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Sun className="h-3 w-3 mr-1" />
              Auto WB
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Aperture className="h-3 w-3 mr-1" />
              Auto Focus
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CameraGimbalControl;
