import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Layers, 
  Map, 
  Eye, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut,
  Settings,
  Plane,
  Battery,
  Signal,
  AlertTriangle,
  MapPin,
  Camera,
  Navigation,
  Clock,
  Target,
  Sun,
  Cloud,
  CloudRain,
  Home,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Focus,
  Compass
} from "lucide-react";

interface FleetVisualizationProps {
  devices: any[];
}

const FleetVisualization = ({ devices }: FleetVisualizationProps) => {
  const [viewMode, setViewMode] = useState("3d");
  const [selectedDrone, setSelectedDrone] = useState<number | null>(null);
  const [followingDrone, setFollowingDrone] = useState<number | null>(null);
  
  // 3D Environment Controls
  const [showTerrain, setShowTerrain] = useState(true);
  const [showBuildings, setShowBuildings] = useState(true);
  const [showAirspace, setShowAirspace] = useState(true);
  const [showWeather, setShowWeather] = useState(false);
  const [weatherCondition, setWeatherCondition] = useState("sunny");
  const [timeOfDay, setTimeOfDay] = useState([12]); // 0-24 hours
  
  // Trajectory Controls
  const [showHistoricalTrails, setShowHistoricalTrails] = useState(true);
  const [trailDuration, setTrailDuration] = useState([30]); // minutes
  const [showPredictiveTrajectory, setShowPredictiveTrajectory] = useState(true);
  const [showMissionPaths, setShowMissionPaths] = useState(true);
  const [showAltitudeProfile, setShowAltitudeProfile] = useState(false);
  
  // Time Controls
  const [isPlayingBack, setIsPlayingBack] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState([1]);
  const [currentTime, setCurrentTime] = useState([100]); // percentage
  
  // AR Mode Controls
  const [arEnabled, setArEnabled] = useState(false);
  const [showXRayMode, setShowXRayMode] = useState(false);
  const [arDistanceFilter, setArDistanceFilter] = useState([1000]); // meters
  
  // Camera Controls
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0, z: 100 });
  const [cameraRotation, setCameraRotation] = useState({ pitch: 45, yaw: 0 });
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Online": return "#10b981";
      case "In Flight": return "#3b82f6";
      case "Idle": return "#6b7280";
      case "Connection Issues": return "#f59e0b";
      case "Critical Alert": return "#ef4444";
      case "Offline": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch(condition) {
      case "sunny": return Sun;
      case "cloudy": return Cloud;
      case "rainy": return CloudRain;
      default: return Sun;
    }
  };

  const handleDroneSelect = (droneId: number) => {
    setSelectedDrone(droneId);
    setFollowingDrone(null);
  };

  const handleFollowDrone = (droneId: number) => {
    setFollowingDrone(droneId);
    setSelectedDrone(droneId);
  };

  const handleGoToLocation = (coordinates: { lat: number, lng: number }) => {
    // Simulate camera movement to location
    console.log(`Moving camera to ${coordinates.lat}, ${coordinates.lng}`);
  };

  // Simulate 3D rendering
  useEffect(() => {
    if (!canvasRef.current || viewMode !== "3d") return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      // Clear canvas with environment-appropriate background
      const timeColor = timeOfDay[0] < 6 || timeOfDay[0] > 18 ? "#1a1a2e" : "#87CEEB";
      ctx.fillStyle = timeColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render terrain (if enabled)
      if (showTerrain) {
        ctx.fillStyle = "#8B7355";
        ctx.fillRect(0, canvas.height - 100, canvas.width, 100);
        
        // Add some hills
        ctx.beginPath();
        ctx.moveTo(0, canvas.height - 100);
        for (let i = 0; i <= canvas.width; i += 50) {
          const height = 50 + Math.sin(i * 0.01) * 30;
          ctx.lineTo(i, canvas.height - 100 - height);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.fill();
      }

      // Render buildings (if enabled)
      if (showBuildings) {
        ctx.fillStyle = "#4A5568";
        // Simple building representations
        [
          { x: 100, y: canvas.height - 200, w: 60, h: 100 },
          { x: 200, y: canvas.height - 180, w: 80, h: 80 },
          { x: 350, y: canvas.height - 220, w: 50, h: 120 },
          { x: 500, y: canvas.height - 190, w: 70, h: 90 }
        ].forEach(building => {
          ctx.fillRect(building.x, building.y, building.w, building.h);
        });
      }

      // Render airspace zones (if enabled)
      if (showAirspace) {
        ctx.fillStyle = "rgba(255, 0, 0, 0.1)";
        ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(300, 200, 80, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // NFZ label
        ctx.fillStyle = "#ef4444";
        ctx.font = "12px sans-serif";
        ctx.fillText("NFZ", 285, 205);
      }

      // Render weather effects (if enabled)
      if (showWeather && weatherCondition === "rainy") {
        ctx.strokeStyle = "rgba(100, 150, 255, 0.6)";
        ctx.lineWidth = 1;
        for (let i = 0; i < 100; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x - 2, y + 10);
          ctx.stroke();
        }
      }

      // Render drones with sophisticated visualization
      devices.forEach((device, index) => {
        const x = 150 + (index * 120) % (canvas.width - 300);
        const y = 100 + Math.floor(index / 5) * 100;
        const isSelected = selectedDrone === device.id;
        const isFollowing = followingDrone === device.id;

        // Drone status glow
        const glowColor = getStatusColor(device.status);
        if (isSelected || isFollowing) {
          ctx.shadowColor = glowColor;
          ctx.shadowBlur = 15;
        }

        // Drone body (3D-like representation)
        ctx.fillStyle = glowColor;
        ctx.beginPath();
        ctx.arc(x, y, isSelected ? 12 : 8, 0, Math.PI * 2);
        ctx.fill();

        // Propellers (animated for active drones)
        if (device.status === "In Flight") {
          ctx.fillStyle = "#60a5fa";
          const propSize = 4;
          const offset = 10;
          [
            { dx: -offset, dy: -offset },
            { dx: offset, dy: -offset },
            { dx: -offset, dy: offset },
            { dx: offset, dy: offset }
          ].forEach(prop => {
            ctx.beginPath();
            ctx.arc(x + prop.dx, y + prop.dy, propSize, 0, Math.PI * 2);
            ctx.fill();
          });
        }

        // Directional arrow
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(x, y - 6);
        ctx.lineTo(x - 4, y + 2);
        ctx.lineTo(x + 4, y + 2);
        ctx.fill();

        // Reset shadow
        ctx.shadowBlur = 0;

        // Historical trajectory trail (if enabled)
        if (showHistoricalTrails) {
          ctx.strokeStyle = `${glowColor}40`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(x - 50, y + 10);
          ctx.quadraticCurveTo(x - 25, y - 20, x, y);
          ctx.stroke();
        }

        // Predictive trajectory (if enabled)
        if (showPredictiveTrajectory && device.status === "In Flight") {
          ctx.strokeStyle = glowColor;
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 5]);
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + 60, y - 30);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Mission path (if enabled)
        if (showMissionPaths && device.assignedMission) {
          ctx.strokeStyle = "#3b82f6";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + 100, y + 20);
          ctx.lineTo(x + 150, y - 40);
          ctx.stroke();
          
          // Waypoints
          ctx.fillStyle = "#3b82f6";
          [
            { x: x + 100, y: y + 20 },
            { x: x + 150, y: y - 40 }
          ].forEach((waypoint, wpIndex) => {
            ctx.beginPath();
            ctx.arc(waypoint.x, waypoint.y, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#ffffff";
            ctx.font = "10px sans-serif";
            ctx.fillText((wpIndex + 1).toString(), waypoint.x - 3, waypoint.y + 3);
            ctx.fillStyle = "#3b82f6";
          });
        }

        // Data overlays (for selected drone)
        if (isSelected) {
          const overlayX = x + 20;
          const overlayY = y - 40;
          
          ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
          ctx.fillRect(overlayX, overlayY, 160, 80);
          
          ctx.fillStyle = "#ffffff";
          ctx.font = "10px sans-serif";
          const overlayData = [
            `ID: ${device.droneId}`,
            `Alt: ${Math.floor(Math.random() * 200)}m AGL`,
            `Speed: ${Math.floor(Math.random() * 50)}km/h`,
            `Battery: ${device.battery}%`,
            `Signal: ${Math.floor(Math.random() * 100)}%`,
            `Mission: ${device.assignedMission || 'None'}`
          ];
          
          overlayData.forEach((text, i) => {
            ctx.fillText(text, overlayX + 5, overlayY + 15 + (i * 12));
          });
        }

        // Following indicator
        if (isFollowing) {
          ctx.strokeStyle = "#10b981";
          ctx.lineWidth = 3;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.arc(x, y, 20, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });

      // Altitude profile popup (if enabled and drone selected)
      if (showAltitudeProfile && selectedDrone) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.fillRect(canvas.width - 220, 20, 200, 120);
        ctx.strokeStyle = "#3b82f6";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(canvas.width - 210, 100);
        ctx.lineTo(canvas.width - 150, 80);
        ctx.lineTo(canvas.width - 100, 60);
        ctx.lineTo(canvas.width - 50, 90);
        ctx.stroke();
        
        ctx.fillStyle = "#000000";
        ctx.font = "12px sans-serif";
        ctx.fillText("Altitude Profile", canvas.width - 210, 40);
      }
    };

    render();
  }, [viewMode, devices, selectedDrone, followingDrone, showTerrain, showBuildings, 
      showAirspace, showWeather, weatherCondition, timeOfDay, showHistoricalTrails, 
      showPredictiveTrajectory, showMissionPaths, showAltitudeProfile]);

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="text-primary" size={24} />
            Next-Gen 3D Fleet Visualization
          </CardTitle>
          <CardDescription>
            Immersive real-time 3D environment with AR capabilities and predictive analytics
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Main Visualization Area */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Tabs value={viewMode} onValueChange={setViewMode}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="3d">3D Environment</TabsTrigger>
                    <TabsTrigger value="ar">AR Mode</TabsTrigger>
                    <TabsTrigger value="satellite">Satellite</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPlayingBack(!isPlayingBack)}
                  >
                    {isPlayingBack ? <Pause size={14} /> : <Play size={14} />}
                  </Button>
                  <Button variant="outline" size="sm">
                    <ZoomIn size={14} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ZoomOut size={14} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <RotateCcw size={14} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative h-[500px] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg overflow-hidden">
                {viewMode === "3d" && (
                  <div className="relative w-full h-full">
                    <canvas
                      ref={canvasRef}
                      width={800}
                      height={500}
                      className="w-full h-full cursor-grab active:cursor-grabbing"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        
                        // Simple drone selection logic
                        devices.forEach((device, index) => {
                          const droneX = 150 + (index * 120) % (800 - 300);
                          const droneY = 100 + Math.floor(index / 5) * 100;
                          const distance = Math.sqrt((x - droneX) ** 2 + (y - droneY) ** 2);
                          if (distance < 20) {
                            handleDroneSelect(device.id);
                          }
                        });
                      }}
                    />
                    
                    {/* Environment Controls Overlay */}
                    <div className="absolute top-4 left-4 bg-black/70 text-white p-3 rounded-lg text-sm space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock size={14} />
                        <span>Time: {String(Math.floor(timeOfDay[0])).padStart(2, '0')}:00</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {React.createElement(getWeatherIcon(weatherCondition), { size: 14 })}
                        <span className="capitalize">{weatherCondition}</span>
                      </div>
                      {followingDrone && (
                        <div className="flex items-center gap-2 text-green-400">
                          <Target size={14} />
                          <span>Following: {devices.find(d => d.id === followingDrone)?.droneId}</span>
                        </div>
                      )}
                    </div>

                    {/* Time Control */}
                    <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-3 rounded-lg">
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="text-white">
                          <SkipBack size={14} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-white"
                          onClick={() => setIsPlayingBack(!isPlayingBack)}
                        >
                          {isPlayingBack ? <Pause size={14} /> : <Play size={14} />}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-white">
                          <SkipForward size={14} />
                        </Button>
                        <div className="flex-1 mx-4">
                          <Slider
                            value={currentTime}
                            onValueChange={setCurrentTime}
                            max={100}
                            min={0}
                            step={1}
                            className="w-full"
                          />
                        </div>
                        <span className="text-xs">Speed: {playbackSpeed[0]}x</span>
                      </div>
                    </div>
                  </div>
                )}

                {viewMode === "ar" && (
                  <div className="flex items-center justify-center h-full bg-gradient-to-br from-purple-900 to-pink-900 text-white relative">
                    <div className="text-center z-10">
                      <Camera size={64} className="mx-auto mb-4 opacity-60" />
                      <h3 className="text-xl font-semibold mb-2">AR Fleet Visualization</h3>
                      <p className="text-sm opacity-80 mb-6 max-w-md">
                        Point your device camera at the operational area to see real-time drone overlays,
                        trajectories, and contextual information anchored to the real world.
                      </p>
                      <div className="space-y-3">
                        <Button 
                          className="w-48"
                          onClick={() => setArEnabled(!arEnabled)}
                        >
                          <Camera className="mr-2" size={16} />
                          {arEnabled ? 'Stop AR Camera' : 'Enable AR Camera'}
                        </Button>
                        <div className="text-xs space-y-1">
                          <div>• Real-time drone position overlays</div>
                          <div>• Predictive trajectory visualization</div>
                          <div>• Geofence and NFZ boundaries</div>
                          <div>• Distance and altitude indicators</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* AR Controls Overlay */}
                    <div className="absolute top-4 right-4 bg-black/70 p-3 rounded-lg text-sm space-y-2">
                      <div className="flex items-center gap-2">
                        <Label className="text-white">X-Ray Mode</Label>
                        <Switch 
                          checked={showXRayMode}
                          onCheckedChange={setShowXRayMode}
                        />
                      </div>
                      <div>
                        <Label className="text-white text-xs">Distance Filter: {arDistanceFilter[0]}m</Label>
                        <Slider
                          value={arDistanceFilter}
                          onValueChange={setArDistanceFilter}
                          max={5000}
                          min={100}
                          step={100}
                          className="w-32 mt-1"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {viewMode === "satellite" && (
                  <div className="flex items-center justify-center h-full bg-gradient-to-br from-green-800 to-blue-900 text-white">
                    <div className="text-center">
                      <Map size={64} className="mx-auto mb-4 opacity-60" />
                      <h3 className="text-xl font-semibold mb-2">High-Resolution Satellite View</h3>
                      <p className="text-sm opacity-80 mb-4 max-w-md">
                        Ultra-detailed satellite imagery with real-time drone overlays
                        and terrain analysis capabilities.
                      </p>
                      <Button variant="outline" className="text-white border-white">
                        Load Satellite Data
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Controls Panel */}
        <div className="lg:col-span-2 space-y-4">
          {/* Environment Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Environment Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="terrain" 
                    checked={showTerrain}
                    onCheckedChange={setShowTerrain}
                  />
                  <Label htmlFor="terrain" className="text-sm">Terrain</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="buildings" 
                    checked={showBuildings}
                    onCheckedChange={setShowBuildings}
                  />
                  <Label htmlFor="buildings" className="text-sm">Buildings</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="airspace" 
                    checked={showAirspace}
                    onCheckedChange={setShowAirspace}
                  />
                  <Label htmlFor="airspace" className="text-sm">Airspace</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="weather" 
                    checked={showWeather}
                    onCheckedChange={setShowWeather}
                  />
                  <Label htmlFor="weather" className="text-sm">Weather</Label>
                </div>
              </div>
              
              <div>
                <Label className="text-sm">Time of Day: {String(Math.floor(timeOfDay[0])).padStart(2, '0')}:00</Label>
                <Slider
                  value={timeOfDay}
                  onValueChange={setTimeOfDay}
                  max={24}
                  min={0}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-sm">Weather Condition</Label>
                <select 
                  value={weatherCondition}
                  onChange={(e) => setWeatherCondition(e.target.value)}
                  className="w-full mt-1 p-2 border rounded text-sm"
                >
                  <option value="sunny">Sunny</option>
                  <option value="cloudy">Cloudy</option>
                  <option value="rainy">Rainy</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Trajectory Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Navigation className="w-5 h-5" />
                Trajectory Visualization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="historical" 
                    checked={showHistoricalTrails}
                    onCheckedChange={setShowHistoricalTrails}
                  />
                  <Label htmlFor="historical" className="text-sm">Historical Trails</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="predictive" 
                    checked={showPredictiveTrajectory}
                    onCheckedChange={setShowPredictiveTrajectory}
                  />
                  <Label htmlFor="predictive" className="text-sm">Predictive Path</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="mission" 
                    checked={showMissionPaths}
                    onCheckedChange={setShowMissionPaths}
                  />
                  <Label htmlFor="mission" className="text-sm">Mission Paths</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="altitude" 
                    checked={showAltitudeProfile}
                    onCheckedChange={setShowAltitudeProfile}
                  />
                  <Label htmlFor="altitude" className="text-sm">Altitude Profile</Label>
                </div>
              </div>

              <div>
                <Label className="text-sm">Trail Duration: {trailDuration[0]} minutes</Label>
                <Slider
                  value={trailDuration}
                  onValueChange={setTrailDuration}
                  max={120}
                  min={5}
                  step={5}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Drone Details Panel */}
          {selectedDrone && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Plane className="w-5 h-5" />
                  Drone Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const drone = devices.find(d => d.id === selectedDrone);
                  if (!drone) return null;
                  
                  return (
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium">{drone.name}</div>
                        <div className="text-sm text-muted-foreground">{drone.droneId}</div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Status</span>
                          <Badge 
                            variant="outline"
                            style={{ color: getStatusColor(drone.status) }}
                          >
                            {drone.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span>Battery</span>
                          <div className="flex items-center gap-1">
                            <Battery size={14} className={drone.battery < 20 ? "text-red-500" : "text-muted-foreground"} />
                            <span>{drone.battery}%</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span>Altitude</span>
                          <span>{Math.floor(Math.random() * 200)}m AGL</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span>Speed</span>
                          <span>{Math.floor(Math.random() * 50)} km/h</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span>Location</span>
                          <div className="flex items-center gap-1">
                            <MapPin size={12} />
                            <span className="text-xs">{drone.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 space-y-2">
                        <Button 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleFollowDrone(drone.id)}
                        >
                          <Focus size={14} className="mr-1" />
                          Follow Drone
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          <Compass size={14} className="mr-1" />
                          Go To Location
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          View Mission Details
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          )}

          {/* Fleet Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Fleet Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Total Drones</span>
                <Badge variant="secondary">{devices.length}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>In Flight</span>
                <Badge className="bg-blue-100 text-blue-800">
                  {devices.filter(d => d.status === "In Flight").length}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Online</span>
                <Badge className="bg-green-100 text-green-800">
                  {devices.filter(d => d.status === "Online").length}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Issues</span>
                <Badge className="bg-yellow-100 text-yellow-800">
                  {devices.filter(d => d.status === "Connection Issues").length}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Offline</span>
                <Badge className="bg-red-100 text-red-800">
                  {devices.filter(d => d.status === "Offline").length}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FleetVisualization;
