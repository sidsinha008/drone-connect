import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  X,
  FileText,
  Key,
  Scan,
  Eye,
  Download,
  Clock,
  User
} from "lucide-react";

interface FirmwareItem {
  id: string;
  version: string;
  manufacturer: string;
  modelCompatibility: string[];
  uploadDate: string;
  cybersecurityStatus: "clean" | "warning" | "malicious";
  uploadedBy: string;
  releaseNotes: string;
  hash: string;
}

const mockFirmware: FirmwareItem[] = [
  {
    id: "fw-001",
    version: "v3.1.2-FlightCtrl",
    manufacturer: "DJI",
    modelCompatibility: ["Mavic 3", "Mavic 3 RTK"],
    uploadDate: "2024-01-15",
    cybersecurityStatus: "clean",
    uploadedBy: "admin@chennaidrones.com",
    releaseNotes: "Enhanced flight stability and battery optimization",
    hash: "a1b2c3d4e5f6..."
  },
  {
    id: "fw-002",
    version: "v1.5.0-PayloadComm",
    manufacturer: "Yuneec",
    modelCompatibility: ["H520E"],
    uploadDate: "2024-01-12",
    cybersecurityStatus: "warning",
    uploadedBy: "tech@chennaidrones.com",
    releaseNotes: "Payload communication protocol updates",
    hash: "f6e5d4c3b2a1..."
  }
];

const SecureFirmwareManagement = () => {
  const [activeTab, setActiveTab] = useState("library");
  const [uploadStep, setUploadStep] = useState(1);
  const [uploadMethod, setUploadMethod] = useState<"device" | "api" | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [scanStatus, setScanStatus] = useState<"clean" | "warning" | "malicious" | null>(null);
  const [firmwareMetadata, setFirmwareMetadata] = useState({
    version: "",
    manufacturer: "",
    models: [],
    releaseNotes: ""
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "clean":
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Clean</Badge>;
      case "warning":
        return <Badge variant="outline" className="text-orange-600 border-orange-600"><AlertTriangle className="h-3 w-3 mr-1" />Warning</Badge>;
      case "malicious":
        return <Badge variant="destructive"><X className="h-3 w-3 mr-1" />Malicious</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const startCybersecurityScan = () => {
    setUploadStep(2);
    setScanProgress(0);
    setScanComplete(false);
    
    // Simulate cybersecurity scanning
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanComplete(true);
          // Randomly assign a status for demo
          const statuses: ("clean" | "warning" | "malicious")[] = ["clean", "warning", "malicious"];
          setScanStatus(statuses[Math.floor(Math.random() * statuses.length)]);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const getScanStatusDisplay = () => {
    if (!scanComplete) return null;
    
    switch (scanStatus) {
      case "clean":
        return (
          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2 text-green-700 mb-2">
              <CheckCircle className="h-5 w-5" />
              <span className="font-semibold">Cybersecurity Status: CLEAN</span>
            </div>
            <p className="text-sm text-green-600">Firmware cleared for deployment. No threats detected.</p>
          </div>
        );
      case "warning":
        return (
          <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
            <div className="flex items-center gap-2 text-orange-700 mb-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-semibold">Cybersecurity Status: WARNINGS DETECTED</span>
            </div>
            <p className="text-sm text-orange-600">Minor vulnerabilities detected. Review detailed report before deployment.</p>
          </div>
        );
      case "malicious":
        return (
          <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
            <div className="flex items-center gap-2 text-red-700 mb-2">
              <X className="h-5 w-5" />
              <span className="font-semibold">Cybersecurity Status: MALICIOUS / HIGH RISK</span>
            </div>
            <p className="text-sm text-red-600">Critical security threats detected. DO NOT DEPLOY.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Secure Firmware Management</h2>
          <p className="text-muted-foreground">AI-powered cybersecurity screening for drone firmware</p>
        </div>
        <Button onClick={() => setActiveTab("upload")}>
          <Upload className="h-4 w-4 mr-2" />
          Upload New Firmware
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="library">Firmware Library</TabsTrigger>
          <TabsTrigger value="upload">Upload Firmware</TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Existing Firmware Versions
              </CardTitle>
              <CardDescription>
                All firmware versions with cybersecurity screening status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockFirmware.map((firmware) => (
                  <div key={firmware.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{firmware.version}</h4>
                        <p className="text-sm text-muted-foreground">{firmware.manufacturer}</p>
                        <p className="text-xs text-muted-foreground">
                          Compatible: {firmware.modelCompatibility.join(", ")}
                        </p>
                      </div>
                      {getStatusBadge(firmware.cybersecurityStatus)}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Upload Date:</span>
                        <p>{firmware.uploadDate}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Uploaded By:</span>
                        <p>{firmware.uploadedBy}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Hash:</span>
                        <p className="font-mono text-xs">{firmware.hash}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Deploy
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          
          {/* Progress Indicator */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center space-x-2 ${uploadStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">1</div>
                    <span>Select File/API</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${uploadStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">2</div>
                    <span>Cybersecurity Screening</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${uploadStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">3</div>
                    <span>Review Details</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${uploadStep >= 4 ? 'text-blue-600' : 'text-gray-400'}`}>
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">4</div>
                    <span>Publish to Library</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {uploadStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Step 1: Select Upload Method & File</CardTitle>
                <CardDescription>Choose your preferred method for supplying firmware</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div 
                    className={`p-6 border-2 rounded-lg cursor-pointer transition-colors ${
                      uploadMethod === "device" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}
                    onClick={() => setUploadMethod("device")}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Upload className="h-8 w-8 text-blue-500" />
                      <h3 className="font-semibold">Upload via Device</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Browse your local machine to upload firmware files (.bin, .hex, .fw)
                    </p>
                    
                    {uploadMethod === "device" && (
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-gray-600 mb-2">Drop firmware file here or click to upload</p>
                          <input
                            type="file"
                            accept=".bin,.hex,.fw"
                            onChange={handleFileSelect}
                            className="hidden"
                            id="firmware-upload"
                          />
                          <label htmlFor="firmware-upload">
                            <Button variant="outline" type="button">Browse Files</Button>
                          </label>
                          {selectedFile && (
                            <p className="mt-2 text-sm text-green-600">Selected: {selectedFile.name}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div 
                    className={`p-6 border-2 rounded-lg cursor-pointer transition-colors ${
                      uploadMethod === "api" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}
                    onClick={() => setUploadMethod("api")}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Key className="h-8 w-8 text-blue-500" />
                      <h3 className="font-semibold">Upload via API</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Use our API endpoint to programmatically upload firmware
                    </p>
                    
                    {uploadMethod === "api" && (
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-100 rounded font-mono text-sm">
                          POST /api/v1/firmware/upload
                        </div>
                        <Button variant="outline" size="sm">
                          <Key className="h-3 w-3 mr-1" />
                          Generate API Key
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {uploadMethod && (
                  <div className="space-y-4">
                    <h4 className="font-medium">Firmware Metadata</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="version">Firmware Version</Label>
                        <Input 
                          id="version" 
                          placeholder="e.g., v4.5.0"
                          value={firmwareMetadata.version}
                          onChange={(e) => setFirmwareMetadata({...firmwareMetadata, version: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="manufacturer">Manufacturer</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select manufacturer" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dji">DJI</SelectItem>
                            <SelectItem value="yuneec">Yuneec</SelectItem>
                            <SelectItem value="autel">Autel</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="models">Compatible Drone Models</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select compatible models" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mavic3">Mavic 3</SelectItem>
                          <SelectItem value="mavic3rtk">Mavic 3 RTK</SelectItem>
                          <SelectItem value="m300rtk">M300 RTK</SelectItem>
                          <SelectItem value="phantom4rtk">Phantom 4 RTK</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="release-notes">Release Notes/Description</Label>
                      <Textarea 
                        id="release-notes" 
                        placeholder="Describe changes, bug fixes, features..."
                        value={firmwareMetadata.releaseNotes}
                        onChange={(e) => setFirmwareMetadata({...firmwareMetadata, releaseNotes: e.target.value})}
                      />
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button 
                        onClick={startCybersecurityScan}
                        disabled={!selectedFile && uploadMethod === "device"}
                      >
                        Next: Begin Screening
                      </Button>
                      <Button variant="outline" onClick={() => {setUploadStep(1); setUploadMethod(null);}}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {uploadStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scan className="h-5 w-5" />
                  Step 2: Cybersecurity Screening
                </CardTitle>
                <CardDescription>AI-powered security analysis in progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    {!scanComplete && (
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                          <Shield className="h-8 w-8 text-blue-600 animate-pulse" />
                        </div>
                        <h3 className="text-lg font-semibold">Running Cybersecurity Scan...</h3>
                        <Progress value={scanProgress} className="w-full" />
                        <div className="text-sm text-muted-foreground">
                          {scanProgress < 25 && "Phase 1: Signature Verification..."}
                          {scanProgress >= 25 && scanProgress < 50 && "Phase 2: Malware Scan (AI-driven)..."}
                          {scanProgress >= 50 && scanProgress < 75 && "Phase 3: Vulnerability Analysis (AI-driven)..."}
                          {scanProgress >= 75 && "Phase 4: Behavioral Simulation (AI Sandbox)..."}
                        </div>
                      </div>
                    )}

                    {scanComplete && getScanStatusDisplay()}
                  </div>

                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Detailed Security Report</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <span className="text-sm font-medium">Scan Duration:</span>
                          <p className="text-sm">12.3 seconds</p>
                        </div>
                        
                        {scanComplete && (
                          <>
                            <div>
                              <span className="text-sm font-medium">Threat Breakdown:</span>
                              {scanStatus === "clean" && (
                                <p className="text-sm text-green-600">No threats detected</p>
                              )}
                              {scanStatus === "warning" && (
                                <p className="text-sm text-orange-600">Minor vulnerabilities found</p>
                              )}
                              {scanStatus === "malicious" && (
                                <p className="text-sm text-red-600">Critical threats identified</p>
                              )}
                            </div>
                            
                            <div>
                              <span className="text-sm font-medium">Severity Score:</span>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div 
                                  className={`h-2 rounded-full ${
                                    scanStatus === "clean" ? "bg-green-500 w-[20%]" :
                                    scanStatus === "warning" ? "bg-orange-500 w-[50%]" :
                                    "bg-red-500 w-[90%]"
                                  }`}
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {scanComplete && (
                  <div className="flex gap-2 pt-4">
                    {(scanStatus === "clean" || scanStatus === "warning") && (
                      <Button onClick={() => setUploadStep(3)}>
                        Next: Review Details
                      </Button>
                    )}
                    <Button variant="outline" onClick={() => setUploadStep(1)}>
                      Cancel Upload
                    </Button>
                    <Button variant="outline" onClick={() => setUploadStep(1)}>
                      Back
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {uploadStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Step 3: Review Details</CardTitle>
                <CardDescription>Final review before publishing to firmware library</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Firmware Details</h4>
                    <div className="p-4 border rounded-lg space-y-2">
                      <div><span className="font-medium">Version:</span> {firmwareMetadata.version}</div>
                      <div><span className="font-medium">Manufacturer:</span> {firmwareMetadata.manufacturer}</div>
                      <div><span className="font-medium">File:</span> {selectedFile?.name}</div>
                      <div><span className="font-medium">Size:</span> {selectedFile ? (selectedFile.size / 1024 / 1024).toFixed(2) + ' MB' : 'N/A'}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Security Status</h4>
                    {getScanStatusDisplay()}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Action Confirmation</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="add-library" defaultChecked />
                      <Label htmlFor="add-library">Add to Firmware Library</Label>
                    </div>
                    {scanStatus === "clean" && (
                      <div className="flex items-center space-x-2">
                        <Checkbox id="approve-deployment" />
                        <Label htmlFor="approve-deployment">Mark as Approved for Deployment</Label>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Checkbox id="update-policy" />
                      <Label htmlFor="update-policy">Attach to Default Update Policy</Label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={() => setUploadStep(4)}>
                    Next: Publish to Library
                  </Button>
                  <Button variant="outline" onClick={() => setUploadStep(2)}>
                    Back
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {uploadStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  Firmware Published Successfully!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 border border-green-200 bg-green-50 rounded-lg">
                  <h4 className="font-medium mb-2">{firmwareMetadata.version}</h4>
                  <p className="text-sm text-muted-foreground mb-2">Now available in your Firmware Library for deployment</p>
                  {getScanStatusDisplay()}
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => setActiveTab("library")}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Firmware Library
                  </Button>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Create New OTA Campaign
                  </Button>
                  <Button variant="outline" onClick={() => {setUploadStep(1); setUploadMethod(null); setSelectedFile(null);}}>
                    Upload Another Firmware
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecureFirmwareManagement;
