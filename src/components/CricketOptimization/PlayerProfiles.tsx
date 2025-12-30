
import React, { useState } from "react";
import { Users, Search, Filter, Plus, Target, TrendingUp, Activity, Award, Calendar, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PlayerProfiles = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);

  const players = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Batsman",
      avatar: "/placeholder.svg",
      stats: {
        sessionsCompleted: 28,
        performanceScore: 87,
        improvementRate: "+12%",
        lastSession: "2024-06-14"
      },
      strengths: ["Power Hitting", "Front Foot Shots", "Running Between Wickets"],
      weaknesses: ["Back Foot Defense", "Spin Bowling", "Late Cuts"],
      goals: ["Improve strike rate against spin", "Better shot selection", "Fitness enhancement"],
      recentInsights: [
        "Footwork has improved 15% in last 3 sessions",
        "Consistent timing on cover drives",
        "Requires work on pull shots timing"
      ]
    },
    {
      id: 2,
      name: "Michael Smith",
      role: "Bowler",
      avatar: "/placeholder.svg",
      stats: {
        sessionsCompleted: 32,
        performanceScore: 92,
        improvementRate: "+8%",
        lastSession: "2024-06-13"
      },
      strengths: ["Line & Length", "Pace Variation", "Death Bowling"],
      weaknesses: ["Wide Deliveries", "Yorker Execution", "Field Awareness"],
      goals: ["Reduce wide balls by 30%", "Perfect yorker delivery", "Improve economy rate"],
      recentInsights: [
        "Bowling action consistency up 20%",
        "Excellent line control in last session",
        "Pace variation needs refinement"
      ]
    },
    {
      id: 3,
      name: "Sarah Brown",
      role: "Wicketkeeper",
      avatar: "/placeholder.svg",
      stats: {
        sessionsCompleted: 25,
        performanceScore: 89,
        improvementRate: "+18%",
        lastSession: "2024-06-13"
      },
      strengths: ["Glove Work", "Quick Reflexes", "Communication"],
      weaknesses: ["Stumping Speed", "Throwing Accuracy", "Batting Stance"],
      goals: ["Faster stumping technique", "Improve batting average", "Leadership skills"],
      recentInsights: [
        "Catching success rate increased to 95%",
        "Outstanding communication during drills",
        "Stumping technique showing progress"
      ]
    },
    {
      id: 4,
      name: "James Wilson",
      role: "All-rounder",
      avatar: "/placeholder.svg",
      stats: {
        sessionsCompleted: 30,
        performanceScore: 85,
        improvementRate: "+10%",
        lastSession: "2024-06-12"
      },
      strengths: ["Versatility", "Field Positioning", "Match Awareness"],
      weaknesses: ["Bowling Consistency", "Power Hitting", "Pressure Situations"],
      goals: ["Consistent bowling performance", "Increase strike rate", "Better field communication"],
      recentInsights: [
        "Excellent adaptability in match simulations",
        "Bowling accuracy improving steadily",
        "Requires confidence building in pressure situations"
      ]
    }
  ];

  const renderPlayerDetails = (player: any) => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={player.avatar} />
          <AvatarFallback>{player.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{player.name}</h2>
          <Badge variant="outline">{player.role}</Badge>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{player.stats.sessionsCompleted}</p>
            <p className="text-sm text-muted-foreground">Sessions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{player.stats.performanceScore}</p>
            <p className="text-sm text-muted-foreground">Performance Score</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">{player.stats.improvementRate}</p>
            <p className="text-sm text-muted-foreground">Improvement</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm font-medium">{player.stats.lastSession}</p>
            <p className="text-sm text-muted-foreground">Last Session</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-green-600" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {player.strengths.map((strength: string, index: number) => (
                <Badge key={index} variant="secondary" className="mr-2">
                  {strength}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Areas for Improvement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-600" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {player.weaknesses.map((weakness: string, index: number) => (
                <Badge key={index} variant="outline" className="mr-2">
                  {weakness}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Development Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Development Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {player.goals.map((goal: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  {goal}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Recent AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-600" />
              Recent AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {player.recentInsights.map((insight: string, index: number) => (
                <div key={index} className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-sm">{insight}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {selectedPlayer ? (
        <div>
          <Button 
            variant="outline" 
            onClick={() => setSelectedPlayer(null)}
            className="mb-4"
          >
            ← Back to Players
          </Button>
          {renderPlayerDetails(players.find(p => p.id === selectedPlayer))}
        </div>
      ) : (
        <>
          {/* Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Player Profiles
                  </CardTitle>
                  <CardDescription>Manage player information, track progress, and view AI-powered insights</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Player
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <Input className="pl-10" placeholder="Search players..." />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Players Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.map((player) => (
              <Card 
                key={player.id} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedPlayer(player.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar>
                      <AvatarImage src={player.avatar} />
                      <AvatarFallback>{player.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{player.name}</h3>
                      <Badge variant="outline" className="text-xs">{player.role}</Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Performance Score</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{player.stats.performanceScore}</span>
                        <Badge variant="outline" className="text-xs text-green-600">
                          {player.stats.improvementRate}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Sessions Completed</span>
                      <span className="font-semibold">{player.stats.sessionsCompleted}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Last Session</span>
                      <span className="text-sm">{player.stats.lastSession}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-muted-foreground mb-2">Recent Insights</p>
                    <p className="text-sm">{player.recentInsights[0]}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerProfiles;
