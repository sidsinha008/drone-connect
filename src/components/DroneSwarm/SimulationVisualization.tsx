
import React, { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Camera, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Eye, 
  EyeOff,
  FastForward,
  Rewind
} from "lucide-react";

interface SimulationVisualizationProps {
  status: string;
  progress: number;
}

const SimulationVisualization: React.FC<SimulationVisualizationProps> = ({ status, progress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraAngle, setCameraAngle] = useState([45]);
  const [zoomLevel, setZoomLevel] = useState([50]);
  const [showTrails, setShowTrails] = useState(true);
  const [showCommunication, setShowCommunication] = useState(true);
  const [simulationSpeed, setSimulationSpeed] = useState([1]);
  const [drones, setDrones] = useState<Array<{id: number, x: number, y: number, z: number, vx: number, vy: number}>>([]);

  // Initialize drones
  useEffect(() => {
    const initialDrones = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 800 + 100,
      y: Math.random() * 600 + 100,
      z: Math.random() * 100 + 50,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2
    }));
    setDrones(initialDrones);
  }, []);

  // Animation loop
  useEffect(() => {
    if (status !== "running") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = "#1e293b";
      ctx.lineWidth = 1;
      for (let i = 0; i <= canvas.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i <= canvas.height; i += 50) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Update and draw drones
      setDrones(prevDrones => {
        const updatedDrones = prevDrones.map(drone => {
          let newX = drone.x + drone.vx * simulationSpeed[0];
          let newY = drone.y + drone.vy * simulationSpeed[0];

          // Boundary collision
          if (newX <= 20 || newX >= canvas.width - 20) {
            drone.vx *= -1;
            newX = Math.max(20, Math.min(canvas.width - 20, newX));
          }
          if (newY <= 20 || newY >= canvas.height - 20) {
            drone.vy *= -1;
            newY = Math.max(20, Math.min(canvas.height - 20, newY));
          }

          return { ...drone, x: newX, y: newY };
        });

        // Draw communication lines
        if (showCommunication) {
          ctx.strokeStyle = "#3b82f640";
          ctx.lineWidth = 1;
          updatedDrones.forEach((drone, i) => {
            updatedDrones.slice(i + 1).forEach(otherDrone => {
              const distance = Math.sqrt(
                Math.pow(drone.x - otherDrone.x, 2) + 
                Math.pow(drone.y - otherDrone.y, 2)
              );
              if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(drone.x, drone.y);
                ctx.lineTo(otherDrone.x, otherDrone.y);
                ctx.stroke();
              }
            });
          });
        }

        // Draw drones
        updatedDrones.forEach(drone => {
          // Drone body
          ctx.fillStyle = "#3b82f6";
          ctx.beginPath();
          ctx.arc(drone.x, drone.y, 8, 0, Math.PI * 2);
          ctx.fill();

          // Drone propellers
          ctx.fillStyle = "#60a5fa";
          ctx.beginPath();
          ctx.arc(drone.x - 6, drone.y - 6, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(drone.x + 6, drone.y - 6, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(drone.x - 6, drone.y + 6, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(drone.x + 6, drone.y + 6, 3, 0, Math.PI * 2);
          ctx.fill();

          // Drone ID
          ctx.fillStyle = "#ffffff";
          ctx.font = "10px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(drone.id.toString(), drone.x, drone.y + 3);
        });

        return updatedDrones;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [status, simulationSpeed, showCommunication]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">3D Visualization</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Status: {status} | Progress: {progress}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Visualization */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Swarm Visualization
              </CardTitle>
              <CardDescription>
                Real-time 3D view of the drone swarm simulation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={600}
                  className="w-full border rounded-lg bg-slate-900"
                  style={{ maxHeight: "600px" }}
                />
                <div className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded text-sm">
                  Active Drones: {drones.length} | Camera: {cameraAngle[0]}° | Zoom: {zoomLevel[0]}%
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Camera Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Camera Angle: {cameraAngle[0]}°</Label>
                <Slider
                  value={cameraAngle}
                  onValueChange={setCameraAngle}
                  max={360}
                  min={0}
                  step={5}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Zoom Level: {zoomLevel[0]}%</Label>
                <Slider
                  value={zoomLevel}
                  onValueChange={setZoomLevel}
                  max={200}
                  min={10}
                  step={10}
                  className="mt-2"
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">View Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="show-trails" 
                  checked={showTrails}
                  onCheckedChange={setShowTrails}
                />
                <Label htmlFor="show-trails">Flight Trails</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch 
                  id="show-communication" 
                  checked={showCommunication}
                  onCheckedChange={setShowCommunication}
                />
                <Label htmlFor="show-communication">Communication Links</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="show-sensors" defaultChecked />
                <Label htmlFor="show-sensors">Sensor Fields</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="show-formation" defaultChecked />
                <Label htmlFor="show-formation">Formation Lines</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Simulation Speed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Speed: {simulationSpeed[0]}x</Label>
                <Slider
                  value={simulationSpeed}
                  onValueChange={setSimulationSpeed}
                  max={5}
                  min={0.1}
                  step={0.1}
                  className="mt-2"
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Rewind className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <FastForward className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SimulationVisualization;
