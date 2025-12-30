
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Download, 
  Plus, 
  CheckCircle, 
  AlertTriangle,
  XCircle,
  FileSpreadsheet,
  Edit3,
  Users,
  MapPin,
  Calendar,
  Shield,
  Database,
  ArrowRight,
  ArrowLeft,
  Zap,
  Eye,
  Settings,
  Trash2,
  Copy
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DroneEntry {
  id: string;
  serialNumber: string;
  model: string;
  manufacturer: string;
  dgcaUaid: string;
  batteryCapacity: string;
  payloadCompatibility: string;
  purchaseDate: string;
  homeBase: string;
  status: "valid" | "warning" | "error";
  validationMessages: string[];
  assignedTeam?: string;
  assignedPilot?: string;
  maintenanceSchedule?: string;
}

const BulkDroneOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingMethod, setOnboardingMethod] = useState<"upload" | "manual" | null>(null);
  const [droneEntries, setDroneEntries] = useState<DroneEntry[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [validationComplete, setValidationComplete] = useState(false);

  // Mock validation results
  const mockDroneEntries: DroneEntry[] = [
    {
      id: "1",
      serialNumber: "DJI-M300-001234",
      model: "Matrice 300 RTK",
      manufacturer: "DJI",
      dgcaUaid: "IN-TN-CHN-001234",
      batteryCapacity: "5935mAh",
      payloadCompatibility: "Zenmuse H20T, P1",
      purchaseDate: "2024-01-15",
      homeBase: "Chennai Main Office",
      status: "valid",
      validationMessages: [],
      assignedTeam: "Survey Team",
      assignedPilot: "Unassigned",
      maintenanceSchedule: "Monthly Check"
    },
    {
      id: "2",
      serialNumber: "DJI-M30-002345",
      model: "Matrice 30T",
      manufacturer: "DJI",
      dgcaUaid: "IN-TN-CHN-002345",
      batteryCapacity: "3850mAh",
      payloadCompatibility: "Integrated Camera",
      purchaseDate: "2024-02-20",
      homeBase: "Perungudi Satellite Office",
      status: "warning",
      validationMessages: ["DGCA UAID registration expires in 30 days"],
      assignedTeam: "Security Operations",
      assignedPilot: "Unassigned",
      maintenanceSchedule: "Quarterly Service"
    },
    {
      id: "3",
      serialNumber: "PHANTOM-003456",
      model: "Phantom 4 RTK",
      manufacturer: "DJI",
      dgcaUaid: "INVALID-FORMAT",
      batteryCapacity: "5870mAh",
      payloadCompatibility: "Integrated Camera",
      purchaseDate: "2024-03-10",
      homeBase: "Chepauk Stadium Depot",
      status: "error",
      validationMessages: ["Invalid DGCA UAID format", "Serial number already exists in system"],
      assignedTeam: "Facilities Management",
      assignedPilot: "Unassigned",
      maintenanceSchedule: "Monthly Check"
    }
  ];

  const steps = [
    { number: 1, title: "Choose Method", description: "Select onboarding approach" },
    { number: 2, title: "Upload/Input Data", description: "Provide drone information" },
    { number: 3, title: "Review & Validate", description: "Verify and correct data" },
    { number: 4, title: "Configure & Assign", description: "Set up assignments" },
    { number: 5, title: "Confirm Onboarding", description: "Complete the process" }
  ];

  const homeBaseOptions = [
    "Chennai Main Office",
    "Perungudi Satellite Office", 
    "Chepauk Stadium Depot",
    "Ennore Port Base",
    "Kalpakkam Site Office"
  ];

  const teamOptions = [
    "Survey Team",
    "Security Operations", 
    "Facilities Management",
    "Emergency Response",
    "Infrastructure Inspection"
  ];

  const maintenanceTemplates = [
    "Monthly Check",
    "Quarterly Service",
    "Bi-Annual Overhaul",
    "Custom Schedule"
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Simulate file processing
      setTimeout(() => {
        setDroneEntries(mockDroneEntries);
        setValidationComplete(true);
      }, 2000);
    }
  };

  const handleValidation = () => {
    setValidationComplete(true);
    setDroneEntries(mockDroneEntries);
  };

  const getStatusIcon = (status: "valid" | "warning" | "error") => {
    switch(status) {
      case "valid": return <CheckCircle className="text-green-500" size={16} />;
      case "warning": return <AlertTriangle className="text-yellow-500" size={16} />;
      case "error": return <XCircle className="text-red-500" size={16} />;
    }
  };

  const getStatusColor = (status: "valid" | "warning" | "error") => {
    switch(status) {
      case "valid": return "text-green-600 bg-green-50 border-green-200";
      case "warning": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "error": return "text-red-600 bg-red-50 border-red-200";
    }
  };

  const validDrones = droneEntries.filter(d => d.status === "valid").length;
  const warningDrones = droneEntries.filter(d => d.status === "warning").length;
  const errorDrones = droneEntries.filter(d => d.status === "error").length;

  const canProceed = () => {
    switch(currentStep) {
      case 1: return onboardingMethod !== null;
      case 2: return onboardingMethod === "upload" ? uploadedFile !== null : droneEntries.length > 0;
      case 3: return validationComplete && errorDrones === 0;
      case 4: return true;
      case 5: return true;
      default: return false;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Bulk Drone Onboarding</h2>
            <Badge variant="outline">{currentStep}/5</Badge>
          </div>
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep > step.number ? 'bg-primary border-primary text-white' :
                  currentStep === step.number ? 'border-primary text-primary' :
                  'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.number ? <CheckCircle size={16} /> : step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 ml-2 ${
                    currentStep > step.number ? 'bg-primary' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            {steps.map(step => (
              <div key={step.number} className="text-center max-w-20">
                <div className="font-medium">{step.title}</div>
                <div>{step.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">
          {/* Step 1: Choose Method */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Choose Onboarding Method</h3>
                <p className="text-muted-foreground mb-6">Select the most convenient way to provide drone data</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card 
                  className={`cursor-pointer border-2 transition-all ${
                    onboardingMethod === "upload" ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setOnboardingMethod("upload")}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <FileSpreadsheet className="text-primary" size={24} />
                      <h4 className="font-semibold">Upload Spreadsheet (CSV/Excel)</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Ideal for large fleets. Prepare your drone data in a structured file.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Download size={14} className="mr-2" />
                      Download Template
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      We recommend using our template for seamless import.
                    </p>
                  </CardContent>
                </Card>

                <Card 
                  className={`cursor-pointer border-2 transition-all ${
                    onboardingMethod === "manual" ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setOnboardingMethod("manual")}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Edit3 className="text-primary" size={24} />
                      <h4 className="font-semibold">Manual Batch Input</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Enter drone details one by one in a structured table. Best for smaller batches (up to 10-20 drones).
                    </p>
                    <div className="h-8" /> {/* Spacer to align with other card */}
                    <p className="text-xs text-muted-foreground">
                      You'll be presented with a customizable table for direct input.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Step 2: Upload/Input Data */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Upload / Input Data</h3>
                <p className="text-muted-foreground mb-6">Provide the actual drone fleet data</p>
              </div>

              {onboardingMethod === "upload" && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-lg font-medium mb-2">Drop your CSV or Excel file here</p>
                    <p className="text-sm text-muted-foreground mb-4">or click to browse files</p>
                    <Input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileUpload}
                      className="max-w-xs mx-auto"
                    />
                  </div>

                  {uploadedFile && (
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileSpreadsheet className="text-primary" size={20} />
                            <span className="font-medium">{uploadedFile.name}</span>
                            <Badge variant="outline">Processing...</Badge>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download size={14} className="mr-2" />
                            Download Error Report
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {onboardingMethod === "manual" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Manual Drone Entry</Label>
                    <Button size="sm" onClick={() => setDroneEntries([...droneEntries, {
                      id: Date.now().toString(),
                      serialNumber: "",
                      model: "",
                      manufacturer: "",
                      dgcaUaid: "",
                      batteryCapacity: "",
                      payloadCompatibility: "",
                      purchaseDate: "",
                      homeBase: "",
                      status: "valid",
                      validationMessages: []
                    }])}>
                      <Plus size={14} className="mr-2" />
                      Add Row
                    </Button>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Serial Number</TableHead>
                          <TableHead>Model</TableHead>
                          <TableHead>Manufacturer</TableHead>
                          <TableHead>DGCA UAID</TableHead>
                          <TableHead>Home Base</TableHead>
                          <TableHead className="w-12"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {droneEntries.map((entry) => (
                          <TableRow key={entry.id}>
                            <TableCell>
                              <Input
                                value={entry.serialNumber}
                                onChange={(e) => {
                                  const updated = droneEntries.map(d => 
                                    d.id === entry.id ? {...d, serialNumber: e.target.value} : d
                                  );
                                  setDroneEntries(updated);
                                }}
                                placeholder="DJI-M300-001234"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                value={entry.model}
                                onChange={(e) => {
                                  const updated = droneEntries.map(d => 
                                    d.id === entry.id ? {...d, model: e.target.value} : d
                                  );
                                  setDroneEntries(updated);
                                }}
                                placeholder="Matrice 300 RTK"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                value={entry.manufacturer}
                                onChange={(e) => {
                                  const updated = droneEntries.map(d => 
                                    d.id === entry.id ? {...d, manufacturer: e.target.value} : d
                                  );
                                  setDroneEntries(updated);
                                }}
                                placeholder="DJI"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                value={entry.dgcaUaid}
                                onChange={(e) => {
                                  const updated = droneEntries.map(d => 
                                    d.id === entry.id ? {...d, dgcaUaid: e.target.value} : d
                                  );
                                  setDroneEntries(updated);
                                }}
                                placeholder="IN-TN-CHN-001234"
                              />
                            </TableCell>
                            <TableCell>
                              <Select 
                                value={entry.homeBase} 
                                onValueChange={(value) => {
                                  const updated = droneEntries.map(d => 
                                    d.id === entry.id ? {...d, homeBase: value} : d
                                  );
                                  setDroneEntries(updated);
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select base" />
                                </SelectTrigger>
                                <SelectContent>
                                  {homeBaseOptions.map(base => (
                                    <SelectItem key={base} value={base}>{base}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setDroneEntries(droneEntries.filter(d => d.id !== entry.id));
                                }}
                              >
                                <Trash2 size={14} />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {droneEntries.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Database size={48} className="mx-auto mb-4 opacity-50" />
                      <p>No drone entries yet. Click "Add Row" to start.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Review & Validate */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Review & Validate</h3>
                  <p className="text-muted-foreground">Comprehensive overview of all drone data for final verification</p>
                </div>
                <Button onClick={handleValidation} disabled={validationComplete}>
                  <Shield size={16} className="mr-2" />
                  {validationComplete ? "Validation Complete" : "Run AI Validation"}
                </Button>
              </div>

              {/* Validation Summary */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">{droneEntries.length}</div>
                    <div className="text-sm text-muted-foreground">Total Drones</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-green-600">{validDrones}</div>
                    <div className="text-sm text-muted-foreground">Valid</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-yellow-600">{warningDrones}</div>
                    <div className="text-sm text-muted-foreground">Warnings</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-red-600">{errorDrones}</div>
                    <div className="text-sm text-muted-foreground">Errors</div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Data Table */}
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Serial Number</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead>DGCA UAID</TableHead>
                      <TableHead>Home Base</TableHead>
                      <TableHead>Validation Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {droneEntries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(entry.status)}
                            <Badge variant="outline" className={getStatusColor(entry.status)}>
                              {entry.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{entry.serialNumber}</TableCell>
                        <TableCell>{entry.model}</TableCell>
                        <TableCell className="font-mono text-sm">{entry.dgcaUaid}</TableCell>
                        <TableCell>{entry.homeBase}</TableCell>
                        <TableCell>
                          {entry.validationMessages.length > 0 ? (
                            <div className="space-y-1">
                              {entry.validationMessages.map((msg, idx) => (
                                <div key={idx} className="text-xs text-muted-foreground">
                                  {msg}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-green-600 text-sm">All checks passed</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* Step 4: Configure & Assign */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Configure & Assign</h3>
                <p className="text-muted-foreground mb-6">Apply standard settings and assign drones to teams/locations</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings size={20} />
                    Default Settings for All Drones
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>Default Operating Team</Label>
                      <Select defaultValue="Survey Team">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {teamOptions.map(team => (
                            <SelectItem key={team} value={team}>{team}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Default Maintenance Schedule</Label>
                      <Select defaultValue="Monthly Check">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {maintenanceTemplates.map(template => (
                            <SelectItem key={template} value={template}>{template}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Copy size={16} className="mr-2" />
                    Apply to All Valid Drones
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Individual Drone Configuration</CardTitle>
                  <CardDescription>Override defaults for specific drones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {droneEntries.filter(d => d.status !== "error").map((entry) => (
                      <div key={entry.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{entry.serialNumber}</div>
                          <div className="text-sm text-muted-foreground">{entry.model}</div>
                        </div>
                        <div className="w-48">
                          <Select value={entry.assignedTeam} onValueChange={(value) => {
                            const updated = droneEntries.map(d => 
                              d.id === entry.id ? {...d, assignedTeam: value} : d
                            );
                            setDroneEntries(updated);
                          }}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select team" />
                            </SelectTrigger>
                            <SelectContent>
                              {teamOptions.map(team => (
                                <SelectItem key={team} value={team}>{team}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="w-48">
                          <Select value={entry.maintenanceSchedule} onValueChange={(value) => {
                            const updated = droneEntries.map(d => 
                              d.id === entry.id ? {...d, maintenanceSchedule: value} : d
                            );
                            setDroneEntries(updated);
                          }}>
                            <SelectTrigger>
                              <SelectValue placeholder="Maintenance" />
                            </SelectTrigger>
                            <SelectContent>
                              {maintenanceTemplates.map(template => (
                                <SelectItem key={template} value={template}>{template}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 5: Confirm Onboarding */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Confirm Onboarding</h3>
                <p className="text-muted-foreground mb-6">Final review before completing the process</p>
              </div>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {droneEntries.filter(d => d.status !== "error").length}
                  </div>
                  <div className="text-lg font-medium mb-4">Drones Ready for Onboarding</div>
                  <div className="text-sm text-muted-foreground mb-6">
                    Estimated time to complete setup: 2 minutes
                  </div>
                  
                  <div className="space-y-4">
                    <Button size="lg" className="w-full">
                      <Zap size={20} className="mr-2" />
                      Onboard Drones Now
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Eye size={16} className="mr-2" />
                        View Fleet Dashboard
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Download size={16} className="mr-2" />
                        Download Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Onboarding Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {droneEntries.filter(d => d.status !== "error").map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="text-green-500" size={16} />
                          <span className="font-mono text-sm">{entry.serialNumber}</span>
                          <span className="text-sm">{entry.model}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {entry.assignedTeam} • {entry.homeBase}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>
            
            {currentStep < 5 ? (
              <Button 
                onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                disabled={!canProceed()}
              >
                Next
                <ArrowRight size={16} className="ml-2" />
              </Button>
            ) : (
              <Button variant="outline">
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkDroneOnboarding;
