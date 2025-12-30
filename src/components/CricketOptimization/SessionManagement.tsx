
import React, { useState } from "react";
import { Upload, Calendar, Users, Clock, Tag, Filter, Search, Play, Download, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

const SessionManagement = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const sessions = [
    {
      id: 1,
      name: "Batting Practice - Power Play Focus",
      date: "2024-06-14",
      time: "09:30 AM",
      duration: "2h 15m",
      players: ["Johnson", "Smith", "Brown", "Davis", "Wilson", "Taylor", "Anderson", "Thomas"],
      drillType: "Batting",
      tags: ["Power Play", "Technique", "Shot Selection"],
      status: "Analyzed",
      footage: "4.2 GB",
      insights: 23
    },
    {
      id: 2,
      name: "Fielding Coordination Drills",
      date: "2024-06-13",
      time: "04:00 PM",
      duration: "1h 45m",
      players: ["Johnson", "Smith", "Brown", "Davis", "Wilson", "Taylor", "Anderson", "Thomas", "Garcia", "Martinez", "Rodriguez"],
      drillType: "Fielding",
      tags: ["Coordination", "Communication", "Positioning"],
      status: "Processing",
      footage: "3.8 GB",
      insights: 0
    },
    {
      id: 3,
      name: "Bowling Technique Analysis",
      date: "2024-06-13",
      time: "02:00 PM",
      duration: "1h 30m",
      players: ["Smith", "Brown", "Wilson", "Anderson", "Garcia"],
      drillType: "Bowling",
      tags: ["Line & Length", "Pace Variation", "Spin"],
      status: "Analyzed",
      footage: "2.9 GB",
      insights: 18
    },
    {
      id: 4,
      name: "Match Simulation - Full Squad",
      date: "2024-06-12",
      time: "10:00 AM",
      duration: "3h 20m",
      players: ["Johnson", "Smith", "Brown", "Davis", "Wilson", "Taylor", "Anderson", "Thomas", "Garcia", "Martinez", "Rodriguez", "Lee", "Wang", "Kim", "Singh", "Patel", "Kumar", "Shah", "Gupta", "Sharma", "Verma", "Agarwal"],
      drillType: "Match Simulation",
      tags: ["Full Squad", "Tactics", "Match Situation"],
      status: "Analyzed",
      footage: "8.7 GB",
      insights: 45
    }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setSelectedFile(null);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Training Session
          </CardTitle>
          <CardDescription>Upload drone footage and session metadata for AI analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="session-name">Session Name</Label>
              <Input id="session-name" placeholder="e.g., Batting Practice - Team A" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="drill-type">Drill Type</Label>
              <Input id="drill-type" placeholder="e.g., Batting, Bowling, Fielding" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-date">Date</Label>
              <Input id="session-date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" placeholder="e.g., 2h 30m" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input id="tags" placeholder="e.g., technique, power play, spin bowling" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="video-upload">Drone Footage</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <label htmlFor="video-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  {selectedFile ? selectedFile.name : "Click to upload video files or drag and drop"}
                </p>
                <p className="text-xs text-gray-500 mt-1">MP4, MOV, AVI up to 10GB</p>
              </label>
            </div>
          </div>

          {selectedFile && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Upload Progress</span>
                <span className="text-sm">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          <Button 
            onClick={handleUpload} 
            disabled={!selectedFile || isUploading}
            className="w-full"
          >
            {isUploading ? "Uploading..." : "Upload & Start Analysis"}
          </Button>
        </CardContent>
      </Card>

      {/* Sessions List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Training Sessions
              </CardTitle>
              <CardDescription>Manage and review your uploaded training sessions</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <Input className="pl-10 w-64" placeholder="Search sessions..." />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {sessions.map((session) => (
                <Card key={session.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{session.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {session.date} at {session.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {session.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {session.players.length} players
                          </span>
                        </div>
                      </div>
                      <Badge variant={session.status === "Analyzed" ? "default" : "secondary"}>
                        {session.status}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline">{session.drillType}</Badge>
                      {session.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Footage: {session.footage}</span>
                        {session.insights > 0 && (
                          <span>Insights: {session.insights}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        {session.status === "Analyzed" && (
                          <Button variant="outline" size="sm">
                            <Play className="w-4 h-4 mr-2" />
                            Analyze
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionManagement;
