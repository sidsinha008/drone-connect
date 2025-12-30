
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Shield, 
  MapPin,
  Route,
  Settings,
  Eye,
  Navigation
} from "lucide-react";

interface PathValidationResult {
  taskId: string;
  taskName: string;
  status: "clear" | "warning" | "prohibited" | "acknowledged";
  conflicts: Array<{
    zoneId: string;
    zoneName: string;
    zoneType: "NFZ" | "RZ" | "TFR" | "BUFFER";
    severity: "low" | "medium" | "high" | "critical";
    intersectionType: "crosses" | "within" | "proximity";
    recommendedAction: string;
  }>;
  restrictionRule: "hard-geofence" | "warn-record" | "auto-reroute";
}

interface AirspaceCompliancePlannerProps {
  validationResults: PathValidationResult[];
  onRuleChange: (taskId: string, rule: string) => void;
  onAcknowledgeConflict: (taskId: string, conflictId: string) => void;
  onAdjustPath: (taskId: string) => void;
}

const AirspaceCompliancePlanner = ({
  validationResults,
  onRuleChange,
  onAcknowledgeConflict,
  onAdjustPath
}: AirspaceCompliancePlannerProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "clear": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning": return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case "prohibited": return <XCircle className="w-4 h-4 text-red-500" />;
      case "acknowledged": return <Shield className="w-4 h-4 text-blue-500" />;
      default: return <MapPin className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "clear": return "bg-green-50 border-green-200";
      case "warning": return "bg-orange-50 border-orange-200";
      case "prohibited": return "bg-red-50 border-red-200";
      case "acknowledged": return "bg-blue-50 border-blue-200";
      default: return "bg-gray-50 border-gray-200";
    }
  };

  const getSeverityBadge = (severity: string) => {
    const colors = {
      low: "bg-yellow-100 text-yellow-700",
      medium: "bg-orange-100 text-orange-700",
      high: "bg-red-100 text-red-700",
      critical: "bg-red-200 text-red-800"
    };
    return (
      <Badge variant="outline" className={colors[severity as keyof typeof colors]}>
        {severity.toUpperCase()}
      </Badge>
    );
  };

  const criticalIssues = validationResults.filter(r => r.status === "prohibited").length;
  const warningIssues = validationResults.filter(r => r.status === "warning").length;
  const clearTasks = validationResults.filter(r => r.status === "clear").length;

  return (
    <div className="space-y-6">
      {/* Overall Compliance Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-500" />
            Mission Airspace Compliance Status
          </CardTitle>
          <CardDescription>
            Path validation results for all mission tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-2xl font-bold text-green-600">{clearTasks}</span>
              </div>
              <p className="text-sm text-muted-foreground">Clear Tasks</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <span className="text-2xl font-bold text-orange-600">{warningIssues}</span>
              </div>
              <p className="text-sm text-muted-foreground">Warnings</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <XCircle className="w-5 h-5 text-red-500" />
                <span className="text-2xl font-bold text-red-600">{criticalIssues}</span>
              </div>
              <p className="text-sm text-muted-foreground">Critical Issues</p>
            </div>
          </div>

          {criticalIssues > 0 && (
            <Alert className="border-red-200 bg-red-50">
              <XCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-700">
                <strong>Mission cannot be deployed:</strong> {criticalIssues} task(s) directly intersect No-Fly or Restricted Zones. Please revise mission plan.
              </AlertDescription>
            </Alert>
          )}

          {warningIssues > 0 && criticalIssues === 0 && (
            <Alert className="border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <AlertDescription className="text-orange-700">
                <strong>Warnings detected:</strong> {warningIssues} task(s) have TFR or proximity conflicts that require acknowledgment.
              </AlertDescription>
            </Alert>
          )}

          {criticalIssues === 0 && warningIssues === 0 && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-700">
                <strong>All clear:</strong> All mission paths comply with current airspace restrictions.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Task-by-Task Validation Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Route className="w-5 h-5 text-blue-500" />
            Task Validation Results
          </CardTitle>
          <CardDescription>
            Detailed airspace compliance status for each mission task
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {validationResults.map((result) => (
            <div key={result.taskId} className={`p-4 rounded-lg border ${getStatusColor(result.status)}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(result.status)}
                  <h3 className="font-medium">{result.taskName}</h3>
                  <Badge variant="outline" className="text-xs">
                    {result.conflicts.length} conflict(s)
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => onAdjustPath(result.taskId)}>
                    <Eye className="w-4 h-4 mr-1" />
                    View on Map
                  </Button>
                  {result.status === "prohibited" && (
                    <Button size="sm" onClick={() => onAdjustPath(result.taskId)}>
                      <Navigation className="w-4 h-4 mr-1" />
                      Adjust Path
                    </Button>
                  )}
                </div>
              </div>

              {/* Restriction Rule Configuration */}
              <div className="mb-3">
                <label className="text-sm font-medium mb-2 block">Restriction Response Rule:</label>
                <Select
                  value={result.restrictionRule}
                  onValueChange={(value) => onRuleChange(result.taskId, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hard-geofence">
                      Hard Geofence (Prevent Entry) - Recommended for NFZ/RZ
                    </SelectItem>
                    <SelectItem value="warn-record">
                      Warn & Record (Allow Entry, Report Breach)
                    </SelectItem>
                    <SelectItem value="auto-reroute">
                      Auto-Reroute (Autonomous Avoidance)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Conflict Details */}
              {result.conflicts.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Airspace Conflicts:</h4>
                  {result.conflicts.map((conflict, index) => (
                    <div key={index} className="p-3 bg-white rounded border text-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{conflict.zoneName}</span>
                          <Badge variant="outline" className="text-xs">
                            {conflict.zoneType}
                          </Badge>
                          {getSeverityBadge(conflict.severity)}
                        </div>
                        {conflict.zoneType === "TFR" && result.status === "warning" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onAcknowledgeConflict(result.taskId, conflict.zoneId)}
                          >
                            Acknowledge
                          </Button>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-1">
                        <strong>Issue:</strong> Path {conflict.intersectionType} {conflict.zoneName}
                      </p>
                      <p className="text-muted-foreground">
                        <strong>Recommended Action:</strong> {conflict.recommendedAction}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AirspaceCompliancePlanner;
