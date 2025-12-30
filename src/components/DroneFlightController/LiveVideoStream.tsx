
import { useState } from "react";
import { Camera, Video, ZoomIn, ZoomOut, Maximize, Settings, Eye, Thermometer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

interface LiveVideoStreamProps {
  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;
}

const LiveVideoStream = ({ isRecording, setIsRecording }: LiveVideoStreamProps) => {
  const [zoom, setZoom] = useState([1]);
  const [activeCamera, setActiveCamera] = useState("main");
  const [showOSD, setShowOSD] = useState(true);

  const cameras = [
    { id: "main", name: "RGB", icon: Eye },
    { id: "thermal", name: "Thermal", icon: Thermometer },
    { id: "wide", name: "Wide", icon: Camera }
  ];

  return (
    <Card className="bg-slate-800 border-slate-600 h-full flex flex-col">
      <CardContent className="p-4 flex-1 flex flex-col">
        {/* Camera Selection */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            {cameras.map((camera) => (
              <Button
                key={camera.id}
                variant={activeCamera === camera.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCamera(camera.id)}
                className={activeCamera === camera.id ? "" : "border-slate-600 text-slate-300 hover:bg-slate-700"}
              >
                <camera.icon className="h-4 w-4 mr-1" />
                {camera.name}
              </Button>
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowOSD(!showOSD)}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Video Stream */}
        <div className="relative flex-1 bg-black rounded-lg overflow-hidden">
          {/* Simulated Video Feed */}
          <div className="w-full h-full bg-gradient-to-br from-blue-900 via-slate-800 to-green-900 flex items-center justify-center">
            <div className="text-center text-slate-400">
              <div className="text-6xl mb-4">📹</div>
              <p className="text-lg">Live Video Stream</p>
              <p className="text-sm opacity-75">1920x1080 @ 30fps</p>
              <div className="mt-2">
                <Badge variant="outline" className="border-green-500 text-green-400">
                  LIVE • {activeCamera.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>

          {/* OSD Overlays */}
          {showOSD && (
            <>
              {/* Top Left - Flight Data */}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded p-2 text-sm font-mono">
                <div className="text-green-400">ALT: 45.2m</div>
                <div className="text-blue-400">SPD: 12.5m/s</div>
                <div className="text-yellow-400">DIST: 234m</div>
              </div>

              {/* Top Right - System Status */}
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded p-2 text-sm font-mono">
                <div className="text-green-400">GPS: 16 SAT</div>
                <div className="text-blue-400">SIG: 95%</div>
                <div className="text-orange-400">BAT: 87%</div>
              </div>

              {/* Center - Artificial Horizon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 border-2 border-white/50 rounded-full flex items-center justify-center">
                  <div className="w-8 h-0.5 bg-white"></div>
                </div>
              </div>

              {/* Bottom Center - Recording Indicator */}
              {isRecording && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <Badge variant="destructive" className="animate-pulse">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    REC 00:15:23
                  </Badge>
                </div>
              )}
            </>
          )}
        </div>

        {/* Video Controls */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-600">
          <div className="flex items-center gap-4">
            <Button
              variant={isRecording ? "destructive" : "outline"}
              size="sm"
              onClick={() => setIsRecording(!isRecording)}
              className={!isRecording ? "border-slate-600 text-slate-300 hover:bg-slate-700" : ""}
            >
              <Video className="h-4 w-4 mr-2" />
              {isRecording ? "Stop Recording" : "Record"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Camera className="h-4 w-4 mr-2" />
              Photo
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoom([Math.max(0.5, zoom[0] - 0.5)])}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2 min-w-32">
              <span className="text-xs text-slate-400">Zoom:</span>
              <Slider
                value={zoom}
                onValueChange={setZoom}
                max={5}
                min={0.5}
                step={0.1}
                className="flex-1"
              />
              <span className="text-xs text-slate-300 w-8">{zoom[0].toFixed(1)}x</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoom([Math.min(5, zoom[0] + 0.5)])}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveVideoStream;
