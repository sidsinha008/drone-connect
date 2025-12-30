
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  Users, 
  Shield, 
  CheckCircle,
  Eye,
  Settings
} from "lucide-react";
import AirspaceComplianceManager from "./AirspaceComplianceManager";
import AirspaceCompliancePlanner from "./AirspaceCompliancePlanner";
import { chennaiAirspaceZones } from "./ChennaiAirspaceDatabase";
import { AirspaceZone, PathValidationResult } from "./types";

interface EnhancedSwarmConfigurationWizardProps {
  onBack: () => void;
  onComplete: (swarmData: any) => void;
}

const EnhancedSwarmConfigurationWizard = ({ onBack, onComplete }: EnhancedSwarmConfigurationWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [missionArea, setMissionArea] = useState("");
  const [airspaceZones, setAirspaceZones] = useState<AirspaceZone[]>(chennaiAirspaceZones);
  const [bufferDistance, setBufferDistance] = useState(100);
  const [showBufferZones, setShowBufferZones] = useState(true);
  const [tasks, setTasks] = useState<any[]>([]);

  // Mock validation results for demonstration
  const mockValidationResults: PathValidationResult[] = [
    {
      taskId: "task-1",
      taskName: "Perimeter Surveillance",
      status: "clear",
      conflicts: [],
      restrictionRule: "hard-geofence"
    },
    {
      taskId: "task-2", 
      taskName: "Acoustic Sweep Area B",
      status: "warning",
      conflicts: [
        {
          zoneId: "tfr-chepauk-stadium",
          zoneName: "Chepauk Stadium",
          zoneType: "TFR",
          severity: "medium",
          intersectionType: "proximity",
          recommendedAction: "Acknowledge TFR and proceed or adjust path to maintain 200m clearance"
        }
      ],
      restrictionRule: "warn-record"
    },
    {
      taskId: "task-3",
      taskName: "High-Priority Delivery",
      status: "prohibited",
      conflicts: [
        {
          zoneId: "nfz-chennai-airport",
          zoneName: "Chennai International Airport",
          zoneType: "NFZ",
          severity: "critical",
          intersectionType: "crosses",
          recommendedAction: "Reroute delivery path to avoid airport NFZ completely"
        }
      ],
      restrictionRule: "hard-geofence"
    }
  ];

  const steps = [
    { id: 1, name: "Define Mission Area", icon: MapPin },
    { id: 2, name: "Create Tasks & Assign (with Airspace Layers)", icon: Users },
    { id: 3, name: "Review & Deploy Swarm", icon: Shield }
  ];

  const handleZoneToggle = (zoneId: string, enabled: boolean) => {
    setAirspaceZones(zones => 
      zones.map(zone => 
        zone.id === zoneId ? { ...zone, active: enabled } : zone
      )
    );
  };

  const handleBufferChange = (distance: number) => {
    setBufferDistance(distance);
  };

  const handleShowBufferToggle = (show: boolean) => {
    setShowBufferZones(show);
  };

  const handleRuleChange = (taskId: string, rule: string) => {
    console.log(`Task ${taskId} rule changed to ${rule}`);
  };

  const handleAcknowledgeConflict = (taskId: string, conflictId: string) => {
    console.log(`Acknowledged conflict ${conflictId} for task ${taskId}`);
  };

  const handleAdjustPath = (taskId: string) => {
    console.log(`Adjusting path for task ${taskId}`);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete({
        missionArea,
        airspaceZones: airspaceZones.filter(zone => zone.active),
        bufferDistance,
        showBufferZones,
        tasks
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const getStepProgress = () => (currentStep / 3) * 100;

  const canProceed = () => {
    switch (currentStep) {
      case 1: return missionArea !== "";
      case 2: return mockValidationResults.filter(r => r.status === "prohibited").length === 0;
      case 3: return true;
      default: return false;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={handleBack}>
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Enhanced Swarm Mission Configuration</h1>
          <p className="text-muted-foreground">
            Configure intelligent swarm missions with integrated airspace compliance
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Configuration Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(getStepProgress())}%</span>
            </div>
            <Progress value={getStepProgress()} className="w-full" />
            
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-4">
                {steps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <div key={step.id} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step.id <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {step.id < currentStep ? <CheckCircle size={16} /> : <IconComponent size={16} />}
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-16 h-1 ${step.id < currentStep ? 'bg-primary' : 'bg-gray-200'}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm font-medium">{steps[currentStep - 1].name}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      {currentStep === 1 && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Define Mission Area - Chennai Operations</CardTitle>
              <CardDescription>Select the operational area for your swarm mission</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-64 border flex items-center justify-center">
                  <p className="text-muted-foreground">Interactive Chennai Map</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button 
                    variant={missionArea === "HITEC City" ? "default" : "outline"}
                    onClick={() => setMissionArea("HITEC City")}
                  >
                    HITEC City
                  </Button>
                  <Button 
                    variant={missionArea === "Chennai Port" ? "default" : "outline"}
                    onClick={() => setMissionArea("Chennai Port")}
                  >
                    Chennai Port
                  </Button>
                  <Button 
                    variant={missionArea === "Anna Nagar" ? "default" : "outline"}
                    onClick={() => setMissionArea("Anna Nagar")}
                  >
                    Anna Nagar
                  </Button>
                  <Button 
                    variant={missionArea === "Custom Area" ? "default" : "outline"}
                    onClick={() => setMissionArea("Custom Area")}
                  >
                    Custom Area
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Mission Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Selected Area</label>
                  <p className="text-lg font-semibold">{missionArea || "None selected"}</p>
                </div>
                {missionArea && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Estimated Area:</span>
                      <span>2.5 km²</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Max Altitude:</span>
                      <span>120m AGL</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Nearby Restrictions:</span>
                      <span>3 zones detected</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Mission Planning Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mission Map with Airspace Overlays</CardTitle>
                <CardDescription>Plan tasks while visualizing restricted airspace zones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-96 border relative">
                  <div className="absolute inset-0 opacity-20">
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg"></div>
                  </div>

                  {/* Simulated airspace zones */}
                  <div className="absolute top-16 left-20 w-16 h-16 bg-red-500 opacity-30 rounded-full border-2 border-red-600"></div>
                  <div className="absolute top-12 left-16 text-xs bg-white px-2 py-1 rounded border">NFZ: Airport</div>
                  
                  <div className="absolute bottom-20 right-20 w-20 h-12 bg-orange-500 opacity-30 rounded border-2 border-orange-600 border-dashed"></div>
                  <div className="absolute bottom-16 right-16 text-xs bg-white px-2 py-1 rounded border">TFR: Stadium</div>

                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye size={14} className="mr-1" />
                      3D View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings size={14} className="mr-1" />
                      Tools
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <AirspaceCompliancePlanner
              validationResults={mockValidationResults}
              onRuleChange={handleRuleChange}
              onAcknowledgeConflict={handleAcknowledgeConflict}
              onAdjustPath={handleAdjustPath}
            />
          </div>

          {/* Airspace Compliance Sidebar */}
          <div>
            <AirspaceComplianceManager
              zones={airspaceZones}
              bufferDistance={bufferDistance}
              showBufferZones={showBufferZones}
              onZoneToggle={handleZoneToggle}
              onBufferChange={handleBufferChange}
              onShowBufferToggle={handleShowBufferToggle}
            />
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Review & Deploy Swarm with Airspace Compliance</CardTitle>
            <CardDescription>Final review including comprehensive airspace compliance check</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-3">Mission Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Mission Area:</span>
                    <span className="font-medium">{missionArea}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Restrictions:</span>
                    <span className="font-medium">{airspaceZones.filter(z => z.active).length} zones</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Buffer Distance:</span>
                    <span className="font-medium">{bufferDistance}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tasks Planned:</span>
                    <span className="font-medium">{mockValidationResults.length}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Airspace Compliance Summary</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">NFZ/RZ Compliance: Clear</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-orange-100 text-orange-700">1 TFR Warning</Badge>
                    <span className="text-sm">Requires acknowledgment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Emergency protocols active</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft size={16} className="mr-2" />
          {currentStep === 1 ? "Cancel" : "Back"}
        </Button>
        
        <Button onClick={handleNext} disabled={!canProceed()}>
          {currentStep === 3 ? "Deploy Mission" : "Next"}
          {currentStep < 3 && <ArrowRight size={16} className="ml-2" />}
        </Button>
      </div>
    </div>
  );
};

export default EnhancedSwarmConfigurationWizard;
