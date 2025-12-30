
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, Users, Shield, Settings, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SwarmConfigurationWizardProps {
  onBack: () => void;
  onComplete?: (swarmData: any) => void;
}

const SwarmConfigurationWizard = ({ onBack, onComplete }: SwarmConfigurationWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [swarmName, setSwarmName] = useState("Hyderabad Security Swarm 1");
  const [swarmDescription, setSwarmDescription] = useState("Dedicated to perimeter security and incident response for public events");
  const [selectedDrones, setSelectedDrones] = useState<string[]>(["D-001", "D-002", "D-003", "D-004"]);
  const [autonomousResolution, setAutonomousResolution] = useState(true);
  const [horizontalSeparation, setHorizontalSeparation] = useState([5]);
  const [verticalSeparation, setVerticalSeparation] = useState([3]);
  const [evasiveActionPriority, setEvasiveActionPriority] = useState("vertical");
  const [resolutionStrategy, setResolutionStrategy] = useState("decentralized");
  const { toast } = useToast();

  const mockDrones = [
    { id: "D-001", model: "Matrice 300 RTK", payload: "Zenmuse H20N", function: "High-Res Surveillance", capable: true },
    { id: "D-002", model: "Matrice 300 RTK", payload: "Loudspeaker", function: "Acoustic Monitoring", capable: true },
    { id: "D-003", model: "Mavic 3 Enterprise", payload: "Standard RGB", function: "Communication Relay", capable: true },
    { id: "D-004", model: "Matrice 300 RTK", payload: "Delivery Pod", function: "Payload Delivery", capable: true },
    { id: "D-005", model: "Mavic 3 Enterprise", payload: "Thermal Camera", function: "Thermal Imaging", capable: true },
  ];

  const handleComplete = () => {
    const swarmData = {
      name: swarmName,
      description: swarmDescription,
      members: selectedDrones,
      autonomy: {
        enabled: autonomousResolution,
        horizontalSeparation: horizontalSeparation[0],
        verticalSeparation: verticalSeparation[0],
        evasiveActionPriority,
        resolutionStrategy
      }
    };

    toast({
      title: "Swarm Configuration Saved",
      description: `${swarmName} has been configured successfully with autonomous conflict resolution.`,
    });

    if (onComplete) {
      onComplete(swarmData);
    } else {
      onBack();
    }
  };

  const renderProgressIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {[
          "Define Swarm & Members",
          "Assign Functions", 
          "Configure Autonomy & Safety",
          "Review Swarm"
        ].map((step, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              index + 1 <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-gray-200 text-gray-500'
            }`}>
              {index + 1 < currentStep ? <CheckCircle size={16} /> : index + 1}
            </div>
            {index < 3 && (
              <div className={`w-16 h-1 ${index + 1 < currentStep ? 'bg-primary' : 'bg-gray-200'}`} />
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
              <CardTitle className="flex items-center gap-2">
                <Users size={20} />
                Define Swarm & Members
              </CardTitle>
              <CardDescription>Configure your swarm identity and select member drones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="swarm-name">Swarm Name</Label>
                <Input
                  id="swarm-name"
                  value={swarmName}
                  onChange={(e) => setSwarmName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="swarm-description">Description</Label>
                <Input
                  id="swarm-description"
                  value={swarmDescription}
                  onChange={(e) => setSwarmDescription(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <Label>Select Swarm Members</Label>
                {mockDrones.map((drone) => (
                  <div key={drone.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      checked={selectedDrones.includes(drone.id)}
                      onCheckedChange={(checked) => {
                        if (checked === true) {
                          setSelectedDrones([...selectedDrones, drone.id]);
                        } else {
                          setSelectedDrones(selectedDrones.filter(id => id !== drone.id));
                        }
                      }}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{drone.id} - {drone.model}</div>
                      <div className="text-sm text-muted-foreground">{drone.payload}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings size={20} />
                Assign Functions
              </CardTitle>
              <CardDescription>Define specific roles for each drone in the swarm</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedDrones.map((droneId) => {
                  const drone = mockDrones.find(d => d.id === droneId);
                  return (
                    <div key={droneId} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{drone?.id} - {drone?.model}</div>
                          <div className="text-sm text-muted-foreground">Payload: {drone?.payload}</div>
                        </div>
                        <Badge variant="outline">{drone?.function}</Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield size={20} />
                Configure Autonomy & Safety
              </CardTitle>
              <CardDescription>Define autonomous conflict resolution parameters for the swarm</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={autonomousResolution}
                    onCheckedChange={(checked) => setAutonomousResolution(checked === true)}
                  />
                  <Label className="text-base font-medium">Enable Autonomous Conflict Resolution (Aerodynamic)</Label>
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  Enables drones within this swarm to detect and autonomously avoid collisions by adjusting flight paths to maintain safe separation.
                </p>
                {!autonomousResolution && (
                  <div className="ml-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 text-red-700">
                      <AlertTriangle size={16} />
                      <span className="font-medium">Warning</span>
                    </div>
                    <p className="text-sm text-red-600 mt-1">
                      Disabling autonomous conflict resolution significantly increases the risk of mid-air collisions within the swarm.
                    </p>
                  </div>
                )}
              </div>

              {autonomousResolution && (
                <>
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Separation Minimums</Label>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label>Minimum Horizontal Separation</Label>
                          <span className="text-sm font-medium">{horizontalSeparation[0]} meters</span>
                        </div>
                        <Slider
                          value={horizontalSeparation}
                          onValueChange={setHorizontalSeparation}
                          max={20}
                          min={3}
                          step={1}
                          className="w-full"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Range: 3m-20m. Defines the safety bubble around each drone horizontally.
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <Label>Minimum Vertical Separation</Label>
                          <span className="text-sm font-medium">{verticalSeparation[0]} meters</span>
                        </div>
                        <Slider
                          value={verticalSeparation}
                          onValueChange={setVerticalSeparation}
                          max={10}
                          min={2}
                          step={1}
                          className="w-full"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Range: 2m-10m. Defines the safety bubble around each drone vertically.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-medium">Evasive Action Priority</Label>
                    <RadioGroup value={evasiveActionPriority} onValueChange={setEvasiveActionPriority}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="vertical" id="vertical" />
                        <Label htmlFor="vertical">Prioritize Vertical Adjustment (Default)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="horizontal" id="horizontal" />
                        <Label htmlFor="horizontal">Prioritize Horizontal Adjustment</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dynamic" id="dynamic" />
                        <Label htmlFor="dynamic">Dynamic (AI-Decided)</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-medium">Conflict Resolution Strategy</Label>
                    <RadioGroup value={resolutionStrategy} onValueChange={setResolutionStrategy}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="decentralized" id="decentralized" />
                        <Label htmlFor="decentralized">Decentralized (Drone-to-Drone Consensus)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="centralized" id="centralized" />
                        <Label htmlFor="centralized">Centralized (Swarm Lead Decision)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hybrid" id="hybrid" />
                        <Label htmlFor="hybrid">Hybrid (Ground Control Oversight)</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle size={16} />
                      <span className="font-medium">Aerodynamic Capabilities Check</span>
                    </div>
                    <p className="text-sm text-green-600 mt-1">
                      All swarm members capable of autonomous evasive maneuvers.
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle size={20} />
                Review Swarm
              </CardTitle>
              <CardDescription>Final review of your swarm configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Swarm Details</h3>
                <div className="space-y-1 text-sm">
                  <div><span className="font-medium">Name:</span> {swarmName}</div>
                  <div><span className="font-medium">Description:</span> {swarmDescription}</div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Swarm Members ({selectedDrones.length})</h3>
                <div className="space-y-2">
                  {selectedDrones.map((droneId) => {
                    const drone = mockDrones.find(d => d.id === droneId);
                    return (
                      <div key={droneId} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">{drone?.id} - {drone?.model}</span>
                        <Badge variant="outline" className="text-xs">{drone?.function}</Badge>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Autonomous Safety Settings</h3>
                <div className="space-y-1 text-sm">
                  <div><span className="font-medium">Autonomous Conflict Resolution:</span> {autonomousResolution ? 'Enabled' : 'Disabled'}</div>
                  {autonomousResolution && (
                    <>
                      <div><span className="font-medium">Min. Horizontal Separation:</span> {horizontalSeparation[0]} meters</div>
                      <div><span className="font-medium">Min. Vertical Separation:</span> {verticalSeparation[0]} meters</div>
                      <div><span className="font-medium">Evasive Action Priority:</span> {evasiveActionPriority}</div>
                      <div><span className="font-medium">Resolution Strategy:</span> {resolutionStrategy}</div>
                    </>
                  )}
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  <span className="font-medium">Compliance Reminder:</span> Ensure all drones are registered with DGCA and local Hyderabad authorities. Autonomous operations require specific regulatory clearances in some airspace types.
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
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" />
          Back to Swarm Dashboard
        </Button>
        <div>
          <h1 className="text-2xl font-bold">New Swarm Configuration Workflow</h1>
          <p className="text-muted-foreground">
            Step {currentStep} of 4: Configure your intelligent drone swarm
          </p>
        </div>
      </div>

      {renderProgressIndicator()}
      {renderStepContent()}

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          <ArrowLeft size={16} className="mr-2" />
          Previous
        </Button>
        
        <div className="flex gap-2">
          {currentStep === 4 ? (
            <>
              <Button variant="outline" onClick={() => {}}>
                Save Swarm as Draft
              </Button>
              <Button onClick={handleComplete} className="flex items-center gap-2">
                <Zap size={16} />
                Save Swarm & Proceed to Mission Planning
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
            >
              Next
              <ArrowRight size={16} className="ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwarmConfigurationWizard;
