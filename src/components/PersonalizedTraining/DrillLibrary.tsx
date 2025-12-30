
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Play, 
  Clock, 
  Target, 
  Users,
  Star,
  Plus,
  BarChart3
} from "lucide-react";

interface DrillLibraryProps {
  playerId: string;
}

const DrillLibrary = ({ playerId }: DrillLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const drillCategories = [
    { id: "all", name: "All Drills", count: 124 },
    { id: "batting", name: "Batting", count: 45 },
    { id: "bowling", name: "Bowling", count: 32 },
    { id: "fielding", name: "Fielding", count: 28 },
    { id: "fitness", name: "Fitness", count: 19 }
  ];

  const drills = [
    {
      id: 1,
      name: "Weight Distribution Balance Drill",
      category: "batting",
      level: "intermediate",
      duration: "15-20 mins",
      equipment: ["Cones", "Balance Board"],
      participants: "1",
      aiTracking: true,
      rating: 4.8,
      description: "Improve batting stance stability and weight distribution for better balance against fast bowling",
      objectives: ["Correct forward lean", "Enhance balance", "Improve foot positioning"],
      instructions: [
        "Set up balance board behind batting crease",
        "Practice stance with 60-40 weight distribution",
        "Hold position for 30 seconds, 5 reps",
        "Practice with eyes closed for proprioception"
      ],
      metrics: ["Weight distribution %", "Stance stability time", "Balance score"],
      videoUrl: "/drills/weight-distribution.mp4"
    },
    {
      id: 2,
      name: "Reaction Time Enhancement",
      category: "fielding", 
      level: "advanced",
      duration: "25-30 mins",
      equipment: ["Reaction Balls", "Cones", "Timer"],
      participants: "1-2",
      aiTracking: true,
      rating: 4.6,
      description: "Enhance hand-eye coordination and reaction time for close catches",
      objectives: ["Improve reflexes", "Better hand-eye coordination", "Faster decision making"],
      instructions: [
        "Stand 2m from wall with reaction ball",
        "Throw ball at wall, catch on return",
        "Vary throwing angles and force",
        "Record successful catches per minute"
      ],
      metrics: ["Reaction time (ms)", "Success rate %", "Hand-eye coordination score"],
      videoUrl: "/drills/reaction-time.mp4"
    },
    {
      id: 3,
      name: "Cardiovascular Interval Training",
      category: "fitness",
      level: "intermediate",
      duration: "30-45 mins",
      equipment: ["Cones", "Heart Rate Monitor"],
      participants: "1-8",
      aiTracking: true,
      rating: 4.7,
      description: "Build endurance and optimize heart rate patterns for sustained performance",
      objectives: ["Improve VO2 max", "Enhance recovery", "Build match fitness"],
      instructions: [
        "Warm up with 10 min light jogging",
        "High intensity intervals: 90s work, 60s rest",
        "Repeat 8-10 cycles",
        "Cool down with stretching"
      ],
      metrics: ["Average HR", "Peak HR", "Recovery rate", "Distance covered"],
      videoUrl: "/drills/cardio-intervals.mp4"
    },
    {
      id: 4,
      name: "Spin Bowling Accuracy Challenge",
      category: "bowling",
      level: "advanced",
      duration: "20-25 mins",
      equipment: ["Stumps", "Target Markers", "Cricket Balls"],
      participants: "1",
      aiTracking: true,
      rating: 4.9,
      description: "Improve spin bowling accuracy and consistency through targeted practice",
      objectives: ["Enhance accuracy", "Consistent line & length", "Improve spin rate"],
      instructions: [
        "Set up target zones around stumps",
        "Bowl 6 balls per zone (leg, middle, off)",
        "Focus on consistent release point",
        "Track spin rate and bounce consistency"
      ],
      metrics: ["Accuracy %", "Spin rate (RPM)", "Line consistency", "Length consistency"],
      videoUrl: "/drills/spin-accuracy.mp4"
    }
  ];

  const filteredDrills = drills.filter(drill => {
    const matchesSearch = drill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drill.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || drill.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || drill.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner": return "bg-green-100 text-green-700";
      case "intermediate": return "bg-yellow-100 text-yellow-700";
      case "advanced": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "batting": return "bg-blue-100 text-blue-700";
      case "bowling": return "bg-purple-100 text-purple-700";
      case "fielding": return "bg-green-100 text-green-700";
      case "fitness": return "bg-orange-100 text-orange-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Smart Drill Library
          </CardTitle>
          <CardDescription>
            AI-enhanced drills with automatic performance tracking and analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search drills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-input rounded-md"
              >
                {drillCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} ({cat.count})
                  </option>
                ))}
              </select>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2 border border-input rounded-md"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Drill Cards */}
      <div className="grid gap-6">
        {filteredDrills.map((drill) => (
          <Card key={drill.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {drill.name}
                    {drill.aiTracking && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        <BarChart3 className="w-3 h-3 mr-1" />
                        AI Tracking
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {drill.description}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{drill.rating}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className={getCategoryColor(drill.category)}>
                  {drill.category}
                </Badge>
                <Badge className={getLevelColor(drill.level)}>
                  {drill.level}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {drill.duration}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {drill.participants} players
                </Badge>
              </div>

              <div>
                <h4 className="font-medium mb-2">Objectives:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {drill.objectives.map((objective, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary rounded-full" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Equipment Required:</h4>
                <div className="flex flex-wrap gap-2">
                  {drill.equipment.map((item, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">AI Tracked Metrics:</h4>
                <div className="flex flex-wrap gap-2">
                  {drill.metrics.map((metric, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700">
                      {metric}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button className="flex-1">
                  <Play className="w-4 h-4 mr-2" />
                  Start Drill
                </Button>
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Plan
                </Button>
                <Button variant="outline">
                  View Instructions
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDrills.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No drills found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find relevant drills.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DrillLibrary;
