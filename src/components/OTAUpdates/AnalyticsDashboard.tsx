
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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
}

interface AnalyticsDashboardProps {
  campaigns: Campaign[];
}

const COLORS = ['#16a34a', '#facc15', '#ef4444'];

const AnalyticsDashboard = ({ campaigns }: AnalyticsDashboardProps) => {
    const bandwidthData = campaigns.map(c => ({ name: c.name, GB: c.bandwidthUsage }));
    const costData = campaigns.map(c => ({ name: c.name, USD: c.cost }));

    const scoreDistribution = [
        { name: 'Excellent (90+)', value: campaigns.filter(c => c.firmware.cybersecurityScore >= 90).length },
        { name: 'Good (70-89)', value: campaigns.filter(c => c.firmware.cybersecurityScore >= 70 && c.firmware.cybersecurityScore < 90).length },
        { name: 'Warning (<70)', value: campaigns.filter(c => c.firmware.cybersecurityScore < 70).length },
    ].filter(d => d.value > 0);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Bandwidth Usage per Campaign</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={bandwidthData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis label={{ value: 'GB', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="GB" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Cost per Campaign</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={costData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis label={{ value: 'USD', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="USD" fill="#22c55e" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Cybersecurity Score Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie 
                                data={scoreDistribution} 
                                cx="50%" 
                                cy="50%" 
                                labelLine={false}
                                outerRadius={100} 
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {scoreDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
};

export default AnalyticsDashboard;
