
import { useState } from "react";
import { MapPin, Route, Target, Play, Save, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MissionPlanning = () => {
  const [missionType, setMissionType] = useState("waypoint");
  const [waypoints, setWaypoints] = useState(3);
  const [altitude, setAltitude] = useState("50");
  const [speed, setSpeed] = useState("10");

  const missionTypes = [
    { value: "waypoint", label: "Waypoint Navigation" },
    { value: "orbit", label: "Point of Interest Orbit" },
    { value: "grid", label: "Area Mapping Grid" },
    { value: "linear", label: "Linear Survey" }
  ];

  return (
    <Card className="bg-slate-800 border-slate-600">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center gap-2">
          <Route className="h-5 w-5" />
          Mission Planning
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mission Type Selection */}
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Mission Type</label>
          <Select value={missionType} onValueChange={setMissionType}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              {missionTypes.map((type) => (
                <SelectItem key={type.value} value={type.value} className="text-white hover:bg-slate-600">
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Mission Parameters */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-xs text-slate-400">Altitude (m)</label>
              <Input
                type="number"
                value={altitude}
                onChange={(e) => setAltitude(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-slate-400">Speed (m/s)</label>
              <Input
                type="number"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </div>
        </div>

        {/* Waypoint List */}
        <div className="space-y-3 pt-2 border-t border-slate-600">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-300">Waypoints</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setWaypoints(waypoints + 1)}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <MapPin className="h-3 w-3 mr-1" />
              Add
            </Button>
          </div>
          
          <div className="space-y-2">
            {Array.from({ length: waypoints }, (_, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-slate-300">
                  {i + 1}
                </div>
                <div className="flex-1 text-slate-400">
                  Waypoint {i + 1}: 13.0827°N, 80.2707°E
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-slate-500 hover:text-slate-300"
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Actions */}
        <div className="space-y-2 pt-2 border-t border-slate-600">
          <div className="text-sm text-slate-300 font-medium">Actions</div>
          <div className="space-y-2">
            <Button
              variant="default"
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Mission
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <Save className="h-3 w-3 mr-1" />
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <FolderOpen className="h-3 w-3 mr-1" />
                Load
              </Button>
            </div>
          </div>
        </div>

        {/* Mission Preview */}
        <div className="pt-2 border-t border-slate-600">
          <div className="text-xs text-slate-400 mb-2">Mission Preview</div>
          <div className="bg-slate-700 rounded h-20 flex items-center justify-center">
            <div className="text-center text-slate-500">
              <Target className="h-6 w-6 mx-auto mb-1" />
              <div className="text-xs">Interactive Map</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MissionPlanning;
