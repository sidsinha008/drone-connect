
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import AdvancedMissionPlanner from "./RouteOptimization/AdvancedMissionPlanner";
import MultiLegRoutePlanner from "./RouteOptimization/MultiLegRoutePlanner";
import EnhancedOTABatchManager from "./RouteOptimization/EnhancedOTABatchManager";
import DroneFleetOverview from "./RouteOptimization/DroneFleetOverview";
import EnhancedAnalyticsDashboard from "./RouteOptimization/EnhancedAnalyticsDashboard";
import WorkflowAwareSingleLegPlanner from "./RouteOptimization/WorkflowAwareSingleLegPlanner";

const RouteOptimization = () => {
  const [tab, setTab] = useState("mission-planner");
  
  // Mock workflow state
  const [workflowData, setWorkflowData] = useState({
    missionApproved: false,
    dgcaPermissionStatus: "pending", // pending, approved, rejected
    quickRouteGenerated: false,
    multiLegOptimized: false,
    otaRequired: false,
    droneReady: false
  });

  const workflowStages = [
    { id: "planning", label: "Mission Planning", tab: "mission-planner", status: "active" },
    { id: "approval", label: "DGCA Approval", tab: "mission-planner", status: "pending" },
    { id: "quick-route", label: "Quick Route Execution", tab: "quick", status: "waiting" },
    { id: "multi-leg", label: "Multi-Leg Optimization", tab: "multi-leg", status: "waiting" },
    { id: "ota-prep", label: "OTA Updates", tab: "ota", status: "waiting" },
    { id: "execution", label: "Mission Execution", tab: "fleet", status: "waiting" }
  ];

  const getStageStatus = (stageId: string) => {
    switch (stageId) {
      case "planning": return workflowData.missionApproved ? "completed" : "active";
      case "approval": return workflowData.dgcaPermissionStatus === "approved" ? "completed" : 
                              workflowData.dgcaPermissionStatus === "rejected" ? "error" : "pending";
      case "quick-route": return workflowData.quickRouteGenerated ? "completed" : 
                                 workflowData.dgcaPermissionStatus === "approved" ? "active" : "waiting";
      case "multi-leg": return workflowData.multiLegOptimized ? "completed" : 
                               workflowData.quickRouteGenerated ? "active" : "waiting";
      case "ota-prep": return !workflowData.otaRequired ? "skipped" :
                              workflowData.droneReady ? "completed" : 
                              workflowData.multiLegOptimized ? "active" : "waiting";
      case "execution": return workflowData.droneReady || (!workflowData.otaRequired && workflowData.multiLegOptimized) ? "active" : "waiting";
      default: return "waiting";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "active": return <Clock className="w-4 h-4 text-blue-500" />;
      case "pending": return <Clock className="w-4 h-4 text-orange-500" />;
      case "error": return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "skipped": return <CheckCircle className="w-4 h-4 text-gray-400" />;
      default: return <div className="w-4 h-4 rounded-full bg-gray-300" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-700 border-green-300";
      case "active": return "bg-blue-100 text-blue-700 border-blue-300";
      case "pending": return "bg-orange-100 text-orange-700 border-orange-300";
      case "error": return "bg-red-100 text-red-700 border-red-300";
      case "skipped": return "bg-gray-100 text-gray-500 border-gray-300";
      default: return "bg-gray-50 text-gray-400 border-gray-200";
    }
  };

  const handleStageClick = (stage: any) => {
    const status = getStageStatus(stage.id);
    if (status === "active" || status === "completed") {
      setTab(stage.tab);
    }
  };

  const simulateWorkflowProgress = (action: string) => {
    switch (action) {
      case "approve-mission":
        setWorkflowData(prev => ({ ...prev, missionApproved: true }));
        break;
      case "dgca-approved":
        setWorkflowData(prev => ({ ...prev, dgcaPermissionStatus: "approved" }));
        break;
      case "quick-route-ready":
        setWorkflowData(prev => ({ ...prev, quickRouteGenerated: true }));
        break;
      case "multi-leg-optimized":
        setWorkflowData(prev => ({ ...prev, multiLegOptimized: true, otaRequired: true }));
        break;
      case "ota-completed":
        setWorkflowData(prev => ({ ...prev, droneReady: true }));
        break;
    }
  };

  return (
    <div className="min-h-screen w-full p-0 animate-fade-in flex flex-col">
      {/* Enhanced Workflow Progress Indicator */}
      <Card className="mb-6 border-2">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4">Mission Workflow Progress</h3>
          <div className="flex items-center justify-between">
            {workflowStages.map((stage, index) => {
              const status = getStageStatus(stage.id);
              const isClickable = status === "active" || status === "completed";
              
              return (
                <div key={stage.id} className="flex items-center">
                  <div 
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all
                      ${getStatusColor(status)}
                      ${isClickable ? "hover:shadow-md" : "cursor-not-allowed"}
                    `}
                    onClick={() => handleStageClick(stage)}
                  >
                    {getStatusIcon(status)}
                    <span className="text-sm font-medium">{stage.label}</span>
                  </div>
                  {index < workflowStages.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-gray-400 mx-2" />
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Simulation Progress Summary */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-sm mb-2">Current Workflow State:</h4>
            <div className="text-xs space-y-1">
              <p>• Mission Approved: {workflowData.missionApproved ? "✅ Yes" : "❌ Pending"}</p>
              <p>• DGCA Status: {workflowData.dgcaPermissionStatus === "approved" ? "✅ Approved" : "⏳ " + workflowData.dgcaPermissionStatus}</p>
              <p>• Quick Route: {workflowData.quickRouteGenerated ? "✅ Generated" : "❌ Not Started"}</p>
              <p>• Multi-Leg Route: {workflowData.multiLegOptimized ? "✅ Optimized" : "❌ Not Started"}</p>
              <p>• OTA Updates: {workflowData.droneReady ? "✅ Complete" : workflowData.otaRequired ? "⏳ Required" : "❌ Not Required"}</p>
              <p>• Drone Status: {workflowData.droneReady ? "✅ Ready for Mission" : "❌ Not Ready"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-6">
          <TabsTrigger value="mission-planner" className="flex items-center gap-2">
            Mission Planner
            {workflowData.missionApproved && <CheckCircle className="w-4 h-4 text-green-500" />}
          </TabsTrigger>
          <TabsTrigger 
            value="quick" 
            disabled={workflowData.dgcaPermissionStatus !== "approved"}
            className="flex items-center gap-2"
          >
            Quick Route
            {workflowData.quickRouteGenerated && <CheckCircle className="w-4 h-4 text-green-500" />}
          </TabsTrigger>
          <TabsTrigger 
            value="multi-leg"
            disabled={!workflowData.quickRouteGenerated}
            className="flex items-center gap-2"
          >
            Multi-Leg Legacy
            {workflowData.multiLegOptimized && <CheckCircle className="w-4 h-4 text-green-500" />}
          </TabsTrigger>
          <TabsTrigger 
            value="ota"
            disabled={!workflowData.multiLegOptimized}
            className="flex items-center gap-2"
          >
            OTA Campaigns
            {workflowData.droneReady && <CheckCircle className="w-4 h-4 text-green-500" />}
          </TabsTrigger>
          <TabsTrigger value="fleet">Fleet Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="mission-planner" className="mt-0">
          <AdvancedMissionPlanner 
            workflowData={workflowData}
            onWorkflowUpdate={setWorkflowData}
          />
        </TabsContent>

        <TabsContent value="quick" className="mt-0">
          <div className="space-y-4">
            {workflowData.dgcaPermissionStatus === "approved" && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">DGCA Permission Approved - Ready for Quick Route Execution</span>
                  </div>
                  <p className="text-sm text-green-600 mt-2">
                    Mission plan has been approved. You can now generate optimized single-leg routes for immediate deployment.
                  </p>
                </CardContent>
              </Card>
            )}
            <WorkflowAwareSingleLegPlanner 
              workflowData={workflowData}
              onWorkflowUpdate={setWorkflowData}
            />
          </div>
        </TabsContent>

        <TabsContent value="multi-leg" className="mt-0">
          <div className="space-y-4">
            {workflowData.quickRouteGenerated && (
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-blue-700">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Quick Route Available - Enhance with Multi-Leg Optimization</span>
                  </div>
                  <p className="text-sm text-blue-600 mt-2">
                    Basic route generated. Use multi-leg optimization for complex missions requiring docking stations, payload transfers, or extended range operations.
                  </p>
                </CardContent>
              </Card>
            )}
            <MultiLegRoutePlanner 
              workflowData={workflowData}
              onWorkflowUpdate={setWorkflowData}
            />
          </div>
        </TabsContent>

        <TabsContent value="ota" className="mt-0">
          <div className="space-y-4">
            {workflowData.multiLegOptimized && workflowData.otaRequired && (
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-orange-700">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-medium">OTA Updates Required for Mission-Specific Optimization</span>
                  </div>
                  <p className="text-sm text-orange-600 mt-2">
                    Multi-leg route optimization requires specific firmware updates for the assigned drone to handle complex waypoint navigation and docking station protocols.
                  </p>
                </CardContent>
              </Card>
            )}
            <EnhancedOTABatchManager 
              workflowData={workflowData}
              onWorkflowUpdate={setWorkflowData}
            />
          </div>
        </TabsContent>

        <TabsContent value="fleet" className="mt-0">
          <DroneFleetOverview />
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-0">
          <EnhancedAnalyticsDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RouteOptimization;
