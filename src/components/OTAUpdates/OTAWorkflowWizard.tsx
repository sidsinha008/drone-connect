import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, Download, Zap, Shield, Users } from "lucide-react";

interface OTAWorkflowWizardProps {
  onBack: () => void;
  onComplete: (batchData: any, campaignData: any) => void;
  onCancel: () => void;
}

const OTAWorkflowWizard = ({ onBack, onComplete, onCancel }: OTAWorkflowWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [qosSubscriptionStatus, setQosSubscriptionStatus] = useState<"not-requested" | "requesting" | "success" | "error">("not-requested");
  const [campaignName, setCampaignName] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [updatePriority, setUpdatePriority] = useState("normal");
  const [rolloutStrategy, setRolloutStrategy] = useState("phased");
  const [rolloutPercentage, setRolloutPercentage] = useState(10);

  const mockDevices = [
    { id: "dev-001", name: "Drone X1-001", type: "Scout", location: "Warehouse A", status: "Online" },
    { id: "dev-002", name: "Drone X1-002", type: "Scout", location: "Downtown", status: "Online" },
    { id: "dev-003", name: "Cargo Pro-001", type: "Heavy Lift", location: "Distribution Center", status: "Offline" },
    { id: "dev-004", name: "Vista Air-001", type: "Mapping", location: "City Park", status: "Online" },
    { id: "dev-005", name: "Survey Elite-001", type: "Precision Mapping", location: "Construction Site", status: "Online" },
  ];

  const handleDeviceSelection = (deviceId: string) => {
    setSelectedDevices(prev => 
      prev.includes(deviceId) 
        ? prev.filter(id => id !== deviceId) 
        : [...prev, deviceId]
    );
  };

  const handleQosSubscription = () => {
    setQosSubscriptionStatus("requesting");
    // Simulate API call
    setTimeout(() => {
      setQosSubscriptionStatus("success");
    }, 2000);
  };

  const handleLaunchCampaign = () => {
    const batchData = {
      name: "Quick Batch",
      selectedDrones: selectedDevices
    };
    
    const campaignData = {
      name: campaignName,
      description: campaignDescription,
      updateType: "Firmware v2.3.1",
      priority: updatePriority,
      rolloutStrategy,
      rolloutPercentage,
      enableQoS: qosSubscriptionStatus === "success",
      qosProfile: qosSubscriptionStatus === "success" ? "High Throughput for Critical Updates" : null,
      qosSessionId: qosSubscriptionStatus === "success" ? `qos-session-${Date.now()}` : null,
      selectedQoSProfile: {
        name: "High Throughput for Critical Updates",
        guaranteedBandwidth: "25 Mbps",
        latency: "< 30ms"
      },
      qosActualParams: "Bandwidth: 25 Mbps, Latency: 28ms",
      estimatedCost: "$150.00"
    };

    onComplete(batchData, campaignData);
  };

  const renderProgressIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-gray-200 text-gray-500'
            }`}>
              {step < currentStep ? <CheckCircle size={16} /> : step}
            </div>
            {step < 3 && (
              <div className={`w-16 h-1 ${step < currentStep ? 'bg-primary' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Campaign Setup</CardTitle>
              <CardDescription>Configure your OTA update campaign settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input
                  id="campaign-name"
                  placeholder="e.g., Firmware Update v2.1"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="campaign-description">Description</Label>
                <Input
                  id="campaign-description"
                  placeholder="Brief description of update purpose"
                  value={campaignDescription}
                  onChange={(e) => setCampaignDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Update Priority</Label>
                <div className="flex gap-2">
                  {["low", "normal", "high", "critical"].map((priority) => (
                    <Button
                      key={priority}
                      variant={updatePriority === priority ? "default" : "outline"}
                      size="sm"
                      onClick={() => setUpdatePriority(priority)}
                      className="capitalize"
                    >
                      {priority}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Rollout Strategy</Label>
                <div className="flex gap-2">
                  {[
                    { id: "phased", label: "Phased Rollout" },
                    { id: "immediate", label: "Immediate" },
                    { id: "scheduled", label: "Scheduled" }
                  ].map((strategy) => (
                    <Button
                      key={strategy.id}
                      variant={rolloutStrategy === strategy.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setRolloutStrategy(strategy.id)}
                    >
                      {strategy.label}
                    </Button>
                  ))}
                </div>
              </div>

              {rolloutStrategy === "phased" && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Initial Rollout Percentage</Label>
                    <span className="text-sm font-medium">{rolloutPercentage}%</span>
                  </div>
                  <Input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={rolloutPercentage}
                    onChange={(e) => setRolloutPercentage(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Start with {rolloutPercentage}% of devices and gradually increase based on success metrics
                  </p>
                </div>
              )}

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 text-blue-700">
                  <Download size={16} />
                  <span className="font-medium">Firmware Package</span>
                </div>
                <p className="text-sm text-blue-600 mt-1">
                  Upload your firmware package in the next step after device selection
                </p>
              </div>
            </CardContent>
          </Card>
        );
      
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Device Selection</CardTitle>
              <CardDescription>Choose which devices to include in this campaign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 mb-4">
                <Button variant="outline" size="sm" onClick={() => setSelectedDevices(mockDevices.map(d => d.id))}>
                  Select All
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedDevices([])}>
                  Clear Selection
                </Button>
                <Badge variant="secondary">
                  {selectedDevices.length} of {mockDevices.length} selected
                </Badge>
              </div>

              <div className="space-y-3">
                {mockDevices.map((device) => (
                  <div
                    key={device.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedDevices.includes(device.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleDeviceSelection(device.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{device.name}</div>
                        <div className="text-sm text-muted-foreground">{device.type} • {device.location}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={device.status === "Online" ? "outline" : "secondary"}>
                          {device.status}
                        </Badge>
                        {selectedDevices.includes(device.id) && (
                          <CheckCircle className="text-primary" size={20} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center gap-2 text-amber-700">
                  <AlertTriangle size={16} />
                  <span className="font-medium">Compatibility Check</span>
                </div>
                <p className="text-sm text-amber-600 mt-1">
                  All selected devices are compatible with the firmware update. Ensure devices are charged above 50% before proceeding.
                </p>
              </div>
            </CardContent>
          </Card>
        );
      
      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Quality of Service</CardTitle>
              <CardDescription>Configure QoS settings for optimal update delivery</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">QoS Subscription</h4>
                    <p className="text-sm text-muted-foreground">
                      Subscribe to premium QoS features for guaranteed delivery
                    </p>
                  </div>
                  <Button
                    onClick={handleQosSubscription}
                    disabled={qosSubscriptionStatus === "requesting"}
                    variant={qosSubscriptionStatus === "success" ? "outline" : "default"}
                  >
                    {qosSubscriptionStatus === "requesting" && "Subscribing..."}
                    {qosSubscriptionStatus === "success" && "Subscribed"}
                    {qosSubscriptionStatus === "not-requested" && "Subscribe"}
                    {qosSubscriptionStatus === "error" && "Retry"}
                  </Button>
                </div>
                
                {qosSubscriptionStatus === "success" && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle size={16} />
                    <span className="text-sm">QoS subscription active</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <Label>Network Conditions</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Zap size={16} className="text-amber-500" />
                        <span className="text-sm font-medium">Bandwidth Throttling</span>
                      </div>
                      <select className="w-full mt-2 p-2 border rounded text-sm">
                        <option>None</option>
                        <option>Light (80% bandwidth)</option>
                        <option>Medium (50% bandwidth)</option>
                        <option>Heavy (30% bandwidth)</option>
                      </select>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Shield size={16} className="text-green-500" />
                        <span className="text-sm font-medium">Retry Strategy</span>
                      </div>
                      <select className="w-full mt-2 p-2 border rounded text-sm">
                        <option>Aggressive (immediate)</option>
                        <option>Balanced (exponential backoff)</option>
                        <option>Conservative (scheduled)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={16} className="text-blue-500" />
                    <span className="text-sm font-medium">Deployment Window</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs">Start Time</Label>
                      <Input type="time" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs">End Time</Label>
                      <Input type="time" className="mt-1" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Updates will only be pushed during this time window to minimize operational disruption
                  </p>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle size={16} />
                    <span className="font-medium">Campaign Ready</span>
                  </div>
                  <Button size="sm" onClick={handleLaunchCampaign}>
                    Launch Campaign
                  </Button>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  All settings configured. Your campaign is ready to launch.
                </p>
              </div>
            </CardContent>
          </Card>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onCancel}>
          <ArrowLeft size={16} className="mr-2" />
          Back to Campaigns
        </Button>
        <div>
          <h1 className="text-2xl font-bold">OTA Workflow Wizard</h1>
          <p className="text-muted-foreground">
            Step {currentStep} of 3: Configure your OTA update campaign
          </p>
        </div>
      </div>

      {renderProgressIndicator()}

      {renderStepContent()}

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          <ArrowLeft size={16} className="mr-2" />
          Previous
        </Button>
        
        <Button
          onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
          disabled={currentStep === 3}
        >
          Next
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default OTAWorkflowWizard;
