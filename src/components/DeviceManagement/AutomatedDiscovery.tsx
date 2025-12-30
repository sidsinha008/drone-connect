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
  Search, 
  Wifi, 
  Shield, 
  Zap, 
  CheckCircle, 
  AlertTriangle,
  Loader,
  Radar,
  Network,
  Key,
  Download,
  Upload,
  Plus,
  Eye,
  Settings,
  Bluetooth,
  Radio,
  SignalHigh,
  SignalMedium,
  SignalLow,
  Users,
  Database
} from "lucide-react";
import BulkDroneOnboarding from "./BulkDroneOnboarding";

const AutomatedDiscovery = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [scanType, setScanType] = useState<"network" | "bluetooth" | "wifi">("network");
  const [isBluetoothScanning, setIsBluetoothScanning] = useState(false);
  const [isWifiScanning, setIsWifiScanning] = useState(false);

  const discoveredDevices = [
    {
      id: "unprovisioned_001",
      macAddress: "AA:BB:CC:DD:EE:01",
      manufacturer: "DroneWorks Inc.",
      model: "Scout X1",
      serialNumber: "SN789012345",
      firmwareVersion: "v2.4.1",
      securityChip: "TPM 2.0",
      signalStrength: -45,
      lastSeen: "Just now",
      provisioningMethod: "Auto-Detect",
      trustLevel: "Verified",
      connectionType: "Network"
    },
    {
      id: "bluetooth_drone_001",
      macAddress: "BB:CC:DD:EE:FF:02",
      manufacturer: "AeroTech Systems",
      model: "Cargo Pro BT",
      serialNumber: "SN890123456",
      firmwareVersion: "v1.9.8",
      securityChip: "HSM",
      signalStrength: -52,
      lastSeen: "30 seconds ago",
      provisioningMethod: "Bluetooth Pairing",
      trustLevel: "Pending Verification",
      connectionType: "Bluetooth",
      bluetoothName: "AeroTech-Cargo-Pro-BT",
      bluetoothClass: "Drone Device"
    },
    {
      id: "wifi_drone_001",
      macAddress: "CC:DD:EE:FF:AA:03",
      manufacturer: "VisionDrone Ltd.",
      model: "Vista Air WiFi",
      serialNumber: "SN901234567",
      firmwareVersion: "v3.0.2",
      securityChip: "Secure Element",
      signalStrength: -38,
      lastSeen: "1 minute ago",
      provisioningMethod: "WiFi Direct",
      trustLevel: "Unknown Device",
      connectionType: "WiFi",
      wifiSSID: "VisionDrone-Vista-Air",
      wifiSecurity: "WPA3"
    },
    {
      id: "bluetooth_drone_002",
      macAddress: "DD:EE:FF:AA:BB:04",
      manufacturer: "SwiftFly Technologies",
      model: "QuickConnect Mini",
      serialNumber: "SN012345678",
      firmwareVersion: "v2.1.5",
      securityChip: "TPM 2.0",
      signalStrength: -60,
      lastSeen: "2 minutes ago",
      provisioningMethod: "Bluetooth Low Energy",
      trustLevel: "Verified",
      connectionType: "Bluetooth",
      bluetoothName: "SwiftFly-Mini-BLE",
      bluetoothClass: "Low Energy Drone"
    }
  ];

  const bulkTemplates = [
    {
      id: "surveillance_fleet",
      name: "Surveillance Fleet Template",
      description: "Optimized for Scout X1 surveillance drones",
      protocol: "MQTT",
      security: "Client Certificate",
      applicableModels: ["Scout X1", "Scout X2"]
    },
    {
      id: "cargo_fleet",
      name: "Cargo Operations Template",
      description: "Heavy-lift configuration for Cargo Pro drones",
      protocol: "CoAP",
      security: "Pre-Shared Key",
      applicableModels: ["Cargo Pro", "Cargo Elite"]
    },
    {
      id: "mapping_fleet",
      name: "Mapping & Survey Template",
      description: "High-precision mapping configuration",
      protocol: "HTTP/S",
      security: "API Key + OAuth2",
      applicableModels: ["Vista Air", "Survey Elite"]
    },
    {
      id: "bluetooth_template",
      name: "Bluetooth Drone Template",
      description: "Optimized for Bluetooth-enabled drones",
      protocol: "Bluetooth",
      security: "PIN Pairing + Encryption",
      applicableModels: ["Cargo Pro BT", "QuickConnect Mini"]
    },
    {
      id: "wifi_template",
      name: "WiFi Direct Template",
      description: "WiFi Direct configuration for wireless drones",
      protocol: "WiFi Direct",
      security: "WPA3 + Certificate",
      applicableModels: ["Vista Air WiFi"]
    }
  ];

  const handleStartScan = (type: "network" | "bluetooth" | "wifi" = "network") => {
    setScanType(type);
    
    if (type === "bluetooth") {
      setIsBluetoothScanning(true);
    } else if (type === "wifi") {
      setIsWifiScanning(true);
    } else {
      setIsScanning(true);
    }
    
    setScanProgress(0);
    
    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          setIsScanning(false);
          setIsBluetoothScanning(false);
          setIsWifiScanning(false);
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const toggleDeviceSelection = (deviceId: string) => {
    setSelectedDevices(prev => 
      prev.includes(deviceId) 
        ? prev.filter(id => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  const getTrustLevelColor = (level: string) => {
    switch(level) {
      case "Verified": return "bg-green-100 text-green-800 border-green-300";
      case "Pending Verification": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Unknown Device": return "bg-red-100 text-red-800 border-red-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getSignalIcon = (strength: number) => {
    if (strength > -50) return { icon: SignalHigh, color: "text-green-500" };
    if (strength > -70) return { icon: SignalMedium, color: "text-yellow-500" };
    return { icon: SignalLow, color: "text-red-500" };
  };

  const getConnectionIcon = (type: string) => {
    switch(type) {
      case "Bluetooth": return { icon: Bluetooth, color: "text-blue-500" };
      case "WiFi": return { icon: Wifi, color: "text-green-500" };
      default: return { icon: Network, color: "text-gray-500" };
    }
  };

  const filteredDevicesByType = discoveredDevices.filter(device => {
    if (scanType === "bluetooth") return device.connectionType === "Bluetooth";
    if (scanType === "wifi") return device.connectionType === "WiFi";
    return device.connectionType === "Network";
  });

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radar className="text-primary" size={24} />
            Automated Drone Discovery & Zero-Touch Provisioning
          </CardTitle>
          <CardDescription>
            AI-powered device discovery with automated security provisioning via Network, Bluetooth, WiFi, and bulk onboarding
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="discovery" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="discovery">Device Discovery</TabsTrigger>
          <TabsTrigger value="bulk-onboarding">Bulk Onboarding</TabsTrigger>
          <TabsTrigger value="provisioning">Bulk Provisioning</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="security">Security Center</TabsTrigger>
        </TabsList>

        <TabsContent value="discovery" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Multi-Protocol Discovery Scanner</CardTitle>
                  <CardDescription>
                    Discover drones via Network, Bluetooth, and WiFi connections
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Settings size={16} />
                    Scan Settings
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Connection Type Selector */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <Card className={`cursor-pointer border-2 ${scanType === "network" ? "border-primary bg-primary/5" : "border-gray-200"}`} 
                      onClick={() => setScanType("network")}>
                  <CardContent className="p-4 text-center">
                    <Network className="mx-auto mb-2 text-primary" size={24} />
                    <h3 className="font-semibold">Network Discovery</h3>
                    <p className="text-sm text-muted-foreground">Scan local network for IP-connected drones</p>
                    <Button 
                      size="sm" 
                      className="mt-2"
                      onClick={(e) => { e.stopPropagation(); handleStartScan("network"); }}
                      disabled={isScanning}
                    >
                      {isScanning ? <Loader className="animate-spin mr-1" size={14} /> : <Search size={14} className="mr-1" />}
                      {isScanning ? "Scanning..." : "Scan Network"}
                    </Button>
                  </CardContent>
                </Card>

                <Card className={`cursor-pointer border-2 ${scanType === "bluetooth" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`} 
                      onClick={() => setScanType("bluetooth")}>
                  <CardContent className="p-4 text-center">
                    <Bluetooth className="mx-auto mb-2 text-blue-500" size={24} />
                    <h3 className="font-semibold">Bluetooth Discovery</h3>
                    <p className="text-sm text-muted-foreground">Scan for Bluetooth-enabled drones</p>
                    <Button 
                      size="sm" 
                      className="mt-2 bg-blue-500 hover:bg-blue-600"
                      onClick={(e) => { e.stopPropagation(); handleStartScan("bluetooth"); }}
                      disabled={isBluetoothScanning}
                    >
                      {isBluetoothScanning ? <Loader className="animate-spin mr-1" size={14} /> : <Bluetooth size={14} className="mr-1" />}
                      {isBluetoothScanning ? "Scanning..." : "Scan Bluetooth"}
                    </Button>
                  </CardContent>
                </Card>

                <Card className={`cursor-pointer border-2 ${scanType === "wifi" ? "border-green-500 bg-green-50" : "border-gray-200"}`} 
                      onClick={() => setScanType("wifi")}>
                  <CardContent className="p-4 text-center">
                    <Wifi className="mx-auto mb-2 text-green-500" size={24} />
                    <h3 className="font-semibold">WiFi Discovery</h3>
                    <p className="text-sm text-muted-foreground">Scan for WiFi Direct capable drones</p>
                    <Button 
                      size="sm" 
                      className="mt-2 bg-green-500 hover:bg-green-600"
                      onClick={(e) => { e.stopPropagation(); handleStartScan("wifi"); }}
                      disabled={isWifiScanning}
                    >
                      {isWifiScanning ? <Loader className="animate-spin mr-1" size={14} /> : <Wifi size={14} className="mr-1" />}
                      {isWifiScanning ? "Scanning..." : "Scan WiFi"}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Scanning Progress */}
              {(isScanning || isBluetoothScanning || isWifiScanning) && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Radar className="text-primary animate-spin" size={16} />
                    <span className="text-sm font-medium">
                      Scanning {scanType === "bluetooth" ? "Bluetooth devices" : scanType === "wifi" ? "WiFi networks" : "network interfaces"}...
                    </span>
                  </div>
                  <Progress value={scanProgress} className="w-full" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Progress: {scanProgress}% - {
                      scanType === "bluetooth" ? "Checking Bluetooth LE devices" :
                      scanType === "wifi" ? "Scanning WiFi Direct networks" :
                      "Checking subnet 192.168.1.0/24"
                    }
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">
                    Discovered {scanType === "bluetooth" ? "Bluetooth" : scanType === "wifi" ? "WiFi" : "Network"} Devices ({filteredDevicesByType.length})
                  </h3>
                  {selectedDevices.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {selectedDevices.length} selected
                      </span>
                      <Button size="sm" className="flex items-center gap-1">
                        <Zap size={14} />
                        Auto-Provision
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {filteredDevicesByType.map((device) => {
                    const signalInfo = getSignalIcon(device.signalStrength);
                    const connectionInfo = getConnectionIcon(device.connectionType);
                    return (
                      <Card key={device.id} className="border-2 border-dashed">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <Checkbox
                              checked={selectedDevices.includes(device.id)}
                              onCheckedChange={() => toggleDeviceSelection(device.id)}
                            />
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <connectionInfo.icon className={connectionInfo.color} size={16} />
                                <h4 className="font-medium">{device.model}</h4>
                                <Badge variant="outline" className={getTrustLevelColor(device.trustLevel)}>
                                  {device.trustLevel}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {device.provisioningMethod}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {device.connectionType}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                <div>
                                  <span className="text-muted-foreground">
                                    {device.connectionType === "Bluetooth" ? "BT Address:" : "MAC:"}
                                  </span>
                                  <div className="font-mono text-xs">{device.macAddress}</div>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Serial:</span>
                                  <div className="font-mono text-xs">{device.serialNumber}</div>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Firmware:</span>
                                  <div className="text-xs">{device.firmwareVersion}</div>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Security:</span>
                                  <div className="flex items-center gap-1 text-xs">
                                    <Shield size={12} className="text-green-500" />
                                    {device.securityChip}
                                  </div>
                                </div>
                              </div>

                              {/* Connection-specific details */}
                              {device.connectionType === "Bluetooth" && (
                                <div className="grid grid-cols-2 gap-3 text-sm mt-2 pt-2 border-t">
                                  <div>
                                    <span className="text-muted-foreground">BT Name:</span>
                                    <div className="text-xs">{device.bluetoothName}</div>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Device Class:</span>
                                    <div className="text-xs">{device.bluetoothClass}</div>
                                  </div>
                                </div>
                              )}

                              {device.connectionType === "WiFi" && (
                                <div className="grid grid-cols-2 gap-3 text-sm mt-2 pt-2 border-t">
                                  <div>
                                    <span className="text-muted-foreground">SSID:</span>
                                    <div className="text-xs">{device.wifiSSID}</div>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Security:</span>
                                    <div className="text-xs">{device.wifiSecurity}</div>
                                  </div>
                                </div>
                              )}
                              
                              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <signalInfo.icon className={signalInfo.color} size={12} />
                                    {device.signalStrength} dBm
                                  </span>
                                  <span>Last seen: {device.lastSeen}</span>
                                  <span>Manufacturer: {device.manufacturer}</span>
                                </div>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                                    <Eye size={12} />
                                    Inspect
                                  </Button>
                                  <Button size="sm" className="flex items-center gap-1">
                                    <Plus size={12} />
                                    Provision
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk-onboarding" className="space-y-4">
          <BulkDroneOnboarding />
        </TabsContent>

        <TabsContent value="provisioning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Provisioning Wizard</CardTitle>
              <CardDescription>
                Configure multiple drones simultaneously using predefined templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="bulk-file">Upload Drone Manifest (CSV/JSON)</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-sm text-gray-600 mb-2">
                      Drop your manifest file here or click to browse
                    </p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Supports CSV, JSON formats. Max file size: 10MB
                    </p>
                  </div>
                </div>

                <div>
                  <Label>Select Provisioning Template</Label>
                  <div className="grid gap-3 mt-2">
                    {bulkTemplates.map((template) => (
                      <Card key={template.id} className="cursor-pointer border-2 hover:border-primary/50">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{template.name}</h4>
                              <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                              <div className="flex gap-2">
                                <Badge variant="outline" className="text-xs">{template.protocol}</Badge>
                                <Badge variant="outline" className="text-xs">{template.security}</Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground mb-1">Compatible Models:</p>
                              <div className="text-xs">
                                {template.applicableModels.join(", ")}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex items-center gap-2">
                    <Zap size={16} />
                    Start Bulk Provisioning
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download size={16} />
                    Download Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Provisioning Templates</CardTitle>
                  <CardDescription>
                    Manage reusable configuration templates for different drone types
                  </CardDescription>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus size={16} />
                  Create Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bulkTemplates.map((template) => (
                  <Card key={template.id} className="border-2">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{template.name}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                          <div className="flex gap-2">
                            <Badge variant="outline">{template.protocol}</Badge>
                            <Badge variant="outline">{template.security}</Badge>
                            <Badge variant="secondary">{template.applicableModels.length} models</Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline">Clone</Button>
                          <Button size="sm" variant="outline" className="text-red-600">Delete</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="text-green-500" size={20} />
                Security & Identity Management
              </CardTitle>
              <CardDescription>
                Advanced security features and identity verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-3">Hardware Security Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="text-green-500" size={16} />
                        <span className="text-sm">TPM 2.0 Attestation</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="text-green-500" size={16} />
                        <span className="text-sm">HSM Integration</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Configured</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="text-yellow-500" size={16} />
                        <span className="text-sm">DID Registry</span>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Certificate Management</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="text-sm font-medium">Root CA Certificate</div>
                        <div className="text-xs text-muted-foreground">Expires: Dec 2025</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Valid</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="text-sm font-medium">Client Certificates</div>
                        <div className="text-xs text-muted-foreground">15 active, 3 expiring soon</div>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Review</Badge>
                    </div>
                    
                    <Button size="sm" className="w-full flex items-center gap-2">
                      <Key size={14} />
                      Generate New Certificate
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AutomatedDiscovery;
