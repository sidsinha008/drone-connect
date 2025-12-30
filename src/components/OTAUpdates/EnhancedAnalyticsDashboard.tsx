import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, Sankey
} from 'recharts';
import { 
  AlertTriangle, TrendingUp, Shield, Cpu, Battery, Wifi, 
  Download, CheckCircle, XCircle, Clock, Brain, Target,
  Map, Filter, Info, ThumbsUp
} from 'lucide-react';

interface Firmware {
  version: string;
  cybersecurityScore: number;
}

interface Campaign {
  id: string;
  name: string;
  firmware: Firmware;
  bandwidthUsage: number;
  cost: number;
  successRate?: number;
  predictedSuccessRate?: number;
  anomaliesDetected?: number;
  qosProfile?: string | null;
}

interface EnhancedAnalyticsDashboardProps {
  campaigns: Campaign[];
}

const COLORS = ['#16a34a', '#facc15', '#ef4444', '#3b82f6', '#8b5cf6'];

// Mock data for comprehensive analytics
const anomalyData = [
  { type: 'Network Instability', count: 3, severity: 'Critical', timestamp: '2024-06-15 14:23' },
  { type: 'Firmware Corrupt', count: 1, severity: 'Critical', timestamp: '2024-06-15 13:45' },
  { type: 'Hardware Degradation', count: 5, severity: 'Warning', timestamp: '2024-06-15 12:10' },
  { type: 'Battery Anomaly', count: 2, severity: 'Warning', timestamp: '2024-06-15 11:30' }
];

const fleetHealthData = [
  { status: 'Healthy', count: 67, color: '#16a34a' },
  { status: 'Monitor', count: 15, color: '#facc15' },
  { status: 'High Risk', count: 8, color: '#ef4444' }
];

const updateStagesData = [
  { stage: 'Download Init', successful: 90, failed: 10 },
  { stage: 'Download Complete', successful: 85, failed: 5 },
  { stage: 'Verification', successful: 82, failed: 3 },
  { stage: 'Installation', successful: 78, failed: 4 },
  { stage: 'Reboot', successful: 75, failed: 3 },
  { stage: 'Success', successful: 72, failed: 0 }
];

const qosImpactData = [
  { metric: 'Avg Download Time', standard: 45, highThroughput: 28, lowLatency: 35 },
  { metric: 'Success Rate %', standard: 78, highThroughput: 89, lowLatency: 82 },
  { metric: 'Retry Count', standard: 3.2, highThroughput: 1.8, lowLatency: 2.1 }
];

interface ModelPerformance {
  model: string;
  accuracy: number;
  precision: number;
  recall: number;
}

const modelPerformanceData: ModelPerformance[] = [
  { model: 'Update Success Prediction', accuracy: 94.2, precision: 91.8, recall: 96.1 },
  { model: 'Component Failure Prediction', accuracy: 87.5, precision: 84.3, recall: 90.2 },
  { model: 'Anomaly Detection', accuracy: 92.1, precision: 88.7, recall: 94.8 }
];

const featureImportanceData = [
  { feature: 'Signal Strength', importance: 0.23, description: 'Primary network connectivity indicator' },
  { feature: 'Battery Voltage', importance: 0.19, description: 'Power stability during updates' },
  { feature: 'CPU Usage', importance: 0.17, description: 'Processing capacity availability' },
  { feature: 'Temperature', importance: 0.15, description: 'Thermal conditions affecting performance' },
  { feature: 'Last Update Success', importance: 0.12, description: 'Historical update reliability' },
  { feature: 'Flight Hours', importance: 0.14, description: 'Wear and operational stress' }
];

const EnhancedAnalyticsDashboard = ({ campaigns }: EnhancedAnalyticsDashboardProps) => {
  const overallSuccessRate = campaigns.reduce((acc, c) => acc + (c.successRate || 75), 0) / campaigns.length;
  const totalAnomalies = anomalyData.reduce((acc, a) => acc + a.count, 0);

  return (
    <div className="space-y-6">
      {/* AI Predictions Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">AI Predicted Success Rate</CardTitle>
            <Brain className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallSuccessRate.toFixed(1)}%</div>
            <Progress value={overallSuccessRate} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Confidence: 94.2% ± 2.1%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Anomalies Detected</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totalAnomalies}</div>
            <div className="flex gap-2 mt-2">
              <Badge variant="destructive" className="text-xs">3 Critical</Badge>
              <Badge variant="secondary" className="text-xs">7 Warning</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Fleet Health Score</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">8.7/10</div>
            <p className="text-xs text-muted-foreground mt-2">
              67 Healthy, 15 Monitor, 8 Risk
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaign-analysis" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="campaign-analysis">Campaign Analysis</TabsTrigger>
          <TabsTrigger value="fleet-health">Fleet Health</TabsTrigger>
          <TabsTrigger value="anomalies">Anomalies & Alerts</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Model Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="campaign-analysis" className="space-y-6">
          {/* Update Success & Failure Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Update Pipeline Flow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={updateStagesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stage" tick={{ fontSize: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="successful" fill="#16a34a" name="Successful" />
                    <Bar dataKey="failed" fill="#ef4444" name="Failed" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <Brain className="w-4 h-4 inline mr-1" />
                    AI Insight: 75% of failures occur at 'Installation' stage due to insufficient storage space.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="w-5 h-5" />
                  QoS Profile Impact Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={qosImpactData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" tick={{ fontSize: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="standard" fill="#94a3b8" name="Standard" />
                    <Bar dataKey="highThroughput" fill="#3b82f6" name="High Throughput" />
                    <Bar dataKey="lowLatency" fill="#8b5cf6" name="Low Latency" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <TrendingUp className="w-4 h-4 inline mr-1" />
                    Recommendation: Use 'High Throughput' QoS for large firmware updates (&gt;100MB).
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resource Utilization Forecast */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-5 h-5" />
                Predictive Resource Utilization (Next 30 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={[
                  { day: 'Week 1', bandwidth: 85, storage: 67, cpu: 45 },
                  { day: 'Week 2', bandwidth: 92, storage: 71, cpu: 52 },
                  { day: 'Week 3', bandwidth: 78, storage: 69, cpu: 48 },
                  { day: 'Week 4', bandwidth: 95, storage: 73, cpu: 58 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis label={{ value: '% Utilization', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="bandwidth" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="storage" stackId="1" stroke="#16a34a" fill="#16a34a" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="cpu" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fleet-health" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="w-5 h-5" />
                  Fleet Health Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={fleetHealthData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ status, count }) => `${status}: ${count}`}
                    >
                      {fleetHealthData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Battery className="w-5 h-5" />
                  Battery Health Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[
                    { time: '0min', normal: 100, degraded: 100, critical: 100 },
                    { time: '15min', normal: 95, degraded: 87, critical: 78 },
                    { time: '30min', normal: 90, degraded: 75, critical: 62 },
                    { time: '45min', normal: 85, degraded: 68, critical: 51 },
                    { time: '60min', normal: 80, degraded: 62, critical: 45 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis label={{ value: 'Battery %', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="normal" stroke="#16a34a" strokeWidth={2} />
                    <Line type="monotone" dataKey="degraded" stroke="#f59e0b" strokeWidth={2} />
                    <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <AlertTriangle className="w-4 h-4 inline mr-1" />
                    8 drones showing abnormal power drain during OTA updates. Recommend maintenance.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="anomalies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Recent Anomalies & AI Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {anomalyData.map((anomaly, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        anomaly.severity === 'Critical' ? 'bg-red-500' : 'bg-yellow-500'
                      }`} />
                      <div>
                        <p className="font-medium">{anomaly.type}</p>
                        <p className="text-sm text-muted-foreground">{anomaly.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={anomaly.severity === 'Critical' ? 'destructive' : 'secondary'}>
                        {anomaly.count} affected
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Info className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI Model Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {modelPerformanceData.map((model, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{model.model}</span>
                        <span className="text-sm text-muted-foreground">{model.accuracy}% accuracy</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>Precision: {model.precision}%</div>
                        <div>Recall: {model.recall}%</div>
                        <div>F1: {((model.precision + model.recall) === 0 ? 0 : (2 * model.precision * model.recall) / (model.precision + model.recall)).toFixed(1)}%</div>
                      </div>
                      <Progress value={model.accuracy} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Feature Importance (Update Success Prediction)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={featureImportanceData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 0.25]} />
                    <YAxis dataKey="feature" type="category" width={100} tick={{ fontSize: 10 }} />
                    <Tooltip 
                      formatter={(value, name, props) => [
                        `${(Number(value) * 100).toFixed(1)}%`,
                        props.payload.description
                      ]}
                    />
                    <Bar dataKey="importance" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ThumbsUp className="w-5 h-5" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Network Optimization</p>
                  <p className="text-sm text-blue-700">Deploy updates during 2-4 AM window for 23% better success rate</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-900">Firmware Strategy</p>
                  <p className="text-sm text-green-700">Prioritize drones with signal strength &gt;-70dBm for critical updates</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm font-medium text-yellow-900">Predictive Maintenance</p>
                  <p className="text-sm text-yellow-700">8 drones require battery service within 14 days to prevent update failures</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedAnalyticsDashboard;
