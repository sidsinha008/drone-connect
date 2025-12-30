import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Folder, 
  Users,
  Settings,
  Upload,
  CheckCircle,
  Clock,
  AlertTriangle,
  Zap,
  Wifi,
  Pause, 
  Square, 
  Eye,
  BarChart,
  Bot,
  Brain,
  Shield,
  Activity
} from "lucide-react";
import OTAWorkflowWizard from './OTAUpdates/OTAWorkflowWizard';
import CybersecurityBadge from './OTAUpdates/CybersecurityBadge';
import CampaignDetailsModal from './OTAUpdates/CampaignDetailsModal';
import AnalyticsDashboard from './OTAUpdates/AnalyticsDashboard';
import EnhancedAnalyticsDashboard from './OTAUpdates/EnhancedAnalyticsDashboard';
import SecureFirmwareManagement from './OTAUpdates/SecureFirmwareManagement';
import QoDCampaignManager from './OTAUpdates/QoDCampaignManager';

interface Firmware {
  version: string;
  cybersecurityScore: number;
}

interface ChatMessage {
    user: 'AI' | 'You';
    text: string;
}

interface Campaign {
  id: string;
  name: string;
  desc: string;
  state: "active" | "failed" | "scheduled" | "completed";
  targets: string;
  prog: number;
  error: boolean;
  qosProfile: string | null;
  qosActive: boolean;
  qosTerminated: boolean;
  acknowledgeReceived: boolean;
  bandwidthUsage: number;
  cost: number;
  firmware: Firmware;
  chat: ChatMessage[];
  qosSessionId?: string;
  qosActualParams?: string;
  estimatedCost?: string;
}

interface QoDCampaign {
  id: string;
  name: string;
  status: "active" | "completed" | "failed" | "paused";
  progress: number;
  qosProfile: string;
  qosSessionId: string;
  qosStatus: "active" | "terminated" | "failed";
  actualBandwidth: string;
  actualLatency: string;
  qosStartTime: string;
  estimatedEndTime: string;
  actualCost: number;
  targetDrones: number;
  completedDrones: number;
  failedDrones: number;
}

const mockBatches = [
  { id: 'batch1', name: 'Chennai-North Depot Drones', count: 12, criteria: ['Model: X Pro', 'Location: Chennai-North'] },
  { id: 'batch2', name: 'Alpha Test Group', count: 5, criteria: ['Tag: alpha-test'] },
  { id: 'batch3', name: 'Outdated Firmware', count: 23, criteria: ['Firmware < v2.3.0', 'Dynamic'] },
];

const initialCampaigns: Campaign[] = [
  { id: "camp1", name: "Firmware v2.3.1", desc: "Critical security update", state: "active", targets: "Batch: Alpha Test Group", prog: 84, error: false, qosProfile: "High Throughput for Critical Updates", qosActive: true, qosTerminated: false, acknowledgeReceived: false, bandwidthUsage: 25.6, cost: 150.75, firmware: { version: "v2.3.1", cybersecurityScore: 92 }, chat: [{ user: "AI", text: "High bandwidth usage detected. Suggest optimizing package size." }] },
  { id: "camp2", name: "Pilot Camera Fix", desc: "Camera driver patch", state: "scheduled", targets: "Batch: Chennai-North Depot", prog: 0, error: false, qosProfile: null, qosActive: false, qosTerminated: false, acknowledgeReceived: false, bandwidthUsage: 5.2, cost: 25.50, firmware: { version: "v1.8.2", cybersecurityScore: 78 }, chat: [{ user: "AI", text: "This is a low-risk patch." }] },
  { id: "camp3", name: "Downgrade - emergency", desc: "Rollback to v2.2", state: "failed", targets: "Batch: Outdated Firmware", prog: 67, error: true, qosProfile: "Low Latency for Real-time Control", qosActive: false, qosTerminated: false, acknowledgeReceived: false, bandwidthUsage: 12.1, cost: 98.00, firmware: { version: "v2.2.0", cybersecurityScore: 65 }, chat: [{ user: "AI", text: "Rollback failed due to network instability. Check drone logs." }] }
];

const initialQoDCampaigns: QoDCampaign[] = [
  {
    id: "qod1",
    name: "Chennai Fleet Security Update",
    status: "active",
    progress: 76,
    qosProfile: "Critical IoT Update",
    qosSessionId: "qos-session-1734285729123",
    qosStatus: "active",
    actualBandwidth: "10 Mbps",
    actualLatency: "45ms",
    qosStartTime: "2024-12-15 14:30:00",
    estimatedEndTime: "2024-12-15 16:30:00",
    actualCost: 850.25,
    targetDrones: 25,
    completedDrones: 19,
    failedDrones: 1
  },
  {
    id: "qod2", 
    name: "Navigation Enhancement Rollout",
    status: "completed",
    progress: 100,
    qosProfile: "High-Throughput Data Transfer", 
    qosSessionId: "qos-session-1734275629123",
    qosStatus: "terminated",
    actualBandwidth: "25 Mbps",
    actualLatency: "28ms",
    qosStartTime: "2024-12-15 10:00:00",
    estimatedEndTime: "2024-12-15 12:00:00",
    actualCost: 1500.00,
    targetDrones: 15,
    completedDrones: 15,
    failedDrones: 0
  }
];

const OTAUpdates = () => {
  const [showBatchCreation, setShowBatchCreation] = useState(false);
  const [showCampaignCreation, setShowCampaignCreation] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showWorkflowWizard, setShowWorkflowWizard] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [qodCampaigns, setQoDCampaigns] = useState<QoDCampaign[]>(initialQoDCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const { toast } = useToast();

  const getCampaignStatusColor = (state: string) => {
    switch (state) {
      case "active": return "bg-blue-100 text-blue-700";
      case "failed": return "bg-red-100 text-red-700";
      case "scheduled": return "bg-yellow-100 text-yellow-700";
      case "completed": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const handleWorkflowComplete = (batchData: any, campaignData: any) => {
    console.log('Workflow completed:', { batchData, campaignData });
    
    // Create new campaign from wizard data
    const newCampaign: Campaign = {
      id: `camp-${Date.now()}`,
      name: campaignData.name,
      desc: `Update: ${campaignData.updateType}`,
      state: "active",
      targets: `Batch: ${batchData.name}`,
      prog: 0,
      error: false,
      qosProfile: campaignData.qosProfile,
      qosActive: campaignData.enableQoS,
      qosTerminated: false,
      acknowledgeReceived: false,
      bandwidthUsage: Math.round((Math.random() * 30 + 5) * 10) / 10,
      cost: Math.round((Math.random() * 200 + 20) * 100) / 100,
      firmware: {
        version: campaignData.updateType.split(' ')[1] || 'v3.0.0',
        cybersecurityScore: Math.floor(Math.random() * 30 + 70),
      },
      chat: [{ user: 'AI', text: 'Campaign initiated successfully. Monitoring deployment.' }],
      qosSessionId: campaignData.qosSessionId,
      qosActualParams: campaignData.qosActualParams,
      estimatedCost: campaignData.estimatedCost
    };

    // Add to campaigns
    setCampaigns(prev => [...prev, newCampaign]);

    // If QoS is enabled, also create a QoD campaign
    if (campaignData.enableQoS && campaignData.qosSessionId) {
      const newQoDCampaign: QoDCampaign = {
        id: `qod-${Date.now()}`,
        name: campaignData.name,
        status: "active",
        progress: 0,
        qosProfile: campaignData.selectedQoSProfile?.name || campaignData.qosProfile,
        qosSessionId: campaignData.qosSessionId,
        qosStatus: "active",
        actualBandwidth: campaignData.selectedQoSProfile?.guaranteedBandwidth || "10 Mbps",
        actualLatency: campaignData.selectedQoSProfile?.latency || "< 50ms",
        qosStartTime: new Date().toLocaleString(),
        estimatedEndTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toLocaleString(),
        actualCost: 0,
        targetDrones: batchData.selectedDrones.length,
        completedDrones: 0,
        failedDrones: 0
      };
      setQoDCampaigns(prev => [...prev, newQoDCampaign]);

      toast({
        title: "QoD Campaign Initiated",
        description: `Network QoS activated for ${campaignData.name}`,
      });
    }
    
    setShowWorkflowWizard(false);
    setActiveTab("qod-monitor");
    
    // Start campaign simulation
    const interval = setInterval(() => {
      setCampaigns(prevCampaigns => {
        const updatedCampaigns = [...prevCampaigns];
        const campaignIndex = updatedCampaigns.findIndex(c => c.id === newCampaign.id);
        if (campaignIndex > -1) {
          const campaign = updatedCampaigns[campaignIndex];
          if (campaign.prog < 100) {
            campaign.prog += 15;
          }
          if (campaign.prog >= 100) {
            campaign.state = "completed";
            clearInterval(interval);
          }
          updatedCampaigns[campaignIndex] = campaign;
        }
        return updatedCampaigns;
      });

      // Update QoD campaign progress
      if (campaignData.enableQoS) {
        setQoDCampaigns(prevQoD => {
          const updated = [...prevQoD];
          const qodIndex = updated.findIndex(c => c.name === campaignData.name);
          if (qodIndex > -1) {
            const qodCampaign = updated[qodIndex];
            if (qodCampaign.progress < 100) {
              qodCampaign.progress += 15;
              qodCampaign.completedDrones = Math.floor((qodCampaign.progress / 100) * qodCampaign.targetDrones);
              qodCampaign.actualCost += 45.50; // Simulate cost accumulation
            }
            if (qodCampaign.progress >= 100) {
              qodCampaign.status = "completed";
              qodCampaign.qosStatus = "terminated";
            }
            updated[qodIndex] = qodCampaign;
          }
          return updated;
        });
      }
    }, 2000);
  };

  const handleTerminateQoS = (campaignId: string) => {
    setQoDCampaigns(prev => prev.map(campaign => 
      campaign.id === campaignId 
        ? { ...campaign, qosStatus: "terminated" }
        : campaign
    ));
    toast({
      title: "QoS Terminated",
      description: "Network QoS profile has been manually terminated",
    });
  };

  const handlePauseCampaign = (campaignId: string) => {
    setQoDCampaigns(prev => prev.map(campaign => 
      campaign.id === campaignId 
        ? { ...campaign, status: "paused" }
        : campaign
    ));
    toast({
      title: "Campaign Paused",
      description: "OTA campaign has been paused",
    });
  };

  const handleResumeCampaign = (campaignId: string) => {
    setQoDCampaigns(prev => prev.map(campaign => 
      campaign.id === campaignId 
        ? { ...campaign, status: "active" }
        : campaign
    ));
    toast({
      title: "Campaign Resumed",
      description: "OTA campaign has been resumed",
    });
  };

  return (
    <div className="w-full space-y-6">
      {showWorkflowWizard ? (
        <OTAWorkflowWizard 
          onBack={() => setShowWorkflowWizard(false)}
          onComplete={handleWorkflowComplete}
          onCancel={() => setShowWorkflowWizard(false)}
        />
      ) : (
        <>
          {/* Quick Actions */}
          <div className="flex gap-4">
            <Button 
              onClick={() => setShowWorkflowWizard(true)}
              className="flex items-center gap-2"
            >
              <Zap size={16} />
              Start QoD OTA Workflow
            </Button>
            <Button variant="outline" onClick={() => setShowBatchCreation(true)}>
              <Plus size={16} className="mr-2" />
              Quick Create Batch
            </Button>
            <Button variant="outline" onClick={() => setShowCampaignCreation(true)}>
              <Upload size={16} className="mr-2" />
              Quick Create Campaign
            </Button>
          </div>

          {showBatchCreation && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Folder size={20} /> Create New Batch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Batch Name</Label>
                  <Input placeholder="e.g., High-Risk Drones" />
                </div>
                <div>
                  <Label>Selection Criteria</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select criteria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="model">By Drone Model</SelectItem>
                      <SelectItem value="location">By Location</SelectItem>
                      <SelectItem value="firmware">By Firmware Version</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Select Drones for Batch</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="flex items-center space-x-2 p-3 border rounded-lg">
                        <Checkbox id={`drone-${i}`} />
                        <label htmlFor={`drone-${i}`} className="text-sm font-medium cursor-pointer">
                          Drone {i} - DJI Matrice 300 RTK
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <Button className="flex items-center gap-2">
                  <Folder size={16} />
                  Create Batch
                </Button>
              </CardContent>
            </Card>
          )}

          {showCampaignCreation && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Upload size={20} /> Create OTA Update Campaign</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Campaign Name</Label>
                  <Input placeholder="e.g., Critical Security Patch" />
                </div>
                <div>
                  <Label>Target Batch</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target batch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-risk">High-Risk Drones (4 drones)</SelectItem>
                      <SelectItem value="all-drones">All Drones (23 drones)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Update Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select update type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="security">Security Patch v2.1</SelectItem>
                      <SelectItem value="firmware">Firmware Update v2.3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="flex items-center gap-2">
                  <Upload size={16} />
                  Deploy Campaign
                </Button>
              </CardContent>
            </Card>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Campaign Overview</TabsTrigger>
              <TabsTrigger value="monitor">Monitor Active</TabsTrigger>
              <TabsTrigger value="qod-monitor">
                <Activity className="mr-2" /> QoD Monitor
              </TabsTrigger>
              <TabsTrigger value="firmware">
                <Shield className="mr-2" /> Firmware Security
              </TabsTrigger>
              <TabsTrigger value="analytics">
                <BarChart className="mr-2" /> Analytics & AI
              </TabsTrigger>
              <TabsTrigger value="enhanced-analytics">
                <Brain className="mr-2" /> AI/ML Insights
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {campaigns.map((campaign) => (
                  <Card 
                    key={campaign.id} 
                    className={`border ${campaign.error && campaign.state==="failed" ? "border-red-500" : ""} hover:shadow-lg transition-shadow cursor-pointer`}
                    onClick={() => setSelectedCampaign(campaign)}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {campaign.name}
                        <Badge variant="outline" className={getCampaignStatusColor(campaign.state)}>
                          {campaign.state.toUpperCase()}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-muted-foreground">{campaign.desc}</div>
                      <div className="mt-2 text-xs font-semibold">Targets: {campaign.targets}</div>
                      
                      {campaign.qosProfile && (
                        <div className="mt-2 flex items-center gap-2">
                          <Wifi className="h-3 w-3 text-green-500" />
                          <span className="text-xs text-green-600 font-medium">QoS: {campaign.qosProfile}</span>
                        </div>
                      )}
                      
                      <div className="mt-2 w-full bg-muted h-2 rounded">
                        <div
                          className={`
                            h-2 rounded ${campaign.state==="failed" ? "bg-red-400" :
                                        campaign.state==="active" ? "bg-blue-500" : "bg-yellow-300"}
                            transition-all`}
                          style={{ width: `${campaign.prog}%` }}
                        />
                      </div>
                      <div className="mt-2 text-xs">
                        Progress: {campaign.prog}%
                        {campaign.error && campaign.state==="failed" && <span className="ml-2 text-red-500 font-bold">Error occurred!</span>}
                      </div>

                      <div className="mt-4 pt-4 border-t">
                        <CybersecurityBadge score={campaign.firmware.cybersecurityScore} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
                      {campaigns.filter(c => c.state === "active").map(campaign => (
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
                            </div>
                          </div>
                          {campaign.qosProfile && (
                            <div className="flex items-center gap-2 mb-2">
                              <Wifi className="h-3 w-3 text-green-500" />
                              <span className="text-xs text-green-600">QoS Active: {campaign.qosProfile}</span>
                            </div>
                          )}
                          <Progress value={campaign.prog} className="mb-2" />
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>{campaign.prog}% completed</span>
                            <span>{campaign.targets}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="qod-monitor" className="space-y-6">
              <QoDCampaignManager 
                campaigns={qodCampaigns}
                onTerminateQoS={handleTerminateQoS}
                onPauseCampaign={handlePauseCampaign}
                onResumeCampaign={handleResumeCampaign}
              />
            </TabsContent>

            <TabsContent value="firmware" className="space-y-6">
              <SecureFirmwareManagement />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <AnalyticsDashboard campaigns={campaigns} />
            </TabsContent>

            <TabsContent value="enhanced-analytics" className="space-y-6">
              <EnhancedAnalyticsDashboard campaigns={campaigns} />
            </TabsContent>

          </Tabs>
        </>
      )}

      <CampaignDetailsModal 
        campaign={selectedCampaign}
        isOpen={!!selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
      />
    </div>
  );
};

export default OTAUpdates;
