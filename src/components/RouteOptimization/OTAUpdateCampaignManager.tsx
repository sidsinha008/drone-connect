
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Pause, 
  Square, 
  Eye, 
  Wifi,
} from "lucide-react";
import BatchManagement from "./BatchManagement";

const campaigns = [
  { id: "camp1", name: "Firmware v2.3.1", desc: "Critical security update", state: "active", targets: "Batch: Alpha Test Group", prog: 84, error: false, qosProfile: "High Throughput for Critical Updates" },
  { id: "camp2", name: "Pilot Camera Fix", desc: "Camera driver patch", state: "scheduled", targets: "Batch: Chennai-North Depot", prog: 0, error: false, qosProfile: null },
  { id: "camp3", name: "Downgrade - emergency", desc: "Rollback to v2.2", state: "failed", targets: "Batch: Outdated Firmware", prog: 67, error: true, qosProfile: "Low Latency for Real-time Control" }
];

const OTAUpdateCampaignManager = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="w-full grid gap-6">
      <BatchManagement />

      <div className="flex items-center justify-between mt-4">
        <h2 className="text-2xl font-bold">OTA Campaign Manager</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Campaign Overview</TabsTrigger>
          <TabsTrigger value="monitor">Monitor Active</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campaigns.map(({id, name, desc, state, targets, prog, error, qosProfile}) => (
              <Card key={id} className={`border ${error && state==="failed" ? "border-red-500" : ""}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {name}
                    <Badge variant="outline" className={
                      state==="active" ? "bg-blue-100 text-blue-700" :
                      state==="failed" ? "bg-red-100 text-red-700" :
                      state==="scheduled" ? "bg-yellow-100 text-yellow-700" : ""
                    }>
                      {state.toUpperCase()}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground">{desc}</div>
                  <div className="mt-2 text-xs font-semibold">Targets: {targets}</div>
                  
                  {qosProfile && (
                    <div className="mt-2 flex items-center gap-2">
                      <Wifi className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-600 font-medium">QoS: {qosProfile}</span>
                    </div>
                  )}
                  
                  <div className="mt-2 w-full bg-muted h-2 rounded">
                    <div
                      className={`
                        h-2 rounded ${state==="failed" ? "bg-red-400" :
                                    state==="active" ? "bg-blue-500" : "bg-yellow-300"}
                        transition-all`}
                      style={{ width: `${prog}%` }}
                    />
                  </div>
                  <div className="mt-2 text-xs">
                    Progress: {prog}%
                    {error && state==="failed" && <span className="ml-2 text-red-500 font-bold">Error occurred!</span>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="monitor" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Active Campaigns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns.filter(c => c.state === "active").map(campaign => (
                    <div key={campaign.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{campaign.name}</h4>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Pause className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Square className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      {campaign.qosProfile && (
                        <div className="flex items-center gap-2 mb-2">
                          <Wifi className="h-3 w-3 text-green-500" />
                          <span className="text-xs text-green-600">QoS Active: {campaign.qosProfile}</span>
                        </div>
                      )}
                      <Progress value={campaign.prog} className="mb-2" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{campaign.prog}% completed</span>
                        <span>{campaign.targets}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Status card has been removed as it was related to the create flow */}

          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OTAUpdateCampaignManager;
