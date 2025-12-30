
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  CloudUpload, 
  Plus, 
  Play,
  Pause,
  Square,
  Eye,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Settings,
  Zap,
  Upload
} from "lucide-react";

const OTACampaignManager = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);

  const campaigns = [
    {
      id: "camp-001",
      name: "Efficient Search Algorithm v2.0 Deployment",
      description: "Deploy optimized search pattern from Simulation Run #15",
      status: "running",
      progress: 67,
      targetDrones: 45,
      completedDrones: 30,
      failedDrones: 2,
      createdDate: "2024-01-15",
      scheduledDate: "2024-01-16 02:00",
      softwareVersion: "v2.1.5-search-opt",
      simulationSource: "Simulation Run #15 - Urban Search Pattern"
    },
    {
      id: "camp-002", 
      name: "Formation Flight Enhancement",
      description: "Enhanced formation algorithms based on simulation results",
      status: "scheduled",
      progress: 0,
      targetDrones: 78,
      completedDrones: 0,
      failedDrones: 0,
      createdDate: "2024-01-14",
      scheduledDate: "2024-01-17 01:00",
      softwareVersion: "v2.1.6-formation-enh",
      simulationSource: "Simulation Run #12 - Formation Accuracy Test"
    },
    {
      id: "camp-003",
      name: "Security Patch v2.0.9",
      description: "Critical security updates for all drone models",
      status: "completed",
      progress: 100,
      targetDrones: 156,
      completedDrones: 154,
      failedDrones: 2,
      createdDate: "2024-01-10",
      scheduledDate: "2024-01-12 03:00",
      softwareVersion: "v2.0.9-security",
      simulationSource: null
    }
  ];

  const availableSimulations = [
    { id: "sim-015", name: "Urban Search Pattern", algorithm: "Efficient Search Algorithm v2.0", score: 94 },
    { id: "sim-012", name: "Formation Accuracy Test", algorithm: "Enhanced Formation Control", score: 91 },
    { id: "sim-008", name: "Swarm Communication Test", algorithm: "Mesh Network Protocol v3.1", score: 88 },
    { id: "sim-020", name: "Battery Optimization", algorithm: "Power Management v1.5", score: 96 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "bg-blue-500";
      case "completed": return "bg-green-500";
      case "scheduled": return "bg-orange-500";
      case "failed": return "bg-red-500";
      case "paused": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running": return <Play className="w-4 h-4" />;
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "scheduled": return <Clock className="w-4 h-4" />;
      case "failed": return <AlertTriangle className="w-4 h-4" />;
      case "paused": return <Pause className="w-4 h-4" />;
      default: return <Square className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">OTA Campaign Manager</h2>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create New Campaign
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Campaign Overview</TabsTrigger>
          <TabsTrigger value="create">Create Campaign</TabsTrigger>
          <TabsTrigger value="monitor">Monitor Active</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedCampaign(campaign.id)}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{campaign.name}</CardTitle>
                    <Badge className={`${getStatusColor(campaign.status)} text-white flex items-center gap-1`}>
                      {getStatusIcon(campaign.status)}
                      {campaign.status}
                    </Badge>
                  </div>
                  <CardDescription>{campaign.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {campaign.status === "running" && (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{campaign.progress}%</span>
                      </div>
                      <Progress value={campaign.progress} />
                    </div>
                  )}
                  
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-lg font-bold">{campaign.targetDrones}</p>
                      <p className="text-xs text-muted-foreground">Target</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-green-500">{campaign.completedDrones}</p>
                      <p className="text-xs text-muted-foreground">Complete</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-red-500">{campaign.failedDrones}</p>
                      <p className="text-xs text-muted-foreground">Failed</p>
                    </div>
                  </div>

                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Software: {campaign.softwareVersion}</p>
                    <p>Scheduled: {campaign.scheduledDate}</p>
                    {campaign.simulationSource && (
                      <p className="text-blue-600">From: {campaign.simulationSource}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CloudUpload className="w-5 h-5" />
                Create OTA Campaign
              </CardTitle>
              <CardDescription>
                Deploy simulation patterns or software updates to your drone fleet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="campaign-name">Campaign Name</Label>
                    <Input id="campaign-name" placeholder="Enter campaign name" />
                  </div>
                  
                  <div>
                    <Label htmlFor="campaign-description">Description</Label>
                    <Textarea id="campaign-description" placeholder="Describe the campaign purpose" />
                  </div>

                  <div>
                    <Label>Deployment Source</Label>
                    <Tabs defaultValue="simulation" className="mt-2">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="simulation">From Simulation</TabsTrigger>
                        <TabsTrigger value="manual">Manual Upload</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="simulation" className="space-y-4">
                        <div>
                          <Label>Select Simulation Pattern</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose successful simulation..." />
                            </SelectTrigger>
                            <SelectContent>
                              {availableSimulations.map(sim => (
                                <SelectItem key={sim.id} value={sim.id}>
                                  <div className="flex items-center justify-between w-full">
                                    <span>{sim.name} - {sim.algorithm}</span>
                                    <Badge variant="outline" className="ml-2">Score: {sim.score}%</Badge>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <Card className="p-4 bg-blue-50 dark:bg-blue-950">
                          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                            <Zap className="w-4 h-4" />
                            <span className="font-medium">Simulation to Deployment</span>
                          </div>
                          <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                            Selected pattern will be packaged as firmware update v2.1.5-search-opt
                          </p>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="manual" className="space-y-4">
                        <div>
                          <Label>Software Package</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-gray-600">Drop firmware file here or click to upload</p>
                            <Button variant="outline" className="mt-2">Browse Files</Button>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Target Selection</Label>
                    <div className="space-y-3 mt-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="all-drones" />
                        <Label htmlFor="all-drones">All Connected Drones (234)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="model-filter" />
                        <Label htmlFor="model-filter">Filter by Model</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="location-filter" />
                        <Label htmlFor="location-filter">Filter by Location</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="group-selection" defaultChecked />
                        <Label htmlFor="group-selection">Use Custom Group</Label>
                      </div>
                    </div>
                    
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select drone group..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="search-team">Search Team Alpha (45 drones)</SelectItem>
                        <SelectItem value="patrol-beta">Patrol Beta Group (23 drones)</SelectItem>
                        <SelectItem value="sector-a">Sector A Fleet (67 drones)</SelectItem>
                        <SelectItem value="test-group">Test Group Charlie (12 drones)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Deployment Schedule</Label>
                    <div className="space-y-3 mt-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="immediate" />
                        <Label htmlFor="immediate">Deploy Immediately</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="scheduled" defaultChecked />
                        <Label htmlFor="scheduled">Schedule Deployment</Label>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <Input type="date" defaultValue="2024-01-17" />
                      <Input type="time" defaultValue="02:00" />
                    </div>
                  </div>

                  <div>
                    <Label>Rollout Strategy</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select rollout strategy..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-at-once">All at Once (High Risk)</SelectItem>
                        <SelectItem value="staged-25">Staged: 25% → 100% (Recommended)</SelectItem>
                        <SelectItem value="staged-10">Staged: 10% → 50% → 100% (Low Risk)</SelectItem>
                        <SelectItem value="canary">Canary: 5% → Manual Approval</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="auto-rollback" defaultChecked />
                    <Label htmlFor="auto-rollback">Enable Auto-Rollback on greater than 10% Failure Rate</Label>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button className="flex items-center gap-2">
                  <CloudUpload className="w-4 h-4" />
                  Create Campaign
                </Button>
                <Button variant="outline">Save as Draft</Button>
                <Button variant="outline">Validate Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitor" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Active Campaigns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns.filter(c => c.status === "running").map(campaign => (
                    <div key={campaign.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{campaign.name}</h4>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Pause className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Square className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <RotateCcw className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <Progress value={campaign.progress} className="mb-2" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{campaign.completedDrones}/{campaign.targetDrones} completed</span>
                        <span>{campaign.failedDrones} failed</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Alerts & Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border border-yellow-300 bg-yellow-50 dark:bg-yellow-950 rounded">
                    <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="font-medium">High Failure Rate Detected</span>
                    </div>
                    <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                      Campaign "Efficient Search v2.0" has 4.4% failure rate in Sector B drones
                    </p>
                  </div>
                  
                  <div className="p-3 border border-blue-300 bg-blue-50 dark:bg-blue-950 rounded">
                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium">Rollout Phase Complete</span>
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                      First stage (25%) of Formation Enhancement completed successfully
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OTACampaignManager;
