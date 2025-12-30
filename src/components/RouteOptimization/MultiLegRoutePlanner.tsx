
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Plane, 
  Clock, 
  Battery, 
  CheckCircle,
  ArrowRight,
  Zap,
  AlertTriangle,
  Route,
  Loader2
} from "lucide-react";
import DockingStationOverlay from "./DockingStationOverlay";

interface MultiLegRoutePlannerProps {
  workflowData: any;
  onWorkflowUpdate: (data: any) => void;
}

const MultiLegRoutePlanner = ({ workflowData, onWorkflowUpdate }: MultiLegRoutePlannerProps) => {
  const [optimizationInProgress, setOptimizationInProgress] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [routeParams, setRouteParams] = useState({
    complexRoute: false,
    optimizationGoals: "balanced",
    legs: [],
    dockingStops: []
  });

  const dockingStations = [
    { id: "dock1", name: "Chennai Central Dock", coords: [80.2707, 13.0827], status: "available", chargingType: "fast", occupancy: 1 },
    { id: "dock2", name: "OMR Dock", coords: [80.2412, 12.9480], status: "charging", chargingType: "slow", occupancy: 0 },
    { id: "dock3", name: "Airport Mini Dock", coords: [80.1636, 12.9941], status: "occupied", chargingType: "battery-swap", occupancy: 2 },
  ];

  const handleOptimizeRoute = () => {
    setOptimizationInProgress(true);
    setOptimizationProgress(0);
    
    // Simulate AI optimization process
    const interval = setInterval(() => {
      setOptimizationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setOptimizationInProgress(false);
          setRouteParams(prev => ({ ...prev, complexRoute: true }));
          onWorkflowUpdate({ ...workflowData, multiLegOptimized: true, otaRequired: true });
          return 100;
        }
        return prev + 15;
      });
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Route Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Route size={20} />
                Multi-Leg Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Optimization Goals</Label>
                <Select value={routeParams.optimizationGoals} onValueChange={(value) => setRouteParams(prev => ({ ...prev, optimizationGoals: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select optimization priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="speed">Minimize Flight Time</SelectItem>
                    <SelectItem value="battery">Minimize Battery Usage</SelectItem>
                    <SelectItem value="safety">Maximize Safety</SelectItem>
                    <SelectItem value="balanced">Balanced Optimization</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Maximum Range Extension</Label>
                <Input placeholder="e.g., 50 km" />
              </div>

              <div>
                <Label>Acceptable Delay for Charging</Label>
                <Input placeholder="e.g., 30 minutes" />
              </div>

              <div>
                <Label>Payload Transfer Points</Label>
                <Input placeholder="Number of transfer points" />
              </div>

              {!optimizationInProgress && !routeParams.complexRoute && (
                <Button 
                  className="w-full" 
                  onClick={handleOptimizeRoute}
                  disabled={!workflowData.quickRouteGenerated}
                >
                  <Zap size={16} className="mr-2" />
                  Generate AI-Optimized Multi-Leg Route
                </Button>
              )}

              {optimizationInProgress && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Loader2 size={16} className="animate-spin" />
                    <span className="font-medium">AI Optimization in Progress</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Analyzing docking stations...</span>
                      <span>{optimizationProgress}%</span>
                    </div>
                    <Progress value={optimizationProgress} />
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>• Calculating optimal waypoints</p>
                    <p>• Evaluating battery consumption</p>
                    <p>• Checking DGCA compliance</p>
                    <p>• Optimizing docking station usage</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Optimization Results */}
          {routeParams.complexRoute && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-green-700 mb-2">
                  <CheckCircle size={16} />
                  <span className="font-medium">Multi-Leg Route Optimized</span>
                </div>
                <div className="space-y-2 text-sm text-green-600">
                  <p>• 3 legs identified with 2 docking stops</p>
                  <p>• Total mission time: 52 minutes</p>
                  <p>• Battery swaps at OMR and Airport docks</p>
                  <p>• DGCA compliant with current airspace</p>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-3">
                  <ArrowRight size={14} className="mr-2" />
                  Proceed to OTA Updates
                </Button>
              </CardContent>
            </Card>
          )}

          {/* AI Rationale */}
          {routeParams.complexRoute && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">AI Optimization Rationale</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2 text-xs text-gray-600">
                  <p><strong>Leg 1 (0-18km):</strong> Direct flight to OMR Dock. Battery: 95% → 35%</p>
                  <p><strong>Stop 1:</strong> Battery swap at OMR (8 min) - fastest option available</p>
                  <p><strong>Leg 2 (18-31km):</strong> OMR to Airport Dock. Battery: 95% → 45%</p>
                  <p><strong>Stop 2:</strong> Quick charge at Airport (15 min) - payload transfer point</p>
                  <p><strong>Leg 3 (31-42km):</strong> Final approach to destination. Battery: 90% → 55%</p>
                  <p className="text-orange-600"><strong>Alternative:</strong> Direct route not feasible - exceeds safe battery range by 23%</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Enhanced Map Visualization */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Multi-Leg Route Visualization</CardTitle>
            </CardHeader>
            <CardContent className="h-[600px] relative">
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1569336415962-a4bd9f69c8bf?q=80&w=1664&auto=format&fit=crop')] bg-cover bg-center rounded-lg relative">
                <DockingStationOverlay dockingStations={dockingStations} />
                
                {routeParams.complexRoute && (
                  <>
                    {/* Multi-leg route visualization */}
                    <div className="absolute top-16 left-16 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                    <div className="absolute top-2 left-12 bg-white px-2 py-1 rounded text-xs font-medium shadow">
                      Start
                    </div>

                    {/* Docking Station 1 */}
                    <div className="absolute top-40 left-80 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
                    <div className="absolute top-26 left-76 bg-white px-2 py-1 rounded text-xs font-medium shadow">
                      OMR Dock
                    </div>

                    {/* Docking Station 2 */}
                    <div className="absolute top-64 right-40 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
                    <div className="absolute top-50 right-36 bg-white px-2 py-1 rounded text-xs font-medium shadow">
                      Airport Dock
                    </div>

                    {/* Final destination */}
                    <div className="absolute bottom-20 right-20 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
                    <div className="absolute bottom-6 right-16 bg-white px-2 py-1 rounded text-xs font-medium shadow">
                      Destination
                    </div>

                    {/* Multi-leg path */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <path
                        d="M 80 80 L 320 200 L 520 300 L 700 400"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="8,4"
                        className="animate-pulse"
                      />
                      <path
                        d="M 320 200 L 600 350"
                        stroke="#10b981"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="8,4"
                        className="animate-pulse"
                      />
                      <path
                        d="M 600 350 L 700 400"
                        stroke="#f59e0b"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="8,4"
                        className="animate-pulse"
                      />
                    </svg>
                  </>
                )}

                {/* Enhanced route info */}
                {routeParams.complexRoute && (
                  <div className="absolute bottom-4 left-4 bg-white/95 p-4 rounded-lg shadow-lg max-w-sm">
                    <h4 className="font-semibold mb-3">Multi-Leg Route Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>Leg 1: 18km, 16 min, Battery: 95%→35%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Leg 2: 13km, 12 min, Battery: 95%→45%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span>Leg 3: 11km, 9 min, Battery: 90%→55%</span>
                      </div>
                      <div className="pt-2 border-t">
                        <div className="flex items-center gap-2">
                          <Clock size={14} />
                          <span>Total Time: 52 min (incl. stops)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Battery size={14} />
                          <span>2 Docking Stops Required</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 mt-2">
                        DGCA Compliant - Multi-Leg Approved
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MultiLegRoutePlanner;
