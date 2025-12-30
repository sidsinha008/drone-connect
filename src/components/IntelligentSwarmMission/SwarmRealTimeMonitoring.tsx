
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Activity,
  AlertTriangle,
  CheckCircle,
  Pause,
  Play,
  Square,
  Zap,
  Shield,
  Radio,
  MapPin,
  Clock,
  Battery,
  Signal,
  TrendingUp,
  TrendingDown,
  Eye
} from "lucide-react";

interface SwarmRealTimeMonitoringProps {
  onBack: () => void;
}

const SwarmRealTimeMonitoring = ({ onBack }: SwarmRealTimeMonitoringProps) => {
  const [autonomousEvents, setAutonomousEvents] = useState([
    {
      id: 1,
      timestamp: "04:45:20 PM IST",
      type: "conflict_resolved",
      description: "D-001 & D-002 - Autonomous Ascent",
      status: "resolved",
      drones: ["D-001", "D-002"],
      action: "Vertical separation maintained"
    },
    {
      id: 2,
      timestamp: "04:40:05 PM IST", 
      type: "conflict_resolved",
      description: "D-003 & D-005 - Autonomous Left Turn",
      status: "resolved",
      drones: ["D-003", "D-005"],
      action: "Horizontal separation maintained"
    }
  ]);

  const [swarmDrones] = useState([
    {
      id: "D-001",
      name: "Surveillance Alpha",
      function: "High-Res Surveillance",
      status: "active",
      altitude: "120m",
      speed: "10m/s",
      battery: 75,
      position: { x: 200, y: 150 },
      conflict: false,
      lastAction: null
    },
    {
      id: "D-002", 
      name: "Acoustic Monitor",
      function: "Acoustic Monitoring",
      status: "active",
      altitude: "118m",
      speed: "8m/s", 
      battery: 68,
      position: { x: 250, y: 180 },
      conflict: false,
      lastAction: "Descended 3m"
    },
    {
      id: "D-003",
      name: "Comm Relay",
      function: "Communication Relay", 
      status: "active",
      altitude: "125m",
      speed: "0m/s",
      battery: 82,
      position: { x: 300, y: 200 },
      conflict: false,
      lastAction: null
    },
    {
      id: "D-004",
      name: "Payload Delivery",
      function: "Payload Delivery",
      status: "active", 
      altitude: "115m",
      speed: "12m/s",
      battery: 54,
      position: { x: 180, y: 250 },
      conflict: false,
      lastAction: null
    }
  ]);

  const getFunctionColor = (func: string) => {
    switch (func) {
      case "High-Res Surveillance": return "bg-blue-500";
      case "Acoustic Monitoring": return "bg-orange-500";
      case "Communication Relay": return "bg-yellow-500";
      case "Payload Delivery": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Hyderabad Security Swarm 1 - Active Patrol</h1>
          <p className="text-muted-foreground">
            Real-time monitoring with autonomous conflict resolution
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Live Map Visualization */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin size={20} />
                Live Swarm Positioning - HITEC City
              </CardTitle>
              <CardDescription>
                3D visualization with safety bubbles and autonomous conflict resolution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-96 border">
                {/* Mock 3D Map Background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg"></div>
                  {/* Building representations */}
                  <div className="absolute top-16 left-20 w-16 h-20 bg-gray-600 opacity-60 rounded"></div>
                  <div className="absolute top-24 left-60 w-20 h-24 bg-gray-600 opacity-60 rounded"></div>
                  <div className="absolute bottom-16 right-20 w-18 h-22 bg-gray-600 opacity-60 rounded"></div>
                </div>

                {/* Drones with Safety Bubbles */}
                {swarmDrones.map((drone) => (
                  <div
                    key={drone.id}
                    className="absolute"
                    style={{
                      left: `${drone.position.x}px`,
                      top: `${drone.position.y}px`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {/* Safety Bubble */}
                    <div className="absolute w-16 h-16 border-2 border-green-300 rounded-full opacity-30 bg-green-100 -translate-x-1/2 -translate-y-1/2"></div>
                    
                    {/* Drone Icon */}
                    <div className={`w-8 h-8 rounded-full ${getFunctionColor(drone.function)} flex items-center justify-center text-white text-xs font-bold relative`}>
                      {drone.id.split('-')[1]}
                      
                      {/* Status indicator */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white"></div>
                      
                      {/* Last action indicator */}
                      {drone.lastAction && (
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-yellow-100 px-2 py-1 rounded whitespace-nowrap">
                          {drone.lastAction}
                        </div>
                      )}
                    </div>

                    {/* Drone Info */}
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white rounded px-2 py-1 text-xs border shadow-sm whitespace-nowrap">
                      <div className="font-medium">{drone.id}</div>
                      <div className="text-gray-600">{drone.altitude} • {drone.battery}%</div>
                    </div>
                  </div>
                ))}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg border shadow-sm">
                  <div className="text-xs font-medium mb-2">Function Colors</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Surveillance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span>Acoustic</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span>Comm Relay</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span>Delivery</span>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye size={14} className="mr-1" />
                    2D View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Pause size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Panel */}
        <div className="space-y-4">
          {/* Overall Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity size={20} />
                Swarm Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Mission Progress</span>
                  <span className="text-sm font-medium">70%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-[70%]"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Active Drones</div>
                  <div className="font-medium text-green-600">8/8</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Health Status</div>
                  <div className="font-medium">7 Green, 1 Amber</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Autonomous Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield size={20} />
                Autonomous Events Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {autonomousEvents.map((event) => (
                  <div key={event.id} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700 mb-1">
                      <CheckCircle size={14} />
                      <span className="text-xs font-medium">{event.timestamp}</span>
                    </div>
                    <div className="text-sm font-medium text-green-800">{event.description}</div>
                    <div className="text-xs text-green-600 mt-1">{event.action}</div>
                  </div>
                ))}
                
                <div className="text-center py-2">
                  <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">
                    No Unresolved Conflicts
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QoS Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Radio size={20} />
                Network QoS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <div>
                    <div className="text-sm font-medium">Critical IoT Update (Active)</div>
                    <div className="text-xs text-muted-foreground">10 Mbps guaranteed bandwidth</div>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Ensuring optimal connectivity for ongoing updates and telemetry.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Task List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap size={20} />
            Active Tasks
          </CardTitle>
          <CardDescription>Current mission tasks and their progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Perimeter Patrol</span>
                <Badge variant="outline" className="bg-blue-100 text-blue-700">80%</Badge>
              </div>
              <div className="text-xs text-muted-foreground">D-001: High-res surveillance</div>
            </div>

            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Acoustic Sweep Area B</span>
                <Badge variant="outline" className="bg-green-100 text-green-700">Active</Badge>
              </div>
              <div className="text-xs text-muted-foreground">D-002: Sound monitoring</div>
            </div>

            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Comm Relay</span>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-700">Active</Badge>
              </div>
              <div className="text-xs text-muted-foreground">D-003: Stationary orbit</div>
            </div>

            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Emergency Standby</span>
                <Badge variant="outline" className="bg-gray-100 text-gray-700">Standby</Badge>
              </div>
              <div className="text-xs text-muted-foreground">D-004: Ready for deployment</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SwarmRealTimeMonitoring;
