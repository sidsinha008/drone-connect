
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { Check, Database, ListCheck } from 'lucide-react';

const mockFleetHealth = {
  readiness: 88,
  awaitingMaintenance: 5,
  offline: 7,
};

const mockRoutePerformance = {
  successRate: 96,
  energySaving: 15, // kWh
  timeEfficiency: 12, // minutes
  complianceRate: 99.5,
};

const mockOtaAnalytics = [
  { name: 'v2.3.1', value: 75 },
  { name: 'v2.3.0', value: 15 },
  { name: 'v2.2.x', value: 10 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const AnalyticsDashboard = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ListCheck size={20} /> Fleet Health & Status</CardTitle>
          <CardDescription>Real-time overview of fleet readiness.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{mockFleetHealth.readiness}%</div>
          <p className="text-xs text-muted-foreground">Operational Readiness</p>
          <div className="mt-4 flex justify-between text-sm">
            <div>
              <p className="font-semibold">{mockFleetHealth.awaitingMaintenance}</p>
              <p className="text-muted-foreground">Maintenance</p>
            </div>
            <div>
              <p className="font-semibold">{mockFleetHealth.offline}</p>
              <p className="text-muted-foreground">Offline</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Check size={20} /> Route Optimization Performance</CardTitle>
          <CardDescription>Efficiency gains from AI route planning.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="flex justify-between items-baseline">
             <span className="font-medium">Success Rate</span>
             <span className="font-bold text-2xl">{mockRoutePerformance.successRate}%</span>
           </div>
           <div className="flex justify-between items-baseline">
             <span className="font-medium">Energy Savings</span>
             <span className="font-bold text-lg">{mockRoutePerformance.energySaving} kWh</span>
           </div>
           <div className="flex justify-between items-baseline">
             <span className="font-medium">Avg. Time Saved</span>
             <span className="font-bold text-lg">{mockRoutePerformance.timeEfficiency} min</span>
           </div>
           <div className="flex justify-between items-baseline">
             <span className="font-medium">DGCA Compliance</span>
             <Badge variant="outline" className="text-green-600 border-green-400">{mockRoutePerformance.complianceRate}%</Badge>
           </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Database size={20} /> OTA Firmware Distribution</CardTitle>
          <CardDescription>Current firmware versions across the fleet.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={mockOtaAnalytics} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label>
                 {mockOtaAnalytics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Docking Station Utilization</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Placeholder for station usage charts...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
