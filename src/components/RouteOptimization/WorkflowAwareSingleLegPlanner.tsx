
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Plane, 
  Clock, 
  Battery, 
  CheckCircle,
  ArrowRight,
  Zap,
  AlertTriangle,
  RefreshCw,
  Copy
} from "lucide-react";

interface WorkflowAwareSingleLegPlannerProps {
  workflowData: any;
  onWorkflowUpdate: (data: any) => void;
}

const WorkflowAwareSingleLegPlanner = ({ workflowData, onWorkflowUpdate }: WorkflowAwareSingleLegPlannerProps) => {
  const [routeParams, setRouteParams] = useState({
    source: "",
    destination: "",
    selectedDrone: "",
    payload: "",
    routeGenerated: false,
    usingMissionData: false
  });

  const [isGenerating, setIsGenerating] = useState(false);

  // Auto-populate from Mission Planner data when DGCA is approved
  useEffect(() => {
    if (workflowData.dgcaPermissionStatus === "approved" && workflowData.missionData) {
      setRouteParams(prev => ({
        ...prev,
        source: workflowData.missionData.source || "",
        destination: workflowData.missionData.destination || "",
        payload: workflowData.missionData.payload || "",
        usingMissionData: true
      }));
    }
  }, [workflowData.dgcaPermissionStatus, workflowData.missionData]);

  const handleGenerateRoute = () => {
    setIsGenerating(true);
    
    // Simulate route generation process
    setTimeout(() => {
      setRouteParams(prev => ({ ...prev, routeGenerated: true }));
      onWorkflowUpdate({ ...workflowData, quickRouteGenerated: true });
      setIsGenerating(false);
    }, 2000);
  };

  const handleClearAndCustomize = () => {
    setRouteParams(prev => ({
      ...prev,
      source: "",
      destination: "",
      payload: "",
      usingMissionData: false,
      routeGenerated: false
    }));
  };

  const handleCopyFromMission = () => {
    if (workflowData.missionData) {
      setRouteParams(prev => ({
        ...prev,
        source: workflowData.missionData.source || "",
        destination: workflowData.missionData.destination || "",
        payload: workflowData.missionData.payload || "",
        usingMissionData: true
      }));
    }
  };

  const availableDrones = [
    { id: "CHN-001", model: "DJI Matrice 300 RTK", status: "ready", battery: "95%", range: "15km" },
    { id: "CHN-002", model: "Parrot Anafi Ai", status: "ready", battery: "87%", range: "12km" },
    { id: "CHN-003", model: "Custom Cargo Drone", status: "charging", battery: "45%", range: "25km" }
  ];

  return (
    <div className="space-y-6">
      {/* Workflow Context with Data Integration */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <h3 className="font-semibold text-green-800 mb-2">Quick Route Generation - Post DGCA Approval</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 mb-2">
                DGCA approval secured for your mission. Generate optimized single-leg routes for immediate deployment.
              </p>
              {workflowData.missionData && (
                <div className="text-xs text-green-600">
                  <p>• Mission: {workflowData.missionData.name}</p>
                  <p>• Type: {workflowData.missionData.type}</p>
                  <p>• Priority: {workflowData.missionData.priority}</p>
                </div>
              )}
            </div>
            {workflowData.missionData && !routeParams.usingMissionData && (
              <Button size="sm" variant="outline" onClick={handleCopyFromMission}>
                <Copy size={14} className="mr-2" />
                Use Mission Data
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced Route Parameters */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin size={20} />
                Route Configuration
                {routeParams.usingMissionData && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    From Mission
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {routeParams.usingMissionData && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-800">Auto-populated from Mission Planner</span>
                    <Button size="sm" variant="ghost" onClick={handleClearAndCustomize}>
                      <RefreshCw size={12} className="mr-1" />
                      Customize
                    </Button>
                  </div>
                  <p className="text-xs text-blue-600">
                    Using approved mission parameters. You can customize or proceed with these values.
                  </p>
                </div>
              )}

              <div>
                <Label>Source Location</Label>
                <Input 
                  placeholder="Enter pickup location"
                  value={routeParams.source}
                  onChange={(e) => setRouteParams(prev => ({ ...prev, source: e.target.value, usingMissionData: false }))}
                  className={routeParams.usingMissionData ? "bg-blue-50" : ""}
                />
              </div>
              
              <div>
                <Label>Destination</Label>
                <Input 
                  placeholder="Enter delivery location"
                  value={routeParams.destination}
                  onChange={(e) => setRouteParams(prev => ({ ...prev, destination: e.target.value, usingMissionData: false }))}
                  className={routeParams.usingMissionData ? "bg-blue-50" : ""}
                />
              </div>

              <div>
                <Label>Select Drone</Label>
                <Select value={routeParams.selectedDrone} onValueChange={(value) => setRouteParams(prev => ({ ...prev, selectedDrone: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose available drone" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDrones.filter(d => d.status === "ready").map((drone) => (
                      <SelectItem key={drone.id} value={drone.id}>
                        {drone.id} - {drone.model} ({drone.battery})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Payload Weight (kg)</Label>
                <Input 
                  type="number" 
                  placeholder="0.0"
                  value={routeParams.payload}
                  onChange={(e) => setRouteParams(prev => ({ ...prev, payload: e.target.value, usingMissionData: false }))}
                  className={routeParams.usingMissionData ? "bg-blue-50" : ""}
                />
              </div>

              <Button 
                className="w-full" 
                onClick={handleGenerateRoute}
                disabled={!routeParams.source || !routeParams.destination || !routeParams.selectedDrone || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={16} className="mr-2 animate-spin" />
                    Generating Route...
                  </>
                ) : (
                  <>
                    <Zap size={16} className="mr-2" />
                    Generate Quick Route
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Next Steps */}
          {routeParams.routeGenerated && (
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-blue-700 mb-2">
                  <CheckCircle size={16} />
                  <span className="font-medium">Quick Route Ready</span>
                </div>
                <p className="text-sm text-blue-600 mb-3">
                  Basic route optimized and ready for deployment. For complex missions requiring extended range, consider multi-leg optimization.
                </p>
                <div className="space-y-2">
                  <Button size="sm" variant="outline" className="w-full">
                    <Plane size={14} className="mr-2" />
                    Deploy Mission Now
                  </Button>
                  <Button size="sm" variant="ghost" className="w-full">
                    <ArrowRight size={14} className="mr-2" />
                    Enhance with Multi-Leg Planning
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Enhanced Route Visualization */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Live Route Visualization</span>
                {isGenerating && (
                  <Badge className="bg-orange-100 text-orange-700">
                    AI Processing...
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[500px] relative">
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1569336415962-a4bd9f69c8bf?q=80&w=1664&auto=format&fit=crop')] bg-cover bg-center rounded-lg relative">
                
                {/* Show preliminary points when locations are entered */}
                {routeParams.source && (
                  <>
                    <div className="absolute top-20 left-20 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                    <div className="absolute top-6 left-16 bg-white px-2 py-1 rounded text-xs font-medium shadow">
                      {routeParams.usingMissionData ? "Mission Source" : "Source"}
                    </div>
                  </>
                )}

                {routeParams.destination && (
                  <>
                    <div className="absolute bottom-20 right-20 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
                    <div className="absolute bottom-6 right-16 bg-white px-2 py-1 rounded text-xs font-medium shadow">
                      {routeParams.usingMissionData ? "Mission Destination" : "Destination"}
                    </div>
                  </>
                )}

                {/* Show route path during generation */}
                {isGenerating && routeParams.source && routeParams.destination && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <path
                      d="M 88 88 L 300 200 L 500 300 L 700 400"
                      stroke="#94a3b8"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="3,3"
                      className="animate-pulse"
                    />
                  </svg>
                )}

                {/* Final optimized route */}
                {routeParams.routeGenerated && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <path
                      d="M 88 88 L 300 200 L 500 300 L 700 400"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="5,5"
                      className="animate-pulse"
                    />
                  </svg>
                )}

                {/* Route Info Overlay */}
                {routeParams.routeGenerated && (
                  <div className="absolute bottom-4 left-4 bg-white/90 p-4 rounded-lg shadow-lg">
                    <h4 className="font-semibold mb-2">Optimized Route Summary</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock size={14} />
                        <span>Est. Time: 18 minutes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} />
                        <span>Distance: 12.5 km</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Battery size={14} />
                        <span>Battery Usage: 35%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Plane size={14} />
                        <span>Selected: {routeParams.selectedDrone}</span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          DGCA Compliant
                        </Badge>
                        {routeParams.usingMissionData && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            Mission Aligned
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Empty state */}
                {!routeParams.source && !routeParams.destination && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MapPin size={48} className="mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">Ready for Route Planning</p>
                      <p className="text-sm">
                        {workflowData.missionData 
                          ? "Click 'Use Mission Data' to auto-populate or enter custom locations"
                          : "Enter source and destination to visualize your route"
                        }
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Available Drones Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane size={20} />
            Available Drones for Quick Deployment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {availableDrones.map((drone) => (
              <div 
                key={drone.id} 
                className={`
                  p-4 border rounded-lg cursor-pointer transition-all
                  ${routeParams.selectedDrone === drone.id ? "border-blue-500 bg-blue-50" : "hover:shadow-md"}
                  ${drone.status !== "ready" ? "opacity-50" : ""}
                `}
                onClick={() => drone.status === "ready" && setRouteParams(prev => ({ ...prev, selectedDrone: drone.id }))}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{drone.id}</h4>
                  <Badge 
                    variant="outline" 
                    className={
                      drone.status === "ready" ? "bg-green-50 text-green-700" :
                      drone.status === "charging" ? "bg-yellow-50 text-yellow-700" :
                      "bg-gray-50 text-gray-500"
                    }
                  >
                    {drone.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{drone.model}</p>
                <div className="flex justify-between text-xs">
                  <span>Battery: {drone.battery}</span>
                  <span>Range: {drone.range}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkflowAwareSingleLegPlanner;
