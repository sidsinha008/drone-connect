
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Trophy, Users, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ESportsManagement = () => {
  const navigate = useNavigate();

  const appWidgets = [
    {
      id: "spotlight-drone",
      title: "Spotlight Drone Experience",
      description: "Get highlighted by our stadium drone during the game",
      icon: Camera,
      color: "bg-gradient-to-br from-purple-500 to-blue-600",
      route: "/esports/spotlight-drone"
    },
    {
      id: "tournament-manager",
      title: "Tournament Manager", 
      description: "Manage eSports tournaments and competitions",
      icon: Trophy,
      color: "bg-gradient-to-br from-yellow-500 to-orange-600",
      route: "/esports/tournaments"
    },
    {
      id: "team-analytics",
      title: "Team Analytics",
      description: "Advanced analytics for eSports teams performance",
      icon: Users,
      color: "bg-gradient-to-br from-green-500 to-teal-600",
      route: "/esports/analytics"
    },
    {
      id: "live-streaming",
      title: "Live Streaming Hub",
      description: "Manage live streams and audience engagement",
      icon: Zap,
      color: "bg-gradient-to-br from-red-500 to-pink-600",
      route: "/esports/streaming"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">eSports Management</h1>
        <p className="text-muted-foreground">
          Comprehensive tools for managing eSports events and experiences
        </p>
      </div>

      {/* App Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {appWidgets.map((widget) => (
          <Card 
            key={widget.id} 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 group"
            onClick={() => navigate(widget.route)}
          >
            <CardHeader className="pb-4">
              <div className={`w-16 h-16 rounded-xl ${widget.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <widget.icon className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">{widget.title}</CardTitle>
              <CardDescription className="text-sm">
                {widget.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full group-hover:bg-primary/90 transition-colors">
                Open App
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-6 h-6 text-blue-600" />
            Featured: Spotlight Drone Experience
          </CardTitle>
          <CardDescription>
            Be the star of the stadium! Get highlighted by our advanced drone system during live events.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => navigate("/esports/spotlight-drone")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Book Your Spotlight Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ESportsManagement;
