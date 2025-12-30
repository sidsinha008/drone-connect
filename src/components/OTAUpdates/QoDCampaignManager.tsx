
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Wifi, 
  Activity, 
  Pause, 
  Square, 
  CheckCircle,
  XCircle,
  AlertTriangle,
  DollarSign,
  Clock,
  Zap
} from "lucide-react";

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

interface QoDCampaignManagerProps {
  campaigns: QoDCampaign[];
  onTerminateQoS: (campaignId: string) => void;
  onPauseCampaign: (campaignId: string) => void;
  onResumeCampaign: (campaignId: string) => void;
}

const QoDCampaignManager = ({ campaigns, onTerminateQoS, onPauseCampaign, onResumeCampaign }: QoDCampaignManagerProps) => {
  const [selectedCampaign, setSelectedCampaign] = useState<QoDCampaign | null>(null);

  const getQoSStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700 border-green-300">QoD Active</Badge>;
      case "terminated":
        return <Badge className="bg-gray-100 text-gray-700 border-gray-300">QoD Terminated</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-700 border-red-300">QoD Failed</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">QoD Pending</Badge>;
    }
  };

  const getCampaignStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-300">Active</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-700 border-green-300">Completed</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-700 border-red-300">Failed</Badge>;
      case "paused":
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">Paused</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {campaigns.map((campaign) => (
          <Card 
            key={campaign.id} 
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedCampaign?.id === campaign.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedCampaign(campaign)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{campaign.name}</CardTitle>
                {getCampaignStatusBadge(campaign.status)}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Wifi className="h-3 w-3" />
                {getQoSStatusBadge(campaign.qosStatus)}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Campaign Progress</span>
                  <span>{campaign.progress}%</span>
                </div>
                <Progress value={campaign.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-center p-2 bg-blue-50 rounded">
                  <div className="font-medium text-blue-700">{campaign.completedDrones}</div>
                  <div className="text-blue-600">Completed</div>
                </div>
                <div className="text-center p-2 bg-red-50 rounded">
                  <div className="font-medium text-red-700">{campaign.failedDrones}</div>
                  <div className="text-red-600">Failed</div>
                </div>
              </div>

              {campaign.qosStatus === "active" && (
                <div className="bg-green-50 p-2 rounded text-xs">
                  <div className="flex items-center gap-1 text-green-700 mb-1">
                    <Activity className="h-3 w-3" />
                    <span className="font-medium">QoD Active</span>
                  </div>
                  <div className="text-green-600">
                    {campaign.actualBandwidth} | {campaign.actualLatency}
                  </div>
                  <div className="flex items-center gap-1 text-green-600 mt-1">
                    <DollarSign className="h-2 w-2" />
                    <span>₹{campaign.actualCost.toFixed(2)}</span>
                  </div>
                </div>
              )}

              <div className="flex gap-1">
                {campaign.status === "active" && (
                  <>
                    <Button size="sm" variant="outline" onClick={(e) => {
                      e.stopPropagation();
                      onPauseCampaign(campaign.id);
                    }}>
                      <Pause className="h-3 w-3" />
                    </Button>
                    {campaign.qosStatus === "active" && (
                      <Button size="sm" variant="outline" onClick={(e) => {
                        e.stopPropagation();
                        onTerminateQoS(campaign.id);
                      }}>
                        <Square className="h-3 w-3" />
                      </Button>
                    )}
                  </>
                )}
                {campaign.status === "paused" && (
                  <Button size="sm" variant="outline" onClick={(e) => {
                    e.stopPropagation();
                    onResumeCampaign(campaign.id);
                  }}>
                    <Zap className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedCampaign && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Live Campaign Status: {selectedCampaign.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Campaign Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Status:</span>
                    {getCampaignStatusBadge(selectedCampaign.status)}
                  </div>
                  <div className="flex justify-between">
                    <span>Progress:</span>
                    <span className="font-medium">{selectedCampaign.progress}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Drones:</span>
                    <span className="font-medium">{selectedCampaign.targetDrones}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completed:</span>
                    <span className="font-medium text-green-600">{selectedCampaign.completedDrones}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Failed:</span>
                    <span className="font-medium text-red-600">{selectedCampaign.failedDrones}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">QoS Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Profile:</span>
                    <span className="font-medium">{selectedCampaign.qosProfile}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Session ID:</span>
                    <span className="font-mono text-xs">{selectedCampaign.qosSessionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    {getQoSStatusBadge(selectedCampaign.qosStatus)}
                  </div>
                  <div className="flex justify-between">
                    <span>Bandwidth:</span>
                    <span className="font-medium">{selectedCampaign.actualBandwidth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Latency:</span>
                    <span className="font-medium">{selectedCampaign.actualLatency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Cost:</span>
                    <span className="font-medium text-green-600">₹{selectedCampaign.actualCost.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {selectedCampaign.qosStatus === "active" && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-green-700">
                    <Wifi className="h-4 w-4" />
                    <span className="font-medium">Network QoS Active</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => onTerminateQoS(selectedCampaign.id)}>
                      Manually Terminate QoS
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-green-600">Active Since:</span>
                    <p className="font-medium">{selectedCampaign.qosStartTime}</p>
                  </div>
                  <div>
                    <span className="text-green-600">Estimated End:</span>
                    <p className="font-medium">{selectedCampaign.estimatedEndTime}</p>
                  </div>
                </div>
                <div className="mt-3 text-xs text-green-600">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>QoD bandwidth is currently being utilized for OTA transfers</span>
                  </div>
                </div>
              </div>
            )}

            {selectedCampaign.qosStatus === "terminated" && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 text-gray-700 mb-2">
                  <CheckCircle className="h-4 w-4" />
                  <span className="font-medium">QoS Profile Terminated Successfully</span>
                </div>
                <p className="text-sm text-gray-600">
                  Network QoS was automatically terminated upon campaign completion.
                </p>
              </div>
            )}

            {selectedCampaign.qosStatus === "failed" && (
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 text-red-700 mb-2">
                  <XCircle className="h-4 w-4" />
                  <span className="font-medium">QoS Termination Failed</span>
                </div>
                <p className="text-sm text-red-600 mb-2">
                  Unable to terminate QoS profile. Please contact support.
                </p>
                <Button size="sm" variant="outline">
                  View Termination Log
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QoDCampaignManager;
