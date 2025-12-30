
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Copy, Eye, EyeOff, Lock, Wifi, Globe, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DroneOnboardingWizardProps {
  onBack: () => void;
}

const DroneOnboardingWizard = ({ onBack }: DroneOnboardingWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    droneId: "",
    model: "",
    serialNumber: "",
    manufacturer: "",
    owner: "",
    location: "",
    description: "",
    
    // Protocol Configuration
    protocol: "",
    
    // Protocol-specific fields
    mqttBroker: "",
    mqttPort: "1883",
    mqttClientId: "",
    mqttUsername: "",
    mqttPassword: "",
    mqttTopics: "",
    mqttQos: "1",
    mqttCleanSession: true,
    
    coapServer: "",
    coapPort: "5683",
    coapResources: "",
    coapSecurity: "NoSec",
    
    httpEndpoint: "",
    httpMethod: "POST",
    httpAuth: "API Key",
    httpToken: "",
    
    customHost: "",
    customPort: "",
    customFormat: "",
    
    // Security
    authMethod: "API Key",
    apiKey: "",
    generateCert: false,
    
    // Network
    wifiSSID: "",
    wifiPassword: "",
    cellularAPN: ""
  });
  
  const [showPasswords, setShowPasswords] = useState(false);
  const [generatedApiKey, setGeneratedApiKey] = useState("");
  
  const droneModels = [
    "Scout X1 - Surveillance",
    "Scout X2 - Advanced Surveillance",
    "Cargo Pro - Heavy Lift",
    "Vista Air - Mapping",
    "Survey Elite - Precision Mapping",
    "Patrol Drone - Security",
    "Custom Model"
  ];
  
  const protocols = [
    { value: "mqtt", label: "MQTT (TCP/TLS)", description: "Message Queue Telemetry Transport" },
    { value: "coap", label: "CoAP (UDP/DTLS)", description: "Constrained Application Protocol" },
    { value: "http", label: "HTTP/S REST API", description: "RESTful HTTP API" },
    { value: "custom", label: "Custom UDP/TCP", description: "Proprietary or specialized protocol" }
  ];
  
  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const generateApiKey = () => {
    const key = `pk_${Math.random().toString(36).substr(2, 24)}_${Date.now()}`;
    setGeneratedApiKey(key);
    updateFormData("apiKey", key);
  };
  
  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };
  
  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
  
  const renderProtocolFields = () => {
    switch (formData.protocol) {
      case "mqtt":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mqttBroker">Broker Hostname/IP</Label>
                <Input
                  id="mqttBroker"
                  placeholder="mqtt.platform.com"
                  value={formData.mqttBroker}
                  onChange={(e) => updateFormData("mqttBroker", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="mqttPort">Port</Label>
                <Input
                  id="mqttPort"
                  placeholder="1883"
                  value={formData.mqttPort}
                  onChange={(e) => updateFormData("mqttPort", e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="mqttClientId">Client ID</Label>
              <Input
                id="mqttClientId"
                placeholder="drone_001"
                value={formData.mqttClientId}
                onChange={(e) => updateFormData("mqttClientId", e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mqttUsername">Username</Label>
                <Input
                  id="mqttUsername"
                  value={formData.mqttUsername}
                  onChange={(e) => updateFormData("mqttUsername", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="mqttPassword">Password</Label>
                <div className="relative">
                  <Input
                    id="mqttPassword"
                    type={showPasswords ? "text" : "password"}
                    value={formData.mqttPassword}
                    onChange={(e) => updateFormData("mqttPassword", e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPasswords(!showPasswords)}
                  >
                    {showPasswords ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="mqttTopics">Topics (comma-separated)</Label>
              <Input
                id="mqttTopics"
                placeholder="drones/+/telemetry, drones/+/commands"
                value={formData.mqttTopics}
                onChange={(e) => updateFormData("mqttTopics", e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mqttCleanSession"
                checked={formData.mqttCleanSession}
                onCheckedChange={(checked) => updateFormData("mqttCleanSession", checked)}
              />
              <Label htmlFor="mqttCleanSession">Clean Session</Label>
            </div>
          </div>
        );
        
      case "coap":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="coapServer">Server Hostname/IP</Label>
                <Input
                  id="coapServer"
                  placeholder="coap.platform.com"
                  value={formData.coapServer}
                  onChange={(e) => updateFormData("coapServer", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="coapPort">Port</Label>
                <Input
                  id="coapPort"
                  placeholder="5683"
                  value={formData.coapPort}
                  onChange={(e) => updateFormData("coapPort", e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="coapResources">Resource Paths</Label>
              <Input
                id="coapResources"
                placeholder="/telemetry, /commands"
                value={formData.coapResources}
                onChange={(e) => updateFormData("coapResources", e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="coapSecurity">Security Mode</Label>
              <Select value={formData.coapSecurity} onValueChange={(value) => updateFormData("coapSecurity", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NoSec">No Security</SelectItem>
                  <SelectItem value="PreSharedKey">Pre-Shared Key</SelectItem>
                  <SelectItem value="RawPublicKey">Raw Public Key</SelectItem>
                  <SelectItem value="Certificates">Certificates</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
        
      case "http":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="httpEndpoint">Endpoint URL</Label>
              <Input
                id="httpEndpoint"
                placeholder="https://api.platform.com/drones/{id}/data"
                value={formData.httpEndpoint}
                onChange={(e) => updateFormData("httpEndpoint", e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="httpMethod">Request Method</Label>
                <Select value={formData.httpMethod} onValueChange={(value) => updateFormData("httpMethod", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="httpAuth">Authentication</Label>
                <Select value={formData.httpAuth} onValueChange={(value) => updateFormData("httpAuth", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="API Key">API Key</SelectItem>
                    <SelectItem value="Bearer Token">Bearer Token</SelectItem>
                    <SelectItem value="OAuth2">OAuth2</SelectItem>
                    <SelectItem value="Basic Auth">Basic Auth</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="httpToken">API Key/Token</Label>
              <Input
                id="httpToken"
                value={formData.httpToken}
                onChange={(e) => updateFormData("httpToken", e.target.value)}
              />
            </div>
          </div>
        );
        
      case "custom":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customHost">Host/IP</Label>
                <Input
                  id="customHost"
                  placeholder="192.168.1.100"
                  value={formData.customHost}
                  onChange={(e) => updateFormData("customHost", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="customPort">Port</Label>
                <Input
                  id="customPort"
                  placeholder="8080"
                  value={formData.customPort}
                  onChange={(e) => updateFormData("customPort", e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="customFormat">Data Format Description</Label>
              <Textarea
                id="customFormat"
                placeholder="Describe the custom protocol format and structure..."
                value={formData.customFormat}
                onChange={(e) => updateFormData("customFormat", e.target.value)}
              />
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">Onboard New Drone</h1>
          <p className="text-muted-foreground">Step {currentStep} of 4</p>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step <= currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step < currentStep ? <Check size={16} /> : step}
            </div>
            {step < 4 && (
              <div
                className={`w-12 h-0.5 ${
                  step < currentStep ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      
      <Card className="glass-card">
        <CardContent className="p-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Basic Drone Information</h3>
                <p className="text-muted-foreground">
                  Enter the basic identification details for your drone
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="droneId">Drone ID (DIN/VIN) *</Label>
                  <Input
                    id="droneId"
                    placeholder="DRN-001-2024"
                    value={formData.droneId}
                    onChange={(e) => updateFormData("droneId", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="model">Model/Variant *</Label>
                  <Select value={formData.model} onValueChange={(value) => updateFormData("model", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select drone model" />
                    </SelectTrigger>
                    <SelectContent>
                      {droneModels.map((model) => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="serialNumber">Serial Number</Label>
                  <Input
                    id="serialNumber"
                    placeholder="SN123456789"
                    value={formData.serialNumber}
                    onChange={(e) => updateFormData("serialNumber", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="manufacturer">Manufacturer</Label>
                  <Input
                    id="manufacturer"
                    placeholder="DroneWorks Inc."
                    value={formData.manufacturer}
                    onChange={(e) => updateFormData("manufacturer", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="owner">Owner/Department</Label>
                  <Input
                    id="owner"
                    placeholder="Security Department"
                    value={formData.owner}
                    onChange={(e) => updateFormData("owner", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Initial Location</Label>
                  <Input
                    id="location"
                    placeholder="Warehouse A - Zone 1"
                    value={formData.location}
                    onChange={(e) => updateFormData("location", e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description/Notes</Label>
                <Textarea
                  id="description"
                  placeholder="Additional details about this drone..."
                  value={formData.description}
                  onChange={(e) => updateFormData("description", e.target.value)}
                />
              </div>
            </div>
          )}
          
          {/* Step 2: Protocol Configuration */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">IoT Protocol Configuration</h3>
                <p className="text-muted-foreground">
                  Select and configure the communication protocol for your drone
                </p>
              </div>
              
              <div>
                <Label>Connection Protocol *</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {protocols.map((protocol) => (
                    <Card
                      key={protocol.value}
                      className={`cursor-pointer border-2 transition-colors ${
                        formData.protocol === protocol.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => updateFormData("protocol", protocol.value)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            {protocol.value === "mqtt" && <Wifi className="text-primary" size={20} />}
                            {protocol.value === "coap" && <Globe className="text-primary" size={20} />}
                            {protocol.value === "http" && <Globe className="text-primary" size={20} />}
                            {protocol.value === "custom" && <Zap className="text-primary" size={20} />}
                          </div>
                          <div>
                            <div className="font-medium">{protocol.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {protocol.description}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              {formData.protocol && (
                <div>
                  <h4 className="font-medium mb-4">Protocol-Specific Configuration</h4>
                  {renderProtocolFields()}
                </div>
              )}
            </div>
          )}
          
          {/* Step 3: Security Configuration */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Security & Authentication</h3>
                <p className="text-muted-foreground">
                  Configure security credentials and authentication methods
                </p>
              </div>
              
              <div>
                <Label>Authentication Method</Label>
                <Select value={formData.authMethod} onValueChange={(value) => updateFormData("authMethod", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="API Key">API Key</SelectItem>
                    <SelectItem value="Certificate">Client Certificate</SelectItem>
                    <SelectItem value="PSK">Pre-Shared Key</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {formData.authMethod === "API Key" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="apiKey">API Key</Label>
                    <div className="flex gap-2">
                      <Input
                        id="apiKey"
                        value={formData.apiKey || generatedApiKey}
                        onChange={(e) => updateFormData("apiKey", e.target.value)}
                        placeholder="Enter API key or generate one"
                      />
                      <Button type="button" variant="outline" onClick={generateApiKey}>
                        Generate
                      </Button>
                      {(formData.apiKey || generatedApiKey) && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => navigator.clipboard.writeText(formData.apiKey || generatedApiKey)}
                        >
                          <Copy size={16} />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {(formData.apiKey || generatedApiKey) && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 text-blue-800 font-medium mb-2">
                        <Lock size={16} />
                        Important: Save this API key
                      </div>
                      <p className="text-sm text-blue-700">
                        This API key will be required to configure your physical drone. 
                        Make sure to copy and securely store it before proceeding.
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              <div className="space-y-4">
                <h4 className="font-medium">Network Credentials (Optional)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="wifiSSID">Wi-Fi SSID</Label>
                    <Input
                      id="wifiSSID"
                      placeholder="DroneNetwork"
                      value={formData.wifiSSID}
                      onChange={(e) => updateFormData("wifiSSID", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="wifiPassword">Wi-Fi Password</Label>
                    <Input
                      id="wifiPassword"
                      type={showPasswords ? "text" : "password"}
                      value={formData.wifiPassword}
                      onChange={(e) => updateFormData("wifiPassword", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 4: Review & Connect */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Review & Connect</h3>
                <p className="text-muted-foreground">
                  Review your configuration and complete the drone onboarding
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 bg-accent/50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium">Drone ID</div>
                    <div className="text-sm text-muted-foreground">{formData.droneId}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Model</div>
                    <div className="text-sm text-muted-foreground">{formData.model}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Protocol</div>
                    <div className="text-sm text-muted-foreground">
                      {protocols.find(p => p.value === formData.protocol)?.label}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Authentication</div>
                    <div className="text-sm text-muted-foreground">{formData.authMethod}</div>
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="font-medium text-green-800 mb-2">
                    Next Steps for Physical Drone Configuration
                  </div>
                  <ol className="text-sm text-green-700 space-y-1 list-decimal list-inside">
                    <li>Access your drone's configuration interface</li>
                    <li>Enter the API key: <code className="bg-white px-1 rounded">{formData.apiKey || generatedApiKey}</code></li>
                    <li>Configure the connection endpoint as provided</li>
                    <li>Test the connection from the drone's diagnostic panel</li>
                    <li>Monitor connection status in the Device Management dashboard</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft size={16} className="mr-2" />
              Previous
            </Button>
            
            {currentStep < 4 ? (
              <Button
                onClick={nextStep}
                disabled={!formData.droneId || !formData.model}
              >
                Next
                <ArrowRight size={16} className="ml-2" />
              </Button>
            ) : (
              <Button onClick={onBack} className="bg-green-600 hover:bg-green-700">
                Register & Activate
                <Check size={16} className="ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DroneOnboardingWizard;
