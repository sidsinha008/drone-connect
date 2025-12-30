
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
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
  Plane
} from "lucide-react";

interface EnhancedOTABatchManagerProps {
  workflowData: any;
  onWorkflowUpdate: (data: any) => void;
}

const EnhancedOTABatchManager = ({ workflowData, onWorkflowUpdate }: EnhancedOTABatchManagerProps) => {
  const [showBatchCreation, setShowBatchCreation] = useState(false);
  const [showCampaignCreation, setShowCampaignCreation] = useState(false);
  const [batchCreated, setBatchCreated] = useState(false);
  const [campaignCreated, setCampaignCreated] = useState(false);
  const [campaignProgress, setCampaignProgress] = useState(0);
  const [droneResponse, setDroneResponse] = useState(false);

  const [newBatch, setNewBatch] = useState({
    name: "",
    description: "",
    criteria: "model",
    selectedDrones: []
  });

  const [newCampaign, setNewCampaign] = useState({
    name: "",
    description: "",
    updateType: "",
    selectedBatch: "",
    schedule: "immediate"
  });

  const availableDrones = [
    { id: "CHN-001", model: "DJI Matrice 300 RTK", status: "ready", firmware: "v2.1.3", location: "Chennai Central" },
    { id: "CHN-002", model: "Parrot Anafi Ai", status: "ready", firmware: "v2.0.8", location: "OMR" },
    { id: "CHN-003", model: "Custom Cargo Drone", status: "charging", firmware: "v2.1.1", location: "Airport" },
    { id: "CHN-004", model: "DJI Matrice 300 RTK", status: "ready", firmware: "v2.1.3", location: "Anna Nagar" }
  ];

  const handleCreateBatch = () => {
    setBatchCreated(true);
    setShowBatchCreation(false);
  };

  const handleCreateCampaign = () => {
    setCampaignCreated(true);
    setShowCampaignCreation(false);
    
    // Simulate campaign deployment
    const interval = setInterval(() => {
      setCampaignProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDroneResponse(true);
          onWorkflowUpdate({ ...workflowData, droneReady: true, otaRequired: false });
          return 100;
        }
        return prev + 20;
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Workflow Context */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-800 mb-2">OTA Updates Required for Multi-Leg Mission</h3>
          <p className="text-sm text-blue-700">
            Complex multi-leg route requires specialized firmware updates for enhanced navigation, 
            docking station protocols, and mission-specific optimizations. Create batches and campaigns to deploy updates.
          </p>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex gap-4">
        {!batchCreated && (
          <Button onClick={() => setShowBatchCreation(true)} className="flex items-center gap-2">
            <Plus size={16} />
            Create Batch
          </Button>
        )}
        {batchCreated && !campaignCreated && (
          <Button onClick={() => setShowCampaignCreation(true)} className="flex items-center gap-2">
            <Upload size={16} />
            Create Campaign
          </Button>
        )}
      </div>

      {/* Batch Creation Form */}
      {showBatchCreation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folder size={20} />
              Create New Drone Batch
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Batch Name</Label>
                <Input 
                  placeholder="e.g., Chennai Multi-Leg Mission Drones"
                  value={newBatch.name}
                  onChange={(e) => setNewBatch(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              
              <div>
                <Label>Selection Criteria</Label>
                <Select value={newBatch.criteria} onValueChange={(value) => setNewBatch(prev => ({ ...prev, criteria: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select criteria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="model">By Drone Model</SelectItem>
                    <SelectItem value="location">By Location</SelectItem>
                    <SelectItem value="firmware">By Firmware Version</SelectItem>
                    <SelectItem value="manual">Manual Selection</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <Input 
                placeholder="Batch description and purpose"
                value={newBatch.description}
                onChange={(e) => setNewBatch(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div>
              <Label>Select Drones for Batch</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {availableDrones.map((drone) => (
                  <div key={drone.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox id={drone.id} />
                    <div className="flex-1">
                      <label htmlFor={drone.id} className="text-sm font-medium cursor-pointer">
                        {drone.id} - {drone.model}
                      </label>
                      <p className="text-xs text-gray-500">{drone.location} | Firmware: {drone.firmware}</p>
                    </div>
                    <Badge variant={drone.status === "ready" ? "default" : "secondary"}>
                      {drone.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreateBatch} className="flex items-center gap-2">
                <Folder size={16} />
                Create Batch
              </Button>
              <Button variant="outline" onClick={() => setShowBatchCreation(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Campaign Creation Form */}
      {showCampaignCreation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload size={20} />
              Create OTA Update Campaign
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Campaign Name</Label>
                <Input 
                  placeholder="e.g., Multi-Leg Navigation Enhancement"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              
              <div>
                <Label>Update Type</Label>
                <Select value={newCampaign.updateType} onValueChange={(value) => setNewCampaign(prev => ({ ...prev, updateType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select update type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="navigation">Navigation Enhancement v2.1.5</SelectItem>
                    <SelectItem value="docking">Docking Station Protocol v1.8</SelectItem>
                    <SelectItem value="dgca">DGCA Compliance Suite v3.2</SelectItem>
                    <SelectItem value="complete">Complete Mission Package</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Target Batch</Label>
              <Select value={newCampaign.selectedBatch} onValueChange={(value) => setNewCampaign(prev => ({ ...prev, selectedBatch: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chennai-mission">Chennai Multi-Leg Mission Drones (4 drones)</SelectItem>
                  <SelectItem value="matrice-fleet">Matrice 300 Fleet (12 drones)</SelectItem>
                  <SelectItem value="cargo-drones">Cargo Drone Batch (8 drones)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Deployment Schedule</Label>
              <Select value={newCampaign.schedule} onValueChange={(value) => setNewCampaign(prev => ({ ...prev, schedule: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Deploy Immediately</SelectItem>
                  <SelectItem value="docked">When Drones are Docked</SelectItem>
                  <SelectItem value="idle">When Drones are Idle</SelectItem>
                  <SelectItem value="scheduled">Schedule for Later</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreateCampaign} className="flex items-center gap-2">
                <Upload size={16} />
                Deploy Campaign
              </Button>
              <Button variant="outline" onClick={() => setShowCampaignCreation(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Batch Created Confirmation */}
      {batchCreated && !showCampaignCreation && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-green-700 mb-2">
              <CheckCircle size={16} />
              <span className="font-medium">Batch Created Successfully</span>
            </div>
            <p className="text-sm text-green-600">
              "Chennai Multi-Leg Mission Drones" batch created with 4 selected drones. Ready for campaign deployment.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Campaign Progress */}
      {campaignCreated && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings size={20} />
              Campaign Deployment Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Deploying Multi-Leg Navigation Enhancement...</span>
                <span>{campaignProgress}%</span>
              </div>
              <Progress value={campaignProgress} />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 border rounded-lg">
                <Plane className="w-6 h-6 mx-auto mb-1 text-blue-500" />
                <p className="text-xs font-medium">CHN-001</p>
                <Badge variant={campaignProgress > 25 ? "default" : "secondary"} className="text-xs">
                  {campaignProgress > 25 ? "Updated" : "Pending"}
                </Badge>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <Plane className="w-6 h-6 mx-auto mb-1 text-blue-500" />
                <p className="text-xs font-medium">CHN-002</p>
                <Badge variant={campaignProgress > 50 ? "default" : "secondary"} className="text-xs">
                  {campaignProgress > 50 ? "Updated" : "Pending"}
                </Badge>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <Plane className="w-6 h-6 mx-auto mb-1 text-blue-500" />
                <p className="text-xs font-medium">CHN-003</p>
                <Badge variant={campaignProgress > 75 ? "default" : "secondary"} className="text-xs">
                  {campaignProgress > 75 ? "Updated" : "Pending"}
                </Badge>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <Plane className="w-6 h-6 mx-auto mb-1 text-blue-500" />
                <p className="text-xs font-medium">CHN-004</p>
                <Badge variant={campaignProgress > 90 ? "default" : "secondary"} className="text-xs">
                  {campaignProgress > 90 ? "Updated" : "Pending"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Drone Response */}
      {droneResponse && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-green-700 mb-3">
              <CheckCircle size={16} />
              <span className="font-medium">Drone Response Received</span>
            </div>
            <div className="bg-white p-3 rounded border">
              <p className="text-sm font-mono text-gray-800">
                <strong>CHN-001:</strong> "OTA update v2.1.5 received and installed successfully. 
                Multi-leg navigation protocols active. Enhanced docking station communication enabled. 
                All systems operational and ready for complex mission deployment. 
                Estimated range increased by 35% with new battery optimization algorithms."
              </p>
            </div>
            <div className="mt-3 flex items-center gap-2 text-green-600">
              <Zap size={14} />
              <span className="text-sm font-medium">Drone CHN-001 is mission-ready for multi-leg operations</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedOTABatchManager;
