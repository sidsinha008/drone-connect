import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, DollarSign, Send, Bot, User, Brain, AlertTriangle, 
  TrendingUp, Battery, Wifi, Target, Clock, CheckCircle, XCircle
} from 'lucide-react';
import CybersecurityBadge from './CybersecurityBadge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

interface Firmware {
  version: string;
  cybersecurityScore: number;
}
interface ChatMessage {
    user: 'AI' | 'You';
    text: string;
}
interface Campaign {
  id: string;
  name: string;
  firmware: Firmware;
  bandwidthUsage: number;
  cost: number;
  chat: ChatMessage[];
  state: "active" | "failed" | "scheduled" | "completed";
  successRate?: number;
  qosProfile?: string | null;
}

interface CampaignDetailsModalProps {
  campaign: Campaign | null;
  isOpen: boolean;
  onClose: () => void;
}

// Enhanced mock data for individual campaign insights
const droneDetailedHealth = [
  { id: 'DR001', model: 'DJI Matrice 300', health: 92, battery: 85, signal: -65, updateSuccess: true, riskLevel: 'Low' },
  { id: 'DR002', model: 'DJI Matrice 300', health: 78, battery: 67, signal: -78, updateSuccess: false, riskLevel: 'Medium' },
  { id: 'DR003', model: 'DJI Air 2S', health: 45, battery: 42, signal: -85, updateSuccess: false, riskLevel: 'High' }
];

const updateTimelineData = [
  { time: '0min', downloaded: 0, verified: 0, installed: 0 },
  { time: '5min', downloaded: 25, verified: 0, installed: 0 },
  { time: '10min', downloaded: 65, verified: 15, installed: 0 },
  { time: '15min', downloaded: 90, verified: 45, installed: 10 },
  { time: '20min', downloaded: 100, verified: 78, installed: 35 },
  { time: '25min', downloaded: 100, verified: 92, installed: 62 },
  { time: '30min', downloaded: 100, verified: 100, installed: 85 }
];

const CampaignDetailsModal = ({ campaign, isOpen, onClose }: CampaignDetailsModalProps) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (campaign) {
            setMessages(campaign.chat);
        }
    }, [campaign]);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    if (!campaign) return null;

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const newMessages: ChatMessage[] = [...messages, { user: 'You', text: newMessage.trim() }];
            setMessages(newMessages);
            setNewMessage('');
            
            setTimeout(() => {
                setMessages(prev => [...prev, { user: 'AI', text: 'Thank you for your message. We are analyzing the data.' }]);
            }, 1000);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {campaign.name}
                        <Badge variant={campaign.state === 'active' ? 'default' : 'secondary'}>
                            {campaign.state.toUpperCase()}
                        </Badge>
                    </DialogTitle>
                    <DialogDescription>
                        Comprehensive AI/ML analytics and insights for this OTA campaign.
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="analytics" className="h-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="analytics">Campaign Analytics</TabsTrigger>
                        <TabsTrigger value="drone-health">Drone Health</TabsTrigger>
                        <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
                        <TabsTrigger value="chat">AI Assistant</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="analytics" className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto">
                        {/* Enhanced Firmware and Campaign Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <h4 className="font-semibold flex items-center gap-2">
                                    <Target className="w-4 h-4" />
                                    Firmware Details
                                </h4>
                                <CybersecurityBadge score={campaign.firmware.cybersecurityScore} />
                                <p className="text-sm text-muted-foreground">Version: {campaign.firmware.version}</p>
                                
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <BarChart className="w-4 h-4 text-blue-500" />
                                        <span>Bandwidth Usage: <strong>{campaign.bandwidthUsage} GB</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <DollarSign className="w-4 h-4 text-green-500" />
                                        <span>Estimated Cost: <strong>${campaign.cost.toFixed(2)}</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <TrendingUp className="w-4 h-4 text-purple-500" />
                                        <span>Success Rate: <strong>{campaign.successRate || 75}%</strong></span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-semibold">Update Progress Timeline</h4>
                                <ResponsiveContainer width="100%" height={200}>
                                    <LineChart data={updateTimelineData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="downloaded" stroke="#3b82f6" strokeWidth={2} />
                                        <Line type="monotone" dataKey="verified" stroke="#16a34a" strokeWidth={2} />
                                        <Line type="monotone" dataKey="installed" stroke="#f59e0b" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* QoS and Network Analysis */}
                        {campaign.qosProfile && (
                            <div className="p-4 border rounded-lg bg-blue-50">
                                <h4 className="font-semibold flex items-center gap-2 mb-2">
                                    <Wifi className="w-4 h-4 text-blue-500" />
                                    QoS Profile Impact
                                </h4>
                                <p className="text-sm">Active Profile: <strong>{campaign.qosProfile}</strong></p>
                                <div className="grid grid-cols-3 gap-4 mt-3">
                                    <div className="text-center">
                                        <p className="text-xs text-muted-foreground">Avg Speed</p>
                                        <p className="font-bold text-blue-600">28% faster</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-muted-foreground">Success Rate</p>
                                        <p className="font-bold text-green-600">+11%</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-muted-foreground">Retries</p>
                                        <p className="font-bold text-orange-600">-44%</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="drone-health" className="mt-4 max-h-[60vh] overflow-y-auto">
                        <div className="space-y-4">
                            <h4 className="font-semibold">Individual Drone Analysis</h4>
                            {droneDetailedHealth.map((drone, index) => (
                                <div key={index} className="p-4 border rounded-lg">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <p className="font-medium">{drone.id}</p>
                                            <p className="text-sm text-muted-foreground">{drone.model}</p>
                                        </div>
                                        <Badge variant={
                                            drone.riskLevel === 'Low' ? 'default' : 
                                            drone.riskLevel === 'Medium' ? 'secondary' : 'destructive'
                                        }>
                                            {drone.riskLevel} Risk
                                        </Badge>
                                    </div>
                                    
                                    <div className="grid grid-cols-4 gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground">Health Score</p>
                                            <div className="flex items-center gap-2">
                                                <Progress value={drone.health} className="flex-1 h-2" />
                                                <span className="font-medium">{drone.health}%</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Battery</p>
                                            <div className="flex items-center gap-1">
                                                <Battery className="w-3 h-3" />
                                                <span className="font-medium">{drone.battery}%</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Signal</p>
                                            <div className="flex items-center gap-1">
                                                <Wifi className="w-3 h-3" />
                                                <span className="font-medium">{drone.signal}dBm</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Update Status</p>
                                            <div className="flex items-center gap-1">
                                                {drone.updateSuccess ? 
                                                    <CheckCircle className="w-3 h-3 text-green-500" /> : 
                                                    <XCircle className="w-3 h-3 text-red-500" />
                                                }
                                                <span className="font-medium">
                                                    {drone.updateSuccess ? 'Success' : 'Failed'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="predictions" className="mt-4 max-h-[60vh] overflow-y-auto">
                        <div className="space-y-4">
                            <div className="p-4 border rounded-lg bg-purple-50">
                                <h4 className="font-semibold flex items-center gap-2 mb-3">
                                    <Brain className="w-4 h-4 text-purple-500" />
                                    AI Predictions & Recommendations
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                                        <div>
                                            <p className="font-medium text-green-700">Success Probability</p>
                                            <p className="text-sm">87% chance of successful completion based on current conditions</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2" />
                                        <div>
                                            <p className="font-medium text-yellow-700">Risk Factors</p>
                                            <p className="text-sm">3 drones show battery degradation patterns. Recommend charging before retry.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                                        <div>
                                            <p className="font-medium text-blue-700">Optimization</p>
                                            <p className="text-sm">Deploy during 2-4 AM window for 23% better success rate in this region.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 border rounded">
                                    <h5 className="font-medium mb-2">Predicted Timeline</h5>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Estimated Completion:</span>
                                            <span className="font-medium">~45 minutes</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Confidence:</span>
                                            <span className="font-medium">94.2%</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-3 border rounded">
                                    <h5 className="font-medium mb-2">Resource Impact</h5>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Peak Bandwidth:</span>
                                            <span className="font-medium">~35 GB/h</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Total Cost:</span>
                                            <span className="font-medium">${(campaign.cost * 1.15).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="chat" className="mt-4">
                        <div className="flex flex-col h-96">
                            <ScrollArea className="flex-grow p-4 border rounded-md" ref={scrollAreaRef}>
                                <div className="space-y-4">
                                {messages.map((msg, index) => (
                                    <div key={index} className={cn("flex items-start gap-3", msg.user === 'You' ? "justify-end" : "")}>
                                        {msg.user === 'AI' && <Bot className="w-6 h-6 text-primary" />}
                                        <div className={cn("p-3 rounded-lg max-w-xs", msg.user === 'AI' ? 'bg-muted' : 'bg-primary text-primary-foreground')}>
                                            <p className="text-sm">{msg.text}</p>
                                        </div>
                                        {msg.user === 'You' && <User className="w-6 h-6" />}
                                    </div>
                                ))}
                                </div>
                            </ScrollArea>
                            <div className="flex gap-2 mt-4">
                                <Input 
                                    placeholder="Ask AI for insights..." 
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                />
                                <Button onClick={handleSendMessage}>
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default CampaignDetailsModal;
