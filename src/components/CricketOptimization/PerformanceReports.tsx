
import React, { useState } from "react";
import { FileText, Download, Share, Calendar, Filter, BarChart3, TrendingUp, Users, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PerformanceReports = () => {
  const [selectedReport, setSelectedReport] = useState<number | null>(null);

  const reportTemplates = [
    {
      id: 1,
      name: "Individual Player Performance",
      description: "Comprehensive analysis of individual player progress and recommendations",
      icon: Users,
      category: "Player Analysis",
      metrics: ["Technique Scores", "Performance Trends", "Improvement Areas", "Drill Recommendations"]
    },
    {
      id: 2,
      name: "Team Performance Summary",
      description: "Overall team performance metrics and tactical analysis",
      icon: TrendingUp,
      category: "Team Analysis",
      metrics: ["Team Coordination", "Formation Efficiency", "Match Readiness", "Strategic Insights"]
    },
    {
      id: 3,
      name: "Training Session Analysis",
      description: "Detailed breakdown of specific training sessions with AI insights",
      icon: BarChart3,
      category: "Session Analysis",
      metrics: ["Session Effectiveness", "Player Participation", "Drill Performance", "Key Moments"]
    },
    {
      id: 4,
      name: "Comparative Performance",
      description: "Compare performance across players, sessions, or time periods",
      icon: Target,
      category: "Comparative Analysis",
      metrics: ["Performance Comparisons", "Progress Tracking", "Benchmark Analysis", "Ranking Systems"]
    }
  ];

  const generatedReports = [
    {
      id: 1,
      title: "Weekly Team Performance - June 8-14",
      type: "Team Performance Summary",
      generatedDate: "2024-06-14",
      status: "Ready",
      size: "2.4 MB",
      pages: 15,
      highlights: [
        "Overall team performance improved by 8%",
        "3 players showing significant technique improvements",
        "Field coordination effectiveness up 12%"
      ]
    },
    {
      id: 2,
      title: "Alex Johnson - Individual Analysis",
      type: "Individual Player Performance",
      generatedDate: "2024-06-13",
      status: "Ready",
      size: "1.8 MB",
      pages: 12,
      highlights: [
        "Batting stance stability improved 18%",
        "Shot selection accuracy increased",
        "Recommended focus on spin bowling defense"
      ]
    },
    {
      id: 3,
      title: "Batting Practice Session - June 12",
      type: "Training Session Analysis",
      generatedDate: "2024-06-12",
      status: "Ready",
      size: "3.1 MB",
      pages: 18,
      highlights: [
        "High engagement levels across all players",
        "Notable improvements in footwork patterns",
        "Identified fatigue threshold at 45 minutes"
      ]
    },
    {
      id: 4,
      title: "Bowler Performance Comparison",
      type: "Comparative Performance",
      generatedDate: "2024-06-11",
      status: "Processing",
      size: "TBD",
      pages: "TBD",
      highlights: [
        "Analysis in progress...",
        "Comparing 5 bowlers across 3 sessions",
        "Expected completion: 2 hours"
      ]
    }
  ];

  const renderReportGenerator = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
          <CardDescription>Create comprehensive performance reports with AI-driven insights</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="report-name">Report Name</Label>
              <Input id="report-name" placeholder="e.g., Weekly Team Analysis" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-range">Date Range</Label>
              <Input id="date-range" type="date" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Select Players (optional)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {["Johnson", "Smith", "Brown", "Davis", "Wilson", "Taylor"].map(player => (
                <label key={player} className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">{player}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Report Template</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reportTemplates.map(template => (
                <Card 
                  key={template.id}
                  className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-200"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <template.icon className="w-6 h-6 text-blue-600 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-medium">{template.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                        <div className="mt-2">
                          <Badge variant="outline" className="text-xs">{template.category}</Badge>
                        </div>
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground">Includes:</p>
                          <ul className="text-xs text-muted-foreground mt-1">
                            {template.metrics.slice(0, 2).map((metric, index) => (
                              <li key={index}>• {metric}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Button className="w-full" size="lg">
            Generate Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderReportsList = () => (
    <div className="space-y-4">
      {generatedReports.map(report => (
        <Card key={report.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{report.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Generated: {report.generatedDate}
                  </span>
                  <span>{report.size}</span>
                  <span>{report.pages} pages</span>
                </div>
              </div>
              <Badge variant={report.status === "Ready" ? "default" : "secondary"}>
                {report.status}
              </Badge>
            </div>

            <div className="mb-4">
              <Badge variant="outline" className="text-xs">{report.type}</Badge>
            </div>

            <div className="space-y-2 mb-4">
              <h4 className="text-sm font-medium">Key Highlights:</h4>
              <ul className="space-y-1">
                {report.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {report.status === "Ready" && (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            )}

            {report.status === "Processing" && (
              <div className="flex items-center gap-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full w-3/4 animate-pulse"></div>
                </div>
                <span className="text-sm text-muted-foreground">75%</span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Performance Reports
              </CardTitle>
              <CardDescription>Generate and manage comprehensive performance analysis reports</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                New Report
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Generated Reports</CardTitle>
              <CardDescription>Your recent performance analysis reports</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                {renderReportsList()}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div>
          {renderReportGenerator()}
        </div>
      </div>

      {/* Report Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Report Analytics
          </CardTitle>
          <CardDescription>Usage statistics and report insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">24</p>
              <p className="text-sm text-muted-foreground">Reports Generated</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">18</p>
              <p className="text-sm text-muted-foreground">Shared Reports</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">156</p>
              <p className="text-sm text-muted-foreground">Total Downloads</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">92%</p>
              <p className="text-sm text-muted-foreground">Insight Accuracy</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceReports;
