import { useState } from "react";
import { 
  ArrowLeft, 
  Upload, 
  Play, 
  Pause, 
  Users, 
  Target, 
  BarChart3, 
  Eye,
  Clock,
  MapPin,
  Activity,
  TrendingUp,
  Camera,
  FileVideo,
  Settings,
  Share2,
  Download,
  AlertTriangle,
  CheckCircle,
  Brain,
  Zap,
  BookOpen,
  Trophy,
  Shield,
  Lightbulb,
  MessageSquare,
  Star
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Area,
  AreaChart
} from "recharts";

// Enhanced mock data with AI insights
const aiInsights = [
  {
    id: 1,
    type: "performance_anomaly",
    severity: "medium",
    player: "Alex Johnson",
    title: "Bowling Arm Angle Deviation",
    description: "Arm angle is 8° lower than baseline during medium pace deliveries",
    confidence: 87,
    impact: "May reduce accuracy by 12-15%",
    drillRecommendations: ["Vertical Arm Swing Drill", "Mirror Practice", "Slow Motion Delivery"],
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    type: "injury_risk",
    severity: "high",
    player: "David Smith",
    title: "High Workload Alert",
    description: "Biomechanical stress indicators suggest elevated injury risk",
    confidence: 94,
    impact: "32% higher injury probability",
    drillRecommendations: ["Recovery Protocol A", "Load Management", "Flexibility Routine"],
    timestamp: "30 minutes ago"
  },
  {
    id: 3,
    type: "tactical_opportunity",
    severity: "low",
    player: "Michael Chen",
    title: "Fielding Position Optimization",
    description: "Optimal positioning could improve catch probability by 18%",
    confidence: 78,
    impact: "Enhanced field coverage",
    drillRecommendations: ["Anticipation Training", "Reaction Drills", "Position Awareness"],
    timestamp: "1 hour ago"
  }
];

const drillLibrary = [
  {
    id: 1,
    name: "Vertical Arm Swing Drill",
    category: "Bowling Technique",
    difficulty: "Intermediate",
    duration: "15 minutes",
    description: "Focuses on maintaining consistent arm angle throughout bowling action",
    targetMetrics: ["Arm Angle", "Release Point Consistency"],
    videoUrl: "/drills/vertical-arm-swing.mp4"
  },
  {
    id: 2,
    name: "Weight Transfer Footwork",
    category: "Batting Technique", 
    difficulty: "Beginner",
    duration: "20 minutes",
    description: "Improves front-foot and back-foot weight distribution",
    targetMetrics: ["Balance Score", "Shot Power"],
    videoUrl: "/drills/weight-transfer.mp4"
  },
  {
    id: 3,
    name: "Reaction Time Enhancement",
    category: "Fielding",
    difficulty: "Advanced",
    duration: "25 minutes",
    description: "Multi-directional movement and catch reaction training",
    targetMetrics: ["Reaction Time", "Catch Success Rate"],
    videoUrl: "/drills/reaction-training.mp4"
  }
];

const playerRiskScores = [
  { player: "Alex Johnson", overall: 23, injury: 15, fatigue: 31, biomechanical: 18 },
  { player: "David Smith", overall: 67, injury: 78, fatigue: 56, biomechanical: 67 },
  { player: "Michael Chen", overall: 34, injury: 28, fatigue: 40, biomechanical: 34 },
  { player: "James Wilson", overall: 19, injury: 12, fatigue: 26, biomechanical: 19 }
];

// Mock data for cricket training analytics
const recentSessions = [
  { id: 1, date: "2024-01-15", type: "Net Practice", players: 8, duration: "2h 30m", status: "Analyzed" },
  { id: 2, date: "2024-01-14", type: "Fielding Drills", players: 11, duration: "1h 45m", status: "Processing" },
  { id: 3, date: "2024-01-13", type: "Match Simulation", players: 15, duration: "3h 15m", status: "Analyzed" },
  { id: 4, date: "2024-01-12", type: "Bowling Practice", players: 6, duration: "1h 20m", status: "Analyzed" }
];

const playerProfiles = [
  { id: 1, name: "Alex Johnson", role: "Batsman", rank: "A+", sessions: 23, improvement: "+15%" },
  { id: 2, name: "David Smith", role: "Bowler", rank: "A", sessions: 19, improvement: "+12%" },
  { id: 3, name: "Michael Chen", role: "All-rounder", rank: "B+", sessions: 27, improvement: "+8%" },
  { id: 4, name: "James Wilson", role: "Wicketkeeper", rank: "A-", sessions: 21, improvement: "+18%" }
];

const performanceData = [
  { session: "Session 1", speed: 85, accuracy: 78, consistency: 82, fitness: 75 },
  { session: "Session 2", speed: 87, accuracy: 81, consistency: 85, fitness: 78 },
  { session: "Session 3", speed: 89, accuracy: 83, consistency: 87, fitness: 80 },
  { session: "Session 4", speed: 91, accuracy: 86, consistency: 89, fitness: 82 },
  { session: "Session 5", speed: 88, accuracy: 88, consistency: 91, fitness: 85 }
];

const movementData = [
  { time: "0:00", x: 0, y: 0, speed: 0 },
  { time: "0:30", x: 15, y: 8, speed: 12 },
  { time: "1:00", x: 25, y: 12, speed: 18 },
  { time: "1:30", x: 35, y: 5, speed: 22 },
  { time: "2:00", x: 45, y: 15, speed: 16 },
  { time: "2:30", x: 50, y: 20, speed: 14 }
];

interface CricketAthleteTrainingProps {
  onBack: () => void;
}

const CricketAthleteTraining = ({ onBack }: CricketAthleteTrainingProps) => {
  const [selectedPlayer, setSelectedPlayer] = useState<string>("alex-johnson");
  const [selectedSession, setSelectedSession] = useState<string>("session-1");
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedDrill, setSelectedDrill] = useState<string>("");

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low": return "text-blue-600 bg-blue-50 border-blue-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sports Management
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Target className="text-primary" size={32} />
              Cricket Athlete Training
            </h1>
            <p className="text-muted-foreground mt-1">
              AI-powered performance analysis using drone-captured training data
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Upload Session
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="analysis">Video Analysis</TabsTrigger>
          <TabsTrigger value="players">Player Profiles</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          <TabsTrigger value="drill-library">Drill Library</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Enhanced KPIs with AI alerts */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Sessions This Week</p>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-xs text-green-600">+3 from last week</p>
                  </div>
                  <Camera className="text-primary" size={20} />
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">AI Insights Generated</p>
                    <p className="text-2xl font-bold">47</p>
                    <p className="text-xs text-orange-600">12 require attention</p>
                  </div>
                  <Brain className="text-orange-500" size={20} />
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Recommendations</p>
                    <p className="text-2xl font-bold">23</p>
                    <p className="text-xs text-blue-600">8 completed this week</p>
                  </div>
                  <Lightbulb className="text-blue-500" size={20} />
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Risk Alerts</p>
                    <p className="text-2xl font-bold text-red-600">3</p>
                    <p className="text-xs text-red-600">2 high priority</p>
                  </div>
                  <AlertTriangle className="text-red-500" size={20} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Alerts & Recommendations Dashboard */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="text-primary" size={20} />
                    AI Performance Alerts
                  </CardTitle>
                  <CardDescription>Real-time insights and anomaly detection</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {aiInsights.map((insight) => (
                      <div key={insight.id} className={`p-4 rounded-lg border ${getSeverityColor(insight.severity)}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {insight.player}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {insight.confidence}% confidence
                              </Badge>
                              <span className="text-xs text-muted-foreground">{insight.timestamp}</span>
                            </div>
                            <h4 className="font-medium mb-1">{insight.title}</h4>
                            <p className="text-sm mb-2">{insight.description}</p>
                            <p className="text-xs font-medium">Impact: {insight.impact}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-xs font-medium mb-2">Recommended Drills:</p>
                          <div className="flex flex-wrap gap-1">
                            {insight.drillRecommendations.map((drill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {drill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Risk Assessment Panel */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="text-primary" size={20} />
                  Player Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {playerRiskScores.map((player, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{player.player}</span>
                        <Badge 
                          variant={player.overall > 60 ? "destructive" : player.overall > 30 ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {player.overall}% risk
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-1 text-xs">
                        <div className="text-center">
                          <div className="text-muted-foreground">Injury</div>
                          <div className={player.injury > 60 ? "text-red-600" : "text-green-600"}>
                            {player.injury}%
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-muted-foreground">Fatigue</div>
                          <div className={player.fatigue > 60 ? "text-red-600" : "text-green-600"}>
                            {player.fatigue}%
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-muted-foreground">Bio-Mech</div>
                          <div className={player.biomechanical > 60 ? "text-red-600" : "text-green-600"}>
                            {player.biomechanical}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="text-primary" size={20} />
                  Personalized Training Recommendations
                </CardTitle>
                <CardDescription>AI-driven training plans based on performance data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-blue-800">Alex Johnson - Batting Improvement</h4>
                      <Badge variant="outline" className="text-xs">High Priority</Badge>
                    </div>
                    <p className="text-blue-700 text-sm mb-3">
                      Weight transfer analysis shows 23% improvement potential in backfoot shots.
                    </p>
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-blue-800">Recommended Drill Sequence:</p>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>1. Weight Transfer Footwork (Week 1-2)</span>
                          <Button variant="outline" size="sm" className="h-6 text-xs">
                            Assign
                          </Button>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span>2. Balance Stability Training (Week 2-3)</span>
                          <Button variant="outline" size="sm" className="h-6 text-xs">
                            Assign
                          </Button>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span>3. Power Transfer Enhancement (Week 3-4)</span>
                          <Button variant="outline" size="sm" className="h-6 text-xs">
                            Assign
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-red-800">David Smith - Injury Prevention</h4>
                      <Badge variant="destructive" className="text-xs">Urgent</Badge>
                    </div>
                    <p className="text-red-700 text-sm mb-3">
                      Biomechanical stress indicators suggest immediate load management required.
                    </p>
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-red-800">Immediate Actions:</p>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>• 48-hour rest protocol</span>
                          <Button variant="outline" size="sm" className="h-6 text-xs">
                            Implement
                          </Button>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span>• Mobility assessment</span>
                          <Button variant="outline" size="sm" className="h-6 text-xs">
                            Schedule
                          </Button>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span>• Recovery exercises</span>
                          <Button variant="outline" size="sm" className="h-6 text-xs">
                            Assign
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="text-primary" size={20} />
                  Tactical Recommendations
                </CardTitle>
                <CardDescription>Team formation and strategy optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800 mb-2">Field Placement Optimization</h4>
                    <p className="text-green-700 text-sm mb-3">
                      AI analysis suggests repositioning slip fielders can improve catch probability by 24%.
                    </p>
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-green-800">Recommended Changes:</p>
                      <div className="text-xs text-green-700">
                        • Move first slip 2 meters closer to wicket
                        <br />
                        • Adjust second slip angle by 15 degrees
                        <br />
                        • Position gully 1.5 meters wider
                      </div>
                      <Button variant="outline" size="sm" className="mt-2 text-xs">
                        View 3D Visualization
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-medium text-yellow-800 mb-2">Bowling Strategy Insight</h4>
                    <p className="text-yellow-700 text-sm mb-3">
                      Pattern analysis reveals optimal line/length combination against specific batsman types.
                    </p>
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-yellow-800">Key Findings:</p>
                      <div className="text-xs text-yellow-700">
                        • Short-pitched deliveries 67% more effective
                        <br />
                        • Vary pace by 15-20 km/h for maximum impact
                        <br />
                        • Target off-stump corridor
                      </div>
                      <Button variant="outline" size="sm" className="mt-2 text-xs">
                        Create Bowling Plan
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="drill-library" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="text-primary" size={20} />
                Intelligent Drill Library
              </CardTitle>
              <CardDescription>AI-curated drills with performance tracking integration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <Select value={selectedDrill} onValueChange={setSelectedDrill}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="batting">Batting Technique</SelectItem>
                    <SelectItem value="bowling">Bowling Technique</SelectItem>
                    <SelectItem value="fielding">Fielding</SelectItem>
                    <SelectItem value="fitness">Fitness & Recovery</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Custom Drill
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {drillLibrary.map((drill) => (
                  <Card key={drill.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{drill.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{drill.category}</Badge>
                        <Badge variant="secondary" className="text-xs">{drill.difficulty}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{drill.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="font-medium">{drill.duration}</span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Target Metrics:</p>
                          <div className="flex flex-wrap gap-1">
                            {drill.targetMetrics.map((metric, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {metric}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Play className="w-4 h-4 mr-1" />
                          Preview
                        </Button>
                        <Button size="sm" className="flex-1">
                          Assign to Player
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Video Player Section */}
            <div className="lg:col-span-2">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Session Analysis</span>
                    <div className="flex items-center gap-2">
                      <Select value={selectedSession} onValueChange={setSelectedSession}>
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="session-1">Net Practice - Jan 15</SelectItem>
                          <SelectItem value="session-2">Fielding Drills - Jan 14</SelectItem>
                          <SelectItem value="session-3">Match Simulation - Jan 13</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Video Player Placeholder */}
                    <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Camera size={48} className="mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-medium">Drone Training Footage</p>
                          <p className="text-sm opacity-75">Net Practice Session - January 15, 2024</p>
                        </div>
                      </div>
                      {/* Video Controls */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <div className="flex items-center gap-4 text-white">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="text-white hover:bg-white/20"
                          >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <div className="flex-1 bg-white/30 rounded-full h-1">
                            <div className="bg-white rounded-full h-1 w-1/3" />
                          </div>
                          <span className="text-sm">1:23 / 4:56</span>
                        </div>
                      </div>
                    </div>

                    {/* Analysis Tools */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">Player Tracking</Button>
                        <Button variant="outline" size="sm">Speed Analysis</Button>
                        <Button variant="outline" size="sm">Formation View</Button>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export Clip
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analysis Panel */}
            <div className="space-y-4">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Live Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Player Speed</span>
                      <span className="font-medium">18.5 km/h</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="h-2 bg-blue-500 rounded-full" style={{ width: "75%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Accuracy Score</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: "87%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Formation Rating</span>
                      <span className="font-medium">B+</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="h-2 bg-yellow-500 rounded-full" style={{ width: "78%" }} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">AI Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium text-blue-700">Positive Pattern</p>
                      <p className="text-blue-600">Player maintains excellent footwork during drive shots</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="font-medium text-yellow-700">Area for Improvement</p>
                      <p className="text-yellow-600">Tendency to commit early on back foot against spin</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="font-medium text-green-700">Recommendation</p>
                      <p className="text-green-600">Focus on balance drills for better shot selection</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="players" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Player List */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Player Roster</CardTitle>
                <CardDescription>Select a player to view detailed analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {playerProfiles.map((player) => (
                    <div 
                      key={player.id} 
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedPlayer === player.name.toLowerCase().replace(' ', '-') 
                          ? 'bg-primary/10 border-primary' 
                          : 'bg-card hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedPlayer(player.name.toLowerCase().replace(' ', '-'))}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{player.name}</div>
                          <div className="text-sm text-muted-foreground">{player.role}</div>
                        </div>
                        <Badge variant="outline">{player.rank}</Badge>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        {player.sessions} sessions • {player.improvement} improvement
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Player Performance */}
            <div className="md:col-span-2 space-y-4">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Alex Johnson - Performance Overview</CardTitle>
                  <CardDescription>Detailed analytics and improvement tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={[
                        { subject: 'Batting Technique', A: 85, fullMark: 100 },
                        { subject: 'Footwork', A: 78, fullMark: 100 },
                        { subject: 'Shot Selection', A: 92, fullMark: 100 },
                        { subject: 'Timing', A: 88, fullMark: 100 },
                        { subject: 'Power', A: 76, fullMark: 100 },
                        { subject: 'Consistency', A: 82, fullMark: 100 }
                      ]}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        <Area dataKey="A" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.3} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Recent Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="session" />
                        <YAxis />
                        <Tooltip />
                        <Area dataKey="consistency" stackId="1" stroke="#0ea5e9" fill="#0ea5e9" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>AI-Generated Insights</CardTitle>
                <CardDescription>Machine learning analysis of training patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Performance Pattern Detected</h4>
                    <p className="text-blue-700 text-sm">
                      Alex Johnson shows 23% better shot accuracy when maintaining wider stance during net practice.
                    </p>
                    <Badge className="mt-2" variant="secondary">High Confidence</Badge>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">Fatigue Prediction</h4>
                    <p className="text-yellow-700 text-sm">
                      David Smith likely to experience performance decline after 45 minutes of continuous bowling.
                    </p>
                    <Badge className="mt-2" variant="outline">Medium Confidence</Badge>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Training Recommendation</h4>
                    <p className="text-green-700 text-sm">
                      Team formation efficiency improved by 15% when implementing suggested field placements.
                    </p>
                    <Badge className="mt-2" variant="secondary">Implemented</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Predictive Analytics</CardTitle>
                <CardDescription>AI predictions based on current training data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                    <div>
                      <p className="font-medium">Match Performance Prediction</p>
                      <p className="text-sm text-muted-foreground">Next competitive match</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">87%</p>
                      <p className="text-xs text-muted-foreground">Success rate</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                    <div>
                      <p className="font-medium">Injury Risk Assessment</p>
                      <p className="text-sm text-muted-foreground">Based on movement patterns</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">Low</p>
                      <p className="text-xs text-muted-foreground">Risk level</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                    <div>
                      <p className="font-medium">Optimal Training Duration</p>
                      <p className="text-sm text-muted-foreground">For maximum effectiveness</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">2h 15m</p>
                      <p className="text-xs text-muted-foreground">Recommended</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Generate Performance Reports</CardTitle>
              <CardDescription>Create comprehensive analysis reports for players and sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <h4 className="font-medium mb-2">Individual Player Report</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Comprehensive analysis of a single player's performance, trends, and recommendations.
                  </p>
                  <Button size="sm" className="w-full">Generate Report</Button>
                </div>
                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <h4 className="font-medium mb-2">Team Performance Summary</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Overall team analytics, formation effectiveness, and tactical insights.
                  </p>
                  <Button size="sm" className="w-full">Generate Report</Button>
                </div>
                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <h4 className="font-medium mb-2">Session Analysis Report</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Detailed breakdown of specific training sessions with key highlights.
                  </p>
                  <Button size="sm" className="w-full">Generate Report</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CricketAthleteTraining;
