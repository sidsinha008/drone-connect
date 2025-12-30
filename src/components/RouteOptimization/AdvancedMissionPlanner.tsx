import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Plane, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Calendar,
  Zap,
  Shield
} from "lucide-react";

interface AdvancedMissionPlannerProps {
  workflowData: any;
  onWorkflowUpdate: (data: any) => void;
}

const AdvancedMissionPlanner = ({ workflowData, onWorkflowUpdate }: AdvancedMissionPlannerProps) => {
  const [missionDetails, setMissionDetails] = useState({
    name: "",
    type: "",
    priority: "",
    description: "",
    source: "",
    destination: "",
    payload: "",
    plannedDuration: "",
    dgcaSubmitted: false,
    dgcaApprovalProgress: 0
  });

  const handleSubmitDGCA = () => {
    setMissionDetails(prev => ({ ...prev, dgcaSubmitted: true }));
    
    // Store mission data for workflow
    const missionData = {
      name: missionDetails.name,
      type: missionDetails.type,
      priority: missionDetails.priority,
      description: missionDetails.description,
      source: missionDetails.source,
      destination: missionDetails.destination,
      payload: missionDetails.payload,
      plannedDuration: missionDetails.plannedDuration
    };
    
    // Simulate DGCA approval process
    const interval = setInterval(() => {
      setMissionDetails(prev => {
        const newProgress = prev.dgcaApprovalProgress + 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          onWorkflowUpdate({ 
            ...workflowData, 
            missionApproved: true, 
            dgcaPermissionStatus: "approved",
            missionData: missionData
          });
          return { ...prev, dgcaApprovalProgress: 100 };
        }
        return { ...prev, dgcaApprovalProgress: newProgress };
      });
    }, 500);
  };

  const handleApproveMission = () => {
    const missionData = {
      name: missionDetails.name,
      type: missionDetails.type,
      priority: missionDetails.priority,
      description: missionDetails.description,
      source: missionDetails.source,
      destination: missionDetails.destination,
      payload: missionDetails.payload,
      plannedDuration: missionDetails.plannedDuration
    };

    onWorkflowUpdate({ 
      ...workflowData, 
      missionApproved: true,
      missionData: missionData
    });
  };

  return (
    <div className="space-y-6">
      {/* Mission Planning Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText size={20} />
            Mission Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Mission Name</Label>
              <Input 
                placeholder="e.g., Chennai Port to Anna Nagar Delivery"
                value={missionDetails.name}
                onChange={(e) => setMissionDetails(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div>
              <Label>Mission Type</Label>
              <Select value={missionDetails.type} onValueChange={(value) => setMissionDetails(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select mission type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cargo-delivery">Cargo Delivery</SelectItem>
                  <SelectItem value="surveillance">Surveillance Patrol</SelectItem>
                  <SelectItem value="inspection">Infrastructure Inspection</SelectItem>
                  <SelectItem value="mapping">Area Mapping</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Priority Level</Label>
              <Select value={missionDetails.priority} onValueChange={(value) => setMissionDetails(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Set priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Planned Duration</Label>
              <Input 
                placeholder="e.g., 45 minutes"
                value={missionDetails.plannedDuration}
                onChange={(e) => setMissionDetails(prev => ({ ...prev, plannedDuration: e.target.value }))}
              />
            </div>

            <div>
              <Label>Source Location</Label>
              <Input 
                placeholder="Enter pickup location"
                value={missionDetails.source}
                onChange={(e) => setMissionDetails(prev => ({ ...prev, source: e.target.value }))}
              />
            </div>

            <div>
              <Label>Destination</Label>
              <Input 
                placeholder="Enter delivery location"
                value={missionDetails.destination}
                onChange={(e) => setMissionDetails(prev => ({ ...prev, destination: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label>Mission Description</Label>
            <Textarea 
              placeholder="Detailed mission description and special requirements"
              value={missionDetails.description}
              onChange={(e) => setMissionDetails(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div>
            <Label>Payload Details</Label>
            <Input 
              placeholder="Weight, dimensions, special handling requirements"
              value={missionDetails.payload}
              onChange={(e) => setMissionDetails(prev => ({ ...prev, payload: e.target.value }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* DGCA Compliance & Approval */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield size={20} />
            DGCA Compliance & Digital Sky Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <h4 className="font-semibold">Airspace Validation</h4>
              <p className="text-sm text-gray-600">Chennai Green Zone Verified</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Clock className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <h4 className="font-semibold">NOTAM Check</h4>
              <p className="text-sm text-gray-600">Real-time restrictions scanned</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <h4 className="font-semibold">Flight Path</h4>
              <p className="text-sm text-gray-600">Digital Sky Compliant</p>
            </div>
          </div>

          {!missionDetails.dgcaSubmitted ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Ready for DGCA Submission</h4>
                <p className="text-sm text-blue-600 mb-3">
                  All mission parameters validated. Submit to Digital Sky for official approval.
                </p>
                <Button 
                  onClick={handleSubmitDGCA}
                  disabled={!missionDetails.name || !missionDetails.type || !missionDetails.source || !missionDetails.destination}
                  className="w-full"
                >
                  <Calendar size={16} className="mr-2" />
                  Submit to DGCA Digital Sky
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">DGCA Approval in Progress</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Processing Digital Sky Approval...</span>
                    <span>{missionDetails.dgcaApprovalProgress}%</span>
                  </div>
                  <Progress value={missionDetails.dgcaApprovalProgress} />
                </div>
                <p className="text-sm text-orange-600 mt-2">
                  Estimated approval time: 2-3 minutes for standard Chennai operations
                </p>
              </div>

              {missionDetails.dgcaApprovalProgress === 100 && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700 mb-2">
                    <CheckCircle size={16} />
                    <span className="font-medium">DGCA Approval Received</span>
                  </div>
                  <p className="text-sm text-green-600 mb-3">
                    Mission approved for execution. Digital Sky permission granted for Chennai airspace.
                  </p>
                  <Badge className="bg-green-100 text-green-700">
                    Approval ID: DS-CHN-2024-001234
                  </Badge>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mission Approval */}
      {!workflowData.missionApproved && missionDetails.dgcaApprovalProgress === 100 && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-green-800">Mission Ready for Internal Approval</h3>
                <p className="text-sm text-green-600">DGCA approval received. Approve mission to proceed to route planning.</p>
              </div>
              <Button onClick={handleApproveMission} className="bg-green-600 hover:bg-green-700">
                <CheckCircle size={16} className="mr-2" />
                Approve Mission
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Steps */}
      {workflowData.missionApproved && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-blue-700 mb-2">
              <Zap size={16} />
              <span className="font-medium">Mission Approved - Ready for Route Planning</span>
            </div>
            <p className="text-sm text-blue-600">
              Mission plan approved and DGCA compliant. Mission data will be automatically available in Quick Route generation for immediate deployment or Multi-Leg planning for complex operations.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdvancedMissionPlanner;
