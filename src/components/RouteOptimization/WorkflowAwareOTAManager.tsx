
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Zap,
  Settings,
  Plane
} from "lucide-react";

interface WorkflowAwareOTAManagerProps {
  workflowData: any;
  onWorkflowUpdate: (data: any) => void;
}

const WorkflowAwareOTAManager = ({ workflowData, onWorkflowUpdate }: WorkflowAwareOTAManagerProps) => {
  const [otaInProgress, setOtaInProgress] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(0);

  const requiredUpdates = [
    {
      id: "nav-opt-v2.1",
      name: "Navigation Optimization v2.1",
      description: "Enhanced waypoint navigation for multi-leg missions",
      droneId: "CHN-001",
      priority: "critical",
      required: true
    },
    {
      id: "dock-protocol-v1.5",
      name: "Docking Station Protocol v1.5", 
      description: "Improved docking station communication and charging protocols",
      droneId: "CHN-001",
      priority: "high",
      required: true
    },
    {
      id: "dgca-compliance-v3.0",
      name: "DGCA Compliance Suite v3.0",
      description: "Latest Digital Sky integration and Chennai airspace updates",
      droneId: "CHN-001", 
      priority: "high",
      required: true
    }
  ];

  const handleStartOTA = () => {
    setOtaInProgress(true);
    
    // Simulate OTA progress
    const interval = setInterval(() => {
      setUpdateProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setOtaInProgress(false);
          onWorkflowUpdate({ ...workflowData, droneReady: true, otaRequired: false });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Workflow Context */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <h3 className="font-semibold text-orange-800 mb-2">OTA Updates Required for Mission Execution</h3>
          <p className="text-sm text-orange-700">
            Multi-leg route optimization requires specific firmware updates to handle complex navigation, 
            docking station protocols, and enhanced DGCA compliance features. Complete these updates before mission deployment.
          </p>
        </CardContent>
      </Card>

      {/* Mission-Specific Updates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings size={20} />
            Mission-Critical Updates Required
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {requiredUpdates.map((update) => (
            <div key={update.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold">{update.name}</h4>
                  <p className="text-sm text-gray-600">{update.description}</p>
                  <p className="text-xs text-gray-500 mt-1">Target Drone: {update.droneId}</p>
                </div>
                <Badge 
                  variant="outline" 
                  className={
                    update.priority === "critical" ? "bg-red-50 text-red-700" :
                    update.priority === "high" ? "bg-orange-50 text-orange-700" :
                    "bg-yellow-50 text-yellow-700"
                  }
                >
                  {update.priority}
                </Badge>
              </div>
              
              {otaInProgress ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Installing...</span>
                    <span>{updateProgress}%</span>
                  </div>
                  <Progress value={updateProgress} />
                </div>
              ) : updateProgress === 100 ? (
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle size={16} />
                  <span className="text-sm font-medium">Update Complete</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-orange-700">
                  <Clock size={16} />
                  <span className="text-sm">Pending Installation</span>
                </div>
              )}
            </div>
          ))}

          {!otaInProgress && updateProgress < 100 && (
            <Button 
              className="w-full" 
              onClick={handleStartOTA}
              disabled={!workflowData.multiLegOptimized}
            >
              <Upload size={16} className="mr-2" />
              Install Mission-Critical Updates
            </Button>
          )}

          {updateProgress === 100 && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-green-700 mb-2">
                  <CheckCircle size={16} />
                  <span className="font-medium">Drone Ready for Mission Execution</span>
                </div>
                <p className="text-sm text-green-600">
                  All required updates installed successfully. Drone CHN-001 is now ready for complex multi-leg mission deployment.
                </p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Update Strategy */}
      <Card>
        <CardHeader>
          <CardTitle>OTA Deployment Strategy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Zap className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <h4 className="font-semibold">Critical Updates First</h4>
              <p className="text-sm text-gray-600">Navigation and safety updates deployed with priority</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Plane className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <h4 className="font-semibold">Drone-Specific</h4>
              <p className="text-sm text-gray-600">Updates tailored to mission-assigned drone capabilities</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <h4 className="font-semibold">Validation</h4>
              <p className="text-sm text-gray-600">Automatic post-update system checks and compliance verification</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rollback Option */}
      {updateProgress > 0 && updateProgress < 100 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-yellow-700 mb-2">
              <AlertTriangle size={16} />
              <span className="font-medium">Update in Progress</span>
            </div>
            <p className="text-sm text-yellow-600 mb-3">
              Critical mission updates are being installed. Do not power off the drone during this process.
            </p>
            <Button variant="outline" size="sm" className="text-yellow-700 border-yellow-300">
              Emergency Rollback
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WorkflowAwareOTAManager;
