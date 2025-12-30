
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { 
  Shield, 
  AlertTriangle, 
  MapPin, 
  Settings, 
  Eye,
  EyeOff,
  Info,
  Clock,
  Plane,
  Building2
} from "lucide-react";

interface AirspaceZone {
  id: string;
  name: string;
  type: "NFZ" | "RZ" | "TFR" | "CUSTOM";
  coordinates: Array<{lat: number, lng: number}>;
  active: boolean;
  description: string;
  authority?: string;
  validUntil?: string;
}

interface AirspaceComplianceManagerProps {
  onZoneToggle: (zoneId: string, enabled: boolean) => void;
  onBufferChange: (distance: number) => void;
  zones: AirspaceZone[];
  bufferDistance: number;
  showBufferZones: boolean;
  onShowBufferToggle: (show: boolean) => void;
}

const AirspaceComplianceManager = ({
  onZoneToggle,
  onBufferChange,
  zones,
  bufferDistance,
  showBufferZones,
  onShowBufferToggle
}: AirspaceComplianceManagerProps) => {
  const [expandedCategories, setExpandedCategories] = useState({
    nfz: true,
    rz: true,
    tfr: true,
    custom: false
  });

  const getZoneIcon = (type: string) => {
    switch (type) {
      case "NFZ": return <Plane className="w-4 h-4 text-red-500" />;
      case "RZ": return <Shield className="w-4 h-4 text-red-600" />;
      case "TFR": return <Clock className="w-4 h-4 text-orange-500" />;
      case "CUSTOM": return <Building2 className="w-4 h-4 text-blue-500" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const getZoneColor = (type: string) => {
    switch (type) {
      case "NFZ": return "border-red-500 bg-red-50";
      case "RZ": return "border-red-600 bg-red-50";
      case "TFR": return "border-orange-500 bg-orange-50";
      case "CUSTOM": return "border-blue-500 bg-blue-50";
      default: return "border-gray-300 bg-gray-50";
    }
  };

  const getActiveZonesByType = (type: string) => 
    zones.filter(zone => zone.type === type);

  const getTotalActiveZones = (type: string) =>
    zones.filter(zone => zone.type === type && zone.active).length;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-red-500" />
          Airspace Compliance & Restrictions
        </CardTitle>
        <CardDescription>
          Configure and monitor restricted airspace zones for Chennai operations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Buffer Zone Configuration */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={showBufferZones}
              onCheckedChange={onShowBufferToggle}
            />
            <label className="text-sm font-medium">Show Buffer Zones</label>
            <Info className="w-4 h-4 text-muted-foreground" />
          </div>
          {showBufferZones && (
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Buffer Distance: {bufferDistance}m
              </label>
              <Slider
                value={[bufferDistance]}
                onValueChange={(value) => onBufferChange(value[0])}
                max={500}
                min={50}
                step={25}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Warning zone around restricted areas
              </p>
            </div>
          )}
        </div>

        {/* No-Fly Zones */}
        <div className="space-y-3">
          <Button
            variant="ghost"
            className="w-full justify-between p-2"
            onClick={() => setExpandedCategories(prev => ({...prev, nfz: !prev.nfz}))}
          >
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-red-500" />
              <span className="font-medium">No-Fly Zones (NFZ)</span>
              <Badge variant="outline" className="bg-red-100 text-red-700">
                {getTotalActiveZones("NFZ")}/{getActiveZonesByType("NFZ").length}
              </Badge>
            </div>
            {expandedCategories.nfz ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
          
          {expandedCategories.nfz && (
            <div className="space-y-2 pl-4">
              {getActiveZonesByType("NFZ").map((zone) => (
                <div key={zone.id} className={`p-3 rounded-lg border ${getZoneColor(zone.type)}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={zone.active}
                        onCheckedChange={(checked) => onZoneToggle(zone.id, checked as boolean)}
                      />
                      {getZoneIcon(zone.type)}
                      <div>
                        <p className="text-sm font-medium">{zone.name}</p>
                        <p className="text-xs text-muted-foreground">{zone.description}</p>
                        {zone.authority && (
                          <p className="text-xs text-muted-foreground">Authority: {zone.authority}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Restricted Zones */}
        <div className="space-y-3">
          <Button
            variant="ghost"
            className="w-full justify-between p-2"
            onClick={() => setExpandedCategories(prev => ({...prev, rz: !prev.rz}))}
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-red-600" />
              <span className="font-medium">Restricted Zones (RZ)</span>
              <Badge variant="outline" className="bg-red-100 text-red-700">
                {getTotalActiveZones("RZ")}/{getActiveZonesByType("RZ").length}
              </Badge>
            </div>
            {expandedCategories.rz ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
          
          {expandedCategories.rz && (
            <div className="space-y-2 pl-4">
              {getActiveZonesByType("RZ").map((zone) => (
                <div key={zone.id} className={`p-3 rounded-lg border ${getZoneColor(zone.type)}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={zone.active}
                        onCheckedChange={(checked) => onZoneToggle(zone.id, checked as boolean)}
                      />
                      {getZoneIcon(zone.type)}
                      <div>
                        <p className="text-sm font-medium">{zone.name}</p>
                        <p className="text-xs text-muted-foreground">{zone.description}</p>
                        {zone.authority && (
                          <p className="text-xs text-muted-foreground">Authority: {zone.authority}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Temporary Flight Restrictions */}
        <div className="space-y-3">
          <Button
            variant="ghost"
            className="w-full justify-between p-2"
            onClick={() => setExpandedCategories(prev => ({...prev, tfr: !prev.tfr}))}
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="font-medium">Temporary Flight Restrictions (TFR)</span>
              <Badge variant="outline" className="bg-orange-100 text-orange-700">
                {getTotalActiveZones("TFR")}/{getActiveZonesByType("TFR").length}
              </Badge>
            </div>
            {expandedCategories.tfr ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
          
          {expandedCategories.tfr && (
            <div className="space-y-2 pl-4">
              {getActiveZonesByType("TFR").map((zone) => (
                <div key={zone.id} className={`p-3 rounded-lg border ${getZoneColor(zone.type)}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={zone.active}
                        onCheckedChange={(checked) => onZoneToggle(zone.id, checked as boolean)}
                      />
                      {getZoneIcon(zone.type)}
                      <div>
                        <p className="text-sm font-medium">{zone.name}</p>
                        <p className="text-xs text-muted-foreground">{zone.description}</p>
                        {zone.validUntil && (
                          <p className="text-xs text-orange-600">Valid until: {zone.validUntil}</p>
                        )}
                        {zone.authority && (
                          <p className="text-xs text-muted-foreground">Authority: {zone.authority}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Custom Geofences */}
        <div className="space-y-3">
          <Button
            variant="ghost"
            className="w-full justify-between p-2"
            onClick={() => setExpandedCategories(prev => ({...prev, custom: !prev.custom}))}
          >
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-500" />
              <span className="font-medium">Custom Geofences</span>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                {getTotalActiveZones("CUSTOM")}/{getActiveZonesByType("CUSTOM").length}
              </Badge>
            </div>
            {expandedCategories.custom ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
          
          {expandedCategories.custom && (
            <div className="space-y-2 pl-4">
              {getActiveZonesByType("CUSTOM").map((zone) => (
                <div key={zone.id} className={`p-3 rounded-lg border ${getZoneColor(zone.type)}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={zone.active}
                        onCheckedChange={(checked) => onZoneToggle(zone.id, checked as boolean)}
                      />
                      {getZoneIcon(zone.type)}
                      <div>
                        <p className="text-sm font-medium">{zone.name}</p>
                        <p className="text-xs text-muted-foreground">{zone.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                <Settings className="w-4 h-4 mr-2" />
                Add Custom Geofence
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AirspaceComplianceManager;
