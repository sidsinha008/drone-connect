
export interface AirspaceZone {
  id: string;
  name: string;
  type: "NFZ" | "RZ" | "TFR" | "CUSTOM";
  coordinates: Array<{lat: number, lng: number}>;
  active: boolean;
  description: string;
  authority?: string;
  validUntil?: string;
}

export interface PathValidationResult {
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

export interface DroneComplianceStatus {
  droneId: string;
  droneName: string;
  position: {lat: number, lng: number};
  complianceStatus: "compliant" | "proximity-warning" | "violation";
  nearestRestrictedZone?: {
    zoneId: string;
    zoneName: string;
    distance: number;
    zoneType: "NFZ" | "RZ" | "TFR" | "CUSTOM";
  };
  lastViolation?: {
    timestamp: string;
    zoneId: string;
    zoneName: string;
    action: string;
  };
}

export interface AirspaceViolationEvent {
  id: string;
  timestamp: string;
  droneId: string;
  droneName: string;
  zoneId: string;
  zoneName: string;
  zoneType: "NFZ" | "RZ" | "TFR" | "CUSTOM";
  eventType: "proximity-warning" | "zone-entry" | "zone-exit";
  severity: "low" | "medium" | "high" | "critical";
  actionTaken: string;
  resolved: boolean;
}
