
import { 
  Battery, 
  BatteryCharging, 
  BatteryFull, 
  BatteryLow, 
  BatteryMedium, 
  BatteryWarning 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip 
} from "recharts";
import { Badge } from "@/components/ui/badge";

// Mock data for battery analytics
const swappableBatteries = [
  { name: "Full (80-100%)", value: 48, color: "#10b981" },
  { name: "Medium (50-79%)", value: 23, color: "#0ea5e9" },
  { name: "Low (20-49%)", value: 14, color: "#f59e0b" },
  { name: "Critical (<20%)", value: 7, color: "#ef4444" }
];

const embeddedBatteries = [
  { id: 1, droneName: "Scout X1-043", droneType: "Scout X1", socPercentage: 87, sohPercentage: 92, status: "In use" },
  { id: 2, droneName: "Cargo Pro-021", droneType: "Cargo Pro", socPercentage: 34, sohPercentage: 96, status: "Charging" },
  { id: 3, droneName: "Vista Air-076", droneType: "Vista Air", socPercentage: 92, sohPercentage: 88, status: "Idle" },
  { id: 4, droneName: "Survey Elite-009", droneType: "Survey Elite", socPercentage: 13, sohPercentage: 91, status: "Critical" },
  { id: 5, droneName: "Scout X1-051", droneType: "Scout X1", socPercentage: 78, sohPercentage: 94, status: "In use" },
  { id: 6, droneName: "Cargo Pro-033", droneType: "Cargo Pro", socPercentage: 65, sohPercentage: 97, status: "Idle" },
  { id: 7, droneName: "Vista Air-012", droneType: "Vista Air", socPercentage: 28, sohPercentage: 82, status: "In use" },
  { id: 8, droneName: "Survey Elite-037", droneType: "Survey Elite", socPercentage: 54, sohPercentage: 90, status: "Idle" }
];

// Battery icon based on status
const getBatteryIcon = (percentage: number) => {
  if (percentage < 10) return <BatteryWarning className="text-red-500" size={18} />;
  if (percentage < 30) return <BatteryLow className="text-amber-500" size={18} />;
  if (percentage < 60) return <BatteryMedium className="text-blue-500" size={18} />;
  if (percentage < 80) return <Battery className="text-emerald-500" size={18} />;
  return <BatteryFull className="text-green-600" size={18} />;
};

// Battery status badge
const BatteryStatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = () => {
    switch(status) {
      case "In use": return "bg-blue-500/15 text-blue-700 border-blue-300";
      case "Charging": return "bg-green-500/15 text-green-700 border-green-300";
      case "Idle": return "bg-gray-500/15 text-gray-700 border-gray-300";
      case "Critical": return "bg-red-500/15 text-red-700 border-red-300";
      default: return "bg-gray-500/15 text-gray-700 border-gray-300";
    }
  };
  
  const getStatusIcon = () => {
    switch(status) {
      case "Charging": return <BatteryCharging size={14} />;
      case "Critical": return <BatteryWarning size={14} />;
      default: return null;
    }
  };
  
  return (
    <Badge 
      variant="outline" 
      className={`flex items-center gap-1 font-normal py-1 ${getStatusStyles()}`}
    >
      {getStatusIcon()}
      {status}
    </Badge>
  );
};

// Custom tooltip for the pie chart
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-md border text-sm">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-muted-foreground">
          Count: <span className="font-medium">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const BatteryAnalytics = () => {
  const totalSwappableBatteries = swappableBatteries.reduce((acc, curr) => acc + curr.value, 0);
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Battery Analytics</h1>
        <p className="text-muted-foreground">Monitor battery health and status across your fleet</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Swappable Batteries Card */}
        <Card className="glass-card animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BatteryMedium className="text-primary" size={20} />
              Swappable Batteries
            </CardTitle>
            <CardDescription>
              {totalSwappableBatteries} batteries monitored in real-time
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={swappableBatteries}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    strokeWidth={3}
                    stroke="var(--background)"
                  >
                    {swappableBatteries.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    iconType="circle"
                    iconSize={10}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              {swappableBatteries.map((battery, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: battery.color }} />
                  <div className="text-sm">{battery.name}: <span className="font-medium">{battery.value}</span></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Embedded Batteries Card */}
        <Card className="glass-card animate-scale-in animation-delay-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Battery className="text-primary" size={20} />
              Embedded Batteries
            </CardTitle>
            <CardDescription>
              {embeddedBatteries.length} drones with built-in batteries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[400px] overflow-auto pr-2">
              {embeddedBatteries.map((battery) => (
                <div 
                  key={battery.id}
                  className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{battery.droneName}</div>
                    <BatteryStatusBadge status={battery.status} />
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {battery.droneType}
                  </div>
                  
                  {/* SOC - State of Charge */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1.5">
                        {getBatteryIcon(battery.socPercentage)}
                        <span>Charge (SOC)</span>
                      </div>
                      <span className="font-medium">{battery.socPercentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ease-out ${
                          battery.socPercentage < 20 ? "bg-red-500" :
                          battery.socPercentage < 50 ? "bg-yellow-500" : 
                          battery.socPercentage < 80 ? "bg-emerald-400" : "bg-green-500"
                        }`}
                        style={{ width: `${battery.socPercentage}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* SOH - State of Health */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1.5">
                        <Battery className="text-muted-foreground" size={18} />
                        <span>Health (SOH)</span>
                      </div>
                      <span className="font-medium">{battery.sohPercentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-blue-500 rounded-full transition-all duration-500 ease-out ${
                          battery.sohPercentage < 60 ? "bg-red-500" :
                          battery.sohPercentage < 80 ? "bg-yellow-500" : "bg-blue-500"
                        }`}
                        style={{ width: `${battery.sohPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BatteryAnalytics;
