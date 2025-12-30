import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Wifi,
  Zap,
  Play,
  Calendar,
  FileText,
  X,
  Eye,
  Monitor,
  Download,
  Printer,
  Upload,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SwarmMissionPlanningDashboardProps {
  onCreateOTACampaign: () => void;
  onCreateMission: () => void;
  swarmData?: any;
}

const SwarmMissionPlanningDashboard = ({ onCreateOTACampaign, onCreateMission, swarmData }: SwarmMissionPlanningDashboardProps) => {
  const [currentStep, setCurrentStep] = useState(3);
  const [showOTANotification, setShowOTANotification] = useState(true);
  const [showDeploymentModal, setShowDeploymentModal] = useState(false);
  const [showOTAModal, setShowOTAModal] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isOTAInProgress, setIsOTAInProgress] = useState(false);
  const [deploymentComplete, setDeploymentComplete] = useState(false);
  const [showMissionReport, setShowMissionReport] = useState(false);
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [otaProgress, setOTAProgress] = useState(0);
  const [deploymentStatus, setDeploymentStatus] = useState("");
  const [confirmDeployment, setConfirmDeployment] = useState(false);
  const [firmwareIntegrityCheck, setFirmwareIntegrityCheck] = useState(false);
  const [firmwareStatus, setFirmwareStatus] = useState<"ready" | "needs-update" | "critical">("needs-update");
  const { toast } = useToast();

  // Mock firmware check data
  const firmwareCheck = {
    ready: {
      status: "All drones on required firmware (v4.5.1)",
      icon: CheckCircle,
      color: "text-green-500",
      canDeploy: true
    },
    "needs-update": {
      status: "2 drones require update to v4.5.1 for optimal mission performance",
      details: "D-001 (Surveillance), D-003 (Comm Relay) are on v4.4.0. Critical security patch v4.5.1 is recommended for this mission.",
      icon: AlertTriangle,
      color: "text-amber-500",
      canDeploy: true,
      dronesNeedingUpdate: ["D-001", "D-003"]
    },
    critical: {
      status: "Critical firmware mismatch for mission requirements",
      details: "Mission cannot be deployed until Drones D-001, D-003 are updated to firmware v4.5.1.",
      icon: X,
      color: "text-red-500",
      canDeploy: false,
      dronesNeedingUpdate: ["D-001", "D-003"]
    }
  };

  // Simulate OTA notification appearing after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (showOTANotification) {
        toast({
          title: "OTA Campaign Completed Successfully!",
          description: "5 drones critical to the Hyderabad Security Swarm 1 mission have been updated to Firmware v4.5.1.",
        });
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [toast, showOTANotification]);

  const handleInitiateOTA = () => {
    setShowOTAModal(true);
  };

  const confirmOTAStart = () => {
    setShowOTAModal(false);
    setIsOTAInProgress(true);
    setOTAProgress(0);

    // Simulate OTA progress
    const otaSteps = [
      { progress: 15, status: "Initiating firmware download for D-001..." },
      { progress: 30, status: "Downloading firmware v4.5.1 to D-001..." },
      { progress: 45, status: "Installing firmware on D-001..." },
      { progress: 60, status: "Initiating firmware download for D-003..." },
      { progress: 75, status: "Downloading firmware v4.5.1 to D-003..." },
      { progress: 90, status: "Installing firmware on D-003..." },
      { progress: 100, status: "OTA complete! All drones updated to v4.5.1" }
    ];

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < otaSteps.length) {
        setOTAProgress(otaSteps[stepIndex].progress);
        setDeploymentStatus(otaSteps[stepIndex].status);
        stepIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsOTAInProgress(false);
          setFirmwareStatus("ready");
          // Auto-deploy mission after successful OTA
          handleDeployMission();
        }, 1000);
      }
    }, 2000);
  };

  const handleDeployMission = () => {
    if (firmwareStatus === "critical") return;
    
    if (firmwareStatus === "needs-update") {
      // Show confirmation dialog for amber warning
      const confirmDeploy = window.confirm("Some drones need firmware updates. Deploy anyway?");
      if (!confirmDeploy) return;
    }
    
    setShowDeploymentModal(true);
  };

  const confirmMissionDeployment = () => {
    setShowDeploymentModal(false);
    setIsDeploying(true);
    setDeploymentProgress(0);

    // Simulate deployment steps
    const deploymentSteps = [
      { progress: 20, status: "Verifying drone connectivity..." },
      { progress: 35, status: "Uploading mission plan to D-001 (High-Res Surveillance)..." },
      { progress: 45, status: "Uploading mission plan to D-002 (Acoustic Monitoring)..." },
      { progress: 60, status: "Initiating pre-flight system checks on all 8 drones..." },
      { progress: 75, status: "Firmware v4.5.1 handshake successful with all updated drones." },
      { progress: 90, status: "Drones arming rotors..." },
      { progress: 100, status: "Mission deployment complete!" }
    ];

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < deploymentSteps.length) {
        setDeploymentProgress(deploymentSteps[stepIndex].progress);
        setDeploymentStatus(deploymentSteps[stepIndex].status);
        stepIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsDeploying(false);
          setDeploymentComplete(true);
        }, 1000);
      }
    }, 1500);
  };

  const exportMissionReport = (format: 'txt' | 'pdf') => {
    const reportData = `
Mission Report: Hyderabad Security Swarm 1 - Active Patrol
Deployment Time: Jun 17, 2025, 05:30 PM IST
Duration: 1 hour 15 minutes
Total Drones Deployed: 8
Overall Mission Success Rate: 98%

Swarm Performance Metrics:
- Total Flight Time: 8 hours 20 minutes
- Total Data Collected: 150 GB
- Average Battery Consumption: 75% per drone
- Autonomous Conflict Resolution Events: 5 (100% success rate)

Firmware & OTA Status:
- Firmware Version at Deployment: v4.5.1
- OTA Campaign Success Rate: 100% (2/2 drones updated)
- QoS Profile Used: Critical IoT Update (Terminated)
    `;

    const blob = new Blob([reportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Mission_Report_Hyderabad_Security_Swarm_1_20250617.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: `Report Exported`,
      description: `Mission report exported as ${format.toUpperCase()} file`,
    });
  };

  if (showMissionReport) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => setShowMissionReport(false)}>
            <ArrowLeft size={16} className="mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Mission Report: Hyderabad Security Swarm 1 - Active Patrol</h1>
            <p className="text-muted-foreground">Jun 17, 2025, 05:30 PM IST</p>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Mission Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Mission Overview</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="text-xl font-bold">1h 15m</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-xl font-bold text-green-500">98%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Drones Deployed</p>
                <p className="text-xl font-bold">8</p>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Swarm Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Total Flight Time</p>
                  <p className="text-lg font-semibold">8h 20m</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data Collected</p>
                  <p className="text-lg font-semibold">150 GB</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Battery Used</p>
                  <p className="text-lg font-semibold">75%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Conflicts Resolved</p>
                  <p className="text-lg font-semibold text-green-500">5/5 (100%)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Firmware & OTA Status */}
          <Card>
            <CardHeader>
              <CardTitle>Firmware & OTA Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Firmware Version at Deployment</span>
                <span className="text-sm font-medium">v4.5.1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">OTA Campaign Success Rate</span>
                <span className="text-sm font-medium text-green-500">100% (2/2 drones)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">QoS Profile Used</span>
                <span className="text-sm font-medium">Critical IoT Update (Terminated)</span>
              </div>
            </CardContent>
          </Card>

          {/* Export Options */}
          <div className="flex gap-2">
            <Button onClick={() => exportMissionReport('txt')} className="flex items-center gap-2">
              <Download size={16} />
              Export Report (.txt)
            </Button>
            <Button variant="outline" onClick={() => exportMissionReport('pdf')} className="flex items-center gap-2">
              <Download size={16} />
              Export Report (.pdf)
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Printer size={16} />
              Print Report
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (deploymentComplete) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => setDeploymentComplete(false)}>
            <ArrowLeft size={16} className="mr-2" />
            Back to Planning
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Swarm Mission: Hyderabad Security Swarm 1 - Active Patrol</h1>
            <p className="text-muted-foreground">Mission deployment successful</p>
          </div>
        </div>

        <Card className="text-center p-8">
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <CheckCircle size={80} className="text-green-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-700 mb-2">OTA Complete & Mission Deployed!</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                All required drones (D-001, D-003) are now on v4.5.1. 
                The Hyderabad Security Swarm 1 - Active Patrol mission has been successfully deployed to the mapped drones at Jun 17, 2025, 05:30 PM IST.
              </p>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-2 italic">
                QoS Profile Critical IoT Update is now automatically terminating as mission deployment is complete.
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <Button className="flex items-center gap-2">
                <Eye size={16} />
                View Live Mission Map
              </Button>
              <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowMissionReport(true)}>
                <FileText size={16} />
                View Mission Report
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Monitor size={16} />
                Return to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isOTAInProgress) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Mission Deployment: Awaiting OTA Completion</h1>
            <p className="text-muted-foreground">Updating firmware for mission-critical drones</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload size={20} />
              Firmware Update Status for Mission Drones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">OTA Progress</span>
                <span className="text-sm text-muted-foreground">{otaProgress}%</span>
              </div>
              <Progress value={otaProgress} className="w-full" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Drone D-001 (Surveillance)</span>
                <Badge variant="outline" className="text-blue-500">
                  {otaProgress > 50 ? "Complete" : "Updating..."}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Drone D-003 (Comm Relay)</span>
                <Badge variant="outline" className="text-blue-500">
                  {otaProgress > 90 ? "Complete" : "Updating..."}
                </Badge>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">{deploymentStatus}</p>
            </div>

            <Alert>
              <Wifi className="h-4 w-4" />
              <AlertDescription>
                QoS Critical IoT Update active. Ensuring high-speed data transfer. 
                Mission Hyderabad Security Swarm 1 Patrol is on standby.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isDeploying) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Swarm Mission Deployment</h1>
            <p className="text-muted-foreground">Deploying Hyderabad Security Swarm 1 - Active Patrol</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap size={20} />
              Deployment Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Deploying mission...</span>
                <span className="text-sm text-muted-foreground">{deploymentProgress}%</span>
              </div>
              <Progress value={deploymentProgress} className="w-full" />
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">{deploymentStatus}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => {}}>
          <ArrowLeft size={16} className="mr-2" />
          Back to Mission Planning
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Swarm Mission: Hyderabad Security Swarm 1 - Review & Deploy</h1>
          <p className="text-muted-foreground">
            Step 3 of 3: Final review and deployment preparation
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          {["Define Mission Area", "Create Tasks & Assign", "Review & Deploy Swarm"].map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index + 1 <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-gray-200 text-gray-500'
              }`}>
                {index + 1 < currentStep ? <CheckCircle size={16} /> : index + 1}
              </div>
              {index < 2 && (
                <div className={`w-16 h-1 ${index + 1 < currentStep ? 'bg-primary' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* OTA Success Notification */}
      {showOTANotification && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="flex items-center justify-between">
            <div>
              <span className="font-medium text-green-800">
                OTA Campaign Hyderabad Security Swarm 1 - M300 Batch Completed Successfully!
              </span>
              <br />
              <span className="text-green-700 text-sm">
                Target Drones Updated: 12/12 drones updated to Firmware v4.5.1. 
                Impact: 5 drones critical to this mission have been successfully updated.
              </span>
              <br />
              <span className="text-green-600 text-xs">
                Jun 17, 2025, 11:48:30 PM IST
              </span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="text-green-700 border-green-300">
                View OTA Report
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setShowOTANotification(false)}
                className="text-green-700"
              >
                <X size={14} />
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Mission Summary */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin size={20} />
                Mission Area Overview - HITEC City
              </CardTitle>
              <CardDescription>Complete mission map with all assigned tasks and drone paths</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-96 border">
                {/* Mock mission map */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg"></div>
                  {/* Building representations */}
                  <div className="absolute top-16 left-20 w-16 h-20 bg-gray-600 opacity-60 rounded"></div>
                  <div className="absolute top-24 left-60 w-20 h-24 bg-gray-600 opacity-60 rounded"></div>
                  <div className="absolute bottom-16 right-20 w-18 h-22 bg-gray-600 opacity-60 rounded"></div>
                </div>

                {/* Mission zones */}
                <div className="absolute top-8 left-8 bg-white p-2 rounded border shadow-sm">
                  <div className="text-xs font-medium">Mission Zones</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span>Perimeter Patrol</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded"></div>
                      <span>Acoustic Sweep</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                      <span>Comm Relay Point</span>
                    </div>
                  </div>
                </div>

                {/* Estimated flight paths */}
                <svg className="absolute inset-0 w-full h-full">
                  <path d="M50,100 Q200,50 350,150" stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="5,5" opacity="0.6" />
                  <path d="M100,200 Q250,150 400,250" stroke="#f97316" strokeWidth="2" fill="none" strokeDasharray="5,5" opacity="0.6" />
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield size={20} />
                Swarm Health Check
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <div>
                    <div className="text-sm font-medium">Drone Status</div>
                    <div className="text-xs text-muted-foreground">8/8 drones ready for launch (5 updated to v4.5.1 via OTA)</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <div>
                    <div className="text-sm font-medium">Firmware Compliance</div>
                    <div className="text-xs text-muted-foreground">All mission-critical drones running latest Firmware v4.5.1</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <div>
                    <div className="text-sm font-medium">Payload Check</div>
                    <div className="text-xs text-muted-foreground">All payloads verified and operational</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <div>
                    <div className="text-sm font-medium">Connectivity Check</div>
                    <div className="text-xs text-muted-foreground">Swarm communication link stable</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <div>
                    <div className="text-sm font-medium">Compliance Check</div>
                    <div className="text-xs text-muted-foreground">Mission adheres to Hyderabad No-Fly Zones</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="text-sm font-medium mb-2">Resource Estimates</div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>• Estimated mission time: 1.5 hours</div>
                  <div>• Battery consumption: 65% average</div>
                  <div>• Data storage: 2.3 GB estimated</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Firmware Readiness Check */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap size={20} />
            Firmware Readiness Check
          </CardTitle>
          <CardDescription>AI-Powered firmware compatibility assessment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            {firmwareCheck[firmwareStatus].icon && (
              (() => {
                const IconComponent = firmwareCheck[firmwareStatus].icon;
                return <IconComponent size={20} className={firmwareCheck[firmwareStatus].color} />;
              })()
            )}
            <div className="flex-1">
              <p className="font-medium">{firmwareCheck[firmwareStatus].status}</p>
              {"details" in firmwareCheck[firmwareStatus] && (
                <p className="text-sm text-muted-foreground mt-1">
                  {String((firmwareCheck[firmwareStatus] as any).details)}
                </p>
              )}
            </div>
          </div>

          {firmwareStatus !== "ready" && (
            <Button 
              onClick={handleInitiateOTA}
              className="flex items-center gap-2"
              variant={firmwareStatus === "critical" ? "default" : "outline"}
            >
              <Upload size={16} />
              {firmwareStatus === "critical" ? "Initiate Mandatory OTA" : "Initiate Required OTA Now"}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Task List Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users size={20} />
            Task List Summary
          </CardTitle>
          <CardDescription>Review all tasks and their assigned drones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Perimeter Surveillance</span>
                <Badge variant="outline" className="bg-blue-100 text-blue-700">Primary</Badge>
              </div>
              <div className="text-xs text-muted-foreground">D-001, D-004: High-res monitoring</div>
            </div>

            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Acoustic Sweep</span>
                <Badge variant="outline" className="bg-orange-100 text-orange-700">Active</Badge>
              </div>
              <div className="text-xs text-muted-foreground">D-002: Sound monitoring area B</div>
            </div>

            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Comm Relay</span>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-700">Stationary</Badge>
              </div>
              <div className="text-xs text-muted-foreground">D-003: Central communication hub</div>
            </div>

            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Payload Drops</span>
                <Badge variant="outline" className="bg-purple-100 text-purple-700">On-Demand</Badge>
              </div>
              <div className="text-xs text-muted-foreground">D-005, D-006: Emergency supplies</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(2)}>
          <ArrowLeft size={16} className="mr-2" />
          Back: Create Tasks
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar size={16} />
            Schedule Mission
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FileText size={16} />
            Save as Template
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setShowMissionReport(true)}
            className="flex items-center gap-2"
          >
            <FileText size={16} />
            View Mission Report
          </Button>
          <Button 
            onClick={handleDeployMission} 
            className="flex items-center gap-2"
            disabled={firmwareStatus === "critical"}
          >
            <Play size={16} />
            Deploy Swarm Mission Now
          </Button>
        </div>
      </div>

      {/* OTA Confirmation Modal */}
      <Dialog open={showOTAModal} onOpenChange={setShowOTAModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm OTA for Mission Deployment</DialogTitle>
            <DialogDescription>
              OTA Campaign Linked to Hyderabad Security Swarm 1 Mission
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2 text-sm">
              <div><span className="font-medium">Firmware Version:</span> v4.5.1 (Security Patch)</div>
              <div><span className="font-medium">Target Drones:</span> D-001 (Surveillance), D-003 (Comm Relay)</div>
              <div><span className="font-medium">Estimated Update Time:</span> Approx. 15 minutes per drone</div>
              <div><span className="font-medium">Network QoS:</span> Critical IoT Update (Active, 10 Mbps)</div>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Mission will automatically deploy once all selected drones successfully complete the firmware update.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowOTAModal(false)}>
              Cancel OTA & Return
            </Button>
            <Button 
              onClick={confirmOTAStart}
              className="flex items-center gap-2"
            >
              <Upload size={16} />
              Start OTA & Await Mission Deployment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deployment Confirmation Modal */}
      <Dialog open={showDeploymentModal} onOpenChange={setShowDeploymentModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Swarm Mission Deployment</DialogTitle>
            <DialogDescription>
              Please review the mission details before deployment
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2 text-sm">
              <div><span className="font-medium">Mission Name:</span> Hyderabad Security Swarm 1 - Active Patrol</div>
              <div><span className="font-medium">Swarm Members:</span> 8 Drones</div>
              <div><span className="font-medium">Key Tasks:</span> Perimeter Surveillance, Acoustic Sweep, Comm Relay, Payload Drops</div>
              <div><span className="font-medium">Autonomous Safety:</span> Enabled (Min. Horizontal: 5m, Min. Vertical: 3m)</div>
              <div><span className="font-medium">Firmware Status:</span> All critical drones updated to v4.5.1</div>
              <div><span className="font-medium">Target Location:</span> HITEC City, Hyderabad</div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={confirmDeployment}
                  onCheckedChange={(checked) => setConfirmDeployment(checked === true)}
                />
                <label className="text-sm">I understand that deploying this mission will launch the drones.</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={firmwareIntegrityCheck}
                  onCheckedChange={(checked) => setFirmwareIntegrityCheck(checked === true)}
                />
                <label className="text-sm">Initiate final pre-flight checks on drones for updated firmware integrity.</label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeploymentModal(false)}>
              Cancel
            </Button>
            <Button 
              onClick={confirmMissionDeployment}
              disabled={!confirmDeployment}
              className="flex items-center gap-2"
            >
              <Zap size={16} />
              Confirm & Deploy
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SwarmMissionPlanningDashboard;
