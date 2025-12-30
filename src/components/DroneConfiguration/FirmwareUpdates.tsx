
import { useState } from "react";
import { Download, CheckCircle, AlertTriangle, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface FirmwareUpdatesProps {
  droneData: any;
  onSettingsChange: () => void;
}

export const FirmwareUpdates = ({ droneData, onSettingsChange }: FirmwareUpdatesProps) => {
  const [isChecking, setIsChecking] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const components = [
    {
      name: "Flight Controller",
      current: "v2.1.4",
      available: "v2.1.5",
      status: "update_available",
      description: "Improved obstacle avoidance algorithms"
    },
    {
      name: "Camera Module",
      current: "v1.8.2",
      available: "v1.8.2",
      status: "up_to_date",
      description: "Latest stable version"
    },
    {
      name: "Gimbal Controller",
      current: "v1.5.1",
      available: "v1.5.3",
      status: "update_available",
      description: "Enhanced stabilization performance"
    },
    {
      name: "GPS Module",
      current: "v3.2.1",
      available: "v3.2.1",
      status: "up_to_date",
      description: "Latest stable version"
    },
    {
      name: "Battery Management",
      current: "v2.0.8",
      available: "v2.1.0",
      status: "critical_update",
      description: "Critical security and performance updates"
    }
  ];

  const handleCheckUpdates = async () => {
    setIsChecking(true);
    // Simulate checking for updates
    setTimeout(() => {
      setIsChecking(false);
      onSettingsChange();
    }, 2000);
  };

  const handleUpdateComponent = async (componentName: string) => {
    setIsUpdating(true);
    setUpdateProgress(0);
    
    // Simulate update progress
    const interval = setInterval(() => {
      setUpdateProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUpdating(false);
          onSettingsChange();
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "up_to_date":
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Up to Date</Badge>;
      case "update_available":
        return <Badge variant="outline" className="text-blue-600">Update Available</Badge>;
      case "critical_update":
        return <Badge variant="destructive"><AlertTriangle className="h-3 w-3 mr-1" />Critical Update</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Firmware Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Firmware & Software Updates
              </CardTitle>
              <CardDescription>
                Manage firmware updates for all drone components
              </CardDescription>
            </div>
            <Button 
              onClick={handleCheckUpdates} 
              disabled={isChecking}
              variant="outline"
            >
              {isChecking ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Check for Updates
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">4</div>
              <div className="text-sm text-muted-foreground">Components Up to Date</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">2</div>
              <div className="text-sm text-muted-foreground">Updates Available</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-red-600">1</div>
              <div className="text-sm text-muted-foreground">Critical Updates</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Component Updates */}
      <Card>
        <CardHeader>
          <CardTitle>Component Status</CardTitle>
          <CardDescription>
            Individual component firmware versions and available updates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {components.map((component) => (
            <div key={component.name} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{component.name}</h4>
                  <p className="text-sm text-muted-foreground">{component.description}</p>
                </div>
                {getStatusBadge(component.status)}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Current: </span>
                    <span className="font-mono">{component.current}</span>
                  </div>
                  {component.available !== component.current && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Available: </span>
                      <span className="font-mono text-blue-600">{component.available}</span>
                    </div>
                  )}
                </div>

                {component.status !== "up_to_date" && (
                  <Button 
                    size="sm"
                    onClick={() => handleUpdateComponent(component.name)}
                    disabled={isUpdating}
                    variant={component.status === "critical_update" ? "destructive" : "default"}
                  >
                    {isUpdating ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4 mr-2" />
                    )}
                    Update
                  </Button>
                )}
              </div>

              {isUpdating && updateProgress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Updating {component.name}...</span>
                    <span>{updateProgress}%</span>
                  </div>
                  <Progress value={updateProgress} className="w-full" />
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Update Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Update Settings</CardTitle>
          <CardDescription>
            Configure automatic update preferences and notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Automatic Updates</label>
              <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                <option value="off">Manual Only</option>
                <option value="security">Security Updates Only</option>
                <option value="all">All Updates</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Update Schedule</label>
              <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                <option value="immediate">Immediate</option>
                <option value="maintenance">During Maintenance Window</option>
                <option value="manual">Manual Approval Required</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Notification Preferences</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked />
                <span className="text-sm">Email notifications for critical updates</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked />
                <span className="text-sm">In-app notifications for all updates</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span className="text-sm">SMS alerts for security updates</span>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
