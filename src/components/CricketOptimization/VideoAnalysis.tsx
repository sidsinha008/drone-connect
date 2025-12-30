
import React, { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Settings, Eye, Target, Activity, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

const VideoAnalysis = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(35);
  const [selectedOverlays, setSelectedOverlays] = useState(["movements", "heatmap"]);
  const [selectedPlayer, setSelectedPlayer] = useState("Johnson");

  const players = ["Johnson", "Smith", "Brown", "Davis", "Wilson"];
  
  const overlayOptions = [
    { id: "movements", label: "Player Movement Paths", color: "bg-blue-500" },
    { id: "heatmap", label: "Position Heatmap", color: "bg-red-500" },
    { id: "speed", label: "Speed Indicators", color: "bg-green-500" },
    { id: "formation", label: "Formation Lines", color: "bg-purple-500" },
    { id: "ball-trajectory", label: "Ball Trajectory", color: "bg-orange-500" },
    { id: "zones", label: "Field Zones", color: "bg-yellow-500" }
  ];

  const timelineEvents = [
    { time: 12, type: "Wicket", player: "Johnson", description: "Clean bowled" },
    { time: 35, type: "Boundary", player: "Smith", description: "Cover drive for 4" },
    { time: 58, type: "Catch", player: "Brown", description: "Spectacular catch at slip" },
    { time: 89, type: "Run Out", player: "Davis", description: "Direct hit stumping" }
  ];

  const performanceMetrics = [
    { label: "Average Speed", value: "18.5 km/h", change: "+5%", player: "Johnson" },
    { label: "Distance Covered", value: "2.4 km", change: "+12%", player: "Johnson" },
    { label: "Formation Efficiency", value: "87%", change: "+3%", player: "All" },
    { label: "Shot Accuracy", value: "73%", change: "-2%", player: "Johnson" }
  ];

  const toggleOverlay = (overlayId: string) => {
    setSelectedOverlays(prev => 
      prev.includes(overlayId) 
        ? prev.filter(id => id !== overlayId)
        : [...prev, overlayId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Video Player Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="w-5 h-5" />
            Video Analysis - Batting Practice Session
          </CardTitle>
          <CardDescription>Drone footage with AI-powered performance overlays</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Video Player */}
            <div className="relative bg-black rounded-lg aspect-video flex items-center justify-center">
              <div className="text-white text-center">
                <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Drone Footage - Batting Practice</p>
                <p className="text-sm opacity-75">Click play to start analysis</p>
              </div>
              
              {/* Overlay Indicators */}
              {selectedOverlays.length > 0 && (
                <div className="absolute top-4 left-4 space-y-2">
                  {selectedOverlays.map(overlayId => {
                    const overlay = overlayOptions.find(o => o.id === overlayId);
                    return overlay ? (
                      <Badge key={overlayId} variant="secondary" className="text-xs">
                        <div className={`w-2 h-2 ${overlay.color} rounded-full mr-2`}></div>
                        {overlay.label}
                      </Badge>
                    ) : null;
                  })}
                </div>
              )}
            </div>

            {/* Video Controls */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button variant="outline" size="sm">
                  <SkipBack className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <SkipForward className="w-4 h-4" />
                </Button>
                <div className="flex-1">
                  <Slider
                    value={[currentTime]}
                    onValueChange={([value]) => setCurrentTime(value)}
                    max={120}
                    step={1}
                    className="w-full"
                  />
                </div>
                <span className="text-sm font-mono">{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
                <Button variant="outline" size="sm">
                  <Volume2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analysis Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Analysis Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Player Selection */}
            <div>
              <label className="text-sm font-medium mb-2 block">Focus Player</label>
              <div className="space-y-2">
                {players.map(player => (
                  <div key={player} className="flex items-center space-x-2">
                    <Checkbox 
                      checked={selectedPlayer === player}
                      onCheckedChange={() => setSelectedPlayer(player)}
                    />
                    <label className="text-sm">{player}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Overlay Options */}
            <div>
              <label className="text-sm font-medium mb-2 block">Data Overlays</label>
              <div className="space-y-2">
                {overlayOptions.map(overlay => (
                  <div key={overlay.id} className="flex items-center space-x-2">
                    <Checkbox 
                      checked={selectedOverlays.includes(overlay.id)}
                      onCheckedChange={() => toggleOverlay(overlay.id)}
                    />
                    <div className={`w-3 h-3 ${overlay.color} rounded-full`}></div>
                    <label className="text-sm">{overlay.label}</label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Live Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-medium">{metric.label}</span>
                    <Badge variant="outline" className="text-xs">
                      {metric.player}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">{metric.value}</span>
                    <Badge 
                      variant={metric.change.startsWith('+') ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {metric.change}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Timeline Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Key Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <div className="space-y-3">
                {timelineEvents.map((event, index) => (
                  <div 
                    key={index} 
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      Math.abs(event.time - currentTime) < 5 ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                    onClick={() => setCurrentTime(event.time)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <Badge variant="outline" className="text-xs">
                        {event.type}
                      </Badge>
                      <span className="text-xs font-mono">
                        {Math.floor(event.time / 60)}:{(event.time % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                    <p className="text-sm font-medium">{event.player}</p>
                    <p className="text-xs text-muted-foreground">{event.description}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Session Analysis Summary
          </CardTitle>
          <CardDescription>AI-generated insights from this training session</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Technique Analysis</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  Johnson's batting stance shows 15% improvement in balance
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Consistent front-foot movement patterns observed
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  Shot selection timing needs refinement on spin deliveries
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Performance Trends</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  Overall shot accuracy up 8% from previous session
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  Increased confidence in playing cover drives
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  Fatigue indicators after 45 minutes of practice
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoAnalysis;
