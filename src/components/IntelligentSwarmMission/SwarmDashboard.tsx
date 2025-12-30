
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, Brain, MapPin, Play, Pause, Square, Eye } from "lucide-react";

interface SwarmDashboardProps {
  onConfigureNew: () => void;
  onMonitorLive: () => void;
}

const SwarmDashboard = ({ onConfigureNew, onMonitorLive }: SwarmDashboardProps) => {
  const activeSwarms = [
    {
      id: "SW-HYD-001",
      name: "Hyderabad Emergency Response Alpha",
      status: "Active",
      drones: 6,
      mission: "Disaster Assessment",
      autonomyEvents: 12,
      safetyScore: 98,
      startTime: "14:30 IST",
      location: "HITEC City"
    },
    {
      id: "SW-CHN-002", 
      name: "Chennai Port Security Beta",
      status: "Paused",
      drones: 4,
      mission: "Perimeter Surveillance",
      autonomyEvents: 7,
      safetyScore: 96,
      startTime: "13:15 IST",
      location: "Chennai Port"
    },
    {
      id: "SW-BLR-003",
      name: "Bangalore Traffic Monitoring",
      status: "Active",
      drones: 8,
      mission: "Traffic Analysis",
      autonomyEvents: 23,
      safetyScore: 99,
      startTime: "12:00 IST",
      location: "Electronic City"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-500";
      case "Paused": return "bg-yellow-500";
      case "Completed": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active": return <Play size={12} />;
      case "Paused": return <Pause size={12} />;
      case "Completed": return <Square size={12} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={onConfigureNew}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="text-violet-500" size={24} />
              Configure New Swarm Mission
            </CardTitle>
            <CardDescription>
              Design and deploy intelligent swarm missions with autonomous conflict resolution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Set up complex multi-drone operations with advanced safety features including:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Autonomous aerodynamic conflict resolution</li>
              <li>• Configurable separation minimums</li>
              <li>• AI-driven evasive action strategies</li>
              <li>• Real-time swarm coordination</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={onMonitorLive}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="text-blue-500" size={24} />
              Live Swarm Monitoring
            </CardTitle>
            <CardDescription>
              Monitor active swarms with real-time conflict resolution visualization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Comprehensive real-time monitoring including:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Live swarm positioning and safety bubbles</li>
              <li>• Autonomous conflict event tracking</li>
              <li>• Individual drone telemetry</li>
              <li>• Emergency intervention controls</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Active Swarms */}
      <Card>
        <CardHeader>
          <CardTitle>Active Swarms</CardTitle>
          <CardDescription>Currently deployed intelligent swarms with autonomous capabilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeSwarms.map((swarm) => (
              <div key={swarm.id} className="p-4 border rounded-lg hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(swarm.status)}`}></div>
                    <div>
                      <div className="font-medium">{swarm.name}</div>
                      <div className="text-sm text-muted-foreground">{swarm.id} • {swarm.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getStatusIcon(swarm.status)}
                      {swarm.status}
                    </Badge>
                    <Button variant="outline" size="sm" onClick={onMonitorLive}>
                      <Eye size={14} className="mr-1" />
                      Monitor
                    </Button>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-muted-foreground" />
                    <span className="text-sm">{swarm.drones} Drones</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain size={16} className="text-blue-500" />
                    <span className="text-sm">{swarm.autonomyEvents} Auto Events</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-green-500" />
                    <span className="text-sm">{swarm.safetyScore}% Safety</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Started: {swarm.startTime}</span>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Mission: </span>
                    <span className="font-medium">{swarm.mission}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Swarms</p>
                <p className="text-2xl font-bold text-blue-600">3</p>
              </div>
              <Users className="text-blue-500" size={20} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Autonomous Resolutions</p>
                <p className="text-2xl font-bold text-green-600">47</p>
              </div>
              <Brain className="text-green-500" size={20} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Safety Score</p>
                <p className="text-2xl font-bold text-purple-600">98%</p>
              </div>
              <Shield className="text-purple-500" size={20} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mission Areas</p>
                <p className="text-2xl font-bold text-orange-600">5</p>
              </div>
              <MapPin className="text-orange-500" size={20} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SwarmDashboard;
