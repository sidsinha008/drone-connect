
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Shield, Brain, MapPin, CloudUpload, Plus } from "lucide-react";
import SwarmConfigurationWizard from "./IntelligentSwarmMission/SwarmConfigurationWizard";
import SwarmDashboard from "./IntelligentSwarmMission/SwarmDashboard";
import SwarmRealTimeMonitoring from "./IntelligentSwarmMission/SwarmRealTimeMonitoring";
import SwarmMissionPlanningDashboard from "./IntelligentSwarmMission/SwarmMissionPlanningDashboard";

interface IntelligentSwarmMissionProps {
  onBack: () => void;
}

const IntelligentSwarmMission = ({ onBack }: IntelligentSwarmMissionProps) => {
  const [currentView, setCurrentView] = useState<"dashboard" | "configuration" | "monitoring" | "mission-planning">("dashboard");
  const [configuredSwarm, setConfiguredSwarm] = useState<any>(null);

  const handleSwarmConfigurationComplete = (swarmData: any) => {
    setConfiguredSwarm(swarmData);
    setCurrentView("mission-planning");
  };

  const handleCreateOTACampaign = () => {
    // This would integrate with the OTA system
    console.log("Creating OTA campaign for swarm...");
  };

  const handleCreateMission = () => {
    console.log("Creating new mission...");
  };

  const renderContent = () => {
    switch (currentView) {
      case "configuration":
        return (
          <SwarmConfigurationWizard 
            onBack={() => setCurrentView("dashboard")}
            onComplete={handleSwarmConfigurationComplete}
          />
        );
      case "monitoring":
        return <SwarmRealTimeMonitoring onBack={() => setCurrentView("dashboard")} />;
      case "mission-planning":
        return (
          <SwarmMissionPlanningDashboard
            onCreateOTACampaign={handleCreateOTACampaign}
            onCreateMission={handleCreateMission}
            swarmData={configuredSwarm}
          />
        );
      default:
        return (
          <div className="space-y-6">
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

            {/* Quick Actions */}
            <div className="flex gap-4 flex-wrap">
              <Button onClick={() => setCurrentView("configuration")} className="flex items-center gap-2">
                <Plus size={18} />
                Configure New Swarm
              </Button>
              <Button onClick={() => setCurrentView("mission-planning")} variant="outline" className="flex items-center gap-2">
                <MapPin size={18} />
                Mission Planning
              </Button>
              <Button onClick={handleCreateOTACampaign} variant="outline" className="flex items-center gap-2">
                <CloudUpload size={18} />
                Create OTA Campaign
              </Button>
            </div>

            {/* Action Cards */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setCurrentView("configuration")}>
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

              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setCurrentView("monitoring")}>
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

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Swarm Activities</CardTitle>
                <CardDescription>Latest autonomous conflict resolutions and mission updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Autonomous Conflict Resolved</p>
                        <p className="text-xs text-muted-foreground">Hyderabad Swarm Alpha - Vertical separation maintained</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">2 min ago</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Mission Completed</p>
                        <p className="text-xs text-muted-foreground">Surveillance Swarm Beta - 100% autonomous operations</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">15 min ago</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">New Swarm Configured</p>
                        <p className="text-xs text-muted-foreground">Emergency Response Swarm - 6 drones with 2m separation</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">1 hour ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" />
          Back to Fleet Apps
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Users className="text-violet-500" size={32} />
            Intelligent Swarm Mission Configuration & Orchestration
          </h1>
          <p className="text-muted-foreground">
            Advanced swarm operations with autonomous conflict resolution and safety features
          </p>
        </div>
      </div>

      {currentView === "dashboard" && (
        <SwarmDashboard 
          onConfigureNew={() => setCurrentView("configuration")}
          onMonitorLive={() => setCurrentView("monitoring")}
        />
      )}

      {renderContent()}
    </div>
  );
};

export default IntelligentSwarmMission;
