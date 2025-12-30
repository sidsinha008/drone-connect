
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Settings, 
  Eye, 
  BarChart3,
  Zap,
  Save,
  Upload,
  Truck,
  Radio,
  CloudUpload,
  Image,
  Target
} from "lucide-react";
import SimulationConfiguration from "./DroneSwarm/SimulationConfiguration";
import PatternConfiguration from "./DroneSwarm/PatternConfiguration";
import DroneRecommendation from "./DroneSwarm/DroneRecommendation";
import SimulationVisualization from "./DroneSwarm/SimulationVisualization";
import SimulationDashboard from "./DroneSwarm/SimulationDashboard";
import SimulationResults from "./DroneSwarm/SimulationResults";
import FleetOverview from "./DroneSwarm/FleetOverview";
import OTACampaignManager from "./DroneSwarm/OTACampaignManager";

type SimulationStatus = "idle" | "running" | "paused" | "completed" | "error";

const DroneSwarm = () => {
  const [activeTab, setActiveTab] = useState("config");
  const [simulationStatus, setSimulationStatus] = useState<SimulationStatus>("idle");
  const [simulationProgress, setSimulationProgress] = useState(0);

  const handleStartSimulation = () => {
    setSimulationStatus("running");
    setActiveTab("visualization");
    // Simulate progress
    const interval = setInterval(() => {
      setSimulationProgress(prev => {
        if (prev >= 100) {
          setSimulationStatus("completed");
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 100);
  };

  const handlePauseSimulation = () => {
    setSimulationStatus("paused");
  };

  const handleResumeSimulation = () => {
    setSimulationStatus("running");
  };

  const handleStopSimulation = () => {
    setSimulationStatus("idle");
    setSimulationProgress(0);
  };

  const handleResetSimulation = () => {
    setSimulationStatus("idle");
    setSimulationProgress(0);
    setActiveTab("config");
  };

  const getStatusColor = (status: SimulationStatus) => {
    switch (status) {
      case "running": return "bg-green-500";
      case "paused": return "bg-yellow-500";
      case "completed": return "bg-blue-500";
      case "error": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: SimulationStatus) => {
    switch (status) {
      case "running": return "Running";
      case "paused": return "Paused";
      case "completed": return "Completed";
      case "error": return "Error";
      default: return "Idle";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Advanced Drone Swarm Platform</h1>
          <p className="text-muted-foreground">
            Integrated simulation, pattern configuration, intelligent recommendations, and OTA deployment
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className={`${getStatusColor(simulationStatus)} text-white`}>
            {getStatusText(simulationStatus)}
          </Badge>
          {simulationProgress > 0 && (
            <div className="text-sm text-muted-foreground">
              Progress: {simulationProgress}%
            </div>
          )}
        </div>
      </div>

      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Platform Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 flex-wrap">
            {simulationStatus === "idle" && (
              <Button onClick={handleStartSimulation} className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Start Simulation
              </Button>
            )}
            {simulationStatus === "running" && (
              <Button onClick={handlePauseSimulation} variant="outline" className="flex items-center gap-2">
                <Pause className="w-4 h-4" />
                Pause
              </Button>
            )}
            {simulationStatus === "paused" && (
              <Button onClick={handleResumeSimulation} className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Resume
              </Button>
            )}
            {(simulationStatus === "running" || simulationStatus === "paused") && (
              <Button onClick={handleStopSimulation} variant="destructive" className="flex items-center gap-2">
                <Square className="w-4 h-4" />
                Stop
              </Button>
            )}
            <Button onClick={handleResetSimulation} variant="outline" className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Config
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Load Config
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="config" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Config
          </TabsTrigger>
          <TabsTrigger value="patterns" className="flex items-center gap-2">
            <Image className="w-4 h-4" />
            Patterns
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            AI Recommend
          </TabsTrigger>
          <TabsTrigger value="visualization" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Visualization
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Results
          </TabsTrigger>
          <TabsTrigger value="fleet" className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Fleet
          </TabsTrigger>
          <TabsTrigger value="ota" className="flex items-center gap-2">
            <CloudUpload className="w-4 h-4" />
            OTA
          </TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="space-y-6">
          <SimulationConfiguration />
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          <PatternConfiguration />
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <DroneRecommendation />
        </TabsContent>

        <TabsContent value="visualization" className="space-y-6">
          <SimulationVisualization 
            status={simulationStatus}
            progress={simulationProgress}
          />
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-6">
          <SimulationDashboard 
            status={simulationStatus}
            progress={simulationProgress}
          />
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <SimulationResults />
        </TabsContent>

        <TabsContent value="fleet" className="space-y-6">
          <FleetOverview />
        </TabsContent>

        <TabsContent value="ota" className="space-y-6">
          <OTACampaignManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DroneSwarm;
