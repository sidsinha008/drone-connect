import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  GripVertical,
  Save,
  Eye,
  Target,
  Package,
  Shield,
  Plane,
  Search
} from "lucide-react";

interface MissionType {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  metrics: string[];
}

interface Metric {
  id: string;
  name: string;
  category: string;
  description: string;
  mandatory: boolean;
}

const availableMetrics: Metric[] = [
  // Core Metrics (Mandatory)
  { id: "flight_time", name: "Flight Time", category: "Core", description: "Total flight duration", mandatory: true },
  { id: "battery_level", name: "Battery Level", category: "Core", description: "Current battery percentage", mandatory: true },
  { id: "gps_accuracy", name: "GPS Accuracy", category: "Core", description: "GPS signal accuracy", mandatory: true },
  
  // Performance Metrics
  { id: "flight_hours", name: "Flight Hours", category: "Performance", description: "Cumulative flight hours", mandatory: false },
  { id: "battery_cycles", name: "Battery Cycles", category: "Performance", description: "Number of charge cycles", mandatory: false },
  { id: "motor_rpm", name: "Motor RPM", category: "Performance", description: "Motor rotations per minute", mandatory: false },
  { id: "average_speed", name: "Average Speed", category: "Performance", description: "Average flight speed", mandatory: false },
  { id: "max_altitude", name: "Maximum Altitude", category: "Performance", description: "Peak altitude reached", mandatory: false },
  
  // Mission-Specific Metrics
  { id: "delivery_success_rate", name: "Delivery Success Rate", category: "Mission", description: "Successful delivery percentage", mandatory: false },
  { id: "inspection_coverage", name: "Inspection Coverage", category: "Mission", description: "Area coverage percentage", mandatory: false },
  { id: "patrol_efficiency", name: "Patrol Efficiency", category: "Mission", description: "Security patrol effectiveness", mandatory: false },
  { id: "spray_accuracy", name: "Spray Accuracy", category: "Mission", description: "Agricultural spray precision", mandatory: false },
  { id: "search_time", name: "Search Time", category: "Mission", description: "Time to locate target", mandatory: false },
  
  // Health & Maintenance
  { id: "component_health", name: "Component Health", category: "Health", description: "Overall component condition", mandatory: false },
  { id: "thermal_readings", name: "Thermal Sensor Readings", category: "Health", description: "Temperature measurements", mandatory: false },
  { id: "vibration_levels", name: "Vibration Levels", category: "Health", description: "Motor vibration analysis", mandatory: false },
  { id: "predicted_rul", name: "Predicted RUL", category: "Health", description: "Remaining useful life estimate", mandatory: false },
  { id: "anomaly_count", name: "Anomaly Count", category: "Health", description: "Number of detected anomalies", mandatory: false },
  
  // Payload & Sensors
  { id: "payload_weight", name: "Payload Weight", category: "Payload", description: "Current payload mass", mandatory: false },
  { id: "camera_quality", name: "Camera Quality", category: "Payload", description: "Image/video quality metrics", mandatory: false },
  { id: "sensor_accuracy", name: "Sensor Accuracy", category: "Payload", description: "Sensor measurement precision", mandatory: false }
];

const defaultMissionTypes: MissionType[] = [
  {
    id: "inspection",
    name: "Inspection Survey",
    description: "Infrastructure and asset inspection missions",
    icon: Search,
    color: "bg-blue-500",
    metrics: ["flight_time", "battery_level", "gps_accuracy", "inspection_coverage", "camera_quality", "component_health"]
  },
  {
    id: "delivery",
    name: "Delivery Logistics",
    description: "Package and cargo delivery operations",
    icon: Package,
    color: "bg-green-500",
    metrics: ["flight_time", "battery_level", "gps_accuracy", "delivery_success_rate", "payload_weight", "average_speed"]
  },
  {
    id: "security",
    name: "Security Patrol",
    description: "Surveillance and security monitoring",
    icon: Shield,
    color: "bg-red-500",
    metrics: ["flight_time", "battery_level", "gps_accuracy", "patrol_efficiency", "thermal_readings", "anomaly_count"]
  },
  {
    id: "agricultural",
    name: "Agricultural Spraying",
    description: "Crop spraying and agricultural monitoring",
    icon: Target,
    color: "bg-yellow-500",
    metrics: ["flight_time", "battery_level", "gps_accuracy", "spray_accuracy", "payload_weight", "inspection_coverage"]
  },
  {
    id: "rescue",
    name: "Search & Rescue",
    description: "Emergency response and search operations",
    icon: Plane,
    color: "bg-purple-500",
    metrics: ["flight_time", "battery_level", "gps_accuracy", "search_time", "thermal_readings", "max_altitude"]
  }
];

interface MissionTypeConfigurationProps {
  onConfigurationChange: (config: any) => void;
}

const MissionTypeConfiguration = ({ onConfigurationChange }: MissionTypeConfigurationProps) => {
  const [missionTypes, setMissionTypes] = useState<MissionType[]>(defaultMissionTypes);
  const [editingMission, setEditingMission] = useState<MissionType | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [activeTab, setActiveTab] = useState("manage");
  
  const handleMetricToggle = (missionId: string, metricId: string) => {
    setMissionTypes(prev => prev.map(mission => {
      if (mission.id === missionId) {
        const updatedMetrics = mission.metrics.includes(metricId)
          ? mission.metrics.filter(m => m !== metricId)
          : [...mission.metrics, metricId];
        return { ...mission, metrics: updatedMetrics };
      }
      return mission;
    }));
  };

  const handleSaveConfiguration = () => {
    onConfigurationChange({ missionTypes, availableMetrics });
    setActiveTab("manage");
  };

  const getMetricsByCategory = (category: string) => {
    return availableMetrics.filter(metric => metric.category === category);
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Mission Type & Metrics Configuration
        </CardTitle>
        <CardDescription>
          Configure drone analytics metrics for different mission types
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manage">Manage Mission Types</TabsTrigger>
            <TabsTrigger value="configure">Configure Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="manage" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Mission Types</h3>
              <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus size={16} />
                    Add New Mission Type
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Mission Type</DialogTitle>
                    <DialogDescription>
                      Define a new mission type with custom metrics
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input placeholder="Mission Type Name" />
                    <Textarea placeholder="Description" />
                    <Button onClick={() => setIsAddingNew(false)}>Create Mission Type</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {missionTypes.map((mission) => {
                const Icon = mission.icon;
                return (
                  <Card key={mission.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${mission.color} text-white`}>
                            <Icon size={20} />
                          </div>
                          <div>
                            <h4 className="font-semibold">{mission.name}</h4>
                            <p className="text-sm text-muted-foreground">{mission.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit size={14} />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {mission.metrics.map(metricId => {
                          const metric = availableMetrics.find(m => m.id === metricId);
                          return metric ? (
                            <Badge key={metricId} variant="secondary" className="text-xs">
                              {metric.name}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="configure" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Configure Metrics by Mission Type</h3>
              <Button onClick={handleSaveConfiguration} className="flex items-center gap-2">
                <Save size={16} />
                Save Configuration
              </Button>
            </div>

            {missionTypes.map((mission) => {
              const Icon = mission.icon;
              return (
                <Card key={mission.id} className="border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${mission.color} text-white`}>
                        <Icon size={20} />
                      </div>
                      {mission.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {["Core", "Performance", "Mission", "Health", "Payload"].map(category => (
                        <div key={category}>
                          <h4 className="font-medium mb-3 text-sm text-muted-foreground uppercase tracking-wide">
                            {category} Metrics
                          </h4>
                          <div className="grid gap-3 md:grid-cols-2">
                            {getMetricsByCategory(category).map((metric) => (
                              <div key={metric.id} className="flex items-center space-x-3 p-3 rounded-lg border bg-card">
                                <Checkbox
                                  id={`${mission.id}-${metric.id}`}
                                  checked={mission.metrics.includes(metric.id)}
                                  onCheckedChange={() => handleMetricToggle(mission.id, metric.id)}
                                  disabled={metric.mandatory}
                                />
                                <div className="flex-1">
                                  <label htmlFor={`${mission.id}-${metric.id}`} className="font-medium cursor-pointer">
                                    {metric.name}
                                    {metric.mandatory && (
                                      <Badge variant="outline" className="ml-2 text-xs">Required</Badge>
                                    )}
                                  </label>
                                  <p className="text-sm text-muted-foreground">{metric.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MissionTypeConfiguration;
